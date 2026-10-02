import { imageWasDownloaded } from "./image-cache.js";

const installed = new WeakSet();
const loaded = new Set();

export function installScenePreview(image, source) {
  const url = source ? new URL(source, document.baseURI).href : image.src;
  if (installed.has(image) && image.src === url) return;
  installed.add(image);
  image.dataset.previewState = "loading";
  let settled = false;
  const finish = (animate = true) => {
    if (settled) return;
    settled = true;
    image.dataset.previewState = image.naturalWidth ? "ready" : "error";
    if (!image.naturalWidth) return;
    const source = image.currentSrc || image.src;
    const seen = loaded.has(source);
    loaded.add(source);
    if (animate && !seen && imageWasDownloaded(image) && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      image.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: "ease-out" });
    }
  };
  image.onload = image.onerror = finish;
  if (image.src !== url) image.src = url;
  if (image.complete) finish(false);
}

if (typeof document !== "undefined") {
  document.querySelectorAll("[data-scenes] .scene-card img").forEach((image) => installScenePreview(image));
}
