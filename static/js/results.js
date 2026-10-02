import { radarTasks } from "./radar-data.js";
import { installBarReveal } from "./enter-animations.js";
import { installPageScroll } from "./page-scroll.js";

const groups = [
  { label: "Four-dataset mean", columns: [1, 5, 9, 13] },
  { label: "Aria Digital Twin", columns: [1] },
  { label: "Dynamic Replica", columns: [5] },
  { label: "PointOdyssey", columns: [9] },
  { label: "Panoptic Studio", columns: [13] },
];

export function worldtrackPages(rows) {
  return groups.map(({ label, columns }) => {
    const ranking = rows
      .map((cells) => ({
        method: cells[0],
        score: columns.reduce((sum, column) => sum + Number(cells[column]), 0) / columns.length,
      }))
      .filter(({ score }) => Number.isFinite(score))
      .sort((a, b) => b.score - a.score);
    const arrow = ranking.find(({ method }) => method === "ARROW");
    const baseline = ranking.find(({ method }) => method !== "ARROW");
    return {
      label,
      ranking: ranking.slice(0, 4),
      lead: Number(arrow.score.toFixed(2)) - Number(baseline.score.toFixed(2)),
    };
  });
}

export function sparkleCount(width) {
  return Math.max(1, Math.round((Math.max(0, Math.min(100, width)) / 100) * 12));
}

function addSparkles(bar, width) {
  const count = sparkleCount(width);
  for (let index = 0; index < count; index++) {
    const sparkle = document.createElement("span");
    sparkle.className = "ranking-sparkle";
    const edge = count === 1 ? 0 : index === 0 ? -1 : index === count - 1 ? 1 : 0;
    const properties = {
      "--x": edge ? `${edge < 0 ? 1.5 : 98.5}%` : `${6 + ((index + 0.2 + Math.random() * 0.6) / count) * 88}%`,
      "--y": `${25 + Math.random() * 50}%`,
      "--size": `${1 + Math.random() * 0.9}px`,
      "--x1": `${edge ? edge * (14 + Math.random() * 4) : -6 + Math.random() * 12}px`,
      "--y1": `${-8 + Math.random() * 16}px`,
      "--x2": `${edge ? -edge * (4 + Math.random() * 8) : -8 + Math.random() * 16}px`,
      "--y2": `${-10 + Math.random() * 20}px`,
      "--x3": `${-6 + Math.random() * 12}px`,
      "--y3": `${-8 + Math.random() * 16}px`,
      "--duration": `${5 + Math.random() * 2.5}s`,
      "--delay": `${-Math.random() * 7.5}s`,
    };
    for (const [name, value] of Object.entries(properties)) sparkle.style.setProperty(name, value);
    bar.append(sparkle);
  }
}

export function taskPages(task) {
  const metric = task.metrics[task.overviewMetric];
  const datasets = task.datasets.map((dataset) => ({
    label: dataset.label === "PStudio" ? "Panoptic Studio" : dataset.label,
    values: Object.fromEntries(
      Object.entries(dataset.reported)
        .filter(([, values]) => Number.isFinite(values[task.overviewMetric]))
        .map(([method, values]) => [method, values[task.overviewMetric] * (metric.scale || 1)]),
    ),
  }));
  const methods = [...new Set(datasets.flatMap((dataset) => Object.keys(dataset.values)))];
  const mean = {
    label: `${["", "", "Two", "Three", "Four"][datasets.length] || datasets.length}-dataset mean`,
    values: Object.fromEntries(
      methods
        .filter((method) => datasets.every((dataset) => Number.isFinite(dataset.values[method])))
        .map((method) => [
          method,
          datasets.reduce((sum, dataset) => sum + dataset.values[method], 0) / datasets.length,
        ]),
    ),
  };
  return [mean, ...datasets].map(({ label, values }) => ({
    label,
    metric,
    ranking: Object.entries(values)
      .map(([method, score]) => ({ method, score }))
      .sort(
        (a, b) =>
          (metric.direction === "higher" ? b.score - a.score : a.score - b.score) || a.method.localeCompare(b.method),
      ),
  }));
}

export function barWidth(score, best, direction, minimum = null) {
  if (!Number.isFinite(score) || !Number.isFinite(best) || score < 0 || best < 0) return 0;
  if (score === best) return 100;
  if (direction === "higher" && Number.isFinite(minimum) && minimum < best) {
    return Math.max(5, Math.min(100, 5 + (95 * (score - minimum)) / (best - minimum)));
  }
  const relative = direction === "higher" ? score / best : best / score;
  return Math.max(0, Math.min(100, relative * 100));
}

export function formatScore(score, metric) {
  return `${score.toFixed(metric.digits)}${metric.unit === "%" || metric.unit === "°" ? "" : metric.unit ? " " : ""}${metric.unit}`;
}

