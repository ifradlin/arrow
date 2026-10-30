"""Prepare Neural-RGBD scenes from the authors' original archive."""

import argparse
from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path

import numpy as np
from PIL import Image

from arrow.data.io import scene_sha256
from .common import pixel_intrinsics, write_rgbd_scene

SCENES = ("breakfast_room", "complete_kitchen", "green_room", "grey_white_room", "kitchen",
          "morning_apartment", "staircase", "thin_geometry", "whiteroom")
RECIPE = "neural_rgbd_opencv_v1"


def prepare_scene(root, output):
    root = Path(root)
    poses = np.loadtxt(root / "poses.txt", dtype=np.float32).reshape(-1, 4, 4)
    # Convert camera axes to OpenCV without changing the world frame.
    poses[:, :, 1:3] *= -1
    ids = [i for i in range(len(poses)) if (root / "images" / f"img{i}.png").is_file()
           and (root / "depth" / f"depth{i}.png").is_file()]
    if len(ids) < 2:
        raise ValueError(f"Expected at least two RGB/depth pairs in {root}")
    colors = [root / "images" / f"img{i}.png" for i in ids]
    depths = [root / "depth" / f"depth{i}.png" for i in ids]
    with Image.open(colors[0]) as image:
        width, height = image.size
    focal = np.float32((root / "focal.txt").read_text())

    def frames():
        for i, color, path in zip(ids, colors, depths):
            with Image.open(path) as image:
                depth = np.asarray(image).astype(np.float32) / 1000
            depth[depth <= 0] = np.nan
            yield color, f"frame_{i:05d}.png", depth

    write_rgbd_scene(output, frames(), poses[ids], {
        "source_frame_ids": ids, "units": "meters", "camera_convention": "OpenCV_c2w",
        "depth_encoding": "log16", "recipe": RECIPE,
        "cameras": {"camera_0": {
            "intrinsics": pixel_intrinsics([[focal / width, 0, .5],
                                             [0, focal / height, .5], [0, 0, 1]], height, width),
            "image_size": [height, width], "pose": "camera_0/pose.npy",
        }},
    })
    return {"num_frames": len(ids), "source_sha256": scene_sha256(
        root, colors + depths + [root / "poses.txt", root / "focal.txt"]),
        "sha256": scene_sha256(output)}


def prepare(root, output):
    root, output = Path(root), Path(output)
    output.mkdir(parents=True, exist_ok=False)
    entries = []
    with ThreadPoolExecutor(max_workers=4) as pool:
        scenes = pool.map(lambda name: prepare_scene(root / name, output / name), SCENES)
        for name, entry in zip(SCENES, scenes):
            entries.append({"path": name, **entry})
            print(f"{len(entries)}/{len(SCENES)} {name}", flush=True)
    for index in (".index.txt", ".test.txt"):
        (output / index).write_text("\n".join(SCENES) + "\n")
    manifest = {"format_version": 2, "recipe": RECIPE, "scenes": entries}
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", help="Extracted neural_rgbd_data.zip containing the nine scene folders")
    parser.add_argument("--output", default="data/eval/neural_rgbd")
    args = parser.parse_args()
    prepare(args.root, args.output)


if __name__ == "__main__":
    main()
