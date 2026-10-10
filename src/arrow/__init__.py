from importlib import import_module
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .models import ARROW
    from .types import EncodedSequence, Poses, Predictions, Queries, Result

__all__ = ["ARROW", "EncodedSequence", "Poses", "Predictions", "Queries", "Result"]


def __getattr__(name):
    # Scene logging can import arrow.viewer without loading the tensor model.
    if name not in __all__:
        raise AttributeError(f"module {__name__!r} has no attribute {name!r}")
    module = import_module(".models" if name == "ARROW" else ".types", __name__)
    value = getattr(module, name)
    globals()[name] = value
    return value
