"""Display defaults derived from raw model confidence, without changing predictions."""

import numpy as np


def suggest_confidence_keep(confidence, valid=None, *, mode="precision"):
    """Suggest a keep fraction from valid confidence scores in O(N) time.

    Use a three-sigma lower-tail cut in log confidence (logit for sigmoid),
    with MAD as the robust scale estimate.
    If MAD keeps everything, Otsu is used only for two substantial, well-separated modes.
    Empty or constant confidence keeps everything; inputs are never modified.
    """
    if mode == "none":
        return 1.0
    if mode not in ("precision", "sigmoid"):
        raise ValueError(f"Unknown confidence mode: {mode}")
    confidence = np.asarray(confidence, dtype=np.float64)
    usable = np.isfinite(confidence)
    if valid is not None:
        usable &= valid
    if mode == "sigmoid":
        usable &= (confidence >= 0) & (confidence <= 1)
        values = np.clip(confidence[usable], np.finfo(float).eps, 1 - np.finfo(float).eps)
        values = np.log(values) - np.log1p(-values)
    else:
        values = np.log(confidence[usable & (confidence > 0)])
    if not values.size:
        return 1.0
    median = np.median(values)
    mad = np.median(np.abs(values - median), overwrite_input=True)
    cut = median - 3 * 1.4826 * mad
    keep = np.count_nonzero(values >= cut) / values.size
    if keep == 1 and np.ptp(values) > 0:
        counts, edges = np.histogram(values, bins=128)
        centers = (edges[:-1] + edges[1:]) / 2
        weight = np.cumsum(counts) / values.size
        moment = np.cumsum(counts * centers) / values.size
        between = np.zeros_like(weight)
        np.divide(
            (moment[-1] * weight - moment) ** 2,
            weight * (1 - weight),
            out=between,
            where=(weight > 0) & (weight < 1),
        )
        split = int(np.argmax(between))
        variance = np.sum(counts * (centers - moment[-1]) ** 2) / values.size
        if 0.1 <= weight[split] <= 0.9 and between[split] >= 0.9 * variance:
            keep = np.count_nonzero(values >= edges[split + 1]) / values.size
    return float(keep)
