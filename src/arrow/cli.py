import argparse
import json

import cfgx

from arrow.utils.config import load_config
from arrow.utils.results_io import save_result


def main():
    config_parser = argparse.ArgumentParser(add_help=False)
    config_parser.add_argument("--config", nargs="+", help="cfgx config file(s), merged in order")
    config_parser.add_argument("--overrides", "-o", nargs="*", default=[], help="cfgx key=value overrides")
    config_args, _ = config_parser.parse_known_args()
    defaults = (
        cfgx.load(*config_args.config, overrides=config_args.overrides)
        if config_args.config
        else load_config("inference", overrides=config_args.overrides)
    )
    loader_spec = defaults.pop("data")["loader"]
    loader_defaults = {key: value for key, value in loader_spec.items() if key != "type"}
    pose_config = defaults.pop("pose")
    tasks = defaults.pop("tasks")
    parser = argparse.ArgumentParser(description="arrow reconstruction, depth, poses and tracking")
    sub = parser.add_subparsers(dest="command", required=True)
    predict = sub.add_parser("infer", parents=[config_parser])
    predict.add_argument(
        "input", nargs="+",
        help="Image folder, single video, ordered image paths, or camera streams with --multi-view",
    )
    predict.add_argument(
        "--multi-view", action="store_true",
        help="Treat each input as a synchronized camera video or naturally sorted image folder",
    )
    predict.add_argument(
        "--end", type=int, help="Exclusive end frame index; overrides --max-frames",
    )
    predict.add_argument("--output", required=True)
    predict.add_argument(
        "--tasks",
        nargs="+",
        default=tasks,
        help="Any of reconstruct, depth, pose, track and all_pixels, decoded on one encoding; "
        "see docs/INFERENCE.md#tasks",
    )
    predict.add_argument(
        "--points", help="JSON file containing first-frame input-pixel (x, y) pairs"
    )
    for key, default in {**loader_defaults, **defaults}.items():
        if isinstance(default, bool):
            predict.add_argument(
                "--" + key.replace("_", "-"), action=argparse.BooleanOptionalAction, default=default
            )
        else:
            predict.add_argument("--" + key.replace("_", "-"), type=type(default), default=default)
    inspect = sub.add_parser("inspect")
    inspect.add_argument("result")
    args = parser.parse_args()
    if args.command == "inspect":
        from .utils.results_io import load_result

        print(json.dumps(load_result(args.result).metadata, indent=2))
        return
    source = args.input[0] if len(args.input) == 1 else args.input
    loader_options = {key: getattr(args, key) for key in loader_defaults}
    if args.multi_view:
        if args.points:
            parser.error("--points is only supported for single-view input")
        if any(task not in ("track", "reconstruct", "pose") for task in args.tasks):
            parser.error("Multi-view streams support track, reconstruct and pose")
        loader_spec = {**loader_spec, "type": "partial:load_multiview_input"}
        source = {f"view-{view}": path for view, path in enumerate(args.input)}
    if args.end is not None:
        if args.start < 0 or args.stride < 1:
            parser.error("start must be nonnegative; stride must be positive")
        if args.end <= args.start:
            parser.error("end must be greater than start")
        loader_options["frame_indices"] = range(args.start, args.end, args.stride)
    from . import ARROW
    from .infer import infer
    from .utils.registry import build
    import torch

    torch.set_num_threads(min(torch.get_num_threads(), 8))
    observations = build(loader_spec)(source, **loader_options)
    model = ARROW.from_pretrained(args.checkpoint, device=args.device)
    xy = None
    if args.points:
        with open(args.points) as stream:
            xy = json.load(stream)
    result, _ = infer(
        model,
        observations,
        tasks=args.tasks,
        pose_config=pose_config,
        xy=xy,
        track_stride=args.track_stride,
        reconstruction_stride=args.reconstruction_stride,
        depth_stride=args.depth_stride,
        all_pixels_stride=args.all_pixels_stride,
        decode_chunk_size=args.decode_chunk_size,
        skip_sky=args.skip_sky,
        progress=lambda stage, value, detail=None: print(
            f"{stage}: {value:.0%}" + (f" ({detail})" if detail else ""), flush=True
        ),
    )
    save_result(result, args.output)
    print(json.dumps(result.metadata["runtime"], indent=2))


if __name__ == "__main__":
    main()
