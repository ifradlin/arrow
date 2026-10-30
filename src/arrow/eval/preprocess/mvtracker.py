"""Prepare RGB-only MVTracker clips with 24 timestamps and four cameras.

Source: https://huggingface.co/datasets/ethz-vlg/mv3dpt-datasets
Annotations come from MV-Kubric, DexYCB and Panoptic Studio/TAPVid-3D;
Panoptic depth is rendered by Dynamic-3DGS. See docs/EVAL.md for setup.

Kubric/DexYCB retain cached query slots, including duplicates; Panoptic samples
within frames 0, 2, ..., 46. Source cameras are sampled uniformly from visible rig views.
Query selection uses causal visibility; scoring uses full-clip visibility.
World coordinates and source units are preserved.
"""

import argparse
import json
from pathlib import Path
import zlib

import numpy as np
from PIL import Image
from scipy.spatial.transform import Rotation

from arrow.data.io import scene_sha256, write_depth

RECIPE = "mvtracker_rgb_full_clip_v1"
SOURCE_REPO = "ethz-vlg/mv3dpt-datasets"
SOURCE_REVISION = "cccb9128fb95d302c662151e65a09377175c2a3a"
ARCHIVES = {
    "kubric-multiview--test.tar.gz": "db91ebeca89aefd129aceb0aa2ba5b252d9d878399bedaa9bbf88da1ec34b793",
    "dex-ycb-multiview.tar.gz": "acfa2da23c6638b6a4871f001945d3e5eeaae2788f8b2bf2a3cb9db2d4b9105b",
    "panoptic-multiview.tar.gz": "a62a52010f679f942902083b8ecdd98fcf127ec2def4cb5074117252df0c86a8",
}
CLIP_LENGTH = 24
SCENES = {
    "kubric": tuple(str(i) for i in range(1, 31)),
    "dexycb": (
        "20200709-subject-01__20200709_141754", "20200813-subject-02__20200813_145653",
        "20200820-subject-03__20200820_135841", "20200903-subject-04__20200903_104428",
        "20200908-subject-05__20200908_144409", "20200918-subject-06__20200918_114117",
        "20200928-subject-07__20200928_144906", "20201002-subject-08__20201002_110227",
        "20201015-subject-09__20201015_144721", "20201022-subject-10__20201022_112651",
    ),
    "panoptic": ("basketball", "boxes", "football", "juggle", "softball", "tennis"),
}
SOURCE_DIRS = {"kubric": "kubric-multiview/test", "dexycb": "dex-ycb-multiview",
               "panoptic": "panoptic-multiview"}
RIGS = {
    "kubric": {"seed72-dynamic0.5-verydynamic-0.25-views0_1_2_3-n512-numviews-1-t24": (0, 1, 2, 3)},
    "dexycb": {"seed72-views0_1_2_3-n384": (0, 1, 2, 3)},
    "panoptic": {f"seed72-views{rig}-n384": tuple(map(int, rig.split("_")))
                 for rig in ("1_4_7_11", "1_7_14_20", "27_16_14_8")},
}


def rigid_inverse(pose):
    result = np.eye(4)
    result[:3, :3] = pose[:3, :3].T
    result[:3, 3:] = -pose[:3, :3].T @ pose[:3, 3:]
    return result


def project(points, intrinsics, pose):
    w2c = rigid_inverse(pose)
    camera = points @ w2c[:3, :3].T + w2c[:3, 3]
    z = np.where(np.abs(camera[..., 2]) < 1e-9, 1e-9, camera[..., 2])
    return camera[..., :2] / z[..., None] @ intrinsics[:2, :2].T + intrinsics[:2, 2]


def object_classes(annotations, tracks):
    ids = annotations["object_ids"]
    hand = next(k for k, v in annotations["object_id_to_name"].item().items()
                if v == "mano-right-hand")
    moving = [i for i in np.unique(ids) if i != hand and
              np.linalg.norm(np.diff(tracks[:, ids == i], axis=0), axis=-1).mean() >= 1e-4]
    if len(moving) != 1:
        raise ValueError(f"Expected one moving DexYCB object, got {moving}")
    return ((ids == moving[0]) + 2 * ((ids != hand) & (ids != moving[0]))).astype(np.int16)


