from cfgx import compose

config = compose("tapvid3d_camera.py", {
    "output": "workspace/results/tapvid3d_world",
    "task": {"type": "TAPVid3DWorldTask"},
})
