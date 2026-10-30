from cfgx import compose, include

config = {
    "float32_matmul_precision": "high",
    "output": "workspace/results/7scenes_recon",
    "interface": include("../interfaces/arrow.py"),
    "dataset": compose("../datasets/rgbd.py", {
        "root": "data/eval/7scenes",
        "subsets": ["7scenes"],
        "frame_stride": 200,
        "load_depth": True,
    }),
    "task": {
        "type": "PointcloudTask",
        "thresholds": {"7scenes": .05},
        "depth_ranges": {"7scenes": [.001, 10.]},
        "normal_consistency": True,
        "icp_max_iteration": 50,
    },
}

