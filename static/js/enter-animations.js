function onFirstVisible(element, reveal, threshold = 0.05) {
  let finished = false;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (finished || !entry.isIntersecting || entry.intersectionRatio < threshold) return;
      finished = true;
      observer.disconnect();
      reveal();
    },
    { threshold },
  );
  observer.observe(element);
  return () => {
    finished = true;
    observer.disconnect();
  };
}

export function installBarReveal(card) {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return () => {};
  const page = card.querySelector('.ranking-page[aria-hidden="false"]');
  if (!page) return () => {};
  const bars = [...page.querySelectorAll(".ranking-bar")];
  const animations = [];
  bars.forEach((bar) => bar.classList.add("is-enter-pending"));
  const stopObserving = onFirstVisible(
    page,
    () => {
      bars.forEach((bar, index) => {
        if (!reducedMotion.matches) {
          animations.push(
            bar.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
              duration: 900,
              delay: 200 + Math.min(index, 10) * 50,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "backwards",
            }),
          );
        }
        bar.classList.remove("is-enter-pending");
      });
    },
    0.2,
  );
  return () => {
    stopObserving();
    animations.forEach((animation) => animation.cancel());
    bars.forEach((bar) => bar.classList.remove("is-enter-pending"));
  };
}

export function installRadarReveal(viewport) {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return;
  viewport.classList.add("is-enter-pending");
  onFirstVisible(
    viewport,
    () => {
      const methods = new Map(
        [
          ...viewport
            .closest("[data-radar-card]")
            .querySelectorAll(".radar-legend-page.is-active [data-legend-method]"),
        ].map((item, index) => [item.dataset.legendMethod, index]),
      );
      viewport.querySelectorAll('.radar-page[aria-hidden="false"] .radar-series').forEach((series) => {
        if (!methods.has(series.dataset.method)) methods.set(series.dataset.method, methods.size);
        if (!reducedMotion.matches) {
          series.animate([{ transform: "scale(0)" }, { transform: "scale(1)" }], {
            duration: 900,
            delay: 200 + methods.get(series.dataset.method) * 50,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "backwards",
          });
        }
      });
      viewport.classList.remove("is-enter-pending");
    },
    0.2,
  );
}
