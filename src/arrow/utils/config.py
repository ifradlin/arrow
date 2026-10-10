"""Load configs from the repository's configs directory."""

from pathlib import Path

import cfgx


def load_config(name, *, overrides=()) -> dict:
    return cfgx.load(
        Path(__file__).resolve().parents[3] / "configs" / f"{name}.py", overrides=overrides
    )

