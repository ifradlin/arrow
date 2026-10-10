import { TrailBoxes } from './TrailBoxes';
import { useState, type ReactNode } from 'react';
import { Choices, Group, Info, Segmented, Slider, Switch } from './ui';
import type { ColorMode, OccludedMode, RunInfo, SceneData, Settings, TrailColorMode } from './types';

type Change = (value: Partial<Settings>) => void;
const POINT_COLORS: { value: ColorMode; label: string; title?: string }[] = [
  { value: 'rgb', label: 'RGB' },
  { value: 'confidence', label: 'Confidence', title: 'Viridis by confidence rank among the points the filter keeps' },
  { value: 'visibility', label: 'Visibility', title: 'Viridis by predicted visibility probability: purple hidden, yellow visible' },
  { value: 'normals', label: 'Predicted normals', title: 'Predicted normals in the reference camera: facing it reads blue' },
  { value: 'cloud_normals', label: 'PCD normals', title: 'Normals estimated from neighbouring points in image space' },
];
const TRAIL_COLORS: { value: TrailColorMode; label: string }[] = [
  { value: 'position', label: 'UV position' }, { value: 'rgb', label: 'RGB' }, { value: 'time', label: 'Time' }, { value: 'confidence', label: 'Conf.' },
];
const OCCLUDED: { value: OccludedMode; label: string }[] = [{ value: 'show', label: 'Show' }, { value: 'dim', label: 'Dim' }, { value: 'hide', label: 'Hide' }];
const percent = (value: number, digits = 0) => `${(value * 100).toFixed(digits)}%`;

/** What a tab shows when the scene has nothing it controls. */
function Empty({ title, children }: { title: string; children: string }) {
  return <Group title={title}><p className="hint">{children}</p></Group>;
}

const STATIC_TIP = 'A track is static when every valid position stays within this distance of its mean. Collapse displays it at its median, without changing predictions.';

/** Points, cloud and track alike: the static/moving split and occlusion filter, then how they look. */
function PointsPanel({ settings: s, counts, hasPoints, hasTracks, hasMultiviewTracks, onChange }: {
  settings: Settings; counts: { still: number; moving: number }; hasPoints: boolean; hasTracks: boolean; hasMultiviewTracks: boolean; onChange: Change;
}) {
  if (!hasPoints && !hasTracks) return <Empty title="Points">No points yet. Run tracking or 3D reconstruction from the Input tab.</Empty>;
  const motion = (value: Partial<Settings['motion']>) => onChange({ motion: { ...s.motion, ...value } });
  return <>
    {hasMultiviewTracks && <Group title="3D trajectories">
      <Segmented label="3D trajectory" value={s.trajectoryMode} options={[{value:'across',label:'Camera median'},{value:'source',label:'Source camera'}]} onChange={trajectoryMode => onChange({trajectoryMode})}/>
      <p className="hint">{s.trajectoryMode === 'across'
        ? 'Combines visible predictions across cameras using their median at each timestep.'
        : 'Uses each track’s predictions from the camera where it was seeded.'}</p>
    </Group>}
    <Group title="Point color">
      <Choices label="Point color" value={s.pointColor} options={POINT_COLORS} onChange={pointColor => onChange({ pointColor })}/>
    </Group>
    {hasTracks && <Group title="Static and moving" aside={<input type="checkbox" role="switch" aria-label="Separate static tracks" className="switch-input" checked={s.motion.enabled} onChange={e => motion({ enabled: e.target.checked })}/>}
      info={STATIC_TIP}>
      {s.motion.enabled && <>
        <Slider label="Static below" value={s.motion.threshold} min={0} max={20} step={.05} display={`${s.motion.threshold.toFixed(2)}% of scene`} onChange={threshold => motion({ threshold })}/>
        <p className="hint">{counts.still.toLocaleString()} static, {counts.moving.toLocaleString()} moving.</p>
        <Switch label="Static tracks at their median" checked={s.motion.collapse} onChange={collapse => motion({ collapse })}/>
        <Switch label="Color static blue, moving orange" checked={s.motion.tint} onChange={tint => motion({ tint })}/>
      </>}
    </Group>}
    {hasTracks && <Group title="Occluded points" info="Track points the model predicts are hidden behind something, at the visibility below.">
      <Segmented label="Occluded points" value={s.occluded} options={OCCLUDED} onChange={occluded => onChange({ occluded })}/>
      <Slider label="Visible at" value={s.visibility} min={0} max={1} step={.01} display={`≥ ${s.visibility.toFixed(2)}`} onChange={visibility => onChange({ visibility })}/>
    </Group>}
    <Group title="Points">
      <Slider label="Size" value={s.pointSize} min={1} max={24} step={.5} display={`${s.pointSize} px`} onChange={pointSize => onChange({ pointSize })}/>
      {hasPoints && <>
        <Switch label={<span>Accumulate all frames<Info text="Show every frame's points at once instead of only the current frame's."/></span>} checked={s.allClouds} onChange={allClouds => onChange({ allClouds })}/>
      </>}
    </Group>
  </>;
}

