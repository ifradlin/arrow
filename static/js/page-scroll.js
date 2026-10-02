export function installPageScroll(viewport, { getIndex, count, onSelect, onInteraction, onVisible }) {
  let width = viewport.clientWidth;
  const updateVisibility = () => {
    if (!viewport.clientWidth) return;
    const position = Math.max(0, Math.min(count - 1, viewport.scrollLeft / viewport.clientWidth));
    onVisible?.(Math.floor(position), Math.ceil(position));
  };
  const updateSelection = () => {
    if (!viewport.clientWidth) return;
    updateVisibility();
    const index = Math.max(0, Math.min(count - 1, Math.round(viewport.scrollLeft / viewport.clientWidth)));
    if (index !== getIndex()) onSelect(index);
  };
  const scrollToPage = (index, animate = true) => {
    viewport.scrollTo({
      left: index * viewport.clientWidth,
      behavior: animate && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant",
    });
  };
  viewport.addEventListener(
    "scroll",
    () => {
      if (Math.abs(viewport.scrollLeft - getIndex() * viewport.clientWidth) > 1) onInteraction?.();
      updateSelection();
    },
    { passive: true },
  );
  viewport.addEventListener("scrollend", updateSelection);
  new ResizeObserver(() => {
    if (width === viewport.clientWidth) return;
    width = viewport.clientWidth;
    scrollToPage(getIndex(), false);
    updateVisibility();
  }).observe(viewport);
  updateVisibility();
  return scrollToPage;
}
