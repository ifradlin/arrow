import { installLoader } from "./site.js";
import { models, scenes, predictionKey, viewerExamples } from "./comparison-scenes.js";
import { comparisonPickSide } from "./comparison-picking.js";
import { alignCameras } from "./comparison-registration.js";
import { installPickerIndicator } from "./picker-indicator.js";
import { installScenePreview } from "./scene-previews.js";
import { comparisonURL, readComparisonState } from "./comparison-state.js";

const root = document.querySelector("[data-comparison-section]");
const $ = (selector) => root.querySelector(selector);
const stage = $("[data-stage]");
const splitter = $("[data-splitter]");
const methodSelect = $("[data-model-b]");
const referenceBubble = $("[data-reference-bubble]");
const baselineBubble = $(".baseline-bubble");
const baselinePanel = $("[data-panel-b]");
const positionTaskIndicator = installPickerIndicator($(".control-row-primary .example-picker"));
const state = {
  ...readComparisonState(window.location.search),
  split: 50,
};
const taskSelections = new Map();
function saveSelection() {
  const url = comparisonURL(window.location.href, state);
  window.history.replaceState(window.history.state, "", url);
}
const viewers = new Map();
const template = $("[data-comparison-template]");
const sharedView = { time: 0, camera: null };
let revealVersion = 0;
const cameraFits = new Map();
const revealElements = (shell) =>
  shell.querySelectorAll(
    ":scope > .viewer-stage > .viewer-canvas, :scope > .viewer-stage > .rgb-inset, :scope > .viewer-stage > .static-observations",
  );
let installViewer;
import("./viewer.js")
  .then((module) => {
    installViewer = module.installViewer;
    update();
  })
  .catch((error) => console.error("Could not initialize comparison viewer", error));

for (const [side, reference] of [
  ["arrow", true],
  ["baseline", false],
]) {
  const host = $(`[data-viewer-host="${side}"]`);
  if (!host.querySelector("[data-arrow-viewer]")) host.append(template.content.cloneNode(true));
  const shell = host.querySelector("[data-arrow-viewer]");
  shell.hidden = !reference;
  if (reference) shell.querySelector("[data-viewer-stage]").append(referenceBubble);
  const menu = shell.querySelector("[data-settings-menu]");
  menu.id = `comparison-settings-${side}`;
  shell.querySelector("[data-settings-toggle]").setAttribute("aria-controls", menu.id);
  const options = document.createElement("div");
  options.className = "comparison-options";
  options.innerHTML = `
    <label class="viewer-setting"><span>Compare models</span><input type="checkbox" data-compare /></label>`;
  if (reference) menu.append(options);
  options.querySelector("[data-compare]").addEventListener("change", (event) => {
    state.compare = event.target.checked;
    update();
    saveSelection();
  });
  viewers.set(side, { shell, examples: viewerExamples(reference), controller: null, selected: null, ready: false });
  if (reference) installLoader(shell.querySelector("[data-viewer-loading]"));
}

