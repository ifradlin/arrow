from cfgx import final

config = {
    "model": {
        "type": "ARROW",
        "encoder": {
            "type": "DA3Encoder",
            "pretrained_path": "depth-anything/DA3-GIANT-1.1",
        },
        "query_embed": {
            "type": "QueryEmbedding",
            "decoder_dim": final.model.decoder.dim,
            "rgb_patch_size": 9,
        },
        "decoder": {
            "type": "Decoder",
            "dim": 1280,
            "num_layers": 8,
            "num_heads": 16,
        },
    },
}
