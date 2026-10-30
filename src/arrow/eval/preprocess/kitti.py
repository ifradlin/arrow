"""Prepare KITTI video-depth clips from annotated depth, raw RGB and selection calibration."""

import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image

from arrow.data.io import scene_sha256
from .common import pixel_intrinsics, write_rgbd_scene

DRIVES = (
    "2011_09_26_drive_0002_sync", "2011_09_26_drive_0005_sync",
    "2011_09_26_drive_0013_sync", "2011_09_26_drive_0020_sync",
    "2011_09_26_drive_0023_sync", "2011_09_26_drive_0036_sync",
    "2011_09_26_drive_0079_sync", "2011_09_26_drive_0095_sync",
    "2011_09_26_drive_0113_sync", "2011_09_28_drive_0037_sync",
    "2011_09_29_drive_0026_sync", "2011_09_30_drive_0016_sync",
    "2011_10_03_drive_0047_sync",
)
RECIPE = "kitti_raw_validation_clips_v1"


def prepare_scene(root, drive, output):
    root = Path(root)
    depths = sorted((root / "val" / drive / "proj_depth/groundtruth/image_02").glob("*.png"))[:110]
    if not depths:
        raise ValueError(f"Missing KITTI validation depth for {drive}")
    colors = [root / drive[:10] / drive / "image_02/data" / p.name for p in depths]
    with Image.open(colors[0]) as image:
        width, height = image.size
    calibration = sorted((root / "depth_selection/val_selection_cropped/intrinsics").glob(
        f"{drive}_image_*_image_02.txt"))[0]
    intrinsics = np.loadtxt(calibration).reshape(3, 3)
    intrinsics[0, 2] += (width - 1216) // 2
    intrinsics[1, 2] += height - 352
    intrinsics[0] /= width
    intrinsics[1] /= height

    def frames():
        for i, (color, path) in enumerate(zip(colors, depths)):
            with Image.open(path) as image:
                depth = np.asarray(image).astype(np.float32) / 256
            depth[depth <= 0] = np.nan
            yield color, f"frame_{i:05d}.png", depth

    write_rgbd_scene(output, frames(), np.full((len(colors), 4, 4), np.nan), {
        "source_frame_ids": [int(p.stem) for p in colors],
        "units": "meters", "camera_convention": "OpenCV_c2w",
        "depth_encoding": "log16", "recipe": RECIPE,
        "cameras": {"camera": {"intrinsics": pixel_intrinsics(intrinsics, height, width),
                               "image_size": [height, width], "pose": "camera/pose.npy"}},
    })
    return {"num_frames": len(colors),
            "source_sha256": scene_sha256(root, colors + depths + [calibration]),
            "sha256": scene_sha256(output)}


def prepare(root, output):
    output = Path(output)
    output.mkdir(parents=True, exist_ok=False)
    entries = []
    for drive in DRIVES:
        name = f"{drive}_02"
        entries.append({"path": name, **prepare_scene(root, drive, output / name)})
        print(f"{len(entries)}/{len(DRIVES)} {name}", flush=True)
    for index in (".index.txt", ".test.txt"):
        (output / index).write_text("\n".join(e["path"] for e in entries) + "\n")
    manifest = {"format_version": 2, "recipe": RECIPE, "scenes": entries}
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", help="Extracted KITTI root with val/, date folders and depth_selection/")
    parser.add_argument("--output", default="data/eval/kitti")
    args = parser.parse_args()
    prepare(args.root, args.output)


if __name__ == "__main__":
    main()
