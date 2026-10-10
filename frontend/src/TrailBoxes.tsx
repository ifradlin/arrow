import { useMemo, useRef, useState, type PointerEvent } from 'react';
import { gradientImage } from './palette';
import { Segmented, frameBox } from './ui';
import type { ColorBox, GradientMode, Region, Settings } from './types';

export const GRADIENTS: { value: GradientMode; label: string }[] = [
  { value: 'x', label: 'Across' }, { value: 'xy', label: 'Corners' }, { value: 'y', label: 'Down' }, { value: 'wheel', label: 'Wheel' }, { value: 'bands', label: 'Bands' },
];

/**
 * The frame tracks were seeded on, with the colour each trail gets where it starts. Drag
 * to add a box: tracks seeded inside it take its gradient, stretched over the box.
 */
export function TrailBoxes({ image, aspect, sourceFrame, settings, onChange }: { image?: string; aspect: number; sourceFrame: number; settings: Settings; onChange: (value: Partial<Settings>) => void }) {
  const frame = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<Region | null>(null);
  const boxes = settings.trailBoxes.filter(box => box.sourceFrame === undefined || box.sourceFrame === sourceFrame);
  const pictures = useMemo(() => Object.fromEntries(GRADIENTS.map(({ value }) => [value, gradientImage(value)])), []);
  const at = (event: PointerEvent): [number, number] => {
    const rect = frame.current!.getBoundingClientRect();
    return [Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)), Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))];
  };
  const normalized = ([u0, v0, u1, v1]: Region): Region => [Math.min(u0, u1), Math.min(v0, v1), Math.max(u0, u1), Math.max(v0, v1)];
  const outline = (rect: Region) => ({ left: `${rect[0] * 100}%`, top: `${rect[1] * 100}%`, width: `${(rect[2] - rect[0]) * 100}%`, height: `${(rect[3] - rect[1]) * 100}%` });
  const setBoxes = (trailBoxes: ColorBox[]) => onChange({ trailBoxes: [...settings.trailBoxes.filter(box => box.sourceFrame !== undefined && box.sourceFrame !== sourceFrame), ...trailBoxes] });

  return <div className="trail-boxes">
    <Segmented label={boxes.length ? 'Gradient of new boxes' : 'Gradient'} value={settings.trailGradient} options={GRADIENTS} onChange={trailGradient => onChange({ trailGradient })}/>
    <div ref={frame} className="box-frame" style={frameBox(aspect)} id="trail-boxes"
      onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); const [u, v] = at(e); setDrag([u, v, u, v]); }}
      onPointerMove={e => { if (drag) setDrag([drag[0], drag[1], ...at(e)]); }}
      onPointerUp={() => {
        if (!drag) return;
        const rect = normalized(drag);
        setDrag(null);
        if (rect[2] - rect[0] > .01 && rect[3] - rect[1] > .01) setBoxes([...boxes, { rect, mode: settings.trailGradient, sourceFrame }]);
      }}>
      {image && <img src={image} alt="Frame the tracks start on" draggable={false}/>}
      {(!boxes.length || settings.trailOutside === 'gradient') && <img className="box-gradient" src={pictures[settings.trailGradient]} alt=""/>}
      {boxes.length > 0 && settings.trailOutside === 'grey' && <div className="box-grey"/>}
      {boxes.map((box, index) => <div key={index} className="box" style={outline(box.rect)}><img src={pictures[box.mode]} alt=""/><span>{index + 1}</span></div>)}
      {drag && <div className="box-drag" style={outline(normalized(drag))}/>}
    </div>
    {boxes.length > 0 && <>
      {boxes.map((box, index) => <div key={index} className="box-row">
        <span>{index + 1}</span>
        <select aria-label={`Box ${index + 1} gradient`} value={box.mode} onChange={e => setBoxes(boxes.map((other, i) => i === index ? { ...other, mode: e.target.value as GradientMode } : other))}>
          {GRADIENTS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <button className="icon-button" aria-label={`Remove box ${index + 1}`} onClick={() => setBoxes(boxes.filter((_, i) => i !== index))}>×</button>
      </div>)}
      <div className="field">
        <span className="field-label">Outside the boxes</span>
        <Segmented label="Outside the boxes" value={settings.trailOutside} options={[{ value: 'grey', label: 'Grey' }, { value: 'rgb', label: 'RGB' }, { value: 'gradient', label: 'Gradient' }]} onChange={trailOutside => onChange({ trailOutside })}/>
      </div>
    </>}
  </div>;
}
