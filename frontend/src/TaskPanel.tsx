import { useEffect, useState } from 'react';
import { frameUrl } from './ClipPicker';
import { sampledFrames } from './FrameRange';
import { RegionPicker, isFull } from './RegionPicker';
import { Group, Info, Segmented, Slider, Switch } from './ui';
import type { Clip, FrameRange, Plans, Task, TaskOptions } from './types';

/** The model's tasks (docs/INFERENCE.md#tasks), as the viewer offers them. */
export const TASKS: { value: Task; label: string; description: string; detail: string; action: string }[] = [
  { value: 'track', label: '3D tracking', description: 'Follow a grid or picked points', detail: 'Follow a region grid or clicked points of one frame through the clip', action: 'Track' },
  { value: 'all_pixels', label: 'All-pixel tracking', description: 'Track every pixel once', detail: 'Track every pixel of the clip once, seeding later frames only where nothing was tracked', action: 'Track all pixels' },
  { value: 'reconstruct', label: '3D reconstruction', description: 'A point cloud per frame', detail: 'A point cloud of every frame', action: 'Reconstruct' },
  { value: 'depth', label: 'Video depth', description: 'A depth map per frame', detail: 'A depth map of every frame, each in its own camera, with normals and visibility', action: 'Estimate depth' },
  { value: 'pose', label: 'Camera poses', description: 'Cameras only', detail: "Cameras only, fit to each frame's points in its own and the first frame's camera", action: 'Estimate poses' },
];
export const MULTIVIEW_TASKS: Task[] = ['track', 'reconstruct', 'pose'];
const CHUNKS = [10_000, 50_000, 100_000];

const PRESET_SPACINGS = [0, 1, 2, 4, 8, 16];

// Measured GPU memory of the released model (GiB). Cross-attention runs in fused kernels, so a
// pass needs memory for its queries plus the context's keys and values, never their product.
const MEMORY = { model: 5, contextPerFrame: .022, decodeContextPerFrame: .022, perThousandQueries: .093 };
/** An upper bound: the two decoding terms overlap in practice rather than add. */
const estimateGb = (frames: number, chunk: number) =>
  MEMORY.model + frames * (MEMORY.contextPerFrame + MEMORY.decodeContextPerFrame) + chunk / 1000 * MEMORY.perThousandQueries;

/** The task part of a run or plan request: the selected tasks in list order, each with its own query options. */
export function taskRequest(options: TaskOptions, views?: number) {
  const count = views ?? 1;
  return {
    source_frame: options.sourceFrame * count, decode_chunk_size: options.chunk, skip_sky: options.skipSky,
    tasks: TASKS.filter(item => options.tasks.includes(item.value)).map(({ value: task }) => ({
      task,
      stride: { reconstruct: options.reconstructionStride, depth: options.depthStride, track: options.trackStride, all_pixels: options.allPixelsStride, pose: undefined }[task],
      region: task === 'track' ? options.region : [0, 0, 1, 1],
      points: task === 'track' ? options.points : [],
      ...(task === 'track' && views !== undefined ? {seeds: (options.seedViews ?? Array.from({length: count}, (_, i) => i)).map(view => ({
        source_frame: options.sourceFrame * count + view,
        region: options.viewSeeds?.[view]?.region ?? [0, 0, 1, 1],
        points: options.viewSeeds?.[view]?.points ?? [],
      }))} : {}),
    })),
  };
}

/** Queries per decoder pass: presets, or any positive number typed in (the field may be emptied while typing). */
function ChunkSize({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);
  const commit = () => { const parsed = Math.round(Number(text)); if (text.trim() && Number.isFinite(parsed) && parsed >= 1) onChange(parsed); else setText(String(value)); };
  return <div className="chunk-size">
    <Segmented label="Queries per pass" value={CHUNKS.includes(value) ? value : -1} options={CHUNKS.map(chunk => ({ value: chunk, label: `${chunk / 1000}k` }))} onChange={onChange}/>
    <input type="number" inputMode="numeric" min={1} step={1000} aria-label="Queries per pass, custom" value={text}
      onChange={e => setText(e.target.value)} onBlur={commit} onKeyDown={e => { if (e.key === 'Enter') commit(); }}/>
  </div>;
}

