from copy import deepcopy
import logging
from pathlib import Path

from huggingface_hub import PyTorchModelHubMixin
import torch
from torch import nn
import torch.nn.functional as F

from .decoder import Decoder
from .encoder import Encoder
from .query_embed import QueryEmbedding
from ..types import EncodedSequence, OUTPUT_DIMS, Predictions, Queries


logger = logging.getLogger(__name__)


def _resolve_device(device):
    if device == "auto":
        if torch.cuda.is_available():
            return torch.device("cuda")
        if torch.backends.mps.is_available():
            return torch.device("mps")
        return torch.device("cpu")
    return torch.device(device)


class ARROW(nn.Module, PyTorchModelHubMixin):
    def __init__(self, encoder: Encoder, query_embed: QueryEmbedding, decoder: Decoder):
        super().__init__()
        self.encoder = encoder
        self.query_embed = query_embed
        self.context_proj = nn.Linear(2 * encoder.embed_dim, decoder.dim)
        self.decoder = decoder
        self.heads = nn.ModuleDict(
            {
                name: nn.Sequential(
                    nn.LayerNorm(decoder.dim),
                    nn.Linear(decoder.dim, decoder.dim // 2),
                    nn.GELU(),
                    nn.Linear(decoder.dim // 2, dim),
                )
                for name, dim in OUTPUT_DIMS.items()
            }
        )

    @classmethod
    def from_config(cls, config=None):
        """Build the configured components, including optional DA3 initialization."""
        from ..utils.registry import build

        if config is None:
            from arrow.utils.config import load_config

            config = load_config("arrow")
        model = build(config["model"])
        model._hub_mixin_config = deepcopy(config)
        return model

    @classmethod
    def _from_pretrained(
        cls, *, model_id, config, device=None, map_location="cpu", strict=True, **hf_kwargs
    ):
        """Load one self-contained release directory or Hugging Face repository."""
        from safetensors.torch import load_file

        path = Path(model_id)
        if not path.is_dir():
            from huggingface_hub import hf_hub_download

            path = Path(
                hf_hub_download(repo_id=model_id, filename="model.safetensors", **hf_kwargs)
            ).parent
        config = deepcopy(config)
        encoder = config["model"]["encoder"]
        if encoder["pretrained_path"] is not None:
            logger.warning(
                "Ignoring encoder initialization from %s because full ARROW pretrained "
                "weights are supplied by %s.",
                encoder["pretrained_path"],
                model_id,
            )
            encoder["pretrained_path"] = None
        weights = load_file(path / "model.safetensors")
        if any(t.dtype != torch.float32 for t in weights.values()):
            raise ValueError("Release weights must retain FP32 storage")
        with torch.device("meta" if strict else "cpu"):
            model = cls.from_config(config)
        model.load_state_dict(weights, strict=strict, assign=True)
        resolved = path.resolve()
        model.provenance = {
            "checkpoint": model_id,
            "revision": resolved.name if resolved.parent.name == "snapshots" else None,
        }
        return model.to(_resolve_device(device if device is not None else map_location)).eval()

    def encode(self, images, *, anchor_frame=None):
        if images.ndim != 5 or images.shape[2] != 3 or min(images.shape[:2]) < 1:
            raise ValueError(
                "images must have shape [B, F, 3, H, W] with nonempty batch and frames"
            )
        batch, frames, channels, height, width = images.shape
        if anchor_frame is not None:
            anchor_frame = torch.as_tensor(anchor_frame, device=images.device, dtype=torch.long)
            anchor_frame = torch.broadcast_to(anchor_frame, (batch,)).clamp(0, frames - 1)
        pad_h, pad_w = (-height) % self.encoder.patch_size, (-width) % self.encoder.patch_size
        padded = (
            F.pad(
                images.reshape(batch * frames, channels, height, width),
                (0, pad_w, 0, pad_h),
                mode="replicate",
            ).reshape(batch, frames, channels, height + pad_h, width + pad_w)
            if pad_h or pad_w
            else images
        )
        with torch.autocast(
            images.device.type,
            dtype=torch.bfloat16,
            enabled=images.device.type in ("cuda", "mps"),
            cache_enabled=False if images.device.type == "mps" else None,
        ):
            patches, id_tokens = self.encoder(padded, anchor_frame)
        return EncodedSequence(
            patches.reshape(batch, -1, 2 * self.encoder.embed_dim),
            id_tokens,
            images,
            (height, width),
            frames,
        )

    def decode_iter(
        self,
        encoded: EncodedSequence,
        queries: Queries,
        decode_chunk_size=100_000,
    ):
        """Yield query chunks; callers can cancel between chunks without re-encoding."""
        queries = queries.batched().to(encoded.device)
        if queries.xy.shape[0] != encoded.batch_size:
            raise ValueError("Query and encoded batch sizes must match")
        if decode_chunk_size is not None and decode_chunk_size <= 0:
            raise ValueError("decode_chunk_size must be positive")
        context = self.context_proj(encoded.context_tokens)
        if queries.num_queries == 0:
            yield Predictions.empty(encoded.batch_size, device=context.device, dtype=context.dtype)
            return
        size = decode_chunk_size or queries.num_queries
        for start in range(0, queries.num_queries, size):
            with torch.autocast(
                encoded.device.type,
                dtype=torch.bfloat16,
                enabled=encoded.device.type in ("cuda", "mps"),
                cache_enabled=False if encoded.device.type == "mps" else None,
            ):
                tokens = self.query_embed(
                    encoded, queries.slice(start, start + size), context.dtype
                )
                tokens = self.decoder(tokens, context)
            raw = {name: head(tokens) for name, head in self.heads.items()}
            yield Predictions(
                points=raw["points"],
                point_confidence=1 + raw["point_confidence"][..., 0].exp(),
                uv=raw["uv"],
                visibility_logits=raw["visibility_logits"][..., 0],
                normals=F.normalize(raw["normals"], dim=-1, eps=1e-6),
                displacement=raw["displacement"],
            )

    def decode(self, encoded, queries, decode_chunk_size=100_000):
        chunks = list(self.decode_iter(encoded, queries, decode_chunk_size))
        return chunks[0] if len(chunks) == 1 else Predictions.concat(chunks)

    def forward(self, images, queries, decode_chunk_size=100_000):
        return self.decode(self.encode(images), queries, decode_chunk_size)
