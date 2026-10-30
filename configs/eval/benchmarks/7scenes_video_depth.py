from cfgx import compose, include

config = {
    "float32_matmul_precision": "high",
    "output": "workspace/results/7scenes_video_depth",
    "interface": include("../interfaces/arrow.py"),
    "dataset": compose("../datasets/rgbd.py", {
        "root": "data/eval/7scenes",
        "subsets": ["7scenes"],
        "max_frames": 90,
        "frame_stride": 3,
        "load_depth": True,
    }),
    "task": {"type": "VideoDepthTask", "depth_range": [.001, 10.]},
}

