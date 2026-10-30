from cfgx import include

config = {
    "float32_matmul_precision": "high",
    "output": "workspace/results/worldtrack",
    "interface": include("../interfaces/arrow.py"),
    "dataset": include("../datasets/worldtrack.py"),
    "task": {
        "type": "WorldTrackTask",
        "thresholds": [.1, .3, .5, 1.],
        "dynamic_threshold": .01,
    },
}