const arrowShell = viewers.get("arrow").shell;
const baselineShell = viewers.get("baseline").shell;
const referenceStage = arrowShell.querySelector("[data-viewer-stage]");
const navigationSurface = document.createElement("div");
navigationSurface.className = "comparison-navigation";
navigationSurface.tabIndex = -1;
navigationSurface.setAttribute("aria-label", "Interactive comparison view");
referenceStage.append(navigationSurface);
const cameraHitTest = (event) => {
  const rect = arrowShell.querySelector("[data-viewer-stage]").getBoundingClientRect();
  const side = comparisonPickSide(event.clientX - rect.left, rect.width, {
    ...state,
    comparing: stage.classList.contains("is-comparing"),
  });
  const entry = viewers.get(side);
  return entry.ready ? entry.controller?.hitTestFrustum(event) : null;
};
const syncBaselineView = () => {
  const baseline = viewers.get("baseline").controller;
  const reference = viewers.get("arrow").controller;
  const ready = [...viewers.values()].every((entry) => entry.ready);
  const scene = scenes[state.task].find((entry) => entry.id === state.scene);
  let cameraFit = null;
  if (ready && scene.alignment === "unaligned") {
    const key = [...viewers.values()].map((entry) => entry.selected).join("|");
    if (!cameraFits.has(key)) {
      cameraFits.set(key, alignCameras(baseline.getAlignmentCameras(), reference.getAlignmentCameras()));
    }
    cameraFit = cameraFits.get(key);
  }
  if (ready) {
    baseline?.setSceneAlignment(cameraFit);
    baseline?.setFrustumRadius(reference.getSceneRadius());
  }
  baseline?.setFrame(sharedView.time);
  const camera = reference?.getCameraState() || sharedView.camera;
  if (camera) baseline?.setCameraState(camera);
  return !stage.classList.contains("is-comparing") || ready;
};
arrowShell.addEventListener("viewerframechange", (event) => {
  if (event.target !== arrowShell) return;
  sharedView.time = event.detail.time;
  viewers.get("baseline").controller?.setFrame(sharedView.time);
});
arrowShell.addEventListener("viewercamerachange", (event) => {
  if (event.target !== arrowShell) return;
  sharedView.camera = event.detail;
  viewers.get("baseline").controller?.setCameraState(sharedView.camera);
});
arrowShell.querySelector("[data-settings-menu]").addEventListener("input", (event) => {
  const attribute = [...event.target.attributes].find(({ name }) => name.startsWith("data-"))?.name;
  if (!attribute || attribute === "data-compare") return;
  const input = baselineShell.querySelector(`[${attribute}]`);
  if (!input) return;
  input.value = event.target.value;
  input.checked = event.target.checked;
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  if (attribute === "data-confidence-cutoff") syncBaselineView();
});
function revealComparison() {
  if (!stage.classList.contains("is-transitioning")) return;
  const version = ++revealVersion;
  arrowShell.querySelector("[data-viewer-loading]").hidden =
    !arrowShell.classList.contains("is-comparison-transitioning");
  const visible = [...viewers.values()].filter(({ shell }) => !shell.hidden);
  if (!visible.every(({ ready }) => ready)) {
    return;
  }
  const referenceCutoff = arrowShell.querySelector("[data-confidence-cutoff]");
  const baselineCutoff = baselineShell.querySelector("[data-confidence-cutoff]");
  if (baselineCutoff.value !== referenceCutoff.value) {
    baselineCutoff.value = referenceCutoff.value;
    baselineCutoff.dispatchEvent(new Event("input", { bubbles: true }));
  }
  if (!syncBaselineView()) return;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      if (version !== revealVersion || !visible.every(({ ready }) => ready)) return;
      for (const { controller } of visible) controller.resize();
      if (!syncBaselineView()) return;
      for (const { controller } of visible) controller.render();
      stage.classList.remove("is-transitioning");
      arrowShell.querySelector("[data-viewer-loading]").hidden = true;
      const changed = visible.filter(({ shell }) => shell.classList.contains("is-comparison-transitioning"));
      for (const { shell } of changed) shell.classList.remove("is-comparison-transitioning");
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const start = document.timeline.currentTime;
      for (const { shell } of changed) {
        for (const element of revealElements(shell)) {
          if (element.hidden) continue;
          const animation = element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 140, easing: "ease-out" });
          animation.startTime = start;
        }
      }
    }),
  );
}
for (const entry of viewers.values()) {
  entry.shell.addEventListener("viewerready", (event) => {
    if (event.target !== entry.shell) return;
    entry.ready = true;
    revealComparison();
  });
}

function showPrediction(side, key, visible) {
  const entry = viewers.get(side);
  entry.shell.hidden = !visible;
  if (!visible) {
    if (entry.selected !== null) entry.controller?.suspend();
    entry.selected = null;
    return;
  }
  if (entry.selected === key) return;
  entry.ready = false;
  entry.shell.dataset.example = key;
  if (!entry.controller && !installViewer) return;
  if (!entry.controller)
    entry.controller = installViewer(entry.shell, entry.examples, {
      externalControl: side === "baseline",
      animateReveal: false,
      cameraHitTest: side === "arrow" ? cameraHitTest : null,
      navigationElement: side === "arrow" ? navigationSurface : null,
      backgroundElement: side === "baseline" ? () => arrowShell.querySelector("[data-viewer-stage]") : null,
    });
  else entry.controller.select(key);
  entry.selected = key;
  if (side === "baseline") requestAnimationFrame(syncBaselineView);
}

