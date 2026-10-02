export function bufferedRanges(frames, ready, currentFrame = null) {
  const ranges = [];
  let start = null;
  for (let frame = 0; frame <= frames; frame++) {
    if (frame < frames && ready(frame)) {
      start ??= frame;
    } else if (start !== null) {
      ranges.push([(start / frames) * 100, (frame / frames) * 100]);
      start = null;
    }
  }
  if (currentFrame === null) return ranges;
  const position = (currentFrame / frames) * 100;
  return ranges.filter(([left, right]) => left === 0 || (position >= left && position < right));
}

export function installBufferedIndicator(container, frames) {
  const segments = new Map();
  const clear = () => {
    for (const segment of segments.values()) {
      segment.animation?.cancel();
      segment.element.remove();
    }
    segments.clear();
  };
  return {
    clear,
    update(ready, currentFrame = 0, animate = true) {
      const active = new Set();
      for (const [left, right] of bufferedRanges(frames, ready, currentFrame)) {
        active.add(left);
        let segment = segments.get(left);
        if (!segment) {
          const element = container.ownerDocument.createElement("div");
          element.style.left = `${left}%`;
          container.append(element);
          segment = { element, from: 0, width: 0, animation: null };
          segments.set(left, segment);
        }
        const width = right - left;
        if (width === segment.width) continue;
        const progress = segment.animation?.effect.getComputedTiming().progress ?? 1;
        const from = segment.from + (segment.width - segment.from) * progress;
        segment.animation?.cancel();
        segment.element.style.width = `${width}%`;
        segment.from = from;
        segment.width = width;
        segment.animation =
          animate && !matchMedia("(prefers-reduced-motion: reduce)").matches
            ? segment.element.animate([{ width: `${from}%` }, { width: `${width}%` }], {
                duration: 240,
                easing: "ease-out",
              })
            : null;
      }
      for (const [left, segment] of segments) {
        if (active.has(left)) continue;
        segment.animation?.cancel();
        segment.element.remove();
        segments.delete(left);
      }
    },
  };
}

export function playbackBufferFrames(start, frames, fps, seconds = 2, timesteps = null) {
  const count = Math.min(frames, Math.max(1, Math.floor(timesteps ?? Math.ceil(fps * seconds) + 1)));
  return Array.from({ length: count }, (_, index) => (start + index) % frames);
}

export async function prebuffer(stream, start, frames, fps, history, seconds = 2, timesteps = null) {
  const upcoming = playbackBufferFrames(start, frames, fps, seconds, timesteps);
  await Promise.all(upcoming.map((frame) => stream.ensure(frame, history)));
}

export function bufferingLoader(element, text, delay = 200, minimum = 500) {
  let showTimer = null;
  let finishTimer = null;
  let finishResolve = null;
  let shownAt = null;
  let generation = 0;
  const clear = () => {
    generation++;
    clearTimeout(showTimer);
    clearTimeout(finishTimer);
    showTimer = finishTimer = null;
    shownAt = null;
    element.hidden = true;
    finishResolve?.();
    finishResolve = null;
  };
  return {
    clear,
    start() {
      clear();
      text.textContent = "Buffering scene…";
      showTimer = setTimeout(() => {
        showTimer = null;
        shownAt = performance.now();
        element.hidden = false;
      }, delay);
    },
    async finish() {
      const current = generation;
      clearTimeout(showTimer);
      showTimer = null;
      const remaining = shownAt === null ? 0 : minimum - (performance.now() - shownAt);
      if (remaining > 0)
        await new Promise((resolve) => {
          finishResolve = resolve;
          finishTimer = setTimeout(resolve, remaining);
        });
      if (current === generation) clear();
    },
    error(value) {
      clear();
      text.textContent = value;
      element.hidden = false;
    },
  };
}
