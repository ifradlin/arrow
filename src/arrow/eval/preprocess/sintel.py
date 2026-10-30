"""Prepare Sintel's scenes from official stereo RGB and corrected depth/camera archives."""

import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image

from arrow.data.io import scene_sha256, write_depth
from .common import pixel_intrinsics

SCENES = ("alley_2", "ambush_4", "ambush_5", "ambush_6", "cave_2", "cave_4", "market_2",
          "market_5", "market_6", "shaman_3", "sleeping_1", "sleeping_2", "temple_2", "temple_3")
RECIPE = "sintel_stereo_final_left_v1"


def read_camera(path):
    data = Path(path).read_bytes()
    if data[:4] != b"PIEH":
        raise ValueError(f"Invalid Sintel camera header: {path}")
    intrinsics = np.frombuffer(data, dtype="<f8", count=9, offset=4).reshape(3, 3)
    extrinsic = np.frombuffer(data, dtype="<f8", count=12, offset=76).reshape(3, 4)
    pose = np.eye(4)
    pose[:3, :3] = extrinsic[:, :3].T
    pose[:3, 3] = -pose[:3, :3] @ extrinsic[:, 3]
    return intrinsics, pose


def read_depth(path):
    data = Path(path).read_bytes()
    if data[:4] != b"PIEH":
        raise ValueError(f"Invalid Sintel depth header: {path}")
    width, height = np.frombuffer(data, dtype="<i4", count=2, offset=4)
    return np.frombuffer(data, dtype="<f4", offset=12).reshape(height, width)


def prepare_scene(root, name, output):
    root, output = Path(root), Path(output)
    cameras = sorted((root / "depth/training/camdata_left" / name).glob("*.cam"))
    if not cameras:
        raise ValueError(f"Missing Sintel cameras for {name}")
    colors = [root / "stereo/training/final_left" / name / f"{p.stem}.png" for p in cameras]
    depths = [root / "depth/training/depth" / name / f"{p.stem}.dpt" for p in cameras]
    calibration, poses = zip(*(read_camera(p) for p in cameras))
    with Image.open(colors[0]) as image:
        width, height = image.size
    output.mkdir(parents=True, exist_ok=False)
    for field in ("color", "depth"):
        (output / "cam_left" / field).mkdir(parents=True)
    for color, depth in zip(colors, depths):
        with Image.open(color) as image:
            image.save(output / "cam_left/color" / f"{color.stem}.jpg", quality=75)
        write_depth(output / "cam_left/depth" / f"{depth.stem}.png", read_depth(depth))
    np.save(output / "cam_left/pose.npy", np.stack(poses).astype(np.float32))
    metadata = {
        "source_frame_ids": [int(p.stem.removeprefix("frame_")) for p in cameras],
        "units": "meters", "camera_convention": "OpenCV_c2w",
        "depth_encoding": "log16", "recipe": RECIPE,
        "cameras": {"camera_left": {
            "intrinsics": [pixel_intrinsics(k / [[width], [height], [1]], height, width)
                           for k in calibration],
            "image_size": [height, width], "pose": "cam_left/pose.npy",
            "color": "cam_left/color", "depth": "cam_left/depth",
        }},
    }
    (output / "scene.json").write_text(json.dumps(metadata, indent=2) + "\n")
    return {"num_frames": len(cameras),
            "source_sha256": scene_sha256(root, colors + depths + cameras),
            "sha256": scene_sha256(output)}


def prepare(root, output):
    output = Path(output)
    output.mkdir(parents=True, exist_ok=False)
    entries = []
    for name in SCENES:
        entries.append({"path": name, **prepare_scene(root, name, output / name)})
        print(f"{len(entries)}/{len(SCENES)} {name}", flush=True)
    for index in (".index.txt", ".test.txt", ".monst3r_test.txt"):
        (output / index).write_text("\n".join(SCENES) + "\n")
    manifest = {"format_version": 2, "recipe": RECIPE, "scenes": entries}
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", help="Directory containing stereo/ and depth/ extracted MPI archives")
    parser.add_argument("--output", default="data/eval/sintel")
    args = parser.parse_args()
    prepare(args.root, args.output)


if __name__ == "__main__":
    main()
