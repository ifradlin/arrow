const capabilityIds = { allpix: "pix-track", "mv-allpix": "mv-track", brandenburg: "static" };

export function capabilityFromURL(search) {
  const params = new URLSearchParams(search);
  const value = params.get("cap") ?? params.get("capability");
  return Object.keys(capabilityIds).find((key) => capabilityIds[key] === value) || value;
}

export function setCapabilityURL(url, key) {
  url.searchParams.delete("capability");
  url.searchParams.set("cap", capabilityIds[key] || key);
}

export function paintViewerScrubber(viewer, position) {
  const controls = viewer.querySelector(":scope > .viewer-controls");
  const progress = `${position * 100}%`;
  controls.querySelector("[data-viewer-scrubber]").style.setProperty("--scrub-progress", progress);
  controls.querySelector("[data-scrubber-thumb]").style.left = progress;
}

export function resetViewerTimeline(viewer, frames = null) {
  const controls = viewer.querySelector(":scope > .viewer-controls");
  controls.querySelector("[data-frame-slider]").value = "0";
  paintViewerScrubber(viewer, 0);
  controls.querySelector("[data-frame-current]").textContent = frames ? "1" : "-";
  controls.querySelector("[data-frame-total]").textContent = frames ? String(frames) : "-";
}

export function selectCapability(key, root = document) {
  const buttons = [...root.querySelectorAll(".example-chip[data-example]")];
  if (!buttons.some((button) => button.dataset.example === key)) return false;
  const selected = buttons.find((button) => button.dataset.example === key);
  if (selected.dataset.category) selectExampleCategory(selected.dataset.category, root);
  for (const button of buttons) {
    const active = button.dataset.example === key;
    button.classList.toggle("is-active", active);
    button.toggleAttribute("aria-current", active);
  }
  const viewer = root.querySelector?.("[data-arrow-viewer]");
  if (viewer && selected.dataset.sceneTitle) {
    const changed = viewer.dataset.example !== key;
    if (changed) resetViewerTimeline(viewer);
    viewer.dataset.example = key;
    viewer.dataset.mode = viewer.dataset.inputMode = selected.dataset.sceneMode;
    viewer.querySelector("[data-viewer-title]").textContent = selected.dataset.sceneTitle;
    if (changed) viewer.querySelector("[data-viewer-meta]").textContent = "";
  }
  return true;
}

function selectExampleCategory(category, root) {
  const examples = [...root.querySelectorAll(".example-chip[data-example]")];
  const first = examples.find((example) => example.dataset.category === category);
  for (const button of root.querySelectorAll("[data-example-category]")) {
    const active = button.dataset.exampleCategory === category;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }
  for (const example of examples) example.hidden = example.dataset.category !== category;
  for (const element of root.querySelectorAll(
    ".example-picker, [data-arrow-viewer], .viewer-note:not([data-example-empty])",
  )) {
    element.hidden = !first;
  }
  root.querySelector("[data-example-empty]").hidden = Boolean(first);
  return first;
}

export function installCapabilitySelection(root = document, win = window) {
  const overview = root.id === "overview";
  const params = new URLSearchParams(win.location.search);
  const requested = overview ? capabilityFromURL(win.location.search) : params.get("example");
  // A `?publish=` preview has no chip; the viewer selects it (viewer.js).
  if (!params.get("publish") && !selectCapability(requested, root)) {
    selectCapability(
      root.dataset?.defaultExample || root.querySelectorAll(".example-chip[data-example]")[0]?.dataset.example,
      root,
    );
  }
  root.querySelectorAll("[data-example-category]").forEach((button) => {
    button.addEventListener("click", () => {
      selectExampleCategory(button.dataset.exampleCategory, root)?.click();
    });
  });
  root.querySelectorAll(".example-chip[data-example]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      selectCapability(button.dataset.example, root);
      const url = new URL(win.location.href);
      if (overview) setCapabilityURL(url, button.dataset.example);
      else url.searchParams.set("example", button.dataset.example);
      url.hash = "";
      win.history.replaceState({}, "", url);
    });
  });
}
