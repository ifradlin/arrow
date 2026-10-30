"""Evaluate prepared scenes through a configured task and model interface."""

from collections import defaultdict
from itertools import zip_longest
import json
import math
from pathlib import Path

import cfgx
import torch
import torch.distributed as dist

from arrow.eval.metrics.reduction import complete_mean
from arrow.utils.registry import build


def json_safe(mapping: dict) -> dict:
    return {
        key: json_safe(value) if isinstance(value, dict)
        else [None if isinstance(item, float) and not math.isfinite(item) else item for item in value]
        if isinstance(value, list)
        else None if isinstance(value, float) and not math.isfinite(value) else value
        for key, value in mapping.items()
    }


def run(config):
    torch.set_float32_matmul_precision(config["float32_matmul_precision"])
    distributed = dist.is_initialized()
    rank = dist.get_rank() if distributed else 0
    world_size = dist.get_world_size() if distributed else 1
    dataset = build({**config["dataset"], "rank": rank, "world_size": world_size})
    task = build(config["task"])
    output = Path(config["output"])
    if rank == 0:
        output.mkdir(parents=True, exist_ok=False)
        (output / "eval_config.py").write_text(cfgx.dumps(config))
        (output / "data_manifest.json").write_bytes(Path(dataset.manifest).read_bytes())
    if distributed:
        dist.barrier()
    interface = build(config["interface"])
    records = []
    log = f"scenes.rank{rank}.jsonl" if distributed else "scenes.jsonl"
    with (output / log).open("w") as stream:
        for scene in dataset:
            print(f"{scene.subset}/{scene.name}: {scene.observations.num_frames} frames", flush=True)
            inputs, targets, details = task.prepare(scene)
            result = interface(**inputs)
            score = task.score(targets, result)
            record = {"subset": scene.subset, "scene": scene.name, "metrics": score.metrics,
                      "frame_indices": [f["index"] for f in scene.observations.frame_info],
                      **details,
                      "image_shape": list(scene.observations.images.shape),
                      "runtime": result.metadata["runtime"]}
            if score.metric_aux:
                record["metric_aux"] = score.metric_aux
            records.append(record)
            stream.write(json.dumps(json_safe(record), allow_nan=False) + "\n")
            stream.flush()
            del result, inputs, targets
    if distributed:
        gathered = [[] for _ in range(world_size)]
        dist.gather_object(records, gathered if rank == 0 else None, dst=0)
        if rank != 0:
            return None
        # Restore the original scene order from rank-strided shards.
        records = [record for group in zip_longest(*gathered) for record in group if record is not None]
        with (output / "scenes.jsonl").open("w") as stream:
            for record in records:
                stream.write(json.dumps(json_safe(record), allow_nan=False) + "\n")
    scores = defaultdict(list)
    auxiliaries = defaultdict(list)
    for record in records:
        scores[record["subset"]].append(record["metrics"])
        auxiliaries[record["subset"]].append(record.get("metric_aux", {}))
    summary = {
        "world_size": world_size,
        "datasets": {
            subset: {"num_scenes": len(scores[subset]), "available_scenes": len(entries),
                     "metrics": task.aggregate(scores[subset], metric_aux=auxiliaries[subset])}
            for subset, entries in dataset.entries.items()
        },
    }
    if dataset.groups:
        summary["groups"] = {
            name: complete_mean({subset: summary["datasets"][subset]["metrics"]
                                 for subset in members if subset in summary["datasets"]}, members)
            for name, members in dataset.groups.items()
        }
    summary = json_safe(summary)
    (output / "summary.json").write_text(json.dumps(summary, indent=2, allow_nan=False) + "\n")
    return summary
