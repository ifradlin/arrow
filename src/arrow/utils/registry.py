"""Shared constructors for cfgx/specbuild configurations."""

from specbuild import Registry, build as build_spec

from arrow.eval.dataset import EvalDataset
from arrow.eval.interface import ARROWInterface
from arrow.eval.tasks.worldtrack import WorldTrackTask
from arrow.eval.tasks.mvtracker import MVTrackerTask
from arrow.eval.tasks.pose import PoseTask
from arrow.eval.tasks.video_depth import VideoDepthTask
from arrow.eval.tasks.pointcloud import PointcloudTask
from arrow.eval.tasks.tapvid3d import TAPVid3DCameraTask, TAPVid3DWorldTask
from arrow.infer.dataloader import load_input, load_multiview_input
from arrow.models.arrow import ARROW
from arrow.models.decoder import Decoder
from arrow.models.encoder import Encoder
from arrow.models.query_embed import QueryEmbedding

REGISTRY = Registry()

# Model components
REGISTRY.register("ARROW")(ARROW)
REGISTRY.register("DA3Encoder")(Encoder)
REGISTRY.register("QueryEmbedding")(QueryEmbedding)
REGISTRY.register("Decoder")(Decoder)

# Input loaders
REGISTRY.register("load_inference_input")(load_input)
REGISTRY.register("load_multiview_input")(load_multiview_input)

# Evaluation
REGISTRY.register("EvalDataset")(EvalDataset)
REGISTRY.register("WorldTrackTask")(WorldTrackTask)
REGISTRY.register("MVTrackerTask")(MVTrackerTask)
REGISTRY.register("PoseTask")(PoseTask)
REGISTRY.register("VideoDepthTask")(VideoDepthTask)
REGISTRY.register("PointcloudTask")(PointcloudTask)
REGISTRY.register("TAPVid3DCameraTask")(TAPVid3DCameraTask)
REGISTRY.register("TAPVid3DWorldTask")(TAPVid3DWorldTask)
REGISTRY.register("ARROWInterface")(ARROWInterface)


def build(spec):
    return build_spec(spec, registry=REGISTRY)
