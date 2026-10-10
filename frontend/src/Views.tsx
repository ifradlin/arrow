import { frameUrl } from './ClipPicker';
import { sampledFrames } from './FrameRange';
import { turbo, viridis } from './palette';
import type { Clip, FrameRange, ImageEntry, Layer, SceneData } from './types';

const latest = (images: ImageEntry[], time: number) => images.filter(image => image.time <= time + 1e-6).sort((a, b) => b.time - a.time)[0] ?? images[0];

const gradient = (color: (t: number) => [number, number, number]) => `linear-gradient(to right, ${Array.from({ length: 9 }, (_, i) => `rgb(${color(i / 8).join(',')})`).join(',')})`;

/** The input frame and, for the depth layer, its depth, predicted normal and visibility maps at the current scene time. */
export function DepthView({ data, layer, index, time, camera = 0 }: { data: SceneData; layer: Layer; index: number; time: number; camera?: number }) {
  const at = (name: string) => {
    const parts = name.split('/');
    if ((data.metadata?.num_views ?? 1) > 1) parts.splice(1, 0, `view-${camera}`);
    return latest(data.images.filter(image => image.name === parts.join('/')), time);
  };
  const [near, far] = layer.depth_range ?? [0, 1];
  const panels = [
    { name: 'rgb', caption: 'Input', legend: null },
    { name: `depth/${index}`, caption: 'Depth', legend: <div className="map-legend"><span>{near.toPrecision(3)}</span><i style={{ background: gradient(t => turbo(1 - t)) }}/><span>{far.toPrecision(3)}</span><small>relative · inverse-depth colors · 2nd–98th percentile</small></div> },
    { name: `normals/${index}`, caption: 'Predicted normals', legend: null },
    { name: `visibility/${index}`, caption: 'Visibility', legend: <div className="map-legend"><span>hidden</span><i style={{ background: gradient(viridis) }}/><span>visible</span><small>sigmoid of the visibility logit</small></div> },
  ].filter(panel => at(panel.name));
  return <div className="depth-view">
    {panels.map(panel => <figure key={panel.name}><img src={at(panel.name)?.url} alt={panel.caption}/><figcaption>{panel.caption}</figcaption>{panel.legend}</figure>)}
  </div>;
}

/** The input frame at the current scene time, and its sky mask when the run skipped the sky. */
export function FramePanel({ data, time, camera = 0 }: { data: SceneData; time: number; camera?: number }) {
  const suffix = (data.metadata?.num_views ?? 1) > 1 ? `/view-${camera}` : '';
  const frames = data.images.filter(image => image.name === `rgb${suffix}`).sort((a, b) => a.time - b.time);
  const image = latest(frames, time);
  // Runs that skipped the sky also show its mask, light blue over the darkened frame.
  const sky = latest(data.images.filter(entry => entry.name === `sky${suffix}`), time);
  if (!image) return null;
  return <>
    <figure className="frame-panel">
      <img src={image.url} alt="Input frame at the current time"/>
      <figcaption><span>Frame {frames.indexOf(image) + 1} / {frames.length}</span><span>{data.metadata?.frame_info?.[0]?.timestamp == null ? `t = ${image.time.toFixed(0)}` : `${image.time.toFixed(2)} s`}</span></figcaption>
    </figure>
    {sky && <>
      <div className="side-title"><h2>Sky mask</h2></div>
      <figure className="frame-panel">
        <img src={sky.url} alt="Sky mask at the current time"/>
        <figcaption>Blue marks excluded sky pixels</figcaption>
      </figure>
    </>}
  </>;
}

/** Before any result: the frames the current selection will send to the model. */
export function ClipPreview({ clip, range, start }: { clip: Clip; range: FrameRange; start?: number }) {
  return <div className="clip-preview">
    <div className="clip-preview-title"><strong>{clip.name}</strong><span>{sampledFrames(range).length} of {clip.frames} frames selected</span></div>
    <div className="clip-preview-grid">
      {sampledFrames(range).map((index, i) => <figure key={index} className={i === start ? 'start' : undefined}>
        <img src={frameUrl(clip.path, index, 320)} alt="" loading="lazy" style={{ aspectRatio: clip.width / clip.height }}/>
        <figcaption><span>{i + 1}</span>{clip.times ? `${clip.times[index].toFixed(2)} s` : `#${index}`}{i === start && <em>Start</em>}</figcaption>
      </figure>)}
    </div>
  </div>;
}
