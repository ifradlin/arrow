import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import { SceneRenderer } from './renderer';
import { defaultSettings, type Clip, type MediaSource, type FrameRange as Range, type Plans, type Presentation, type SceneData, type Settings, type Task, type TaskOptions } from './types';
import { ClipCard, ClipPicker, sourceParams, sourceKey } from './ClipPicker';
import { StreamPicker } from './StreamPicker';
import { OpenScene } from './OpenScene';
import { FrameRange, sampledFrames, initialRange } from './FrameRange';
import { DisplayPanel } from './Panels';
import { MULTIVIEW_TASKS, TASKS, TaskPanel, taskRequest } from './TaskPanel';
import { ClipPreview, DepthView, FramePanel } from './Views';
import { TabStrip, type PendingTab } from './Tabs';
import { Group, Info, Segmented, Slider } from './ui';
import { request } from './api';
import './style.css';

type InputSource = MediaSource | [string, MediaSource][];
const isStreams = (source: InputSource): source is [string, MediaSource][] => Array.isArray(source) && Array.isArray(source[0]);

interface Status { state: string; stage: string; detail: string; steps: { stage: string; seconds: number }[]; progress: number; revision: string; scene_key: string; presentation: Presentation; has_result: boolean; clip: [InputSource, number, number, number, number[]?] | null; encoded: boolean; peak_bytes: number | null; tabs: { id: number; name: string }[]; active: number; }
/** configs/viewer.py's starting values: `tasks`, `skip_sky` and the strides for the Input tab, `display` for the Display tab. */
interface Config {
  root: string; results_root: string; host: string; example: string | null; loader: { start: number; stride: number; max_frames: number; max_side: number }; decode_chunk_size: number; checkpoint: string; device: string | null;
  tasks: Task[]; skip_sky: boolean; track_stride: number; reconstruction_stride: number; depth_stride: number; all_pixels_stride: number;
  display: Record<string, unknown>; browser_memory_gb: number;
}
/** `trail_width` to `trailWidth`: the config's display keys are the viewer's settings in snake case. */
const camel = (values: Record<string, unknown>) => Object.fromEntries(Object.entries(values).map(([key, value]) => [key.replace(/_(.)/g, (_, c: string) => c.toUpperCase()), value]));
const taskDefaults = (config: Config): TaskOptions => ({
  tasks: config.tasks, reconstructionStride: config.reconstruction_stride,
  depthStride: config.depth_stride, trackStride: config.track_stride,
  allPixelsStride: config.all_pixels_stride, sourceFrame: 0, region: [0, 0, 1, 1], points: [],
  chunk: config.decode_chunk_size, skipSky: config.skip_sky,
});
const post = (path: string, body: unknown) => request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob), link = document.createElement('a');
  link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const TABS = ['Input', 'Display'] as const;
const SPEEDS = [0.25, 0.5, 1, 2, 4];
/** Layers of one kind merge: tracking layers into one set of tracks, reconstructions into one cloud. */
const MERGE_KIND: Partial<Record<string, string>> = { track: 'tracks', all_pixels: 'tracks', reconstruct: 'reconstruction' };

const EyeIcon = ({ open }: { open: boolean }) => <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
  <path d="M1.5 8s2.4-4.5 6.5-4.5S14.5 8 14.5 8 12.1 12.5 8 12.5 1.5 8 1.5 8z" fill="none" stroke="currentColor" strokeWidth="1.3"/>
  {open ? <circle cx="8" cy="8" r="2" fill="currentColor"/> : <path d="M2.5 13.5l11-11" stroke="currentColor" strokeWidth="1.3"/>}
</svg>;

/** A window with one side bar shaded: the toggle for that side's panel. */
const PanelIcon = ({ side }: { side: 'left' | 'right' }) => <svg viewBox="0 0 16 16" aria-hidden="true" width="16" height="16">
  <rect x="1.5" y="2.5" width="13" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3"/>
  <rect x={side === 'left' ? 2.5 : 9.5} y="3.5" width="4" height="9" rx="1" fill="currentColor" opacity=".7"/>
</svg>;
/** What each server stage is doing, in the order a run goes through them. */
const STAGES: Record<string, string> = {
  starting: 'Starting', 'loading model': 'Loading the model', 'reading frames': 'Reading and resizing frames',
  'segmenting sky': 'Segmenting the sky', encoding: 'Encoding the clip', decoding: 'Decoding queries', 'building scene': 'Building the scene',
};
/** A stage, with the task it belongs to when the server says (`decoding:track`). */
const stageName = (stage: string) => {
  const [name, task] = stage.split(':');
  return (STAGES[name] ?? name[0]?.toUpperCase() + name.slice(1)) + (task ? ` · ${TASKS.find(item => item.value === task)?.label ?? task}` : '');
};

/** The finished stages of a run with their times, then the current one with its progress. */
function RunSteps({ status, receiving }: { status: Status; receiving: boolean }) {
  const running = status.state === 'running';
  return <ol className="run-steps">
    {status.steps.map((step, i) => <li key={i} className="done"><span>{stageName(step.stage)}</span><small>{step.seconds.toFixed(1)} s</small></li>)}
    {running && <li className="active">
      <span>{stageName(status.stage)}</span><small>{status.stage.startsWith('decoding') ? `${Math.round(status.progress * 100)}%` : ''}</small>
      {status.detail && <em>{status.detail}</em>}
      <progress value={status.stage.startsWith('decoding') ? status.progress : undefined} max={1}/>
    </li>}
    {!running && receiving && <li className="active"><span>Loading the scene into the viewer</span><small/><progress max={1}/></li>}
  </ol>;
}

