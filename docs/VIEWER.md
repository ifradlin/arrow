# Viewer

The viewer is a browser interface for viewing ARROW predictions and geometry
logged from Python. Open saved results, or select images and videos to run
inference directly in the viewer. Each scene has its own tab, with controls for
layers, coloring, and filters.

```bash
uv sync --extra viewer
uv run arrow-viewer
```

Open **http://127.0.0.1:7860**. The viewer starts with an empty scene, just like a
new tab. To start browsing files in another folder:

```bash
uv run arrow-viewer --root /path/to/media
```

Defaults are in [configs/viewer.py](../configs/viewer.py), which inherits the
[inference defaults](INFERENCE.md#command-line-and-configuration); change them with `--overrides`:

```bash
# Keep each run in its own session subfolder after exit
uv run arrow-viewer --overrides session.directory=results/sessions
```

Inactive tabs cache up to 4 GiB on the server and an estimated 1 GiB per browser.
Set `session.tab_memory_gb` and `session.browser_memory_gb` in `configs/viewer.py`.
The active scene is additional; evicted tabs reload when selected.

## Choose inputs

**Images & video** uses one video, image folder, or image selection.
**Multi-view streams** uses one input per camera. Both use the same picker:

- **From device → Upload… → Files / Folder** opens a native dialog. A video or
  image sequence uploads immediately. Multiple detected inputs are shown for
  selection before upload; camera subfolders stay separate.
- **From server** browses files already on the server, without copying them.
  Paste a path, choose a folder, or select individual images/videos.
  In the default examples folder, `railway.mp4` is preselected; click
  **Add selected** to load it.

Image uploads use the first 1,000 images per input in natural filename order;
Each input card shows its type, frame count, and origin, with **Replace** and **Remove**.

Frame-count presets select exactly 2, 4, 8, 16, or 24 frames across the full clip.
Drag the handles or edit start/stop to trim the range; enter a step for fixed-step
sampling. For tracking, choose a start frame and grid spacing, drag a query region,
or click points. Grid and clicked selections are combined, with overlapping query
coordinates counted once. Choose **Grid off** to track only clicked points.
Multi-view input lets you choose seed cameras and edit their queries separately.
All cameras provide context to the model.

## Run tasks

Choose **3D tracking**, **3D reconstruction**, **Camera poses**, **Video depth**,
or **All-pixel tracking**. Multi-view input offers the first three.
See the [task descriptions](INFERENCE.md#tasks).

Each task produces a layer. Runs on the same inputs add layers; changing the
inputs starts a new result. Layers can be hidden, removed, or merged with others
of the same kind. Camera poses use the 3D layers' reference camera for display
(frame 0 by default); raw predictions keep their original coordinates.

**Skip sky** is enabled by default. **Queries per pass** controls decoder memory;
fewer frames or coarser sampling reduce total memory. **Cancel** stops between
model operations.

## View results

In the **Display** tab, you can:

- Color points by RGB, confidence, visibility, or predicted/estimated normals.
- Color trails by seed position, RGB, time, or log confidence.
  For seed coloring, draw boxes with separate gradients.
- Show, dim, or hide point predictions based on the predicted visibility.
- Separate static and moving tracks by their maximum distance from their mean,
  relative to scene size. Static tracks can be collapsed to their median position.
- Adjust point size, trail length/density/width/fading, and camera frusta/image planes.

The **Confidence** slider keeps the most confident points and tracks, ranking
tracks by their mean confidence over the full trajectory. **Recommended** provides
a heuristic starting point for filtering, without a guarantee of artifact removal.

For multi-view tracks, **Points → 3D trajectories** offers **Camera median**
(the median of visible camera predictions at each timestep, falling back to
finite predictions) and **Source camera** (each seed's camera). Switching is
immediate. **Preview camera** selects the input image shown alongside the scene.

Display settings preserve raw predictions. All 3D layers share the first input
frame's camera coordinates and relative scale.

## Save results

**Save predictions** downloads inputs, queries, and raw outputs as `.npz`.
**Save view** downloads geometry, display settings, and camera projection as
`.json`. Use **Open** to restore either file in a new tab:

- **From device** uploads a saved file from your computer.
- **From server** opens a saved file already on the server. Browse folders or
  paste a `.npz` or `.json` path, then open the file.

To start the viewer with a saved file, including predictions from `arrow infer`:

```bash
uv run arrow-viewer --scene results/railway.npz
```

## Log from Python

Use `Scene` to log points, tracks, images, and cameras from your code, then save
the scene or serve it in the viewer:

```python
from arrow.viewer import Scene

scene = Scene(scale="meters")
scene.log_points("cloud", [[0, 0, 2], [1, 0, 2]], colors=[[255, 100, 40]] * 2)
scene.log_tracks("track", [[[0, 0, 2]], [[1, 0, 2]]], times=[0, 1])
scene.save("scene.json")
scene.serve()
```

Use `log_image()` and `log_camera()` to add images and cameras. Geometry must
share one coordinate system; cameras use camera-to-scene poses and pixel intrinsics.

## Coming next

- **Progressive loading** displaying query chunks as ARROW decodes them, making
  initial results visible while inference continues.
- **Live logging** letting separate Python processes send geometry to a running
  viewer server, updating scenes as new data arrives.
- **temporal-window inference** running inference over temporal windows of a video and combining
  their predictions into a single result.