def read_scene(root, family):
    root = Path(root)
    files = set()

    def load(name, **kwargs):
        files.add(root / name)
        with np.load(root / name, **kwargs) as data:
            return dict(data)

    if family == "panoptic":
        data = load("tapvid3d_annotations.npz")
        intrinsics = data["intrinsics"].astype(np.float64)
        poses = np.stack([rigid_inverse(e) for e in data["extrinsics"].astype(np.float64)])
        tracks = data["trajectories"].astype(np.float32)
        pixels = data["trajectories_pixelspace"].astype(np.float32)
        visibility = data["per_view_visibilities"].astype(bool)
        statics = {}
        query_t = data["query_points_3d"][:, 0].round().astype(np.int64)
        probe = root / "ims/0/000000.jpg"
    else:
        data = load("tracks_3d.npz", allow_pickle=family == "dexycb")
        tracks = data["tracks_3d"].astype(np.float32)
        intrinsics, poses, pixels, visibility = [], [], [], []
        for v in range(10 if family == "kubric" else 8):
            if family == "kubric":
                path = root / f"view_{v}/metadata.json"
                files.add(path)
                meta = json.loads(path.read_text())
                w, h = meta["metadata"]["resolution"]
                intrinsics.append(np.diag([w, h, 1.]) @ np.asarray(meta["camera"]["K"])
                                  @ np.diag([1., -1., -1.]))
                quaternions = np.asarray(meta["camera"]["quaternions"])
                positions = np.asarray(meta["camera"]["positions"])
                if not (np.array_equal(quaternions, np.broadcast_to(quaternions[0], quaternions.shape))
                        and np.array_equal(positions, np.broadcast_to(positions[0], positions.shape))):
                    raise ValueError(f"Expected static cameras in {path}")
                pose = np.eye(4)
                pose[:3, :3] = Rotation.from_quat(quaternions[0], scalar_first=True).as_matrix()
                pose[:3, 3] = positions[0]
                poses.append(pose @ np.diag([1., -1., -1., 1.]))
                view_tracks = load(f"view_{v}/tracks_2d.npz")
                pixels.append(view_tracks["tracks_2d"].astype(np.float32))
                visibility.append(~view_tracks["occlusion"])
            else:
                camera = load(f"view_{v:02d}/intrinsics_extrinsics.npz")
                intrinsics.append(camera["intrinsics"][:3, :3].astype(np.float64))
                poses.append(rigid_inverse(camera["extrinsics"].astype(np.float64)))
        intrinsics, poses = np.stack(intrinsics), np.stack(poses)
        if family == "kubric":
            pixels, visibility = np.stack(pixels), np.stack(visibility)
            statics = {"track_segmentation_ids": load("tracks_segmentation_ids.npz")["tracks_segmentation_ids"]}
            probe = root / "view_0/rgba_00000.png"
        else:
            pixels = data["tracks_2d"].astype(np.float32)
            visibility = data["tracks_2d_visibilities"].astype(bool)
            statics = {"track_object_class": object_classes(data, tracks)}
            probe = root / "view_00/rgb/00000.png"
        query_t = None
    files.add(probe)
    with Image.open(probe) as image:
        w, h = image.size
    for v in range(len(poses)):
        error = np.nanmedian(np.abs(project(tracks, intrinsics[v], poses[v]) - pixels[v]))
        if not error < .01:
            raise ValueError(f"Reprojection error {error} px in {root}, camera {v}")
    return {"intrinsics": intrinsics, "poses": poses, "tracks": tracks, "pixels": pixels,
            "visibility": visibility, "query_t": query_t, "statics": statics,
            "size": (h, w), "files": files}


