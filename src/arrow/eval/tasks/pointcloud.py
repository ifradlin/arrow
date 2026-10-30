"""Dense reconstruction evaluation with Procrustes alignment and ICP."""

from dataclasses import dataclass, field

import torch
import torch.nn.functional as F

from arrow.eval.geometry import depth_to_reference
from arrow.eval.metrics.pointcloud import DISTANCES, pointcloud_metrics
from arrow.eval.metrics.reduction import mean_metrics
from arrow.eval.types import SceneResult


@dataclass
class PointcloudTask:
    thresholds: dict[str, float]
    depth_ranges: dict[str, tuple[float, float]] = field(default_factory=dict)
    distance_scales: dict[str, float] = field(default_factory=dict)
    icp_max_iteration: int = 50
    normal_consistency: bool = False

    def prepare(self, scene):
        if scene.depth is None:
            raise ValueError("Reconstruction requires load_depth=True")
        depth = scene.depth
        mask = torch.isfinite(depth) & (depth > 0)
        if scene.subset in self.depth_ranges:
            low, high = self.depth_ranges[scene.subset]
            mask &= (depth > low) & (depth < high)
        size = scene.observations.images.shape[-2:]
        if depth.shape[-2:] != size:
            depth = F.interpolate(depth[:, None], size=size, mode="nearest-exact")[:, 0]
            mask = F.interpolate(mask.float()[:, None], size=size, mode="nearest-exact")[:, 0].bool()
        return (
            {"observations": scene.observations, "tasks": ["reconstruct"],
             "reconstruction_stride": 1, "reference_frame": 0, "skip_sky": False},
            {"pointmap": depth_to_reference(depth, scene.intrinsics, scene.poses), "mask": mask,
             "threshold": self.thresholds[scene.subset],
             "distance_scale": self.distance_scales.get(scene.subset, 1.)},
            {"num_views": scene.observations.num_views, "reference_frame": 0},
        )

    def score(self, targets, result):
        points = result.predictions.points.reshape_as(targets["pointmap"])
        metrics = pointcloud_metrics(targets["pointmap"], points, targets["mask"], targets["threshold"],
                                     icp_max_iteration=self.icp_max_iteration,
                                     normal_consistency=self.normal_consistency)
        for name in DISTANCES:
            metrics[f"point_{name}"] *= targets["distance_scale"]
        return SceneResult(metrics)

    def aggregate(self, scenes, *, metric_aux=()):
        return mean_metrics(scenes)
