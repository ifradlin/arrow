"""Shared reductions; individual protocols choose their NaN and weighting rules."""

import math

import numpy as np


def mean_metrics(scenes, *, skip_nan=True):
    result = {}
    for key in scenes[0]:
        values = np.asarray([scene[key] for scene in scenes], dtype=np.float64)
        if skip_nan:
            values = values[~np.isnan(values)]
        result[key] = float(values.mean()) if values.size else float("nan")
    return result


def complete_mean(datasets, required):
    """Equal dataset weights; a missing or undefined member leaves a metric undefined."""
    keys = {key for name in required for key in datasets.get(name, {})}
    result = {}
    for key in sorted(keys):
        values = [datasets.get(name, {}).get(key) for name in required]
        result[key] = sum(values) / len(values) if all(
            value is not None and math.isfinite(value) for value in values
        ) else None
    return result
