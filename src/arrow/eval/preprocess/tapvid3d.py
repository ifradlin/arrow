"""Prepare TAPVid-3D minival from <root>/{adt,drivetrack,pstudio}/minival/*.npz.

See docs/EVAL.md for data sources and preparation requirements.
"""

import argparse
import hashlib
import io
import json
from pathlib import Path
from urllib.request import urlopen

import cv2
import numpy as np
import pyarrow.parquet as pq
from PIL import Image

from arrow.data.io import file_sha256, scene_sha256
from arrow.eval.preprocess.worldtrack import camera_to_world

UPSTREAM_REVISION = "c2cbab81cc06092b5f05bfe2da7bfec54e2079c9"
RELEASE_URL = "https://storage.googleapis.com/dm-tapnet/tapvid3d/release_files/v1.0"
MINIVAL = json.loads(Path(__file__).with_name("tapvid3d_minival.json").read_text())
PREPARED_SIZE = (504, 238)


def load_calibration(root, scene):
    parts = scene.split("_", 6)
    segment, camera = "_".join(parts[1:6]), int(parts[6].split("_", 1)[0])
    paths = list(Path(root).glob(f"*/camera_calibration/{segment}.parquet"))
    if len(paths) != 1:
        raise ValueError(f"Expected one Waymo calibration file for {scene}, found {len(paths)}")
    prefix = "[CameraCalibrationComponent]"
    keys = ("f_u", "f_v", "c_u", "c_v", "k1", "k2", "p1", "p2", "k3")
    columns = [
        "key.camera_name",
        f"{prefix}.width",
        f"{prefix}.height",
        *(f"{prefix}.intrinsic.{key}" for key in keys),
    ]
    rows = [
        row
        for row in pq.read_table(paths[0], columns=columns).to_pylist()
        if row["key.camera_name"] == camera
    ]
    if len(rows) != 1:
        raise ValueError(f"Expected one camera calibration for {scene}, found {len(rows)}")
    row = rows[0]
    fx, fy, cx, cy, *distortion = [row[f"{prefix}.intrinsic.{key}"] for key in keys]
    intrinsics = np.array([[fx, 0, cx], [0, fy, cy], [0, 0, 1]], dtype=np.float64)
    size = (row[f"{prefix}.width"], row[f"{prefix}.height"])
    return intrinsics, np.array(distortion), size, paths[0]


def camera_geometry(intrinsics, distortion):
    """Compute the centered DriveTrack camera after undistortion and cropping."""
    undistorted = cv2.getOptimalNewCameraMatrix(
        intrinsics, distortion, (1920, 1280), 0.0, (1920, 1280)
    )[0]
    cropped = undistorted.copy()
    cropped[1, 2] -= 394
    normalized = cropped.astype(np.float32)
    normalized[:2, 2] += 0.5
    normalized[0] /= 1920
    normalized[1] /= 886

    direction = np.linalg.inv(normalized) @ np.array([0.5, 0.5, 1.0], dtype=np.float32)
    direction /= np.sqrt(np.sum(direction * direction))
    cross = np.cross(direction, np.array([0.0, 0.0, 1.0], dtype=np.float32))
    x, y, z = cross
    skew = np.array([[0, -z, y], [z, 0, -x], [-y, x, 0]], dtype=np.float32)
    rotation = np.eye(3, dtype=np.float32) + skew + (1 / (1 + direction[2])) * (skew @ skew)

    aspect = PREPARED_SIZE[0] / PREPARED_SIZE[1]
    horizontal = min(1 / normalized[0, 0], aspect / normalized[1, 1])
    vertical = horizontal / aspect
    corners = np.array([[0, 0, 1], [0, 1, 1], [1, 1, 1], [1, 0, 1]], dtype=np.float32)
    corners = corners @ (np.linalg.inv(normalized).T @ rotation.T)
    corners = corners[:, :2] / corners[:, 2:]
    for i in range(4):
        origin, edge = corners[i - 1], corners[i] - corners[i - 1]
        for ray in (np.array([aspect, 1.0]), np.array([aspect, -1.0])):
            distance = np.linalg.solve(np.stack([ray, -edge], axis=1), origin)[0]
            intersection = np.abs(distance * ray)
            horizontal = min(horizontal, 2 * intersection[0])
            vertical = min(vertical, 2 * intersection[1])
    target = np.array(
        [[1 / horizontal, 0, 0.5], [0, 1 / vertical, 0.5], [0, 0, 1]], dtype=np.float32
    )
    width, height = PREPARED_SIZE
    to_pixel = np.array([[width, 0, -0.5], [0, height, -0.5], [0, 0, 1]], dtype=np.float32)
    transform = target @ rotation @ np.linalg.inv(normalized)
    return undistorted, to_pixel @ target, rotation, transform


