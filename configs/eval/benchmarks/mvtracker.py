from cfgx import include

config = {
    "float32_matmul_precision": "high",
    "output": "workspace/results/mvtracker",
    "interface": include("../interfaces/arrow.py"),
    "dataset": include("../datasets/mvtracker.py"),
    "task": {
        "type": "MVTrackerTask",
        "thresholds": {
            "kubric": [.1, .2, .5, 1., 2.],
            "dexycb": [.01, .02, .05, .1, .2],
            "panoptic_1_4_7_11": [.05, .1, .2, .4, .8],
            "panoptic_1_7_14_20": [.05, .1, .2, .4, .8],
            "panoptic_27_16_14_8": [.05, .1, .2, .4, .8],
        },
    },
}
