"""Point-cloud alignment and reconstruction metrics."""

import torch

from arrow.eval.geometry import procrustes

DISTANCES = ("L1", "Accuracy", "Completeness", "Chamfer", "AccuracyMedian",
             "CompletenessMedian", "ChamferMedian")


def pointcloud_metrics(gt, pred, mask, threshold, *, icp_max_iteration=50,
                       normal_consistency=False):
    import torchpcl as tp

    mask = mask.bool() & torch.isfinite(gt).all(-1)
    if not bool(mask.any()):
        names = (*DISTANCES, "Precision", "Recall", "F1")
        if normal_consistency:
            names += ("NormalConsistency", "NormalConsistencyMedian")
        return {f"point_{name}": float("nan") for name in names}
    pairs = mask & torch.isfinite(pred).all(-1)
    gt_pairs, pred = gt[pairs].float(), pred[pairs].float()
    gt = gt[mask].float()
    if not len(pred):
        metrics = {f"point_{name}": float("inf") for name in DISTANCES}
        metrics.update({f"point_{name}": 0. for name in ("Precision", "Recall", "F1")})
        if normal_consistency:
            metrics.update(point_NormalConsistency=float("nan"), point_NormalConsistencyMedian=float("nan"))
        return metrics
    scale, rotation, translation = procrustes(gt_pairs, pred)
    pred = scale * (pred @ rotation.T) + translation
    metrics = {"point_L1": float((pred - gt_pairs).abs().mean())}
    registration = tp.icp(pred.detach(), gt.detach(), levels=[tp.ICPLevel(
        max_correspondence_distance=2 * threshold, max_iterations=icp_max_iteration)])
    pred = tp.transform(pred.detach(), registration.transforms[0])
    pred_to_gt = tp.knn(gt, pred, k=1)
    gt_to_pred = tp.knn(pred, gt, k=1)
    accuracy = pred_to_gt.distances2[:, 0].sqrt()
    completeness = gt_to_pred.distances2[:, 0].sqrt()
    acc, comp = float(accuracy.mean()), float(completeness.mean())
    acc_median, comp_median = float(torch.quantile(accuracy, .5)), float(torch.quantile(completeness, .5))
    precision, recall = float((accuracy < threshold).float().mean()), float((completeness < threshold).float().mean())
    metrics.update({
        "point_Accuracy": acc, "point_Completeness": comp, "point_Chamfer": .5 * (acc + comp),
        "point_AccuracyMedian": acc_median, "point_CompletenessMedian": comp_median,
        "point_ChamferMedian": .5 * (acc_median + comp_median),
        "point_Precision": precision, "point_Recall": recall,
        "point_F1": 2 * precision * recall / (precision + recall) if precision + recall else 0.,
    })
    if normal_consistency:
        pred_normals = tp.estimate_normals(pred).normals
        gt_normals = tp.estimate_normals(gt).normals
        nc_acc = (pred_normals * gt_normals[pred_to_gt.indices[:, 0]]).sum(-1).abs()
        nc_comp = (gt_normals * pred_normals[gt_to_pred.indices[:, 0]]).sum(-1).abs()
        metrics["point_NormalConsistency"] = .5 * (float(nc_acc.mean()) + float(nc_comp.mean()))
        metrics["point_NormalConsistencyMedian"] = .5 * (
            float(torch.quantile(nc_acc, .5)) + float(torch.quantile(nc_comp, .5)))
    return metrics