function update() {
  const scene = scenes[state.task].find((entry) => entry.id === state.scene);
  const hasArrow = Boolean(scene.predictions.ARROW);
  const hasBaseline = Boolean(scene.predictions[state.method]);
  const canCompare = hasArrow && models[state.task].some((method) => Boolean(scene.predictions[method]));
  const paired = hasArrow && hasBaseline;
  const comparing = paired && state.compare;
  const selections = [
    ["arrow", predictionKey(state.task, scene.id, "ARROW"), hasArrow],
    ["baseline", predictionKey(state.task, scene.id, state.method), hasBaseline && (!hasArrow || comparing)],
  ];
  if (selections.some(([side, key, visible]) => visible && viewers.get(side).selected !== key)) {
    ++revealVersion;
    stage.classList.add("is-transitioning");
    for (const [side, key, visible] of selections) {
      const entry = viewers.get(side);
      const changed = visible && (entry.selected !== key || !entry.ready);
      entry.shell.classList.toggle("is-comparison-transitioning", changed);
      if (changed)
        revealElements(entry.shell).forEach((element) => {
          element.getAnimations().forEach((animation) => animation.cancel());
        });
    }
  }
  stage.classList.toggle("is-comparing", comparing);
  stage.classList.toggle("baseline-only", !hasArrow);
  $("[data-panel-a]").hidden = !hasArrow;
  baselinePanel.hidden = !hasBaseline || (hasArrow && !comparing);
  referenceBubble.hidden = !comparing;
  baselineBubble.hidden = !comparing;
  splitter.hidden = !comparing;
  showPrediction("arrow", predictionKey(state.task, scene.id, "ARROW"), hasArrow);
  showPrediction(
    "baseline",
    predictionKey(state.task, scene.id, state.method),
    hasBaseline && (!hasArrow || comparing),
  );
  referenceStage.append(baselinePanel, navigationSurface, baselineBubble, splitter);
  arrowShell.dataset.comparisonLayout = comparing ? "split" : "none";
  for (const { controller } of viewers.values()) controller?.resize();
  syncBaselineView();
  revealComparison();
  for (const { shell } of [viewers.get("arrow")]) {
    const compare = shell.querySelector("[data-compare]");
    compare.closest(".comparison-options").hidden = !canCompare;
    compare.checked = canCompare && state.compare;
    compare.disabled = !canCompare;
  }
  root.querySelectorAll("[data-scene]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.scene === state.scene));
  });
  root.querySelectorAll("[data-task]").forEach((button) => {
    const active = button.dataset.task === state.task;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function loadMethods() {
  const scene = scenes[state.task].find((entry) => entry.id === state.scene);
  const available = models[state.task].filter((method) => scene.predictions[method]);
  if (!available.includes(state.method)) state.method = available[0] || null;
  methodSelect.replaceChildren(
    ...models[state.task].map((method) => {
      const option = new Option(method, method);
      option.disabled = !scene.predictions[method];
      if (option.disabled) option.title = "Prediction not exported yet";
      return option;
    }),
  );
  methodSelect.value = state.method || "";
  methodSelect.disabled = available.length === 0;
}

function loadTask(switchingTask = false) {
  root.dataset.comparisonTask = state.task;
  $("[data-scenes]").replaceChildren(
    ...scenes[state.task].map((scene) => {
      const button =
        (!switchingTask && $(`[data-scenes] [data-scene="${scene.id}"][data-scene-task="${state.task}"]`)) ||
        document.createElement("button");
      button.type = "button";
      button.className = "scene-card";
      button.dataset.scene = scene.id;
      button.dataset.sceneTask = state.task;
      button.setAttribute("aria-pressed", String(scene.id === state.scene));
      button.setAttribute("aria-label", scene.title);
      button.title = scene.title;
      const image = button.querySelector("img") || document.createElement("img");
      [image.width, image.height] = scene.imageSize;
      installScenePreview(image, scene.image);
      image.alt = "";
      image.draggable = false;
      if (!image.parentElement) button.append(image);
      button.onclick = () => {
        if (state.scene === scene.id) return;
        state.scene = scene.id;
        loadMethods();
        update();
        saveSelection();
      };
      return button;
    }),
  );
  loadMethods();
  update();
}

root.querySelectorAll("[data-task]").forEach((button) =>
  button.addEventListener("click", () => {
    if (state.task === button.dataset.task) return;
    taskSelections.set(state.task, { scene: state.scene, method: state.method });
    state.task = button.dataset.task;
    Object.assign(state, taskSelections.get(state.task) || { scene: scenes[state.task][0].id });
    loadTask(true);
    positionTaskIndicator(true);
    saveSelection();
  }),
);
methodSelect.addEventListener("change", () => {
  state.method = methodSelect.value;
  update();
  saveSelection();
});

function setSplit(value) {
  state.split = Math.max(5, Math.min(95, value));
  stage.style.setProperty("--split", `${state.split}%`);
  arrowShell.style.setProperty("--split", `${state.split}%`);
  splitter.setAttribute("aria-valuenow", String(Math.round(state.split)));
}
function pointerSplit(event) {
  const rect = referenceStage.getBoundingClientRect();
  setSplit(((event.clientX - rect.left) / rect.width) * 100);
}
splitter.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  splitter.setPointerCapture(event.pointerId);
  pointerSplit(event);
});
splitter.addEventListener("pointermove", (event) => {
  if (splitter.hasPointerCapture(event.pointerId)) pointerSplit(event);
});
splitter.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  setSplit(event.key === "Home" ? 5 : event.key === "End" ? 95 : state.split + (event.key === "ArrowLeft" ? -5 : 5));
});

arrowShell.addEventListener("viewerexpansionchange", () => {
  requestAnimationFrame(() => {
    for (const { controller } of viewers.values()) controller?.resize();
    syncBaselineView();
  });
});

loadTask();
