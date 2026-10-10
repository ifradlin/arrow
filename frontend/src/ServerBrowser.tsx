import { useEffect, useState } from 'react';
import type { MediaSource } from './types';
import { request } from './api';

interface Entry { name: string; path: string; }
interface Listing { path: string; parent: string | null; folders: (Entry & { images: number | null })[]; videos: Entry[]; images: number; image_files: Entry[]; scenes: Entry[]; file?: string; }
type Props = {
  host: string; start: MediaSource | null; current?: MediaSource; onError: (message: string) => void;
} & ({
  kind: 'scene'; onPick: (path: string) => void; onPickMany?: never;
} | {
  kind?: 'media'; onPick: (path: MediaSource) => void; onPickMany?: (paths: MediaSource[]) => void;
});

const FolderIcon = () => <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 4.2c0-.7.6-1.2 1.2-1.2h3.4l1.4 1.5h5.8c.7 0 1.2.5 1.2 1.2v6.6c0 .7-.5 1.2-1.2 1.2H2.7c-.6 0-1.2-.5-1.2-1.2z" fill="currentColor"/></svg>;
const FilmIcon = () => <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="3" width="13" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3"/><path d="m6.5 5.8 3.6 2.2-3.6 2.2z" fill="currentColor"/></svg>;
const ImagesIcon = () => <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="3" width="13" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3"/><path d="m3.5 11 3-3.5 2.2 2.4 1.5-1.4 2.3 2.5z" fill="currentColor"/><circle cx="10.8" cy="6" r="1.1" fill="currentColor"/></svg>;
const FileIcon = () => <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 1.5h6l4 4v9H3zM9 1.5v4h4" fill="none" stroke="currentColor" strokeWidth="1.3"/></svg>;
export const isImage = (name: string) => /\.(jpe?g|png|webp|bmp|tiff?)$/i.test(name);
export const isVideo = (name: string) => /\.(mp4|mov|m4v|avi|mkv|webm)$/i.test(name);

export function ServerBrowser(props: Props) {
  const {host, start, current, onPick, onPickMany, onError} = props;
  const scene = props.kind === 'scene';
  const [at, setAt] = useState<string | null>(Array.isArray(start) ? start[0] : start);
  const [typed, setTyped] = useState('');
  const [listing, setListing] = useState<Listing | null>(null);
  const [pending, setPending] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const files = listing ? scene ? listing.scenes : [...listing.videos, ...listing.image_files] : [];
  const toggle = (path: string) => setSelected(paths => scene ? [path] : paths.includes(path) ? paths.filter(p => p !== path) : [...paths, path]);
  const browse = async (path: string | null, signal?: AbortSignal): Promise<Listing> => {
    const response = await request(`/api/browse${path ? `?${new URLSearchParams({ path })}` : ''}`, {signal});
    return response.json();
  };
  const show = (next: Listing) => {
    setListing(next); setTyped(next.path);
    setSelected([...next.videos, ...next.image_files].filter(file => file.path === current).map(file => file.path));
  };
  useEffect(() => {
    const controller = new AbortController();
    setPending(true);
    browse(at, controller.signal).then(show)
      .catch(error => { if (!controller.signal.aborted) onError(String(error)); })
      .finally(() => { if (!controller.signal.aborted) setPending(false); });
    return () => controller.abort();
  }, [at]);
  const open = (path: string) => {
    if (scene && /\.(json|npz)$/i.test(path)) return onPick(path);
    return browse(path).then(next => {
      if (next.file) onPick(next.file);
      else { setAt(next.path); show(next); }
    }).catch(error => onError(String(error)));
  };
  const pickSelected = () => {
    if (props.kind === 'scene') { props.onPick(selected[0]); return; }
    if (!listing) return;
    const images = listing.image_files.filter(file => selected.includes(file.path)).map(file => file.path);
    const streams: MediaSource[] = [...listing.folders, ...listing.videos].filter(file => selected.includes(file.path)).map(file => file.path);
    if (images.length) streams.push(images.length === 1 ? images[0] : images);
    if (!props.onPickMany && streams.length > 1) { onError('Choose one input, or use Multi-view streams to add several cameras.'); return; }
    if (props.onPickMany) props.onPickMany(streams); else props.onPick(streams[0]);
  };

  return <div className="browser">
    <p className="hint">Open files on {host || 'the server'} directly, without uploading.</p>
    <form className="path-bar" onSubmit={e => { e.preventDefault(); if (typed.trim()) void open(typed.trim()); }}>
      <button type="button" className="icon-button" aria-label="Parent folder" disabled={!listing?.parent} onClick={() => setAt(listing!.parent)}>‹</button>
      <input id={scene ? 'scene-path-input' : 'path-input'} disabled={pending} aria-label="Path on the server" value={typed} spellCheck={false} placeholder="Folder or file path" onChange={e => setTyped(e.target.value)} onFocus={e => e.target.select()}/>
      <button type="submit" disabled={pending} className="icon-button" aria-label="Open path">↵</button>
    </form>
    <ul className="browser-list" id={scene ? 'scene-browser' : 'clip-browser'}>
      {!listing && <li className="browser-empty">{pending ? 'Loading…' : 'Enter a folder or file path'}</li>}
      {!scene && !!listing?.images && <li><button className="browser-row use-folder" onClick={() => onPick(listing.path)}><ImagesIcon/><span>Use all {listing.images} images in this folder</span></button></li>}
      {listing?.folders.map(folder => <li key={folder.path} className="browser-select-row">{onPickMany && (folder.images ?? 0) > 0 && <input type="checkbox" aria-label={`Select ${folder.name}`} checked={selected.includes(folder.path)} onChange={() => toggle(folder.path)}/>}<button className="browser-row" disabled={folder.images === null} onClick={() => setAt(folder.path)}><FolderIcon/><span>{folder.name}</span><i>{folder.images === null ? 'Unavailable' : '›'}</i></button></li>)}
      {files.map(file => <li key={file.path} className="browser-select-row">
        <input type={scene ? 'radio' : 'checkbox'} name={scene ? 'saved-scene' : undefined} aria-label={`Select ${file.name}`} checked={selected.includes(file.path)} onChange={() => toggle(file.path)}/>
        <button className="browser-row" aria-current={file.path === current || undefined} onClick={() => toggle(file.path)}>{scene ? <FileIcon/> : isImage(file.name) ? <ImagesIcon/> : <FilmIcon/>}<span>{file.name}</span></button>
      </li>)}
      {listing && !listing.folders.length && !files.length && <li className="browser-empty">{scene ? 'No folders or saved scenes here' : 'No folders, videos or images here'}</li>}
    </ul>
    <div className="row">
      {!scene && <button disabled={!listing} onClick={() => setSelected(listing ? [...(onPickMany ? listing.folders.filter(folder => folder.images) : []), ...files].map(file => file.path) : [])}>Select all</button>}
      <button className="primary" disabled={!selected.length} onClick={pickSelected}>{scene ? 'Open selected' : `Add selected (${selected.length})`}</button>
    </div>
  </div>;
}
