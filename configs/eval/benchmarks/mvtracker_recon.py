from cfgx import compose, include

config = {
    "float32_matmul_precision": "high",
    "output": "workspace/results/mvtracker_recon",
    "interface": include("../interfaces/arrow.py"),
    "dataset": compose("../datasets/mvtracker.py", {
        "load_tracks": False,
        "load_depth": True,
        "frame_indices": [0, 8, 16, 23],
    }),
    "task": {
        "type": "PointcloudTask",
        "thresholds": {
            "kubric": .1,
            "dexycb": .01,
            "panoptic_1_4_7_11": .05,
            "panoptic_1_7_14_20": .05,
            "panoptic_27_16_14_8": .05,
        },
        "depth_ranges": {"dexycb": [.001, 2.]},
        "distance_scales": {"kubric": .13},
        "icp_max_iteration": 50,
    },
}
