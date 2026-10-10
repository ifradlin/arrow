from dataclasses import dataclass, fields

import torch

OUTPUT_DIMS = {
    "points": 3,
    "point_confidence": 1,
    "uv": 2,
    "visibility_logits": 1,
    "normals": 3,
    "displacement": 3,
}


@dataclass(frozen=True)
class TensorRecord:
    def to(self, device):
        return type(self)(
            **{
                f.name: value.to(device)
                if isinstance(value := getattr(self, f.name), torch.Tensor)
                else value
                for f in fields(self)
            }
        )

    def cpu(self):
        return self.to("cpu")


@dataclass(frozen=True, init=False)
class Queries(TensorRecord):
    """Pixel centers in (x, y) order, shaped [B, N, 2] or [N, 2].

    Frame roles are zero-based indices along the frame axis. Scalars
    broadcast over queries. Fractional coordinates are retained.
    """

    xy: torch.Tensor
    source_frame: torch.Tensor
    target_frame: torch.Tensor
    reference_frame: torch.Tensor

    def __init__(
        self,
        xy: torch.Tensor,
        source_frame: torch.Tensor | list[int] | int,
        target_frame: torch.Tensor | list[int] | int,
        reference_frame: torch.Tensor | list[int] | int,
    ):
        object.__setattr__(self, "xy", xy)
        if self.xy.ndim not in (2, 3) or self.xy.shape[-1] != 2:
            raise ValueError("xy must have shape [N, 2] or [B, N, 2]")
        for name, value in [
            ("source_frame", source_frame),
            ("target_frame", target_frame),
            ("reference_frame", reference_frame),
        ]:
            value = torch.as_tensor(value, device=self.xy.device)
            if value.is_floating_point() or value.dtype == torch.bool:
                raise ValueError(f"{name} must contain integer frame indices")
            object.__setattr__(self, name, torch.broadcast_to(value.long(), self.xy.shape[:-1]))

    def batched(self):
        if self.xy.ndim == 3:
            return self
        return Queries(**{f.name: getattr(self, f.name).unsqueeze(0) for f in fields(self)})

    def slice(self, start, end):
        queries = self.batched()
        return Queries(**{f.name: getattr(queries, f.name)[:, start:end] for f in fields(self)})

    @property
    def num_queries(self):
        return self.xy.shape[-2]


@dataclass(frozen=True)
class EncodedSequence(TensorRecord):
    """Encoded observations in input order; id_tokens carry observation identity."""

    context_tokens: torch.Tensor
    id_tokens: torch.Tensor
    images: torch.Tensor
    image_size: tuple[int, int]
    num_frames: int

    @property
    def device(self):
        return self.context_tokens.device

    @property
    def batch_size(self):
        return self.context_tokens.shape[0]


@dataclass(frozen=True)
class Poses(TensorRecord):
    """Per-frame cameras: camera-to-reference [B,F,4,4], fit validity [B,F], and
    pixel-center intrinsics [B,F,3,3]. Invalid poses hold identity; failed
    intrinsics fits hold NaN independently of pose validity."""

    camera_to_reference: torch.Tensor
    valid: torch.Tensor
    intrinsics: torch.Tensor


@dataclass(frozen=True)
class Predictions(TensorRecord):
    points: torch.Tensor
    point_confidence: torch.Tensor
    uv: torch.Tensor
    visibility_logits: torch.Tensor
    normals: torch.Tensor
    displacement: torch.Tensor

    @classmethod
    def empty(cls, batch_size, *, device="cpu", dtype=torch.float32):
        return cls(**{
            name: torch.empty(
                (batch_size, 0) if dim == 1 else (batch_size, 0, dim), device=device, dtype=dtype
            )
            for name, dim in OUTPUT_DIMS.items()
        })

    @classmethod
    def concat(cls, chunks):
        return cls(
            **{f.name: torch.cat([getattr(c, f.name) for c in chunks], dim=1) for f in fields(cls)}
        )


@dataclass(frozen=True)
class Result:
    images: torch.Tensor
    queries: Queries
    predictions: Predictions
    metadata: dict
