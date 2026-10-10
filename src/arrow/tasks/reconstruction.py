from ..queries import ReferenceFrame, per_frame_queries, pixel_grid


def reconstruction_queries(images, *, stride=2, reference_frame: ReferenceFrame = 0):
    """Build a pixel grid for each frame of images [B, F, 3, H, W]."""
    batch_size, num_frames, _, height, width = images.shape
    xy = pixel_grid(height, width, stride=stride, device=images.device)
    return per_frame_queries(
        xy.unsqueeze(0).expand(batch_size, -1, -1),
        num_frames,
        reference_frame=reference_frame,
    )


def depth_queries(images, *, stride=2):
    return reconstruction_queries(images, stride=stride, reference_frame="source")
