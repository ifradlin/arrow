from dataclasses import fields

import torch

from ..queries import spread_grid, track_queries
from ..types import Predictions, Queries, Result


def tracking_queries(
    images,
    xy=None,
    *,
    stride=2,
    source_frame: torch.Tensor | list[int] | int = 0,
    target_frames=None,
    reference_frame=0,
):
    """Track explicit seeds, or seed a grid about `stride` px apart, edge to edge, in each
    supplied source frame.

    With `xy`, source indices broadcast over its seed dimension. Without `xy`,
    `source_frame` is one frame index or a sequence of frames to seed independently.
    Coordinates are clipped to the image extent [-0.5, width/height - 0.5].
    """
    batch_size, num_frames, _, height, width = images.shape
    if xy is None:
        source_frame = torch.as_tensor(source_frame, device=images.device)
        if source_frame.ndim > 1 or not source_frame.numel():
            raise ValueError("Grid source_frame must be one index or a nonempty sequence")
        source_frame = source_frame.reshape(-1)
        xy = spread_grid(height, width, stride, device=images.device)
        xy, source_frame = (
            xy.repeat(len(source_frame), 1), source_frame.repeat_interleave(len(xy))
        )
    xy = torch.as_tensor(xy, device=images.device, dtype=torch.float32)
    xy = torch.minimum(xy.clamp_min(-0.5), xy.new_tensor([width, height]) - 0.5)
    if xy.ndim == 2:
        xy = xy.unsqueeze(0).expand(batch_size, -1, -1)
    return track_queries(
        xy, num_frames, source_frame=source_frame, target_frames=target_frames,
        reference_frame=reference_frame,
    )


def tracking_predictions(result: Result, group_index: int = 0) -> Predictions:
    """Return a track group's fields as [B, seed, target, ...], preserving seed IDs.

    Targets follow group["target_frames"]. When they are all frames of a synchronized
    rig, unflatten the target axis as (num_timesteps, num_views). No view reduction
    or coordinate alignment is applied.
    """
    group = result.metadata["groups"][group_index]
    if group["kind"] != "tracks":
        raise ValueError("group_index must select a tracks group")
    start, count = group["start"], group["count"]
    return Predictions(
        **{
            f.name: getattr(result.predictions, f.name)[:, start : start + count]
            .unflatten(1, (len(group["target_frames"]), group["points_per_frame"]))
            .transpose(1, 2)
            for f in fields(Predictions)
        }
    )


def _target_major(records, num_frames):
    """Concatenate target-major track records along the track axis, keeping target-major order."""
    return type(records[0])(
        **{
            f.name: torch.cat(
                [getattr(r, f.name).unflatten(1, (num_frames, -1)) for r in records], dim=2
            ).flatten(1, 2)
            for f in fields(records[0])
        }
    )


def _mark(covered, predictions, source_frame, radius):
    """Mark every (frame, pixel) a track was predicted visible at, dilated by `radius`."""
    frames, height, width = covered.shape
    uv = predictions.uv[0].to(covered.device).float().unflatten(0, (frames, -1))
    xy = (uv * uv.new_tensor([width, height]) - 0.5).round().long()
    seen = predictions.visibility_logits[0].to(covered.device).unflatten(0, (frames, -1)) > 0
    seen &= torch.isfinite(uv).all(-1)
    seen[source_frame] = False
    frame = torch.arange(frames, device=covered.device)[:, None].expand_as(seen)
    for dy in range(-radius, radius + 1):
        for dx in range(-radius, radius + 1):
            x, y = xy[..., 0] + dx, xy[..., 1] + dy
            inside = seen & (x >= 0) & (x < width) & (y >= 0) & (y < height)
            covered[frame[inside], y[inside], x[inside]] = True


def track_all_pixels(
    images,
    decode,
    *,
    source_frame=0,
    stride=2,
    reference_frame=0,
    sky=None,
    progress=None,
):
    """D4RT Algorithm 1: track every `stride`-th pixel of the clip once.

    Frames are seeded from `source_frame` forwards, then backwards. The first frame
    seeds its whole lattice; each later frame seeds only lattice pixels that no
    earlier track was predicted visible at (within `(stride + 1) // 2` pixels, at
    least 1). Pixels in the `sky` mask [1,F,H,W] are never seeded. Every track is decoded at every frame. Returns target-major tracks as
    one group, with per-query source frames. `decode(queries, progress=...)`
    supplies prediction execution without coupling this task to an inference runner.
    """
    batch_size, frames, _, height, width = images.shape
    if batch_size != 1:
        raise ValueError("all-pixels tracking runs one clip at a time")
    radius = max(1, (stride + 1) // 2)
    covered = torch.zeros((frames, height, width), dtype=torch.bool, device=images.device)
    if sky is not None:
        covered |= sky[0].to(covered.device)
    lattice = torch.zeros((height, width), dtype=torch.bool, device=images.device)
    lattice[::stride, ::stride] = True
    order = [*range(source_frame, frames), *range(source_frame - 1, -1, -1)]
    seeds, queries, predictions = [0] * frames, [], []
    for step, frame in enumerate(order):
        yx = (lattice & ~covered[frame]).nonzero()
        if not len(yx):
            continue
        covered[frame, yx[:, 0], yx[:, 1]] = True
        query = track_queries(
            yx.flip(-1), frames, source_frame=frame, reference_frame=reference_frame
        )
        prediction = decode(
            query,
            progress=None
            if progress is None
            else lambda value, detail: progress(
                (step + value) / len(order),
                f"frame {step + 1} of {len(order)}, {len(yx):,} new tracks, {detail}",
            ),
        )
        _mark(covered, prediction, frame, radius)
        seeds[frame] = len(yx)
        queries.append(query.cpu())
        predictions.append(prediction)
    if queries:
        queries, predictions = _target_major(queries, frames), _target_major(predictions, frames)
    else:
        queries = Queries(torch.empty(batch_size, 0, 2), 0, 0, 0)
        predictions = Predictions.empty(batch_size)
    group = {
        "kind": "tracks",
        "source_frame": source_frame,
        "reference_frame": reference_frame,
        "seeds_per_frame": seeds,
        "target_frames": list(range(frames)),
        "start": 0,
        "count": queries.num_queries,
        "points_per_frame": sum(seeds),
    }
    return queries, predictions, [group]
