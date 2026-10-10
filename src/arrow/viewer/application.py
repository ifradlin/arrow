"""One model, one encoded clip, and a serialized GPU queue per local session."""

from concurrent.futures import ThreadPoolExecutor
from dataclasses import fields
from pathlib import Path
from shutil import copyfile
from collections import OrderedDict
from threading import Event, Lock
import sys
import time

from arrow.data.io import select_frame_indices
from arrow.utils.config import load_config
from arrow.utils.results_io import load_result, save_result

from .scene import Scene


def track_pixels(frame, region, stride, points):
    """Start-frame query pixels: the union of a region grid and clicked points (0 disables the grid)."""
    import torch
    from arrow.queries import spread_grid

    left, top = frame["padding"][:2]
    height, width = frame["resized_size"]
    xy = spread_grid(height, width, stride, region=region)
    picked = torch.tensor([[u * width - 0.5, v * height - 0.5] for u, v in points]).reshape(-1, 2)
    picked = picked.clamp(min=torch.zeros(2), max=torch.tensor([width - 1.0, height - 1.0]))
    picked = torch.unique(picked, dim=0)
    # The grid is the Cartesian product of its x and y coordinates.
    picked = picked[~(torch.isin(picked[:, 0], xy[:, 0]) & torch.isin(picked[:, 1], xy[:, 1]))]
    return torch.cat([xy, picked]) + torch.tensor([left, top])


def task_specs(tasks, config):
    """Complete run requests' tasks: each a dict with `task` and, unless given, its configured
    `stride` (0 for none: tracking only the clicked `points`), the full `region` and no points."""
    from arrow.infer.runner import STRIDES

    specs = [
        {"stride": config.get(STRIDES.get(spec["task"]), 0), "region": (0, 0, 1, 1), "points": (), **spec}
        for spec in tasks
    ]
    if not specs:
        raise ValueError("Choose at least one task")
    if any(spec["task"] in ("reconstruct", "depth", "all_pixels") and spec["stride"] < 1 for spec in specs):
        raise ValueError("Sampling stride must be positive")
    if any(
        spec["task"] == "track" and not (
            spec["stride"] or spec["points"] or any(seed["points"] for seed in spec.get("seeds", []))
        )
        for spec in specs
    ):
        raise ValueError("Choose a grid spacing or click points to track")
    return specs


def track_seeds(frame_info, *, stride, region, points, source_frame=0, seeds=None):
    """Use the same pixel selection for planning and decoding, with each seed's source frame."""
    import torch

    selections = seeds if seeds is not None else [
        {"source_frame": source_frame, "region": region, "points": points}
    ]
    if not selections or any(not 0 <= seed["source_frame"] < len(frame_info) for seed in selections):
        raise ValueError("Choose a seed camera and a start frame within the selection")
    pixels = [
        track_pixels(frame_info[seed["source_frame"]], seed["region"], stride, seed["points"])
        for seed in selections
    ]
    xy = torch.cat(pixels)
    sources = torch.cat([
        torch.full((len(pixel),), seed["source_frame"], dtype=torch.long)
        for seed, pixel in zip(selections, pixels)
    ])
    return xy, sources


