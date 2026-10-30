"""Prepare the Bonn evaluation clips directly from the full RGB-D recordings.

Rebuild synchronization using nearest depth timestamps (within 20 ms) and
calibrated mocap poses interpolated at RGB timestamps.
"""

import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.spatial.transform import Rotation, Slerp

from arrow.data.io import scene_sha256

from .common import write_rgbd_scene

SEQUENCES = ("balloon2", "crowd2", "crowd3", "person_tracking2", "synchronous")
RECIPE = "bonn_calibrated_timestamps_v1"
INTRINSICS = [[542.822841, 0, 315.593520], [0, 542.576870, 237.756098], [0, 0, 1]]
T_ROS = np.array([[-1, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 1]], dtype=np.float64)
T_M = np.array([[1.0157, .1828, -.2389, .0113], [.0009, -.8431, -.6413, -.0098],
                [-.3009, .6147, -.8085, .0111], [0, 0, 0, 1]], dtype=np.float64)


def read_trajectory(path, timestamps):
    """Interpolate mocap at RGB times and apply Bonn's optical-camera calibration."""
    rows = np.loadtxt(path, dtype=np.float64).reshape(-1, 8)
    times, query_times = rows[:, 0] - rows[0, 0], timestamps - rows[0, 0]
    poses = np.tile(np.eye(4), (len(timestamps), 1, 1))
    poses[:, :3, :3] = Slerp(times, Rotation.from_quat(rows[:, 4:8]))(query_times).as_matrix()
    for axis in range(3):
        poses[:, axis, 3] = np.interp(query_times, times, rows[:, axis + 1])
    # The published calibration is a rounded similarity; retain metric depth scale.
    u, singular_values, vh = np.linalg.svd(T_M[:3, :3])
    scale = singular_values.mean()
    calibration = T_M.copy()
    calibration[:3, :3] = scale * (u @ vh)
    poses = T_ROS @ poses @ T_ROS @ calibration
    poses[:, :3] /= scale
    right = np.searchsorted(times, query_times).clip(1, len(times) - 1)
    return poses.astype(np.float32), rows[np.stack((right - 1, right), axis=-1), 0]


def prepare_scene(root, output):
    root, output = Path(root), Path(output)
    colors = sorted((root / "rgb").glob("*.png"))[30:140]
    if len(colors) != 110:
        raise ValueError(f"Bonn needs raw RGB frames 30..139 in {root}")
    depths = sorted((root / "depth").glob("*.png"))
    rgb_times = np.array([float(p.stem) for p in colors])
    depth_times = np.array([float(p.stem) for p in depths])
    nearest = np.abs(rgb_times[:, None] - depth_times).argmin(axis=1)
    if np.any(np.abs(depth_times[nearest] - rgb_times) > .02):
        raise ValueError(f"RGB-depth offset exceeds 20 ms in {root}")
    depths = [depths[i] for i in nearest]
    poses, brackets = read_trajectory(root / "groundtruth.txt", rgb_times)

    def frames():
        for i, (color, path) in enumerate(zip(colors, depths)):
            with Image.open(path) as image:
                depth = np.asarray(image).astype(np.float32) / 5000
            depth[depth <= 0] = np.nan
            yield color, f"frame_{i:05d}.png", depth

    write_rgbd_scene(output, frames(), poses, {
        "source_frame_ids": list(range(30, 140)),
        "units": "meters", "camera_convention": "OpenCV_c2w",
        "depth_encoding": "log16", "recipe": RECIPE,
        "cameras": {"camera": {"intrinsics": INTRINSICS, "image_size": [480, 640],
                               "pose": "camera/pose.npy"}},
    })
    associations = {
        "rgb": [str(p.relative_to(root)) for p in colors], "rgb_timestamps": rgb_times.tolist(),
        "depth": [str(p.relative_to(root)) for p in depths],
        "depth_timestamps": depth_times[nearest].tolist(),
        "pose_source": "groundtruth.txt", "pose_timestamp_brackets": brackets.tolist(),
    }
    (output / "associations.json").write_text(json.dumps(associations, indent=2) + "\n")
    return {"num_frames": 110,
            "source_sha256": scene_sha256(root, set(colors + depths + [root / "groundtruth.txt"])),
            "sha256": scene_sha256(output)}


def prepare(root, output):
    root, output = Path(root), Path(output)
    output.mkdir(parents=True, exist_ok=False)
    entries = []
    for sequence in SEQUENCES:
        name = f"rgbd_bonn_{sequence}"
        entries.append({"path": name, **prepare_scene(root / name, output / name)})
        print(f"{len(entries)}/{len(SEQUENCES)} {name}", flush=True)
    for index in (".index.txt", ".test.txt", ".monst3r_test.txt"):
        (output / index).write_text("\n".join(e["path"] for e in entries) + "\n")
    manifest = {"format_version": 2, "recipe": RECIPE, "scenes": entries}
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", help="Extracted rgbd_bonn_dataset directory")
    parser.add_argument("--output", default="data/eval/bonn")
    args = parser.parse_args()
    prepare(args.root, args.output)


if __name__ == "__main__":
    main()