def select_subsets(root, family, data, frames):
    root = Path(root)
    by_trajectory = {data["tracks"][:, i].tobytes(): i for i in range(data["tracks"].shape[1])}
    subsets = {}
    for tag, views in RIGS[family].items():
        if family == "panoptic":
            causal = data["visibility"][list(views)][:, frames] & (
                frames[None, :, None] >= data["query_t"][None, None, :])
            eligible = np.flatnonzero(causal.any(0).sum(0) >= 2)
            rng = np.random.default_rng(zlib.crc32(f"{root.name}/{tag}".encode()))
            ids = np.sort(rng.permutation(eligible)[:384])
            visible = causal.any(0)[:, ids].copy()
            visible[(np.arange(len(frames))[:, None] * visible).max(0), np.arange(len(ids))] = False
            query_t = visible.argmax(0)
            queries = np.concatenate([query_t[:, None].astype(np.float32),
                                      data["tracks"][frames[query_t], ids]], axis=1)
            valid = ~np.isnan(data["pixels"][list(views)][:, frames][:, :, ids]).any(-1).any(0)
            visible = causal[:, :, ids]
        else:
            path = root / "cache" / f"cachedtracks--{tag}--v1.npz"
            data["files"].add(path)
            with np.load(path) as cache:
                tracks = cache["traj3d_world"].astype(np.float32)
                ids = np.array([by_trajectory.get(tracks[:, i].tobytes(), -1)
                                for i in range(tracks.shape[1])], dtype=np.int64)
                if (ids < 0).any():
                    raise ValueError(f"Cached trajectories do not match source tracks: {path}")
                queries = cache["query_points"].astype(np.float32)
                causal = cache["visibility"].astype(bool) & (
                    np.arange(len(tracks))[None, :, None] >= queries[:, 0].round()[None, None, :])
                keep = causal.any(0)[frames].sum(0) >= 2
                ids, queries = ids[keep], queries[keep]
                visible = causal[:, frames][:, :, keep]
                valid = cache["valids"].astype(bool)[frames][:, keep]
        query_t = queries[:, 0].round().astype(np.int64)
        if not ((query_t >= 0) & (query_t < len(frames))).all():
            raise ValueError(f"Query outside the clip: {root}/{tag}")
        candidates = visible[:, query_t, np.arange(len(ids))]
        if not candidates.any(0).all():
            raise ValueError(f"Query invisible in all rig cameras: {root}/{tag}")
        # Seed camera selection independently of query sampling.
        rng = np.random.default_rng(zlib.crc32(f"{root.name}/{tag}".encode()))
        query_views = np.asarray(views)[np.where(candidates, rng.random(candidates.shape), -1.).argmax(0)]
        xy = np.zeros((len(ids), 2), dtype=np.float32)
        for v in np.unique(query_views):
            selected = query_views == v
            xy[selected] = project(queries[selected, 1:], data["intrinsics"][v], data["poses"][v])
        subsets[tag] = {
            "views": list(views), "track_indices": ids, "queries_txyz": queries,
            "queries_xyt": np.concatenate([xy, query_t[:, None].astype(np.float32)], axis=1),
            "query_views": query_views.astype(np.int16), "visible_points_mask": visible,
            "valid_points_mask": valid,
            "scoring_visibility": data["visibility"][list(views)][:, frames][:, :, ids].any(0),
            "query_frames": query_t * len(views) + np.searchsorted(sorted(views), query_views),
        }
    return subsets


def read_depth(root, family, view, frame, intrinsics):
    if family == "panoptic":
        path = root / "dynamic3dgs_depth" / f"depths_{view:02d}.npy"
        depth = np.array(np.load(path, mmap_mode="r")[frame], dtype=np.float32)
        depth[~np.isfinite(depth) | (depth <= 0) | (depth >= 15)] = np.nan
    else:
        path = root / (f"view_{view}/depth_{frame:05d}.tiff" if family == "kubric"
                       else f"view_{view:02d}/depth/{frame:05d}.png")
        with Image.open(path) as image:
            raw = np.array(image)
        depth = raw.squeeze().astype(np.float32)
        if family == "kubric":
            y, x = np.mgrid[:depth.shape[0], :depth.shape[1]]
            depth = depth / np.sqrt(1 + ((x + .5 - intrinsics[0, 2]) / intrinsics[0, 0]) ** 2
                                   + ((y + .5 - intrinsics[1, 2]) / intrinsics[1, 1]) ** 2)
            depth[~np.isfinite(depth) | (depth <= 0)] = np.nan
        else:
            depth /= 1000
            depth[(raw == 0) | (raw == 65535)] = np.nan
    return path, depth


