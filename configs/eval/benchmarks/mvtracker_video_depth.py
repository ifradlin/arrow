from cfgx import compose, include

config = {
    "float32_matmul_precision": "high",
    "output": "workspace/results/mvtracker_video_depth",
    "interface": include("../interfaces/arrow.py"),
    "dataset": compose("../datasets/mvtracker.py", {"load_tracks": False, "load_depth": True}),
    "task": {
        "type": "VideoDepthTask",
        "eps": 1e-6,
        "affine_lr": 1e-4,
        "affine_max_iters": 1000,
        "affine_tolerance": 1e-6,
    },
}
