"""Prepare 7-Scenes test sequences from raw RGB, sensor depth and KinectFusion poses.

exclude noisy registered depths below 40 cm.
"""

import argparse
from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path

import numpy as np
from PIL import Image

from arrow.data.io import file_sha256, scene_sha256
from .common import write_rgbd_scene

SCENES = ("chess", "fire", "heads", "office", "pumpkin", "redkitchen", "stairs")
RECIPE = "7scenes_rgb_registered_min04_v1"
DEPTH_TO_RGB = np.array([
    [.99996518012567637, .0026765126468950343, -.0079041012313000904, -.025558943178152542],
    [-.0027409311281316700, .99996302803027592, -.0081504520778013286, .00010109636268061706],
    [.0078819942130445332, .0081718328771890631, .99993554558014031, .0020318321729487039],
    [0, 0, 0, 1],
])
# Normalized principal point (.5, .5) expressed in integer-centered pixels.
INTRINSICS = [[525., 0, 319.5], [0, 525., 239.5], [0, 0, 1]]


def register_depth(raw):
    """Register depth to RGB and retain values in [0.4, 10] m."""
    height, width = raw.shape
    depth = raw.astype(np.float64).reshape(-1) / 1000
    valid = (depth > 0) & (raw.reshape(-1) != 65535)
    y, x = np.indices(raw.shape, dtype=np.float64)
    points = np.ones((4, valid.sum()), dtype=np.float64)
    points[0] = (x.reshape(-1)[valid] - width / 2) / 585 * depth[valid]
    points[1] = (y.reshape(-1)[valid] - height / 2) / 585 * depth[valid]
    points[2] = depth[valid]
    points = DEPTH_TO_RGB @ points
    z = points[2]
    x = np.rint(points[0] / z * 525 + width / 2).astype(np.int64)
    y = np.rint(points[1] / z * 525 + height / 2).astype(np.int64)
    inside = (x >= 0) & (x < width) & (y >= 0) & (y < height) & (z > 0) & (z < 65.535)
    # At projection collisions, keep the last source pixel in raster order.
    pixels, last = np.unique((y[inside] * width + x[inside])[::-1], return_index=True)
    registered = np.zeros((height, width), dtype=np.uint16)
    registered.reshape(-1)[pixels] = (z[inside][::-1][last] * 1000).astype(np.uint16)
    depth = registered.astype(np.float32) / 1000
    depth[(depth < .4) | (depth > 10)] = np.nan
    return depth


def prepare_scene(root, output):
    root, output = Path(root), Path(output)
    colors = sorted(root.glob("frame-*.color.png"))
    if len(colors) < 2:
        raise ValueError(f"Expected raw 7-Scenes frames in {root}")
    stems = [p.name.removesuffix(".color.png") for p in colors]
    depths = [root / f"{stem}.depth.png" for stem in stems]
    pose_paths = [root / f"{stem}.pose.txt" for stem in stems]
    poses = np.stack([np.loadtxt(p, dtype=np.float32) for p in pose_paths])

    def frames():
        for color, stem, path in zip(colors, stems, depths):
            with Image.open(path) as image:
                depth = register_depth(np.asarray(image))
            yield color, f"{stem}.png", depth

    write_rgbd_scene(output, frames(), poses, {
        "source_frame_ids": [int(stem.removeprefix("frame-")) for stem in stems],
        "units": "meters", "camera_convention": "OpenCV_c2w",
        "depth_encoding": "log16", "recipe": RECIPE, "valid_depth_range": [.4, 10.],
        "cameras": {"camera_0": {"intrinsics": INTRINSICS, "image_size": [480, 640],
                                 "pose": "camera_0/pose.npy"}},
    })
    return {"num_frames": len(colors), "source_sha256": scene_sha256(root, colors + depths + pose_paths),
            "sha256": scene_sha256(output)}


def prepare(root, output):
    root, output = Path(root), Path(output)
    names, split_hashes = [], {}
    for scene in SCENES:
        split = root / scene / "TestSplit.txt"
        split_hashes[f"{scene}/TestSplit.txt"] = file_sha256(split)
        names.extend(f"{scene}/seq-{int(line.strip().removeprefix('sequence')):02d}"
                     for line in split.read_text().splitlines() if line.strip())
    names = sorted(names)
    if len(names) != 18:
        raise ValueError(f"Expected the 18 official test sequences, got {len(names)}")
    output.mkdir(parents=True, exist_ok=False)
    entries = []
    with ThreadPoolExecutor(max_workers=4) as pool:
        scenes = pool.map(lambda name: prepare_scene(root / name, output / name), names)
        for name, entry in zip(names, scenes):
            entries.append({"path": name, **entry})
            print(f"{len(entries)}/{len(names)} {name}", flush=True)
    for index in (".index.txt", ".test.txt"):
        (output / index).write_text("\n".join(names) + "\n")
    manifest = {"format_version": 2, "recipe": RECIPE, "source_splits": split_hashes, "scenes": entries}
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", help="Extracted official 7-Scenes root, containing chess/, fire/, ...")
    parser.add_argument("--output", default="data/eval/7scenes")
    args = parser.parse_args()
    prepare(args.root, args.output)


if __name__ == "__main__":
    main()
