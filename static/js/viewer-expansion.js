import { blocksViewerMovement } from "./viewer-shortcuts.js";
let activeViewer = null;

export function installViewerExpansion(viewer) {
  activeViewer ??= viewer;
  const activate = () => {
    activeViewer = viewer;
  };
  viewer.addEventListener("pointerdown", activate);
  viewer.addEventListener("focusin", activate);
  const button = viewer.querySelector("[data-viewer-expand]");
  const icon = button.querySelector("i");
  button.setAttribute("aria-keyshortcuts", "F");
  const dialog = document.createElement("dialog");
  dialog.className = "viewer-expansion";
  dialog.setAttribute("aria-label", "Expanded interactive viewer");
  dialog.setAttribute("autofocus", "");
  document.body.append(dialog);
  let placeholder = null;
  let overflow = "";
  let scrollBehavior = "";
  let scrollbarGutter = "";
  let overflowAnchor = "";
  let bodyStyles = null;
  let scroll = null;
  let returnFocus = null;
  let animation = null;
  const animateExpansion = (expanded) => {
    animation?.cancel();
    animation = null;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animation = (expanded ? dialog : viewer).animate(
      [{ transform: `scale(${expanded ? 0.96 : 1.025})` }, { transform: "scale(1)" }],
      { duration: 300, easing: "cubic-bezier(.2, .8, .2, 1)" },
    );
  };
  const restoreScroll = () => window.scrollTo({ left: scroll.x, top: scroll.y, behavior: "instant" });
  const sync = (expanded) => {
    button.setAttribute("aria-pressed", String(expanded));
    button.setAttribute("aria-label", expanded ? "Exit fullscreen viewer" : "Expand viewer");
    button.title = expanded ? "Exit fullscreen viewer (F)" : "Expand viewer (F)";
    icon.className = expanded ? "fa-solid fa-compress" : "fa-solid fa-expand";
    viewer.dispatchEvent(new Event("viewerexpansionchange"));
  };
  const close = () => {
    if (!placeholder) return;
    const anchor = placeholder;
    placeholder = null;
    if (dialog.open) dialog.close();
    anchor.replaceWith(viewer);
    viewer.classList.remove("is-expanded");
    const style = document.documentElement.style;
    Object.assign(document.body.style, bodyStyles);
    style.overflow = overflow;
    style.scrollbarGutter = scrollbarGutter;
    sync(false);
    (returnFocus?.isConnected ? returnFocus : button).focus({ preventScroll: true });
    restoreScroll();
    style.overflowAnchor = overflowAnchor;
    style.scrollBehavior = scrollBehavior;
    animateExpansion(false);
  };
  const toggle = () => {
    if (placeholder) {
      close();
      return;
    }
    scroll = { x: window.scrollX, y: window.scrollY };
    returnFocus = document.activeElement;
    const height = viewer.getBoundingClientRect().height;
    const style = document.documentElement.style;
    overflow = style.overflow;
    scrollBehavior = style.scrollBehavior;
    scrollbarGutter = style.scrollbarGutter;
    overflowAnchor = style.overflowAnchor;
    style.scrollBehavior = "auto";
    style.overflowAnchor = "none";
    style.scrollbarGutter = "stable";
    style.overflow = "hidden";
    placeholder = document.createElement("div");
    placeholder.style.height = `${height}px`;
    placeholder.setAttribute("aria-hidden", "true");
    viewer.before(placeholder);
    const body = document.body.style;
    bodyStyles = { position: body.position, top: body.top, left: body.left, width: body.width };
    Object.assign(body, { position: "fixed", top: `${-scroll.y}px`, left: `${-scroll.x}px`, width: "100%" });
    dialog.append(viewer);
    viewer.classList.add("is-expanded");
    dialog.showModal();
    sync(true);
    button.focus({ preventScroll: true });
    animateExpansion(true);
  };
  button.addEventListener("click", toggle);
  document.addEventListener("keydown", (event) => {
    if (activeViewer !== viewer) return;
    if (
      event.code !== "KeyF" ||
      event.repeat ||
      event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      blocksViewerMovement(event.target)
    )
      return;
    event.preventDefault();
    toggle();
  });
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener("close", () => {
    if (!dialog.open) close();
  });
}
