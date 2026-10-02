import { radarMethods, radarPages, radialScore } from "./radar-data.js";
import { installRadarReveal } from "./enter-animations.js";

const namespace = "http://www.w3.org/2000/svg";
const center = [360, 360];
const chartSize = 688;
const groupBandRadius = 296;
const point = (angle, distance) => [center[0] + Math.cos(angle) * distance, center[1] + Math.sin(angle) * distance];

function createSvgNode(tag, attributes = {}, text, owner = document) {
  const element = owner.createElementNS(namespace, tag);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
  if (text !== undefined) element.textContent = text;
  return element;
}

export function axisLayout(axes) {
  const groups = axes.filter((axis, index) => index === 0 || axis.group !== axes[index - 1].group).length;
  const gap = 0.16;
  const step = (Math.PI * 2 - groups * gap) / axes.length;
  let cursor = -Math.PI / 2 - step / 2;
  return axes.map((axis, index) => {
    if (index && axis.group !== axes[index - 1].group) cursor += gap;
    const start = cursor;
    cursor += step;
    return { start, end: cursor, angle: start + step / 2 };
  });
}

export function groupLayout(axes, layout = axisLayout(axes)) {
  const groups = [];
  for (let first = 0; first < axes.length; ) {
    let last = first;
    while (last + 1 < axes.length && axes[last + 1].group === axes[first].group) last++;
    groups.push({ first, last, start: layout[first].start, end: layout[last].end });
    first = last + 1;
  }
  return groups;
}

function arc(start, end, distance, reverse = false) {
  return `M${point(reverse ? end : start, distance)} A${distance},${distance} 0 ${end - start > Math.PI ? 1 : 0} ${reverse ? 0 : 1} ${point(reverse ? start : end, distance)}`;
}

export function spokeClipAngles(layout, index) {
  if (layout.length < 3) return [layout[index].start, layout[index].end];
  const previous = layout[(index + layout.length - 1) % layout.length].angle;
  const next = layout[(index + 1) % layout.length].angle;
  const angle = layout[index].angle;
  return [previous < angle ? previous : previous - Math.PI * 2, next > angle ? next : next + Math.PI * 2];
}

function sector(start, end, outer, inner = 0) {
  return `${arc(start, end, outer)} L${inner ? point(end, inner) : center} ${inner ? arc(start, end, inner, true).replace(/^M/, "L") : ""} Z`;
}

export function reverseLabel(start, end) {
  return Math.sin((start + end) / 2) > 1e-8;
}

function curvedLabel(defs, id, start, end, distance, caption, className) {
  const svgNode = (tag, attributes, text) => createSvgNode(tag, attributes, text, defs.ownerDocument);
  const reverse = reverseLabel(start, end);
  defs.append(svgNode("path", { id, d: arc(start, end, distance, reverse) }));
  const label = svgNode("text", { class: className, "text-anchor": "middle", "dominant-baseline": "central" });
  const textPath = svgNode("textPath", { href: `#${id}`, startOffset: "50%" }, caption);
  textPath.dataset.caption = caption;
  textPath.dataset.compactCaption = caption
    .replace("3D reconstruction", "3D recon.")
    .replace("Aria Digital Twin", "ADT")
    .replace("Dynamic Replica", "Dyn. Rep.")
    .replace("PointOdyssey", "Pt. Odyssey")
    .replace("Panoptic Studio", "PStudio");
  label.append(textPath);
  return label;
}

export function methodColor(index) {
  const colors = [
    ["#007f89", "#5dc5ca"], // OmniX
    ["#7342a4", "#b396e5"], // 4RC
    ["#2469b4", "#7bb5ef"], // SpatialTracker-V2
    ["#268047", "#75c58e"], // St4RTrack
    ["#ac397a", "#ed8ec2"], // V-DPM
    ["#8c7019", "#d7b95e"], // OpenD4RT
    ["#5059aa", "#a6aff1"], // SM4RT
    ["#b64452", "#ef909b"], // Point4D
    ["#087caa", "#78c1e2"], // UniQuery4R
    ["#667d23", "#b2c96e"], // VGGT
    ["#466781", "#9eb9d0"], // Pi3
    ["#973bab", "#d793e6"], // VGGT-Ω
    ["#227c71", "#7ac7b9"], // DA3
    ["#2954a0", "#91aceb"], // MVTracker + VGGT-Ω
    ["#55871f", "#9bc865"], // LAPA + VGGT-Ω
    ["#ab4c97", "#e49cce"], // TapIP3D + VGGT-Ω
  ];
  if (index === 0) return "var(--radar-arrow)";
  const [light, dark] = colors[index - 1];
  return `light-dark(${light}, ${dark})`;
}

