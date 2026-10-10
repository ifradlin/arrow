"""arrow results to scene data. Raw predictions are never modified."""

from dataclasses import fields

import numpy as np

from arrow import Predictions
from arrow.tasks.pose import estimate_poses

from .confidence import suggest_confidence_keep
from .scene import Scene, normal_bytes


def depth_rgb(depth, valid, near, far):
    """Turbo RGB bytes of inverse depth from `far` (blue) to `near` (red); invalid pixels black."""
    import matplotlib

    with np.errstate(divide="ignore", invalid="ignore"):
        disparity = (1 / depth - 1 / far) / (1 / near - 1 / far)
    colored = matplotlib.colormaps["turbo"](np.where(valid & (depth > 0), disparity, np.nan))[..., :3]
    return (colored * 255).astype(np.uint8)


def viridis(values):
    """Values in [0, 1] as viridis RGB bytes."""
    import matplotlib

    colored = matplotlib.colormaps["viridis"](np.nan_to_num(values).clip(0, 1))[..., :3]
    return (colored * 255).round().astype(np.uint8)


def estimate_camera(points, pixels, width, height):
    """Pinhole DLT for display only; return no camera for degenerate geometry."""
    finite = np.isfinite(points).all(-1) & np.isfinite(pixels).all(-1)
    points, pixels = points[finite].astype(np.float64), pixels[finite].astype(np.float64)
    if len(points) < 12:
        return None
    selected = np.linspace(0, len(points) - 1, min(len(points), 2048), dtype=int)
    points, pixels = points[selected], pixels[selected]
    center = points.mean(0)
    scale = np.linalg.norm(points - center, axis=-1).mean()
    if scale < 1e-8:
        return None
    world = np.column_stack([(points - center) / scale, np.ones(len(points))])
    uv = (pixels + 0.5) / [width, height]
    zero = np.zeros_like(world)
    design = np.concatenate(
        [
            np.column_stack([world, zero, -uv[:, :1] * world]),
            np.column_stack([zero, world, -uv[:, 1:] * world]),
        ]
    )
    _, singular, vh = np.linalg.svd(design, full_matrices=False)
    if singular[-2] < 1e-8:
        return None
    projection = vh[-1].reshape(3, 4)
    normalization = np.eye(4)
    normalization[:3, :3] /= scale
    normalization[:3, 3] = -center / scale
    projection = projection @ normalization
    if np.linalg.det(projection[:, :3]) < 0:
        projection = -projection
    q, r = np.linalg.qr(np.flipud(projection[:, :3]).T)
    k = np.fliplr(np.flipud(r.T))
    rotation = np.flipud(q.T)
    signs = np.diag(np.where(np.diag(k) < 0, -1.0, 1.0))
    k, rotation = k @ signs, signs @ rotation
    translation = np.linalg.solve(k, projection[:, 3])
    k /= k[2, 2]
    projected = (points @ rotation.T + translation) @ k.T
    if np.mean(projected[:, 2] > 0) < 0.8:
        return None
    error = np.linalg.norm(projected[:, :2] / projected[:, 2:] - uv, axis=-1)
    if np.median(error) > 0.05:
        return None
    pose = np.eye(4)
    pose[:3, :3] = rotation.T
    pose[:3, 3] = -rotation.T @ translation
    k[0] *= width
    k[1] *= height
    k[0, 2] -= 0.5
    k[1, 2] -= 0.5
    return pose, k


def grid_normals(points):
    """Unit normals of a `[rows, columns, 3]` point grid, from the cross product of its row and
    column differences, facing the camera; NaN where a neighbour is missing."""
    if min(points.shape[:2]) < 2:
        return np.full(points.shape, np.nan, np.float32)
    normals = np.cross(np.gradient(points, axis=0), np.gradient(points, axis=1))
    with np.errstate(invalid="ignore", divide="ignore"):
        return normals / np.linalg.norm(normals, axis=-1, keepdims=True)


def lattice_shape(xy):
    """`(rows, columns)` when `[N, 2]` pixels are a full row-major grid, otherwise None."""
    columns, rows = len(np.unique(xy[:, 0])), len(np.unique(xy[:, 1]))
    if rows * columns != len(xy):
        return None
    grid = xy.reshape(rows, columns, 2)
    if (grid[:, :, 1] == grid[:, :1, 1]).all() and (grid[:, :, 0] == grid[:1, :, 0]).all():
        return rows, columns
    return None


