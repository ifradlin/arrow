"""Prepare the official WorldTrack NPZ release into portable evaluation folders."""

import argparse
import io
import json
from pathlib import Path

import numpy as np
from PIL import Image
import torch

from arrow.data.io import file_sha256, scene_sha256, write_depth

SUBSETS = {"adt_mini": 50, "ds_mini": 50, "po_mini": 50, "pstudio_mini": 50}


def camera_to_world(extrinsics):
    """Convert world-to-camera extrinsics to a rigid camera-to-world pose."""
    pose = np.eye(4)
    pose[:3, :3] = extrinsics[:3, :3].T
    pose[:3, 3] = -extrinsics[:3, :3].T @ extrinsics[:3, 3]
    rotation = pose[:3, :3]
    if not np.isclose(np.linalg.norm(rotation.T @ rotation - np.eye(3)), 0, atol=1e-6):
        u, _, vt = np.linalg.svd(rotation)
        pose[:3, :3] = u @ vt
    if not np.isclose(np.linalg.det(pose[:3, :3]), 1):
        pose[:3, :3] = pose[:3, :3] @ np.diag([-1., 1., 1.])
    return pose.astype(np.float32)


def prepare_scene(path, output):
    path, output = Path(path), Path(output)
    with np.load(path, allow_pickle=False) as data:
        jpeg, tracks = data["images_jpeg_bytes"], data["tracks_XYZ"]
        frames = len(jpeg)
        if frames < 2 or tracks.ndim != 3 or tracks.shape[0] != frames or tracks.shape[-1] != 3:
            raise ValueError(f"Invalid WorldTrack tracks in {path}")
        if data["visibility"].shape != tracks.shape[:2] or data["fx_fy_cx_cy"].shape != (4,):
            raise ValueError(f"Invalid WorldTrack visibility or intrinsics in {path}")
        if "extrinsics_w2c" in data and data["extrinsics_w2c"].shape != (frames, 4, 4):
            raise ValueError(f"Invalid WorldTrack poses in {path}")
        output.mkdir(parents=True, exist_ok=False)
        pose_path = None
        if "extrinsics_w2c" in data:
            poses = np.stack([camera_to_world(e) for e in data["extrinsics_w2c"]])
            np.save(output / "pose.npy", poses)
            pose_path = "pose.npy"
            tracks = (np.einsum("tij,tnj->tni", poses[:, :3, :3].astype(np.float64),
                                tracks.astype(np.float64)) + poses[:, None, :3, 3])
        tracks = tracks.astype(np.float32)
        visibility = data["visibility"].astype(np.bool_)
        w, h = Image.open(io.BytesIO(bytes(jpeg[0]))).size
        fx, fy, cx, cy = data["fx_fy_cx_cy"]
        # Normalize in float32 to preserve benchmark rounding.
        intrinsics = torch.tensor([[fx / w, 0, (cx + .5) / w],
                                   [0, fy / h, (cy + .5) / h], [0, 0, 1]], dtype=torch.float32)
        intrinsics[0] *= w
        intrinsics[1] *= h
        intrinsics[:2, 2] -= .5
        fields = ["color", "point_tracks_3d", "visible_points_mask"]
        depth = data["depth_map"] if "depth_map" in data else None
        if depth is not None:
            fields.append("depth")
        for field in fields:
            (output / field).mkdir()
        for i in range(frames):
            (output / "color" / f"{i:05d}.jpg").write_bytes(bytes(jpeg[i]))
            np.save(output / "point_tracks_3d" / f"{i:05d}.npy", tracks[i])
            np.save(output / "visible_points_mask" / f"{i:05d}.npy", visibility[i])
            if depth is not None:
                values = depth[i].astype(np.float32, copy=True)
                values[~np.isfinite(values) | (values <= 0)] = np.nan
                write_depth(output / "depth" / f"{i:05d}.png", values)
        if "queries_xyt" in data:
            np.save(output / "queries_xyt.npy", data["queries_xyt"])
        metadata = {
            "source_frame_ids": list(range(frames)),
            "units": "relative" if path.parent.name == "po_mini" else "meters",
            "camera_convention": "OpenCV_c2w",
            "cameras": {"camera": {"intrinsics": intrinsics.tolist(),
                                   "image_size": [h, w], "pose": pose_path}},
        }
        if depth is not None:
            metadata["depth_encoding"] = "log16"
        (output / "scene.json").write_text(json.dumps(metadata, indent=2) + "\n")
        return {"num_frames": frames, "num_tracks": tracks.shape[1]}


def prepare(root, output):
    root, output = Path(root), Path(output)
    output.mkdir(parents=True, exist_ok=False)
    manifest = {"format_version": 2, "recipe": "worldtrack_v1", "subsets": {}}
    for subset, count in SUBSETS.items():
        sources = sorted((root / subset).glob("*.npz"))
        if len(sources) != count:
            raise ValueError(f"Expected {count} WorldTrack files in {root / subset}, got {len(sources)}")
        names = [source.stem for source in sources]
        entries = []
        for source in sources:
            name = source.stem
            target = output / subset / name
            counts = prepare_scene(source, target)
            entries.append({"path": f"{subset}/{name}", **counts,
                            "source_sha256": file_sha256(source), "sha256": scene_sha256(target)})
            print(f"{subset}: {len(entries)}/{len(names)} {name}", flush=True)
        manifest["subsets"][subset] = entries
        for index in (".index.txt", ".test.txt"):
            (output / subset / index).write_text("\n".join(names) + "\n")
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", help="Extracted official worldtrack_release directory")
    parser.add_argument("--output", default="data/eval/worldtrack", help="New prepared dataset directory")
    args = parser.parse_args()
    prepare(args.root, args.output)


if __name__ == "__main__":
    main()
