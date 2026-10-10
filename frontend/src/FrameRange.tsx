import { useRef, useState, type KeyboardEvent } from 'react';
import { frameUrl } from './ClipPicker';
import type { Clip, FrameRange as Range } from './types';

const THUMBNAILS = 10;

/** Explicit samples, or the frames of `start:stop:step` as in a Python slice. */
export const sampledFrames = ({ start, stop, step, indices }: Range) => indices ?? Array.from({ length: Math.max(0, Math.ceil((stop - start) / step)) }, (_, i) => start + i * step);
export const frameCount = (range: Range) => sampledFrames(range).length;
/** Exactly `count` frames spread between both ends of [start, stop), or all if shorter. */
export function spread(stop: number, count: number, start = 0): Range {
  count = Math.min(stop - start, count);
  return { start, stop, step: 1, indices: Array.from({ length: count }, (_, i) => start + Math.round(i * (stop - start - 1) / Math.max(1, count - 1))) };
}

export function initialRange(frames: number, loader: { start: number; stride: number; max_frames: number }): Range {
  if (loader.start === 0 && loader.stride === 1) return spread(frames, loader.max_frames);
  const start = Math.min(loader.start, frames - 1);
  return { start, stop: Math.min(frames, start + (loader.max_frames - 1) * loader.stride + 1), step: loader.stride };
}

function NumberField({ label, value, min, max, onChange }: { label: string; value: number | ''; min: number; max: number; onChange: (value: number) => void }) {
  return <label className="number-field"><span>{label}</span>
    <input type="number" aria-label={label} value={value} placeholder={value === '' ? 'Auto' : undefined} title={value === '' ? 'Enter a fixed step to replace the frame-count preset' : undefined} min={min} max={max} onChange={e => { const v = Math.round(Number(e.target.value)); if (Number.isFinite(v)) onChange(Math.min(max, Math.max(min, v))); }}/>
  </label>;
}

/** Trim the clip and select an exact frame count or a fixed step. */
export function FrameRange({ clip, range, onChange }: { clip: Clip; range: Range; onChange: (range: Range) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<'start' | 'end' | null>(null);
  const last = clip.frames - 1;
  const at = (index: number) => `${last ? 100 * index / last : 0}%`;
  const frames = sampledFrames(range);
  const end = range.stop - 1;

  const indexAt = (clientX: number) => {
    const rect = track.current!.getBoundingClientRect();
    return Math.round(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) * last);
  };
  const bounds = (start: number, stop: number) => onChange(range.indices ? spread(stop, range.indices.length, start) : { ...range, start, stop });
  const move = (handle: 'start' | 'end', index: number) =>
    handle === 'start' ? bounds(Math.min(index, end), range.stop) : bounds(range.start, Math.max(index, range.start) + 1);
  const time = (index: number) => clip.times ? `${clip.times[index].toFixed(2)} s` : `#${index}`;
  const key = (handle: 'start' | 'end', value: number) => (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') move(handle, Math.min(last, Math.max(0, value + (e.key === 'ArrowLeft' ? -1 : 1))));
  };

  return <div className="frame-range">
    <div ref={track} className="trim" id="frame-trim"
      onPointerDown={e => {
        const index = indexAt(e.clientX);
        const handle = Math.abs(index - range.start) <= Math.abs(index - end) ? 'start' : 'end';
        e.currentTarget.setPointerCapture(e.pointerId); setDragging(handle); move(handle, index);
      }}
      onPointerMove={e => { if (dragging) move(dragging, indexAt(e.clientX)); }}
      onPointerUp={() => setDragging(null)} onPointerCancel={() => setDragging(null)}>
      <div className="filmstrip">{Array.from({ length: Math.min(THUMBNAILS, clip.frames) }, (_, i) => <img key={i} draggable={false} alt="" src={frameUrl(clip.path, Math.round(i * last / Math.max(1, Math.min(THUMBNAILS, clip.frames) - 1)), 160)}/>)}</div>
      <div className="trim-shade" style={{ left: 0, width: at(range.start) }}/>
      <div className="trim-shade" style={{ left: at(end), right: 0 }}/>
      <div className="trim-window" style={{ left: at(range.start), width: `calc(${at(end)} - ${at(range.start)})` }}>
        <span className="trim-handle start" role="slider" aria-label="First frame" aria-valuemin={0} aria-valuemax={last} aria-valuenow={range.start} tabIndex={0} onKeyDown={key('start', range.start)}/>
        <span className="trim-handle end" role="slider" aria-label="Last frame" aria-valuemin={0} aria-valuemax={last} aria-valuenow={end} tabIndex={0} onKeyDown={key('end', end)}/>
      </div>
      {frames.map(index => <span key={index} className="trim-tick" style={{ left: at(index) }}/>)}
    </div>
    <div className="trim-times"><span>{time(range.start)}</span><span>{time(end)}</span></div>
    <div className="slice-fields">
      <NumberField label="Start" value={range.start} min={0} max={end} onChange={start => bounds(start, range.stop)}/>
      <NumberField label="Stop" value={range.stop} min={range.start + 1} max={clip.frames} onChange={stop => bounds(range.start, stop)}/>
      <NumberField label="Step" value={range.indices ? '' : range.step} min={1} max={Math.max(1, clip.frames)} onChange={step => onChange({ start: range.start, stop: range.stop, step })}/>
    </div>
    <div className="row">
      <span className="hint grow" id="frame-summary"><strong>{frames.length}</strong> frame{frames.length === 1 ? '' : 's'} · {range.indices ? 'evenly spaced' : <code>[{range.start}:{range.stop}:{range.step}]</code>}</span>
      <span className="chips" aria-label="Choose frame count">{[2, 4, 8, 16, 24].filter(n => n < clip.frames).map(n =>
        <button key={n} className="chip" aria-pressed={range.start === 0 && range.stop === clip.frames && range.indices?.length === n} onClick={() => onChange(spread(clip.frames, n))}>{n}</button>)}
        <button className="chip" aria-pressed={!range.indices && range.start === 0 && range.stop === clip.frames && range.step === 1} onClick={() => onChange({ start: 0, stop: clip.frames, step: 1 })}>All</button>
      </span>
    </div>
  </div>;
}