def plan(sizes, *, task, stride, region, points, max_side=504, pose_config=None,
         source_frame=0, seeds=None):
    """Plan queries from selected image dimensions using the inference geometry."""
    import torch
    from arrow.infer.runner import STRIDES, make_queries
    from arrow.data.transforms import image_geometry
    from arrow.queries import grid_axis, pixel_grid

    metadata = image_geometry(sizes, max_side=max_side)
    w = max(frame["resized_size"][1] for frame in metadata)
    h = max(frame["resized_size"][0] for frame in metadata)
    frames = len(metadata)
    result: dict = {"size": [w, h], "frame_info": metadata}
    if task == "all_pixels":
        lattice = len(pixel_grid(h, w, stride=stride))
        tracks = lattice * frames
        return {**result, "per_frame": lattice, "tracks": tracks, "queries": tracks * frames}
    xy = None
    sources = source_frame
    if task == "track":
        xy, sources = track_seeds(
            metadata, stride=stride, region=region, points=points,
            source_frame=source_frame, seeds=seeds,
        )
        grids = {}
        for seed in seeds if seeds is not None else [{"source_frame": source_frame, "region": region}]:
            sh, sw = metadata[seed["source_frame"]]["resized_size"]
            u0, v0, u1, v1 = seed["region"]
            # Preload the slider's grids so dragging needs no server round trip.
            grids[seed["source_frame"]] = {
                spacing: [
                    [(x + 0.5) / sw for x in grid_axis(sw, u0, u1, spacing)],
                    [(y + 0.5) / sh for y in grid_axis(sh, v0, v1, spacing)],
                ]
                for spacing in dict.fromkeys([*range(65), stride])
            }
        result["seed_grids"] = grids
        if seeds is None:
            result["grid"] = [len(axis) for axis in grids[source_frame][stride]]
        if not len(xy):
            return {**result, "per_frame": 0, "tracks": 0, "queries": 0}
    images = torch.empty(()).expand(1, frames, 3, h, w)
    strides = {STRIDES[task]: stride} if task in STRIDES else {}
    queries, groups = make_queries(
        images, tasks=[task], xy=xy, source_frame=sources, pose_config=pose_config, **strides
    )
    return {
        **result,
        "per_frame": groups[0]["points_per_frame"],
        "tracks": groups[0]["points_per_frame"] if task == "track" else 0,
        "queries": queries.num_queries,
    }


def select_groups(result, keep):
    """A result holding only the query groups at indices `keep`, renumbered contiguously."""
    import torch
    from arrow import Predictions, Queries
    from arrow.types import Result

    groups = [result.metadata["groups"][i] for i in keep]
    spans = [slice(g["start"], g["start"] + g["count"]) for g in groups]

    def take(record, kind):
        return kind(
            **{
                f.name: torch.cat(
                    [getattr(record, f.name)[:, span] for span in spans]
                    or [getattr(record, f.name)[:, :0]],
                    dim=1,
                )
                for f in fields(kind)
            }
        )

    starts = [sum(g["count"] for g in groups[:i]) for i in range(len(groups))]
    return Result(
        result.images,
        take(result.queries.batched(), Queries),
        take(result.predictions, Predictions),
        {
            **result.metadata,
            "groups": [{**g, "start": start} for g, start in zip(groups, starts)],
        },
    )


def _scene_bytes(value):
    """Estimate scene memory without walking every coordinate of rectangular numeric arrays."""
    size = sys.getsizeof(value)
    if isinstance(value, dict):
        return size + sum(sys.getsizeof(key) + _scene_bytes(item) for key, item in value.items())
    if isinstance(value, list) and value:
        if isinstance(value[0], dict):
            return size + sum(_scene_bytes(item) for item in value)
        return size + len(value) * _scene_bytes(value[0])
    return size


def _kept_bytes(scene, result):
    """Estimated scene memory plus the inactive tab's result tensors."""
    size = _scene_bytes(scene.data)
    if result is None:
        return size
    records = [result.queries, result.predictions]
    tensors = [result.images] + [getattr(r, f.name) for r in records for f in fields(r)]
    return size + sum(t.numel() * t.element_size() for t in tensors)


def show_sky(scene, images, sky):
    """Add each frame's sky mask to `scene` as an image: the frame darkened, sky painted light blue."""
    import numpy as np

    inputs = [entry for entry in scene.data["images"] if entry["name"].split("/")[0] == "rgb"]
    frames = (images[0].permute(0, 2, 3, 1).numpy() * 255).round().astype(np.uint8)
    for frame, mask, entry in zip(frames, sky[0].cpu().numpy(), inputs):
        shown = (frame * 0.45).astype(np.uint8)
        shown[mask] = (125, 211, 252)
        scene.log_image(entry["name"].replace("rgb", "sky", 1), shown, time=entry["time"])


def keep_sky(scene, previous):
    """Carry `previous`'s sky-mask images over to a rebuilt `scene` of the same clip."""
    scene.data["images"] += [entry for entry in previous.data["images"] if entry["name"].split("/")[0] == "sky"]


def _release_gpu_memory():
    import torch

    if torch.cuda.is_available():
        torch.cuda.empty_cache()