export function methodDash(index) {
  return ["", "8 4", "2 4", "11 3 3 3", "1 4", "5 3 1 3"][index % 6];
}

export function bindRadarHit(hit, reveal, dismiss) {
  const hover = (event) => {
    if (event.pointerType !== "touch") reveal(event);
  };
  hit.addEventListener("pointerenter", hover);
  hit.addEventListener("pointermove", hover);
  hit.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "touch") dismiss();
  });
  hit.addEventListener("focus", (event) => {
    if (hit.matches(":focus-visible")) reveal(event);
  });
  hit.addEventListener("blur", dismiss);
  hit.addEventListener("click", reveal);
  hit.addEventListener("keydown", (event) => {
    if (event.key === "Escape") dismiss();
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      reveal(event);
    }
  });
}

export function highlightRadarMethod(card, method) {
  for (const selector of ["[data-method]", "[data-legend-method]"]) {
    card.querySelectorAll(selector).forEach((element) => {
      const selected = Number(element.dataset.method ?? element.dataset.legendMethod) === method;
      element.classList.toggle("is-highlighted", method !== null && selected);
      element.classList.toggle("is-muted", method !== null && !selected);
    });
  }
}

export function seriesPath(axes, method, project) {
  const complete = axes.every((axis) => axis.scores[method] !== null);
  const start = complete ? 0 : (axes.findIndex((axis) => axis.scores[method] === null) + 1) % axes.length;
  let path = "",
    connected = false;
  axes.forEach((_, offset) => {
    const index = (start + offset) % axes.length;
    const axis = axes[index];
    if (axis.scores[method] === null) {
      connected = false;
      return;
    }
    const [x, y] = project(index, axis.scores[method]);
    path += `${connected ? "L" : "M"}${x},${y} `;
    connected = true;
  });
  return path + (complete && axes.length > 2 ? "Z" : "");
}

export function plotRadiusForWidth(width) {
  return width < 380 ? 238 : 256;
}

export function rankedMethods(axis, methods) {
  return [...methods].sort((a, b) => {
    const left = axis.values[a],
      right = axis.values[b];
    if (left === null) return right === null ? a - b : 1;
    if (right === null) return -1;
    return (axis.direction === "higher" ? right - left : left - right) || a - b;
  });
}

