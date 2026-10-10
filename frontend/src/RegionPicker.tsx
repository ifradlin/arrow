import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Segmented, frameBox } from './ui';
import { QueryInspector } from './QueryInspector';
import type { Region } from './types';

export const FULL: Region = [0, 0, 1, 1];
export const isFull = (region: Region) => region.every((value, i) => value === FULL[i]);
const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * The start frame: drag a region that the query grid fills, and (when `onPoints` is
 * given) click individual points. Coordinates are in [0, 1].
 */
/** `grid` holds the query pixels' normalized x and y positions; the dots are their product. */
export function RegionPicker({ src, width, height, region, grid, points = [], spacing, onSpacing, onRegion, onPoints }: {
  src: string; width: number; height: number; region: Region; grid: [number[], number[]];
  spacing: number; onSpacing: (spacing: number) => void;
  points?: [number, number][]; onRegion: (region: Region) => void; onPoints?: (points: [number, number][]) => void;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [inspecting, setInspecting] = useState(false);
  const [showQueries, setShowQueries] = useState(true);
  const [dense, setDense] = useState(false);
  const [tool, setTool] = useState<'region' | 'points'>('region');
  const [drag, setDrag] = useState<Region | null>(null);
  const shown = drag ? [Math.min(drag[0], drag[2]), Math.min(drag[1], drag[3]), Math.max(drag[0], drag[2]), Math.max(drag[1], drag[3])] as Region : region;
  useEffect(() => {
    const element = canvas.current!;
    const context = element.getContext('2d')!;
    const draw = () => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      const scale = Math.min(window.devicePixelRatio, 2);
      element.width = Math.round(width * scale); element.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      const gap = Math.min(grid[0].length > 1 ? (grid[0][1] - grid[0][0]) * width : Infinity, grid[1].length > 1 ? (grid[1][1] - grid[1][0]) * height : Infinity);
      setDense(gap < 3);
      if (gap < 3 && grid[0].length && grid[1].length) {
        context.fillStyle = getComputedStyle(element).getPropertyValue('--accent').trim(); context.globalAlpha = .3;
        context.fillRect(region[0] * width, region[1] * height, (region[2] - region[0]) * width, (region[3] - region[1]) * height);
        return;
      }
      const size = 1;
      // The grid is a product of two axes; paint one row and repeat it at each y.
      const row = document.createElement('canvas');
      row.width = element.width; row.height = Math.ceil(scale);
      const dots = row.getContext('2d')!;
      dots.fillStyle = '#fff';
      for (const x of grid[0]) dots.fillRect(x * row.width - size * scale / 2, 0, size * scale, row.height);
      for (const y of grid[1]) context.drawImage(row, 0, y * height - size / 2, width, size);
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(element);
    return () => observer.disconnect();
  }, [grid, width, height, region]);

  const at = (e: PointerEvent): [number, number] => {
    const rect = frame.current!.getBoundingClientRect();
    return [clamp((e.clientX - rect.left) / rect.width), clamp((e.clientY - rect.top) / rect.height)];
  };

  return <div className="region-picker">
    <div className="row query-preview-tools"><span className="hint">{showQueries ? dense ? 'Coverage preview' : 'Query dots' : 'Image only'}</span><span className="spacer"/><button onClick={() => setInspecting(true)}>Inspect ↗</button></div>
    <div ref={frame} className={`first-frame tool-${onPoints ? tool : 'region'}`} style={frameBox(width / height, 240)} id="first-frame"
      onPointerDown={e => {
        const [u, v] = at(e);
        if (onPoints && tool === 'points') { onPoints([...points, [u, v]]); return; }
        e.currentTarget.setPointerCapture(e.pointerId); setDrag([u, v, u, v]);
      }}
      onPointerMove={e => { if (drag) setDrag([drag[0], drag[1], ...at(e)]); }}
      onPointerUp={() => {
        if (!drag) return;
        setDrag(null);
        if (shown[2] - shown[0] > .02 && shown[3] - shown[1] > .02) onRegion(shown);
      }}>
      <img src={src} alt="Start frame" draggable={false}/>
      <div className="region" style={{ left: `${shown[0] * 100}%`, top: `${shown[1] * 100}%`, width: `${(shown[2] - shown[0]) * 100}%`, height: `${(shown[3] - shown[1]) * 100}%` }}/>
      <canvas ref={canvas} className="query-grid" aria-hidden="true" style={{ visibility: drag || !showQueries ? 'hidden' : undefined }}/>
      <svg style={{ visibility: showQueries ? undefined : 'hidden' }} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
        {points.map(([u, v], i) => <circle key={i} className="pick" r={Math.max(width, height) / 110} cx={u * width} cy={v * height}/>)}
      </svg>
    </div>
    <div className="row">
      {onPoints && <Segmented label="Selection tool" value={tool} options={[{ value: 'region', label: 'Region' }, { value: 'points', label: 'Points' }]} onChange={setTool}/>}
      <span className="spacer"/>
      <button id="full-frame" disabled={isFull(region)} onClick={() => onRegion(FULL)}>Full frame</button>
      {onPoints && <button id="clear-points" disabled={!points.length} onClick={() => onPoints([])}>Clear {points.length || ''}</button>}
    </div>
    <label className="inspector-overlay"><input type="checkbox" checked={showQueries} onChange={e => setShowQueries(e.target.checked)}/> Show queries</label>
    {inspecting && <QueryInspector src={src} width={width} height={height} region={region} grid={grid} points={points} spacing={spacing} onSpacing={onSpacing}
      showQueries={showQueries} onShowQueries={setShowQueries} onClose={() => setInspecting(false)}/>}
  </div>;
}
