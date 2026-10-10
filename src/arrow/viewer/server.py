import argparse
from contextlib import asynccontextmanager
from pathlib import Path
import socket
import tempfile
from typing import Annotated, Literal
from zipfile import BadZipFile

from fastapi import Body, FastAPI, File, Form, HTTPException, Query, UploadFile
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, model_validator

from arrow.data.io import select_frame_indices
from arrow.utils.config import load_config
from arrow.utils.results_io import load_result

from . import sources
from arrow.infer.runner import STRIDES

from .application import Application, plan, task_specs
from .scene import Scene


EXAMPLES = Path(__file__).resolve().parents[3] / "assets" / "videos"
Unit = Annotated[float, Field(ge=0, le=1)]
Task = Literal["reconstruct", "pose", "depth", "track", "all_pixels"]


def create_app(
    *, scene=None, result=None, checkpoint=None, device=None, directory=None, root=None, config=None
):
    """The viewer app, showing `scene` or `result` (a Result or NPZ path).

    Unset arguments come from `config` (configs/viewer.py by default).
    """
    config = load_config("viewer") if config is None else config
    example = config["data"]["example"] and EXAMPLES / config["data"]["example"]
    loader_defaults = {key: value for key, value in config["data"]["loader"].items() if key != "type"}
    checkpoint = config["checkpoint"] if checkpoint is None else checkpoint
    device = config["device"] if device is None else device

    class SeedSpec(BaseModel):
        source_frame: int = Field(ge=0)
        region: tuple[Unit, Unit, Unit, Unit] = (0, 0, 1, 1)
        points: list[tuple[Unit, Unit]] = []

    class StreamSpec(BaseModel):
        name: str = Field(min_length=1)
        path: str | list[str] = Field(min_length=1)

    class TaskSpec(BaseModel):
        """One task: its stride (its `*_stride` config value when left out; for tracking, 0 is no
        grid), and for tracking a [0, 1] region and clicked points of the start frame."""

        task: Task
        stride: int | None = Field(default=None, ge=0)
        region: tuple[Unit, Unit, Unit, Unit] = (0, 0, 1, 1)
        points: list[tuple[Unit, Unit]] = []
        seeds: list[SeedSpec] | None = Field(default=None, min_length=1)

    class RunRequest(BaseModel):
        """A clip selection and its `tasks`, run in order on one encoding."""

        path: str | list[str] | None = Field(default=None, min_length=1)
        streams: list[StreamSpec] | None = Field(default=None, min_length=1)
        tasks: list[TaskSpec] = Field(min_length=1)
        start: int = Field(default=loader_defaults["start"], ge=0)
        stride: int = Field(default=loader_defaults["stride"], ge=1)
        frames: int = Field(default=loader_defaults["max_frames"], ge=1)
        frame_indices: list[int] | None = Field(default=None, min_length=1)
        source_frame: int = Field(default=0, ge=0)
        reference_frame: int | None = Field(default=None, ge=0)
        decode_chunk_size: int = Field(default=config["decode_chunk_size"], ge=1)
        skip_sky: bool = config["skip_sky"]

        @model_validator(mode="after")
        def validate_input(self):
            if self.frame_indices is not None:
                self.frame_indices = list(select_frame_indices(frame_indices=self.frame_indices))
                self.start, self.stride, self.frames = self.frame_indices[0], 1, len(self.frame_indices)
            if (self.path is None) == (self.streams is None):
                raise ValueError("Choose a clip or a list of camera streams")
            if self.streams and len({stream.name for stream in self.streams}) != len(self.streams):
                raise ValueError("Camera names must be unique")
            if self.streams and any(spec.task not in ("track", "reconstruct", "pose") for spec in self.tasks):
                raise ValueError("Multi-view streams support 3D tracking, reconstruction and camera poses")
            return self

        def source(self):
            if self.streams:
                return {stream.name: resolve_source(stream.path) for stream in self.streams}
            return resolve_source(self.path)

        def specs(self):
            try:
                specs = task_specs([spec.model_dump(exclude_none=True) for spec in self.tasks], config)
                if self.streams:
                    views = len(self.streams)
                    for spec in specs:
                        if spec["task"] == "track" and "seeds" not in spec:
                            spec["seeds"] = [
                                {"source_frame": self.source_frame // views * views + view,
                                 "region": spec["region"], "points": spec["points"]}
                                for view in range(views)
                            ]
                return specs
            except ValueError as error:
                raise HTTPException(422, str(error)) from error

    temporary = None
    directory = config["session"]["directory"] if directory is None else directory
    if directory is None:
        temporary = tempfile.TemporaryDirectory(prefix="arrow-viewer-")
        directory = temporary.name
    else:
        Path(directory).expanduser().mkdir(parents=True, exist_ok=True)
        directory = tempfile.mkdtemp(prefix="session-", dir=Path(directory).expanduser())
    directory = Path(directory)
    root = Path(root or config["data"]["root"] or EXAMPLES).expanduser().resolve()
    uploads = (directory / "uploads").resolve()
    uploads.mkdir(exist_ok=True)
    session = Application(checkpoint, device, directory, scene, config=config)
    if result is not None:
        from .adapter import from_result

        result_source = result if isinstance(result, (str, Path)) else None
        if result_source is not None:
            result = load_result(result_source)
        session.scene, session.result = from_result(result), result
        session.store_result(result, source=result_source)

    @asynccontextmanager
    async def lifespan(app):
        yield
        session.close()
        if temporary is not None:
            temporary.cleanup()

    app = FastAPI(lifespan=lifespan)
    app.state.session = session

    @app.get("/api/status")
    def status():
        with session.lock:
            scene = session.scene
            return {
                **session.status,
                "revision": f"{session.status['revision']}:{scene.revision}",
                "scene_key": scene.cache_key,
                "presentation": scene.get_presentation(),
                "has_result": session.result is not None,
                "clip": session.clip,
                "encoded": session.encoded is not None,
                "peak_bytes": session.peak,
                "tabs": [{"id": tab["id"], "name": tab["name"]} for tab in session.tabs],
                "active": session.active,
            }

    @app.post("/api/tabs")
    def new_tab():
        try:
            return {"id": session.new_tab()}
        except ValueError as error:
            raise HTTPException(409, str(error)) from error

    @app.post("/api/tabs/{tab_id}/activate")
    def switch_tab(tab_id: int):
        try:
            session.switch_tab(tab_id)
        except ValueError as error:
            raise HTTPException(409, str(error)) from error
        return {"active": tab_id}

    class TabName(BaseModel):
        name: str

    @app.patch("/api/tabs/{tab_id}")
    def rename_tab(tab_id: int, request: TabName):
        try:
            session.rename_tab(tab_id, request.name)
        except ValueError as error:
            raise HTTPException(409, str(error)) from error
        return {"renamed": tab_id}

    class TabOrder(BaseModel):
        ids: list[int]

    @app.post("/api/tabs/order")
    def reorder_tabs(request: TabOrder):
        try:
            session.reorder_tabs(request.ids)
        except ValueError as error:
            raise HTTPException(409, str(error)) from error
        return {"ids": request.ids}

    @app.delete("/api/tabs/{tab_id}")
    def close_tab(tab_id: int):
        try:
            session.close_tab(tab_id)
        except ValueError as error:
            raise HTTPException(409, str(error)) from error
        return {"closed": tab_id}

    @app.get("/api/scene")
    def current_scene():
        with session.lock:
            scene = session.scene
            key = scene.cache_key
        return Response(
            scene.dumps(), media_type="application/json", headers={"X-Scene-Key": key}
        )

    @app.post("/api/presentation")
    def presentation(settings: dict):
        session.scene.set_presentation(settings)
        return {"saved": True}

    @app.get("/api/save-scene")
    def save_scene():
        return Response(
            session.scene.dumps(),
            media_type="application/json",
            headers={"Content-Disposition": 'attachment; filename="scene.arrow.json"'},
        )

    @app.get("/api/result")
    def download_result():
        if session.result is None:
            raise HTTPException(404, "No numerical result is loaded")
        return FileResponse(session.result_path, filename="arrow-result.npz")

    def load_scene(path):
        if session.status["state"] == "running":
            raise HTTPException(409, "Wait for inference or cancel it before loading a scene")
        if not path.is_file() or path.suffix.lower() not in sources.SCENE_SUFFIXES:
            raise HTTPException(422, "Choose a saved view (.json) or predictions (.npz)")
        try:
            loaded = None
            if path.suffix.lower() == ".npz":
                from .adapter import from_result

                loaded = load_result(path)
                scene = from_result(loaded)
            else:
                scene = Scene.load(path)
        except OSError as error:
            status = 403 if isinstance(error, PermissionError) else 404 if isinstance(error, FileNotFoundError) else 400
            raise HTTPException(status, f"Cannot open {path}: {error.strerror}") from error
        except (ValueError, KeyError, EOFError, BadZipFile) as error:
            raise HTTPException(400, f"Invalid saved file: {error}") from error
        try:
            session.new_tab(
                path.name, scene=scene, result=loaded,
                result_source=path if loaded is not None else None,
            )
        except ValueError as error:
            raise HTTPException(409, str(error)) from error
        return {"loaded": True}

    @app.post("/api/load")
    async def load(file: UploadFile):
        with tempfile.TemporaryDirectory(dir=directory) as temporary:
            path = Path(temporary) / Path(file.filename or "scene.json").name
            path.write_bytes(await file.read())
            return load_scene(path)

    @app.post("/api/open")
    def open_scene(path: str = Body(embed=True)):
        return load_scene(resolve(path))

    def resolve(path):
        path = (root / Path(path).expanduser()).resolve()
        if not path.exists():
            raise HTTPException(404, f"{path} does not exist")
        return path

    def resolve_source(path):
        if isinstance(path, list):
            files = [resolve(file) for file in path]
            if not files or any(not file.is_file() or file.suffix.lower() not in sources.IMAGE_SUFFIXES for file in files):
                raise HTTPException(422, "An image selection must contain only image files")
            return tuple(files)
        return resolve(path)

    @app.get("/api/config")
    def get_config():
        return {
            "root": str(root),
            "results_root": str(Path("results").resolve()),
            "host": socket.gethostname(),
            "example": str(example) if example and example.exists() else None,
            "loader": loader_defaults,
            "decode_chunk_size": config["decode_chunk_size"],
            "checkpoint": str(checkpoint),
            "device": device,
            # What the Input tab starts with.
            **{key: config[key] for key in ("tasks", "skip_sky", *STRIDES.values())},
            "display": config["display"],
            "browser_memory_gb": config["session"]["browser_memory_gb"],
        }

    @app.get("/api/browse")
    def browse(path: str | None = None):
        """A folder's contents; for a file, its folder's, with `file` naming it."""
        try:
            folder = resolve(path or root)
            if folder.is_dir():
                return sources.browse(folder)
            return {**sources.browse(folder.parent), "file": str(folder)}
        except OSError as error:
            status = 403 if isinstance(error, PermissionError) else 404 if isinstance(error, FileNotFoundError) else 400
            raise HTTPException(status, f"Cannot open {path or root}: {error.strerror}") from error

    @app.get("/api/source")
    def source(path: list[str] = Query(min_length=1)):
        try:
            selected = resolve_source(path[0] if len(path) == 1 else path)
            paths = selected if isinstance(selected, tuple) else (selected,)
            return {**sources.describe(selected), "origin": "device" if all(file.is_relative_to(uploads) for file in paths) else "server"}
        except ValueError as error:
            raise HTTPException(400, str(error)) from error

    @app.get("/api/frame")
    def frame(path: list[str] = Query(min_length=1), index: int = Query(ge=0), size: int = Query(320, ge=16, le=2048)):
        file = resolve_source(path[0] if len(path) == 1 else path)
        try:
            key = tuple(str(p) for p in file) if isinstance(file, tuple) else str(file)
            modified = tuple(p.stat().st_mtime for p in file) if isinstance(file, tuple) else file.stat().st_mtime
            data = sources.frame_jpeg(key, modified, index, size)
        except (IndexError, StopIteration) as error:
            raise HTTPException(404, f"Frame {index} does not exist") from error
        return Response(data, media_type="image/jpeg", headers={"Cache-Control": "max-age=3600"})

    @app.post("/api/upload")
    async def upload(files: list[UploadFile] = File(...), name: str = Form("")):
        names = [Path(file.filename or "input").name for file in files]
        video = len(names) == 1 and Path(names[0]).suffix.lower() in sources.VIDEO_SUFFIXES
        if not video and any(Path(name).suffix.lower() not in sources.IMAGE_SUFFIXES for name in names):
            raise HTTPException(422, "Choose one video or a set of images")
        if len(names) != len(set(names)):
            raise HTTPException(422, "Images in a sequence must have different filenames")
        folder = Path(tempfile.mkdtemp(dir=uploads))
        if name:
            if Path(name).name in {"", ".", ".."}:
                raise HTTPException(422, "Choose an image folder name")
            folder = folder / Path(name).name
            folder.mkdir(exist_ok=True)
        for file in files:
            with (folder / Path(file.filename or "input").name).open("wb") as output:
                while chunk := await file.read(1024 * 1024):
                    output.write(chunk)
        if video:
            return {"path": str(folder / Path(files[0].filename or "input").name)}
        return {"path": str(folder)}

    @app.post("/api/run")
    def run(request: RunRequest):
        try:
            session.start(
                request.source(),
                tasks=request.specs(),
                start=request.start,
                stride=request.stride,
                max_frames=request.frames,
                frame_indices=request.frame_indices,
                source_frame=request.source_frame,
                reference_frame=request.reference_frame,
                decode_chunk_size=request.decode_chunk_size,
                skip_sky=request.skip_sky,
            )
        except ValueError as error:
            raise HTTPException(409, str(error)) from error
        return {"started": True}

    @app.post("/api/plan")
    def plan_run(request: RunRequest):
        """Each task's plan and their totals."""
        source = request.source()
        paths = list(source.values()) if isinstance(source, dict) else [source]
        try:
            sizes = [sources.selected_sizes(
                path, start=request.start, stride=request.stride, max_frames=request.frames,
                frame_indices=request.frame_indices,
            ) for path in paths]
        except ValueError as error:
            raise HTTPException(422, str(error)) from error
        if not all(sizes):
            raise HTTPException(422, "No frames selected from the input")
        if request.streams and any(len(view) != request.frames for view in sizes):
            raise HTTPException(422, "The selected timestep range must exist in every camera stream")
        selected = [size for timestep in zip(*sizes) for size in timestep]
        try:
            plans = {
                spec["task"]: plan(
                    selected,
                    **spec,
                    max_side=loader_defaults["max_side"],
                    pose_config=config["pose"],
                    source_frame=request.source_frame,
                )
                for spec in request.specs()
            }
        except ValueError as error:
            raise HTTPException(422, str(error)) from error
        first = next(iter(plans.values()))
        return {
            "size": first["size"],
            "frame_info": first["frame_info"],
            "queries": sum(p["queries"] for p in plans.values()),
            "tracks": sum(p["tracks"] for p in plans.values()),
            "tasks": plans,
        }

    class LayerSelection(BaseModel):
        indices: list[int]

    @app.post("/api/layers/merge")
    def merge_layers(request: LayerSelection):
        try:
            session.merge_layers(request.indices)
        except ValueError as error:
            raise HTTPException(409, str(error)) from error
        return {"merged": request.indices}

    @app.delete("/api/layers/{index}")
    def remove_layer(index: int):
        try:
            session.remove_layer(index)
        except ValueError as error:
            raise HTTPException(409, str(error)) from error
        return {"removed": True}

    @app.post("/api/cancel")
    def cancel():
        session.cancelled.set()
        session.status["stage"] = "cancelling after current operation"
        return {"requested": True}

    app.mount("/", StaticFiles(packages=[("arrow.viewer", "static")], html=True), name="frontend")
    return app


