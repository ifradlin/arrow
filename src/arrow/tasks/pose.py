"""Camera poses from the two pointmaps of a pose query group.

Both pointmaps answer the same pixels, once in each frame's own camera and once in
the reference camera, so their points correspond exactly. Each frame's pose is the
weighted rigid fit between them.
"""

import torch

from ..queries import per_frame_queries, pixel_grid
from ..types import Poses, Queries

POSE_DEFAULTS = {
    "grid_size": 64,
    "reference_frame": "middle",
    "confidence_keep": 0.5,
    "weight_power": 2.0,
    "min_points": 8,
    "visibility_logit_threshold": 0.0,
}


def resolve_pose_reference(num_frames, reference_frame=None):
    reference_frame = POSE_DEFAULTS["reference_frame"] if reference_frame is None else reference_frame
    if reference_frame == "middle":
        return num_frames // 2
    return 0 if reference_frame == "first" else reference_frame


def estimate_poses(
    predictions,
    xy,
    *,
    num_frames,
    reference_frame=None,
    confidence_keep=POSE_DEFAULTS["confidence_keep"],
    weight_power=POSE_DEFAULTS["weight_power"],
    min_points=POSE_DEFAULTS["min_points"],
    visibility_logit_threshold=POSE_DEFAULTS["visibility_logit_threshold"],
):
    """Benchmark weighted-rigid poses; intrinsics are an independent display fit."""
    reference_frame = resolve_pose_reference(num_frames, reference_frame)
    points = predictions.points.cpu().float().unflatten(1, (2, num_frames, -1))
    confidence = predictions.point_confidence.cpu().float().unflatten(1, (2, num_frames, -1))
    uv = predictions.uv.cpu().unflatten(1, (2, num_frames, -1))
    visibility = predictions.visibility_logits.cpu().unflatten(1, (2, num_frames, -1))
    mask = torch.isfinite(uv).all(-1) & (uv >= 0).all(-1) & (uv <= 1).all(-1)
    mask &= visibility > visibility_logit_threshold
    xy = xy.cpu().float().unflatten(1, (2, num_frames, -1))[:, 0]
    batch = points.shape[0]
    camera_to_reference = torch.eye(4).repeat(batch, num_frames, 1, 1)
    intrinsics = torch.full((batch, num_frames, 3, 3), float("nan"))
    valid = torch.zeros(batch, num_frames, dtype=torch.bool)
    valid[:, reference_frame] = True
    for b in range(batch):
        for frame in range(num_frames):
            own, shared = points[b, 0, frame], points[b, 1, frame]
            weight = confidence[b, 0, frame] * confidence[b, 1, frame]
            usable = (
                torch.isfinite(own).all(-1)
                & torch.isfinite(shared).all(-1)
                & torch.isfinite(weight)
                & (weight > 0)
                & mask[b, 0, frame]
                & mask[b, 1, frame]
            )
            index = usable.nonzero(as_tuple=True)[0]
            if len(index) < min_points:
                continue
            if confidence_keep < 1.0:
                index = index[weight[index] >= torch.quantile(weight[index], 1 - confidence_keep)]
            if len(index) < min_points:
                continue
            if frame != reference_frame:
                rigid = _weighted_rigid(shared[index], own[index], weight[index].pow(weight_power))
                if rigid is not None:
                    camera_to_reference[b, frame, :3, :3], camera_to_reference[b, frame, :3, 3] = (
                        rigid
                    )
                    valid[b, frame] = True
            positive = index[own[index, 2] > 0]
            if len(positive) >= min_points:
                fit = _pinhole(own[positive], xy[b, frame, positive])
                if fit is not None:
                    intrinsics[b, frame] = fit
    return Poses(camera_to_reference, valid, intrinsics)


def _weighted_rigid(target, source, weight):
    """Fit a weighted rigid transform using FP64 SVD."""
    if target.shape[0] < 3:
        return None
    weight_sum = weight.sum()
    if not bool(torch.isfinite(weight_sum)) or float(weight_sum.item()) <= 0.0:
        return None
    weight = weight / weight_sum
    source_mean = (weight[:, None] * source).sum(dim=0)
    target_mean = (weight[:, None] * target).sum(dim=0)
    covariance = (weight[:, None] * (source - source_mean)).T @ (target - target_mean)
    try:
        u, _, vh = torch.linalg.svd(covariance.double(), full_matrices=False)
    except RuntimeError:
        return None
    v = vh.mT
    rotation = (v @ u.mT).float()
    if float(torch.det(rotation).item()) < 0.0:
        v = v.clone()
        v[:, -1] *= -1
        rotation = (v @ u.mT).float()
    translation = target_mean - source_mean @ rotation.T
    if not bool(torch.isfinite(rotation).all() and torch.isfinite(translation).all()):
        return None
    return rotation, translation.float()


def _pinhole(points, xy):
    """Pixel-center intrinsics with xy = f * (X, Y) / Z + c, by least squares per axis."""
    ray = points[:, :2] / points[:, 2:]
    k = torch.eye(3)
    for axis in range(2):
        design = torch.stack([ray[:, axis], torch.ones_like(ray[:, axis])], dim=-1)
        focal, center = torch.linalg.lstsq(design, xy[:, axis : axis + 1]).solution[:, 0]
        if not focal > 0:
            return None
        k[axis, axis], k[axis, 2] = focal, center
    return k


def pose_queries(images, *, grid_size=64, reference_frame=None):
    """One pixel grid per frame asked twice: in its own camera, then in the reference camera."""
    batch_size, num_frames, _, height, width = images.shape
    xy = pixel_grid(height, width, size=grid_size, device=images.device)
    xy = xy.unsqueeze(0).expand(batch_size, -1, -1)
    reference_frame = resolve_pose_reference(num_frames, reference_frame)
    own = per_frame_queries(xy, num_frames, reference_frame="source")
    shared = per_frame_queries(xy, num_frames, reference_frame=reference_frame)
    return Queries(
        torch.cat([own.xy, shared.xy], dim=1),
        torch.cat([own.source_frame, shared.source_frame], dim=1),
        torch.cat([own.target_frame, shared.target_frame], dim=1),
        torch.cat([own.reference_frame, shared.reference_frame], dim=1),
    )