export function renderRadarChart(page, pageIndex, plotRadius = 256, compactPoints = false, owner = document) {
  const svgNode = (tag, attributes, text) => createSvgNode(tag, attributes, text, owner);
  const svg = svgNode("svg", {
    viewBox: `16 16 ${chartSize} ${chartSize}`,
    class: "radar-chart",
    role: "group",
    "aria-label": `${page.label}. Logarithmic relative performance: farther out is better.`,
  });
  const layout = axisLayout(page.axes);
  const angle = (index) => layout[index].angle;
  const labelRadius = (plotRadius + groupBandRadius) / 2;
  const project = (index, score) => point(angle(index), plotRadius * radialScore(score));
  const defs = svgNode("defs");
  svg.append(defs);
  for (const score of [0.25, 0.5, 0.75, 0.9, 1]) {
    const fraction = radialScore(score);
    svg.append(svgNode("circle", { cx: center[0], cy: center[1], r: plotRadius * fraction, class: "radar-grid" }));
    svg.append(
      svgNode(
        "text",
        { x: center[0] + 5, y: center[1] - plotRadius * fraction + 12, class: "radar-tick" },
        `${score * 100}`,
      ),
    );
  }
  for (const { first, start: a, end: b } of groupLayout(page.axes, layout)) {
    svg.append(svgNode("path", { d: arc(a, b, groupBandRadius), class: "radar-group-band" }));
    const id = `radar-label-${pageIndex}-${first}`;
    const label = curvedLabel(defs, id, a, b, 326, page.axes[first].group, "radar-group-label");
    if (pageIndex > 0) label.querySelector("textPath").dataset.compactCaption = page.axes[first].group;
    svg.append(label);
  }
  page.axes.forEach((axis, index) => {
    const [x, y] = point(angle(index), plotRadius);
    svg.append(svgNode("line", { x1: center[0], y1: center[1], x2: x, y2: y, class: "radar-spoke" }));
  });
  // Paint ARROW last so its outline remains legible at tied values.
  const pointLayers = [];
  for (const method of [...page.methods].reverse()) {
    const complete = page.axes.every((axis) => axis.scores[method] !== null);
    const series = svgNode("g", { class: `radar-series radar-method-${method}` });
    series.style.setProperty("--series-color", methodColor(method));
    series.dataset.method = method;
    series.style.strokeDasharray = methodDash(method);
    series.append(
      svgNode("path", {
        d: seriesPath(page.axes, method, project),
        class: `radar-shape${complete && page.axes.length > 2 ? " is-complete" : ""}`,
      }),
    );
    const points = svgNode("g", { class: `radar-series radar-method-${method}` });
    points.style.setProperty("--series-color", methodColor(method));
    points.dataset.method = method;
    page.axes.forEach((axis, index) => {
      if (axis.scores[method] === null) return;
      const [cx, cy] = project(index, axis.scores[method]);
      points.append(
        svgNode("circle", {
          cx,
          cy,
          r: compactPoints ? 7 : 4,
          class: "radar-point",
        }),
      );
    });
    svg.append(series);
    pointLayers.push(points);
  }
  svg.append(...pointLayers);
  page.axes.forEach((axis, index) => {
    const { start, end } = layout[index];
    const [clipStart, clipEnd] = spokeClipAngles(layout, index);
    const clipId = `radar-clip-${pageIndex}-${index}`;
    const clip = svgNode("clipPath", { id: clipId });
    clip.append(svgNode("path", { d: sector(clipStart, clipEnd, plotRadius) }));
    defs.append(clip);
    const hit = svgNode("g", {
      class: "radar-hit",
      tabindex: "0",
      role: "button",
      "aria-label": `${axis.group}, ${axis.label}. ${page.methods.map((index) => `${radarMethods[index]}: ${formatValue(axis, index)}`).join("; ")}`,
    });
    hit.append(svgNode("path", { d: sector(start, end, groupBandRadius), class: "radar-hit-area" }));
    const [x, y] = point(angle(index), plotRadius + 20);
    hit.append(
      svgNode("line", {
        x1: center[0],
        y1: center[1],
        x2: x,
        y2: y,
        class: "radar-highlight-spoke",
        "clip-path": `url(#${clipId})`,
      }),
    );
    const labelInset = 8 / labelRadius;
    hit.append(svgNode("path", { d: sector(start, end, groupBandRadius, plotRadius), class: "radar-highlight-label" }));
    const caption = axis.caption;
    hit.append(
      curvedLabel(
        defs,
        `radar-axis-${pageIndex}-${index}`,
        start + labelInset,
        end - labelInset,
        labelRadius,
        caption,
        "radar-metric-label",
      ),
    );
    svg.append(hit);
  });
  return svg;
}

function bindRadarChart(svg, page, showTooltip, hideTooltip) {
  svg.querySelectorAll(".radar-hit").forEach((hit, index) => {
    const reveal = (event) => {
      svg.querySelectorAll(".radar-hit.is-active").forEach((item) => item.classList.remove("is-active"));
      hit.classList.add("is-active");
      showTooltip(page.axes[index], event, hit);
    };
    const dismiss = () => {
      hit.classList.remove("is-active");
      hideTooltip();
    };
    bindRadarHit(hit, reveal, dismiss);
  });
}

