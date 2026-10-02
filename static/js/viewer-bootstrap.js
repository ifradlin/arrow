import { preloadManifests } from "./viewer-manifests.js";

export function viewerDisabled(search) {
  return new URLSearchParams(search).get("viewer") === "off";
}

if (typeof window !== "undefined" && !viewerDisabled(window.location.search)) {
  preloadManifests(
    [...document.querySelectorAll(".example-chip[data-manifest]")].map((chip) => chip.dataset.manifest),
    window.location.href,
  );
  import("./viewer.js").catch((error) => {
    console.error("Could not initialize ARROW viewer", error);
    for (const viewer of document.querySelectorAll("[data-arrow-viewer]")) {
      viewer?.classList.add("is-unavailable");
      const text = viewer?.querySelector("[data-viewer-loading-text]");
      if (text) text.textContent = "Interactive scene unavailable.";
    }
  });
}