/** The trails behind track points: their color first, then their shape. */
function TrailsPanel({ settings: s, data, hasTracks, onChange }: { settings: Settings; data: SceneData | null; hasTracks: boolean; onChange: Change }) {
  const [selectedSource, setSource] = useState(0);
  if (!hasTracks) return <Empty title="Trails">No tracks yet. Run 3D tracking or all-pixel tracking from the Input tab.</Empty>;
  const sources = [...new Set(data?.tracks.flatMap(track => track.source_frames ?? [track.source_frame ?? 0]) ?? [])].sort((a, b) => a - b);
  const source = sources.includes(selectedSource) ? selectedSource : sources[0] ?? 0;
  const sourceImage = data?.images.filter(image => image.name.split('/')[0] === 'rgb')[source];
  const frame = data?.metadata?.frame_info?.[source];
  const size = frame?.resized_size, padding = frame?.padding ?? [0, 0, 0, 0];
  const camera = data?.cameras[0];
  const aspect = size ? (size[1] + padding[0] + padding[2]) / (size[0] + padding[1] + padding[3]) : camera ? camera.width / camera.height : 16 / 9;
  return <>
    <Group title="Trail color" info="UV position colors each trail by where it starts in the start frame; drag boxes on the frame to give regions their own gradient.">
      <Segmented label="Trail color" value={s.trailColor} options={TRAIL_COLORS} onChange={trailColor => onChange({ trailColor })}/>
      {s.trailColor === 'position' && <>
        {sources.length > 1 && <label className="field-label">Seed frame <select aria-label="Trail color source frame" value={source} onChange={e => setSource(Number(e.target.value))}>
            {sources.map(index => <option key={index} value={index}>{data?.metadata?.frame_info?.[index]?.view_name ?? 'Frame'} · {data?.metadata?.frame_info?.[index]?.index ?? index}</option>)}
          </select></label>}
          <TrailBoxes key={source} image={sourceImage?.url} aspect={aspect} sourceFrame={source} settings={s} onChange={onChange}/>
      </>}
    </Group>
    <Group title="Trails" aside={<input type="checkbox" role="switch" aria-label="Show trails" className="switch-input" checked={s.trails} onChange={e => onChange({ trails: e.target.checked })}/>}>
      {s.trails && <>
        <Slider label="Length" value={s.trailLength} min={0} max={48} display={s.trailLength ? `${s.trailLength} frames` : 'Off'} onChange={trailLength => onChange({ trailLength })}/>
        <Slider label={<>Density<Info text="Draw trails for this share of the moving tracks; every track keeps its point."/></>} name="Density" value={s.trailDensity} min={.01} max={1} step={.01} display={`${percent(s.trailDensity)} of tracks`} onChange={trailDensity => onChange({ trailDensity })}/>
        <Slider label="Width" value={s.trailWidth} min={.5} max={8} step={.5} display={`${s.trailWidth} px`} onChange={trailWidth => onChange({ trailWidth })}/>
        <Slider label="Opacity" value={s.trailOpacity} min={.1} max={1} step={.05} display={percent(s.trailOpacity)} onChange={trailOpacity => onChange({ trailOpacity })}/>
        <Switch label="Fade older segments" checked={s.trailFade} onChange={trailFade => onChange({ trailFade })}/>
      </>}
    </Group>
  </>;
}

