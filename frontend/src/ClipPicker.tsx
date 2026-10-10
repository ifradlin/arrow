import { useState } from 'react';
import type { Clip, MediaSource } from './types';
import { request } from './api';
import { ServerBrowser, isImage, isVideo } from './ServerBrowser';

const MAX_UPLOAD_IMAGES = 1_000;

interface UploadGroup { name: string; files: File[]; selected: boolean; }

export const sourceParams = (path: MediaSource) => new URLSearchParams((Array.isArray(path) ? path : [path]).map(path => ['path', path]));
export const sourceKey = (path: MediaSource) => JSON.stringify(path);
export const frameUrl = (path: MediaSource, index: number, size: number) => `/api/frame?${sourceParams(path)}&${new URLSearchParams({ index: String(index), size: String(Math.max(320, size)) })}`;

const naturalOrder = (a: string, b: string) => a.localeCompare(b, undefined, {numeric: true});

export function ClipPicker({ host, start, current, onPick, onPickMany, onError }: {
  host: string; start: MediaSource | null; current?: MediaSource;
  onPick: (path: MediaSource) => void; onPickMany?: (paths: MediaSource[]) => void; onError: (message: string) => void;
}) {
  const [origin, setOrigin] = useState<'device' | 'server'>('device');
  const [uploading, setUploading] = useState(false);
  const [groups, setGroups] = useState<UploadGroup[]>([]);
  const chosen = groups.filter(group => group.selected);

  const pick = (paths: MediaSource[]) => {
    if (!onPickMany && paths.length > 1) { onError('Choose one input, or use Multi-view streams to add several cameras.'); return; }
    if (onPickMany) onPickMany(paths); else onPick(paths[0]);
  };
  const prepareUpload = (files: File[], folder: boolean) => {
    const media = files.filter(file => isImage(file.name) || isVideo(file.name));
    if (!media.length) { onError('No supported images or videos selected.'); return; }
    if (!folder && media.length !== files.length) { onError('Select only supported images or videos.'); return; }
    const sequences = new Map<string, UploadGroup>();
    for (const file of media) {
      const parent = folder ? file.webkitRelativePath.split('/').slice(0, -1).join('/') : '';
      const key = isVideo(file.name) ? `${parent}/${file.name}` : `${parent}/`;
      if (!sequences.has(key)) sequences.set(key, {name: isVideo(file.name) ? file.name : parent.split('/').at(-1) || (media.length === 1 ? file.name : 'Selected images'), files: [], selected: true});
      sequences.get(key)!.files.push(file);
    }
    const detected = [...sequences.entries()].sort(([a], [b]) => naturalOrder(a, b)).map(([, group]) => ({...group, files: group.files.sort((a, b) => naturalOrder(a.name, b.name))}));
    setGroups(detected);
    if (detected.length === 1 && detected[0].files.length <= MAX_UPLOAD_IMAGES) void upload(detected);
  };
  const upload = async (inputs = chosen) => {
    if (!onPickMany && inputs.length > 1) { onError('Choose one input, or use Multi-view streams to add several cameras.'); return; }
    setUploading(true);
    try {
      const paths: string[] = [];
      for (const group of inputs) {
        const form = new FormData(); group.files.slice(0, MAX_UPLOAD_IMAGES).forEach(file => form.append('files', file));
        form.append('name', group.name);
        const response = await request('/api/upload', { method: 'POST', body: form });
        paths.push((await response.json()).path);
      }
      pick(paths);
      setGroups([]);
    } catch (error) { onError(String(error)); } finally { setUploading(false); }
  };

  return <div className="browser">
    <div className="source-tabs" role="tablist" aria-label="Input location">
      <button role="tab" aria-selected={origin === 'device'} disabled={uploading} onClick={() => setOrigin('device')}>From device</button>
      <button role="tab" aria-selected={origin === 'server'} disabled={uploading} onClick={() => setOrigin('server')}>From server</button>
    </div>
    {origin === 'device' ? <>
      <p className="hint">Copy files from this device to {host || 'the server'}.</p>
      <details className="upload-menu">
        <summary className="button">Upload…</summary>
        <div>
          <label className="button ghost">Files…
            <input id="media-input" type="file" multiple accept=".jpg,.jpeg,.png,.webp,.bmp,.tif,.tiff,.mp4,.mov,.m4v,.avi,.mkv,.webm" hidden disabled={uploading} onChange={e => { const files = Array.from(e.target.files ?? []); e.target.value = ''; e.currentTarget.closest('details')?.removeAttribute('open'); if (files.length) prepareUpload(files, false); }}/>
          </label>
          <label className="button ghost">Folder…
            <input id="folder-input" type="file" multiple hidden disabled={uploading} ref={node => { node?.setAttribute('webkitdirectory', ''); }} onChange={e => { const files = Array.from(e.target.files ?? []); e.target.value = ''; e.currentTarget.closest('details')?.removeAttribute('open'); if (files.length) prepareUpload(files, true); }}/>
          </label>
        </div>
      </details>
      {!!groups.length && <>
        <ul className="upload-selection">
          {groups.map((group, index) => <li key={index}><label>
            <input type="checkbox" checked={group.selected} disabled={uploading} onChange={() => setGroups(groups.map((g, i) => i === index ? {...g, selected: !g.selected} : g))}/>
            <span>{group.name}<small>{isVideo(group.files[0].name) ? 'Video' : group.files.length > MAX_UPLOAD_IMAGES ? `Using the first ${MAX_UPLOAD_IMAGES.toLocaleString()} of ${group.files.length.toLocaleString()} images` : `${group.files.length} image${group.files.length === 1 ? '' : 's'}`}</small></span>
          </label></li>)}
        </ul>
        {groups.length > 1 && <p className="hint">Each selection is a separate camera input.</p>}
        <div className="row"><button className="primary" disabled={uploading || !chosen.length || (!onPickMany && chosen.length > 1)} onClick={() => void upload()}>{uploading ? 'Uploading…' : `Upload ${chosen.length > 1 ? `${chosen.length} inputs` : 'selected'}`}</button><button disabled={uploading} onClick={() => setGroups([])}>Clear</button></div>
        {!onPickMany && chosen.length > 1 && <p className="hint">Select one input here, or add multiple inputs in Multi-view streams.</p>}
      </>}
    </> : <ServerBrowser host={host} start={start} current={current} onPick={onPick} onPickMany={onPickMany} onError={onError}/>}
  </div>;
}

