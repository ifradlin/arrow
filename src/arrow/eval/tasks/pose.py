"""Pose evaluation with grid queries and confidence-weighted rigid fitting."""

from dataclasses import dataclass, field

from arrow.eval.metrics.pose import aggregate_pose, pose_metrics
from arrow.tasks.pose import estimate_poses, resolve_pose_reference


@dataclass
class PoseTask:
    pose_config: dict = field(default_factory=dict)

    def prepare(self, scene):
        return (
            {"observations": scene.observations, "tasks": ["pose"],
             "pose_config": self.pose_config, "skip_sky": False},
            {"poses": scene.poses},
            {"num_views": scene.observations.num_views,
             "view_names": [f["view_name"] for f in
                            scene.observations.frame_info[:scene.observations.num_views]],
             "reference_frame": resolve_pose_reference(scene.observations.num_frames,
                                                       self.pose_config.get("reference_frame"))},
        )

    def score(self, targets, result):
        group = result.metadata["groups"][0]
        poses = estimate_poses(result.predictions, result.queries.xy,
                               num_frames=result.images.shape[1],
                               reference_frame=group["reference_frame"], **group["pose"])
        return pose_metrics(targets["poses"], poses.camera_to_reference[0], poses.valid[0])

    def aggregate(self, scenes, *, metric_aux):
        return aggregate_pose(scenes, metric_aux)