# Layers whose queries are blocks of the same size per frame, which merge by joining each frame's block.
MERGEABLE = ("tracks", "reconstruction")


def merge_groups(result, indices):
    """`result` with the groups at `indices` (two or more, of one mergeable kind and reference frame)
    joined into one, at the place of the first; the others keep their order."""
    import torch
    from arrow.tasks.tracking import _target_major

    groups = result.metadata["groups"]
    chosen = [groups[i] for i in sorted(set(indices))]
    if len(chosen) < 2:
        raise ValueError("Choose at least two layers to merge")
    if len({g["kind"] for g in chosen}) > 1 or chosen[0]["kind"] not in MERGEABLE:
        raise ValueError("Only tracking layers, or only reconstruction layers, can be merged")
    if len({str(g["reference_frame"]) for g in chosen}) > 1:
        raise ValueError("Layers in different reference frames cannot be merged")
    frames = result.images.shape[1]
    parts = [select_groups(result, [i]) for i in sorted(set(indices))]
    queries = _target_major([part.queries for part in parts], frames)
    predictions = _target_major([part.predictions for part in parts], frames)
    merged = {
        **chosen[0],
        "count": sum(g["count"] for g in chosen),
        "points_per_frame": sum(g["points_per_frame"] for g in chosen),
        "merged": sum(g.get("merged", 1) for g in chosen),
    }
    if any("sky_skipped" in g for g in chosen):
        merged["sky_skipped"] = sum(g.get("sky_skipped", 0) for g in chosen)
    if merged["kind"] == "tracks":
        # Each block's seeds, so the merged layer still says where its tracks started.
        seeds = [
            g.get("seeds_per_frame")
            or [g["points_per_frame"] if f == g.get("source_frame", 0) else 0 for f in range(frames)]
            for g in chosen
        ]
        merged["seeds_per_frame"] = [sum(column) for column in zip(*seeds)]
    first = min(indices)
    rest = select_groups(result, [i for i in range(len(groups)) if i not in indices])
    before = sum(1 for i in range(first) if i not in indices)
    order = rest.metadata["groups"]
    cut = order[before]["start"] if before < len(order) else rest.queries.num_queries

    def insert(record, block):
        return type(block)(**{
            f.name: torch.cat(
                [getattr(record, f.name)[:, :cut], getattr(block, f.name), getattr(record, f.name)[:, cut:]],
                dim=1,
            )
            for f in fields(block)
        })

    merged["start"] = cut
    shifted = [{**g, "start": g["start"] + (merged["count"] if g["start"] >= cut else 0)} for g in order]
    return type(result)(
        result.images,
        insert(rest.queries.batched(), queries),
        insert(rest.predictions, predictions),
        {**result.metadata, "groups": shifted[:before] + [merged] + shifted[before:]},
    )


