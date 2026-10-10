config = {
    "checkpoint": "ifradlin/arrow",
    "device": "auto",
    "data": {
        "loader": {
            "type": "partial:load_inference_input",
            "start": 0,
            "stride": 1,
            "max_frames": 24,
            "max_side": 504,
        },
    },
    "pose": {
        "grid_size": 64,
        "reference_frame": "middle",
        "confidence_keep": 0.5,
        "weight_power": 2.0,
        "min_points": 8,
        "visibility_logit_threshold": 0.0,
    },
    "tasks": ["track"],
    "decode_chunk_size": 100_000,
    "track_stride": 2,
    "reconstruction_stride": 2,
    "depth_stride": 2,
    "all_pixels_stride": 2,
    "skip_sky": True,
}
