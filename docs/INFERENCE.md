# Inference

Each input image, whether from a video, a camera stream, or a photo collection, is a
*frame*. ARROW encodes a set of frames once, then answers *queries* against that encoding.
The model predicts where the queried point is at the target frame's time, as a 3D
point in the reference camera, along with its target-frame position, visibility,
confidence, and normal. Each task below is a pattern of such queries: a grid over
every frame gives a point cloud, the same pixels queried against every target give
tracks. Query construction lives in [src/arrow/tasks/](../src/arrow/tasks/), and
`infer()` in [src/arrow/infer/runner.py](../src/arrow/infer/runner.py) runs the
requested tasks on one shared encoding.

## Tasks

| Task | Result | Default reference |
|---|---|---|
| `reconstruct` | Point cloud for each frame | First frame |
| `track` | Selected points followed through target frames | First frame |
| `all_pixels` | Tracks added where earlier tracks leave pixels uncovered | First frame |
| `depth` | Each frame's own-camera pointmap; Z gives depth | The frame itself |
| `pose` | Paired pointmaps for camera-pose fitting | Middle frame |

Tasks share one encoding. Set `reference_frame` to choose a common reference.
Pixel sampling uses `reconstruction_stride`, `track_stride`, `depth_stride`,
and `all_pixels_stride`: spacing applies to both image axes, so 2 px gives roughly
one quarter of the pixels. The loader's `stride` selects frames: `stride=3` reads
frames 0, 3, 6, … with the default `start=0`.

## Images and videos

Load a video, an image folder, or an ordered list of image paths:

```python
from arrow import ARROW
from arrow.infer import infer, load_input

model = ARROW.from_pretrained("ifradlin/arrow", device="auto")
observations = load_input("clip.mp4", stride=3)
result, encoded = infer(model, observations)
```

