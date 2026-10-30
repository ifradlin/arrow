"""Dataset preprocessing and shared RGB-D asset writing."""

import json
from pathlib import Path
import shutil

import numpy as np

from arrow.data.io import write_depth


def pixel_intrinsics(normalized, height, width):
    """Convert normalized intrinsics to float32 pixel intrinsics with integer centers."""
    intrinsics = np.array(normalized, dtype=np.float32)
    intrinsics[0] *= width
    intrinsics[1] *= height
    intrinsics[:2, 2] -= .5
    return intrinsics.tolist()


def write_rgbd_scene(output, frames, poses, metadata):
    """Write (source RGB path, output image name, metric depth) records and camera metadata."""
    output = Path(output)
    output.mkdir(parents=True, exist_ok=False)
    for field in ("color", "depth"):
        (output / field).mkdir()
    for source, name, depth in frames:
        shutil.copyfile(source, output / "color" / name)
        write_depth(output / "depth" / Path(name).with_suffix(".png"), depth)
    camera, = metadata["cameras"].values()
    pose_path = output / camera["pose"]
    pose_path.parent.mkdir(parents=True)
    np.save(pose_path, poses.astype(np.float32))
    (output / "scene.json").write_text(json.dumps(metadata, indent=2) + "\n")
