"""Numerical evaluation metrics, independent of datasets and model execution."""

import numpy as np
import torch

from .reduction import mean_metrics


def median_norm_scale(gt, pred):
    gt, pred = gt.double(), pred.double()
    valid = torch.isfinite(gt).all(-1)
    finite = valid & torch.isfinite(pred).all(-1)
    scale = 1.
    if finite.any():
        scale = (np.median(gt[finite].norm(dim=-1).clamp_min(1e-12).numpy()) /
                 np.median(pred[finite].norm(dim=-1).clamp_min(1e-12).numpy()))
    return scale


def trajectory_metrics(gt, pred, thresholds):
    gt, pred = gt.double(), pred.double()
    valid = torch.isfinite(gt).all(-1)
    distances = (pred - gt).norm(dim=-1)[valid]
    finite = torch.isfinite(distances)
    fractions = {f"frac_{t:g}": float(((distances <= t) & finite).double().mean())
                 for t in thresholds}
    return {
        "APD": float(np.mean(list(fractions.values()))),
        "EPE": float(distances[finite].mean()),
        "pred_finite_frac": float(finite.double().mean()),
        **fractions,
    }


def median_scaled_trajectory_metrics(gt, pred, thresholds):
    metrics = trajectory_metrics(gt, pred.double() * median_norm_scale(gt, pred), thresholds)
    return {key: metrics[key] for key in ("APD", "EPE", "pred_finite_frac")}


def visibility_metrics(gt, pred, domain, visible, logits, thresholds):
    if not domain.any():
        return {"OA": float("nan"), "AJ": float("nan")}
    predicted_visible = logits > 0
    oa = float((predicted_visible[domain] == visible[domain]).float().mean())
    distances = (pred.double() - gt.double()).norm(dim=-1)
    jaccards = []
    for threshold in thresholds:
        within = torch.isfinite(distances) & (distances <= threshold)
        tp = (domain & visible & predicted_visible & within).sum()
        fp = (domain & predicted_visible & (~visible | ~within)).sum()
        denominator = visible.sum() + fp
        if denominator > 0:
            jaccards.append(float(tp.double() / denominator.double()))
    return {"OA": oa, "AJ": float(np.mean(jaccards)) if jaccards else float("nan")}


def worldtrack_metrics(gt, pred, thresholds, dynamic_threshold):
    valid = torch.isfinite(gt).all(-1)
    motion = (gt[:, 1:].float() - gt[:, :-1].float()).norm(dim=-1)
    motion = torch.where(valid[:, 1:] & valid[:, :-1], motion, 0.)
    dynamic = motion.sum(-1) > dynamic_threshold
    return {**median_scaled_trajectory_metrics(gt, pred, thresholds),
            **{key + "_dyn": value for key, value in median_scaled_trajectory_metrics(gt[dynamic], pred[dynamic], thresholds).items()}}


def mvtracker_metrics(gt, pred, valid, visible, logits, thresholds):
    domain = valid.bool() & torch.isfinite(gt).all(-1)
    visible = domain & visible.bool()
    position_gt = gt.masked_fill(~visible[..., None], float("nan"))
    aligned = pred.double() * median_norm_scale(position_gt, pred)
    return {**trajectory_metrics(position_gt, aligned, thresholds),
            **visibility_metrics(gt, aligned, domain, visible, logits, thresholds)}


def aggregate_worldtrack(scenes):
    result = mean_metrics(scenes)
    # The benchmark divides dynamic EPE by the all-point EPE sequence count.
    count = sum(not np.isnan(scene["EPE"]) for scene in scenes)
    result["EPE_dyn"] = float(np.nansum([s["EPE_dyn"] for s in scenes]) / count) if count else float("nan")
    return result