Defaults match the [command line](#command-line-and-configuration): 24 frames,
the `track` task, a 2 px grid, and [sky skipping](#predictions).
Folders use natural filename order. `max_side=504` sets the resize target;
image dimensions are rounded to multiples of 14 and padded with white to a
common size. `device="auto"` selects CUDA, MPS, then CPU.

The examples below reuse `model`, `observations`, and `encoded` from this call.

## Selected points

By default, `track` follows a regular grid of points. To follow specific points
instead, pass their pixels as `xy`, with `source_frame` naming the frame each one
lies in. Each tracked point is a *seed*. Inputs are resized and padded before
inference, so pixels picked in the original images must first be mapped with
`transform_points()`:

```python
import torch
from arrow.tasks.tracking import tracking_predictions

source = torch.tensor([0, 2])
xy = observations.transform_points(torch.tensor([[100.25, 80.5], [200.0, 120.0]]), source)
result, _ = infer(model, observations, tasks=["track"], xy=xy, source_frame=source, encoded=encoded)
tracks = tracking_predictions(result)
# tracks.points: [batch, seed, target, 3], each seed's 3D position at every target frame
```

Without `xy`, `source_frame=[0, 2]` places grids in both frames;
`target_frames=[...]` selects targets while retaining all encoder inputs.

## Multi-view tracking

From the command line, pass one video or image folder per camera with `--multi-view`:

```bash
uv run arrow infer stream_1.mp4 stream_2.mp4 stream_3.mp4 --multi-view \
  --start 0 --end 24 --stride 6 --track-stride 4 \
  --output results/multiview.npz
uv run arrow-viewer --scene results/multiview.npz
```

This selects frame indices **0, 6, 12, 18** from every camera. `--end` is exclusive
and overrides `--max-frames`; without it, `--max-frames` counts selected timesteps
(24 by default). Every selected index must exist in every stream. Image folders
use natural filename order, and videos and folders can be mixed. Streams must
already be synchronized by frame index; camera order follows the input arguments.

The default `track` task seeds each camera's first selected frame. `--track-stride`
sets approximate pixel spacing along both axes of the prepared images: the default
is **2**, while **4** gives roughly one quarter as many seeds and tracking queries.
Multi-view CLI input supports `track`, `reconstruct`, and `pose`, as in the viewer;
for selected points with per-seed camera indices, use the Python API below.

Provide synchronized camera streams in camera order:

```python
from arrow.infer import load_multiview_input
from arrow.tasks.tracking import tracking_predictions

rig = load_multiview_input({
    "stream_1": "stream_1.mp4",
    "stream_2": "stream_2.mp4",
    "stream_3": "stream_3.mp4",
})
result, _ = infer(model, rig)
tracks = tracking_predictions(result)
xyz = tracks.points.unflatten(2, (rig.num_timesteps, rig.num_views))
# [batch, seed, timestep, camera, 3]
```

`max_frames` counts timesteps. Each camera's first frame supplies seeds by
default. For selected points, pass `xy` and a `source_frame` per seed, using
`rig.transform_points()` for original-image coordinates. Frame indices are
`timestep * num_views + view`.

Predictions retain every target camera. The reshape above assumes all targets
in their original order. Benchmark reductions are separate from viewer display
modes; the loader does not estimate synchronization offsets.

## Camera poses

```python
from arrow.tasks.pose import estimate_poses

result, _ = infer(model, observations, tasks=["pose"], reference_frame=0, encoded=encoded)
poses = estimate_poses(
    result.predictions,
    result.queries.xy,
    num_frames=observations.num_frames,
    reference_frame=0,
)
# poses.camera_to_reference: [batch, frame, 4, 4]
```

`poses.valid` marks successful fits. Pose defaults live under `pose` in the
inference config.

## Direct queries

```python
import torch
from arrow import Queries

queries = Queries(torch.tensor([[100.0, 120.0]]), source_frame=0, target_frame=1, reference_frame=0)
with torch.inference_mode():
    predictions = model.decode(encoded, queries, decode_chunk_size=100_000)
```

The source contains the query pixel, the target is the predicted observation,
and the reference defines the 3D coordinate system. `xy` uses resized/padded
pixel centers and accepts `[N,2]` or `[B,N,2]`; frame indices broadcast.

For direct encoding, pass RGB tensors `[B,F,3,H,W]` in `[0,1]` on the model's
device. The encoder applies ImageNet mean `[0.485, 0.456, 0.406]` and std
`[0.229, 0.224, 0.225]` internally.

## Predictions

| Field | Shape | Meaning |
|---|---|---|
| `points` | `[B,N,3]` | 3D position in the reference camera |
| `point_confidence` | `[B,N]` | `1 + exp(raw)` |
| `uv` | `[B,N,2]` | Target coordinates; pixels are `uv * [width,height] - 0.5` |
| `visibility_logits` | `[B,N]` | Visibility before sigmoid |
| `normals` | `[B,N,3]` | Unit normals in the reference camera |
| `displacement` | `[B,N,3]` | Displacement in the reference camera |

`infer()` collects predictions on CPU.
Save inputs, queries, predictions, and metadata together:

```python
from arrow.utils.results_io import load_result, save_result

save_result(result, "predictions.npz")
restored = load_result("predictions.npz")
```

`decode_chunk_size` defaults to 100,000; lower it to reduce decoder memory.
Fewer frames reduce encoder memory; coarser grids reduce the number of
predictions. Dense tracking has no fixed track limit.

To view saved predictions, run `uv run arrow-viewer --scene predictions.npz`, or use
**Open** in a running viewer (see [Save results](VIEWER.md#save-results)).

Sky is skipped by default; turn it off with `skip_sky=False` in Python or
`--no-skip-sky` on the command line. To reuse a mask, pass `sky=segment_sky(...)`
from `arrow.sky`. Segmentation uses the [skyseg](https://huggingface.co/JianyuanWang/skyseg)
ONNX model, which runs on CPU in about 0.15 s per frame. Queries on sky pixels are
skipped and their predictions remain NaN; all-pixel tracking excludes sky seeds.

## Command line and configuration

```bash
uv run arrow infer images/ --tasks reconstruct --output cloud.npz
uv run arrow infer clip.mp4 --tasks track pose --stride 10 --output tracks.npz
uv run arrow infer clip.mp4 --tasks track --points points.json --output picked.npz
uv run arrow inspect tracks.npz
```

`points.json` holds `(x,y)` pixels in the first frame's prepared image, for example
`[[20,10],[300,200]]`. This flag is for single-view input; see
[multi-view tracking](#multi-view-tracking) for camera streams.

| Flag | Default | Controls |
|---|---|---|
| `--tasks` | `track` | [Tasks](#tasks) to run on one encoding |
| `--multi-view` | off | Treat each input as a synchronized camera video or image folder |
| `--start`, `--stride`, `--max-frames` | `0`, `1`, `24` | First frame, frame step, and number of frames |
| `--end` | | Exclusive end frame index; overrides `--max-frames` |
| `--max-side` | `504` | Resize target for the longer image side |
| `--reconstruction-stride` | `2` | Pixel spacing of the `reconstruct` grid |
| `--depth-stride` | `2` | Pixel spacing of the `depth` grid |
| `--track-stride` | `2` | Pixel spacing of the `track` grid; ignored with `--points` |
| `--all-pixels-stride` | `2` | Pixel spacing along both axes of the adaptive tracking grid |
| `--points` | | JSON file of pixels to track instead of a grid |
| `--skip-sky` | on | Skip queries on [sky](#predictions) pixels |
| `--decode-chunk-size` | `100000` | Queries per decoder pass; lower to save memory |
| `--checkpoint` | `ifradlin/arrow` | Hub ID or local model directory |
| `--device` | `auto` | `cuda`, `cuda:1`, `mps`, or `cpu` |

Pose fitting has no flags; change it with, e.g., `--overrides pose.grid_size=32`.

| Config | Controls |
|---|---|
| [configs/arrow.py](../configs/arrow.py) | model construction |
| [configs/inference.py](../configs/inference.py) | Input selection, tasks, checkpoint, device, and decoding |
| [configs/viewer.py](../configs/viewer.py) | Inherits inference.py; adds server, session, and display settings |

The CLI loads its preset, or the supplied `--config` files in order, then applies
`--overrides` and explicit flags. Python calls use their arguments directly.

`from_pretrained()` uses Hugging Face's `PyTorchModelHubMixin` to load the full ARROW weights.
Loading requires FP32 weights and defaults to `strict=True`. 
Use `device="auto"` for automatic device selection; otherwise `map_location` defaults to `"cpu"`.
An explicit `device` takes precedence over `map_location`.