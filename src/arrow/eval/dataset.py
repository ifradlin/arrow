"""Read prepared observations, cameras and optional tracks across benchmarks."""

from dataclasses import dataclass, field
import json
from pathlib import Path

import numpy as np
import torch

from arrow.data.io import image_paths, read_depth, select_frame_indices
from arrow.infer.dataloader import ObservationBatch, load_multiview_input


@dataclass
class EvalScene:
    name: str
    subset: str
    observations: ObservationBatch
    tracks_world: torch.Tensor | None
    visibility: torch.Tensor | None
    poses: torch.Tensor
    intrinsics: torch.Tensor
    validity: torch.Tensor | None = None
    query_points: torch.Tensor | None = None
    query_frames: torch.Tensor | None = None
    track_ids: torch.Tensor | None = None
    source_track_ids: torch.Tensor | None = None
    metadata: dict = field(default_factory=dict)
    annotations: dict[str, torch.Tensor] = field(default_factory=dict)
    depth: torch.Tensor | None = None


def load_scene(path, *, max_frames: int | None = 64, max_side=504, frame_indices=None,
               frame_stride=1, min_frames=2, subset=None, eval_subset=None,
               load_tracks=True, load_depth=False):
    path = Path(path)
    metadata = json.loads((path / "scene.json").read_text())
    source_frames = metadata["source_frame_ids"]
    indices = list(select_frame_indices(
        max_frames=len(source_frames) if max_frames is None else max_frames,
        stride=frame_stride, frame_indices=frame_indices))
    if frame_indices is not None and indices[-1] >= len(source_frames):
        raise ValueError(f"Selected frame exceeds {len(source_frames)} frames in {path}")
    indices = [i for i in indices if i < len(source_frames)]
    if len(indices) < min_frames:
        raise ValueError(f"Evaluation needs at least {min_frames} frames: {path}")
    selection = metadata["eval_subsets"][eval_subset] if eval_subset is not None else None
    if load_tracks and selection is not None and indices != list(range(len(source_frames))):
        raise ValueError("Frozen query subsets require their complete prepared clip")
    cameras = metadata["cameras"]
    names = [f"v{v:02d}" for v in selection["input_views"]] if selection else list(cameras)
    sources = {name: image_paths(path / cameras[name].get("color", "color")) for name in names}
    observations = load_multiview_input({
        name: [sources[name][i] for i in indices]
        for name in names
    }, max_frames=len(indices), max_side=max_side)
    for frame in observations.frame_info:
        frame["index"] = source_frames[indices[frame["timestep"]]]
        frame["name"] = path.name
        if "source_view_ids" in metadata:
            frame["source_view_id"] = metadata["source_view_ids"][int(frame["view_name"][1:])]
    poses, intrinsics = [], []
    for name in names:
        camera = cameras[name]
        poses.append(torch.from_numpy(np.load(path / camera["pose"])[indices]) if camera["pose"]
                     else torch.eye(4).repeat(len(indices), 1, 1))
        matrix = torch.tensor(camera["intrinsics"], dtype=torch.float32)
        intrinsics.append(matrix.expand(len(indices), -1, -1) if matrix.ndim == 2
                          else matrix[indices])
    poses = torch.stack(poses, dim=1).flatten(0, 1)
    transforms = torch.tensor([f["original_to_input"] for f in observations.frame_info])
    intrinsics = transforms @ torch.stack(intrinsics, dim=1).flatten(0, 1)
    depth = None
    if load_depth:
        depth_dirs = {name: path / cameras[name].get(
            "depth", str(Path(cameras[name].get("color", "color")).parent / "depth"))
            for name in names}
        depth = torch.from_numpy(np.stack([
            read_depth(depth_dirs[name] / sources[name][i].with_suffix(".png").name)
            for i in indices for name in names]))
    if not load_tracks:
        return EvalScene(path.stem, subset or path.parent.name, observations, None,
                             None, poses, intrinsics, metadata=metadata, depth=depth)
    tracks = torch.from_numpy(np.stack([
        np.load(path / "point_tracks_3d" / f"{i:05d}.npy") for i in indices]))
    annotations = {key: torch.from_numpy(np.load(path / filename))
                   for key, filename in metadata.get("annotations", {}).items()}
    if selection is None:
        visibility = torch.from_numpy(np.stack([
            np.load(path / "visible_points_mask" / f"{i:05d}.npy") for i in indices]))
        return EvalScene(path.stem, subset or path.parent.name, observations, tracks,
                             visibility, poses, intrinsics[0], metadata=metadata,
                             annotations=annotations, depth=depth)

    def load(key):
        return torch.from_numpy(np.load(path / selection[key]))

    ids = load("track_indices").long()
    return EvalScene(
        path.stem, subset or path.parent.name, observations, tracks[:, ids],
        load("scoring_visibility"), poses, intrinsics, load("valid_points_mask"),
        load("queries_xyt"), load("query_frames").long(), ids,
        torch.from_numpy(np.load(path / "source_track_ids.npy"))[ids],
        metadata, annotations, depth,
    )


@dataclass
class EvalDataset:
    root: str
    subsets: tuple[str, ...]
    max_frames: int | None = 64
    max_side: int = 504
    frame_indices: tuple[int, ...] | None = None
    frame_stride: int = 1
    min_frames: int = 2
    max_scenes: int | None = None
    rank: int = 0
    world_size: int = 1
    load_tracks: bool = True
    load_depth: bool = False
    groups: dict[str, tuple[str, ...]] = field(default_factory=dict)

    def __post_init__(self):
        self.manifest = Path(self.root) / "manifest.json"
        manifest = json.loads(self.manifest.read_text())
        if manifest["format_version"] != 2:
            raise ValueError("Unsupported preparation manifest")
        self.flat = "scenes" in manifest
        if self.flat:
            subset, = self.subsets
            self.entries = {subset: manifest["scenes"]}
            splits = {"": [entry["path"] for entry in manifest["scenes"]]}
        else:
            self.entries = {subset: manifest["subsets"][subset] for subset in self.subsets}
            splits = manifest.get("splits", {
                subset: [Path(entry["path"]).name for entry in entries]
                for subset, entries in self.entries.items()
            })
        for subset, names in splits.items():
            for index in (".index.txt", ".test.txt"):
                if (Path(self.root) / subset / index).read_text().splitlines() != names:
                    raise ValueError(f"Prepared split changed since preparation: {subset}/{index}")
        if self.max_scenes is not None and self.max_scenes < 1:
            raise ValueError("max_scenes must be positive or None")

    def __iter__(self):
        entries = [(subset, entry) for subset, scenes in self.entries.items()
                   for entry in scenes[:self.max_scenes]]
        for subset, entry in entries[self.rank::self.world_size]:
            path = Path(self.root) / entry["path"]
            scene = load_scene(path, max_frames=self.max_frames, max_side=self.max_side,
                             frame_indices=self.frame_indices, frame_stride=self.frame_stride,
                             min_frames=self.min_frames, subset=subset,
                             eval_subset=entry.get("eval_subset"), load_tracks=self.load_tracks,
                             load_depth=self.load_depth)
            if self.flat:
                scene.name = entry["path"]
            yield scene
