import torch
from torch import nn
import torch.nn.functional as F


class QueryEmbedding(nn.Module):
    def __init__(self, decoder_dim, rgb_patch_size):
        super().__init__()
        self.decoder_dim = decoder_dim
        self.rgb_patch_size = rgb_patch_size
        self.rgb_patch_embed = nn.Sequential(
            nn.Linear(3 * rgb_patch_size**2, decoder_dim),
            nn.GELU(),
            nn.Linear(decoder_dim, decoder_dim),
        )
        self.uv_fourier_proj = nn.Sequential(
            nn.Linear(decoder_dim, decoder_dim), nn.GELU(), nn.Linear(decoder_dim, decoder_dim)
        )
        self.camera_token_norm = nn.LayerNorm(3072)
        self.camera_relation_embed = nn.Sequential(
            nn.Linear(9216, decoder_dim), nn.GELU(), nn.Linear(decoder_dim, decoder_dim)
        )

    def forward(self, encoded, queries, dtype):
        source = queries.source_frame.clamp(0, encoded.num_frames - 1)
        target = queries.target_frame.clamp(0, encoded.num_frames - 1)
        reference = queries.reference_frame.clamp(0, encoded.num_frames - 1)
        tokens = torch.zeros(
            (*queries.xy.shape[:2], self.decoder_dim), device=encoded.device, dtype=dtype
        )
        tokens = tokens + self.rgb_patch_embed(
            self._sample_rgb_patches(encoded.images, source, queries.xy.flip(-1))
        )
        height, width = encoded.image_size
        xy = queries.xy.float()
        uv = (xy + 0.5) / xy.new_tensor([width, height]) * 2.0 - 1.0
        tokens = tokens + self.uv_fourier_proj(self.fourier_encode_uv(uv))
        identities = [
            self.camera_token_norm(self._gather_id_tokens(encoded.id_tokens, ids))
            for ids in (source, target, reference)
        ]
        return tokens + self.camera_relation_embed(torch.cat(identities, dim=-1))

    def fourier_encode_uv(self, uv: torch.Tensor) -> torch.Tensor:
        dim_per_axis = self.decoder_dim // 4
        omega = torch.arange(dim_per_axis, dtype=torch.float32, device=uv.device)
        omega = 1.0 / (100.0 ** (omega / dim_per_axis))

        u = uv[..., 0:1]
        v = uv[..., 1:2]
        u_embed = u * omega.view(1, 1, -1)
        v_embed = v * omega.view(1, 1, -1)
        return torch.cat(
            [
                torch.sin(u_embed),
                torch.cos(u_embed),
                torch.sin(v_embed),
                torch.cos(v_embed),
            ],
            dim=-1,
        )

    @staticmethod
    def _gather_id_tokens(
        id_tokens: torch.Tensor,
        frame_ids: torch.Tensor,
    ) -> torch.Tensor:
        _, _, id_dim = id_tokens.shape
        gather_idx = frame_ids.unsqueeze(-1).expand(-1, -1, id_dim)
        return torch.gather(id_tokens, dim=1, index=gather_idx)

    def _sample_rgb_patches(
        self,
        images: torch.Tensor,
        source_frame: torch.Tensor,
        yx: torch.Tensor,
    ) -> torch.Tensor:
        batch_size, num_frames, channels, height, width = images.shape
        num_queries = source_frame.shape[1]
        device = images.device

        pad = self.rgb_patch_size // 2
        images_reshaped = images.view(batch_size * num_frames, channels, height, width)
        images_padded = F.pad(images_reshaped, (pad, pad, pad, pad), mode="replicate")
        images_padded = images_padded.view(
            batch_size,
            num_frames,
            channels,
            height + 2 * pad,
            width + 2 * pad,
        )

        frame = source_frame.clamp(0, num_frames - 1)
        y = yx[..., 0].round().long().clamp(0, height - 1)
        x = yx[..., 1].round().long().clamp(0, width - 1)

        offsets = torch.arange(self.rgb_patch_size, device=device) - pad
        dy, dx = torch.meshgrid(offsets, offsets, indexing="ij")

        yy = (y.view(batch_size, num_queries, 1, 1) + dy + pad).to(torch.long)
        xx = (x.view(batch_size, num_queries, 1, 1) + dx + pad).to(torch.long)
        ff = frame.view(batch_size, num_queries, 1, 1).expand(
            -1, -1, self.rgb_patch_size, self.rgb_patch_size
        )
        bb = (
            torch.arange(batch_size, device=device)
            .view(batch_size, 1, 1, 1)
            .expand(-1, num_queries, self.rgb_patch_size, self.rgb_patch_size)
        )
        sampled = images_padded[bb, ff, :, yy, xx]
        return sampled.permute(0, 1, 4, 2, 3).reshape(batch_size, num_queries, -1)
