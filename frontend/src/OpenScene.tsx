import { useEffect, useRef, useState } from 'react';
import { ServerBrowser } from './ServerBrowser';

export function OpenScene({host, root, onOpen, onClose}: {
  host: string; root: string; onOpen: (source: File | string) => Promise<void>; onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [origin, setOrigin] = useState<'device' | 'server'>('device');
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { dialog.current?.showModal(); }, []);
  const open = async (source: File | string) => {
    setError(''); setOpening(true);
    try { await onOpen(source); onClose(); }
    catch (error) { setError(String(error)); }
    finally { setOpening(false); }
  };

  return <dialog ref={dialog} className="scene-dialog" aria-labelledby="open-scene-title" onCancel={e => { if (opening) e.preventDefault(); else onClose(); }}>
    <div className="group-title"><h2 id="open-scene-title">Open saved results</h2><button className="icon-button" aria-label="Close Open dialog" disabled={opening} onClick={onClose}>×</button></div>
    <p className="hint">Open predictions (.npz) or a saved view (.json) in a new tab.</p>
    <fieldset disabled={opening}>
      <div className="source-tabs" role="tablist" aria-label="Saved file location">
        <button role="tab" aria-selected={origin === 'device'} onClick={() => { setOrigin('device'); setError(''); }}>From device</button>
        <button role="tab" aria-selected={origin === 'server'} onClick={() => { setOrigin('server'); setError(''); }}>From server</button>
      </div>
      {origin === 'device' ? <>
        <p className="hint">Upload a saved file from this device.</p>
        <label className="button">Choose file…<input id="load-scene" type="file" accept=".json,.npz" hidden onChange={e => { if (e.target.files?.[0]) void open(e.target.files[0]); e.target.value = ''; }}/></label>
      </> : <ServerBrowser kind="scene" host={host} start={root} onPick={path => void open(path)} onError={setError}/>}
    </fieldset>
    {opening && <p role="status">Opening…</p>}
    {error && <p role="alert" className="open-error">{error}</p>}
  </dialog>;
}