def serve(
    *,
    scene=None,
    result=None,
    checkpoint=None,
    device=None,
    host=None,
    port=None,
    root=None,
    config=None,
):
    import uvicorn

    config = load_config("viewer") if config is None else config
    uvicorn.run(
        create_app(
            scene=scene,
            result=result,
            checkpoint=checkpoint,
            device=device,
            root=root,
            config=config,
        ),
        host=host or config["server"]["host"],
        port=port or config["server"]["port"],
    )


def main():
    import cfgx

    parser = argparse.ArgumentParser(description="arrow local viewer")
    parser.add_argument("--checkpoint")
    parser.add_argument("--device")
    parser.add_argument("--host", help="Default: server.host in configs/viewer.py")
    parser.add_argument("--port", type=int, help="Default: server.port in configs/viewer.py")
    parser.add_argument(
        "--scene", type=Path, help="Open saved predictions (.npz) or a saved view (.json)"
    )
    parser.add_argument(
        "--root", type=Path, help="Starting folder for browsing; default: data.root, else the examples"
    )
    parser.add_argument("--config", nargs="+", help="cfgx config file(s), merged in order")
    parser.add_argument("--overrides", "-o", nargs="*", default=[], help="cfgx key=value overrides")
    args = parser.parse_args()
    config = (
        cfgx.load(*args.config, overrides=args.overrides)
        if args.config
        else load_config("viewer", overrides=args.overrides)
    )
    npz = args.scene is not None and args.scene.suffix == ".npz"
    serve(
        scene=Scene.load(args.scene) if args.scene and not npz else None,
        result=args.scene if npz else None,
        checkpoint=args.checkpoint,
        device=args.device,
        host=args.host,
        port=args.port,
        root=args.root,
        config=config,
    )


if __name__ == "__main__":
    main()
