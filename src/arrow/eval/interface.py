"""ARROW's evaluation interface; model inputs never include scoring targets."""

from arrow import ARROW
from arrow.infer import infer


class ARROWInterface:
    def __init__(self, checkpoint, device="cuda", decode_chunk_size=100_000):
        self.model = ARROW.from_pretrained(checkpoint, device=device)
        self.decode_chunk_size = decode_chunk_size

    def __call__(self, observations, **inputs):
        result, _ = infer(self.model, observations, decode_chunk_size=self.decode_chunk_size, **inputs)
        return result
