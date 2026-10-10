import { useEffect, useRef, useState } from 'react';
import { Segmented } from './ui';
import type { Region } from './types';

export function QueryInspector({ src, width, height, region, grid, points, spacing, onSpacing, showQueries, onShowQueries, onClose }: {
  src: string; width: number; height: number; region: Region; grid: [number[], number[]]; points: [number, number][];
  spacing: number; onSpacing: (spacing: number) => void; showQueries: boolean; onShowQueries: (show: boolean) => void; onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const imageSize = useRef({ width: 1, height: 1 });
  const pan = useRef<{ x: number; y: number; center: [number, number] } | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [view, setView] = useState({ zoom: 4, x: .5, y: .5 });
  const [dense, setDense] = useState(false);
  useEffect(() => { dialog.current?.showModal(); }, []);
  useEffect(() => {
    const image = new Image();
    image.onload = () => setImage(image);
    image.src = src;
    return () => { image.onload = null; };
  }, [src]);
  useEffect(() => {
    if (!image) return;
    const element = canvas.current!, context = element.getContext('2d')!;
    const draw = () => {
      const box = element.getBoundingClientRect(), scale = Math.min(window.devicePixelRatio, 2);
      element.width = Math.round(box.width * scale); element.height = Math.round(box.height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      const w = view.zoom ? image.naturalWidth * view.zoom : Math.min(box.width, box.height * width / height), h = w * height / width;
      imageSize.current = { width: w, height: h };
      const left = box.width / 2 - view.x * w, top = box.height / 2 - view.y * h;
      context.imageSmoothingEnabled = w < image.naturalWidth * 2;
      context.drawImage(image, left, top, w, h);
      const gap = Math.min(grid[0].length > 1 ? (grid[0][1] - grid[0][0]) * w : Infinity, grid[1].length > 1 ? (grid[1][1] - grid[1][0]) * h : Infinity);
      setDense(gap < 3);
      const accent = getComputedStyle(element).getPropertyValue('--accent').trim();
      if (showQueries && grid[0].length && grid[1].length) {
        if (gap < 3) {
          context.fillStyle = accent; context.globalAlpha = .2;
          context.fillRect(left + region[0] * w, top + region[1] * h, (region[2] - region[0]) * w, (region[3] - region[1]) * h);
          context.globalAlpha = 1;
        } else {
          const xs = grid[0].map(x => left + x * w).filter(x => x >= -2 && x <= box.width + 2);
          const ys = grid[1].map(y => top + y * h).filter(y => y >= -2 && y <= box.height + 2);
          context.beginPath();
          for (const y of ys) for (const x of xs) { context.moveTo(x + .9, y); context.arc(x, y, .9, 0, Math.PI * 2); }
          context.strokeStyle = '#000'; context.lineWidth = 1; context.stroke();
          context.fillStyle = '#fff'; context.fill();
        }
      }
      context.strokeStyle = '#fff'; context.lineWidth = 1;
      context.strokeRect(left + region[0] * w, top + region[1] * h, (region[2] - region[0]) * w, (region[3] - region[1]) * h);
      if (showQueries) for (const [u, v] of points) {
        context.beginPath(); context.arc(left + u * w, top + v * h, 4, 0, Math.PI * 2);
        context.fillStyle = accent; context.fill(); context.stroke();
      }
    };
    draw();
    const observer = new ResizeObserver(draw); observer.observe(element);
    return () => observer.disconnect();
  }, [image, width, height, region, grid, points, view, showQueries]);
  const zoom = (factor: number) => setView(view => ({ ...view, zoom: Math.min(16, Math.max(.25, (view.zoom || imageSize.current.width / image!.naturalWidth) * factor)) }));

  return <dialog ref={dialog} className="scene-dialog query-inspector" aria-labelledby="query-inspector-title" onCancel={onClose}>
    <div className="group-title"><h2 id="query-inspector-title">Inspect queries</h2><button onClick={onClose}>Done</button></div>
    <canvas ref={canvas} aria-label="Query preview: drag or use arrow keys to pan" tabIndex={0}
      onPointerDown={e => { e.currentTarget.focus(); e.currentTarget.setPointerCapture(e.pointerId); pan.current = { x: e.clientX, y: e.clientY, center: [view.x, view.y] }; }}
      onPointerMove={e => {
        if (!pan.current) return;
        const { x, y, center } = pan.current;
        setView(view => ({ ...view, x: Math.min(1, Math.max(0, center[0] - (e.clientX - x) / imageSize.current.width)), y: Math.min(1, Math.max(0, center[1] - (e.clientY - y) / imageSize.current.height)) }));
      }}
      onPointerUp={() => { pan.current = null; }} onPointerCancel={() => { pan.current = null; }}
      onKeyDown={e => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
        e.preventDefault(); e.stopPropagation();
        setView(view => ({ ...view, x: Math.min(1, Math.max(0, view.x + (e.key === 'ArrowRight' ? 40 : e.key === 'ArrowLeft' ? -40 : 0) / imageSize.current.width)), y: Math.min(1, Math.max(0, view.y + (e.key === 'ArrowDown' ? 40 : e.key === 'ArrowUp' ? -40 : 0) / imageSize.current.height)) }));
      }}/>
    <div className="row inspector-tools">
      <span className="hint">{showQueries ? dense ? 'Coverage preview' : 'Individual queries' : 'Image only'} · drag to pan</span>
      <div className="row inspector-zoom">
      <button aria-label="Zoom out" disabled={!image || view.zoom === .25} onClick={() => zoom(.5)}>−</button>
      <button aria-label="Fit image" onClick={() => setView({ zoom: 0, x: .5, y: .5 })}>{view.zoom ? `${Math.round(view.zoom * 100)}%` : 'Fit'}</button>
      <button aria-label="Zoom in" disabled={!image || view.zoom === 16} onClick={() => zoom(2)}>+</button>
      </div>
    </div>
    <div className="row"><span>Grid spacing</span><span className="spacer"/><span className="inspector-count" aria-live="polite">{(grid[0].length * grid[1].length).toLocaleString()} grid · {points.length} picked</span></div>
    <div className="row inspector-spacing">
      <Segmented label="Inspector grid spacing" value={spacing} options={[0, 1, 2, 4, 8, 16].map(value => ({ value, label: value ? `${value} px` : 'Grid off' }))} onChange={onSpacing}/>
      <label className="inspector-custom"><input aria-label="Inspector grid spacing in pixels" type="number" min={0} max={64} value={spacing} onChange={e => { if (e.target.value) onSpacing(Math.min(64, Math.max(0, Math.round(Number(e.target.value))))); }}/> px</label>
    </div>
    <label className="inspector-overlay"><input type="checkbox" checked={showQueries} onChange={e => onShowQueries(e.target.checked)}/> Show queries</label>
  </dialog>;
}
