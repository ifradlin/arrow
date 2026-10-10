"""Server-side clips: browsing, frame counts and frame previews.

Frame indices match `load_input`: natural-sorted images in a folder, or decoded
video frames in presentation order.
"""

from functools import lru_cache
from io import BytesIO

from PIL import Image

from arrow.data.io import IMAGE_SUFFIXES, image_paths, media_image_paths, natural_key, select_frame_indices, upright_frame, upright_image

SCENE_SUFFIXES = {".json", ".npz"}
VIDEO_SUFFIXES = {".mp4", ".mov", ".m4v", ".avi", ".mkv", ".webm"}


def browse(path):
    entries = sorted(
        (p for p in path.iterdir() if not p.name.startswith(".")), key=natural_key
    )
    folders = []
    for entry in entries:
        if entry.is_dir():
            try:
                count = len(image_paths(entry))
            except OSError:
                count = None
            folders.append({"name": entry.name, "path": str(entry), "images": count})
    return {
        "path": str(path),
        "parent": str(path.parent) if path != path.parent else None,
        "folders": folders,
        "videos": [
            {"name": p.name, "path": str(p)}
            for p in entries
            if p.is_file() and p.suffix.lower() in VIDEO_SUFFIXES
        ],
        "images": sum(p.is_file() and p.suffix.lower() in IMAGE_SUFFIXES for p in entries),
        "image_files": [
            {"name": p.name, "path": str(p)}
            for p in entries if p.is_file() and p.suffix.lower() in IMAGE_SUFFIXES
        ],
        "scenes": [
            {"name": p.name, "path": str(p)}
            for p in entries if p.is_file() and p.suffix.lower() in SCENE_SUFFIXES
        ],
    }


@lru_cache(maxsize=16)
def _video_timestamps(path: str, modified):
    import av

    with av.open(path, mode="r") as container:
        stream = container.streams.video[0]
        rotation = round(next(container.decode(stream)).rotation) % 180
    with av.open(path, mode="r") as container:
        stream = container.streams.video[0]
        pts = sorted(p.pts for p in container.demux(stream) if p.pts is not None and p.size)
        # The size as shown: a frame stored on its side with a 90° rotation flag is portrait.
        width, height = (stream.height, stream.width) if rotation else (stream.width, stream.height)
        assert stream.time_base is not None
        return [float(t * stream.time_base) for t in pts], pts, width, height


def describe(path):
    images = media_image_paths(path)
    if images is not None:
        if not images:
            raise ValueError("This folder contains no images")
        with Image.open(images[0]) as first:
            width, height = upright_image(first).size
        return {
            "path": [str(p) for p in path] if isinstance(path, (list, tuple)) else str(path),
            "kind": "images",
            "name": f"{len(images)} selected images" if isinstance(path, (list, tuple)) else path.name,
            "frames": len(images),
            "width": width,
            "height": height,
            "times": None,
        }
    times, _, width, height = _video_timestamps(str(path), path.stat().st_mtime)
    return {
        "path": str(path),
        "kind": "video",
        "name": path.name,
        "frames": len(times),
        "width": width,
        "height": height,
        "times": times,
    }


def selected_sizes(path, *, start, stride, max_frames, frame_indices=None):
    """Read dimensions of selected frames without loading their RGB pixels."""
    indices = select_frame_indices(
        start=start, stride=stride, max_frames=max_frames, frame_indices=frame_indices
    )
    paths = media_image_paths(path)
    sizes = []
    if paths is not None:
        for index in indices:
            if index >= len(paths):
                break
            with Image.open(paths[index]) as image:
                width, height = image.size
                sizes.append((height, width) if image.getexif().get(274) in (5, 6, 7, 8) else (width, height))
    else:
        clip = describe(path)
        sizes = [(clip["width"], clip["height"])] * sum(i < clip["frames"] for i in indices)
    if frame_indices is not None and len(sizes) != len(indices):
        raise ValueError("A selected frame is beyond the end of the input")
    return sizes


@lru_cache(maxsize=512)
def frame_jpeg(path, modified, index, size):
    images = media_image_paths(path)
    if images is not None:
        with Image.open(images[index]) as image:
            image = upright_image(image).convert("RGB")
    else:
        import av

        target = _video_timestamps(str(path), modified)[1][index]
        with av.open(str(path)) as container:
            stream = container.streams.video[0]
            container.seek(target, stream=stream)
            image = upright_frame(
                next(f for f in container.decode(stream) if f.pts >= target), max_side=size
            )
    image.thumbnail((size, size))
    stream = BytesIO()
    image.save(stream, format="JPEG", quality=85)
    return stream.getvalue()
