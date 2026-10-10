"""Sky segmentation, used to skip queries whose source pixel is sky."""

from functools import lru_cache

import numpy as np

import torch
import torch.nn.functional as F

SKYSEG_MODEL = "JianyuanWang/skyseg"
SKYSEG_FILENAME = "skyseg.onnx"


@lru_cache(maxsize=1)
def _session():
    import onnxruntime
    from huggingface_hub import hf_hub_download

    return onnxruntime.InferenceSession(
        hf_hub_download(SKYSEG_MODEL, SKYSEG_FILENAME), providers=["CPUExecutionProvider"]
    )


MEAN, STD = torch.tensor([0.485, 0.456, 0.406]), torch.tensor([0.229, 0.224, 0.225])


@torch.inference_mode()
def segment_sky(images):
    """Images [B,F,3,H,W] in [0, 1] to a sky mask [B,F,H,W].

    The model sees each frame at 320 × 320 with ImageNet normalization. Its score map is stretched
    to [0, 1] per frame; scores of at least 32/255 are classified as sky.
    """
    session = _session()
    name = session.get_inputs()[0].name
    frames = F.interpolate(images.flatten(0, 1).float().cpu(), (320, 320), mode="bilinear")
    frames = (frames - MEAN[:, None, None]) / STD[:, None, None]
    # One frame per call; the first output is the final score map.
    scores = torch.cat(
        [torch.from_numpy(np.asarray(session.run(None, {name: frame[None].numpy()})[0])[0]) for frame in frames]
    )
    low, high = scores.amin((1, 2), keepdim=True), scores.amax((1, 2), keepdim=True)
    scores = ((scores - low) / (high - low) * 255).floor() / 255
    scores = F.interpolate(scores[:, None], images.shape[-2:], mode="bilinear")[:, 0]
    return (scores >= 32 / 255).unflatten(0, images.shape[:2]).to(images.device)
