import { models, scenes } from "./comparison-scenes.js";

const taskIds = { tracking: "track", reconstruction: "recon" };
const methodIds = { "VGGT-Ω": "omega", DA3: "da3", OmniX: "omnix", "MVTracker+DA3": "mvtracker", OpenD4RT: "d4rt" };

export function readComparisonState(search) {
  const query = new URLSearchParams(search);
  const requestedTask = query.get("task") ?? query.get("comparison");
  const task =
    Object.keys(taskIds).find((task) => task === requestedTask || taskIds[task] === requestedTask) || "tracking";
  const requestedScene = query.get("scene") ?? query.get("example");
  const scene = scenes[task].find((scene) => scene.id === requestedScene) || scenes[task][0];
  const available = models[task].filter((method) => scene.predictions[method]);
  const requestedMethod = query.get("model");
  const method =
    available.find((method) => method === requestedMethod || methodIds[method] === requestedMethod) ||
    available[0] ||
    null;
  return { task, scene: scene.id, method, compare: Boolean(requestedMethod && method) };
}

export function comparisonURL(href, state) {
  const url = new URL(href);
  url.searchParams.delete("comparison");
  url.searchParams.delete("example");
  url.searchParams.set("task", taskIds[state.task]);
  url.searchParams.set("scene", state.scene);
  const scene = scenes[state.task].find((scene) => scene.id === state.scene);
  if (state.compare && scene?.predictions[state.method] && methodIds[state.method])
    url.searchParams.set("model", methodIds[state.method]);
  else url.searchParams.delete("model");
  url.hash = "";
  return url;
}
