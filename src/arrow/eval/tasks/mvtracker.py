"""RGB-only MVTracker: frozen pixel queries and full-clip, scale-aligned scoring."""

from dataclasses import dataclass

import torch

from arrow.eval.metrics.tracking import mvtracker_metrics
from arrow.eval.metrics.reduction import mean_metrics
from arrow.eval.types import SceneResult
from arrow.tasks.tracking import tracking_predictions


@dataclass
class MVTrackerTask:
    thresholds: dict[str, tuple[float, ...]]

    def prepare(self, scene):
        if scene.query_points is None or scene.query_frames is None or scene.validity is None:
            raise ValueError("MVTracker requires prepared query subsets")
        w2c = torch.linalg.inv(scene.poses[0].float())
        reference = scene.tracks_world @ w2c[:3, :3].T + w2c[:3, 3]
        return (
            {"observations": scene.observations, "tasks": ["track"],
             "xy": scene.observations.transform_points(scene.query_points[:, :2], scene.query_frames),
             "source_frame": scene.query_frames, "reference_frame": 0, "skip_sky": False},
            {"tracks_ref0": reference.transpose(0, 1).contiguous(),
             "visibility": scene.visibility.T.contiguous(), "validity": scene.validity.T.contiguous(),
             "num_views": scene.observations.num_views, "thresholds": self.thresholds[scene.subset],
             "subset": scene.subset},
            {"track_ids": scene.track_ids.tolist(), "source_track_ids": scene.source_track_ids.tolist(),
             "query_frames": scene.query_frames.tolist(), "num_views": scene.observations.num_views,
             "source_view_ids": [f["source_view_id"] for f in
                                 scene.observations.frame_info[:scene.observations.num_views]]},
        )

    def score(self, targets, result):
        prediction = tracking_predictions(result)
        views = targets["num_views"]
        points = prediction.points[0].unflatten(1, (-1, views))[:, :, 0]
        logits = prediction.visibility_logits[0].unflatten(1, (-1, views)).amax(2)
        metrics = mvtracker_metrics(targets["tracks_ref0"], points, targets["validity"],
                                    targets["visibility"], logits, targets["thresholds"])
        if targets["subset"] == "kubric":
            metrics["EPE"] *= .13
        return SceneResult(metrics)

    def aggregate(self, scenes, *, metric_aux=()):
        return mean_metrics(scenes)
