# Copyright (c) Meta Platforms, Inc. and affiliates.
# Copyright (c) 2025 ByteDance Ltd. and/or its affiliates.
# Licensed under Apache-2.0; see LICENSE in the repository root.

"""DA3-Giant encoder adapted from the official Depth Anything 3 repository.

Modified for ARROW: final-layer features and observation ID tokens.
Frame reordering preserves DA3's default reference selection.
Source and license details are in LICENSE.
"""

import math
from pathlib import Path

import torch
from einops import rearrange
from timm.layers.patch_embed import PatchEmbed
from torch import nn

from .layers.block import Block
from .layers.rope import PositionGetter, RotaryPositionEmbedding2D
from .layers.swiglu_ffn import SwiGLUFFNFused


class Encoder(nn.Module):
    """Encode RGB images [B, F, 3, H, W] in [0, 1] with DA3's Giant backbone.

    Returns patch features [B, F, H/14 * W/14, 3072] and ID tokens
    [B, F, 3072], concatenating the final local and global attention outputs.
    """

    def __init__(self, pretrained_path=None):
        super().__init__()
        self.embed_dim = 1536
        self.patch_size = 14
        self.patch_start_idx = 1
        self.interpolate_antialias = False
        self.interpolate_offset = 0.1
        self.patch_embed = PatchEmbed(
            img_size=518,
            patch_size=14,
            in_chans=3,
            embed_dim=1536,
            strict_img_size=False,
            dynamic_img_pad=False,
        )
        self.cls_token = nn.Parameter(torch.zeros(1, 1, 1536))
        self.camera_token = nn.Parameter(torch.randn(1, 2, 1536))
        self.pos_embed = nn.Parameter(torch.zeros(1, 1370, 1536))
        self.rope = RotaryPositionEmbedding2D(frequency=100)
        self.position_getter = PositionGetter()
        self.blocks = nn.ModuleList(
            [
                Block(
                    dim=1536,
                    num_heads=24,
                    mlp_ratio=4,
                    qkv_bias=True,
                    init_values=1.0,
                    ffn_layer=SwiGLUFFNFused,
                    qk_norm=i >= 13,
                    rope=self.rope if i >= 13 else None,
                )
                for i in range(40)
            ]
        )
        self.norm = nn.LayerNorm(1536)
        # ImageNet RGB mean and standard deviation.
        self.register_buffer("image_mean", torch.tensor([0.485, 0.456, 0.406]).view(1, 1, 3, 1, 1))
        self.register_buffer("image_std", torch.tensor([0.229, 0.224, 0.225]).view(1, 1, 3, 1, 1))

        if pretrained_path is not None:
            self.load_pretrained(pretrained_path)

    def load_pretrained(self, checkpoint):
        """Initialize from the backbone tensors of an official DA3 checkpoint."""
        from safetensors import safe_open

        path = Path(checkpoint)
        if path.is_dir():
            path = path / "model.safetensors"
        elif not path.is_file():
            from huggingface_hub import hf_hub_download

            path = Path(hf_hub_download(str(checkpoint), "model.safetensors"))
        prefix = "model.backbone.pretrained."
        with safe_open(path, framework="pt") as weights:
            state = {
                name.removeprefix(prefix): weights.get_tensor(name)
                for name in weights.keys()
                if name.startswith(prefix)
            }
        state.update(image_mean=self.image_mean, image_std=self.image_std)
        self.load_state_dict(state, strict=True)

    def forward(self, images, anchor_frame=None):
        x = (images - self.image_mean) / self.image_std
        batch, frames, _, height, width = x.shape
        x = self.prepare_tokens(x)
        pos, pos_nodiff = self._prepare_rope(batch, frames, height, width, x.device)
        local_x = x
        reference = None
        for i, block in enumerate(self.blocks):
            if i == 12 and (anchor_frame is not None or frames >= 3):
                reference = _select_reference_view(x) if anchor_frame is None else anchor_frame
                x = _reorder_by_reference(x, reference)
                local_x = _reorder_by_reference(local_x, reference)
            if i == 13:
                x[:, :, 0] = torch.cat(
                    [
                        self.camera_token[:, :1].expand(batch, -1, -1),
                        self.camera_token[:, 1:].expand(batch, frames - 1, -1),
                    ],
                    dim=1,
                )
            global_attention = i >= 13 and i % 2 == 1
            positions = (pos_nodiff if global_attention else pos) if i >= 13 else None
            pattern = "b s n c -> b (s n) c" if global_attention else "b s n c -> (b s) n c"
            tokens = rearrange(x, pattern)
            if positions is not None:
                positions = rearrange(positions, pattern)
            tokens = block(tokens, pos=positions)
            restore = "b (s n) c -> b s n c" if global_attention else "(b s) n c -> b s n c"
            x = rearrange(tokens, restore, b=batch, s=frames)
            if not global_attention:
                local_x = x
        x = torch.cat([local_x, x], dim=-1)
        if reference is not None:
            x = _restore_original_order(x, reference)
        id_tokens = x[:, :, 0]
        x = torch.cat([x[..., :1536], self.norm(x[..., 1536:])], dim=-1)
        return x[:, :, 1:], id_tokens

    def interpolate_pos_encoding(self, x, w, h):
        previous_dtype = x.dtype
        npatch = x.shape[1] - 1
        N = self.pos_embed.shape[1] - 1
        if npatch == N and w == h:
            return self.pos_embed
        pos_embed = self.pos_embed.float()
        class_pos_embed = pos_embed[:, 0]
        patch_pos_embed = pos_embed[:, 1:]
        dim = x.shape[-1]
        w0 = w // self.patch_size
        h0 = h // self.patch_size
        M = int(math.sqrt(N))  # Recover the number of patches in each dimension
        assert N == M * M
        kwargs = {}
        if self.interpolate_offset:
            # The offset avoids rounding down the interpolated grid size.
            sx = float(w0 + self.interpolate_offset) / M
            sy = float(h0 + self.interpolate_offset) / M
            kwargs["scale_factor"] = (sx, sy)
        else:
            # Simply specify an output size instead of a scale factor
            kwargs["size"] = (w0, h0)
        patch_pos_embed = nn.functional.interpolate(
            patch_pos_embed.reshape(1, M, M, dim).permute(0, 3, 1, 2),
            mode="bicubic",
            antialias=self.interpolate_antialias,
            **kwargs,
        )
        assert (w0, h0) == patch_pos_embed.shape[-2:]
        patch_pos_embed = patch_pos_embed.permute(0, 2, 3, 1).view(1, -1, dim)
        return torch.cat((class_pos_embed.unsqueeze(0), patch_pos_embed), dim=1).to(previous_dtype)

    def prepare_cls_token(self, B, S):
        cls_token = self.cls_token.expand(B, S, -1)
        cls_token = cls_token.reshape(B * S, -1, self.embed_dim)
        return cls_token

    def prepare_tokens(self, x):
        B, S, _, w, h = x.shape
        x = rearrange(x, "b s c h w -> (b s) c h w")
        x = self.patch_embed(x)
        cls_token = self.prepare_cls_token(B, S)
        x = torch.cat((cls_token, x), dim=1)
        x = x + self.interpolate_pos_encoding(x, w, h)
        x = rearrange(x, "(b s) n c -> b s n c", b=B, s=S)
        return x

    def _prepare_rope(self, B, S, H, W, device):
        pos = None
        pos_nodiff = None
        if self.rope is not None:
            pos = self.position_getter(
                B * S, H // self.patch_size, W // self.patch_size, device=device
            )
            pos = rearrange(pos, "(b s) n c -> b s n c", b=B)
            pos_nodiff = torch.zeros_like(pos).to(pos.dtype)
            if self.patch_start_idx > 0:
                pos = pos + 1
                pos_special = torch.zeros(B * S, self.patch_start_idx, 2).to(device).to(pos.dtype)
                pos_special = rearrange(pos_special, "(b s) n c -> b s n c", b=B)
                pos = torch.cat([pos_special, pos], dim=2)
                pos_nodiff = pos_nodiff + 1
                pos_nodiff = torch.cat([pos_special, pos_nodiff], dim=2)
        return pos, pos_nodiff


