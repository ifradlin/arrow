import type { CSSProperties, ReactNode } from 'react';

/** A titled section; `info` is the longer explanation, shown on hovering the "i" next to the title. */
export function Group({ title, hint, info, children, aside }: { title: string; hint?: ReactNode; info?: string; children?: ReactNode; aside?: ReactNode }) {
  return <section className="group">
    <div className="group-title"><h2>{title}{info && <Info text={info}/>}</h2>{aside}</div>
    {hint && <p className="hint">{hint}</p>}
    {children}
  </section>;
}

export function Segmented<T extends string | number>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (value: T) => void }) {
  return <div className="segmented" role="radiogroup" aria-label={label}>
    {options.map(option => <button key={option.value} role="radio" aria-checked={option.value === value} onClick={() => onChange(option.value)}>{option.label}</button>)}
  </div>;
}

/** Like `Segmented` for more options than fit one row: chips that wrap. */
export function Choices<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string; title?: string }[]; onChange: (value: T) => void }) {
  return <div className="choices" role="radiogroup" aria-label={label}>
    {options.map(option => <button key={option.value} className="chip" role="radio" aria-checked={option.value === value} title={option.title} onClick={() => onChange(option.value)}>{option.label}</button>)}
  </div>;
}

/** A labelled slider; `recommended` marks a suggested value on the track, with a button that returns to it. */
export function Slider({ label, name, value, min, max, step = 1, display, recommended, onChange }: {
  label: ReactNode; name?: string; value: number; min: number; max: number; step?: number; display?: ReactNode;
  recommended?: number; onChange: (value: number) => void;
}) {
  const percent = (v: number) => `${100 * (v - min) / Math.max(1e-9, max - min)}%`;
  return <div className="slider">
    <span className="slider-label"><span>{label}</span>
      <span className="slider-value">
        {recommended !== undefined && <button className="recommend" aria-label="Reset to the recommended value" title="Reset to the recommended value" disabled={Math.abs(value - recommended) < step / 2} onClick={() => onChange(recommended)}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.6-3.7M3 3v3h3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>Recommended</button>}
        <output>{display ?? value}</output>
      </span>
    </span>
    <span className="slider-track">
      <input aria-label={name ?? (typeof label === 'string' ? label : undefined)} type="range" min={min} max={max} step={step} value={value}
        style={{ '--fill': percent(value) } as CSSProperties} onChange={e => onChange(Number(e.target.value))}/>
      {recommended !== undefined && <i className="recommended-mark" style={{ left: percent(recommended) }} title="Recommended"/>}
    </span>
  </div>;
}

export function Switch({ id, label, checked, onChange }: { id?: string; label: ReactNode; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="switch"><span>{label}</span><input id={id} type="checkbox" role="switch" checked={checked} onChange={e => onChange(e.target.checked)}/></label>;
}

/** A frame box keeping the frame's own aspect: full width for landscape, at most `maxHeight` px tall for portrait. */
export const frameBox = (aspect: number, maxHeight = 420): CSSProperties => ({ aspectRatio: aspect, width: `min(100%, ${maxHeight * aspect}px)`, marginInline: 'auto' });

/** An "i" that shows `text` on hover or keyboard focus. */
export function Info({ text }: { text: string }) {
  return <span className="info" tabIndex={0} role="note" aria-label={text} data-tip={text}>i</span>;
}
