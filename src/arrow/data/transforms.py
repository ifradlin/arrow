"""Benchmark image preparation with pixel-center coordinate transforms."""

import numpy as np
import torch
import torch.nn.functional as F


def input_size(width, height, max_side):
    """Benchmark (width, height): resize the long edge, then align to 14-pixel patches."""
    if max_side % 14:
        raise ValueError("max_side must be divisible by 14")
    scale = max_side / max(width, height)
    return tuple(max(14, (max(1, round(side * scale)) + 7) // 14 * 14) for side in (width, height))


def image_geometry(sizes, *, max_side):
    """Resize/padding metadata for input (width, height) pairs."""
    resized = [input_size(width, height, max_side) for width, height in sizes]
    width, height = max(w for w, _ in resized), max(h for _, h in resized)
    frames = []
    for (original_w, original_h), (target_w, target_h) in zip(sizes, resized):
        left, top = (width - target_w) // 2, (height - target_h) // 2
        sx, sy = target_w / original_w, target_h / original_h
        frames.append({
            "original_size": [original_h, original_w],
            "resized_size": [target_h, target_w],
            "padding": [left, top, width - target_w - left, height - target_h - top],
            "original_to_input": [
                [sx, 0, (sx - 1) / 2 + left],
                [0, sy, (sy - 1) / 2 + top],
                [0, 0, 1],
            ],
        })
    return frames


def prepare_images(images, frames, *, max_side):
    """Resize with antialiased bilinear interpolation and center-pad with white."""
    tensors = []
    geometry = image_geometry([image.size for image in images], max_side=max_side)
    for image, metadata, shape in zip(images, frames, geometry):
        tensor = torch.from_numpy(np.asarray(image).astype(np.float32) / 255.0)
        tensor = tensor.permute(2, 0, 1).contiguous()
        target_h, target_w = shape["resized_size"]
        if (target_w, target_h) != image.size:
            tensor = F.interpolate(
                tensor.unsqueeze(0), size=(target_h, target_w), mode="bilinear",
                align_corners=False, antialias=True,
            ).squeeze(0)
        metadata.update(shape)
        left, top, right, bottom = shape["padding"]
        tensors.append(F.pad(tensor, (left, right, top, bottom), value=1.0))
    return torch.stack(tensors).contiguous()
