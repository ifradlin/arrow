"""Shared constructors for cfgx/specbuild configurations."""

from specbuild import Registry, build as build_spec

from arrow.infer.dataloader import load_input, load_multiview_input
from arrow.models.arrow import ARROW
from arrow.models.decoder import Decoder
from arrow.models.encoder import Encoder
from arrow.models.query_embed import QueryEmbedding

REGISTRY = Registry()
REGISTRY.register("ARROW")(ARROW)
REGISTRY.register("DA3Encoder")(Encoder)
REGISTRY.register("QueryEmbedding")(QueryEmbedding)
REGISTRY.register("Decoder")(Decoder)
REGISTRY.register("load_inference_input")(load_input)
REGISTRY.register("load_multiview_input")(load_multiview_input)


def build(spec):
    return build_spec(spec, registry=REGISTRY)
