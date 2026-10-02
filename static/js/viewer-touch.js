export function doubleTap(toggle) {
  let pointer = null;
  let previous = null;
  const cancel = () => {
    pointer = null;
    previous = null;
  };
  return {
    down(event) {
      if (event.pointerType !== "touch") return;
      if (pointer || event.isPrimary === false) {
        cancel();
        return;
      }
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp };
    },
    move(event) {
      if (pointer?.id === event.pointerId && Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > 10)
        cancel();
    },
    up(event) {
      if (pointer?.id !== event.pointerId) return;
      const tap = pointer;
      pointer = null;
      if (event.timeStamp - tap.time > 250 || Math.hypot(event.clientX - tap.x, event.clientY - tap.y) > 10) {
        previous = null;
        return;
      }
      if (
        previous &&
        event.timeStamp - previous.time <= 350 &&
        Math.hypot(tap.x - previous.x, tap.y - previous.y) <= 24
      ) {
        previous = null;
        toggle(event);
      } else previous = { ...tap, time: event.timeStamp };
    },
    cancel,
  };
}

export function pointerDrag(onDrag) {
  const origins = new Map();
  return {
    down(event) {
      origins.set(event.pointerId, [event.clientX, event.clientY]);
    },
    move(event) {
      const origin = origins.get(event.pointerId);
      const threshold = event.pointerType === "touch" ? 6 : 2;
      if (!origin || Math.hypot(event.clientX - origin[0], event.clientY - origin[1]) < threshold) return;
      origins.delete(event.pointerId);
      onDrag();
    },
    end(event) {
      origins.delete(event.pointerId);
    },
  };
}

export function installTouchHint(button, signal) {
  let animation;
  let visible;
  let iconTimer;
  const icon = button.querySelector?.("i");
  signal?.addEventListener(
    "abort",
    () => {
      clearTimeout(iconTimer);
      animation?.cancel();
      animation = null;
      button.hidden = !visible;
    },
    { once: true },
  );
  return (show) => {
    if (show === visible) return;
    const initial = visible === undefined;
    visible = show;
    const style = animation ? getComputedStyle(button) : null;
    const current = style && { opacity: style.opacity, transform: style.transform };
    animation?.cancel();
    animation = null;
    clearTimeout(iconTimer);
    button.inert = !show;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = 300;
    const updateIcon = () => {
      if (!icon) return;
      icon.getAnimations?.().forEach((item) => item.cancel());
      icon.className = show ? "fa-solid fa-lock" : "fa-solid fa-lock-open";
    };
    if (!initial && !reduced) iconTimer = setTimeout(updateIcon, duration * (show ? 0.65 : 0.4));
    else updateIcon();
    if (reduced || (!show && button.hidden)) {
      button.hidden = !show;
      return;
    }
    button.hidden = false;
    const hidden = { opacity: 0, transform: "translateX(-50%) translateY(0) scale(1.15)" };
    const shown = { opacity: 1, transform: "translateX(-50%) translateY(0) scale(1)" };
    const easing = "cubic-bezier(.4, 0, .2, 1)";
    const keyframes = show
      ? [
          { ...(current || hidden), easing },
          { ...shown, transform: "translateX(-50%) translateY(0) scale(.9)", offset: 0.65, easing },
          shown,
        ]
      : [
          current || shown,
          { ...shown, offset: 0.15, easing },
          { opacity: 1, transform: "translateX(-50%) translateY(0) scale(.9)", offset: 0.4, easing },
          { opacity: 0.35, transform: "translateX(-50%) translateY(0) scale(1.12)", offset: 0.85, easing },
          { ...hidden },
        ];
    const next = button.animate(keyframes, { duration, fill: "both" });
    animation = next;
    next.finished.then(
      () => {
        if (animation !== next) return;
        button.hidden = !show;
        next.cancel();
        animation = null;
      },
      () => {},
    );
  };
}

export function installTouchNavigation(
  viewer,
  canvas,
  controls,
  defaults,
  signal,
  state = {},
  selectCamera = () => false,
) {
  const mobile = matchMedia("(max-width: 720px) and (pointer: coarse)");
  const button = viewer.querySelector("[data-touch-lock]");
  const showHint = (state.showHint ??= installTouchHint(button));
  const label = button.querySelector("span");
  const requireUnlock = defaults.touch_interaction !== "direct";
  state.unlocked ??= false;
  const gutter = Math.min(64, Math.max(0, Number(defaults.touch_scroll_gutter) || 0));
  viewer.style.setProperty("--touch-scroll-gutter", `${gutter}px`);
  const sync = () => {
    const expanded = viewer.classList.contains("is-expanded");
    const locked = mobile.matches && !expanded && requireUnlock && !state.unlocked;
    controls.enabled = !locked;
    canvas.style.touchAction = locked ? "pan-y" : "none";
    viewer.classList.toggle("is-touch-locked", locked);
    button.setAttribute("aria-pressed", String(locked));
    button.setAttribute("aria-label", locked ? "Unlock touch controls" : "Lock touch controls for page scrolling");
    label.textContent = "Double-tap to explore";
    showHint(locked);
  };
  const toggle = () => {
    if (!mobile.matches || !requireUnlock || viewer.classList.contains("is-expanded")) return;
    state.unlocked = !state.unlocked;
    sync();
  };
  const unlock = () => {
    state.unlocked = true;
    sync();
  };
  const gesture = doubleTap((event) => {
    state.lastDoubleTap = event.timeStamp;
    if (!controls.enabled) {
      toggle();
      return;
    }
    if (selectCamera(event)) unlock();
    else toggle();
  });
  for (const [type, handler] of Object.entries({
    pointerdown: gesture.down,
    pointermove: gesture.move,
    pointerup: gesture.up,
    pointercancel: gesture.cancel,
  })) {
    canvas.addEventListener(type, handler, { capture: true, passive: true, signal });
  }
  button.addEventListener("click", toggle, { signal });
  mobile.addEventListener(
    "change",
    () => {
      gesture.cancel();
      sync();
    },
    { signal },
  );
  viewer.addEventListener(
    "viewerexpansionchange",
    () => {
      gesture.cancel();
      sync();
    },
    { signal },
  );
  sync();
  return { unlock };
}
