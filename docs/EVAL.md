# Evaluation

Run commands from the repository root. Evaluation uses RGB inputs and the
official [ARROW weights](https://huggingface.co/ifradlin/arrow); annotations are
used to prepare queries and score predictions.

## Prepare datasets

Install the preparation dependencies, then run the converter for your dataset:

```bash
uv sync --extra preprocess
uv run python -m arrow.eval.preprocess.worldtrack /path/to/raw/worldtrack
```

Replace `worldtrack` with a module below. Outputs default to `data/eval/<dataset>`;
`--output /path/to/new/directory` overrides this. `data/eval` may be a symlink to
external storage. Follow each source's dataset terms.

| Dataset / converter module | Raw source and expected layout | Selection |
| --- | --- | --- |
| WorldTrack / `worldtrack` | [Official benchmark](https://drive.google.com/drive/folders/1-JW88ru30irMYyFab_4YBQbGbd9tKpXV?usp=sharing): `{adt,ds,po,pstudio}_mini/*.npz` | 50 scenes per subset |
| TAPVid-3D / `tapvid3d` | [v1.0](https://github.com/google-deepmind/tapnet/tree/c2cbab81cc06092b5f05bfe2da7bfec54e2079c9/tapnet/tapvid3d): `{adt,drivetrack,pstudio}/minival/*.npz`; see below | 50 minival scenes per subset |
| MVTracker / `mvtracker` | [Annotation packages](https://huggingface.co/datasets/ethz-vlg/mv3dpt-datasets/tree/cccb9128fb95d302c662151e65a09377175c2a3a): `kubric-multiview/test/`, `dex-ycb-multiview/`, `panoptic-multiview/`; see below | 46 scenes, 58 scene-rigs |
| Bonn / `bonn` | [Official archives](https://www.ipb.uni-bonn.de/data/rgbd-dynamic-dataset/): `rgbd_bonn_<name>/{rgb/,depth/,groundtruth.txt}` | balloon2, crowd2, crowd3, person_tracking2, synchronous; RGB frames 30–139 |
| 7-Scenes / `seven_scenes` | [Microsoft archives](https://www.microsoft.com/en-us/research/project/rgb-d-dataset-7-scenes/): extract scene archives and nested `seq-XX.zip` files, retaining `TestSplit.txt` | 18 test sequences; 17,000 frames |
| Sintel / `sintel` | [Stereo training](https://files.is.tue.mpg.de/jwulff/sintel/MPI-Sintel-stereo-training-20150305.zip) → `stereo/training/final_left/`; [corrected depth/cameras](https://files.is.tue.mpg.de/jwulff/sintel/MPI-Sintel-depth-training-20150305.zip) → `depth/training/{depth,camdata_left}/` | 14 pose sequences |
| KITTI / `kitti` | [Download recipe](https://github.com/Junyi42/monst3r/blob/574cc77ad278bad582f470e5382624e01f8769a7/data/download_kitti.sh): uncropped raw RGB, annotated validation depth and `depth_selection/val_selection_cropped/intrinsics/` in one root | Up to 110 annotated validation frames per drive; 1,269 total |
| Neural-RGBD / `neural_rgbd` | [Authors' archive](https://kaldir.vc.in.tum.de/neural_rgbd/neural_rgbd_data.zip): `<scene>/{images/,depth/,poses.txt,focal.txt}` | All RGB/depth pairs in nine synthetic scenes |

Bonn follows the [MonST3R selection](https://github.com/Junyi42/monst3r/blob/574cc77ad278bad582f470e5382624e01f8769a7/datasets_preprocess/prepare_bonn.py),
with synchronization rebuilt from the raw recordings: each RGB frame is paired
with the nearest depth timestamp (at most 20 ms apart), and mocap poses are
interpolated at RGB timestamps before applying the optical-camera calibration.
Each prepared clip includes `associations.json` with the matched timestamps and
pose interpolation brackets.

7-Scenes uses the approximate Kinect
[registration recipe](https://github.com/tsattler/visloc_pseudo_gt_limitations/blob/22b7c48a0e55b49d0214a8dbb022426f518e2795/setup_7scenes.py)
and retains registered depth in **[0.4, 10] m**. **Difference from the paper:**
the released preprocessing excludes points with registered depth below 40 cm.
This changes the evaluation mask relative to the paper's convention, so results
may differ from the reported numbers.

### TAPVid-3D sources

Follow the [official v1.0 generation instructions](https://github.com/google-deepmind/tapnet/blob/c2cbab81cc06092b5f05bfe2da7bfec54e2079c9/tapnet/tapvid3d/README.md#how-to-download-and-generate-the-dataset)
with `--split=minival`, placing NPZs under `{adt,drivetrack,pstudio}/minival/`.
The DriveTrack converter additionally requires [Waymo camera calibration](https://waymo.com/open/download/)
for the segment IDs in the NPZ filenames, stored at
`/path/to/waymo/<training|validation|testing>/camera_calibration/<segment>.parquet`.

```bash
uv run --extra preprocess python -m arrow.eval.preprocess.tapvid3d \
  /path/to/tapvid3d_source --waymo-calibration-root /path/to/waymo
```

The converter downloads original ADT annotations when needed to restore missing
extrinsics. DriveTrack images are undistorted, cropped and warped to **504 × 238**;
scoring uses the original cameras and queries.

### MVTracker sources

Download and extract the three annotation packages:

```bash
mkdir -p /path/to/mvtracker_raw
uv run hf download ethz-vlg/mv3dpt-datasets --repo-type dataset \
  --revision cccb9128fb95d302c662151e65a09377175c2a3a \
  kubric-multiview--test.tar.gz dex-ycb-multiview.tar.gz panoptic-multiview.tar.gz \
  --local-dir /path/to/mvtracker_raw
for archive in kubric-multiview--test dex-ycb-multiview panoptic-multiview; do
  tar -xzf /path/to/mvtracker_raw/${archive}.tar.gz -C /path/to/mvtracker_raw
done
uv run --extra preprocess python -m arrow.eval.preprocess.mvtracker /path/to/mvtracker_raw
```

The converter prepares our RGB-only adaptation of
[MVTracker](https://github.com/ethz-vlg/mvtracker/tree/ceea8ad2af77ed9b44148ef8e9eeba4ea3c3f072),
with fixed query and camera selections. Sources are
[MV-Kubric](https://github.com/ethz-vlg/kubric/tree/multiview-point-tracking),
[DexYCB](https://dex-ycb.github.io/) and [PStudio](http://domedb.perception.cs.cmu.edu/).

### Prepared files

`scene.json` records source IDs, units, OpenCV camera-to-world poses and pixel
intrinsics. RGB, tracks, masks and optional depth are stored beside it; multi-view
scenes use `v00/`, `v01/`, etc. Depth uses log16 PNGs with `near`/`far` metadata.
Keep the entire prepared directory together when moving it.

`manifest.json` records the prepared scene selection and metadata.

## Run evaluation

Each file in [configs/eval/benchmarks/](../configs/eval/benchmarks/) is runnable:

| Config filename | Coverage | Metrics |
| --- | --- | --- |
| `worldtrack.py` | 4 × 50 scenes; 64 frames | APD/EPE, all and dynamic |
| `tapvid3d_camera.py` | 3 × 50 scenes; up to 300 frames | AJ, APD3D, OA |
| `tapvid3d_world.py` | Same minival and queries | APD3D, normalized L1 |
| `mvtracker.py` | 46 scenes / 58 rigs; 24 timestamps × 4 views | APD, EPE, AJ, OA |
| `mvtracker_pose.py` | Same 96 input images | AUC@3/5/15/30, ATE, RPE, valid fraction |
| `mvtracker_video_depth.py` | Same 96 input images | AbsRel/δ₁ with scale and scale+shift fits |
| `mvtracker_recon.py` | 4 timestamps × 4 views | L1, accuracy, completeness, Chamfer, precision/recall/F1 |
| `bonn_pose.py` | 5 clips × 110 frames | ATE, RPE, AUC, valid fraction |
| `sintel_pose.py` | 14 sequences; up to 50 frames | ATE, RPE, AUC, valid fraction |
| `bonn_video_depth.py` | 5 clips × 110 frames | AbsRel/δ₁, scale and scale+shift |
| `kitti_video_depth.py` | 13 clips; 1,269 frames | AbsRel/δ₁, scale and scale+shift |
| `7scenes_video_depth.py` | 18 sequences; 90 frames at stride 3 | AbsRel/δ₁, scale and scale+shift |
| `7scenes_recon.py` | 18 sequences; every 200th frame | Chamfer, normal consistency, distance/F1 metrics |
| `neural_rgbd_recon.py` | 9 scenes; every 500th available frame | Chamfer, normal consistency, distance/F1 metrics |

Defaults use all scenes, max image side 504, checkpoint `ifradlin/arrow` and decode
chunks of **100,000** queries. Lower the chunk size to reduce decoder memory.

```bash
uv run python -m arrow.eval --config configs/eval/benchmarks/worldtrack.py
uv run python -m arrow.eval --config configs/eval/benchmarks/bonn_pose.py

uv run --extra eval python -m arrow.eval --config configs/eval/benchmarks/kitti_video_depth.py
uv run --extra eval python -m arrow.eval --config configs/eval/benchmarks/7scenes_recon.py
```

## Multiple GPUs and nodes

```bash
# Two GPUs on one node.
uv run torchrun --standalone --nproc-per-node=2 -m arrow.eval \
  --config configs/eval/benchmarks/worldtrack.py -o output=workspace/results/worldtrack-2gpu

# Run on both nodes with a shared output path and unique rendezvous ID.
uv run torchrun --nnodes=2 --nproc-per-node=2 \
  --rdzv-backend=c10d --rdzv-endpoint=node0:29400 --rdzv-id=worldtrack-run-1 \
  -m arrow.eval --config configs/eval/benchmarks/worldtrack.py \
  -o output=workspace/results/worldtrack-2node
```

Nodes need matching code/config/data. Workers shard scenes and flush
`scenes.rank<N>.jsonl`; rank 0 restores scene order and aggregates scores.
Distributed operations allow one hour by default; override `distributed_timeout_seconds` 
for longer expected worker skew.

## Results 

Each run writes a new `workspace/results/<config-name>/` directory.

Scoring details are in [metrics/](../src/arrow/eval/metrics/) and input/target
selection is in [tasks/](../src/arrow/eval/tasks/).