const barSelector = ".example-picker, .example-categories, .scene-strip, .static-observations";
const selectedSelector =
  '.is-active, .is-selected, [aria-current="true"], [aria-pressed="true"], [aria-selected="true"]';

export function revealSelectedTab(bar) {
  if (!bar.clientWidth || bar.scrollWidth <= bar.clientWidth) return;
  const selected = bar.querySelector(selectedSelector);
  if (!selected) return;
  const bounds = bar.getBoundingClientRect();
  const item = selected.getBoundingClientRect();
  const inset = 6;
  const left = bounds.left + bar.clientLeft + inset;
  const right = bounds.left + bar.clientLeft + bar.clientWidth - inset;
  const offset = item.left < left ? item.left - left : item.right > right ? item.right - right : 0;
  if (offset) bar.scrollLeft += offset;
}

export function installTabBars(root = document, win = window) {
  const bars = new Set();
  const states = new WeakMap();
  const pending = new Set();
  const update = (bar) => {
    const state = states.get(bar);
    const selected = bar.querySelector(selectedSelector);
    if (selected !== state.selected) {
      state.selected = selected;
      state.interacted = false;
      state.layout = null;
    }
    if (state.interacted || !selected || !bar.clientWidth) return;
    const layout = [bar.clientWidth, bar.scrollWidth, selected.offsetLeft, selected.offsetWidth].join(":");
    if (layout === state.layout) return;
    state.layout = layout;
    revealSelectedTab(bar);
  };
  const schedule = (bar) => {
    if (pending.has(bar)) return;
    pending.add(bar);
    requestAnimationFrame(() => {
      pending.delete(bar);
      update(bar);
    });
  };
  const resize = new ResizeObserver((entries) => entries.forEach(({ target }) => schedule(target)));
  const install = (bar) => {
    if (bars.has(bar)) return;
    bars.add(bar);
    states.set(bar, { selected: bar.querySelector(selectedSelector), interacted: bar.scrollLeft !== 0, layout: null });
    const preserveScroll = () => {
      states.get(bar).interacted = true;
    };
    for (const event of ["pointerdown", "touchstart", "wheel", "keydown"])
      bar.addEventListener(event, preserveScroll, { passive: true });
    resize.observe(bar);
    new MutationObserver(() => schedule(bar)).observe(bar, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class", "aria-current", "aria-pressed", "aria-selected", "hidden"],
    });
    update(bar);
  };
  root.querySelectorAll(barSelector).forEach(install);
  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches(barSelector)) install(node);
        node.querySelectorAll(barSelector).forEach(install);
      }
    }
  }).observe(root.body || root, { childList: true, subtree: true });
  const refresh = () => bars.forEach(schedule);
  root.fonts?.ready.then(refresh);
  win.addEventListener("pageshow", refresh);
}

if (typeof document !== "undefined") installTabBars();
