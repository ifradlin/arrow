"""Video-depth evaluation with whole-clip alignment and pixel-weighted metrics."""

from dataclasses import dataclass

import torch

from arrow.eval.metrics.depth import aggregate_video_depth, video_depth_metrics


@dataclass
class VideoDepthTask:
    depth_range: tuple[float, float] | None = None
    eps: float = 1e-6
    affine_lr: float = 1e-4
    affine_max_iters: int = 1000
    affine_tolerance: float = 1e-6

    def prepare(self, scene):
        if scene.depth is None:
            raise ValueError("Video depth requires load_depth=True")
        mask = torch.isfinite(scene.depth) & (scene.depth > 0)
        if self.depth_range is not None:
            low, high = self.depth_range
            mask &= (scene.depth > low) & (scene.depth < high)
        return (
            {"observations": scene.observations, "tasks": ["depth"],
             "depth_stride": 1, "skip_sky": False},
            {"depth": scene.depth, "mask": mask},
            {"num_views": scene.observations.num_views},
        )

    def score(self, targets, result):
        frames, _, height, width = result.images.shape[1:]
        depth = result.predictions.points[0, :, 2].reshape(frames, height, width)
        return video_depth_metrics(targets["depth"], depth, targets["mask"], eps=self.eps,
                                   affine_lr=self.affine_lr, affine_max_iters=self.affine_max_iters,
                                   affine_tolerance=self.affine_tolerance)

    def aggregate(self, scenes, *, metric_aux):
        return aggregate_video_depth(scenes, metric_aux)