def _select_reference_view(x: torch.Tensor) -> torch.Tensor:
    _, frames, _, _ = x.shape
    img_class_feat = x[:, :, 0] / x[:, :, 0].norm(dim=-1, keepdim=True)
    sim = torch.matmul(img_class_feat, img_class_feat.transpose(1, 2))
    sim_no_diag = sim - torch.eye(frames, device=sim.device).unsqueeze(0)
    sim_score = sim_no_diag.sum(dim=-1) / (frames - 1)
    feat_norm = x[:, :, 0].norm(dim=-1)
    feat_var = img_class_feat.var(dim=-1)

    def normalize_metric(metric):
        min_val = metric.min(dim=1, keepdim=True).values
        max_val = metric.max(dim=1, keepdim=True).values
        return (metric - min_val) / (max_val - min_val + 1e-8)

    balance_score = (
        (normalize_metric(sim_score) - 0.5).abs()
        + (normalize_metric(feat_norm) - 0.5).abs()
        + (normalize_metric(feat_var) - 0.5).abs()
    )
    return balance_score.argmin(dim=1)


def _reorder_by_reference(
    x: torch.Tensor,
    b_idx: torch.Tensor,
) -> torch.Tensor:
    """
    Reorder views to place the selected reference view first.

    Args:
        x: Input tensor of shape (B, S, N, C)
        b_idx: Reference view indices of shape (B,)

    Returns:
        Reordered tensor with reference view at position 0

    Example:
        If b_idx = [2] and S = 5 (views [0,1,2,3,4]),
        result order is [2,0,1,3,4] (ref_idx first, then others in order)
    """
    B, S = x.shape[0], x.shape[1]

    # For single view, no reordering needed
    if S <= 1:
        return x

    # Create position indices: (B, S) where each row is [0, 1, 2, ..., S-1]
    positions = torch.arange(S, device=x.device).unsqueeze(0).expand(B, -1)  # B S

    # For each position, determine which original index it should take
    # Position 0 gets ref_idx
    # Position 1 to ref_idx gets indices 0 to ref_idx-1
    # Position ref_idx+1 to S-1 gets indices ref_idx+1 to S-1

    b_idx_expanded = b_idx.unsqueeze(1)  # B 1

    # Create the reordering indices
    # For positions 1 to ref_idx: map to indices 0 to ref_idx-1 (shift by -1)
    # For positions > ref_idx: keep the same
    reorder_indices = positions.clone()
    reorder_indices = torch.where(
        (positions > 0) & (positions <= b_idx_expanded), positions - 1, positions
    )
    # Set position 0 to ref_idx
    reorder_indices[:, 0] = b_idx

    # Gather using advanced indexing
    batch_indices = torch.arange(B, device=x.device).unsqueeze(1)  # B 1
    x_reordered = x[batch_indices, reorder_indices]

    return x_reordered