def prepare_scene(root, output, family):
    root, output = Path(root), Path(output)
    data = read_scene(root, family)
    frames = np.arange(CLIP_LENGTH) * (2 if family == "panoptic" else 1)
    if frames[-1] >= len(data["tracks"]):
        raise ValueError(f"Insufficient timestamps in {root}")
    subsets = select_subsets(root, family, data, frames)
    views = sorted({v for subset in subsets.values() for v in subset["views"]})
    tracks = np.unique(np.concatenate([subset["track_indices"] for subset in subsets.values()]))
    output.mkdir(parents=True, exist_ok=False)

    def save(name, values):
        path = output / name
        path.parent.mkdir(parents=True, exist_ok=True)
        np.save(path, values)

    h, w = data["size"]
    metadata = {
        "source_frame_ids": frames.tolist(), "source_view_ids": views,
        "units": "relative" if family == "kubric" else "meters",
        "camera_convention": "OpenCV_c2w", "depth_encoding": "log16",
        "recipe": RECIPE, "cameras": {}, "eval_subsets": {},
    }
    for v, source_view in enumerate(views):
        name = f"v{v:02d}"
        # Normalize in float64, then round to float32 for benchmark compatibility.
        normalized = (np.array([[1 / w, 0, .5 / w], [0, 1 / h, .5 / h], [0, 0, 1]])
                      @ data["intrinsics"][source_view]).astype(np.float32)
        intrinsics = normalized * np.array([w, h, 1], dtype=np.float32)[:, None]
        intrinsics[:2, 2] -= .5
        metadata["cameras"][name] = {"intrinsics": intrinsics.tolist(), "image_size": [h, w],
                                      "pose": f"{name}/pose.npy", "color": f"{name}/color"}
        save(f"{name}/pose.npy", np.repeat(data["poses"][source_view][None].astype(np.float32),
                                          len(frames), axis=0))
        for field in ("color", "depth"):
            (output / name / field).mkdir()
        for t, source_t in enumerate(frames):
            if family == "kubric":
                color = root / f"view_{source_view}/rgba_{source_t:05d}.png"
            elif family == "dexycb":
                color = root / f"view_{source_view:02d}/rgb/{source_t:05d}.png"
            else:
                color = root / f"ims/{source_view}/{source_t:06d}.jpg"
            with Image.open(color) as image:
                image.convert("RGB").save(output / name / "color" / f"{t:05d}.jpg",
                                          quality=75, subsampling=2)
            path, depth = read_depth(root, family, source_view, source_t, data["intrinsics"][source_view])
            write_depth(output / name / "depth" / f"{t:05d}.png", depth)
            data["files"].update((color, path))
            save(f"{name}/point_tracks_2d/{t:05d}.npy", data["pixels"][source_view, source_t, tracks])
            save(f"{name}/visible_points_mask/{t:05d}.npy", data["visibility"][source_view, source_t, tracks])
    for t, source_t in enumerate(frames):
        save(f"point_tracks_3d/{t:05d}.npy", data["tracks"][source_t, tracks])
        save(f"valid_points_mask/{t:05d}.npy", np.ones(len(tracks), dtype=bool))
    save("source_track_ids.npy", tracks)
    for key, values in data["statics"].items():
        save(f"{key}.npy", values[tracks])
    for tag, subset in subsets.items():
        subset["views"] = [views.index(v) for v in subset["views"]]
        subset["track_indices"] = np.searchsorted(tracks, subset["track_indices"])
        subset["query_views"] = np.array([views.index(v) for v in subset["query_views"]], dtype=np.int16)
        entry = {"views": subset["views"], "input_views": sorted(subset["views"]),
                 "num_tracks": len(subset["track_indices"])}
        for key, values in subset.items():
            if key != "views":
                entry[key] = f"eval_subsets/{tag}/{key}.npy"
                save(entry[key], values)
        metadata["eval_subsets"][tag] = entry
    (output / "scene.json").write_text(json.dumps(metadata, indent=2) + "\n")
    return {"num_frames": len(frames), "num_views": len(views), "num_tracks": len(tracks),
            "query_slots": {tag: entry["num_tracks"] for tag, entry in metadata["eval_subsets"].items()},
            "source_sha256": scene_sha256(root, data["files"]), "sha256": scene_sha256(output)}


def prepare(root, output):
    root, output = Path(root), Path(output)
    output.mkdir(parents=True, exist_ok=False)
    manifest = {"format_version": 2, "recipe": RECIPE,
                "source": {"repo": SOURCE_REPO, "revision": SOURCE_REVISION,
                           "archive_sha256": ARCHIVES}, "splits": {}, "subsets": {}}
    for family, names in SCENES.items():
        manifest["splits"][family] = list(names)
        for name in names:
            counts = prepare_scene(root / SOURCE_DIRS[family] / name, output / family / name, family)
            for tag, views in RIGS[family].items():
                subset = family if family != "panoptic" else "panoptic_" + "_".join(map(str, views))
                manifest["subsets"].setdefault(subset, []).append({
                    "path": f"{family}/{name}", "eval_subset": tag, **counts})
            print(f"{family}/{name}: {sum(counts['query_slots'].values())} query slots", flush=True)
        for index in (".index.txt", ".test.txt"):
            (output / family / index).write_text("\n".join(names) + "\n")
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", help="Extracted directory containing the three MVTracker datasets")
    parser.add_argument("--output", default="data/eval/mvtracker")
    args = parser.parse_args()
    prepare(args.root, args.output)


if __name__ == "__main__":
    main()
