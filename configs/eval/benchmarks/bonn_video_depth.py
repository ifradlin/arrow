from cfgx import compose, include

config = {
    "float32_matmul_precision": "high",
    "output": "workspace/results/bonn_video_depth",
    "interface": include("../interfaces/arrow.py"),
    "dataset": compose("../datasets/rgbd.py", {
        "root": "data/eval/bonn",
        "subsets": ["bonn"],
        "max_frames": 110,
        "load_depth": True,
    }),
    "task": {"type": "VideoDepthTask", "depth_range": [0., 70.]},
}