/** Camera frusta and the image planes inside them. */
function CamerasPanel({ settings: s, hasCameras, onChange }: { settings: Settings; hasCameras: boolean; onChange: Change }) {
  if (!hasCameras) return <Empty title="Cameras">No cameras yet. Run Camera poses from the Input tab.</Empty>;
  return <>
    <Group title="Frusta" aside={<input type="checkbox" role="switch" aria-label="Show frusta" className="switch-input" checked={s.cameras} onChange={e => onChange({ cameras: e.target.checked })}/>}
      info="Double-click a camera to look through it; drag, scroll or move to leave.">
      {s.cameras && <>
        <Slider label="Size" value={s.frustumSize} min={.02} max={.5} step={.01} display={`${percent(s.frustumSize)} of scene`} onChange={frustumSize => onChange({ frustumSize })}/>
        <Slider label="Line width" value={s.frustumWidth} min={.5} max={6} step={.5} display={`${s.frustumWidth} px`} onChange={frustumWidth => onChange({ frustumWidth })}/>
        <Slider label={<>Image planes <Info text="The current frame's image inside its camera. Set opacity to 0 to hide it."/></>} name="Image plane opacity" value={s.planeOpacity} min={0} max={1} step={.05} display={percent(s.planeOpacity)} onChange={planeOpacity => onChange({ planeOpacity })}/>
      </>}
    </Group>
  </>;
}

/** The 3D view itself: its background and how to move around it. */
function ViewerPanel({ settings: s, onFit, onChange }: { settings: Settings; onFit: () => void; onChange: Change }) {
  return <>
    <Group title="Frame transition">
      <Segmented label="Frame transition" value={s.frameTransition} options={[{ value: 'smooth', label: 'Smooth' }, { value: 'direct', label: 'Direct' }]} onChange={frameTransition => onChange({ frameTransition })}/>
      <p className="hint">Smooth blends between frames. Direct shows each frame's predictions without interpolation.</p>
    </Group>
    <Group title="Background">
      <div className="row">
        <Segmented label="Background" value={s.background} options={[{ value: 'gradient', label: 'Gradient' }, { value: 'solid', label: 'Solid' }]} onChange={background => onChange({ background })}/>
        {s.background === 'solid' && <input className="color-input" aria-label="Background color" type="color" value={s.backgroundColor} onChange={e => onChange({ backgroundColor: e.target.value })}/>}
      </div>
    </Group>
    <Group title="Navigation" aside={<button title="Look at the scene from just behind the reference camera" onClick={onFit}>Reset view</button>}>
      <dl className="keys">
        <dt>Drag</dt><dd>Orbit</dd>
        <dt>Wheel-drag</dt><dd>Tilt the horizon</dd>
        <dt>Right-drag</dt><dd>Pan</dd>
        <dt>Scroll</dt><dd>Zoom</dd>
        <dt>W A S D</dt><dd>Move; Q and E down and up, Shift for faster</dd>
        <dt>← →</dt><dd>Previous and next frame</dd>
        <dt>Double-click</dt><dd>Look through a camera and jump to its frame</dd>
      </dl>
    </Group>
  </>;
}

/** One labelled value; long values (paths) wrap anywhere instead of overflowing. */
const Fact = ({ label, children }: { label: string; children: ReactNode }) => <><dt>{label}</dt><dd>{children}</dd></>;

/** A long value on one line that scrolls sideways, with a button that copies it. */
function CopyLine({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => void navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1200); });
  return <span className="copy-line">
    <code tabIndex={0}>{text}</code>
    <button className="icon-button" aria-label="Copy" title={copied ? 'Copied' : 'Copy'} onClick={copy}>
      {copied ? '✓' : <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3"/><path d="M3.5 10.5h-1v-8h8v1" fill="none" stroke="currentColor" strokeWidth="1.3"/></svg>}
    </button>
  </span>;
}

