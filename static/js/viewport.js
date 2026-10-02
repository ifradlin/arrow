export function observeViewport(element, onChange) {
  let intersecting = false;
  let active = false;
  const sync = () => {
    const next = intersecting && !document.hidden;
    if (next === active) return;
    active = next;
    onChange(active);
  };
  const observer = new IntersectionObserver(([entry]) => {
    intersecting = entry.isIntersecting;
    sync();
  });
  observer.observe(element);
  document.addEventListener("visibilitychange", sync);
  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", sync);
  };
}
