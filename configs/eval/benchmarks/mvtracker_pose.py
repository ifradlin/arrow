from cfgx import compose, include

from arrow.tasks.pose import POSE_DEFAULTS

config = {
    "float32_matmul_precision": "high",
    "output": "workspace/results/mvtracker_pose",
    "interface": include("../interfaces/arrow.py"),
    "dataset": compose("../datasets/mvtracker.py", {"load_tracks": False}),
    "task": {
        "type": "PoseTask",
        "pose_config": POSE_DEFAULTS,
    },
}
