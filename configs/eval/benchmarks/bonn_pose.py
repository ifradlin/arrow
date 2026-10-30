from cfgx import compose, include

from arrow.tasks.pose import POSE_DEFAULTS

config = {
    "float32_matmul_precision": "high",
    "output": "workspace/results/bonn_pose",
    "interface": include("../interfaces/arrow.py"),
    "dataset": compose("../datasets/rgbd.py", {
        "root": "data/eval/bonn",
        "subsets": ["bonn"],
        "max_frames": 110,
    }),
    "task": {
        "type": "PoseTask",
        "pose_config": POSE_DEFAULTS,
    },
}