export function renderRadarLegend(page, owner = document) {
  const element = owner.createElement("div");
  element.className = "radar-legend-page";
  page.methods.forEach((method) => {
    const button = owner.createElement("button");
    button.type = "button";
    button.className = `radar-legend-item radar-method-${method}`;
    button.style.setProperty("--series-color", methodColor(method));
    button.setAttribute("aria-pressed", "false");
    button.dataset.legendMethod = method;
    const swatch = createSvgNode("svg", { viewBox: "0 0 24 4", "aria-hidden": "true" }, undefined, owner);
    swatch.append(
      createSvgNode(
        "path",
        {
          d: "M0 2H24",
          stroke: "var(--series-color)",
          "stroke-width": method === 0 ? 3 : 2,
          "stroke-dasharray": methodDash(method),
        },
        undefined,
        owner,
      ),
    );
    button.append(swatch, owner.createTextNode(radarMethods[method]));
    element.append(button);
  });
  return element;
}

function formatValue(axis, method) {
  const value = axis.values[method];
  return value === null
    ? "Not reported"
    : `${(value * (axis.scale ?? 1)).toFixed(axis.digits)}${axis.unit === "%" || axis.unit === "°" ? "" : " "}${axis.unit}`.trim();
}

export function initRadar(card) {
  const pages = card.hasAttribute("data-radar-overview-only") ? radarPages().slice(0, 1) : radarPages();
  const viewport = card.querySelector("[data-radar-viewport]");
  const track = card.querySelector("[data-radar-pages]");
  const tooltip = card.querySelector("[data-radar-tooltip]");
  const previous = card.querySelector("[data-radar-prev]");
  const next = card.querySelector("[data-radar-next]");
  const label = card.querySelector("[data-radar-label]");
  const count = card.querySelector("[data-radar-count]");
  const legend = card.querySelector(".radar-legend");
  let highlightedMethod = null;
  let selectedMethod = null;
  const highlight = (method) => {
    highlightedMethod = method;
    highlightRadarMethod(card, highlightedMethod);
  };
  const selectMethod = (method) => {
    selectedMethod = method;
    legend.querySelectorAll("[data-legend-method]").forEach((button) => {
      button.setAttribute("aria-pressed", String(Number(button.dataset.legendMethod) === method));
    });
    highlight(method);
  };
  let current = 0,
    tooltipAxis;
  const hideTooltip = () => {
    tooltip.hidden = true;
    tooltipAxis = null;
    card.querySelectorAll(".radar-hit.is-active").forEach((hit) => hit.classList.remove("is-active"));
  };
  function showTooltip(axis, event, hit) {
    if (tooltipAxis !== axis) {
      tooltip.replaceChildren();
      const title = document.createElement("strong");
      title.textContent = `${axis.task} · ${axis.dataset}`;
      const metric = document.createElement("div");
      metric.className = "radar-tooltip-metric";
      metric.textContent = `${axis.label} ${axis.direction === "higher" ? "↑" : "↓"}${axis.source.startsWith("worldtrack") ? " · WorldTrack" : ""}`;
      tooltip.append(title, metric);
      const methods = rankedMethods(
        axis,
        pages[current].methods.filter((index) =>
          pages[current].axes.some((candidate) => candidate.task === axis.task && candidate.values[index] !== null),
        ),
      );
      methods.forEach((index) => {
        const row = document.createElement("div");
        row.className = `radar-tooltip-row radar-method-${index}`;
        row.style.setProperty("--series-color", methodColor(index));
        const name = document.createElement("span"),
          value = document.createElement("strong");
        name.textContent = radarMethods[index];
        value.textContent = formatValue(axis, index);
        row.append(name, value);
        tooltip.append(row);
      });
      tooltipAxis = axis;
    }
    tooltip.hidden = false;
    const bounds = viewport.getBoundingClientRect(),
      target = hit.getBoundingClientRect();
    const x = event.clientX ?? (target.left + target.right) / 2;
    const y = event.clientY ?? (target.top + target.bottom) / 2;
    tooltip.style.left = `${Math.max(8, Math.min(x - bounds.left + 12, bounds.width - tooltip.offsetWidth - 8))}px`;
    tooltip.style.top = `${Math.max(8, Math.min(y - bounds.top + 12, bounds.height - tooltip.offsetHeight - 8))}px`;
  }
  const prerendered = track.children.length > 0;
  let plotRadius = prerendered ? 256 : plotRadiusForWidth(viewport.getBoundingClientRect().width - 8);
  let compactPoints = !prerendered && viewport.getBoundingClientRect().width < 520;
  const elements = pages.map((page, index) => {
    let element = track.children[index];
    if (!element) {
      element = document.createElement("div");
      element.className = "radar-page";
      element.append(renderRadarChart(page, index, plotRadius, compactPoints));
      track.append(element);
    }
    bindRadarChart(element.firstElementChild, page, showTooltip, hideTooltip);
    return element;
  });
  const resizeLabels = () => {
    const width = elements[0].firstElementChild.getBoundingClientRect().width;
    if (!width) return;
    const nextRadius = plotRadiusForWidth(width);
    const nextCompactPoints = width < 520;
    if (nextRadius !== plotRadius || nextCompactPoints !== compactPoints) {
      plotRadius = nextRadius;
      compactPoints = nextCompactPoints;
      hideTooltip();
      elements.forEach((element, index) => {
        const svg = renderRadarChart(pages[index], index, plotRadius, compactPoints);
        bindRadarChart(svg, pages[index], showTooltip, hideTooltip);
        element.replaceChildren(svg);
      });
      highlight(highlightedMethod);
    }
    viewport.style.setProperty("--radar-label-scale", chartSize / width);
    track.querySelectorAll("textPath").forEach((text) => {
      text.textContent = width < 520 ? text.dataset.compactCaption : text.dataset.caption;
    });
  };
  new ResizeObserver(resizeLabels).observe(viewport);
  const legends = pages.map((page, index) => {
    const element = legend.children[index] ?? renderRadarLegend(page);
    if (!element.parentElement) legend.append(element);
    element.querySelectorAll("[data-legend-method]").forEach((button) => {
      const method = Number(button.dataset.legendMethod);
      button.addEventListener("pointerenter", (event) => {
        if (event.pointerType !== "touch") highlight(method);
      });
      button.addEventListener("pointerleave", (event) => {
        if (event.pointerType !== "touch" && !button.matches(":focus-visible")) highlight(selectedMethod);
      });
      button.addEventListener("focus", () => {
        if (button.matches(":focus-visible")) highlight(method);
      });
      button.addEventListener("blur", () => highlight(selectedMethod));
      button.addEventListener("click", () => {
        selectMethod(selectedMethod === method ? null : method);
      });
    });
    return element;
  });
  function show(index) {
    selectMethod(null);
    current = Math.max(0, Math.min(index, pages.length - 1));
    hideTooltip();
    track.style.transform = `translateX(-${100 * current}%)`;
    if (label) label.textContent = pages[current].label;
    if (count) count.textContent = `${current + 1} / ${pages.length}`;
    if (previous) previous.disabled = current === 0;
    if (next) next.disabled = current === pages.length - 1;
    legends.forEach((element, i) => {
      element.classList.toggle("is-active", i === current);
      element.inert = i !== current;
      element.setAttribute("aria-hidden", String(i !== current));
    });
    elements.forEach((element, i) => {
      element.inert = i !== current;
      element.setAttribute("aria-hidden", String(i !== current));
    });
  }
  previous?.addEventListener("click", () => show(current - 1));
  next?.addEventListener("click", () => show(current + 1));
  document.addEventListener("pointerdown", (event) => {
    if (!legend.contains(event.target)) selectMethod(null);
    if (!event.target.closest(".radar-hit")) hideTooltip();
  });
  legend.addEventListener("keydown", (event) => {
    if (event.key === "Escape") selectMethod(null);
  });
  show(0);
  installRadarReveal(viewport);
}

if (typeof document !== "undefined") document.querySelectorAll("[data-radar-card]").forEach(initRadar);
