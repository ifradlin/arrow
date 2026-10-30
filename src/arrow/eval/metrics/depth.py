"""Depth alignment and video-depth metrics."""

import numpy as np
import torch

from arrow.eval.types import SceneResult


def align_depth_scale(x, y, weight):
    """Find the scale minimizing weighted L1 error between x and y."""
    x, y, weight = torch.broadcast_tensors(x, y, weight)
    sign = torch.sign(x)
    x, y = x * sign, y * sign
    ratios, order = (y / x.clamp_min(1e-7)).sort(dim=-1)
    wx = torch.gather(x * weight, dim=-1, index=order)
    derivatives = 2 * wx.cumsum(dim=-1) - wx.sum(dim=-1, keepdim=True)
    index = torch.searchsorted(
        derivatives, torch.zeros_like(derivatives[..., :1]), side="left"
    ).clamp_max(derivatives.shape[-1] - 1)
    return ratios.gather(dim=-1, index=index).squeeze(-1)


def affine_depth_alignment(
    pred, gt, weight, *, initial_scale=None, lr=1e-4, max_iters=1000, tolerance=1e-6
):
    """Fit scale and shift with Adam, returning the lowest-loss parameters."""
    with torch.inference_mode(False):
        pred, gt, weight = pred.detach().clone(), gt.detach().clone(), weight.detach().clone()
        if initial_scale is None:
            initial_scale = torch.median(gt) / torch.median(pred)
        scale = initial_scale.detach().clone().reshape(1).requires_grad_()
        shift = torch.zeros(1, device=pred.device, dtype=pred.dtype, requires_grad=True)
        optimizer = torch.optim.Adam([scale, shift], lr=lr)
        previous_loss = None
        best_loss = float("inf")
        best_scale, best_shift = scale.detach().clone(), shift.detach().clone()
        for _ in range(max_iters):
            optimizer.zero_grad()
            aligned = scale * pred + shift
            loss = (weight * (aligned - gt).abs()).sum()
            loss_value = loss.item()
            if loss_value < best_loss:
                best_loss = loss_value
                best_scale, best_shift = scale.detach().clone(), shift.detach().clone()
            loss.backward()
            optimizer.step()
            if previous_loss is not None and abs(previous_loss - loss_value) < tolerance:
                break
            previous_loss = loss_value
    return best_scale[0], best_shift[0]


def video_depth_metrics(
    gt, pred, mask, *, eps=1e-6, affine_lr=1e-4, affine_max_iters=1000, affine_tolerance=1e-6
):
    import cv2

    gt, pred = gt.float(), pred.float()
    if pred.shape[-2:] != gt.shape[-2:]:
        height, width = gt.shape[-2:]
        pred = torch.from_numpy(
            np.stack(
                [
                    cv2.resize(
                        frame.detach().cpu().numpy(), (width, height), interpolation=cv2.INTER_CUBIC
                    )
                    for frame in pred
                ]
            )
        ).to(gt.device)
    mask = mask.bool() & torch.isfinite(gt) & (gt > 0)
    metrics = {
        f"video_depth_{name}_{suffix}": float("nan")
        for suffix in ("S", "SS")
        for name in ("AbsRel", "delta1")
    }
    if not bool(mask.any()):
        return SceneResult(metrics)
    if bool((mask & ~torch.isfinite(pred)).any()):
        raise ValueError("Video depth prediction has non-finite values at valid GT pixels")
    pred, gt = pred[mask], gt[mask]
    weight = 1.0 / gt.clamp_min(eps)
    scale = align_depth_scale(pred, gt, weight).clamp_min(1e-3)
    fits = [
        affine_depth_alignment(
            pred,
            gt,
            weight,
            initial_scale=initial,
            lr=affine_lr,
            max_iters=affine_max_iters,
            tolerance=affine_tolerance,
        )
        for initial in (scale, None)
    ]
    exact, median = fits
    exact_loss = (weight * (exact[0] * pred + exact[1] - gt).abs()).sum()
    median_loss = (weight * (median[0] * pred + median[1] - gt).abs()).sum()
    affine_scale, shift = median if median_loss < exact_loss else exact
    aligned = {}
    if bool(torch.isfinite(scale)) and float(scale) > 0:
        aligned["S"] = pred * scale
    if bool(torch.isfinite(affine_scale)) and bool(torch.isfinite(shift)):
        aligned["SS"] = pred * affine_scale + shift
    if set(aligned) == {"S", "SS"}:
        if ((aligned["SS"] - gt).abs() / gt).sum() > ((aligned["S"] - gt).abs() / gt).sum():
            aligned["SS"] = aligned["S"]
    aux = {}
    for suffix, values in aligned.items():
        absrel = (values - gt).abs() / gt
        positive = values.clamp_min(1e-5)
        delta1 = torch.maximum(positive / gt, gt / positive) < 1.25
        metrics[f"video_depth_AbsRel_{suffix}"] = float(absrel.mean())
        metrics[f"video_depth_delta1_{suffix}"] = float(delta1.float().mean())
        aux.update(
            {
                f"{suffix}_absrel_sum": float(absrel.sum()),
                f"{suffix}_delta1_correct": int(delta1.sum()),
                f"{suffix}_count": values.numel(),
            }
        )
    return SceneResult(metrics, aux)


def aggregate_video_depth(scenes, metric_aux):
    metrics = {key: float("nan") for key in scenes[0]}
    for suffix in ("S", "SS"):
        entries = [aux for aux in metric_aux if f"{suffix}_count" in aux]
        count = sum(aux[f"{suffix}_count"] for aux in entries)
        if count:
            metrics[f"video_depth_AbsRel_{suffix}"] = (
                sum(aux[f"{suffix}_absrel_sum"] for aux in entries) / count
            )
            metrics[f"video_depth_delta1_{suffix}"] = (
                sum(aux[f"{suffix}_delta1_correct"] for aux in entries) / count
            )
    return metrics