export function ClipCard({ clip, host, onChange, onRemove, onRename }: { clip: Clip; host: string; onChange: () => void; onRemove: () => void; onRename?: (name: string) => void }) {
  const fps = clip.times && clip.frames > 1 ? (clip.frames - 1) / (clip.times[clip.frames - 1] - clip.times[0]) : null;
  return <div className="clip-card">
    <img src={frameUrl(clip.path, 0, 160)} alt=""/>
    <div>
      {onRename ? <input type="text" aria-label="Camera name" value={clip.name} onChange={e => onRename(e.target.value)}/> : <strong title={Array.isArray(clip.path) ? clip.path.join('\n') : clip.path}>{clip.name}</strong>}
      <span>{clip.kind === 'video' ? 'Video' : clip.frames === 1 ? 'Image' : 'Images'} · {clip.frames} frame{clip.frames === 1 ? '' : 's'}{fps ? ` · ${Math.round(fps)} fps` : ''}</span>
      <span>{clip.origin === 'device' ? 'Uploaded from device' : `Server · ${host}`}</span>
      <div className="row clip-actions"><button id={onRename ? undefined : 'change-clip'} onClick={onChange}>Replace</button><button aria-label={`Remove ${clip.name}`} onClick={onRemove}>Remove</button></div>
    </div>
  </div>;
}
