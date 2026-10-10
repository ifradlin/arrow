config = (
    "inference.py",
    {
        "tasks": ["track", "pose"],
        "server": {"host": "127.0.0.1", "port": 7860},
        "data": {
            "root": None,
            "example": "railway.mp4",
        },
        "session": {
            # Parent folder for a separate session per launch. None uses a temporary folder deleted
            # on exit; a configured path preserves sessions. Browser downloads are independent.
            "directory": None,
            # Inactive tabs stay in memory up to this size; past that the least recently used move to
            # the session folder and are read back when opened again.
            "tab_memory_gb": 4.0,
            # Parsed inactive scenes in each browser; avoids transferring them again on tab switches.
            "browser_memory_gb": 1.0,
        },
        "display": {
            "point_size": 5,
            "occluded": "show",
            "trail_length": 20,
            "trail_width": 1.5,
            "trail_density": 0.2,
        },
    },
)
