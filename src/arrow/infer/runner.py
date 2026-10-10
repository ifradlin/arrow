"""Inference orchestration and CPU collection of chunked model predictions."""

from dataclasses import fields
from functools import partial
import time

import torch

from ..tasks.reconstruction import depth_queries, reconstruction_queries
from ..tasks.pose import POSE_DEFAULTS, pose_queries, resolve_pose_reference
from ..tasks.tracking import track_all_pixels, tracking_queries
from ..sky import SKYSEG_MODEL, segment_sky
from ..types import Predictions, Queries, Result


class Cancelled(Exception):
    pass


def sky_queries(queries, sky):
    """[B,N] true where a query's source pixel is sky in the mask [B,F,H,W]."""
    queries = queries.batched()
    height, width = sky.shape[-2:]
    x = queries.xy[..., 0].round().long().clamp(0, width - 1)
    y = queries.xy[..., 1].round().long().clamp(0, height - 1)
    batch = torch.arange(len(x), device=x.device)[:, None]
    return sky.to(x.device)[batch, queries.source_frame, y, x]


def decode(
    model,
    encoded,
    queries,
    *,
    decode_chunk_size=100_000,
    progress=None,
    cancelled=None,
    sky=None,
):
    """Predictions for `queries`; those whose source pixel is in the `sky` mask are not
    decoded and come back NaN. `progress(fraction, detail)` follows the chunks."""
    if sky is not None:
        skipped = sky_queries(queries, sky).cpu()
        decoded = ~skipped.all(0)
        queries = queries.batched()
        kept = decode(
            model,
            encoded,
            Queries(
                **{
                    f.name: getattr(queries, f.name)[:, decoded.to(queries.xy.device)]
                    for f in fields(Queries)
                }
            ),
            decode_chunk_size=decode_chunk_size,
            progress=progress,
            cancelled=cancelled,
        )
        full = {}
        for f in fields(Predictions):
            value = getattr(kept, f.name)
            full[f.name] = value.new_full(
                (value.shape[0], queries.num_queries, *value.shape[2:]), float("nan")
            )
            full[f.name][:, decoded] = value
            full[f.name][skipped] = float("nan")
        return Predictions(**full)
    chunks = []
    done = 0
    total = -(-queries.num_queries // (decode_chunk_size or max(1, queries.num_queries)))
    for chunk in model.decode_iter(encoded, queries, decode_chunk_size):
        if cancelled is not None and cancelled():
            raise Cancelled()
        chunks.append(chunk.cpu())
        done += chunk.points.shape[1]
        if progress is not None:
            progress(done / max(1, queries.num_queries), f"chunk {len(chunks)} of {total}")
    return chunks[0] if len(chunks) == 1 else Predictions.concat(chunks)


def _group(query, layers, kind, **roles):
    """A query block plus its result metadata; `layers` is how many per-frame blocks it holds."""
    return query, {"kind": kind, **roles, "points_per_frame": query.num_queries // layers}


TASKS = ("reconstruct", "depth", "pose", "track", "all_pixels")
# Each task's sampling setting, as an `infer` argument and a config key; pose uses `pose.grid_size`.
STRIDES = {
    "reconstruct": "reconstruction_stride",
    "depth": "depth_stride",
    "track": "track_stride",
    "all_pixels": "all_pixels_stride",
}


def _tasks(tasks):
    tasks = [tasks] if isinstance(tasks, str) else list(tasks)
    unknown = [task for task in tasks if task not in TASKS]
    if unknown or not tasks:
        raise ValueError(f"Unknown inference tasks {unknown}; choose from {', '.join(TASKS)}")
    return tasks


def append_results(old, new):
    """`old` with the query groups of `new` (on the same images) appended after its own."""
    groups = old.metadata["groups"] + [
        {**group, "start": group["start"] + old.queries.num_queries} for group in new.metadata["groups"]
    ]
    joined = [
        type(record)(**{
            f.name: torch.cat([getattr(record, f.name), getattr(other, f.name)], dim=1) for f in fields(record)
        })
        for record, other in [(old.queries.batched(), new.queries.batched()), (old.predictions, new.predictions)]
    ]
    return Result(new.images, joined[0], joined[1], {**new.metadata, "groups": groups})


def make_queries(
    images,
    *,
    tasks=("track",),
    xy=None,
    track_stride=2,
    target_frames=None,
    reconstruction_stride=2,
    depth_stride=2,
    source_frame: torch.Tensor | list[int] | int = 0,
    reference_frame=None,
    pose_config=None,
):
    """Queries and their groups for `tasks`, in order; all-pixel tracking seeds adaptively and is
    not built here (see `infer`). Tasks and frame roles: docs/INFERENCE.md#tasks."""
    frames = images.shape[1]
    settings = {**POSE_DEFAULTS, **(pose_config or {})}
    pose_grid, pose_reference = settings.pop("grid_size"), settings.pop("reference_frame")

    def reference(task):
        if reference_frame is not None:
            return reference_frame
        return resolve_pose_reference(frames, pose_reference) if task == "pose" else 0

    def reconstruct():
        query = reconstruction_queries(
            images, stride=reconstruction_stride, reference_frame=reference("reconstruct")
        )
        return _group(
            query, frames, "reconstruction",
            reference_frame=reference("reconstruct"), stride=reconstruction_stride,
        )

    def track():
        query = tracking_queries(
            images,
            xy,
            stride=track_stride,
            source_frame=source_frame,
            target_frames=target_frames,
            reference_frame=reference("track"),
        )
        targets = (
            list(range(frames))
            if target_frames is None
            else torch.as_tensor(target_frames).tolist()
        )
        query, group = _group(
            query, len(targets), "tracks", target_frames=targets, reference_frame=reference("track")
        )
        if isinstance(source_frame, int):
            group["source_frame"] = source_frame
        elif images.shape[0] == 1:
            group["seeds_per_frame"] = torch.bincount(
                query.source_frame[0, :group["points_per_frame"]], minlength=frames
            ).tolist()
        return query, group

    def depth():
        query = depth_queries(images, stride=depth_stride)
        return _group(query, frames, "depth", reference_frame="source")

    def pose():
        # Both pointmaps of the same pixels share one group: [own camera, reference camera].
        query = pose_queries(images, grid_size=pose_grid, reference_frame=reference("pose"))
        return _group(query, 2 * frames, "pose", reference_frame=reference("pose"), pose=settings)

    builders = {"reconstruct": reconstruct, "depth": depth, "track": track, "pose": pose}
    tasks = _tasks(tasks)
    if "all_pixels" in tasks:
        raise ValueError("all_pixels seeds as it decodes; run it with infer")
    groups, queries = [], []
    for task in tasks:
        query, group = builders[task]()
        start = sum(q.num_queries for q in queries)
        groups.append({**group, "task": task, "start": start, "count": query.num_queries})
        queries.append(query)
    return Queries(
        **{f.name: torch.cat([getattr(q, f.name) for q in queries], dim=1) for f in fields(Queries)}
    ), groups


@torch.inference_mode()
def infer(
    model,
    observations,
    *,
    tasks=("track",),
    xy=None,
    track_stride=2,
    target_frames=None,
    reconstruction_stride=2,
    depth_stride=2,
    all_pixels_stride=2,
    source_frame: torch.Tensor | list[int] | int | None = None,
    reference_frame=None,
    pose_config=None,
    decode_chunk_size=100_000,
    progress=None,
    cancelled=None,
    encoded=None,
    skip_sky=True,
    sky=None,
):
    """Run `tasks` on one encoding of `observations`, in order, except that all-pixel tracks come
    last. With `skip_sky`, queries whose source pixel is sky are not decoded; `sky` passes a
    precomputed mask [B,F,H,W] (see arrow.sky.segment_sky) instead of segmenting here."""
    tasks = _tasks(tasks)
    if not skip_sky:
        sky = None
    elif sky is None:
        sky = segment_sky(observations.images)
    if source_frame is None:
        if "track" in tasks and observations.num_views > 1:
            if xy is not None:
                raise ValueError("Multi-view points require a source_frame index for each seed")
            source_frame = list(range(observations.num_views))
        else:
            source_frame = 0
    if target_frames is not None and "track" not in tasks:
        raise ValueError("target_frames applies to tracking tasks")
    device = next(model.parameters()).device
    if device.type == "cuda":
        torch.cuda.synchronize(device)
        torch.cuda.reset_peak_memory_stats(device)
    start = time.perf_counter()
    encoded_reused = encoded is not None
    if cancelled is not None and cancelled():
        raise Cancelled()
    if progress is not None:
        progress("encoding" if encoded is None else "decoding", 0.0)
    if encoded is None:
        encoded = model.encode(observations.images.to(device))
    if cancelled is not None and cancelled():
        raise Cancelled()
    decoding = None if progress is None else lambda value, detail: progress("decoding", value, detail)
    parts = []
    fixed = [task for task in tasks if task != "all_pixels"]
    if fixed:
        queries, groups = make_queries(
            encoded.images,
            tasks=fixed,
            xy=xy,
            track_stride=track_stride,
            target_frames=target_frames,
            reconstruction_stride=reconstruction_stride,
            depth_stride=depth_stride,
            source_frame=source_frame,
            reference_frame=reference_frame,
            pose_config=pose_config,
        )
        order = None
        decoding_queries = queries
        if any(group["kind"] == "tracks" for group in groups):
            # Seed-first decoding keeps each trajectory's samples together across chunks.
            order = torch.arange(queries.num_queries, device=queries.xy.device)
            for group in groups:
                if group["kind"] == "tracks":
                    offset, count = group["start"], group["count"]
                    order[offset:offset + count] = order[offset:offset + count].reshape(
                        len(group["target_frames"]), group["points_per_frame"]
                    ).T.flatten()
            decoding_queries = Queries(**{
                f.name: getattr(queries, f.name).index_select(1, order) for f in fields(Queries)
            })
        predictions = decode(
            model,
            encoded,
            decoding_queries,
            decode_chunk_size=decode_chunk_size,
            progress=decoding,
            cancelled=cancelled,
            sky=sky,
        )
        if order is not None:
            restore = order.argsort().cpu()
            predictions = Predictions(**{
                f.name: getattr(predictions, f.name).index_select(1, restore)
                for f in fields(Predictions)
            })
        parts.append((queries.cpu(), predictions, groups))
    if "all_pixels" in tasks:
        if not isinstance(source_frame, int):
            raise ValueError("all_pixels requires one integer source_frame")
        queries, predictions, groups = track_all_pixels(
            encoded.images,
            partial(
                decode, model, encoded, decode_chunk_size=decode_chunk_size, cancelled=cancelled
            ),
            source_frame=source_frame,
            stride=all_pixels_stride,
            reference_frame=0 if reference_frame is None else reference_frame,
            sky=sky,
            progress=decoding,
        )
        parts.append((queries, predictions, [{**group, "task": "all_pixels"} for group in groups]))
    groups, offset = [], 0
    for queries, _, part in parts:
        groups += [{**group, "start": group["start"] + offset} for group in part]
        offset += queries.num_queries
    queries = Queries(
        **{f.name: torch.cat([getattr(q.batched(), f.name) for q, _, _ in parts], dim=1) for f in fields(Queries)}
    )
    predictions = Predictions.concat([p for _, p, _ in parts])
    if device.type == "cuda":
        torch.cuda.synchronize(device)
    metadata = {
        "format_version": 1,
        "model": getattr(model, "provenance", {}),
        "coordinate_frame": "reference_camera; x right, y down, z forward",
        "scale": "model-predicted relative scale; not guaranteed metric",
        "query_order": "xy pixel centers; groups then target/source frame then point",
        "uv_coordinates": "target normalized coordinates; pixel = uv * [width, height] - 0.5",
        "frame_info": observations.frame_info,
        "num_views": observations.num_views,
        "num_timesteps": observations.num_timesteps,
        "groups": groups,
        "runtime": {
            "torch": torch.__version__,
            "device": str(device),
            "decode_chunk_size": decode_chunk_size,
            "encoded_reused": encoded_reused,
            "seconds": time.perf_counter() - start,
            "peak_allocated_bytes": torch.cuda.max_memory_allocated(device)
            if device.type == "cuda"
            else None,
            "peak_reserved_bytes": torch.cuda.max_memory_reserved(device)
            if device.type == "cuda"
            else None,
        },
    }
    if sky is not None:
        metadata["sky"] = {"model": SKYSEG_MODEL, "fraction": float(sky.float().mean())}
        skipped = sky_queries(queries, sky).sum(0)
        for group in groups:
            group["sky_skipped"] = int(
                skipped[group["start"] : group["start"] + group["count"]].sum()
            )
    return Result(observations.images, queries.cpu(), predictions, metadata), encoded
