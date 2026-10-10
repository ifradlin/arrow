"""Pixel selection and frame roles shared by inference and future query samplers.

Grids use integer pixel centers; explicit tracking seeds retain fractional
coordinates. Task-specific grids live in arrow.tasks.
"""

import math
from typing import Literal

import torch

from .types import Queries

ReferenceFrame = int | Literal["source", "target"]


def pixel_grid(
    height: int,
    width: int,
    *,
    size: int | None = None,
    stride: int | None = None,
    device: torch.device | str = "cpu",
) -> torch.Tensor:
    """Integer (x, y) centers: `size` per axis, or every `stride` pixels."""
    if size is not None and stride is not None:
        raise ValueError("pass exactly one of grid size or stride")
    if size is not None:
        if size < 1:
            raise ValueError("grid size must be positive")
        ys = torch.linspace(0, height - 1, size, device=device).round()
        xs = torch.linspace(0, width - 1, size, device=device).round()
    elif stride is not None:
        if stride < 1:
            raise ValueError("grid stride must be positive")
        ys = torch.arange(0, height, stride, device=device, dtype=torch.float32)
        xs = torch.arange(0, width, stride, device=device, dtype=torch.float32)
    else:
        raise ValueError("pass exactly one of grid size or stride")
    y, x = torch.meshgrid(ys, xs, indexing="ij")
    return torch.stack([x, y], dim=-1).reshape(-1, 2)


def grid_axis(size, low, high, stride):
    """Pixel centers about `stride` apart from edge to edge of [low, high] (fractions of `size`).

    The first and last pixels inside the span are always included and the rest are spread evenly
    between them, rounding half up in integers.
    """
    first = max(0, math.ceil(low * size - 0.5))
    last = min(size - 1, math.floor(high * size - 0.5))
    if not stride or last < first:
        return []
    span = last - first
    count = (2 * span + stride) // (2 * stride) + 1
    if count == 1:
        return [first + span // 2]
    return [first + (i * span + (count - 1) // 2) // (count - 1) for i in range(count)]


def spread_grid(height, width, stride, *, region=(0, 0, 1, 1), device="cpu"):
    """Integer (x, y) centers about `stride` px apart, spanning the [0, 1] `region` edge to edge."""
    u0, v0, u1, v1 = region
    xs, ys = grid_axis(width, u0, u1, stride), grid_axis(height, v0, v1, stride)
    return torch.tensor([[x, y] for y in ys for x in xs], dtype=torch.float32, device=device).reshape(-1, 2)


def _role(frame: ReferenceFrame, source: torch.Tensor, target: torch.Tensor) -> torch.Tensor | int:
    if frame == "source":
        return source
    if frame == "target":
        return target
    return frame


def per_frame_queries(
    xy: torch.Tensor, num_frames: int, *, reference_frame: ReferenceFrame = 0
) -> Queries:
    """Ask each frame about its own pixels; input [N,2] or [B,N,2], output frame-major."""
    xy = (xy.unsqueeze(0) if xy.ndim == 2 else xy).float().round()
    frame = torch.arange(num_frames, device=xy.device).repeat_interleave(xy.shape[1])
    return Queries(xy.repeat(1, num_frames, 1), frame, frame, _role(reference_frame, frame, frame))


def track_queries(
    xy: torch.Tensor,
    num_frames: int,
    *,
    source_frame: torch.Tensor | list[int] | int = 0,
    target_frames: torch.Tensor | list[int] | None = None,
    reference_frame: ReferenceFrame = 0,
) -> Queries:
    """Follow seeds through target frames, in target-major then input-seed order.

    `source_frame` broadcasts to [B,N] (one source frame per seed). Targets are
    shared by the batch, defaulting to every frame. Seed coordinates are retained.
    """
    xy = (xy.unsqueeze(0) if xy.ndim == 2 else xy).float()
    targets = (
        torch.arange(num_frames, device=xy.device)
        if target_frames is None
        else torch.as_tensor(target_frames, device=xy.device)
    )
    if targets.ndim != 1 or not targets.numel():
        raise ValueError("target_frames must be a nonempty sequence of frame indices")
    source = torch.broadcast_to(torch.as_tensor(source_frame, device=xy.device), xy.shape[:-1])
    source = source.repeat(1, len(targets))
    target = targets.repeat_interleave(xy.shape[1])
    queries = Queries(
        xy.repeat(1, len(targets), 1), source, target, _role(reference_frame, source, target)
    )
    for name in ("source_frame", "target_frame", "reference_frame"):
        frame = getattr(queries, name)
        if bool(((frame < 0) | (frame >= num_frames)).any()):
            raise ValueError(f"{name} indices must be between 0 and {num_frames - 1}")
    return queries
