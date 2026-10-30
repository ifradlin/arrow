"""Pose metrics with Umeyama trajectory alignment and pooled pairwise AUC."""

import numpy as np
import torch

from arrow.eval.types import SceneResult
from .reduction import mean_metrics


def rotation_angle(rotation):
    skew = rotation - rotation.mT
    sine = torch.stack([skew[..., 2, 1], skew[..., 0, 2], skew[..., 1, 0]], -1).norm(dim=-1) / 2
    cosine = (rotation.diagonal(dim1=-2, dim2=-1).sum(-1) - 1) / 2
    return torch.atan2(sine, cosine).rad2deg()


def _static(vectors, centers):
    return vectors.norm(dim=-1) <= 1e-9 * max(1., float(centers.norm(dim=-1).max()))


def _consecutive(poses):
    return torch.linalg.inv(poses[:-1]) @ poses[1:]


def _trajectory_metrics(gt, pred):
    if len(gt) < 3:
        return {}
    target, source = gt[:, :3, 3], pred[:, :3, 3]
    target_centered, source_centered = target - target.mean(0), source - source.mean(0)
    if bool(_static(target_centered, target).all() or _static(source_centered, source).all()):
        return {}
    u, singular, vh = torch.linalg.svd(target_centered.T @ source_centered / len(source))
    sign = torch.ones(3, dtype=source.dtype)
    if torch.det(u) * torch.det(vh) < 0:
        sign[-1] = -1
    rotation = u @ torch.diag(sign) @ vh
    scale = (singular * sign).sum() / source_centered.square().sum(-1).mean()
    translation = target.mean(0) - scale * rotation @ source.mean(0)
    aligned = pred.clone()
    aligned[:, :3, :3] = rotation @ pred[:, :3, :3]
    aligned[:, :3, 3] = scale * source @ rotation.T + translation
    center_error = (aligned[:, :3, 3] - target).norm(dim=-1)
    relative_error = torch.linalg.inv(_consecutive(gt)) @ _consecutive(aligned)
    return {
        "pose_ATE": float(center_error.square().mean().sqrt()),
        "pose_APETranslationMean": float(center_error.mean()),
        "pose_RPE_trans": float(relative_error[:, :3, 3].square().sum(-1).mean().sqrt()),
        "pose_RPE_rot": float(rotation_angle(relative_error[:, :3, :3]).square().mean().sqrt()),
    }


def calculate_auc_np(r_error, t_error, max_threshold=30):
    max_errors = np.maximum(r_error, t_error)
    histogram, _ = np.histogram(max_errors, bins=np.arange(max_threshold + 1))
    normalized_histogram = histogram.astype(float) / len(max_errors)
    return np.mean(np.cumsum(normalized_histogram)), normalized_histogram


def pose_metrics(gt, pred, valid):
    pred, gt = pred.detach().double().cpu(), gt.detach().double().cpu()
    valid = valid.cpu().bool() & torch.isfinite(pred).all(dim=(-2, -1))
    metrics = {f"pose_{name}": float("nan") for name in
               ("ATE", "RPE_trans", "RPE_rot", "APETranslationMean", "RRE", "RTA")}
    metrics["pose_ValidFraction"] = float(valid.sum()) / max(1, len(valid))
    score = SceneResult(metrics, {"r_error": [], "t_error": []})
    if int(valid.sum()) < 2:
        return score
    pred, gt = pred[valid], gt[valid]
    metrics.update(_trajectory_metrics(gt, pred))
    first, second = torch.combinations(torch.arange(len(gt)), 2).unbind(-1)
    gt_relative = torch.linalg.inv(gt[first]) @ gt[second]
    pred_relative = torch.linalg.inv(pred[first]) @ pred[second]
    r_error = rotation_angle(gt_relative[:, :3, :3].mT @ pred_relative[:, :3, :3])
    gt_translation, pred_translation = gt_relative[:, :3, 3], pred_relative[:, :3, 3]
    t_error = torch.atan2(torch.linalg.cross(pred_translation, gt_translation).norm(dim=-1),
                         (pred_translation * gt_translation).sum(-1).abs()).rad2deg()
    t_error[_static(pred_translation, pred[:, :3, 3])] = 90.
    moving = ~_static(gt_translation, gt[:, :3, 3])
    metrics["pose_RRE"] = float(r_error.mean())
    metrics["pose_RTA"] = float(t_error[moving].mean()) if bool(moving.any()) else float("nan")
    score.metric_aux = {"r_error": r_error[moving].tolist(), "t_error": t_error[moving].tolist()}
    return score


def aggregate_pose(scenes, metric_aux):
    metrics = mean_metrics(scenes)
    r_error = np.concatenate([np.asarray(aux["r_error"], dtype=float) for aux in metric_aux])
    t_error = np.concatenate([np.asarray(aux["t_error"], dtype=float) for aux in metric_aux])
    auc = [float(calculate_auc_np(r_error, t_error, max_threshold=threshold)[0])
           if len(r_error) else float("nan") for threshold in (30, 15, 5, 3)]
    metrics.update({f"pose_AUC{threshold}": value for threshold, value in zip((30, 15, 5, 3), auc)})
    metrics["pose_AUC"] = float(np.mean(auc))
    return metrics
