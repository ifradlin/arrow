export type Vec3 = [number, number, number];
export interface CameraView {
  position: Vec3; quaternion: [number, number, number, number]; target: Vec3; up: Vec3;
  fov: number; near: number; far: number; zoom: number; projection?: Vec3;
}
export type ColorMode = 'rgb' | 'time' | 'depth' | 'confidence' | 'visibility' | 'normals' | 'cloud_normals';
export type OccludedMode = 'show' | 'dim' | 'hide';
export type TrailColorMode = 'position' | 'rgb' | 'time' | 'confidence';
/** `xy` blends four corners; `x`/`y` read turbo across or down; `wheel` is hue by angle; `bands` repeats a rainbow gradient. */
export type GradientMode = 'xy' | 'x' | 'y' | 'wheel' | 'bands';
export interface ColorBox { rect: Region; mode: GradientMode; sourceFrame?: number; }
export interface Settings {
  trajectoryMode: 'across' | 'source'; inputCamera: number;
  confidenceKeep: number;
  /** A track sample is visible when its predicted visibility is at least `visibility`; occluded samples are shown, dimmed or hidden. */
  visibility: number; occluded: OccludedMode;
  /** Tracks that stay within `threshold` percent of the scene diagonal of their mean are static. */
  motion: { enabled: boolean; threshold: number; collapse: boolean; tint: boolean };
  trailDensity: number; allClouds: boolean;
  frameTransition: 'smooth' | 'direct';
  cameras: boolean; frustumSize: number; frustumWidth: number; planeOpacity: number;
  /** On-screen point diameter in CSS pixels. */
  pointColor: ColorMode; pointSize: number;
  trails: boolean; trailLength: number; trailWidth: number; trailOpacity: number; trailFade: boolean;
  trailColor: TrailColorMode; trailGradient: GradientMode; trailBoxes: ColorBox[]; trailOutside: 'grey' | 'rgb' | 'gradient';
  background: 'gradient' | 'solid'; backgroundColor: string;
  /** Indices of the result layers not drawn. */
  hiddenLayers: number[];
}
export interface Presentation { settings?: Partial<Settings> & { confidence?: number; imagePlanes?: boolean }; view?: CameraView; }
export interface ImageEntry { name: string; time: number; url: string; }
/** `normals` (predicted) and `cloud_normals` (from neighbouring points) are RGB bytes; `visibility` is a probability in bytes. */
export interface PointsEntry { name: string; time: number; positions: Vec3[]; colors?: Vec3[]; confidence?: number[]; normals?: Vec3[]; cloud_normals?: Vec3[]; visibility?: number[]; }
export interface TracksEntry { mode?: 'across' | 'source'; valid?: boolean[][]; name: string; times: number[]; positions: Vec3[][]; colors?: Vec3[]; confidence?: number[][]; visibility_logits?: number[][]; source_uv?: [number, number][]; source_frame?: number; source_frames?: number[]; normals?: Vec3[][]; cloud_normals?: Vec3[][]; }
export interface CameraEntry { name: string; time: number; pose: number[][]; intrinsics: number[][]; width: number; height: number; image: string; }
export interface SceneData {
  format_version: 1; coordinate_frame: string; scale: string;
  images: ImageEntry[]; points: PointsEntry[]; tracks: TracksEntry[]; cameras: CameraEntry[];
  presentation: Presentation; metadata?: { model?: { checkpoint?: string; revision?: string | null }; num_views?: number; view_names?: string[]; layers?: Layer[]; recommended?: { confidenceKeep: number }; frame_info?: FrameInfo[] };
}
/** A model input frame: where it came from and how it was resized ([height, width]) and padded ([left, top, right, bottom]). */
export interface FrameInfo { view?: number; view_name?: string; timestep?: number; index: number; name: string; timestamp: number | null; original_size?: [number, number]; resized_size?: [number, number]; padding?: [number, number, number, number]; }
/** What the Info tab reports beyond the scene itself. */
export interface RunInfo {
  /** The path the scene's clip was read from, and that clip when it is the one selected in the Input tab. */
  source: string | null; clip: Clip | null; host: string; selection: string; checkpoint?: string; device?: string | null;
  steps: { stage: string; seconds: number }[]; peakBytes: number | null;
}
export interface Layer { task: Task; label: string; detail: string; depth_range?: [number, number]; sky_skipped?: number; }
export const defaultSettings: Settings = {
  trajectoryMode: 'across', inputCamera: 0, confidenceKeep: 1, visibility: 0.5, occluded: 'show',
  motion: { enabled: false, threshold: 0.25, collapse: true, tint: true },
  trailDensity: 0.2, allClouds: false,
  frameTransition: 'smooth',
  cameras: true, frustumSize: 0.12, frustumWidth: 2, planeOpacity: 0.85,
  pointColor: 'rgb', pointSize: 5,
  trails: true, trailLength: 20, trailWidth: 1.5, trailOpacity: 0.9, trailFade: true,
  trailColor: 'position', trailGradient: 'x', trailBoxes: [], trailOutside: 'grey',
  background: 'gradient', backgroundColor: '#181b21', hiddenLayers: [],
};
export type MediaSource = string | string[];
export interface Clip { path: MediaSource; origin: 'device' | 'server'; kind: 'video' | 'images'; name: string; frames: number; width: number; height: number; times: number[] | null; }
export interface FrameRange { start: number; stop: number; step: number; indices?: number[]; }
export type Region = [number, number, number, number];
export type Task = 'reconstruct' | 'pose' | 'depth' | 'track' | 'all_pixels';
export interface TaskOptions {
  tasks: Task[]; reconstructionStride: number; depthStride: number; trackStride: number; allPixelsStride: number;
  seedViews?: number[]; viewSeeds?: Record<number, { region: Region; points: [number, number][] }>;
  sourceFrame: number; region: Region; points: [number, number][]; chunk: number; skipSky: boolean;
}
/** What a run decodes, from the server's query builders. `size` is the model input; all-pixel counts are upper bounds. */
export interface Plan { size: [number, number]; per_frame: number; tracks: number; queries: number; grid?: [number, number]; seed_grids?: Record<number, Record<number, [number[], number[]]>>; }
/** Every selected task's plan and their totals. */
export interface Plans { frame_info: FrameInfo[]; size: [number, number]; queries: number; tracks: number; tasks: Partial<Record<Task, Plan>>; }
