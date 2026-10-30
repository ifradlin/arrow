from cfgx import compose, include

config = {
    "float32_matmul_precision": "high",
    "output": "workspace/results/kitti_video_depth",
    "interface": include("../interfaces/arrow.py"),
    "dataset": compose("../datasets/rgbd.py", {
        "root": "data/eval/kitti",
        "subsets": ["kitti"],
        "max_frames": 110,
        "load_depth": True,
    }),
    "task": {"type": "VideoDepthTask"},
}

