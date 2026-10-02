import { whenStylesReady } from "./styles-ready.js";

export function installPickerIndicator(picker, stylesReady = whenStylesReady()) {
  if (!picker) return () => {};
  let indicator = picker.querySelector(".example-picker-indicator");
  if (!indicator) {
    indicator = document.createElement("div");
    indicator.className = "example-picker-indicator";
    indicator.setAttribute("aria-hidden", "true");
    picker.prepend(indicator);
  }
  let ready = false;
  const position = (animate = false) => {
    if (!ready) return;
    const active = picker.querySelector(".example-chip.is-active");
    if (!active) return;
    const tab = active.getBoundingClientRect();
    const group = picker.getBoundingClientRect();
    const x = tab.left - group.left + picker.scrollLeft - picker.clientLeft;
    const y = tab.top - group.top + picker.scrollTop - picker.clientTop;
    const current = indicator.getBoundingClientRect();
    const fromX = current.left - group.left + picker.scrollLeft - picker.clientLeft;
    const fromY = current.top - group.top + picker.scrollTop - picker.clientTop;
    indicator.getAnimations().forEach((animation) => animation.cancel());
    indicator.style.width = `${tab.width}px`;
    indicator.style.height = `${tab.height}px`;
    indicator.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (
      animate &&
      picker.classList.contains("has-indicator") &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      current.width > 0
    ) {
      indicator.animate(
        [
          {
            transform: `translate3d(${fromX}px, ${fromY}px, 0) scale(${current.width / tab.width}, ${current.height / tab.height})`,
          },
          { transform: `translate3d(${x}px, ${y}px, 0) scale(1, 1)` },
        ],
        { duration: 380, easing: "cubic-bezier(.2, .8, .2, 1)" },
      );
    }
    if (!picker.classList.contains("has-indicator")) {
      requestAnimationFrame(() => picker.classList.add("has-indicator"));
    }
  };
  const resize = new ResizeObserver(() => position());
  resize.observe(picker);
  picker.querySelectorAll(".example-chip").forEach((chip) => resize.observe(chip));
  stylesReady.then(() => {
    ready = true;
    position();
  });
  document.fonts?.ready.then(() => stylesReady.then(() => position()));
  return position;
}
