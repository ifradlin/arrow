"""Deterministic inference input preparation, without training augmentation."""

from dataclasses import dataclass

import torch

from ..data.io import read_media
from ..data.transforms import prepare_images


@dataclass(frozen=True)
class ObservationBatch:
    """Prepared images [B, F, 3, H, W] and metadata for each frame."""

    images: torch.Tensor
    frame_info: list[dict]
    num_views: int = 1

    def __post_init__(self):
        if self.num_views < 1 or self.images.shape[1] % self.num_views:
            raise ValueError("images must contain complete synchronized timesteps")
        if len(self.frame_info) != self.images.shape[1]:
            raise ValueError("frame_info must describe every frame")

    @property
    def num_frames(self) -> int:
        return self.images.shape[1]

    @property
    def num_timesteps(self) -> int:
        return self.images.shape[1] // self.num_views

    def transform_points(self, xy: torch.Tensor, source_frame: torch.Tensor | int) -> torch.Tensor:
        """Map original-image pixel centers to model pixels in each seed's source frame."""
        xy = xy.float()
        transforms = torch.tensor(
            [frame["original_to_input"] for frame in self.frame_info], device=xy.device, dtype=xy.dtype
        )
        transform = transforms[source_frame]
        return (transform[..., :2, :2] @ xy.unsqueeze(-1)).squeeze(-1) + transform[..., :2, 2]


def load_input(source, *, start=0, stride=1, max_frames=24, max_side=504, frame_indices=None):
    """Select frames and prepare a batch; `frame_indices` overrides start, stride and max_frames."""
    if max_side < 1:
        raise ValueError("max_side must be positive")
    images, frame_info = read_media(source, start=start, stride=stride, max_frames=max_frames, frame_indices=frame_indices)
    return ObservationBatch(
        prepare_images(images, frame_info, max_side=max_side).unsqueeze(0), frame_info
    )


def load_multiview_input(sources, *, start=0, stride=1, max_frames=24, max_side=504, frame_indices=None):
    """Load an ordered mapping of camera names to synchronized videos/image sequences.

    Streams must already be aligned by frame index. Selection applies to every
    camera; `max_frames` counts timesteps, or `frame_indices` selects them explicitly.
    Frames are flattened as t * V + v,
    with camera order taken from the mapping. No temporal alignment is inferred.
    """
    if not sources:
        raise ValueError("sources must contain at least one camera")
    if max_side < 1:
        raise ValueError("max_side must be positive")
    streams = [
        read_media(source, start=start, stride=stride, max_frames=max_frames, frame_indices=frame_indices)
        for source in sources.values()
    ]
    indices = [frame["index"] for frame in streams[0][1]]
    if any([frame["index"] for frame in frames] != indices for _, frames in streams[1:]):
        raise ValueError("All camera streams must have the same selected frame indices")
    images, frame_info = [], []
    for timestep in range(len(indices)):
        for view, (name, (view_images, view_frames)) in enumerate(zip(sources, streams)):
            images.append(view_images[timestep])
            frame_info.append(
                {**view_frames[timestep], "view": view, "view_name": name, "timestep": timestep}
            )
    return ObservationBatch(
        prepare_images(images, frame_info, max_side=max_side).unsqueeze(0), frame_info, len(sources)
    )
