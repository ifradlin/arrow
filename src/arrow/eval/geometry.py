"""Evaluation geometry and reconstruction alignment."""

import torch


def depth_to_reference(depth, intrinsics, poses):
    """Unproject depth into the first camera's frame using utils3d conventions."""
    height, width = depth.shape[-2:]
    intrinsics = intrinsics.clone().float()
    intrinsics[:, 0, 2] += .5
    intrinsics[:, 1, 2] += .5
    intrinsics[:, 0, :] /= width
    intrinsics[:, 1, :] /= height
    camera = torch.eye(4).repeat(len(depth), 1, 1)
    camera[:, :3, :3] = intrinsics
    u = torch.linspace(.5 / width, 1 - .5 / width, width)
    v = torch.linspace(.5 / height, 1 - .5 / height, height)
    uv = torch.stack(torch.meshgrid(u, v, indexing="xy"), dim=-1)
    points = torch.cat([uv, torch.ones_like(uv[..., :1])], dim=-1) * depth[..., None]
    points = torch.cat([points, torch.ones_like(points[..., :1])], dim=-1)
    points = (points @ torch.linalg.inv(camera[:, None]).mT)[..., :3]
    relative = torch.linalg.inv(poses[0].float()) @ poses.float()
    return (torch.einsum("fij,fhwj->fhwi", relative[:, :3, :3], points.float())
            + relative[:, None, None, :3, 3])


def procrustes(pts1: torch.Tensor, pts2: torch.Tensor):
    assert pts1.device == pts2.device, f"{pts1.device} != {pts2.device}"
    assert pts1.dtype == pts2.dtype, f"{pts1.dtype} != {pts2.dtype}"
    assert pts1.shape == pts2.shape, f"{pts1.shape} != {pts2.shape}"
    assert pts1.shape[-1] == 3 and len(pts1.shape) == 2, f"{pts1.shape}"
    # estimate a sim3 transformation to align two point clouds
    # find M = argmin ||P1 - M @ P2||
    t1 = pts1.mean(dim=0)
    t2 = pts2.mean(dim=0)
    if bool((pts2 == pts2[0]).all()):
        return pts1.new_tensor(1.), torch.eye(3, device=pts1.device), t1 - t2
    pts1 = pts1 - t1[None, :]
    pts2 = pts2 - t2[None, :]
    s1 = pts1.square().sum(dim=-1).mean().sqrt()
    s2 = pts2.square().sum(dim=-1).mean().sqrt()
    pts1 = pts1 / s1
    pts2 = pts2 / s2
    try:
        U, _, V = (pts1.T @ pts2).double().svd()
        U: torch.Tensor = U
        V: torch.Tensor = V
    except RuntimeError:
        print("Procustes failed: SVD did not converge!")
        return pts1.new_tensor(1.), torch.eye(3, device=pts1.device), torch.zeros_like(t1)
    # build rotation matrix
    R = (U @ V.T).float()
    if R.det() < 0:
        U[:, -1] *= -1
        R = (U @ V.T).float()
    s = s1 / s2
    t = t1 - s * t2 @ R.T

    # use as mat4: [sR, t] @ pts2
    # or as s * R @ pts2 + t
    return s, R, t