class Application:
    """One model and scene tabs with a bounded cache of inactive results and scenes.

    Only the active tab retains its loaded observations, sky mask and clip encoding. Inactive
    results and scenes stay in memory up to `session.tab_memory_gb` in configs/viewer.py;
    the least recently used are then evicted and reloaded from the session directory on demand.
    Results are saved after each run. Switching tabs drops the encoding but keeps the model loaded.
    """

    def __init__(self, checkpoint, device, directory, scene=None, *, config=None):
        self.config = load_config("viewer") if config is None else config
        self.checkpoint, self.device = checkpoint, device
        self.directory = Path(directory)
        self.scene = scene or Scene()
        self.model = self.encoded = self.observations = self.result = self.clip = self.peak = None
        self.sky = None
        self.tabs, self.active = [{"id": 1, "name": "Scene 1"}], 1
        self.kept = OrderedDict()  # inactive tabs in memory, least recently used first
        self.tab_budget = self.config["session"]["tab_memory_gb"] * 2**30
        # `steps` are the finished stages of the current run with their seconds; `detail` says where
        # the current stage is, e.g. which decoding chunk.
        self.status = {
            "state": "idle", "stage": "", "detail": "", "progress": 0.0, "steps": [], "revision": 0
        }
        self.stage_started = 0.0
        self.cancelled = Event()
        self.lock = Lock()
        self.queue = ThreadPoolExecutor(max_workers=1)

    def start(
        self,
        source,
        *,
        tasks,
        start=None,
        stride=None,
        max_frames=None,
        frame_indices=None,
        source_frame=0,
        reference_frame=None,
        decode_chunk_size=None,
        skip_sky=None,
    ):
        """Run `tasks` on a clip selection, one after another (see `task_specs`).

        The same clip selection reuses its encoding, and every task adds a layer.
        """
        tasks = task_specs(tasks, self.config)
        loader = self.config["data"]["loader"]
        start = loader["start"] if start is None else start
        stride = loader["stride"] if stride is None else stride
        max_frames = loader["max_frames"] if max_frames is None else max_frames
        if frame_indices is not None:
            frame_indices = select_frame_indices(frame_indices=frame_indices)
            start, stride, max_frames = frame_indices[0], 1, len(frame_indices)
        decode_chunk_size = self.config["decode_chunk_size"] if decode_chunk_size is None else decode_chunk_size
        skip_sky = self.config["skip_sky"] if skip_sky is None else skip_sky
        if not 0 <= source_frame < max_frames * (len(source) if isinstance(source, dict) else 1):
            raise ValueError("The start frame must be one of the selected frames")
        with self.lock:
            if self.status["state"] == "running":
                raise ValueError("Inference is already running")
            self.cancelled.clear()
            self.status.update(state="running", stage="starting", detail="", progress=0.0, steps=[])
            self.stage_started = time.perf_counter()
        def identity(path):
            return tuple(str(file) for file in path) if isinstance(path, (list, tuple)) else str(path)

        selected = (
            tuple((name, identity(path)) for name, path in source.items())
            if isinstance(source, dict) else identity(source)
        )
        clip = (selected, start, stride, max_frames)
        if frame_indices is not None:
            clip += (frame_indices,)
        self.queue.submit(
            self._run,
            clip,
            tasks,
            source_frame,
            reference_frame,
            decode_chunk_size,
            skip_sky,
        )

    def _progress(self, stage, value, detail=None):
        if self.cancelled.is_set():
            return
        if stage != self.status["stage"]:
            self._finish_stage()
        self.status.update(stage=stage, progress=value, detail=detail or "")

    def _finish_stage(self):
        now = time.perf_counter()
        if self.status["stage"] != "starting":
            step = {"stage": self.status["stage"], "seconds": now - self.stage_started}
            self.status["steps"] = [*self.status["steps"], step]
        self.stage_started = now

    def _run(self, clip, tasks, source_frame, reference_frame, decode_chunk_size, skip_sky):
        from arrow import ARROW
        from arrow.infer.runner import STRIDES, Cancelled, append_results, infer
        from arrow.utils.registry import build
        from .adapter import from_result
        import torch

        try:
            torch.set_num_threads(min(torch.get_num_threads(), 8))
            if self.model is None:
                self._progress("loading model", 0.0)
                self.model = ARROW.from_pretrained(self.checkpoint, device=self.device)
            appended = self.clip == clip and self.result is not None
            if clip != self.clip or self.encoded is None:
                self.encoded = self.sky = None
                path, start, stride, max_frames = clip[:4]
                self._progress("reading frames", 0.0)
                loader = self.config["data"]["loader"]
                if isinstance(path, tuple) and isinstance(path[0], tuple):
                    loader = {**loader, "type": "partial:load_multiview_input"}
                    path = dict(path)
                self.observations = build(loader)(
                    path, start=start, stride=stride, max_frames=max_frames,
                    **({"frame_indices": clip[4]} if len(clip) > 4 else {}),
                )
            observations = self.observations
            assert observations is not None
            if source_frame >= len(observations.frame_info):
                raise ValueError("The start frame is beyond the end of the clip")
            # Every layer of a viewer session shares frame 0's camera, so layers overlay; the
            # CLI/API keep their per-task defaults (docs/INFERENCE.md#tasks).
            if reference_frame is None:
                reference_frame = 0
            if not 0 <= reference_frame < len(observations.frame_info):
                raise ValueError("The reference frame must be one of the selected frames")
            if skip_sky and self.sky is None:
                from arrow.sky import segment_sky

                self._progress("segmenting sky", 0.0)
                self.sky = segment_sky(observations.images)
            combined, encoded = self.result if appended else None, self.encoded
            for spec in tasks:
                task, stride = spec["task"], spec["stride"]
                xy, seed_frames = None, source_frame
                if task == "track":
                    xy, seed_frames = track_seeds(
                        observations.frame_info, stride=stride, region=spec["region"],
                        points=spec["points"], source_frame=source_frame, seeds=spec.get("seeds"),
                    )
                    if spec.get("seeds") is None:
                        seed_frames = source_frame
                # Stages carry their task, so each task's encoding and decoding is its own step.
                result, encoded = infer(
                    self.model,
                    observations,
                    tasks=[task],
                    xy=xy,
                    pose_config=self.config["pose"],
                    **({STRIDES[task]: stride} if task in STRIDES else {}),
                    source_frame=seed_frames,
                    reference_frame=reference_frame,
                    decode_chunk_size=decode_chunk_size,
                    encoded=encoded,
                    skip_sky=skip_sky,
                    sky=self.sky,
                    progress=lambda stage, value, detail=None, task=task: self._progress(
                        f"{stage}:{task}", value, detail
                    ),
                    cancelled=self.cancelled.is_set,
                )
                self.peak = result.metadata["runtime"]["peak_allocated_bytes"]
                for group in result.metadata["groups"]:
                    group["stride"] = stride
                result.metadata["input_selection"] = {
                    "sources": clip[0], "start": clip[1], "stride": clip[2], "frames": clip[3],
                    **({"frame_indices": list(clip[4])} if len(clip) > 4 else {}),
                }
                combined = result if combined is None else append_results(combined, result)
            assert combined is not None
            self._progress("building scene", 0.0)
            if self.cancelled.is_set():
                raise Cancelled()
            scene = from_result(combined)
            if skip_sky:
                show_sky(scene, observations.images, self.sky)
            elif appended:
                keep_sky(scene, self.scene)
            if appended:
                scene.set_presentation(self.scene.get_presentation())
            save_result(combined, self.result_path)
            self.encoded, self.clip, self.result, self.scene = encoded, clip, combined, scene
            tab = self._tab(self.active)
            if not tab.get("renamed"):
                selected = clip[0]
                tab["name"] = (
                    f"{len(selected)} camera{'s' if len(selected) != 1 else ''}" if isinstance(selected, tuple) and isinstance(selected[0], tuple)
                    else f"{len(selected)} images" if isinstance(selected, tuple) else Path(selected).name
                )
            self._complete()
        except Cancelled:
            self.status.update(state="cancelled", stage="cancelled")
        except Exception as error:
            self.status.update(state="error", stage=str(error))

    def _complete(self):
        if self.status["state"] == "running":
            self._finish_stage()
        self.status.update(
            state="complete",
            stage="complete",
            progress=1.0,
            revision=self.status["revision"] + 1,
        )

    def remove_layer(self, index):
        from .adapter import from_result

        with self.lock:
            if self.status["state"] == "running":
                raise ValueError("Wait for inference to finish before removing a layer")
            if self.result is None or not 0 <= index < len(self.result.metadata["groups"]):
                raise ValueError("No such layer")
            groups = range(len(self.result.metadata["groups"]))
            result = select_groups(self.result, [i for i in groups if i != index])
            scene = from_result(result)
            keep_sky(scene, self.scene)
            scene.set_presentation(self.scene.get_presentation())
            save_result(result, self.result_path)
            self.result, self.scene = result, scene
            self._complete()

    def merge_layers(self, indices):
        from .adapter import from_result

        with self.lock:
            self._idle("merging layers")
            if self.result is None or not all(0 <= i < len(self.result.metadata["groups"]) for i in indices):
                raise ValueError("No such layer")
            result = merge_groups(self.result, indices)
            scene = from_result(result)
            keep_sky(scene, self.scene)
            scene.set_presentation(self.scene.get_presentation())
            save_result(result, self.result_path)
            self.result, self.scene = result, scene
            self._complete()

    @property
    def result_path(self):
        """Where the active tab's result is kept; it is written after every change to it."""
        return self.directory / "tabs" / str(self.active) / "result.npz"

    def store_result(self, result, *, source=None):
        """Keep predictions in this tab, copying an existing archive when available."""
        if source is None:
            save_result(result, self.result_path)
        else:
            self.result_path.parent.mkdir(parents=True, exist_ok=True)
            copyfile(source, self.result_path)

    def _tab(self, tab_id):
        tab = next((tab for tab in self.tabs if tab["id"] == tab_id), None)
        if tab is None:
            raise ValueError("No such tab")
        return tab

    def _stash(self):
        """Keep the active tab's scene and result aside and let go of everything else it held."""
        self._tab(self.active)["clip"] = self.clip
        self.kept[self.active] = (self.scene, self.result)
        # The scene stays until `_show` replaces it: status requests read it at any time.
        self.result = self.observations = self.encoded = self.sky = self.clip = None
        self.peak = None
        _release_gpu_memory()

    def _show(self, tab_id):
        """Make `tab_id` active, from memory if it was kept there, otherwise from its folder."""
        self.active = tab_id
        folder = self.result_path.parent
        if tab_id in self.kept:
            self.scene, self.result = self.kept.pop(tab_id)
        else:
            path = folder / "scene.json"
            self.scene = Scene.load(path) if path.exists() else Scene()
            self.result = load_result(self.result_path) if self.result_path.exists() else None
        self.clip = self._tab(tab_id).get("clip")
        while sum(_kept_bytes(*kept) for kept in self.kept.values()) > self.tab_budget:
            tab_id, (scene, _) = self.kept.popitem(last=False)
            folder = self.directory / "tabs" / str(tab_id)
            folder.mkdir(parents=True, exist_ok=True)
            scene.save(folder / "scene.json")
        self.status.update(
            state="idle", stage="", detail="", progress=0.0, steps=[],
            revision=self.status["revision"] + 1,
        )

    def new_tab(self, name=None, *, scene=None, result=None, result_source=None):
        """Open a tab, optionally with a saved scene and result, and make it active."""
        with self.lock:
            self._idle("opening a tab")
            self._stash()
            tab_id = max(tab["id"] for tab in self.tabs) + 1
            self.tabs.append({"id": tab_id, "name": name or f"Scene {tab_id}"})
            self._show(tab_id)
            if scene is not None:
                if result is not None:
                    self.store_result(result, source=result_source)
                self.scene, self.result = scene, result
                self.status.update(stage="loaded", revision=self.status["revision"] + 1)
            return tab_id

    def switch_tab(self, tab_id):
        with self.lock:
            self._idle("switching tabs")
            self._tab(tab_id)
            if tab_id != self.active:
                self._stash()
                self._show(tab_id)

    def close_tab(self, tab_id):
        """Close `tab_id`, deleting what it kept; closing the last tab leaves one empty tab."""
        import shutil

        with self.lock:
            self._idle("closing a tab")
            index = self.tabs.index(self._tab(tab_id))
            if tab_id == self.active:
                self._stash()
            self.kept.pop(tab_id, None)
            shutil.rmtree(self.directory / "tabs" / str(tab_id), ignore_errors=True)
            self.tabs.pop(index)
            if not self.tabs:
                self.tabs.append({"id": tab_id + 1, "name": f"Scene {tab_id + 1}"})
            if tab_id == self.active:
                self._show(self.tabs[min(index, len(self.tabs) - 1)]["id"])

    def rename_tab(self, tab_id, name):
        name = " ".join(str(name).split())[:80]
        if not name:
            raise ValueError("A tab needs a name")
        tab = self._tab(tab_id)
        tab.update(name=name, renamed=True)

    def reorder_tabs(self, ids):
        """Put the tabs in the order of `ids`, which must name each tab once."""
        if sorted(ids) != sorted(tab["id"] for tab in self.tabs):
            raise ValueError("The new order must name every tab once")
        self.tabs = [self._tab(tab_id) for tab_id in ids]

    def _idle(self, action):
        if self.status["state"] == "running":
            raise ValueError(f"Wait for inference to finish before {action}")

    def close(self):
        self.cancelled.set()
        self.queue.shutdown(wait=True)