def pixel_transform(transform, source_size):
    width, height = PREPARED_SIZE
    source_width, source_height = source_size
    return (
        np.array([[width, 0, -0.5], [0, height, -0.5], [0, 0, 1]], dtype=np.float32)
        @ transform
        @ np.array(
            [
                [1 / source_width, 0, 0.5 / source_width],
                [0, 1 / source_height, 0.5 / source_height],
                [0, 0, 1],
            ],
            dtype=np.float32,
        )
    )


def warp_image(image, transform):
    """Warp an image to 504 x 238, with Lanczos prefiltering for downsampling."""
    height, width = image.shape[:2]
    homography = pixel_transform(transform, (width, height))
    center = np.array([PREPARED_SIZE[0] / 2, PREPARED_SIZE[1] / 2, 1], dtype=np.float32)
    scale_x, scale_y = np.dot(np.linalg.inv(homography)[2], center) * np.linalg.norm(
        homography[:2, :2], axis=0
    )
    if scale_x < 0.8 or scale_y < 0.8:
        width, height = (
            max(round(width * scale_x * 1.25), 16),
            max(round(height * scale_y * 1.25), 16),
        )
        image = np.array(Image.fromarray(image).resize((width, height), Image.Resampling.LANCZOS))
    return cv2.warpPerspective(
        image, pixel_transform(transform, (width, height)), PREPARED_SIZE, flags=cv2.INTER_LANCZOS4
    )


def prepare_scene(path, output, subset, waymo_calibration_root=None):
    path, output = Path(path), Path(output)
    with np.load(path, allow_pickle=False) as source:
        data = dict(source)
    provenance = {"source_sha256": file_sha256(path)}
    if subset == "adt" and "extrinsics_w2c" not in data:
        url = f"{RELEASE_URL}/adt/{path.name}"
        with urlopen(url, timeout=60) as response:
            annotation = response.read()
        with np.load(io.BytesIO(annotation), allow_pickle=False) as original:
            for key in ("queries_xyt", "tracks_XYZ", "visibility"):
                if not np.array_equal(data[key], original[key]):
                    raise ValueError(f"ADT annotations differ from the official release: {path}")
            data["extrinsics_w2c"] = original["extrinsics_w2c"]
        provenance["pose_source"] = url
        provenance["pose_source_sha256"] = hashlib.sha256(annotation).hexdigest()

    jpeg, tracks, visibility = data["images_jpeg_bytes"], data["tracks_XYZ"], data["visibility"]
    frames, count = tracks.shape[:2]
    queries = data["queries_xyt"].copy()
    if (
        tracks.shape != (frames, count, 3)
        or visibility.shape != (frames, count)
        or len(jpeg) != frames
        or frames < 2
        or queries.shape != (count, 3)
    ):
        raise ValueError(f"Invalid TAPVid-3D arrays in {path}")
    size = Image.open(io.BytesIO(bytes(jpeg[0]))).size
    fx, fy, cx, cy = data["fx_fy_cx_cy"]
    intrinsics = np.array([[fx, 0, cx], [0, fy, cy], [0, 0, 1.0]])
    poses = np.tile(np.eye(4, dtype=np.float32), (frames, 1, 1))
    if subset != "pstudio":
        if data["extrinsics_w2c"].shape != (frames, 4, 4):
            raise ValueError(f"Invalid TAPVid-3D poses in {path}")
        poses = np.stack([camera_to_world(e) for e in data["extrinsics_w2c"]])
        tracks = (
            np.einsum(
                "tij,tnj->tni", poses[:, :3, :3].astype(np.float64), tracks.astype(np.float64)
            )
            + poses[:, None, :3, 3]
        )

    output.mkdir(parents=True, exist_ok=False)
    for field in ("color", "point_tracks_3d", "visible_points_mask"):
        (output / field).mkdir()
    np.save(output / "benchmark_queries_xyt.npy", queries)
    benchmark = {
        "intrinsics": intrinsics.tolist(),
        "image_size": list(size[::-1]),
        "pose": "pose.npy" if subset != "pstudio" else None,
    }
    rotation = np.eye(3, dtype=np.float32)
    if subset == "drivetrack":
        if waymo_calibration_root is None:
            raise ValueError("DriveTrack preparation requires --waymo-calibration-root")
        calibrated, distortion, calibrated_size, calibration_path = load_calibration(
            waymo_calibration_root, path.stem
        )
        if (
            size != (1920, 1280)
            or size != calibrated_size
            or not np.allclose(intrinsics, calibrated, rtol=1e-6, atol=1e-3)
        ):
            raise ValueError(f"DriveTrack image/intrinsics disagree with Waymo calibration: {path}")
        undistorted, intrinsics, rotation, transform = camera_geometry(calibrated, distortion)
        homography = pixel_transform(transform, (1920, 886)) @ np.array(
            [[1, 0, 0], [0, 1, -394], [0, 0, 1]], dtype=np.float32
        )
        xy = cv2.undistortPoints(
            queries[:, :2].astype(np.float32)[:, None], calibrated, distortion, P=undistorted
        )[:, 0]
        xy = np.column_stack([xy, np.ones(count, dtype=np.float32)]) @ homography.T
        queries[:, :2] = xy[:, :2] / xy[:, 2:]
        np.save(output / "benchmark_pose.npy", poses)
        benchmark["pose"] = "benchmark_pose.npy"
        poses = poses.copy()
        poses[:, :3, :3] = poses[:, :3, :3] @ rotation.T
        provenance["calibration_file"] = (
            f"{calibration_path.parent.parent.name}/camera_calibration/{calibration_path.name}"
        )
        provenance["calibration_sha256"] = file_sha256(calibration_path)
        size = PREPARED_SIZE
    if subset != "pstudio":
        np.save(output / "pose.npy", poses)
    for i in range(frames):
        if subset == "drivetrack":
            image = np.array(Image.open(io.BytesIO(bytes(jpeg[i]))).convert("RGB"))
            image = cv2.undistort(image, calibrated, distortion, None, undistorted)[394:]
            image = warp_image(image, transform)
            Image.fromarray(image).save(output / "color" / f"{i:05d}.png")
        else:
            (output / "color" / f"{i:05d}.jpg").write_bytes(bytes(jpeg[i]))
        np.save(output / "point_tracks_3d" / f"{i:05d}.npy", tracks[i].astype(np.float32))
        np.save(output / "visible_points_mask" / f"{i:05d}.npy", visibility[i].astype(bool))
    np.save(output / "queries_xyt.npy", queries)
    annotations = {
        "queries_xyt": "queries_xyt.npy",
        "benchmark_queries_xyt": "benchmark_queries_xyt.npy",
    }
    if benchmark["pose"] is not None:
        annotations["benchmark_poses"] = benchmark["pose"]
    metadata = {
        "source_frame_ids": list(range(frames)),
        "units": "meters",
        "camera_convention": "OpenCV_c2w",
        "cameras": {
            "camera": {
                "intrinsics": intrinsics.tolist(),
                "image_size": list(size[::-1]),
                "pose": "pose.npy" if subset != "pstudio" else None,
            }
        },
        "benchmark_camera": benchmark,
        "benchmark_from_prepared_rotation": rotation.T.tolist(),
        "annotations": annotations,
    }
    (output / "scene.json").write_text(json.dumps(metadata, indent=2) + "\n")
    return {"num_frames": frames, "num_tracks": count, **provenance}


