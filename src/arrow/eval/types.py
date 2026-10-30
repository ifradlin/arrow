"""Per-scene scores and the statistics needed for dataset aggregation."""

from dataclasses import dataclass, field


@dataclass
class SceneResult:
    metrics: dict[str, float]
    metric_aux: dict = field(default_factory=dict)