/** Approximate parsed JSON memory; numeric scene arrays are rectangular. */
function sceneBytes(value: unknown): number {
  if (typeof value === 'string') return 24 + value.length * 2;
  if (Array.isArray(value)) {
    const children = value.length && Array.isArray(value[0]) ? value.length * sceneBytes(value[0])
      : value.reduce((size: number, item: unknown) => size + sceneBytes(item), 0);
    return 32 + value.length * 8 + children;
  }
  if (value && typeof value === 'object') return 64 + Object.entries(value).reduce((size, [key, item]) => size + 32 + key.length * 2 + sceneBytes(item), 0);
  return 0; // Numbers and booleans occupy the slots counted above.
}

function App({ config }: { config: Config }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const renderer = useRef<SceneRenderer | null>(null);
  const [data, setData] = useState<SceneData | null>(null);
  const defaults = {...defaultSettings, ...camel(config.display)} as Settings;
  const [settings, setSettings] = useState<Settings>(defaults);
  const [displayUndo, setDisplayUndo] = useState<Partial<Settings> | null>(null);
  const [status, setStatus] = useState<Status>({state:'idle',stage:'',detail:'',steps:[],progress:0,revision:'',scene_key:'',presentation:{},has_result:false,clip:null,encoded:false,peak_bytes:null,tabs:[],active:0});
  const [error, setError] = useState('');
  const [opening, setOpening] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const clipDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (choosing) clipDialog.current?.showModal(); }, [choosing]);
  const [tab, setTab] = useState<typeof TABS[number]>('Input');
  const [singleClip, setClip] = useState<Clip | null>(null);
  const [inputMode, setInputMode] = useState<'images' | 'streams'>('images');
  const [streams, setStreams] = useState<Clip[]>([]);
  const activeView = Math.min(settings.inputCamera, Math.max(0, (data?.metadata?.num_views ?? 1) - 1));
  const multi = inputMode === 'streams';
  const clip = multi ? streams[0] && {...streams[0], frames: Math.min(...streams.map(stream => stream.frames))} : singleClip;
  const [browsing, setBrowsing] = useState(false);
  const [range, setRange] = useState<Range>({start:0,stop:1,step:1});
  const [selectedOptions, setOptions] = useState<TaskOptions>(() => taskDefaults(config));
  const options = multi ? {...selectedOptions, tasks: selectedOptions.tasks.filter(task => MULTIVIEW_TASKS.includes(task))} : selectedOptions;
  const [planned, setPlan] = useState<{requestKey: string; previewKey: string; result: Plans} | null>(null);
  const [planError, setPlanError] = useState('');
  const [counts, setCounts] = useState({still:0,moving:0});
  const [selectedView, setView] = useState<'3d' | 'depth'>('3d');
  const [time, setTime] = useState(0);
  const frameTimes = useMemo(() => {
    if (!data) return [];
    const times = data.images.filter(image => image.name.split('/')[0] === 'rgb').map(image => image.time);
    return [...new Set(times.length ? times : [...data.images.map(image => image.time), ...data.points.map(points => points.time), ...data.cameras.map(camera => camera.time), ...data.tracks.flatMap(track => track.times)])].sort((a, b) => a - b);
  }, [data]);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  // From the server finishing a run until its scene is fetched and drawn here.
  const [receiving, setReceiving] = useState(false);
  const [pendingTab, setPendingTab] = useState<PendingTab>(null);
  const [merging, setMerging] = useState<number[]>([]);
  // Which side bars are open, remembered per browser: the controls on the left, the input video on the right.
  const [panels, setPanels] = useState(() => { try { return { left: localStorage.getItem('arrow.left') !== 'off', right: localStorage.getItem('arrow.right') !== 'off' }; } catch { return { left: true, right: true }; } });
  const togglePanel = (side: 'left' | 'right') => setPanels(previous => {
    const next = { ...previous, [side]: !previous[side] };
    try { localStorage.setItem(`arrow.${side}`, next[side] ? 'on' : 'off'); } catch { /* storage may be unavailable */ }
    return next;
  });
  const [speed, setSpeed] = useState(1);
  const playback = useRef({playing:false,time:0,speed:1,frameDuration:0});
  playback.current = {playing,time,speed,frameDuration:frameTimes.length > 1 ? frameTimes[frameTimes.length - 1] - frameTimes[frameTimes.length - 2] : 0};
  const sceneRevision = useRef('');
  const activeTab = useRef<number | null>(null);
  const refresh = useRef<() => Promise<void>>(async () => {});
  const clipSelection = useRef(0);
  // Switching tabs selects the clip and frames of the tab's scene, so a run there adds to it.
  const followTab = useRef<(selected: Status['clip']) => void>(() => {});
  const currentSettings = useRef(settings); currentSettings.current = settings;

  const act = async (action: () => Promise<void>, failed?: () => void) => { setError(''); try { await action(); } catch (e) { setError(String(e)); failed?.(); } };
  const change = (value: Partial<Settings>) => { setDisplayUndo(null); setSettings(previous => ({...previous,...value})); };
  const displayDefaults: Partial<Settings> = Object.fromEntries(Object.entries(defaults).filter(([key]) => !['inputCamera', 'confidenceKeep', 'hiddenLayers'].includes(key)));
  const displayChanged = Object.entries(displayDefaults).some(([key, value]) => JSON.stringify(settings[key as keyof Settings]) !== JSON.stringify(value));
  const resetDisplay = () => {
    setDisplayUndo(Object.fromEntries(Object.keys(displayDefaults).map(key => [key, settings[key as keyof Settings]])));
    setSettings(previous => ({...previous, ...displayDefaults}));
  };

  useEffect(() => {
    if (!canvas.current || !host.current) return;
    const view = new SceneRenderer(canvas.current); renderer.current = view;
    view.onSeek = next => { setPlaying(false); playback.current.time = next; setTime(next); };
    view.onMotionCounts = next => setCounts(previous => previous.still === next.still && previous.moving === next.moving ? previous : next);
    const observer = new ResizeObserver(() => { if (host.current) view.resize(host.current.clientWidth, host.current.clientHeight); });
    observer.observe(host.current);
    let handle = 0, previous = performance.now(), endElapsed = 0;
    const animate = (now: number) => {
      const dt = Math.min((now-previous)/1000,.1); previous = now;
      if (playback.current.playing) {
        const [start,end] = view.range();
        const step = dt * playback.current.speed;
        let next = playback.current.time + step;
        // Hold the final sample for one frame interval before wrapping, even if a step overshoots it.
        if (playback.current.time === end) {
          endElapsed += step;
          next = endElapsed >= playback.current.frameDuration ? start : end;
        } else {
          endElapsed = 0;
          next = Math.min(next, end);
        }
        playback.current.time = next; setTime(next); view.setTime(next);
      } else endElapsed = 0;
      view.render(dt); handle = requestAnimationFrame(animate);
    };
    handle = requestAnimationFrame(animate);
    const scenes = new Map<number, { key: string; data: SceneData; bytes: number }>();
    let polling = false, stopped = false;
    const poll = async () => {
      if (polling) return; polling = true;
      try {
        const status: Status = await (await request('/api/status')).json();
        if (stopped) return;
        setStatus(status);
        for (const id of scenes.keys()) if (!status.tabs.some(tab => tab.id === id)) scenes.delete(id);
        if (activeTab.current !== null && status.active !== activeTab.current) followTab.current(status.clip);
        activeTab.current = status.active;
        const revision = `${status.active}:${status.scene_key}`;
        if (revision !== sceneRevision.current) {
          setDisplayUndo(null);
          setReceiving(true);
          let cached = scenes.get(status.active);
          if (cached?.key !== status.scene_key) {
            const response = await request('/api/scene');
            const scene: SceneData = await response.json();
            if (stopped || response.headers.get('X-Scene-Key') !== status.scene_key) return;
            cached = { key: status.scene_key, data: scene, bytes: sceneBytes(scene) };
          }
          const scene = cached.data;
          scene.presentation = status.presentation;
          scenes.delete(status.active);
          scenes.set(status.active, cached);
          let inactiveBytes = [...scenes.values()].reduce((size, entry) => size + entry.bytes, 0) - cached.bytes;
          for (const [id, entry] of scenes) {
            if (inactiveBytes <= config.browser_memory_gb * 2 ** 30) break;
            if (id !== status.active) { scenes.delete(id); inactiveBytes -= entry.bytes; }
          }
          setReady(false); setData(scene); setPlaying(false);
          setView(scene.metadata?.layers?.at(-1)?.task === 'depth' ? 'depth' : '3d');
          const restored = await view.setScene(scene);
          if (!restored) return;
          sceneRevision.current = revision;
          setSettings(restored);
          setTime(view.range()[0]); setReady(true); setReceiving(false); setPendingTab(null);
        }
      } catch(e) { if (!stopped) { setError(String(e)); setReceiving(false); } }
      finally { polling = false; }
    };
    refresh.current = poll;
    void poll(); const timer = setInterval(poll, 700);
    return () => { stopped=true; clearInterval(timer); cancelAnimationFrame(handle); observer.disconnect(); view.dispose(); renderer.current=null; };
  }, []);
  useEffect(() => { renderer.current?.setSettings(settings); }, [settings]);
  useEffect(() => setMerging([]), [data]);
  // Left and right arrows step through the frames, in the 3D and the depth view alike.
  useEffect(() => {
    const step = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!frameTimes.length || !['ArrowLeft', 'ArrowRight'].includes(event.key) || event.metaKey || event.ctrlKey || event.altKey) return;
      if (target && target.id !== 'time' && (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable)) return;
      event.preventDefault();
      const current = playback.current.time;
      const next = event.key === 'ArrowRight' ? frameTimes.find(t => t > current + 1e-6) ?? frameTimes[0] : [...frameTimes].reverse().find(t => t < current - 1e-6) ?? frameTimes[frameTimes.length - 1];
      setPlaying(false); playback.current.time = next; setTime(next);
    };
    window.addEventListener('keydown', step);
    return () => window.removeEventListener('keydown', step);
  }, [frameTimes]);
  useEffect(() => { renderer.current?.setTime(time); }, [time]);

  followTab.current = selected => {
    const selection = ++clipSelection.current;
    if (!selected) {
      setClip(null); setStreams([]); setInputMode('images'); setBrowsing(true); setPlan(null); setTab('Input');
      setRange({start:0,stop:1,step:1}); setOptions(taskDefaults(config)); setSpeed(1);
      return;
    }
    const [path, start, step, count, indices] = selected;
    void act(async () => {
      const selected: [string, MediaSource][] = isStreams(path) ? path : [['', path]];
      const loaded: Clip[] = await Promise.all(selected.map(async ([name, path]) => {
        const clip: Clip = await (await request(`/api/source?${sourceParams(path)}`)).json();
        return {...clip, name: name || clip.name};
      }));
      if (selection !== clipSelection.current) return;
      if (!isStreams(path)) { setClip(loaded[0]); setInputMode('images'); }
      else { setStreams(loaded); setInputMode('streams'); }
      setBrowsing(false);
      setRange({start, stop: indices ? indices[indices.length - 1] + 1 : Math.min(...loaded.map(clip => clip.frames), start + step * (count - 1) + 1), step, ...(indices ? {indices} : {})});
      setOptions(o => ({...o,sourceFrame:0,region:[0,0,1,1],points:[],seedViews:undefined,viewSeeds:undefined}));
    });
  };
  // The tab strip and viewport answer at once; the pending state ends when the tab's scene has arrived.
  const switchTab = (id: number) => { if (id === status.active) return; setPendingTab(id); void act(async () => { await savePresentation(); await post(`/api/tabs/${id}/activate`, {}); await refresh.current(); }, () => setPendingTab(null)); };
  const newTab = () => { setPendingTab('new'); void act(async () => {
    await savePresentation(); await post('/api/tabs', {}); await refresh.current();
  }, () => setPendingTab(null)); };
  const closeTab = (id: number) => act(async () => {
    if ((id !== status.active || hasContent) && !window.confirm('Close this tab? Its results are discarded unless saved.')) return;
    await request(`/api/tabs/${id}`, {method:'DELETE'});
  });
  // Removing or merging layers renumbers them, so layer visibility starts over.
  const reshape = (action: () => Promise<unknown>) => act(async () => {
    await post('/api/presentation', {settings: {...currentSettings.current, hiddenLayers: []}, view: renderer.current?.view()});
    await action();
    setMerging([]);
  });
  const pick = (path: MediaSource, loader: Config["loader"]) => act(async () => {
    const selection = ++clipSelection.current;
    const next: Clip = await (await request(`/api/source?${sourceParams(path)}`)).json();
    if (selection !== clipSelection.current) return;
    setClip(next); setBrowsing(false);
    setRange(initialRange(next.frames, loader));
    setOptions(o => ({...o,sourceFrame:0,region:[0,0,1,1],points:[],seedViews:undefined,viewSeeds:undefined}));
  });
  const changeStreams = (next: Clip[]) => {
    setStreams(next); setPlan(null);
    if (next.length === streams.length && next.every((stream, i) => sourceKey(stream.path) === sourceKey(streams[i].path))) return;
    if (next.length) setRange(initialRange(Math.min(...next.map(clip => clip.frames)), config.loader));
    setOptions(o => ({...o, sourceFrame: 0, seedViews: undefined, viewSeeds: undefined}));
  };
  const addStreams = async (paths: MediaSource[], replace?: number) => {
    try {
      const added: Clip[] = await Promise.all(paths.map(async path => (await request(`/api/source?${sourceParams(path)}`)).json()));
      const next = replace === undefined ? [...streams] : streams.filter((_, i) => i !== replace);
      for (const clip of added) {
        if (next.some(stream => sourceKey(stream.path) === sourceKey(clip.path))) continue;
        let name = clip.name, suffix = 2;
        while (next.some(stream => stream.name === name)) name = `${clip.name} (${suffix++})`;
        if (replace === undefined) next.push({...clip, name}); else next.splice(replace, 0, {...clip, name});
      }
      changeStreams(next);
    } catch (error) { setError(String(error)); }
  };
  const switchInput = (mode: 'images' | 'streams') => {
    setInputMode(mode); setPlan(null); setBrowsing(false);
    const count = mode === 'streams' ? streams.length && Math.min(...streams.map(clip => clip.frames)) : singleClip?.frames;
    setRange(count ? initialRange(count, config.loader) : {start:0,stop:1,step:1});
    setOptions(o => ({...o, sourceFrame:0, region:[0,0,1,1], points:[], seedViews:undefined, viewSeeds:undefined}));
  };
  useEffect(() => {
    if (renderer.current?.setDefaults(defaults)) setSettings(defaults);
    setBrowsing(true);
  }, []);
  const changeRange = (next: Range) => {
    setRange(next);
    setOptions(o => {
      const sourceFrame = o.sourceFrame < sampledFrames(next).length ? o.sourceFrame : 0;
      const changed = sampledFrames(range)[o.sourceFrame] !== sampledFrames(next)[sourceFrame];
      return {...o, sourceFrame, points: changed ? [] : o.points,
        viewSeeds: changed ? Object.fromEntries(Object.entries(o.viewSeeds ?? {}).map(([view, seed]) => [view, {...seed, points: []}])) : o.viewSeeds};
    });
  };
  const savePresentation = () => post('/api/presentation', {settings:currentSettings.current,view:renderer.current?.view()});
  const frames = sampledFrames(range).length;
  const runRequest = clip && {
    ...(multi ? {streams:streams.map(({name, path}) => ({name, path}))} : {path:clip.path}),
    start:range.start,stride:range.step,frames,frame_indices:range.indices,...taskRequest(options, multi ? streams.length : undefined),
  };
  const requestKey = JSON.stringify(runRequest);
  // A plan already holds previews for every grid spacing; reuse them while its counts update.
  const previewKey = JSON.stringify(runRequest && {...runRequest, tasks: runRequest.tasks.map(spec => spec.task === 'track' ? {...spec, stride: undefined} : spec)});
  const plan = planned && planned.requestKey === requestKey ? planned.result : null;
  const preview = planned && planned.previewKey === previewKey ? planned.result : null;
  // Counted by the server's own query builders, a moment after the last change.
  useEffect(() => {
    setPlanError('');
    if (!runRequest || !options.tasks.length) { setPlan(null); return; }
    const controller = new AbortController();
    const timer = setTimeout(() => void request('/api/plan', {method:'POST',headers:{'Content-Type':'application/json'},body:requestKey,signal:controller.signal})
      .then(response => response.json()).then(result => { if (!controller.signal.aborted) setPlan({requestKey, previewKey, result}); })
      .catch(error => { if (!controller.signal.aborted) setPlanError(String(error)); }), 150);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [requestKey]);
  const selection = clip && [multi ? streams.map(({name, path}) => [name, path]) : clip.path, range.start, range.step, frames, ...(range.indices ? [range.indices] : [])];
  const reuses = !!selection && JSON.stringify(selection) === JSON.stringify(status.clip);
  const runEffect = reuses ? (status.encoded ? 'Reuses the encoded clip and adds to this scene' : 'Encodes the clip again and adds to this scene')
    : status.has_result ? 'Encodes the clip and replaces this tab\'s scene; open a new tab to keep it' : 'Encodes the clip first';
  const run = () => act(async () => {
    if (reuses) await savePresentation();
    await post('/api/run', runRequest);
    setStatus({...status,state:'running',stage:'starting',detail:'',steps:[]});
  });
  const load = async (source: File | string) => {
    if (typeof source === 'string') await post('/api/open', {path: source});
    else {
      const form = new FormData(); form.append('file', source);
      await request('/api/load', {method: 'POST', body: form});
    }
    await refresh.current();
  };
  const saveView = () => act(async () => { await savePresentation(); download(await (await request('/api/save-scene')).blob(),'view.arrow.json'); });

  const running = status.state === 'running' || receiving;
  const span = renderer.current?.range() ?? [0,0];
  const frameIndex = Math.max(0, frameTimes.filter(frameTime => frameTime <= time + 1e-6).length - 1);
  const layers = data?.metadata?.layers ?? [];
  const depthIndex = layers.map((layer, i) => layer.task === 'depth' && !settings.hiddenLayers.includes(i)).lastIndexOf(true);
  const view = depthIndex >= 0 ? selectedView : '3d';
  const pointCount = data?.points.reduce((n,item) => n+item.positions.length,0) ?? 0;
  const trackCount = data?.tracks.filter(track => !track.mode || track.mode === settings.trajectoryMode).reduce((n,item) => n+(item.positions[0]?.length ?? 0),0) ?? 0;
  const cameraCount = new Set(data?.cameras.map(camera => `${camera.image}@${camera.time}`)).size;
  const hasContent = pointCount + trackCount + cameraCount > 0 || layers.some(layer => layer.task === 'depth');
  const chosen = TASKS.filter(item => options.tasks.includes(item.value));
  const action = chosen.length === 1 ? chosen[0].action : chosen.length ? `Run ${chosen.length} tasks` : 'Run';
  const fromFrame = options.tasks.includes('track') || options.tasks.includes('all_pixels');
  const hostName = config.host;
  const inputPicker = multi
    ? <StreamPicker streams={streams} host={hostName} root={config.root} onChange={changeStreams}
        onAdd={async (paths, replace) => { await addStreams(paths, replace); setChoosing(false); setBrowsing(false); }} onError={setError}/>
    : <ClipPicker host={hostName} start={clip?.path ?? null} current={clip?.path ?? config.example ?? undefined}
        onPick={path => { setChoosing(false); void pick(path, config.loader); }} onError={setError}/>;

  return <div className={`app${panels.left ? '' : ' left-closed'}`}>
    <header>
      <div className="brand-area">
        <div className="brand"><img src="/arrow-icon.png" alt=""/><span>ARROW</span></div>
        <button className="icon-button panel-toggle" aria-pressed={panels.left} aria-label={panels.left ? 'Hide the controls' : 'Show the controls'} title={panels.left ? 'Hide the controls' : 'Show the controls'} onClick={() => togglePanel('left')}><PanelIcon side="left"/></button>
      </div>
      <TabStrip tabs={status.tabs} active={status.active} pending={pendingTab} disabled={running || pendingTab !== null}
        onSwitch={id => void switchTab(id)} onNew={() => void newTab()} onClose={id => void closeTab(id)}
        onRename={(id, name) => void act(async () => { await request(`/api/tabs/${id}`, {method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({name})}); })}
        onReorder={ids => void act(async () => { await post('/api/tabs/order', {ids}); })}/>
      <div className="header-actions">
        <button className="ghost" disabled={running} onClick={() => setOpening(true)}>Open…</button>
        <button disabled={!hasContent} title="Everything on screen: the drawn points, tracks, cameras and frames, the display settings and the camera angle. Reopens as it looks, without the predictions." onClick={() => void saveView()}>Save view</button>
        <button disabled={!status.has_result} title="The model's raw output for this tab: frames, queries and every prediction (.npz). Reopens as a scene with default display settings." onClick={() => void act(async () => download(await (await request('/api/result')).blob(),'arrow-result.npz'))}>Save predictions</button>
        <button className="icon-button panel-toggle" aria-pressed={panels.right} aria-label={panels.right ? 'Hide the input video' : 'Show the input video'} title={panels.right ? 'Hide the input video' : 'Show the input video'} onClick={() => togglePanel('right')}><PanelIcon side="right"/></button>
      </div>
    </header>
    <div className="workspace">
      {panels.left && <aside className="sidebar">
        <nav className="tabs" role="tablist">{TABS.map(name => <button key={name} role="tab" aria-selected={tab===name} onClick={() => setTab(name)}>{name}</button>)}</nav>
        <div className="sidebar-body" hidden={tab!=='Input'}>
          <nav className="subtabs input-tabs" role="tablist" aria-label="Input type">
            <button role="tab" aria-selected={inputMode === 'images'} onClick={() => switchInput('images')}>Images & video</button>
            <button role="tab" aria-selected={inputMode === 'streams'} onClick={() => switchInput('streams')}>Multi-view streams</button>
          </nav>
          {!choosing && (multi ? <Group title="Cameras">{inputPicker}</Group> : <Group title="Clip" aside={clip && browsing ? <button className="link" onClick={() => setBrowsing(false)}>Done</button> : undefined}>
            {clip && !browsing ? <ClipCard clip={clip} host={hostName} onChange={() => setBrowsing(true)} onRemove={() => { ++clipSelection.current; setClip(null); setBrowsing(true); setPlan(null); }}/>
              : inputPicker}
          </Group>)}
          {clip && (multi || !browsing) && <>
            <Group title={multi ? 'Timesteps' : 'Frames'} info="Choose an exact frame count across the clip, or enter a fixed step. Drag the handles to trim the range.">
              {multi && <p className="hint">{streams.length} camera{streams.length === 1 ? '' : 's'} × {frames} timesteps = {streams.length * frames} frames. The same range applies to every camera.</p>}
              <FrameRange clip={clip} range={range} onChange={changeRange}/>
            </Group>
            <TaskPanel clip={clip} streams={multi ? streams : undefined} range={range} options={options} plans={preview} maxSide={config.loader.max_side} onChange={setOptions}/>
          </>}
          {layers.length > 0 && <Group title="Results" info="Each run adds a layer. Runs on this tab's clip and frames add here; another clip or frame selection replaces them, so open a new tab to keep a scene. Hide, merge (same kind) or remove layers.">
            <ul className="layers">{layers.map((layer, i) => {
              const hidden = settings.hiddenLayers.includes(i);
              const kind = MERGE_KIND[layer.task];
              return <li key={i} className={hidden ? 'hidden-layer' : undefined}>
                <button className="icon-button" aria-pressed={!hidden} aria-label={`${hidden ? 'Show' : 'Hide'} ${layer.label}`} title={hidden ? 'Show this layer' : 'Hide this layer'}
                  onClick={() => change({hiddenLayers: hidden ? settings.hiddenLayers.filter(index => index !== i) : [...settings.hiddenLayers, i]})}><EyeIcon open={!hidden}/></button>
                <span><strong>{layer.label}</strong><small>{layer.detail}{layer.sky_skipped ? ` · ${layer.sky_skipped.toLocaleString()} sky skipped` : ''}</small></span>
                {kind && layers.filter(other => MERGE_KIND[other.task] === kind).length > 1 && <input type="checkbox" aria-label={`Select ${layer.label} to merge`} title="Select to merge"
                  checked={merging.includes(i)} disabled={running} onChange={e => setMerging(e.target.checked ? [...merging, i] : merging.filter(index => index !== i))}/>}
                <button className="icon-button" aria-label={`Remove ${layer.label}`} disabled={running} onClick={() => void reshape(() => request(`/api/layers/${i}`,{method:'DELETE'}))}>×</button>
              </li>;
            })}</ul>
            {merging.length > 1 && <button disabled={running || new Set(merging.map(i => MERGE_KIND[layers[i]?.task])).size > 1}
              title="Join the selected layers into one: tracking with tracking, or reconstruction with reconstruction"
              onClick={() => void reshape(() => post('/api/layers/merge', {indices: merging}))}>Merge {merging.length} layers</button>}
          </Group>}
        </div>
        <div className="sidebar-body" hidden={tab!=='Display'}>
          <DisplayPanel settings={settings} data={data} counts={counts} stageName={stageName}
            info={{source: status.clip ? isStreams(status.clip[0]) ? `${status.clip[0].length} camera streams` : Array.isArray(status.clip[0]) ? `${status.clip[0].length} selected images` : status.clip[0] : null, clip: status.clip && clip && !isStreams(status.clip[0]) && sourceKey(clip.path) === sourceKey(status.clip[0]) ? clip : null, host: hostName, selection: status.clip ? status.clip[4] ? `selected frames ${status.clip[4][0]}–${status.clip[4][status.clip[4].length - 1]}` : `from frame ${status.clip[1]}, every ${status.clip[2]}` : '', checkpoint: config.checkpoint, device: config.device, steps: status.steps, peakBytes: status.peak_bytes}}
            onFit={() => renderer.current?.fit()} onChange={change}/>
        </div>
        <footer className="display-reset" hidden={tab!=='Display'}>
          <button disabled={!displayChanged || receiving || pendingTab !== null} onClick={resetDisplay}>Reset display to defaults</button>
          <div role="status">{displayUndo && <div className="hint row">
            <span>Display settings reset.</span><button className="link" disabled={pendingTab !== null} onClick={() => change(displayUndo)}>Undo</button>
          </div>}</div>
        </footer>
        <footer className="run" hidden={tab!=='Input'}>
          {planError && <p className="hint" role="status">{planError}</p>}
          {preview && clip && !running && <div className="readout" id="readout"><strong>{options.tasks.includes('all_pixels') ? 'up to ' : ''}{plan?.queries.toLocaleString() ?? '…'}</strong> queries · {multi ? `${streams.length} camera{streams.length === 1 ? '' : 's'} × ${frames} timesteps` : `${frames} frame${frames === 1 ? '' : 's'}`}{preview.tracks ? ` · ${plan?.tracks.toLocaleString() ?? '…'} tracks` : ''}
            <span>{runEffect}{status.peak_bytes ? ` · last run peaked at ${(status.peak_bytes / 2**30).toFixed(1)} GB GPU memory` : ''}</span></div>}
          {status.state === 'running'
            ? <button className="wide" onClick={() => void act(async () => { await request('/api/cancel',{method:'POST'}); })}>Cancel</button>
            : <button id="run-inference" className="primary wide" disabled={!runRequest || (!multi && browsing) || receiving || !plan?.queries} onClick={() => void run()}>{action}</button>}
          {(running || status.state === 'error') && status.steps.length + Number(running) > 0 && <RunSteps status={status} receiving={receiving}/>}
          <div id="status" role="status">{status.state === 'running' ? `${stageName(status.stage)}…` : receiving ? 'Loading the scene into the viewer…' : status.state==='error' ? status.stage : status.state==='cancelled' ? 'Cancelled' : ready && hasContent ? `Scene ready${status.steps.length ? ` · ran in ${status.steps.reduce((sum, step) => sum + step.seconds, 0).toFixed(1)} s` : ''}` : clip ? 'Ready to run' : 'Choose a clip'}</div>
        </footer>
      </aside>}
      <main ref={host} className="viewport">
        <canvas ref={canvas} tabIndex={0} id="scene-canvas" aria-label="3D scene: drag to orbit, right-drag to pan, scroll to zoom, WASD and Q/E to move, double-click a camera to look through it"/>
        {view === 'depth' && depthIndex >= 0 && data && <DepthView data={data} layer={layers[depthIndex]} index={depthIndex} time={time} camera={activeView}/>}
        {!hasContent && (clip && !browsing
          ? <div className="input-previews">{(multi ? streams : [clip]).map(stream => <ClipPreview key={sourceKey(stream.path)} clip={stream} range={range} start={fromFrame ? options.sourceFrame : undefined}/>)}</div>
          : <div className="no-scene"><h1>No scene loaded</h1><p>Choose a clip on {hostName || 'the server'} to run ARROW, or open a saved scene or prediction file.</p>
              <div className="row"><button className="primary" onClick={() => { setTab('Input'); setBrowsing(true); setError(''); setChoosing(true); if (!panels.left) togglePanel('left'); }}>Choose clip</button><button disabled={running} onClick={() => setOpening(true)}>Open file…</button></div></div>)}
        <div className="viewport-bar">
          {depthIndex >= 0 && <Segmented label="View" value={view} options={[{value:'3d',label:'3D'},{value:'depth',label:'Depth'}]} onChange={setView}/>}
          <span className="spacer"/>
          <div className="scene-summary">
            {hasContent && <div className="scene-info">
              {pointCount > 0 && <span>{pointCount.toLocaleString()} points</span>}
              {trackCount > 0 && <span>{trackCount.toLocaleString()} tracks</span>}
              {cameraCount > 0 && <span>{cameraCount} camera poses</span>}
              <span title={data?.scale}>Relative scale</span>
            </div>}
            {view === '3d' && <div className="scene-controls">
              <span className="frusta-control" tabIndex={cameraCount ? undefined : 0} aria-describedby="frusta-tooltip">
                <button className="frusta-toggle" aria-label="Show frusta" aria-describedby="frusta-tooltip" aria-pressed={cameraCount > 0 && settings.cameras} disabled={!cameraCount} onClick={() => change({cameras: !settings.cameras})}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 4h6l2 3h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l2-3Z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  Frusta
                </button>
                <span id="frusta-tooltip" className="frusta-tooltip" role="tooltip">{cameraCount ? (settings.cameras ? 'Hide' : 'Show') + ' camera frusta and image planes. Adjust size and opacity in Display → Cameras.' : 'No camera predictions available. Run Camera poses.'}</span>
              </span>
              {pointCount + trackCount > 0 && <div className="scene-confidence">
                <Slider label={<>Confidence <Info text="Keep the most confident tracks. Track confidence is the mean point confidence across all frames."/></>} name="Confidence" value={settings.confidenceKeep} min={0} max={1} step={.001} display={`keep ${(settings.confidenceKeep * 100).toFixed(1)}%`} recommended={data?.metadata?.recommended?.confidenceKeep} onChange={confidenceKeep => change({confidenceKeep})}/>
              </div>}
            </div>}
          </div>
        </div>
        {hasContent && view === '3d' && <div className="nav-hint" aria-hidden="true">Drag to orbit · right-drag to pan · wheel-drag to tilt · WASD/QE to move · ←/→ frames · double-click a camera to look through it</div>}
        {hasContent && <div className="playback">
          <button id="play" className="play" aria-label={playing?'Pause':'Play'} disabled={!ready || span[0]===span[1]} onClick={() => setPlaying(!playing)}>
            {playing ? <svg viewBox="0 0 16 16"><rect x="3.5" y="2.5" width="3" height="11" rx="1"/><rect x="9.5" y="2.5" width="3" height="11" rx="1"/></svg> : <svg viewBox="0 0 16 16"><path d="M4.5 2.8v10.4c0 .6.6.9 1.1.6l8.2-5.2c.5-.3.5-.9 0-1.2L5.6 2.2c-.5-.3-1.1 0-1.1.6z"/></svg>}
          </button>
          <div className="timeline" title="Tick marks show individual frames. Use ←/→ to step through them.">
            <input id="time" aria-label="Scene time" type="range" aria-valuetext={`Frame ${frameIndex + 1} of ${frameTimes.length}, time ${time.toFixed(2)}`} disabled={!ready || span[0] === span[1]} min={span[0]} max={span[1]} step="any" value={time} style={{'--fill':`${100*(time-span[0])/Math.max(1e-9,span[1]-span[0])}%`} as CSSProperties} onChange={e => { setPlaying(false); setTime(Number(e.target.value)); }}/>
            <div className="frame-ticks" aria-hidden="true">
              {frameTimes.map((frameTime, index) => <i key={frameTime} className={index === frameIndex ? 'current' : undefined} style={{left: `${100 * (frameTime - span[0]) / Math.max(1e-9, span[1] - span[0])}%`}}/>)}
            </div>
          </div>
          <output id="time-value">{time.toFixed(2)}</output>
          {frameTimes.length > 0 && <output id="frame-value">Frame {frameIndex + 1}/{frameTimes.length}</output>}
          <select className="speed" aria-label="Playback speed" title="Playback speed" value={speed} onChange={e => setSpeed(Number(e.target.value))}>
            {SPEEDS.map(value => <option key={value} value={value}>{value}×</option>)}
          </select>
          {view === '3d' && <button title="Look at the scene from just behind the reference camera" onClick={() => renderer.current?.fit()}>Reset view</button>}
        </div>}
        {error && <div role="alert" className="error"><span>{error}</span><button className="icon-button" aria-label="Dismiss" onClick={() => setError('')}>×</button></div>}
        {pendingTab !== null && <div className="tab-loading" role="status"><span className="spinner" aria-hidden="true"/>{pendingTab === 'new' ? 'Opening a new tab…' : `Loading ${status.tabs.find(tab => tab.id === pendingTab)?.name ?? 'the tab'}…`}</div>}
      </main>
      {panels.right && <aside className="sidebar side-panel" aria-label="Input video">
        <div className="side-title"><h2>Input images</h2><button className="icon-button" aria-label="Hide the input video" onClick={() => togglePanel('right')}>×</button></div>
        {(data?.metadata?.num_views ?? 1) > 1 && <label className="camera-select">Preview camera <select aria-label="Preview camera" value={activeView} onChange={e => change({inputCamera: Number(e.target.value)})}>
          {data?.metadata?.view_names?.map((name, view) => <option key={view} value={view}>{name}</option>)}
        </select></label>}
        {data && data.images.some(image => image.name.split('/')[0] === 'rgb')
          ? <FramePanel data={data} time={time} camera={activeView}/>
          : <p className="hint">Appears once a scene is loaded.</p>}
      </aside>}
    </div>
    {choosing && <dialog ref={clipDialog} className="scene-dialog" aria-labelledby="choose-clip-title" onCancel={() => setChoosing(false)}>
      <div className="group-title"><h2 id="choose-clip-title">{multi ? 'Choose cameras' : 'Choose clip'}</h2><button className="icon-button" aria-label="Close clip chooser" onClick={() => setChoosing(false)}>×</button></div>
      {inputPicker}
      {error && <p role="alert" className="open-error">{error}</p>}
    </dialog>}
    {opening && <OpenScene host={hostName} root={config.results_root} onOpen={load} onClose={() => setOpening(false)}/>}
  </div>;
}

const root = createRoot(document.getElementById('root')!);
root.render(<main className="no-scene" role="status">Loading viewer…</main>);
void request('/api/config').then(response => response.json()).then((config: Config) => {
  root.render(<App config={config}/>);
}).catch(error => {
  root.render(<main className="no-scene" role="alert"><h1>Could not load viewer settings</h1><p>{String(error)}</p></main>);
});
