"""Command-line entrypoint: python -m arrow.eval --config ..."""

import argparse
from datetime import timedelta
import json
import os

import cfgx
import torch
import torch.distributed as dist

from .runner import run


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", nargs="+", required=True, help="cfgx files, composed in order")
    parser.add_argument("--overrides", "-o", nargs="*", default=[], help="cfgx key=value overrides")
    args = parser.parse_args()
    torch.set_num_threads(min(torch.get_num_threads(), 8))
    config = cfgx.load(*args.config, overrides=args.overrides)
    distributed = int(os.environ.get("WORLD_SIZE", "1")) > 1
    if distributed:
        timeout_seconds = config.get("distributed_timeout_seconds", 3600)
        if not isinstance(timeout_seconds, (int, float)):
            raise ValueError("distributed_timeout_seconds must be a number")
        timeout = timedelta(seconds=timeout_seconds)
        if torch.device(config["interface"]["device"]).type == "cuda":
            device = torch.device("cuda", int(os.environ["LOCAL_RANK"]))
            torch.cuda.set_device(device)
            config = cfgx.load(*args.config, overrides=[*args.overrides,
                               f"interface.device={device}"])
            dist.init_process_group("nccl", device_id=device, timeout=timeout)
        else:
            dist.init_process_group("gloo", timeout=timeout)
    try:
        summary = run(config)
        if summary is not None:
            print(json.dumps(summary, indent=2), flush=True)
    finally:
        if distributed:
            dist.destroy_process_group()


if __name__ == "__main__":
    main()
