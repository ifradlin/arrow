# Copyright 2026 Google LLC
# Licensed under Apache-2.0; see LICENSE.
# Adapted from tapnet/tapvid3d/evaluation/metrics.py at
# c2cbab81cc06092b5f05bfe2da7bfec54e2079c9: retain the official median-scaling
# protocol only, for one video's [track, frame, xyz] arrays.

"""TAPVid-3D camera metrics and a first-camera-frame extension."""

import numpy as np
import torch

THRESHOLDS = (1, 2, 4, 8, 16)


def threshold_multiplier(gt_camera, intrinsics):
    return gt_camera[..., 2] / np.sqrt(intrinsics[0] * intrinsics[1])


def camera_metrics(gt, pred, gt_visible, pred_visible, intrinsics):
    """Official median scaling, depth-adaptive thresholds and query-frame inclusion."""
    gt_norms = np.sqrt(np.maximum(1e-12, np.sum(np.square(gt), axis=-1)))
    pred_norms = np.sqrt(np.maximum(1e-12, np.sum(np.square(pred), axis=-1)))
    both_visible = gt_visible & pred_visible
    # Upstream's NaN array promotes median scaling and distances to float64.
    nan = np.full(gt_norms.shape, np.nan)
    with np.errstate(invalid="ignore", divide="ignore"):
        scale = (np.nanmedian(np.where(both_visible, gt_norms, nan), keepdims=True) /
                 np.nanmedian(np.where(both_visible, pred_norms, nan), keepdims=True))
        distances_squared = np.sum(np.square(pred * scale - gt), axis=-1)
        multiplier = threshold_multiplier(gt, intrinsics)
        metrics = {"OA": float(np.mean(gt_visible == pred_visible))}
        for threshold in THRESHOLDS:
            within = distances_squared < np.square(threshold * multiplier)
            correct = within & gt_visible
            metrics[f"pts_within_{threshold}"] = float(np.sum(correct) / np.sum(gt_visible))
            true_positives = np.sum(correct & pred_visible)
            false_positives = np.sum((~gt_visible | ~within) & pred_visible)
            metrics[f"jaccard_{threshold}"] = float(
                true_positives / (np.sum(gt_visible) + false_positives))
    metrics["APD3D"] = float(np.mean([metrics[f"pts_within_{t}"] for t in THRESHOLDS]))
    metrics["AJ"] = float(np.mean([metrics[f"jaccard_{t}"] for t in THRESHOLDS]))
    return metrics


def world_metrics(gt, pred, visible, gt_camera, intrinsics):
    """One scale in the first-camera frame; L1 is mean coordinate error / GT norm."""
    included = visible & torch.isfinite(pred).all(-1)

    def median_norm(points):
        values = points[included].numpy()
        return float(np.nanmedian(np.sqrt(np.maximum(1e-12, np.square(values).sum(-1))))) if values.size else 1.

    gt_scale = median_norm(gt)
    scale = gt_scale / median_norm(pred)
    multiplier = threshold_multiplier(gt_camera.numpy(), intrinsics)
    distances_squared = np.square((pred * scale - gt).numpy()).sum(-1)
    mask = visible.numpy()
    with np.errstate(invalid="ignore", divide="ignore"):
        metrics = {f"pts_within_{t}": float(np.sum(
            (distances_squared < np.square(t * multiplier)) & mask) / np.sum(mask))
                   for t in THRESHOLDS}
    metrics["APD3D"] = float(np.mean(list(metrics.values())))
    differences = (pred * scale - gt).abs()[visible] / gt_scale
    differences = differences.masked_fill(~torch.isfinite(differences), float("inf"))
    metrics["normalized_l1"] = float(differences.mean()) if differences.numel() else float("nan")
    return metrics
