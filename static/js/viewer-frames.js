// Drives the viewer's animation frames without drawing idle ones.
//
// A frame callback runs only while something is animating (playback, camera
// transitions, held movement keys) or after `invalidate()`/`wake()`.  Inside
// the callback, `consume()` reports whether the scene changed since the last
// draw, so a running loop can advance time every vsync while the GPU only
// presents a new canvas frame when the image actually changes.  An idle viewer
// therefore costs nothing while the page scrolls.
export function createFrameScheduler({
  canRun,
  isAnimating,
  frame,
  request = (callback) => requestAnimationFrame(callback),
  cancel = (handle) => cancelAnimationFrame(handle),
}) {
  let handle = null;
  let running = false;
  let dirty = true;
  // Timestamp of the previous frame of an uninterrupted loop, or null when the
  // loop (re)starts, so time never jumps across idle periods.
  let previous = null;
  const schedule = () => {
    if (handle !== null || running || !canRun()) return;
    handle = request(run);
  };
  const run = (now) => {
    handle = null;
    if (!canRun()) {
      previous = null;
      return;
    }
    running = true;
    const last = previous;
    previous = now;
    try {
      frame(now, last);
    } finally {
      running = false;
    }
    if (dirty || isAnimating()) schedule();
    else previous = null;
  };
  return {
    // The scene changed: draw on the next frame.
    invalidate() {
      dirty = true;
      schedule();
    },
    // Something may need per-frame updates; the frame decides whether to draw.
    wake: schedule,
    consume() {
      const changed = dirty;
      dirty = false;
      return changed;
    },
    stop() {
      if (handle !== null) cancel(handle);
      handle = null;
      previous = null;
    },
  };
}
