"""Raw media reading and source-frame metadata."""

from operator import index as integer_index
from pathlib import Path
import re

from PIL import Image, ImageOps

IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}


# PIL transposes that undo a video stream's display rotation (`VideoFrame.rotation`, degrees).
_UPRIGHT = {90: Image.Transpose.ROTATE_270, 180: Image.Transpose.ROTATE_180, 270: Image.Transpose.ROTATE_90}


def upright_frame(frame, *, max_side=None):
    """A decoded video frame as players show it: phone videos store portrait frames on their side
    with a rotation flag. Optional preview scaling happens before conversion to RGB."""
    scale = min(1, max_side / max(frame.width, frame.height)) if max_side else 1
    image = frame.to_image(
        width=max(1, round(frame.width * scale)), height=max(1, round(frame.height * scale))
    )
    turn = _UPRIGHT.get(round(frame.rotation) % 360)
    return image.transpose(turn) if turn else image


def upright_image(image):
    """An opened image turned as its EXIF orientation says, as phone photos need."""
    return ImageOps.exif_transpose(image)


def natural_key(path):
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", path.name)]


def image_paths(path):
    """Images in a folder, in natural filename order."""
    return sorted(
        (p for p in path.iterdir() if p.is_file() and p.suffix.lower() in IMAGE_SUFFIXES),
        key=natural_key,
    )


def media_image_paths(source):
    """Resolve an image source; return None for a video."""
    if isinstance(source, (str, Path)):
        path = Path(source)
        if path.is_dir():
            return image_paths(path)
        return [path] if path.suffix.lower() in IMAGE_SUFFIXES else None
    return [Path(path) for path in source]


def select_frame_indices(*, start=0, stride=1, max_frames=24, frame_indices=None):
    """Ordered source indices; an explicit selection overrides start, stride and max_frames."""
    if frame_indices is not None:
        try:
            indices = tuple(integer_index(i) for i in frame_indices)
        except TypeError:
            raise ValueError("frame_indices must contain integers") from None
        if not indices or indices[0] < 0 or any(b <= a for a, b in zip(indices, indices[1:])):
            raise ValueError("frame_indices must be nonempty, nonnegative and strictly increasing")
        return indices
    if start < 0 or stride < 1 or max_frames < 1:
        raise ValueError("start must be nonnegative; stride and max_frames must be positive")
    return range(start, start + stride * max_frames, stride)


def read_media(source, *, start=0, stride=1, max_frames=24, frame_indices=None):
    """Read selected RGB images and their original indices, names, and video PTS."""
    indices = select_frame_indices(
        start=start, stride=stride, max_frames=max_frames, frame_indices=frame_indices
    )
    paths = media_image_paths(source)
    images, frames = [], []
    if paths is not None:
        for index in indices:
            if index >= len(paths):
                break
            with Image.open(paths[index]) as image:
                images.append(upright_image(image).convert("RGB"))
            frames.append(
                {
                    "index": index,
                    "name": paths[index].name,
                    "timestamp": None,
                    "timestamp_source": None,
                }
            )
    else:
        path = Path(source)
        import av

        selected = iter(indices)
        wanted = next(selected)
        with av.open(str(path)) as container:
            stream = container.streams.video[0]
            for index, frame in enumerate(container.decode(stream)):
                if index != wanted:
                    continue
                images.append(upright_frame(frame).convert("RGB"))
                timestamp = (
                    float(frame.pts * frame.time_base)
                    if frame.pts is not None and frame.time_base is not None
                    else None
                )
                frames.append(
                    {
                        "index": index,
                        "name": path.name,
                        "timestamp": timestamp,
                        "timestamp_source": "pts" if timestamp is not None else None,
                    }
                )
                wanted = next(selected, None)
                if wanted is None:
                    break
    if frame_indices is not None and len(images) != len(indices):
        raise ValueError("A selected frame is beyond the end of the input")
    if not images:
        raise ValueError("No frames selected from the input")
    return images, frames
