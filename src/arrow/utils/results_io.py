"""Portable numerical result serialization."""

from dataclasses import fields
import json
from pathlib import Path

import numpy as np
import torch

from arrow.types import Predictions, Queries, Result


def save_result(result: Result, path: str | Path):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    arrays = {
        "images": result.images.detach().cpu().numpy(),
        "metadata": np.array(json.dumps(result.metadata)),
    }
    for prefix, record in [("queries", result.queries), ("predictions", result.predictions)]:
        arrays.update(
            {
                f"{prefix}.{f.name}": getattr(record, f.name).detach().cpu().numpy()
                for f in fields(record)
            }
        )
    with path.open("wb") as stream:
        np.savez_compressed(stream, allow_pickle=False, **arrays)


def load_result(path: str | Path) -> Result:
    with np.load(path, allow_pickle=False) as arrays:
        metadata = json.loads(str(arrays["metadata"]))
        if metadata.get("format_version") != 1:
            raise ValueError("Unsupported arrow result format")
        queries = Queries(
            **{f.name: torch.from_numpy(arrays[f"queries.{f.name}"]) for f in fields(Queries)}
        )
        predictions = Predictions(
            **{
                f.name: torch.from_numpy(arrays[f"predictions.{f.name}"])
                for f in fields(Predictions)
            }
        )
        return Result(torch.from_numpy(arrays["images"]), queries, predictions, metadata)