def binned_normals(points, pixels, seen, height, width):
    """Normals of scattered points from where they land in the image: each frame's visible points are
    binned into cells sized by their density, the cells form a point grid, and every point takes its
    cell's normal. `points` [F, N, 3], `pixels` [F, N, 2], `seen` [F, N]; NaN where unseen."""
    normals = np.full(points.shape, np.nan, np.float32)
    for frame in range(len(points)):
        visible = np.flatnonzero(seen[frame] & np.isfinite(pixels[frame]).all(-1))
        if len(visible) < 4:
            continue
        # About four points a cell, so nearly every cell and its neighbours hold one.
        cell = max(1, round(np.sqrt(4 * height * width / len(visible))))
        rows, columns = -(-height // cell), -(-width // cell)
        x, y = (pixels[frame, visible] / cell).astype(int).clip(0, [columns - 1, rows - 1]).T
        grid = np.full((rows, columns, 3), np.nan, np.float32)
        grid[y, x] = points[frame, visible]
        normals[frame, visible] = grid_normals(grid)[y, x]
    return normals


def sigmoid(logits):
    return 1 / (1 + np.exp(-logits))


LABELS = {
    "reconstruct": "Reconstruction",
    "pose": "Camera poses",
    "depth": "Video depth",
    "track": "Tracks",
    "all_pixels": "All-pixel tracks",
}


def from_result(result, *, reconstruction_cameras=False):
    """Reconstruction camera fitting is internal opt-in; the viewer uses the pose task."""
    if result.images.shape[0] != 1:
        raise ValueError("The local viewer displays one clip at a time")
    references = {
        group.get("reference_frame", 0) for group in result.metadata["groups"]
        if group["kind"] in ("tracks", "reconstruction")
    }
    reference = next(iter(references), 0)
    if len(references) > 1 or not isinstance(reference, int):
        raise ValueError("3D layers must share one fixed reference frame")
    views = result.metadata.get("num_views", 1)
    targets = list(range(result.images.shape[1]))
    if any(g.get("target_frames", targets) != targets for g in result.metadata["groups"]):
        raise ValueError("The viewer requires predictions for every input frame in order")
    images = (
        (result.images[0].permute(0, 2, 3, 1).numpy() * 255).round().clip(0, 255).astype(np.uint8)
    )
    frames, height, width, _ = images.shape
    # One timeline for the rig, using the first camera's timestamps when available.
    times = [f["timestamp"] for f in result.metadata["frame_info"][::views]]
    if any(t is None for t in times) or any(b <= a for a, b in zip(times, times[1:])):
        times = list(map(float, range(frames // views)))
    times = np.repeat(times, views).tolist()

    def name(base, frame):
        return base if views == 1 else f"{base}/view-{frame % views}"

    def layer_name(base, index, frame):
        return f"{name(base, frame)}/{index}"
    scene = Scene(
        coordinate_frame=result.metadata["coordinate_frame"], scale=result.metadata["scale"]
    )
    layers = []
    scene.data["metadata"] = {
        "model": result.metadata.get("model", {}),
        "frame_info": result.metadata["frame_info"],
        "num_views": views,
        "reference_frame": reference,
        "view_names": [f.get("view_name", "Camera") for f in result.metadata["frame_info"][:views]],
        "input_selection": result.metadata.get("input_selection"),
        "cameras": "Pinhole cameras fit to predicted points for display; failed fits omitted.",
        "layers": layers,
    }
    for index, image in enumerate(images):
        scene.log_image(name("rgb", index), image, time=times[index])
    predictions = result.predictions
    xy = result.queries.xy[0].numpy()
    for index, group in enumerate(result.metadata["groups"]):
        start, count, n = group["start"], group["count"], group["points_per_frame"]
        task = group.get(
            "task",
            {"reconstruction": "reconstruct", "tracks": "track"}.get(group["kind"], group["kind"]),
        )
        layer = {"task": task, "label": LABELS[task] + (f" · {group['merged']} merged" if "merged" in group else "")}
        if "sky_skipped" in group:
            layer["sky_skipped"] = group["sky_skipped"]
        layers.append(layer)
        sl = slice(start, start + count)
        if group["kind"] == "pose":
            poses = estimate_poses(
                Predictions(
                    **{f.name: getattr(predictions, f.name)[:, sl] for f in fields(Predictions)}
                ),
                result.queries.xy[:, sl],
                num_frames=frames,
                reference_frame=group["reference_frame"],
                **group.get("pose", {}),
            )
            layer["detail"] = f"{n:,} pixels per frame"
            if not poses.valid[0, reference]:
                layer["detail"] += " · reference pose unavailable"
                continue
            cameras = poses.camera_to_reference[0].numpy()
            cameras = np.linalg.inv(cameras[reference]) @ cameras
            drawable = poses.valid[0].numpy() & np.isfinite(poses.intrinsics[0].numpy()).all((1, 2))
            for frame in np.flatnonzero(drawable):
                scene.log_camera(
                    layer_name("camera", index, frame),
                    cameras[frame],
                    poses.intrinsics[0, frame].numpy(),
                    width=width,
                    height=height,
                    time=times[frame],
                    image=name("rgb", frame),
                )
            continue
        if group["kind"] == "tracks" and views > 1:
            _multiview_tracks(scene, result, index, images, times[::views], layer)
            continue
        xyz = predictions.points[0, sl].numpy().reshape(frames, n, 3)
        confidence = predictions.point_confidence[0, sl].numpy().reshape(frames, n)
        normals = predictions.normals[0, sl].numpy().reshape(frames, n, 3)
        visibility = sigmoid(predictions.visibility_logits[0, sl].numpy().reshape(frames, n))
        # Normals of the cloud itself: exact where the queries are a pixel grid (reconstruction, depth,
        # a tracking grid); otherwise (clicked points, all-pixel or merged tracks) binned by where each
        # frame sees the points.
        shape = lattice_shape(xy[sl][:n])
        if shape is not None:
            cloud_normals = np.stack([grid_normals(frame.reshape(*shape, 3)).reshape(n, 3) for frame in xyz])
        else:
            seen_at = predictions.uv[0, sl].numpy().reshape(frames, n, 2) * [width, height] - 0.5
            cloud_normals = binned_normals(xyz, seen_at, visibility > 0.5, height, width)
        pixels = xy[sl].reshape(frames, n, 2).round().astype(int)
        colors = images[
            np.arange(frames)[:, None],
            pixels[..., 1].clip(0, height - 1),
            pixels[..., 0].clip(0, width - 1),
        ]
        if group["kind"] == "tracks":
            source = result.queries.source_frame[0, sl].numpy().reshape(frames, n)[0]
            keep = np.isfinite(xyz).all((0, 2)) & np.isfinite(confidence).all(0)
            seeded = np.flatnonzero(group.get("seeds_per_frame", []))
            layer["detail"] = (
                f"{n:,} seeded on {len(seeded)} frames"
                if len(seeded)
                else f"{n:,} from frame {group.get('source_frame', 0) + 1}"
            )
            scene.log_tracks(
                f"tracks/{index}",
                xyz[:, keep],
                times=times,
                colors=colors[source, np.arange(n)][keep],
                source_uv=((xy[sl][:n][keep] + 0.5) / [width, height]),
                source_frame=source[keep],
                confidence=confidence[:, keep],
                visibility_logits=predictions.visibility_logits[0, sl]
                .numpy()
                .reshape(frames, n)[:, keep],
                normals=normals[:, keep],
                cloud_normals=None if cloud_normals is None else cloud_normals[:, keep],
            )
        elif group["kind"] == "depth":
            columns = len(np.unique(xy[sl][:n, 0]))
            depth = xyz[..., 2].reshape(frames, n // columns, columns)
            valid = np.isfinite(depth) & (depth > 0)
            near, far = np.percentile(depth[valid], [2, 98]) if valid.any() else (0.0, 1.0)
            layer["detail"] = f"{columns} × {n // columns} per frame"
            layer["depth_range"] = [float(near), float(far)]
            for frame in range(frames):
                image = depth_rgb(
                    depth[frame], valid[frame],
                    near=float(near) if near > 0 else 1.0,
                    far=float(far) if far > near > 0 else max(float(near), 1.0) * 1.01,
                )
                scene.log_image(layer_name("depth", index, frame), image, time=times[frame])
                grid = (n // columns, columns)
                scene.log_image(
                    layer_name("normals", index, frame), normal_bytes(normals[frame].reshape(*grid, 3)), time=times[frame]
                )
                scene.log_image(
                    layer_name("visibility", index, frame), viridis(visibility[frame].reshape(grid)), time=times[frame]
                )
        else:
            layer["detail"] = (
                f"every {group['stride']} px" if "stride" in group and "merged" not in group
                else f"{n:,} points per frame"
            )
            for frame in range(frames):
                keep = np.isfinite(xyz[frame]).all(-1) & np.isfinite(confidence[frame])
                scene.log_points(
                    layer_name("reconstruction", index, frame),
                    xyz[frame, keep],
                    colors=colors[frame, keep],
                    confidence=confidence[frame, keep],
                    normals=normals[frame, keep],
                    cloud_normals=None if cloud_normals is None else cloud_normals[frame, keep],
                    visibility=visibility[frame, keep],
                    time=times[frame],
                )
                if reconstruction_cameras:
                    camera = estimate_camera(
                        xyz[frame, keep], xy[sl].reshape(frames, n, 2)[frame, keep], width, height
                    )
                    if camera is not None:
                        scene.log_camera(
                            layer_name("camera", index, frame), *camera, width=width, height=height,
                            time=times[frame], image=name("rgb", frame)
                        )
    scores = [cloud["confidence"] for cloud in scene.data["points"]]
    # Multi-view modes share confidence; count each trajectory once.
    scores.extend(
        np.mean(track["confidence"], axis=0)
        for track in scene.data["tracks"] if track.get("mode") != "source"
    )
    recommended = suggest_confidence_keep(np.concatenate(scores) if scores else [])
    scene.data["metadata"]["recommended"] = {"confidenceKeep": recommended}
    scene.set_presentation({"settings": {"confidenceKeep": recommended}})
    return scene


def _multiview_tracks(scene, result, index, images, times, layer):
    """Fold target frames onto time; retain both display modes without changing results."""
    from arrow.tasks.tracking import tracking_predictions

    views = result.metadata["num_views"]
    group = result.metadata["groups"][index]
    tracks = tracking_predictions(result, index)
    timesteps, seeds = len(times), group["points_per_frame"]

    def fold(value):
        return value[0].numpy().reshape(seeds, timesteps, views, *value.shape[3:]).swapaxes(0, 1)

    xyz = fold(tracks.points)
    logits = fold(tracks.visibility_logits)
    finite = np.isfinite(xyz).all(-1)
    visible = (logits > 0) & finite
    speaking = np.where(visible.any(2, keepdims=True), visible, finite)
    candidates = np.where(speaking[..., None], xyz, np.nan)
    empty = ~speaking.any(2)
    candidates[empty, 0] = 0
    median = np.nanmedian(candidates, axis=2)
    start = group["start"]
    source = result.queries.source_frame[0, start:start + seeds].numpy()
    source_view = source % views
    t, n = np.arange(timesteps)[:, None], np.arange(seeds)[None, :]
    by_source = xyz[t, n, source_view]
    source_valid = finite[t, n, source_view]
    confidence = fold(tracks.point_confidence)
    good_confidence = np.isfinite(confidence)
    confidence = np.where(good_confidence, confidence, 0).sum(2) / good_confidence.sum(2).clip(1)
    # Normals and UV belong to a camera observation; use the seed camera, never average them.
    normals = fold(tracks.normals)[t, n, source_view]
    height, width = images.shape[1:3]
    uv = fold(tracks.uv) * [width, height] - 0.5
    cloud_normals = np.stack([
        binned_normals(xyz[:, :, view], uv[:, :, view], visible[:, :, view], height, width)
        for view in range(views)
    ], axis=2)[t, n, source_view]
    pixels = result.queries.xy[0, start:start + seeds].numpy()
    xy = pixels.round().astype(int).clip([0, 0], [width - 1, height - 1])
    colors = images[source, xy[:, 1], xy[:, 0]]
    source_uv = (pixels + 0.5) / [width, height]
    layer["detail"] = f"{seeds:,} tracks · {views} cameras · {timesteps} timesteps"
    across_logits = np.where(np.isfinite(logits) & finite, logits, -100).max(2)
    for mode, positions, valid, visibility in [
        ("across", median, ~empty, across_logits),
        ("source", by_source, source_valid, np.nan_to_num(logits[t, n, source_view], nan=-100)),
    ]:
        scene.log_tracks(
            f"tracks/{mode}/{index}", np.where(valid[..., None], positions, 0), times=times,
            colors=colors, confidence=confidence, visibility_logits=visibility,
            source_uv=source_uv, source_frame=source,
            mode=mode, valid=valid, normals=normals, cloud_normals=cloud_normals,
        )
