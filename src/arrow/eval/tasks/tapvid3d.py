"""RGB-only TAPVid-3D tasks: original camera coordinates or a fixed first camera."""

import numpy as np
import torch

from arrow.eval.metrics.tapvid3d import camera_metrics, world_metrics
from arrow.eval.metrics.reduction import mean_metrics
from arrow.eval.types import SceneResult
from arrow.tasks.tracking import tracking_predictions


def prepare(scene, reference_frame):
    frame_ids = torch.tensor([frame["index"] for frame in scene.observations.frame_info])
    queries = scene.annotations["queries_xyt"].float()
    matches = queries[:, 2].round().long()[:, None] == frame_ids[None]
    ids = matches.any(-1).nonzero().flatten()
    source_frame = matches[ids].long().argmax(-1)
    xy = scene.observations.transform_points(queries[ids, :2], source_frame)
    poses = scene.annotations.get("benchmark_poses")
    poses = scene.poses if poses is None else poses[frame_ids]
    w2c = torch.linalg.inv(poses.double())
    world = scene.tracks_world[:, ids].transpose(0, 1).double()
    camera = (torch.einsum("fij,nfj->nfi", w2c[:, :3, :3], world) + w2c[:, :3, 3]).float()
    reference = (world @ w2c[0, :3, :3].T + w2c[0, :3, 3]).float()
    visible = scene.visibility[:, ids].T & torch.isfinite(camera).all(-1)
    benchmark = scene.metadata["benchmark_camera"]
    intrinsics = np.asarray(benchmark["intrinsics"], dtype=np.float32)
    parameters = intrinsics[(0, 1, 0, 1), (0, 1, 2, 2)] * (256 / min(benchmark["image_size"]))
    return (
        {"observations": scene.observations, "tasks": ["track"], "xy": xy,
         "source_frame": source_frame, "reference_frame": reference_frame, "skip_sky": False},
        {"tracks_cam": camera, "tracks_ref0": reference, "visibility": visible,
         "intrinsics": parameters,
         "rotation": torch.tensor(scene.metadata["benchmark_from_prepared_rotation"], dtype=torch.float32)},
        {"track_ids": ids.tolist(), "query_frames": queries[ids, 2].long().tolist()},
    )


def aggregate(scenes, *, metric_aux=()):
    return mean_metrics(scenes, skip_nan=False)


class TAPVid3DCameraTask:
    def prepare(self, scene):
        return prepare(scene, "target")

    def score(self, targets, result):
        prediction = tracking_predictions(result)
        points = prediction.points[0].float() @ targets["rotation"].T
        return SceneResult(camera_metrics(targets["tracks_cam"].numpy(), points.numpy(),
                              targets["visibility"].numpy(),
                              (prediction.visibility_logits[0] > 0).numpy(), targets["intrinsics"]))

    aggregate = staticmethod(aggregate)


class TAPVid3DWorldTask:
    def prepare(self, scene):
        return prepare(scene, 0)

    def score(self, targets, result):
        points = tracking_predictions(result).points[0].float() @ targets["rotation"].T
        return SceneResult(world_metrics(targets["tracks_ref0"], points, targets["visibility"],
                             targets["tracks_cam"], targets["intrinsics"]))

    aggregate = staticmethod(aggregate)