def prepare(root, output, waymo_calibration_root):
    root, output = Path(root), Path(output)
    for subset, filenames in MINIVAL.items():
        for filename in filenames:
            if not (root / subset / "minival" / filename).is_file():
                raise FileNotFoundError(root / subset / "minival" / filename)
    output.mkdir(parents=True, exist_ok=False)
    manifest = {
        "format_version": 2,
        "recipe": "tapvid3d_rgb_504",
        "split": "minival",
        "source": RELEASE_URL,
        "generator_revision": UPSTREAM_REVISION,
        "opencv": cv2.__version__,
        "pillow": Image.__version__,
        "subsets": {},
    }
    for subset, filenames in MINIVAL.items():
        entries = []
        for filename in sorted(filenames):
            source = root / subset / "minival" / filename
            relative = f"{subset}/{source.stem}"
            counts = prepare_scene(source, output / relative, subset, waymo_calibration_root)
            entries.append({"path": relative, **counts, "sha256": scene_sha256(output / relative)})
            print(f"{subset}: {len(entries)}/{len(filenames)} {source.stem}", flush=True)
        manifest["subsets"][subset] = entries
        for index in (".index.txt", ".test.txt", ".minival.txt"):
            (output / subset / index).write_text(
                "".join(Path(e["path"]).name + "\n" for e in entries)
            )
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", help="Official generated <subset>/minival/*.npz directories")
    parser.add_argument(
        "--waymo-calibration-root",
        required=True,
        help="Waymo root containing <split>/camera_calibration/*.parquet",
    )
    parser.add_argument(
        "--output", default="data/eval/tapvid3d", help="New prepared dataset directory"
    )
    args = parser.parse_args()
    prepare(args.root, args.output, args.waymo_calibration_root)


if __name__ == "__main__":
    main()