/** Where the scene came from, what the model saw, what it holds, and how the last run went. */
function InfoPanel({ data, info, mode, stageName }: { data: SceneData | null; info: RunInfo; mode: Settings['trajectoryMode']; stageName: (stage: string) => string }) {
  const frameInfo = data?.metadata?.frame_info ?? [];
  const first = frameInfo[0];
  const size = (hw?: [number, number]) => hw ? `${hw[1]} × ${hw[0]}` : '—';
  const padded = first?.padding?.some(Boolean) ? ` (padded ${first.padding.join(', ')} px)` : '';
  const times = frameInfo.map(frame => frame.timestamp).filter((t): t is number => t !== null);
  const counts = {
    points: data?.points.reduce((n, item) => n + item.positions.length, 0) ?? 0,
    tracks: data?.tracks.filter(track => !track.mode || track.mode === mode).reduce((n, item) => n + (item.positions[0]?.length ?? 0), 0) ?? 0,
    cameras: new Set(data?.cameras.map(camera => `${camera.image}@${camera.time}`)).size,
  };
  const total = info.steps.reduce((sum, step) => sum + step.seconds, 0);
  return <>
    <Group title="Source">
      <dl className="facts">
        <Fact label="Path"><CopyLine text={info.source ?? (frameInfo.length ? first.name : '—')}/></Fact>
        {info.host && <Fact label="Host">{info.host}</Fact>}
        {info.clip && <Fact label="Clip">{info.clip.width} × {info.clip.height} · {info.clip.frames} frames</Fact>}
        <Fact label="Frames used">{frameInfo.length ? `${frameInfo.length} (${info.selection})` : info.selection || '—'}</Fact>
        {times.length > 1 && <Fact label="Time span">{times[0].toFixed(2)} – {times[times.length - 1].toFixed(2)} s</Fact>}
      </dl>
    </Group>
    <Group title="Model input">
      <dl className="facts">
        <Fact label="Original">{size(first?.original_size)}</Fact>
        <Fact label="Resolution">{size(first?.resized_size)}{padded}</Fact>
        {data?.metadata?.model?.checkpoint && <Fact label="Checkpoint">{data.metadata.model.checkpoint}</Fact>}
        {data?.metadata?.model?.revision && <Fact label="Revision">{data.metadata.model.revision}</Fact>}
        {info.device && <Fact label="Device">{info.device}</Fact>}
      </dl>
    </Group>
    <Group title="Scene">
      <dl className="facts">
        <Fact label="Points">{counts.points.toLocaleString()}</Fact>
        <Fact label="Tracks">{counts.tracks.toLocaleString()}</Fact>
        <Fact label="Camera poses">{counts.cameras.toLocaleString()}</Fact>
        {data?.metadata?.layers?.map((layer, i) => <Fact key={i} label={`Layer ${i + 1}`}>{layer.label} · {layer.detail}{layer.sky_skipped ? ` · ${layer.sky_skipped.toLocaleString()} sky skipped` : ''}</Fact>)}
      </dl>
    </Group>
    {info.steps.length > 0 && <Group title="Last run">
      <dl className="facts">
        {info.steps.map((step, i) => <Fact key={i} label={stageName(step.stage)}>{step.seconds.toFixed(1)} s</Fact>)}
        <Fact label="Total">{total.toFixed(1)} s</Fact>
        {info.peakBytes !== null && <Fact label="Peak GPU memory">{(info.peakBytes / 2 ** 30).toFixed(1)} GB</Fact>}
      </dl>
    </Group>}
  </>;
}

const SECTIONS = ['Points', 'Trails', 'Cameras', 'Viewer', 'Info'] as const;

/** Everything about how the scene is drawn, a sub-tab per kind of content. */
export function DisplayPanel({ settings, data, counts, info, stageName, onFit, onChange }: {
  settings: Settings; data: SceneData | null; counts: { still: number; moving: number };
  info: RunInfo; stageName: (stage: string) => string; onFit: () => void; onChange: Change;
}) {
  const [section, setSection] = useState<typeof SECTIONS[number]>('Points');
  const hasPoints = !!data?.points.some(item => item.positions.length);
  const hasTracks = !!data?.tracks.some(item => item.positions[0]?.length);
  const hasCameras = !!data?.cameras.length;
  return <>
    <nav className="subtabs" role="tablist" aria-label="Display">
      {SECTIONS.map(name => <button key={name} role="tab" aria-selected={section === name} onClick={() => setSection(name)}>{name}</button>)}
    </nav>
    {section === 'Points' && <PointsPanel settings={settings} counts={counts} hasPoints={hasPoints} hasTracks={hasTracks} hasMultiviewTracks={!!data?.tracks.some(track => track.mode)} onChange={onChange}/>}
    {section === 'Trails' && <TrailsPanel settings={settings} data={data} hasTracks={hasTracks} onChange={onChange}/>}
    {section === 'Cameras' && <CamerasPanel settings={settings} hasCameras={hasCameras} onChange={onChange}/>}
    {section === 'Viewer' && <ViewerPanel settings={settings} onFit={onFit} onChange={onChange}/>}
    {section === 'Info' && <InfoPanel data={data} info={info} mode={settings.trajectoryMode} stageName={stageName}/>}
  </>;
}