export function rankingBadge(page) {
  const arrow = page.ranking.find(({ method }) => method === "ARROW");
  const baseline = page.ranking.find(({ method }) => method !== "ARROW");
  if (!arrow || !baseline) return `${page.metric.label} ${page.metric.direction === "higher" ? "↑" : "↓"}`;
  if (page.metric.unit === "%") {
    const difference =
      Number(arrow.score.toFixed(page.metric.digits)) - Number(baseline.score.toFixed(page.metric.digits));
    return `${difference >= 0 ? "+" : "−"}${Math.abs(difference).toFixed(page.metric.digits)} pp`;
  }
  if (baseline.score === 0) return `${page.metric.label} ↓`;
  const difference = (arrow.score / baseline.score - 1) * 100;
  return `${Math.abs(difference).toFixed(1)}% ${difference <= 0 ? "lower" : "higher"}`;
}

function rankingRow({ method, score }, metric, best, minimum) {
  const row = document.createElement("div");
  row.className = "ranking-row";
  const width = barWidth(score, best, metric.direction, minimum);
  row.style.setProperty("--bar-width", `${width}%`);

  const label = document.createElement("div");
  label.className = "ranking-label";
  const name = document.createElement(method === "ARROW" ? "strong" : "span");
  name.textContent = method;
  const value = document.createElement(method === "ARROW" ? "strong" : "span");
  value.textContent = formatScore(score, metric);
  label.append(name, value);

  const track = document.createElement("div");
  track.className = "ranking-track";
  track.setAttribute("aria-hidden", "true");
  const bar = document.createElement("span");
  bar.className = `ranking-bar${method === "ARROW" ? " ranking-bar-arrow" : ""}`;
  if (method === "ARROW") addSparkles(bar, width);
  track.append(bar);
  row.append(label, track);
  return row;
}

function initTaskPager(card, task) {
  const pager = card.querySelector("[data-results-pager]");
  const track = card.querySelector("[data-ranking-pages]");
  const pages = taskPages(task);
  const prerendered = track.querySelector("[data-prerendered]");
  const elements = pages.map((page, index) => {
    const best = page.ranking[0]?.score;
    const minimum = page.metric.direction === "higher" ? page.ranking.at(-1)?.score : null;
    if (index === 0 && prerendered) {
      const bar = prerendered.querySelector(".ranking-bar-arrow");
      const arrow = page.ranking.find(({ method }) => method === "ARROW");
      if (bar && arrow) addSparkles(bar, barWidth(arrow.score, best, page.metric.direction, minimum));
      return prerendered;
    }
    const element = document.createElement("div");
    element.className = "ranking-page";
    element.append(...page.ranking.map((row) => rankingRow(row, page.metric, best, minimum)));
    return element;
  });
  if (prerendered) track.append(...elements.slice(1));
  else track.replaceChildren(...elements);

  const pageElements = [...track.children];
  const previous = pager.querySelector("[data-results-prev]");
  const next = pager.querySelector("[data-results-next]");
  const label = pager.querySelector("[data-results-label]");
  const count = pager.querySelector("[data-results-count]");
  const badge = pager.closest(".result-card").querySelector(".result-card-badge");
  let current = 0;
  let finishReveal;
  const viewport = track.parentElement;
  const scrollToPage = installPageScroll(viewport, {
    getIndex: () => current,
    count: pages.length,
    onSelect: (index) => show(index, false),
    onInteraction: () => finishReveal?.(),
    onVisible: (first, last) => {
      pageElements.forEach((page, index) => page.classList.toggle("is-visible", index >= first && index <= last));
    },
  });

  function show(index, scroll = true, animate = true) {
    finishReveal?.();
    current = Math.max(0, Math.min(index, pages.length - 1));
    if (scroll) scrollToPage(current, animate);
    label.textContent = pages[current].label;
    count.textContent = `${current + 1} / ${pages.length}`;
    badge.textContent = rankingBadge(pages[current]);
    badge.title = `ARROW compared with the best baseline on ${pages[current].label}`;
    previous.disabled = current === 0;
    next.disabled = current === pages.length - 1;
    pageElements.forEach((page, pageIndex) => {
      page.inert = pageIndex !== current;
      page.setAttribute("aria-hidden", String(pageIndex !== current));
    });
  }

  previous.addEventListener("click", () => scrollToPage(Math.max(0, current - 1)));
  next.addEventListener("click", () => scrollToPage(Math.min(pages.length - 1, current + 1)));
  pager.hidden = false;
  show(0, true, false);
  finishReveal = installBarReveal(card);
}

if (typeof document !== "undefined") {
  document.querySelectorAll("[data-results-task]").forEach((card) => {
    const task = radarTasks.find((task) => task.label === card.dataset.resultsTask);
    if (task) initTaskPager(card, task);
  });
}