/** `maxSide` is the model input's long side; the start frame is shown at that resolution, as the model sees it. */
export function TaskPanel({ clip: inputClip, streams, range, options: allOptions, plans, maxSide, onChange }: { clip: Clip; streams?: Clip[]; range: FrameRange; options: TaskOptions; plans: Plans | null; maxSide: number; onChange: (options: TaskOptions) => void }) {
  const [selectedCamera, setCamera] = useState(0);
  const camera = Math.min(selectedCamera, Math.max(0, (streams?.length ?? 1) - 1));
  const clip = streams?.[camera] ?? inputClip;
  const multi = streams !== undefined;
  const seedViews = allOptions.seedViews ?? streams?.map((_, i) => i) ?? [0];
  const options: TaskOptions = multi ? {...allOptions, region: allOptions.viewSeeds?.[camera]?.region ?? [0, 0, 1, 1], points: allOptions.viewSeeds?.[camera]?.points ?? []} : allOptions;
  const set = (value: Partial<TaskOptions>) => {
    if (multi && value.sourceFrame !== undefined) {
      onChange({...allOptions, sourceFrame: value.sourceFrame, viewSeeds: Object.fromEntries(Object.entries(allOptions.viewSeeds ?? {}).map(([view, seed]) => [view, {...seed, points: []}]))});
    } else if (multi && ('region' in value || 'points' in value)) {
      onChange({...allOptions, viewSeeds: {...allOptions.viewSeeds, [camera]: {region: value.region ?? options.region, points: value.points ?? options.points}}});
    } else onChange({...allOptions, ...value});
  };
  const has = (task: Task) => options.tasks.includes(task);
  const toggle = (task: Task) => set({ tasks: has(task) ? options.tasks.filter(item => item !== task) : [...options.tasks, task] });
  const frames = sampledFrames(range);
  const fromFrame = has('track') || has('all_pixels');
  const pixels = (values: number[]) => values.map(value => ({ value, label: `${value} px` }));
  const perFrame = (task: Task) => plans?.tasks[task]?.per_frame.toLocaleString() ?? '…';
  const source = options.sourceFrame * (streams?.length ?? 1) + camera;
  const shape = plans?.frame_info[source];
  const [height, width] = shape?.resized_size ?? [clip.height, clip.width];
  const grid: [number[], number[]] = plans?.tasks.track?.seed_grids?.[source]?.[options.trackStride] ?? [[], []];

  return <>
    <Group title="Tasks" info="Pick one or more; they run one after another on one encoding of the clip, each adding a layer.">
      <div className="task-list" role="group" aria-label="Tasks">
        {TASKS.filter(item => !streams || MULTIVIEW_TASKS.includes(item.value)).map(item => <button key={item.value} role="checkbox" aria-checked={has(item.value)} title={item.detail} onClick={() => toggle(item.value)}>
          <span className="task-check" aria-hidden="true"/>
          <span><strong>{item.label}</strong><small>{item.description}</small></span>
        </button>)}
      </div>
    </Group>
    <Group title="Queries">
      {!options.tasks.length && <p className="hint">Choose a task above.</p>}
      {has('reconstruct') && <>
        <span className="field-label">3D reconstruction</span>
        <Segmented label="Sampling" value={options.reconstructionStride} options={pixels([1, 2, 4, 8])} onChange={reconstructionStride => set({ reconstructionStride })}/>
        <p className="hint">{perFrame('reconstruct')} points per frame.</p>
      </>}
      {has('pose') && <><span className="field-label">Camera poses</span><p className="hint">{perFrame('pose')} pixels per frame, fit against the first frame's camera.</p></>}
      {has('depth') && <>
        <span className="field-label">Video depth</span>
        <Segmented label="Resolution" value={options.depthStride} options={[{ value: 1, label: 'Full' }, { value: 2, label: 'Half' }, { value: 4, label: 'Quarter' }]} onChange={depthStride => set({ depthStride })}/>
        <p className="hint">{Math.ceil(width / options.depthStride)} × {Math.ceil(height / options.depthStride)} per frame.</p>
      </>}
      {fromFrame && <div className="field">
        <span className="field-label">{multi ? 'Start timestep' : 'Start frame'}</span>
        <div className="frame-strip" role="radiogroup" aria-label="Start frame">
          {frames.map((index, i) => <button key={index} role="radio" aria-checked={options.sourceFrame === i} title={`Frame ${index}`} style={{ flexBasis: `${Math.round(36 * clip.width / clip.height)}px` }} onClick={() => set({ sourceFrame: i, points: [] })}>
            <img src={frameUrl(clip.path, index, 160)} alt="" draggable={false}/><span>{i + 1}</span>
          </button>)}
        </div>
      </div>}
      {has('track') && <>
        <span className="field-label">3D tracking</span>
        {multi && <>
          <span className="field-label">Seed cameras</span>
          <div className="chips" role="group" aria-label="Seed cameras">{streams?.map((stream, view) => <button key={view} className="chip" aria-pressed={seedViews.includes(view)} onClick={() => set({seedViews: seedViews.includes(view) ? seedViews.filter(v => v !== view) : [...seedViews, view].sort((a, b) => a - b)})}>{stream.name}</button>)}</div>
          <label className="field-label">Edit camera <select aria-label="Seed preview camera" value={camera} onChange={e => setCamera(Number(e.target.value))}>{streams?.map((stream, view) => <option key={view} value={view}>{stream.name}</option>)}</select></label>
          <p className="hint">All cameras provide context. Only selected seed cameras start tracks; regions and clicked points belong to the camera shown below.</p>
          {!seedViews.length ? <p className="hint">Choose at least one seed camera.</p> : !seedViews.includes(camera) && <p className="hint">This camera is not selected for seeding.</p>}
        </>}
        <RegionPicker src={frameUrl(clip.path, frames[options.sourceFrame], maxSide)} width={shape?.original_size?.[1] ?? clip.width} height={shape?.original_size?.[0] ?? clip.height} region={options.region} grid={grid}
          points={options.points} spacing={options.trackStride} onSpacing={trackStride => set({ trackStride })} onRegion={region => set({ region })} onPoints={points => set({ points })}/>
        <Slider label="Grid spacing" value={options.trackStride} min={0} max={64} display={options.trackStride ? `${options.trackStride} px` : 'Off'} onChange={trackStride => set({ trackStride })}/>
        <div className="chips" role="group" aria-label="Grid spacing presets">
          {PRESET_SPACINGS.map(value => <button key={value} className="chip" aria-pressed={options.trackStride === value} onClick={() => set({ trackStride: value })}>{value ? `${value} px` : 'Grid off'}</button>)}
        </div>
        <p className="hint" id="picked-count">{[options.trackStride ? plans && `every ${options.trackStride} px of the ${isFull(options.region) ? 'frame' : 'region'} (${grid[0].length} × ${grid[1].length} = ${(grid[0].length * grid[1].length).toLocaleString()} grid points)` : 'grid off', options.points.length ? `${options.points.length} picked point${options.points.length === 1 ? '' : 's'}` : !options.trackStride && 'click points to track'].filter(Boolean).join(' · ').replace(/^./, c => c.toUpperCase())}. Overlapping selections count once.</p>
      </>}
      {has('all_pixels') && <>
        <span className="field-label">All-pixel tracking</span>
        <Segmented label="Spacing" value={options.allPixelsStride} options={pixels([1, 2, 4, 8, 16])} onChange={allPixelsStride => set({ allPixelsStride })}/>
        <p className="hint">Up to {perFrame('all_pixels')} tracks from the start frame, then only new areas.</p>
      </>}
      <div className="field">
        <Switch label={<span>Skip sky<Info text="Queries starting on sky pixels are not decoded, and all-pixel tracking never seeds them. The sky is segmented once per clip; its mask shows under the input video."/></span>} checked={options.skipSky} onChange={skipSky => set({ skipSky })}/>
      </div>
      <div className="field chunk">
        <span className="field-label">Queries per pass <Info text="How many queries the GPU decodes at once. More uses more memory; lower it if the GPU runs out of memory."/></span>
        <ChunkSize value={options.chunk} onChange={chunk => set({ chunk })}/>
        <p className="hint" id="memory-estimate">Roughly {estimateGb(frames.length * (streams?.length ?? 1), options.chunk).toFixed(1)} GB of GPU memory</p>
      </div>
    </Group>
  </>;
}
