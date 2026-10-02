import { imageWasDownloaded } from "./image-cache.js";

export function installPaperImagePreviews(root = document) {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  root.querySelectorAll(".paper-image").forEach((picture) => {
    const image = picture.querySelector("img");
    if (image.complete && (!image.naturalWidth || !imageWasDownloaded(image) || reducedMotion.matches)) {
      picture.classList.remove("is-loading");
      return;
    }
    let settled = false;

    const reveal = async () => {
      if (settled) return;
      settled = true;
      try {
        await image.decode();
      } catch {
        // A loaded image can still be displayed if decoding rejects.
      }
      if (!imageWasDownloaded(image) || reducedMotion.matches) {
        picture.classList.remove("is-loading");
        return;
      }
      picture.classList.add("is-revealing");
      requestAnimationFrame(() => requestAnimationFrame(() => picture.classList.remove("is-loading")));
    };

    image.addEventListener("load", reveal, { once: true });
    image.addEventListener(
      "error",
      () => {
        settled = true;
        picture.classList.remove("is-loading");
      },
      { once: true },
    );
    if (image.complete) {
      if (image.naturalWidth) void reveal();
      else picture.classList.remove("is-loading");
    }
  });
}
