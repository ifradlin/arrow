import { useState } from 'react';
import { ClipPicker, ClipCard, sourceKey } from './ClipPicker';
import type { Clip, MediaSource } from './types';

export function StreamPicker({ streams, host, root, onChange, onAdd, onError }: {
  streams: Clip[]; host: string; root: string; onChange: (streams: Clip[]) => void;
  onAdd: (paths: MediaSource[], replace?: number) => Promise<void>; onError: (message: string) => void;
}) {
  const [picking, setPicking] = useState(false);
  const [replace, setReplace] = useState<number | undefined>();
  const add = async (paths: MediaSource[]) => { await onAdd(paths, replace); setPicking(false); setReplace(undefined); };
  return <>
    <p className="hint">One video or image sequence per camera.</p>
    <ol className="stream-list">
      {streams.map((clip, index) => <li key={sourceKey(clip.path)}>
        <ClipCard clip={clip} host={host} onChange={() => { setReplace(index); setPicking(true); }}
          onRemove={() => { setPicking(false); setReplace(undefined); onChange(streams.filter((_, i) => i !== index)); }}
          onRename={name => onChange(streams.map((stream, i) => i === index ? {...stream, name} : stream))}/>
      </li>)}
    </ol>
    {picking || !streams.length
      ? <><ClipPicker host={host} start={replace === undefined ? root : streams[replace].path}
          onPick={path => void add([path])} onPickMany={replace === undefined ? paths => void add(paths) : undefined} onError={onError}/>
          {!!streams.length && <button onClick={() => { setPicking(false); setReplace(undefined); }}>Done</button>}</>
      : <button className="wide" onClick={() => { setReplace(undefined); setPicking(true); }}>Add cameras…</button>}
  </>;
}
