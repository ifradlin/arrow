import { useEffect, useState } from 'react';

export interface Tab { id: number; name: string; }
/** A tab being opened ('new') or switched to, shown as active until its scene has arrived. */
export type PendingTab = number | 'new' | null;

/**
 * Scene tabs as in a web browser: click to switch, double-click to rename, drag to reorder,
 * × to close and + for a new one.
 */
export function TabStrip({ tabs, active, pending, disabled, onSwitch, onNew, onClose, onRename, onReorder }: {
  tabs: Tab[]; active: number; pending: PendingTab; disabled: boolean;
  onSwitch: (id: number) => void; onNew: () => void; onClose: (id: number) => void;
  onRename: (id: number, name: string) => void; onReorder: (ids: number[]) => void;
}) {
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState('');
  const [dragged, setDragged] = useState<number | null>(null);
  const [order, setOrder] = useState<number[] | null>(null);
  // While dragging, and until the server reports the new order, show the order being made.
  const ids = tabs.map(tab => tab.id);
  const shown = order && order.length === ids.length && order.every(id => ids.includes(id)) && order.join() !== ids.join()
    ? order.map(id => tabs.find(tab => tab.id === id)!) : tabs;
  useEffect(() => { if (order && order.join() === ids.join()) setOrder(null); }, [ids.join()]);
  const current = typeof pending === 'number' ? pending : pending === 'new' ? null : active;
  const commit = (tab: Tab) => {
    setEditing(null);
    const name = draft.trim();
    if (name && name !== tab.name) onRename(tab.id, name);
  };
  const moveOver = (target: number) => {
    if (dragged === null || dragged === target) return;
    const next = shown.map(tab => tab.id).filter(id => id !== dragged);
    next.splice(next.indexOf(target) + (shown.findIndex(tab => tab.id === dragged) < shown.findIndex(tab => tab.id === target) ? 1 : 0), 0, dragged);
    setOrder(next);
  };

  return <nav className="scene-tabs" role="tablist" aria-label="Scenes">
    {shown.map(tab => <div key={tab.id} className={`scene-tab${dragged === tab.id ? ' dragging' : ''}`} aria-selected={tab.id === current}
      draggable={!disabled && editing === null} onDragStart={e => { setDragged(tab.id); e.dataTransfer.effectAllowed = 'move'; }}
      onDragOver={e => { e.preventDefault(); moveOver(tab.id); }}
      onDragEnd={() => { if (order) onReorder(order); setDragged(null); }}>
      {editing === tab.id
        ? <input className="tab-name" aria-label="Tab name" autoFocus value={draft} onChange={e => setDraft(e.target.value)} onFocus={e => e.target.select()}
            onBlur={() => commit(tab)} onKeyDown={e => { if (e.key === 'Enter') commit(tab); if (e.key === 'Escape') setEditing(null); }}/>
        : <button role="tab" aria-selected={tab.id === current} title={`${tab.name} · double-click to rename, drag to move`} disabled={disabled && tab.id !== current}
            onClick={() => onSwitch(tab.id)} onDoubleClick={() => { setDraft(tab.name); setEditing(tab.id); }}>{tab.name}</button>}
      <button className="icon-button" aria-label={`Close ${tab.name}`} disabled={disabled} onClick={() => onClose(tab.id)}>×</button>
    </div>)}
    {pending === 'new' && <div className="scene-tab pending" aria-selected="true"><button role="tab" aria-selected="true" disabled>New scene…</button></div>}
    <button className="icon-button" aria-label="New scene tab" title="New scene tab" disabled={disabled} onClick={onNew}>+</button>
  </nav>;
}
