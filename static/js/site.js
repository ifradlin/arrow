import "./theme.js";
import { observeViewport } from "./viewport.js";
import { viewerDisabled } from "./viewer-bootstrap.js";
import { installViewerExpansion } from "./viewer-expansion.js";
import { installCapabilitySelection } from "./viewer-selection.js";
import { installCitationCopy } from "./citation-copy.js";
import { installPaperImagePreviews } from "./paper-images.js";

if (new URLSearchParams(window.location.search).get("figures") === "off") {
  document.querySelectorAll(".paper-figure").forEach((figure) => figure.remove());
}
installPaperImagePreviews();

if (new URLSearchParams(window.location.search).get("styles") === "off") {
  document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    link.disabled = true;
  });
  for (const sheet of document.styleSheets) sheet.disabled = true;
}

document.querySelectorAll(".hero, .result-card").forEach((element) => {
  observeViewport(element, (active) => element.classList.toggle("is-in-viewport", active));
});

installCitationCopy();

export function installLoader(loader) {
  const disabled = viewerDisabled(window.location.search);
  if (!disabled && !loader.closest("[data-viewer-manual]")) installCapabilitySelection(loader.closest("section"));
  if (loader && disabled) {
    const viewer = loader.closest("[data-arrow-viewer]");
    viewer.classList.add("is-disabled");
    loader.querySelector("[data-viewer-loading-text]").textContent = "Interactive viewer disabled (?viewer=off).";
    viewer.querySelectorAll("video").forEach((video) => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    });
    viewer.querySelectorAll("button, input").forEach((control) => {
      control.disabled = true;
    });
    loader
      .closest("section")
      .querySelectorAll("[data-example]")
      .forEach((link) => {
        link.setAttribute("aria-disabled", "true");
        link.addEventListener("click", (event) => event.preventDefault());
      });
  }
  if (loader && !disabled) {
    installViewerExpansion(loader.closest("[data-arrow-viewer]"));
    const cube = loader.querySelector(".viewer-loader-cube");
    const facePaths = [...cube.querySelectorAll("[data-loader-face]")];
    const edgePath = cube.querySelector("[data-loader-edges]");
    const viewer = loader.closest("[data-arrow-viewer]");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const corners = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ];
    const faces = [
      [4, 5, 6, 7],
      [1, 0, 3, 2],
      [0, 4, 7, 3],
      [5, 1, 2, 6],
      [3, 7, 6, 2],
      [0, 1, 5, 4],
    ];
    const initialAngle = 0.65;
    let animationFrame = null;
    let started = null;
    let inViewport = false;

    const draw = (angle) => {
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      const tilt = -0.42 + angle - initialAngle;
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);
      const rotated = corners.map(([x, y, z]) => {
        const rx = x * cosAngle + z * sinAngle;
        const rz = z * cosAngle - x * sinAngle;
        return [rx, y * cosTilt - rz * sinTilt, y * sinTilt + rz * cosTilt];
      });
      const projected = rotated.map(([x, y, z]) => {
        const scale = 40 / (5 - z);
        return [(20 + x * scale).toFixed(2), (20 - y * scale).toFixed(2)];
      });
      const visible = faces
        .map((indices, index) => {
          const [a, b, c] = indices.map((corner) => rotated[corner]);
          const u = b.map((value, axis) => value - a[axis]);
          const v = c.map((value, axis) => value - a[axis]);
          const normal = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
          const center = [0, 1, 2].map((axis) => indices.reduce((sum, corner) => sum + rotated[corner][axis], 0) / 4);
          const facing = normal[0] * -center[0] + normal[1] * -center[1] + normal[2] * (5 - center[2]);
          return { indices, index, depth: center[2], facing };
        })
        .filter((face) => face.facing > 0)
        .sort((a, b) => a.depth - b.depth);

      const edges = new Map();
      visible.forEach((face, index) => {
        facePaths[index].setAttribute("fill", `var(--loader-cube-face-${face.index})`);
        facePaths[index].setAttribute("d", `M${face.indices.map((corner) => projected[corner].join(" ")).join("L")}Z`);
        face.indices.forEach((corner, edge) => {
          const next = face.indices[(edge + 1) % 4];
          edges.set([corner, next].sort((a, b) => a - b).join("-"), [corner, next]);
        });
      });
      facePaths.slice(visible.length).forEach((path) => path.setAttribute("d", ""));
      edgePath.setAttribute(
        "d",
        [...edges.values()].map(([a, b]) => `M${projected[a].join(" ")}L${projected[b].join(" ")}`).join(""),
      );
    };

    const active = () =>
      inViewport &&
      !loader.hidden &&
      !document.hidden &&
      !viewer.classList.contains("is-unavailable") &&
      !reducedMotion.matches;
    const tick = (now) => {
      animationFrame = null;
      if (!active()) return;
      if (started === null) started = now;
      draw(initialAngle + ((now - started) * Math.PI * 2) / 4400);
      animationFrame = requestAnimationFrame(tick);
    };
    const sync = () => {
      if (active()) {
        if (animationFrame === null) animationFrame = requestAnimationFrame(tick);
      } else {
        if (animationFrame !== null) cancelAnimationFrame(animationFrame);
        animationFrame = null;
        started = null;
        if (reducedMotion.matches) draw(initialAngle);
      }
    };

    draw(initialAngle);
    const observer = new MutationObserver(sync);
    observer.observe(loader, { attributes: true, attributeFilter: ["hidden"] });
    observer.observe(viewer, { attributes: true, attributeFilter: ["class"] });
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);
    observeViewport(viewer, (active) => {
      inViewport = active;
      sync();
    });
    sync();
  }
}

document.querySelectorAll("[data-arrow-viewer]:not([data-viewer-manual]) [data-viewer-loading]").forEach(installLoader);
