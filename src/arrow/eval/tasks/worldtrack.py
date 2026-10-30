"""WorldTrack query preparation and trajectory scoring."""

from dataclasses import dataclass

import torch

from arrow.tasks.tracking import tracking_predictions
from arrow.eval.metrics.tracking import aggregate_worldtrack, worldtrack_metrics
from arrow.eval.types import SceneResult


@dataclass
class WorldTrackTask:
    thresholds: tuple[float, ...] = (.1, .3, .5, 1.)
    dynamic_threshold: float = .01

    def prepare(self, scene):
        """Return model inputs, scoring targets and result metadata for this protocol."""
        tracks, visibility = scene.tracks_world, scene.visibility
        w2c = torch.linalg.inv(scene.poses)
        reference = tracks @ w2c[0, :3, :3].T + w2c[0, :3, 3]
        source = torch.einsum("fij,ftj->fti", w2c[:, :3, :3], tracks) + w2c[:, None, :3, 3]
        xy = source[0, :, :2] / source[0, :, 2:].clamp_min(1e-6)
        xy = torch.einsum("ij,tj->ti", scene.intrinsics[:2, :2], xy) + scene.intrinsics[:2, 2]
        h, w = scene.observations.images.shape[-2:]
        keep = visibility[0] & (xy >= -.5).all(-1) & (xy <= xy.new_tensor([w, h]) - .5).all(-1)
        ids = keep.nonzero().flatten()
        return (
            {"observations": scene.observations, "tasks": ["track"], "xy": xy[ids],
             "source_frame": 0, "reference_frame": 0, "skip_sky": False},
            {"tracks_ref0": reference[:, ids].transpose(0, 1).contiguous(),
             "visibility": visibility[:, ids].T.contiguous()},
            {"track_ids": ids.tolist()},
        )

    def score(self, targets, result):
        return SceneResult(worldtrack_metrics(targets["tracks_ref0"], tracking_predictions(result).points[0],
                                             self.thresholds, self.dynamic_threshold))

    def aggregate(self, scenes, *, metric_aux=()):
        return aggregate_worldtrack(scenes)