def _restore_original_order(
    x: torch.Tensor,
    b_idx: torch.Tensor,
) -> torch.Tensor:
    """
    Restore original view order after processing.

    Args:
        x: Reordered tensor of shape (B, S, ...)
        b_idx: Original reference view indices of shape (B,)

    Returns:
        Tensor with original view order restored

    Example:
        If original order was [0, 1, 2, 3, 4] and b_idx=2,
        reordered becomes [2, 0, 1, 3, 4] (reference at position 0),
        restore should return [0, 1, 2, 3, 4] (original order).
    """
    B, S = x.shape[0], x.shape[1]

    # For single view, no restoration needed
    if S <= 1:
        return x

    # Create target position indices: (B, S) where each row is [0, 1, 2, ..., S-1]
    target_positions = torch.arange(S, device=x.device).unsqueeze(0).expand(B, -1)  # B S

    # For each target position, determine which current position it comes from
    # Target position 0 to ref_idx-1 <- Current position 1 to ref_idx (shift by +1)
    # Target position ref_idx <- Current position 0
    # Target position ref_idx+1 to S-1 <- Current position ref_idx+1 to S-1 (no change)

    b_idx_expanded = b_idx.unsqueeze(1)  # B 1

    # Create the restore indices
    restore_indices = torch.where(
        target_positions < b_idx_expanded,
        target_positions + 1,  # Positions before ref_idx come from current position + 1
        target_positions,  # Positions after ref_idx stay the same
    )
    # Target position = ref_idx comes from current position 0
    # Use scatter to set specific positions
    restore_indices = torch.scatter(
        restore_indices, dim=1, index=b_idx_expanded, src=torch.zeros_like(b_idx_expanded)
    )

    # Gather using advanced indexing
    batch_indices = torch.arange(B, device=x.device).unsqueeze(1)  # B 1
    x_restored = x[batch_indices, restore_indices]

    return x_restored
