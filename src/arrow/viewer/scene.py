"""Named, time-indexed scene logging with no model or HTTP dependency."""

import base64
from io import BytesIO
import json
from pathlib import Path
from threading import RLock
from uuid import uuid4

import numpy as np
from PIL import Image


def normal_bytes(normals):
    """Unit normals as RGB bytes: x red, y up green, toward the camera blue; missing normals black."""
    if normals is None:
        return None
    normals = np.asarray(normals, dtype=np.float32)
    rgb = np.nan_to_num(normals * [0.5, -0.5, -0.5] + 0.5, nan=0.0)
    rgb = np.where(np.isfinite(normals).all(-1, keepdims=True), rgb, 0.0)
    return (rgb.clip(0, 1) * 255).round().astype(np.uint8)


def probability_bytes(probability):
    if probability is None:
        return None
    return (np.nan_to_num(np.asarray(probability, dtype=np.float32)).clip(0, 1) * 255).round().astype(np.uint8)

class Scene:
    def __init__(self, *, coordinate_frame="x right, y down, z forward", scale="relative"):
        self._lock = RLock()
        self.revision = 0
        self._identity = uuid4().hex
        self.data = {
            "format_version": 1,
            "coordinate_frame": coordinate_frame,
            "scale": scale,
            "images": [],
            "points": [],
            "tracks": [],
            "cameras": [],
            "presentation": {},
        }

    @property
    def cache_key(self):
        """Cache key for this scene's content, independent of display settings."""
        return f"{self._identity}:{self.revision}"

    def _log(self, kind, entry):
        with self._lock:
            self.data[kind] = [
                old
                for old in self.data[kind]
                if (old["name"], old.get("time")) != (entry["name"], entry.get("time"))
            ]
            self.data[kind].append(entry)
            self.revision += 1
        return self

    def log_image(self, name, image, *, time: float = 0):
        stream = BytesIO()
        Image.fromarray(np.asarray(image, dtype=np.uint8)).save(stream, format="PNG")
        return self._log(
            "images",
            {
                "name": name,
                "time": float(time),
                "url": "data:image/png;base64," + base64.b64encode(stream.getvalue()).decode(),
            },
        )

    def log_points(
        self,
        name,
        positions,
        *,
        time: float = 0,
        colors=None,
        confidence=None,
        normals=None,
        cloud_normals=None,
        visibility=None,
    ):
        """`normals` (predicted) and `cloud_normals` (from the points' neighbours) are unit vectors
        in the scene's frame; `visibility` is a probability in [0, 1]. All three are kept as bytes."""
        positions = np.asarray(positions)
        entry = {"name": name, "time": float(time), "positions": positions.tolist()}
        if positions.ndim != 2 or positions.shape[1] != 3 or not np.isfinite(positions).all():
            raise ValueError("points must be finite [N, 3] coordinates")
        for key, value in [
            ("colors", colors),
            ("confidence", confidence),
            ("normals", normal_bytes(normals)),
            ("cloud_normals", normal_bytes(cloud_normals)),
            ("visibility", probability_bytes(visibility)),
        ]:
            if value is not None:
                if len(value) != len(positions):
                    raise ValueError(f"{key} must match point count")
                entry[key] = np.asarray(value).tolist()
        return self._log("points", entry)

    def log_tracks(
        self,
        name,
        positions,
        *,
        times,
        colors=None,
        confidence=None,
        visibility_logits=None,
        source_uv=None,
        source_frame: int | list[int] | np.ndarray = 0,
        mode=None,
        valid=None,
        normals=None,
        cloud_normals=None,
    ):
        """`source_uv` is each seed's pixel in [0, 1]; `source_frame` is an index or one per seed.
        `normals` and `cloud_normals` are `[F, N, 3]` unit vectors, kept as bytes like `log_points`'."""
        positions = np.asarray(positions)
        if (
            positions.ndim != 3
            or positions.shape[-1] != 3
            or len(times) != len(positions)
            or not np.isfinite(positions).all()
        ):
            raise ValueError("tracks must be finite [F, N, 3] coordinates with F timestamps")
        if any(b <= a for a, b in zip(times, times[1:])):
            raise ValueError("track timestamps must be strictly increasing")
        entry = {
            "name": name,
            "times": list(map(float, times)),
            "positions": positions.tolist(),
            "source_frames": np.broadcast_to(source_frame, (positions.shape[1],)).tolist(),
        }
        if mode is not None:
            entry["mode"] = mode
        for key, value in [
            ("valid", valid),
            ("colors", colors),
            ("confidence", confidence),
            ("visibility_logits", visibility_logits),
            ("source_uv", source_uv),
            ("normals", normal_bytes(normals)),
            ("cloud_normals", normal_bytes(cloud_normals)),
        ]:
            if value is not None:
                entry[key] = np.asarray(value).tolist()
        return self._log("tracks", entry)

    def log_camera(
        self, name, camera_to_scene, intrinsics, *, width, height, time: float = 0, image="rgb"
    ):
        pose, k = np.asarray(camera_to_scene), np.asarray(intrinsics)
        if (
            pose.shape != (4, 4)
            or k.shape != (3, 3)
            or not np.isfinite(pose).all()
            or not np.isfinite(k).all()
        ):
            raise ValueError("camera pose must be 4x4 and intrinsics 3x3, both finite")
        return self._log(
            "cameras",
            {
                "name": name,
                "time": float(time),
                "pose": pose.tolist(),
                "intrinsics": k.tolist(),
                "width": width,
                "height": height,
                "image": image,
            },
        )

    def set_presentation(self, settings):
        with self._lock:
            self.data["presentation"] = json.loads(json.dumps(settings, allow_nan=False))

    def get_presentation(self):
        with self._lock:
            return json.loads(json.dumps(self.data["presentation"], allow_nan=False))

    def snapshot(self):
        with self._lock:
            return json.loads(json.dumps(self.data, allow_nan=False))

    def dumps(self):
        """The scene as compact JSON."""
        with self._lock:
            return json.dumps(self.data, separators=(",", ":"), allow_nan=False)

    def save(self, path):
        Path(path).write_text(self.dumps())

    @classmethod
    def load(cls, path):
        data = json.loads(Path(path).read_text())
        if not isinstance(data, dict) or data.get("format_version") != 1:
            raise ValueError("Unsupported arrow scene format")
        for key, kind in {
            "coordinate_frame": str, "scale": str, "presentation": dict,
            "images": list, "points": list, "tracks": list, "cameras": list,
        }.items():
            if not isinstance(data.get(key), kind):
                raise ValueError(f"Scene {key} must be a {kind.__name__}")
        for key, fields in {
            "images": {"name": str, "time": (int, float), "url": str},
            "points": {"name": str, "time": (int, float), "positions": list},
            "tracks": {"name": str, "times": list, "positions": list},
            "cameras": {"name": str, "time": (int, float), "pose": list,
                        "intrinsics": list, "width": (int, float), "height": (int, float),
                        "image": str},
        }.items():
            for entry in data[key]:
                if not isinstance(entry, dict) or any(
                    not isinstance(entry.get(field), kind) for field, kind in fields.items()
                ):
                    raise ValueError(f"Invalid scene {key} entry")
        scene = cls()
        scene.data = data
        return scene

    def serve(self, *, host="127.0.0.1", port=7860):
        from .server import serve

        serve(scene=self, host=host, port=port)
