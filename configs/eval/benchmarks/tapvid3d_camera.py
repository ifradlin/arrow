from cfgx import include

config = {
    "float32_matmul_precision": "high",
    "output": "workspace/results/tapvid3d_camera",
    "interface": include("../interfaces/arrow.py"),
    "dataset": include("../datasets/tapvid3d.py"),
    "task": {"type": "TAPVid3DCameraTask"},
}
