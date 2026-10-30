from cfgx import compose, include

config = {
    "float32_matmul_precision": "high",
    "output": "workspace/results/neural_rgbd_recon",
    "interface": include("../interfaces/arrow.py"),
    "dataset": compose("../datasets/rgbd.py", {
        "root": "data/eval/neural_rgbd",
        "subsets": ["neural_rgbd"],
        "frame_stride": 500,
        "min_frames": 1,
        "load_depth": True,
    }),
    "task": {
        "type": "PointcloudTask",
        "thresholds": {"neural_rgbd": .05},
        "depth_ranges": {"neural_rgbd": [.001, 10.]},
        "normal_consistency": True,
        "icp_max_iteration": 50,
    },
}

