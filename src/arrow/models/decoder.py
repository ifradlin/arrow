# Copyright (c) Meta Platforms, Inc. and affiliates.
# Licensed under Apache-2.0; see LICENSE in the repository root.
#
# Modified and simplified from VGGT:
# https://github.com/facebookresearch/vggt/blob/main/vggt/layers/attention.py
# https://github.com/facebookresearch/vggt/blob/main/vggt/layers/block.py

import torch.nn.functional as F
from timm.layers.layer_scale import LayerScale
from timm.layers.mlp import Mlp
from torch import nn


class CrossAttention(nn.Module):
    def __init__(self, dim, num_heads):
        super().__init__()
        self.num_heads = num_heads
        self.head_dim = dim // num_heads
        self.q_layer = nn.Linear(dim, dim)
        self.kv_layer = nn.Linear(dim, 2 * dim)
        self.q_norm = nn.LayerNorm(self.head_dim)
        self.k_norm = nn.LayerNorm(self.head_dim)
        self.proj = nn.Linear(dim, dim)

    def forward(self, query, context):
        batch, count, channels = query.shape
        q = (
            self.q_layer(query)
            .reshape(batch, count, self.num_heads, self.head_dim)
            .permute(0, 2, 1, 3)
        )
        kv = (
            self.kv_layer(context)
            .reshape(batch, context.shape[1], 2, self.num_heads, self.head_dim)
            .permute(2, 0, 3, 1, 4)
        )
        k, v = kv.unbind(0)
        q, k = self.q_norm(q), self.k_norm(k)
        x = F.scaled_dot_product_attention(q, k, v)
        return self.proj(x.transpose(1, 2).reshape(batch, count, channels))


class CrossBlock(nn.Module):
    def __init__(self, dim, num_heads):
        super().__init__()
        self.norm1 = nn.LayerNorm(dim)
        self.attn = CrossAttention(dim, num_heads)
        self.ls1 = LayerScale(dim, init_values=0.01)
        self.norm2 = nn.LayerNorm(dim)
        self.mlp = Mlp(dim, 4 * dim)
        self.ls2 = LayerScale(dim, init_values=0.01)

    def forward(self, query, context):
        query = query + self.ls1(self.attn(self.norm1(query), self.norm1(context)))
        return query + self.ls2(self.mlp(self.norm2(query)))


class Decoder(nn.Module):
    def __init__(self, dim, num_layers, num_heads):
        super().__init__()
        self.dim = dim
        self.blocks = nn.ModuleList([CrossBlock(dim, num_heads) for _ in range(num_layers)])

    def forward(self, query, context):
        for block in self.blocks:
            query = block(query, context)
        return query
