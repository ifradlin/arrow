import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/controls/OrbitControls.js";
import { LineSegments2 } from "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/lines/LineMaterial.js";
import {
  contiguousTrailStart,
  ensureTrailCapacity,
  isStaticTrack,
  positionTrackColor,
  summarizeTracks,
  trackConfidenceThreshold,
  trailHeadPresent,
  trailWindow,
  writeTrailStyle,
} from "./trajectory.js";
import {
  alignedImagePlaneProjection,
  animationDeltaSeconds,
  blendCameraCalibrations,
  cameraColorHsl,
  cameraColorIndices,
  cameraProjectionParameters,
  firstObservedTrackColors,
  fovFromNormalizedFy,
  frameAtTime,
  frustumDimensions,
  imagePlaneScale,
  pointRadiusPixels,
  pointViewportScale,
  rdfPoseToThreeElements,
  scrubberFrame,
  scrubberPosition,
  srgbByteToLinear,
  transformedCameraIntrinsics,
  visibleFrustumEdges,
  viewportDistanceScale,
} from "./viewer-math.js";
import { blocksViewerMovement, isViewerMovementKey, viewerShortcut } from "./viewer-shortcuts.js";
import {
  confidenceThresholds as progressiveThresholds,
  decodedPreviewImages,
  loadProgressiveBundle,
  onStreamProgress,
  progressiveBundleCached,
} from "./progressive-data.js";
import { createFrameScheduler } from "./viewer-frames.js";
import {
  backgroundFragmentShader,
  backgroundUniformValues,
  backgroundVertexShader,
  parseRgb,
  parseViewerBackground,
} from "./viewer-background.js";
import { observeViewport } from "./viewport.js";
import { whenStylesReady } from "./styles-ready.js";
import { installPickerIndicator } from "./picker-indicator.js";
import { installTouchNavigation, pointerDrag } from "./viewer-touch.js";
import { installBufferedIndicator, bufferingLoader, prebuffer } from "./viewer-buffering.js";
import { paintViewerScrubber, resetViewerTimeline, selectCapability, setCapabilityURL } from "./viewer-selection.js";
import { fetchManifest } from "./viewer-manifests.js";
import { enableLineFade } from "./viewer-line-fade.js";
import { enableLinePlanes } from "./viewer-line-planes.js";

const sceneCache = new Map();
const cameraTextureCache = new Map();
const textureLoadListeners = new Set();
const fallbackBackground = "#0a1125";
let colorProbe = null;
const resolveCssColor = (color) => {
  const rgb = parseRgb(color);
  if (rgb || !CSS.supports("color", color)) return rgb;
  // Modern syntaxes (oklch(), color-mix(), …) are resolved by the browser.
  colorProbe ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  colorProbe.fillStyle = "#000";
  colorProbe.fillStyle = color;
  colorProbe.fillRect(0, 0, 1, 1);
  return [...colorProbe.getImageData(0, 0, 1, 1).data.slice(0, 3)];
};
const sharedViewerDefaults = {
  camera_image_plane_fraction: 0.14,
  touch_interaction: "double_tap",
  touch_scroll_gutter: 24,
  prebuffer_seconds: 2,
  trajectory_history: 20,
  trajectory_width: 3,
  trajectory_fade_start: 30,
  trajectory_fade_end: 0,
  trajectory_occlusion: true,
  static_point_tolerance: 0.25,
};

export function installViewer(
  viewer,
  configuredExamples = null,
  {
    externalControl = false,
    alignImagePlane = false,
    animateReveal = true,
    cameraHitTest = null,
    navigationElement = null,
    backgroundElement = null,
  } = {},
) {
  const section = viewer.closest("section");
  const examples = configuredExamples || {
    brandenburg: {
      manifest: "./assets/exports/progressive/brandenburger-tor/arrow/manifest.json",
      mode: "static_collection",
      title: "Brandenburg Gate",
      pointLayer: "geometry",
      observationFrames: [0, 13, 27, 40, 53, 66],
      viewerDefaults: {
        confidence_cutoff: 45,
      },
    },
    allpix: {
      manifest: "./assets/exports/progressive/judo/arrow/manifest.json",
      mode: "monocular_video",
      title: "Judo",
      pointLayer: "tracks",
      trailLayer: "tracks",
      staticLayer: "static",
    },
    "mv-allpix": {
      manifest: "./assets/exports/progressive/pstudio-basketball/arrow/manifest.json",
      fallback: "rgb-camera-0.mp4",
      mode: "multi_view_video",
      title: "Basketball",
      pointLayer: "tracks",
      trailLayer: "tracks",
      staticLayer: "static",
      viewerDefaults: { prebuffer_timesteps: 2 },
    },
  };
  if (!configuredExamples) {
    for (const [key, selection] of Object.entries(examples)) {
      const chip = section.querySelector(`.example-chip[data-example="${key}"]`);
      if (!chip) {
        delete examples[key];
        continue;
      }
      selection.manifest = chip.dataset.manifest || selection.manifest;
    }
  }
  // `?publish=<name>` previews a bundle written by the D4RT viewer's publish tab.
  // `v` busts the cache of a bundle saved again under the same name.
  const pageQuery = new URLSearchParams(window.location.search);
  const published = pageQuery.get("publish");
  if (published && /^[a-z0-9][a-z0-9_-]*$/.test(published)) {
    // The mode is known before the manifest is: the publish tab says which it wrote.
    const multi = pageQuery.get("mode") === "multi_view_video";
    examples.publish = {
      manifest: `./assets_sandbox/exports/progressive/${published}/manifest.json?v=${pageQuery.get("v") || ""}`,
      mode: multi ? "multi_view_video" : "monocular_video",
      ...(multi ? { fallback: "rgb-view-0.mp4" } : {}),
      title: published,
      pointLayer: "tracks",
      trailLayer: "tracks",
      staticLayer: "static",
    };
    // No chip names it, so nothing else stamps it: the timeline only runs for the example it is on.
    viewer.dataset.example = "publish";
    // The page's inline script gave the viewer element Judo's title and mode, and a click
    // inside it reaches the capability selection, which copies them back onto it.
    viewer.dataset.sceneTitle = published;
    viewer.dataset.sceneMode = examples.publish.mode;
  }
  for (const selection of Object.values(examples)) {
    selection.viewerDefaults = {
      ...selection.viewerDefaults,
      trajectory_sample_count: selection.trailLayer ? 2048 : 1024,
      trajectory_history: 20,
      trajectory_width: sharedViewerDefaults.trajectory_width,
    };
  }
  const requestedExample = examples.publish ? "publish" : viewer.dataset.example || section.dataset.defaultExample;
  const selectedExample = examples[requestedExample] ? requestedExample : section.dataset.defaultExample;
  let example = examples[selectedExample];
  let activeExampleKey = null;
  let mountedViewer = null;
  let loadingIndicator = null;
  let renderer = null;
  let loadVersion = 0;
  const touchState = {};
  let inViewport = false;
  const frameCounts = new Map();
  const sceneStats = new Map();
  for (const [key, selection] of Object.entries(examples)) {
    resolveSceneBundle(new URL(selection.manifest, window.location.href), sceneCache)
      .then(({ manifest }) => {
        frameCounts.set(selection.manifest, manifest.frames);
        sceneStats.set(key, sceneSummary(selection, manifest));
        if (activeExampleKey === key) {
          meta.textContent = sceneStats.get(key);
          frameTotal.textContent = String(manifest.frames);
        }
      })
      .catch(() => {});
  }
  const cameraImageCache = new Map();
  const observationCards = new Map();
  const preparedScenes = new WeakMap();
  const readyExamples = new Set();
  const sceneSettings = new Map();
  const stage = viewer.querySelector("[data-viewer-stage]");
  const loading = viewer.querySelector("[data-viewer-loading]");
  const loadingText = viewer.querySelector("[data-viewer-loading-text]");
  const video = viewer.querySelector("[data-viewer-video]");
  const inset = viewer.querySelector("[data-viewer-inset]");
  const previewImage = viewer.querySelector("[data-viewer-preview]");
  const rgbInset = viewer.querySelector("[data-rgb-inset]");
  const staticObservations = viewer.querySelector("[data-static-observations]");
  const timelineControls = viewer.querySelector(":scope > .viewer-controls");
  const scrubber = timelineControls.querySelector("[data-viewer-scrubber]");
  const slider = timelineControls.querySelector("[data-frame-slider]");
  const frameCurrent = timelineControls.querySelector("[data-frame-current]");
  const frameTotal = timelineControls.querySelector("[data-frame-total]");
  const playButton = timelineControls.querySelector("[data-play-toggle]");
  const resetButton = viewer.querySelector("[data-reset-view]");
  const settingsButton = viewer.querySelector("[data-settings-toggle]");
  const settingsMenu = viewer.querySelector("[data-settings-menu]");
  const confidenceCutoffInput = viewer.querySelector("[data-confidence-cutoff]");
  const confidenceValue = viewer.querySelector("[data-confidence-value]");
  const pointSizeInput = viewer.querySelector("[data-point-size]");
  const pointSizeValue = viewer.querySelector("[data-point-size-value]");
  const staticAllCamerasInput = viewer.querySelector("[data-static-all-cameras]");
  const trajectorySampleInput = viewer.querySelector("[data-trajectory-sample]");
  const trajectorySampleValue = viewer.querySelector("[data-trajectory-sample-value]");
  const trajectoryHistoryInput = viewer.querySelector("[data-trajectory-history]");
  const trajectoryHistoryValue = viewer.querySelector("[data-trajectory-history-value]");
  const keepCamerasInput = viewer.querySelector("[data-keep-cameras]");
  const title = viewer.querySelector("[data-viewer-title]");
  const meta = viewer.querySelector("[data-viewer-meta]");
  const picker = configuredExamples ? null : section.querySelector(".example-picker");
  let playing = !matchMedia("(prefers-reduced-motion: reduce)").matches;

  const syncPlayButton = () => {
    playButton.setAttribute("aria-pressed", String(playing));
    playButton.setAttribute("aria-label", `${playing ? "Pause" : "Play"} ${example.title}`);
  };
  const paintScrubber = (position) => paintViewerScrubber(viewer, position);
  const setScrubberPosition = (position) => {
    slider.value = String(position);
    paintScrubber(position);
  };
  const resetTimeline = (frames = null) => resetViewerTimeline(viewer, frames);
  let canMeasureLayout = false;
  const stylesReady = whenStylesReady();
  const positionPickerIndicator = installPickerIndicator(picker, stylesReady);
  stylesReady.then(() => {
    canMeasureLayout = true;
    positionPickerIndicator();
  });

  const rememberSceneSettings = () => {
    if (!mountedViewer) return;
    sceneSettings.set(activeExampleKey, {
      point_size: Number(pointSizeInput.value),
      confidence_cutoff: Number(confidenceCutoffInput.value),
      trajectory_sample_count: Number(trajectorySampleInput.value),
      trajectory_history: Number(trajectoryHistoryInput.value),
      show_all_context_cameras: keepCamerasInput.checked,
      show_all_cameras: staticAllCamerasInput.checked,
    });
  };
  const sceneDefaults = (selection, manifest) => ({
    ...sharedViewerDefaults,
    ...manifest.viewer?.defaults,
    ...selection.viewerDefaults,
    ...sceneSettings.get(activeExampleKey),
  });
  const selectExample = (key, replaceURL = true) => {
    if (!examples[key]) return;
    if (key === activeExampleKey) return;
    rememberSceneSettings();
    const switching = activeExampleKey !== null;
    const cachedSwitch = readyExamples.has(key);
    if (canMeasureLayout) {
      renderer?.domElement.getAnimations().forEach((animation) => animation.cancel());
      rgbInset.getAnimations().forEach((animation) => animation.cancel());
      staticObservations.getAnimations().forEach((animation) => animation.cancel());
      video.getAnimations().forEach((animation) => animation.cancel());
    }
    activeExampleKey = key;
    mountedViewer?.dispose();
    mountedViewer = null;
    if (!configuredExamples) selectCapability(key, section);
    positionPickerIndicator(true);
    example = examples[key];
    loadingIndicator?.clear();
    loadingIndicator = null;
    viewer.classList.remove("is-touch-locked");
    if (navigationElement || renderer) (navigationElement || renderer.domElement).style.touchAction = "pan-y";
    renderer?.clear();
    const version = ++loadVersion;
    viewer.dataset.manifest = example.manifest;
    viewer.dataset.mode = example.mode;
    // The registered example type is known before its binary payload arrives.
    // Set it immediately so static-only UI never flashes as a video timeline.
    viewer.dataset.inputMode = example.mode;
    viewer.dataset.pointLayer = example.pointLayer;
    viewer.dataset.hasTrajectories = String(Boolean(example.trailLayer));
    stage.setAttribute(
      "aria-label",
      example.mode === "static_collection" ? "Interactive 3D scene" : "Interactive 4D scene",
    );
    viewer.classList.remove("is-following-input-camera");
    rgbInset.setAttribute("aria-pressed", "false");
    const inputAction = example.mode === "multi_view_video" ? "Select camera 1 view" : "Follow input camera";
    rgbInset.setAttribute("aria-label", inputAction);
    rgbInset.title = inputAction;
    viewer.classList.remove("is-ready", "is-unavailable", "is-buffering", "has-preview-frames");
    stage.removeAttribute("aria-busy");
    previewImage.hidden = true;
    viewer.classList.toggle("is-cached-switch", cachedSwitch);
    staticObservations.hidden = true;
    staticObservations.classList.remove("multiview-observations");
    staticObservations.replaceChildren();
    // Only show a fallback frame once it belongs to the selected example.
    const fallbackURL = new URL(example.fallback || "rgb.mp4", new URL(example.manifest, window.location.href)).href;
    viewer.classList.toggle("is-switching-inset", cachedSwitch && example.mode === "monocular_video");
    if (video.src !== fallbackURL) {
      viewer.classList.remove("has-fallback-frame");
      video.src = fallbackURL;
    }
    video.playbackRate = example.mode === "static_collection" ? 0.2 : example.fallbackPlaybackRate || 1;
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) viewer.classList.add("has-fallback-frame");
    else
      video.addEventListener(
        "loadeddata",
        () => {
          if (version === loadVersion && video.currentSrc === fallbackURL) viewer.classList.add("has-fallback-frame");
        },
        { once: true },
      );
    if (example.mode === "multi_view_video") {
      inset.pause();
      inset.removeAttribute("src");
      inset.load();
    } else {
      if (inset.src !== fallbackURL) inset.src = fallbackURL;
    }
    if (inViewport) video.play().catch(() => {});
    loading.hidden = cachedSwitch;
    loadingText.textContent = "Loading interactive scene…";
    title.textContent = example.title;
    meta.textContent = sceneStats.get(key) || "";
    resetTimeline(frameCounts.get(example.manifest));
    playing = example.mode !== "static_collection" && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    syncPlayButton();
    playButton.disabled = false;
    slider.disabled = false;
    if (replaceURL) {
      const url = new URL(window.location.href);
      if (section.id === "overview") setCapabilityURL(url, key);
      else url.searchParams.set("example", key);
      url.hash = "";
      history.replaceState({}, "", url);
    }
    load(version, switching, cachedSwitch).catch((error) => {
      if (version !== loadVersion) return;
      loading.hidden = false;
      readyExamples.delete(key);
      activeExampleKey = null;
      console.error("Could not load ARROW viewer", error);
      viewer.classList.remove("is-ready", "is-cached-switch", "is-switching-inset");
      staticObservations.hidden = true;
      viewer.classList.add("is-unavailable");
      loadingText.textContent = "Interactive scene unavailable. Playing input video instead.";
      meta.textContent = "Video only";
      playButton.disabled = true;
      slider.disabled = true;
    });
  };
  if (!configuredExamples)
    section.querySelectorAll(".example-chip[data-example]").forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        selectExample(item.dataset.example);
      });
    });
  observeViewport(viewer, (active) => {
    inViewport = active;
    mountedViewer?.setActive(active);
    if (!active) {
      video.pause();
      inset.pause();
    } else if (!mountedViewer) video.play().catch(() => {});
  });
  selectExample(selectedExample, false);

  async function load(version, switching, cachedSwitch) {
    const selection = example;
    const sourceURL = new URL(selection.manifest, window.location.href);
    const bundle = await resolveSceneBundle(sourceURL, sceneCache);
    if (version !== loadVersion) return;
    const { manifest, manifestURL } = bundle;
    if (selection.mode === "monocular_video") {
      rgbInset.style.aspectRatio = `${manifest.image.width} / ${manifest.image.height}`;
    }
    if (frameCounts.get(selection.manifest) !== manifest.frames) resetTimeline(manifest.frames);
    frameCounts.set(selection.manifest, manifest.frames);
    const stats = sceneSummary(selection, manifest);
    sceneStats.set(activeExampleKey, stats);
    meta.textContent = stats;
    const assetURL = (entry) => new URL(entry.path, manifestURL).href;
    const videoURL = assetURL(manifest.image);
    const videoURLs = (manifest.images || [manifest.image]).map(assetURL);
    const inputMode = manifest.input?.mode || viewer.dataset.mode;
    const defaults = sceneDefaults(selection, manifest);
    const bufferHistory = Number(defaults.trajectory_history ?? trajectoryHistoryInput.value);
    const cachedBuffer =
      cachedSwitch ||
      (manifest.format !== "arrow-web-example/v2" &&
        progressiveBundleCached(
          manifest,
          manifestURL,
          selection,
          sceneCache,
          playing
            ? (defaults.prebuffer_timesteps ??
                Math.ceil((selection.playbackFps || manifest.fps) * defaults.prebuffer_seconds) + 1)
            : 1,
        ));
    const bufferedIndicator = installBufferedIndicator(
      scrubber.querySelector("[data-buffered-ranges]"),
      manifest.frames,
    );
    loadingIndicator = bufferedIndicator;
    const isStatic = inputMode === "static_collection";
    const isMulti = inputMode === "multi_view_video";
    if (!isMulti) {
      if (inset.src !== videoURL) inset.src = videoURL;
      inset.loop = !isStatic;
    }
    const cached = await loadSceneBundle(bundle, selection, sceneCache, (stream) => {
      if (version === loadVersion && !mountedViewer && selection.mode !== "static_collection") {
        bufferedIndicator.update((frame) => stream.ready(frame, bufferHistory), 0, !cachedBuffer);
      }
    });
    const { points, trails, staticPoints, cameraPoses, cameraValid, cameraIntrinsics } = cached;
    if (version !== loadVersion) return;
    if (!isMulti && !cached.stream) await waitForVideo(inset);
    if (version !== loadVersion) return;
    const imageFrames = isStatic
      ? selection.observationFrames || []
      : Array.from({ length: manifest.frames }, (_, frame) => frame);
    const imageKey = `${manifestURL.href}:${videoURLs.join(",")}:${imageFrames.join(",")}`;
    let cameraImages = cached.cameraImages || cameraImageCache.get(imageKey);
    if (!cameraImages) {
      cameraImages = isMulti
        ? await renderMultiviewCameraImages(videoURLs, manifest, imageFrames)
        : await renderCameraImages(videoURL, manifest, imageFrames);
      if (version !== loadVersion) return;
      cameraImageCache.set(imageKey, cameraImages);
    }
    if (isStatic || isMulti) {
      const isSingleImage = isStatic && (manifest.input?.sceneType === "image" || manifest.frames === 1);
      staticObservations.classList.toggle("single-image-observations", isSingleImage);
      const cards = observationCards.get(activeExampleKey);
      if (cards) {
        staticObservations.classList.toggle("multiview-observations", isMulti);
        staticObservations.replaceChildren(...cards);
      } else {
        if (isStatic) populateStaticObservations(staticObservations, cameraImages, selection.title, isSingleImage);
        else {
          const contextCameraIds = manifest.input?.cameraIndices || [];
          const displayCameraIds = manifest.input?.displayCameraIndices || contextCameraIds;
          const displayViews = displayCameraIds.map((cameraId) => contextCameraIds.indexOf(cameraId));
          populateMultiviewObservations(
            staticObservations,
            cameraImages,
            videoURLs.length,
            displayViews,
            displayCameraIds,
          );
        }
        observationCards.set(activeExampleKey, [...staticObservations.children]);
      }
    }
    if (switching) await nextPaint();
    if (version !== loadVersion) return;
    const cutoff = Number(defaults.confidence_cutoff ?? confidenceCutoffInput.value);
    let prepared = cached.stream
      ? {
          framingThresholds: progressiveThresholds(points, Math.max(50, cutoff)),
          bounds: [points, staticPoints]
            .filter(Boolean)
            .reduce(
              (box, layer) =>
                box.union(
                  new THREE.Box3(
                    new THREE.Vector3(
                      layer.descriptor.bounds[0][0],
                      -layer.descriptor.bounds[1][1],
                      -layer.descriptor.bounds[1][2],
                    ),
                    new THREE.Vector3(
                      layer.descriptor.bounds[1][0],
                      -layer.descriptor.bounds[0][1],
                      -layer.descriptor.bounds[0][2],
                    ),
                  ),
                ),
              new THREE.Box3(),
            ),
          confidenceThresholds: progressiveThresholds(points, cutoff),
          trailConfidenceThresholds: progressiveThresholds(trails, cutoff),
        }
      : preparedScenes.get(points)?.get(cutoff);
    if (!prepared) {
      prepared = await prepareScene(points, trails, cutoff, () => version === loadVersion);
      if (version !== loadVersion) return;
      if (!preparedScenes.has(points)) preparedScenes.set(points, new Map());
      preparedScenes.get(points).set(cutoff, prepared);
    }
    if (cached.stream && !isStatic && playing) {
      await prebuffer(
        cached.stream,
        0,
        manifest.frames,
        selection.playbackFps || manifest.fps,
        bufferHistory,
        defaults.prebuffer_seconds,
        defaults.prebuffer_timesteps,
      );
      if (version !== loadVersion) return;
    }
    await stylesReady;
    if (version !== loadVersion) return;
    mountedViewer = mount({
      manifest,
      points,
      trails,
      staticPoints,
      prepared,
      cameraPoses: cameraPoses && new Float32Array(cameraPoses),
      cameraValid: cameraValid && new Uint8Array(cameraValid),
      cameraIntrinsics: cameraIntrinsics && new Float32Array(cameraIntrinsics),
      cameraImages,
      stream: cached.stream,
      bufferedIndicator,
      cachedBuffer,
    });
    viewer.dispatchEvent(new Event("viewerready"));
    readyExamples.add(activeExampleKey);
  }

  function mount({
    manifest,
    points: pointData,
    trails: trailData,
    staticPoints: staticData,
    prepared,
    cameraPoses,
    cameraValid,
    cameraIntrinsics,
    cameraImages,
    stream,
    bufferedIndicator,
    cachedBuffer,
  }) {
    const sceneKey = activeExampleKey;
    let disposed = false;
    // Assigned once the scene is fully set up; until then changes only mark
    // the scene dirty for the first frame.
    let renderFrame = null;
    let animating = () => false;
    const scheduler = createFrameScheduler({
      canRun: () => renderFrame !== null && !disposed && inViewport && !document.hidden,
      isAnimating: () => animating(),
      frame: (now, previous) => renderFrame(now, previous),
    });
    const invalidate = scheduler.invalidate;
    const buffering = bufferingLoader(loading, loadingText);
    const eventAbort = new AbortController();
    const listen = (target, type, handler, options = {}) =>
      target.addEventListener(type, handler, { ...options, signal: eventAbort.signal });
    const frames = manifest.frames;
    const [tracks, pointFrames] = pointData?.shape || [0, frames];
    const positions = pointData?.positions;
    const valid = pointData?.valid;
    const visible = pointData?.visible;
    const confidence = pointData?.confidence;
    const colors = pointData?.colors;
    const sourceColors = pointData?.sourceColors;
    const colorFrames = colors?.length === tracks * pointFrames * 3 ? pointFrames : 1;
    const sourceColorFrames = sourceColors?.length === tracks * pointFrames * 3 ? pointFrames : 1;
    const trailPositions = trailData?.positions;
    const trailValid = trailData?.valid;
    const trailVisible = trailData?.visible;
    const trailConfidence = trailData?.confidence;
    const trailRgb = trailData?.colors || trailData?.sourceColors;
    const trailTracks = trailData?.shape[0] || 0;
    const trailRgbFrames = trailRgb?.length === trailTracks * frames * 3 ? frames : 1;
    const isAllpix = example.pointLayer === "tracks";
    // A published (v4) bundle has baked what trails and what is static; the page only draws it.
    const trailFlags = trailData?.trail;
    const staticCount = staticData?.shape[0] || 0;
    const staticConfidenceThreshold = (percent) =>
      staticData?.ranks && percent > 0 ? staticData.ranks[Math.round(percent)] : -Infinity;
    const staticShown = (point, frame) => {
      if (!staticData.valid[point]) return false;
      if (staticData.confidence && staticData.confidence[point] < staticCutoff) return false;
      if (staticData.visibleBits) {
        const bytes = staticData.descriptor.fields.visibleBits.shape[2];
        return Boolean(staticData.visibleBits[point * bytes + (frame >> 3)] & (1 << (frame & 7)));
      }
      if (staticData.firstFrame) return frame >= staticData.firstFrame[point] && frame <= staticData.lastFrame[point];
      return true;
    };
    if (trailData && !isAllpix && !trailRgb) throw new Error("Monocular tracks need RGB colors for their endpoints");
    const trackStats =
      isAllpix && pointData
        ? pointData.meanPositions && pointData.motionRadius
          ? {
              meanPositions: pointData.meanPositions,
              motionRadius: pointData.motionRadius,
              meanConfidence: pointData.meanConfidence,
            }
          : !stream
            ? summarizeTracks(positions, valid, confidence, tracks, pointFrames)
            : null
        : null;
    const inputMode = manifest.input?.mode || viewer.dataset.mode || "monocular_video";
    const isStatic = inputMode === "static_collection";
    const isMulti = inputMode === "multi_view_video";
    viewer.classList.toggle("has-preview-frames", Boolean(stream));
    if (stream) inset.pause();
    const views = isMulti ? manifest.images?.length || 1 : 1;
    const contextCameraIds = isMulti ? manifest.input?.cameraIndices || [] : [0];
    const displayCameraIds = isMulti ? manifest.input?.displayCameraIndices || contextCameraIds : [0];
    const cameraViews = isMulti ? manifest.cameras.poses.shape[1] || contextCameraIds.length || views : 1;
    const displayViews = isMulti ? displayCameraIds.map((cameraId) => contextCameraIds.indexOf(cameraId)) : [0];
    if (displayViews.some((view) => view < 0)) {
      throw new Error("Display cameras are not present in the exported camera context");
    }
    const displayViewSet = new Set(displayViews);
    const showOccludedPoints = isAllpix;
    const viewerDefaults = sceneDefaults(example, manifest);
    let stableTrackColors =
      isAllpix && pointData && viewerDefaults.source_rgb !== false
        ? firstObservedTrackColors(colors, sourceColors, valid, visible, tracks, pointFrames)
        : null;
    trajectorySampleInput.max = String(trailTracks);
    trajectoryHistoryInput.max = String(frames);
    applyViewerDefaults(viewer, viewerDefaults);
    viewer.dataset.inputMode = inputMode;
    viewer.dataset.hasTrajectories = String(Boolean(trailData));
    if (!renderer) {
      // The stage background is drawn in WebGL (see viewer-background.js), so
      // the canvas can be opaque and composited without blending. Three.js
      // always requests an alpha channel for contexts it creates itself.
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2", {
        alpha: false,
        antialias: true,
        depth: true,
        stencil: false,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      });
      renderer = new THREE.WebGLRenderer({
        canvas,
        context: context || undefined,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(fallbackBackground);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.className = "viewer-canvas";
      renderer.domElement.tabIndex = -1;
      renderer.domElement.setAttribute("aria-label", "Interactive 3D view");
      stage.prepend(renderer.domElement);
    }
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a1125, 0.035);
    // A published bundle may ask for a plain backdrop (`background`: black or white); the
    // fog fades into it rather than into the gradient's dark blue.
    const plainBackground = { black: "#000000", white: "#ffffff" }[viewerDefaults.background];
    stage.style.background = plainBackground || "";
    if (plainBackground) scene.fog.color.set(plainBackground);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 1000);
    const projection = new THREE.Vector3(1, 0, 0);
    const worldIntrinsics = (item) => {
      item.group.updateWorldMatrix(true, false);
      return transformedCameraIntrinsics(item.intrinsics, item.group.getWorldScale(new THREE.Vector3()).toArray());
    };
    const projectionForCamera = (item) =>
      new THREE.Vector3(
        ...cameraProjectionParameters(worldIntrinsics(item), manifest.image.width / manifest.image.height),
      );
    const calibrationForCamera = (item) => ({
      frame: item.frame,
      view: item.view,
      position: item.group.getWorldPosition(new THREE.Vector3()).toArray(),
      fov: fovFromNormalizedFy(worldIntrinsics(item)[1]),
      projection: projectionForCamera(item).toArray(),
      imageAspect: manifest.image.width / manifest.image.height,
      weight: 1,
    });
    let calibrations = [];
    const updateCameraProjection = () => {
      camera.updateProjectionMatrix();
      const matrix = camera.projectionMatrix.elements;
      // Keep the image's vertical framing while applying its focal scale and principal point.
      matrix[0] *= projection.x;
      matrix[8] = projection.y / camera.aspect;
      matrix[9] = projection.z;
      camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
    };
    const inputElement = navigationElement || renderer.domElement;
    const controls = new OrbitControls(camera, inputElement);
    const updateOrbit = controls.update.bind(controls);
    const orbitUp = new THREE.Vector3(0, 1, 0);
    // r169 caches this basis at construction, but snapped cameras can have any roll/up axis.
    controls.update = (delta) => {
      controls._quat.setFromUnitVectors(camera.up, orbitUp);
      controls._quatInverse.copy(controls._quat).invert();
      return updateOrbit(delta);
    };
    controls.rotateSpeed = matchMedia("(pointer: coarse)").matches ? 0.35 : 1;
    listen(
      inputElement,
      "pointerdown",
      (event) => {
        controls.rotateSpeed = event.pointerType === "touch" ? 0.35 : 1;
      },
      { capture: true },
    );
    controls.enableDamping = false;
    controls.enablePan = true;
    controls.minDistance = 0.3;
    controls.maxDistance = 30;
    const touchNavigation = installTouchNavigation(
      viewer,
      inputElement,
      controls,
      viewerDefaults,
      eventAbort.signal,
      touchState,
      (event) => {
        const selected = selectFrustum(event);
        if (selected) lastFrustumTouch = event.timeStamp;
        return selected;
      },
    );
    const backgroundMaterial = new THREE.ShaderMaterial({
      uniforms: Object.fromEntries(
        Object.entries(backgroundUniformValues({ type: "solid", color: parseRgb(fallbackBackground) }, 1, 1)).map(
          ([name, value]) => [name === "type" ? "backgroundType" : name, { value }],
        ),
      ),
      vertexShader: backgroundVertexShader,
      fragmentShader: backgroundFragmentShader,
      depthTest: false,
      depthWrite: false,
    });
    const background = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), backgroundMaterial);
    background.frustumCulled = false;
    background.renderOrder = -1;
    scene.add(background);
    let backgroundSource = null;
    let backgroundSpec = null;
    const syncBackground = (width, height) => {
      const style = getComputedStyle(backgroundElement?.() || stage);
      const source = `${style.backgroundImage}|${style.backgroundColor}`;
      if (source !== backgroundSource) {
        backgroundSource = source;
        backgroundSpec = parseViewerBackground(style.backgroundImage, style.backgroundColor, resolveCssColor);
        if (!backgroundSpec) {
          console.warn(`Viewer background cannot be mirrored in WebGL; using its fallback color: ${source}`);
          backgroundSpec = parseViewerBackground("none", style.backgroundColor, resolveCssColor) || {
            type: "solid",
            color: parseRgb(fallbackBackground),
          };
        }
      }
      for (const [name, value] of Object.entries(backgroundUniformValues(backgroundSpec, width, height))) {
        backgroundMaterial.uniforms[name === "type" ? "backgroundType" : name].value = value;
      }
      invalidate();
    };
    scene.add(new THREE.HemisphereLight(0xd8e4ff, 0x071022, 2.2));
    const glow = new THREE.PointLight(0x7d99ff, 9, 20);
    glow.position.set(-3, 3, 4);
    scene.add(glow);

    const pointsBuffer = new Float32Array((tracks + staticCount) * 3);
    const pointColors = new Float32Array((tracks + staticCount) * 3);
    const pointGeometry = new THREE.InstancedBufferGeometry();
    pointGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]), 3),
    );
    pointGeometry.setAttribute("instancePosition", new THREE.InstancedBufferAttribute(pointsBuffer, 3));
    pointGeometry.setAttribute("instanceColor", new THREE.InstancedBufferAttribute(pointColors, 3));
    pointGeometry.instanceCount = 0;
    const pointMaterial = createPointMaterial(Number(pointSizeInput.value));
    const points = new THREE.Mesh(pointGeometry, pointMaterial);
    points.frustumCulled = false;
    scene.add(points);
    const trailHeadGeometry = trailData && trailRgb && !isAllpix ? new THREE.InstancedBufferGeometry() : null;
    const trailHeadMaterial = trailHeadGeometry ? createPointMaterial(Number(pointSizeInput.value)) : null;
    if (trailHeadGeometry) {
      trailHeadGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(pointGeometry.getAttribute("position").array.slice(), 3),
      );
      trailHeadGeometry.setAttribute(
        "instancePosition",
        new THREE.InstancedBufferAttribute(new Float32Array(trailTracks * 3), 3),
      );
      trailHeadGeometry.setAttribute(
        "instanceColor",
        new THREE.InstancedBufferAttribute(new Float32Array(trailTracks * 3), 3),
      );
      trailHeadGeometry.instanceCount = 0;
      trailHeadMaterial.depthTest = viewerDefaults.trajectory_occlusion !== false;
      trailHeadMaterial.depthWrite = true;
      const trailHeads = new THREE.Mesh(trailHeadGeometry, trailHeadMaterial);
      trailHeads.frustumCulled = false;
      trailHeads.renderOrder = 2;
      scene.add(trailHeads);
    }
    const toThree = (target, destination, source, values = positions) => {
      target[destination] = values[source];
      target[destination + 1] = -values[source + 1];
      target[destination + 2] = -values[source + 2];
    };
    const activeColors = viewerDefaults.source_rgb !== false && sourceColors ? sourceColors : colors;
    const color = (target, destination, track, pointFrame, stable = false) => {
      const selectedColors = stableTrackColors || (stable && sourceColors ? sourceColors : activeColors);
      const framesPerColor =
        selectedColors === stableTrackColors ? 1 : selectedColors === sourceColors ? sourceColorFrames : colorFrames;
      const source = (track * framesPerColor + Math.min(pointFrame, framesPerColor - 1)) * 3;
      target[destination] = srgbByteToLinear(selectedColors[source]);
      target[destination + 1] = srgbByteToLinear(selectedColors[source + 1]);
      target[destination + 2] = srgbByteToLinear(selectedColors[source + 2]);
    };
    const framingThresholds =
      prepared?.framingThresholds ||
      (confidence
        ? confidenceThresholdByFrame(confidence, valid, pointFrames, Math.max(50, Number(confidenceCutoffInput.value)))
        : null);
    const bounds = prepared?.bounds || new THREE.Box3();
    if (!prepared) {
      for (let track = 0; track < tracks; track += 1) {
        for (let pointFrame = 0; pointFrame < pointFrames; pointFrame += 1) {
          const index = track * pointFrames + pointFrame;
          if (!valid[index] || (framingThresholds && confidence[index] < framingThresholds[pointFrame])) continue;
          const source = index * 3;
          bounds.expandByPoint(new THREE.Vector3(positions[source], -positions[source + 1], -positions[source + 2]));
        }
      }
    }
    const center = bounds.getCenter(new THREE.Vector3());
    const sceneDiagonal = bounds.getSize(new THREE.Vector3()).length();
    const radius = Math.max(sceneDiagonal * 0.55, 1);
    const director = new THREE.Vector3(center.x + radius * 0.9, center.y + radius * 0.35, center.z + radius * 1.15);

    const sampleTrajectoryTracks = (count) => {
      const candidates = [];
      for (let track = 0; track < trailTracks; track += 1) {
        if (trailFlags && !trailFlags[track]) continue;
        if (isAllpix && trackStats) {
          if (trackStats.meanConfidence && trackStats.meanConfidence[track] < trackConfidenceCutoff) continue;
          if (isStaticized(track)) continue;
        }
        candidates.push(track);
      }
      const selected = Math.min(Math.max(0, Math.floor(count)), candidates.length);
      trajectorySampleInput.max = String(candidates.length);
      trajectorySampleInput.value = String(selected);
      trajectorySampleInput.disabled = candidates.length === 0;
      if (!selected) return [];
      let stride = Math.max(1, Math.floor(candidates.length * 0.61803398875));
      while (gcd(stride, candidates.length) !== 1) stride += 1;
      const offset = Math.floor(candidates.length * 0.2718281828);
      return Array.from({ length: selected }, (_, index) => candidates[(offset + index * stride) % candidates.length]);
    };
    const initialTrajectoryCount = Math.min(Number(trajectorySampleInput.value), trailTracks);
    let sampledTrajectoryRequest = initialTrajectoryCount;
    let trajectoryTracks = [];
    let trajectoryBuffer = new Float32Array(6);
    let trajectoryColors = new Float32Array(trajectoryBuffer.length);
    let trajectoryProgressStart = new Float32Array(1);
    let trajectoryProgressEnd = new Float32Array(1);
    const positionColors = trailData?.palette
      ? Float32Array.from(trailData.palette, (value) => srgbByteToLinear(Math.round(value * 255)))
      : new Float32Array(trailTracks * 3);
    const positionColorsReady = new Uint8Array(trailTracks).fill(trailData?.palette ? 1 : 0);
    const rawBounds = trailData?.descriptor?.bounds;
    const colorLow = rawBounds ? [rawBounds[0][0], -rawBounds[1][1], -rawBounds[1][2]] : bounds.min.toArray();
    const colorHigh = rawBounds ? [rawBounds[1][0], -rawBounds[0][1], -rawBounds[0][2]] : bounds.max.toArray();
    const trackColorOffset = (track) => {
      const offset = track * 3;
      if (positionColorsReady[track]) return offset;
      let first = 0;
      while (first < frames && !trailValid[track * frames + first]) first += 1;
      if (first === frames) return -1;
      const source = (track * frames + first) * 3;
      positionColors.set(
        positionTrackColor(
          [trailPositions[source], -trailPositions[source + 1], -trailPositions[source + 2]],
          colorLow,
          colorHigh,
        ),
        offset,
      );
      positionColorsReady[track] = 1;
      return offset;
    };
    const trajectoryGeometry = new LineSegmentsGeometry();
    const bindTrajectoryBuffers = () => {
      // Rebinding larger buffers must also reset Three's cached instance capacity.
      trajectoryGeometry.dispose();
      trajectoryGeometry.setPositions(trajectoryBuffer);
      trajectoryGeometry.setColors(trajectoryColors);
      trajectoryGeometry.setAttribute(
        "instanceProgressStart",
        new THREE.InstancedBufferAttribute(trajectoryProgressStart, 1),
      );
      trajectoryGeometry.setAttribute(
        "instanceProgressEnd",
        new THREE.InstancedBufferAttribute(trajectoryProgressEnd, 1),
      );
      trajectoryGeometry.getAttribute("instanceStart").data.setUsage(THREE.DynamicDrawUsage);
      trajectoryGeometry.getAttribute("instanceColorStart").data.setUsage(THREE.DynamicDrawUsage);
      trajectoryGeometry.getAttribute("instanceProgressStart").setUsage(THREE.DynamicDrawUsage);
      trajectoryGeometry.getAttribute("instanceProgressEnd").setUsage(THREE.DynamicDrawUsage);
    };
    bindTrajectoryBuffers();
    trajectoryGeometry.instanceCount = 0;
    const trajectoryMaterial = new LineMaterial({
      vertexColors: true,
      linewidth: sharedViewerDefaults.trajectory_width,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      depthTest: viewerDefaults.trajectory_occlusion !== false,
    });
    enableLineFade(trajectoryMaterial);
    const fadeStart = Math.max(0, Math.min(100, Number(viewerDefaults.trajectory_fade_start)));
    const fadeEnd = Math.max(0, Math.min(fadeStart, Number(viewerDefaults.trajectory_fade_end)));
    trajectoryMaterial.uniforms.trailFadeStart.value = fadeStart / 100;
    trajectoryMaterial.uniforms.trailFadeEnd.value = fadeEnd / 100;
    const trajectories = new LineSegments2(trajectoryGeometry, trajectoryMaterial);
    trajectories.visible = false;
    trajectories.frustumCulled = false;
    // Test trails against camera outlines, not the transparent batch's sort centre.
    trajectories.renderOrder = 1;
    scene.add(trajectories);

    const cameraFrames = createCameraFrames(
      manifest,
      cameraPoses,
      cameraValid,
      cameraIntrinsics,
      radius,
      frames,
      cameraViews,
      isStatic,
      isMulti,
      cameraImages,
      displayViews,
      viewerDefaults.camera_image_plane_fraction,
    );
    cameraFrames.forEach((item) => scene.add(item.group));
    if (!isStatic && cameraFrames.length) {
      const capacity = Math.max(1, cameraViews);
      const uniforms = {
        trailPlaneCount: { value: 0 },
        trailClipToWorld: { value: new THREE.Matrix4() },
        trailWorldToView: { value: new THREE.Matrix4() },
        trailViewport: { value: new THREE.Vector2() },
        trailPlaneFromWorld: { value: Array.from({ length: capacity }, () => new THREE.Matrix4()) },
        trailPlaneSize: { value: Array.from({ length: capacity }, () => new THREE.Vector2()) },
        trailPlaneTexture: { value: Array(capacity).fill(null) },
        trailPlaneOpacity: { value: Array(capacity).fill(0) },
        trailPlaneFogColor: { value: scene.fog.color },
        trailPlaneFogDensity: { value: scene.fog.density },
      };
      enableLinePlanes(trajectoryMaterial, uniforms, capacity);
      const position = new THREE.Vector3();
      trajectories.onBeforeRender = (_, __, viewCamera) => {
        const planes = cameraFrames
          .filter((item) => item.group.visible && item.imagePlane?.visible)
          .map((item) => ({
            item,
            depth: -position
              .setFromMatrixPosition(item.imagePlane.matrixWorld)
              .applyMatrix4(viewCamera.matrixWorldInverse).z,
          }))
          .sort((a, b) => b.depth - a.depth);
        uniforms.trailPlaneCount.value = planes.length;
        uniforms.trailClipToWorld.value
          .copy(viewCamera.projectionMatrix)
          .multiply(viewCamera.matrixWorldInverse)
          .invert();
        uniforms.trailWorldToView.value.copy(viewCamera.matrixWorldInverse);
        renderer.getDrawingBufferSize(uniforms.trailViewport.value);
        planes.forEach(({ item }, index) => {
          uniforms.trailPlaneFromWorld.value[index].copy(item.imagePlane.matrixWorld).invert();
          uniforms.trailPlaneSize.value[index].set(item.dimensions[0], item.dimensions[1]);
          uniforms.trailPlaneTexture.value[index] = item.imagePlane.material.map;
          uniforms.trailPlaneOpacity.value[index] = item.imagePlane.material.opacity;
        });
      };
    }
    staticAllCamerasInput.closest("label").hidden =
      cameraFrames.length <= 1 ||
      (viewerDefaults.show_cameras !== false &&
        cameraFrames.every(({ frame }) => (example.observationFrames || []).includes(frame)));
    keepCamerasInput.closest("label").hidden =
      !isMulti || !cameraFrames.some(({ view }) => viewerDefaults.show_cameras === false || !displayViewSet.has(view));
    const comparisonRoot = new THREE.Group();
    if (externalControl) {
      for (const object of [...scene.children]) {
        if (
          object === points ||
          object === trajectories ||
          object.geometry === trailHeadGeometry ||
          cameraFrames.some((item) => item.group === object)
        ) {
          comparisonRoot.add(object);
        }
      }
      scene.add(comparisonRoot);
    }
    const getImagePlane = () => {
      const item = cameraFrames[0];
      if (!item) return null;
      item.group.updateWorldMatrix(true, false);
      const [width, height, depth, centerX, centerY] = item.dimensions;
      const matrix = item.group.matrixWorld
        .clone()
        .multiply(new THREE.Matrix4().makeTranslation(centerX, centerY, -depth));
      return { matrix: matrix.toArray(), dimensions: [width, height, depth, centerX, centerY] };
    };
    let alignmentKey = "camera";
    let frustumScale = 1;
    const setFrustumRadius = (referenceRadius) => {
      if (!externalControl || !(referenceRadius > 0)) return;
      const alignmentScale = new THREE.Vector3().setFromMatrixScale(comparisonRoot.matrix).length() / Math.sqrt(3);
      if (!(alignmentScale > 0)) return;
      const nextScale = referenceRadius / (radius * alignmentScale);
      const ratio = nextScale / frustumScale;
      if (Math.abs(ratio - 1) < 1e-6) return;
      for (const item of cameraFrames) {
        for (const object of item.group.children) {
          object.scale.multiplyScalar(ratio);
          object.position.multiplyScalar(ratio);
        }
        item.dimensions = item.dimensions.map((value) => value * ratio);
      }
      frustumScale = nextScale;
      invalidate();
    };
    const setSceneAlignment = (matrix) => {
      if (!externalControl) return;
      const key = matrix ? JSON.stringify(matrix) : "camera";
      if (key === alignmentKey) return;
      alignmentKey = key;
      comparisonRoot.matrixAutoUpdate = false;
      if (matrix) comparisonRoot.matrix.fromArray(matrix);
      else comparisonRoot.matrix.identity();
      comparisonRoot.updateWorldMatrix(true, true);
      invalidate();
    };
    const getAlignmentPoints = (budget = 2048) => {
      const count = pointGeometry.instanceCount;
      const size = Math.min(budget, count);
      return Array.from({ length: size }, (_, i) => {
        const offset = Math.floor(((i + 0.5) * count) / size) * 3;
        return Array.from(pointsBuffer.subarray(offset, offset + 3));
      });
    };
    const getAlignmentCameras = () =>
      cameraFrames.map(({ frame, view, group }) => ({
        id: `${manifest.input?.timeIndices?.[frame] ?? frame}:${manifest.input?.cameraIndices?.[view] ?? view}`,
        matrix: group.matrix.toArray(),
      }));
    const setImagePlane = (reference) => {
      if (!externalControl) return;
      const key = reference ? JSON.stringify(reference) : "camera";
      if (key === alignmentKey) return;
      alignmentKey = key;
      comparisonRoot.matrixAutoUpdate = false;
      comparisonRoot.matrix.identity();
      comparisonRoot.updateWorldMatrix(true, true);
      if (reference) {
        const own = getImagePlane();
        if (!own) return;
        const scale = imagePlaneScale(own.dimensions, reference.dimensions);
        comparisonRoot.matrix
          .fromArray(reference.matrix)
          .multiply(new THREE.Matrix4().makeScale(...scale))
          .multiply(new THREE.Matrix4().fromArray(own.matrix).invert());
      }
      comparisonRoot.updateWorldMatrix(true, true);
      invalidate();
    };
    keepCamerasInput.disabled = !cameraPoses;
    rgbInset.classList.toggle("is-linkable", cameraFrames.length > 0 && !isStatic);

    let frame = 0;
    let sceneTime = 0;
    let resetAnimation = null;
    const movementKeys = new Set();
    // Firefox and other browsers may restore a form control's checked state on
    // refresh. Reflect that restored value immediately instead of waiting for a
    // subsequent change event.
    let trajectoryHistory = Number(trajectoryHistoryInput.value);
    const staticTolerance = Number(viewerDefaults.static_point_tolerance);
    const isStaticized = (track) =>
      isAllpix && trackStats && isStaticTrack(trackStats.motionRadius[track], sceneDiagonal, staticTolerance);
    let keepCameras = isMulti && keepCamerasInput.checked;
    let showAllStaticCameras = isStatic && staticAllCamerasInput.checked;
    if (isStatic) playing = false;
    else playing = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    let inputCameraLinked = false;
    let selectedStaticFrame = null;
    let selectedInputView = displayViews[0];
    let confidenceCutoff = Number(confidenceCutoffInput.value);
    let trackConfidenceCutoff = trackConfidenceThreshold(trackStats?.meanConfidence, confidenceCutoff);
    let staticCutoff = staticConfidenceThreshold(confidenceCutoff);
    let confidenceThresholds =
      prepared?.confidenceThresholds ||
      (confidence && confidenceCutoff > 0
        ? confidenceThresholdByFrame(confidence, valid, pointFrames, confidenceCutoff)
        : null);
    let trailConfidenceThresholds =
      prepared?.trailConfidenceThresholds ||
      (trailConfidence && confidenceCutoff > 0
        ? confidenceThresholdByFrame(trailConfidence, trailValid, frames, confidenceCutoff)
        : null);
    const passesConfidence = (index) =>
      isAllpix && trackStats?.meanConfidence
        ? trackStats.meanConfidence[Math.floor(index / pointFrames)] >= trackConfidenceCutoff
        : !confidenceThresholds || confidence[index] >= confidenceThresholds[index % pointFrames];
    const passesTrailConfidence = (index) =>
      isAllpix && trackStats?.meanConfidence
        ? trackStats.meanConfidence[Math.floor(index / frames)] >= trackConfidenceCutoff
        : !trailConfidenceThresholds || trailConfidence[index] >= trailConfidenceThresholds[index % frames];
    trajectoryTracks = sampleTrajectoryTracks(initialTrajectoryCount);
    const updateConfidenceCutoff = () => {
      confidenceCutoff = Number(confidenceCutoffInput.value);
      confidenceValue.textContent = `${confidenceCutoff}%`;
      trackConfidenceCutoff = trackConfidenceThreshold(trackStats?.meanConfidence, confidenceCutoff);
      staticCutoff = staticConfidenceThreshold(confidenceCutoff);
      confidenceThresholds = stream
        ? progressiveThresholds(pointData, confidenceCutoff)
        : confidence && confidenceCutoff > 0
          ? confidenceThresholdByFrame(confidence, valid, pointFrames, confidenceCutoff)
          : null;
      trailConfidenceThresholds = stream
        ? progressiveThresholds(trailData, confidenceCutoff)
        : trailConfidence && confidenceCutoff > 0
          ? confidenceThresholdByFrame(trailConfidence, trailValid, frames, confidenceCutoff)
          : null;
      syncTrajectorySample();
      updateFrame(frame);
    };
    confidenceCutoffInput.disabled = !confidence && !trailConfidence;
    if (confidence || trailConfidence) confidenceValue.textContent = `${confidenceCutoff}%`;
    else confidenceValue.textContent = "unavailable";
    // Browser form-state restoration can change range controls without changing
    // the labels in their markup. Mirror every restored value before first render.
    pointSizeValue.textContent = Number(pointSizeInput.value).toFixed(3);
    trajectoryHistory = Math.min(trajectoryHistory, frames);
    trajectoryHistoryInput.value = String(trajectoryHistory);
    trajectoryHistoryValue.textContent = `${trajectoryHistory} frames`;
    sampledTrajectoryRequest = Number(trajectorySampleInput.value);
    trajectorySampleValue.textContent =
      trajectoryTracks.length > 0 && trajectoryTracks.length === Number(trajectorySampleInput.max)
        ? `all ${trajectoryTracks.length.toLocaleString()}`
        : trajectoryTracks.length.toLocaleString();

    const currentCameraColor = new THREE.Color().setHSL(...cameraColorHsl(0));
    // Explicit context-camera selection overrides the bundle's default visibility.
    const camerasShown = viewerDefaults.show_cameras !== false;
    const updateCameras = () => {
      invalidate();
      for (const item of cameraFrames) {
        if (!camerasShown && !(isStatic ? showAllStaticCameras : keepCameras)) {
          item.group.visible = false;
          continue;
        }
        if (isStatic) {
          const selected = (example.observationFrames || []).includes(item.frame);
          item.group.visible = showAllStaticCameras || selected;
          item.material.opacity = selected ? 0.78 : 0.24;
          if (item.group.visible && item.image && !item.imagePlane) {
            item.imagePlane = cameraImagePlane(...item.dimensions, item.image);
            item.group.add(item.imagePlane);
          }
          continue;
        }
        const age = frame - item.frame;
        if (!isMulti) item.material.color.copy(age === 0 ? currentCameraColor : item.color);
        item.group.visible = age === 0 && (!isMulti || keepCameras || displayViewSet.has(item.view));
        if (item.group.visible)
          item.material.opacity = age === 0 ? 0.9 : Math.max(0.16, 0.42 * Math.exp(-Math.abs(age) / 14));
        if (item.group.visible && item.image && !item.imagePlane) {
          item.imagePlane = cameraImagePlane(...item.dimensions, item.image);
          item.group.add(item.imagePlane);
        }
      }
    };
    const followInputCamera = (cameraFrame = frame, cameraView = selectedInputView) => {
      const inputCamera = cameraFrames.find((item) => item.frame === cameraFrame && item.view === cameraView);
      if (!inputCamera) return;
      inputCamera.group.updateWorldMatrix(true, false);
      inputCamera.group.getWorldPosition(camera.position);
      inputCamera.group.getWorldQuaternion(camera.quaternion);
      camera.up.set(0, 1, 0).applyQuaternion(camera.quaternion);
      camera.fov = fovFromNormalizedFy(inputCamera.intrinsics[1]);
      projection.copy(projectionForCamera(inputCamera));
      calibrations = [calibrationForCamera(inputCamera)];
      updateCameraProjection();
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      controls.target.copy(camera.position).addScaledVector(forward, Math.max(radius * 0.65, 1));
      controls.update();
      invalidate();
    };
    const setInputCameraLink = (next) => {
      inputCameraLinked = next && cameraFrames.length > 0 && !isStatic;
      viewer.classList.toggle("is-following-input-camera", inputCameraLinked);
      rgbInset.setAttribute("aria-pressed", String(inputCameraLinked));
      const action = isMulti
        ? `${inputCameraLinked ? "Release" : "Select"} camera ${selectedInputView + 1} view`
        : inputCameraLinked
          ? "Following input camera"
          : "Follow input camera";
      rgbInset.setAttribute("aria-label", action);
      rgbInset.title = action;
      if (inputCameraLinked) followInputCamera();
    };
    setInputCameraLink(false);
    const updateTrajectories = () => {
      invalidate();
      if (!trajectoryTracks.length) {
        trajectories.visible = false;
        if (trailHeadGeometry) trailHeadGeometry.instanceCount = 0;
        return;
      }
      let segments = 0;
      let heads = 0;
      // A trail always ends at the current scrub frame.  At the beginning it
      // grows from frame 0; only once it reaches the selected history length
      // does its oldest segment drop
      // away.  (``step`` is the later endpoint of a segment.)
      const { firstSegment: first, lastSegment: last } = trailWindow(frame, trajectoryHistory);
      const selectedTracks = trajectoryTracks.length;
      const trackAt = (index) => trajectoryTracks[index];
      const requiredValues = selectedTracks * Math.max(0, last - first + 1) * 6;
      const [nextPositions, nextColors] = ensureTrailCapacity(trajectoryBuffer, trajectoryColors, requiredValues);
      if (nextPositions !== trajectoryBuffer) {
        trajectoryBuffer = nextPositions;
        trajectoryColors = nextColors;
        trajectoryProgressStart = new Float32Array(trajectoryBuffer.length / 6);
        trajectoryProgressEnd = new Float32Array(trajectoryBuffer.length / 6);
        bindTrajectoryBuffers();
      }
      for (let selected = 0; selected < selectedTracks; selected += 1) {
        const track = trackAt(selected);
        if (!trailHeadPresent(trailValid, trailVisible, track, frames, frame, isAllpix, passesTrailConfidence))
          continue;
        if (isStaticized(track)) continue;
        const colorOffset = trackColorOffset(track);
        if (colorOffset < 0) continue;
        const contiguousFirst = contiguousTrailStart(trailValid, track, frames, first, last, passesTrailConfidence);
        if (contiguousFirst > last) continue;
        for (let step = contiguousFirst; step <= last; step += 1) {
          const previous = track * frames + step - 1;
          const current = previous + 1;
          const previousPosition = previous * 3;
          const currentPosition = current * 3;
          const destination = segments * 6;
          trajectoryBuffer[destination] = trailPositions[previousPosition];
          trajectoryBuffer[destination + 1] = -trailPositions[previousPosition + 1];
          trajectoryBuffer[destination + 2] = -trailPositions[previousPosition + 2];
          trajectoryBuffer[destination + 3] = trailPositions[currentPosition];
          trajectoryBuffer[destination + 4] = -trailPositions[currentPosition + 1];
          trajectoryBuffer[destination + 5] = -trailPositions[currentPosition + 2];
          writeTrailStyle(
            trajectoryColors,
            trajectoryProgressStart,
            trajectoryProgressEnd,
            segments,
            step,
            contiguousFirst,
            last,
            positionColors,
            colorOffset,
          );
          segments += 1;
        }
        if (trailHeadGeometry) {
          const destination = heads * 3;
          toThree(
            trailHeadGeometry.getAttribute("instancePosition").array,
            destination,
            (track * frames + frame) * 3,
            trailPositions,
          );
          const rgb = stableTrackColors
            ? track * 3
            : (track * trailRgbFrames + Math.min(frame, trailRgbFrames - 1)) * 3;
          const headRgb = stableTrackColors || trailRgb;
          const headColors = trailHeadGeometry.getAttribute("instanceColor").array;
          headColors[destination] = srgbByteToLinear(headRgb[rgb]);
          headColors[destination + 1] = srgbByteToLinear(headRgb[rgb + 1]);
          headColors[destination + 2] = srgbByteToLinear(headRgb[rgb + 2]);
          heads += 1;
        }
      }
      trajectories.visible = segments > 0;
      trajectoryGeometry.instanceCount = segments;
      if (trailHeadGeometry) {
        trailHeadGeometry.instanceCount = heads;
        trailHeadGeometry.getAttribute("instancePosition").needsUpdate = true;
        trailHeadGeometry.getAttribute("instanceColor").needsUpdate = true;
      }
      if (segments) {
        for (const name of ["instanceStart", "instanceColorStart"]) {
          const data = trajectoryGeometry.getAttribute(name).data;
          data.clearUpdateRanges();
          data.addUpdateRange(0, segments * 6);
          data.needsUpdate = true;
        }
        for (const name of ["instanceProgressStart", "instanceProgressEnd"]) {
          const progress = trajectoryGeometry.getAttribute(name);
          progress.clearUpdateRanges();
          progress.addUpdateRange(0, segments);
          progress.needsUpdate = true;
        }
      }
    };
    const updateFrame = (next) => {
      frame = Math.max(0, Math.min(frames - 1, next));
      let count = 0;
      for (let track = 0; track < tracks; track += 1) {
        const pointFrame = pointFrames === 1 ? 0 : frame;
        const index = track * pointFrames + pointFrame;
        if (!trailHeadPresent(valid, visible, track, pointFrames, pointFrame, showOccludedPoints, passesConfidence))
          continue;
        const stable = isStaticized(track);
        if (stable) toThree(pointsBuffer, count * 3, track * 3, trackStats.meanPositions);
        else toThree(pointsBuffer, count * 3, index * 3);
        color(pointColors, count * 3, track, pointFrame, stable);
        count += 1;
      }
      for (let point = 0; point < staticCount; point += 1) {
        if (!staticShown(point, frame)) continue;
        toThree(pointsBuffer, count * 3, point * 3, staticData.positions);
        for (let channel = 0; channel < 3; channel += 1) {
          pointColors[count * 3 + channel] = srgbByteToLinear(staticData.colors[point * 3 + channel]);
        }
        count += 1;
      }
      invalidate();
      pointGeometry.instanceCount = count;
      pointGeometry.attributes.instancePosition.needsUpdate = true;
      pointGeometry.attributes.instanceColor.needsUpdate = true;
      if (isStatic || !trailData) trajectories.visible = false;
      else updateTrajectories();
      updateCameras();
      if (isMulti) {
        staticObservations.querySelectorAll("[data-camera-view]").forEach((card) => {
          const view = Number(card.dataset.displayView);
          const image = card.querySelector("img");
          const source = cameraImages.get(frame * views + view);
          if (source && image.src !== source) image.src = source;
        });
      }
      if (stream && !isMulti && !isStatic) {
        const source = cameraImages.get(frame);
        if (previewImage.src !== source) previewImage.src = source;
        previewImage.hidden = false;
      }
      if (inputCameraLinked) followInputCamera();
    };
    let pendingTimeline = null;
    const updateTimeline = (nextTime, shouldSeekInset = false, syncSlider = true) => {
      if (disposed || viewer.dataset.example !== sceneKey) return;
      const time = ((nextTime % frames) + frames) % frames;
      const nextFrame = frameAtTime(time, frames);
      if (stream && !stream.ready(nextFrame, trajectoryHistory)) {
        if (pendingTimeline?.frame === nextFrame && pendingTimeline.history === trajectoryHistory) {
          Object.assign(pendingTimeline, { time, shouldSeekInset, syncSlider });
          return;
        }
        const request = { time, frame: nextFrame, history: trajectoryHistory, shouldSeekInset, syncSlider };
        pendingTimeline = request;
        viewer.classList.add("is-buffering");
        stage.setAttribute("aria-busy", "true");
        buffering.start();
        const ready = playing
          ? prebuffer(
              stream,
              nextFrame,
              frames,
              example.playbackFps || manifest.fps,
              trajectoryHistory,
              viewerDefaults.prebuffer_seconds,
              viewerDefaults.prebuffer_timesteps,
            )
          : stream.ensure(nextFrame, trajectoryHistory);
        ready
          .then(async () => {
            if (disposed || pendingTimeline !== request) return;
            await buffering.finish();
            if (!disposed && pendingTimeline === request)
              updateTimeline(request.time, request.shouldSeekInset, request.syncSlider);
          })
          .catch((error) => {
            if (!disposed && pendingTimeline === request) {
              pendingTimeline = null;
              viewer.classList.remove("is-buffering");
              stage.removeAttribute("aria-busy");
              setPlaying(false);
              buffering.error("Could not load timestep. Try scrubbing again.");
              console.error(error);
            }
          });
        return;
      }
      if (stream) {
        pendingTimeline = null;
        viewer.classList.remove("is-buffering");
        stage.removeAttribute("aria-busy");
        buffering.clear();
        scheduler.wake();
      }
      sceneTime = time;
      if (nextFrame !== frame) updateFrame(nextFrame);
      const sliderPosition = scrubberPosition(sceneTime, frames);
      if (syncSlider) setScrubberPosition(sliderPosition);
      const label = String(nextFrame + 1);
      if (frameCurrent.textContent !== label) frameCurrent.textContent = label;
      if (shouldSeekInset && !isMulti && !stream) seekInset(inset, sceneTime / manifest.fps);
      viewer.dispatchEvent(new CustomEvent("viewerframechange", { detail: { frame: nextFrame, frames, time } }));
    };
    let scrubPointer = null;
    let scrubAnimation = null;
    const cancelScrubAnimation = () => {
      if (scrubAnimation !== null) cancelAnimationFrame(scrubAnimation);
      scrubAnimation = null;
    };
    const setPlaying = (next) => {
      if (!next && playing && pendingTimeline) {
        pendingTimeline = null;
        viewer.classList.remove("is-buffering");
        stage.removeAttribute("aria-busy");
        buffering.clear();
      }
      playing = next;
      if (playing) {
        cancelScrubAnimation();
        if (!pendingTimeline) updateTimeline(sceneTime, true);
        if (inViewport && !isMulti && !stream) inset.play().catch(() => {});
      } else inset.pause();
      if (isMulti) inset.pause();
      syncPlayButton();
      scheduler.wake();
      viewer.dispatchEvent(new CustomEvent("viewerplaychange", { detail: { playing } }));
    };
    const cancelCameraAnimation = (resumePlayback = true) => {
      const pending = resetAnimation;
      resetAnimation = null;
      if (resumePlayback && pending?.resumePlayback) setPlaying(true);
    };
    const clearCameraSelection = () => {
      selectedStaticFrame = null;
      staticObservations.querySelectorAll(".is-selected").forEach((card) => {
        card.classList.remove("is-selected");
        card.removeAttribute("aria-current");
      });
    };
    const selectCameraCard = (card) => {
      clearCameraSelection();
      card.classList.add("is-selected");
      card.setAttribute("aria-current", "true");
    };
    const reset = (instant = false) => {
      // Reset is the neutral director view, never a reset of the linked input
      // camera pose. Release the attachment before animating there.
      cancelCameraAnimation();
      if (inputCameraLinked) setInputCameraLink(false);
      clearCameraSelection();
      const resetPosition = director.clone();
      if (viewer.classList.contains("is-expanded")) {
        resetPosition.sub(center).multiplyScalar(viewportDistanceScale(1, camera.aspect)).add(center);
      }
      if (instant || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        camera.fov = 42;
        projection.set(1, 0, 0);
        calibrations = [];
        updateCameraProjection();
        camera.position.copy(resetPosition);
        camera.up.set(0, 1, 0);
        controls.target.copy(center);
        controls.update();
        invalidate();
      } else {
        resetAnimation = {
          started: performance.now(),
          position: camera.position.clone(),
          target: controls.target.clone(),
          up: camera.up.clone(),
          endUp: new THREE.Vector3(0, 1, 0),
          endPosition: resetPosition,
          endTarget: center.clone(),
          startFov: camera.fov,
          endFov: 42,
          startProjection: projection.clone(),
          endProjection: new THREE.Vector3(1, 0, 0),
          startCalibrations: calibrations,
          endCalibrations: [],
        };
        scheduler.wake();
      }
      viewer.dispatchEvent(new Event("viewerreset"));
    };
    const moveToCamera = (cameraFrame, cameraView = 0, { linkAfter = false, resumePlayback = false } = {}) => {
      const item = cameraFrames.find((candidate) => candidate.frame === cameraFrame && candidate.view === cameraView);
      if (!item) return false;
      cancelCameraAnimation();
      item.group.updateWorldMatrix(true, false);
      const endPosition = new THREE.Vector3();
      item.group.getWorldPosition(endPosition);
      const endQuaternion = new THREE.Quaternion();
      item.group.getWorldQuaternion(endQuaternion);
      const endTarget = item.group.localToWorld(new THREE.Vector3(0, 0, -Math.max(radius * 0.65, 1)));
      // Preserve the capture camera's roll as well as its position and forward
      // direction. OrbitControls otherwise uses the world-up axis on its next
      // update, which is why selected static views were translated correctly
      // but rotated away from their observation image.
      const endUp = new THREE.Vector3(0, 1, 0).transformDirection(item.group.matrixWorld);
      const endFov = fovFromNormalizedFy(item.intrinsics[1]);
      resetAnimation = {
        started: performance.now(),
        position: camera.position.clone(),
        target: controls.target.clone(),
        up: camera.up.clone(),
        endPosition,
        endTarget,
        endUp,
        startFov: camera.fov,
        endFov,
        startProjection: projection.clone(),
        endProjection: projectionForCamera(item),
        startCalibrations: calibrations,
        endCalibrations: [calibrationForCamera(item)],
        quaternion: camera.quaternion.clone(),
        endQuaternion,
        directOrientation: true,
        duration: 650,
        linkAfter,
        resumePlayback,
        onComplete: linkAfter
          ? () => {
              setInputCameraLink(true);
              if (resumePlayback) setPlaying(true);
            }
          : null,
      };
      scheduler.wake();
      return true;
    };
    const raycaster = new THREE.Raycaster();
    const pointerPosition = new THREE.Vector2();
    let lastFrustumTouch = -Infinity;
    const hitTestFrustum = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      pointerPosition.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        1 - ((event.clientY - rect.top) / rect.height) * 2,
      );
      raycaster.params.Line2 = { threshold: event.pointerType === "touch" ? 10 : 4 };
      scene.updateMatrixWorld(true);
      camera.updateMatrixWorld();
      raycaster.setFromCamera(pointerPosition, camera);
      const visibleCameras = cameraFrames.filter((item) => item.group.visible);
      const hit = raycaster.intersectObjects(
        visibleCameras.map((item) => item.group),
        true,
      )[0];
      if (!hit) return null;
      const item = visibleCameras.find((item) => item.group.children.includes(hit.object));
      return item ? { frame: item.frame, view: item.view } : null;
    };
    const selectFrustum = (event) => {
      if (!controls.enabled) return false;
      const hit = cameraHitTest ? cameraHitTest(event) : hitTestFrustum(event);
      if (!hit) return false;
      const item = cameraFrames.find((item) => item.frame === hit.frame && item.view === hit.view);
      if (!item) return false;
      cancelCameraAnimation();
      if (inputCameraLinked) setInputCameraLink(false);
      clearCameraSelection();
      selectedInputView = item.view;
      const card = staticObservations.querySelector(
        isStatic ? `[data-static-frame="${item.frame}"]` : `[data-camera-view="${item.view}"]`,
      );
      if (card) selectCameraCard(card);
      selectedStaticFrame = isStatic ? item.frame : null;
      const resumePlayback = playing;
      setPlaying(false);
      moveToCamera(isStatic ? item.frame : frame, item.view, { linkAfter: !isStatic, resumePlayback });
      return true;
    };
    const syncFrustumEdges = () => {
      const alignedFrame = isStatic ? selectedStaticFrame : inputCameraLinked ? frame : null;
      const alignedView = isStatic ? 0 : selectedInputView;
      for (const item of cameraFrames) {
        const visible =
          !resetAnimation && item.frame === alignedFrame && item.view === alignedView
            ? visibleFrustumEdges(
                item.dimensions,
                camera.projectionMatrix.elements,
                renderer.domElement.width,
                renderer.domElement.height,
                item.material.linewidth,
              )
            : [true, true, true, true];
        item.edges.forEach((edge, index) => (edge.visible = visible[index]));
      }
    };
    listen(inputElement, "dblclick", (event) => {
      if (event.timeStamp - (touchState.lastDoubleTap ?? -Infinity) < 500) return;
      if (event.timeStamp - lastFrustumTouch < 500) return;
      if (selectFrustum(event)) {
        event.preventDefault();
        touchNavigation.unlock();
      }
    });
    reset(true);

    const render = () => {
      syncFrustumEdges();
      scheduler.consume();
      renderer.render(scene, camera);
    };

    let stageWidth = 0;
    let stageHeight = 0;
    let stageExpanded = viewer.classList.contains("is-expanded");
    const resize = (entries = []) => {
      const rect = entries[0]?.contentRect || stage.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width <= 0 || height <= 0) return;
      if (width === stageWidth && height === stageHeight) return;
      const expanded = viewer.classList.contains("is-expanded");
      const cameraSelected = inputCameraLinked || selectedStaticFrame !== null || resetAnimation?.linkAfter;
      if (!cameraSelected && (expanded !== stageExpanded || (expanded && stageWidth === 0))) {
        cancelCameraAnimation();
        camera.position
          .sub(controls.target)
          .multiplyScalar(viewportDistanceScale(camera.aspect, width / height))
          .add(controls.target);
      }
      stageExpanded = expanded;
      stageWidth = width;
      stageHeight = height;
      const pixelRatio = renderer.getPixelRatio();
      camera.aspect = width / height;
      updateCameraProjection();
      renderer.setSize(width, height, false);
      const bufferWidth = renderer.domElement.width;
      const bufferHeight = renderer.domElement.height;
      renderer.setViewport(0, 0, bufferWidth / pixelRatio, bufferHeight / pixelRatio);
      pointMaterial.uniforms.viewportHeight.value = bufferHeight;
      pointMaterial.uniforms.pixelRatio.value = pixelRatio;
      pointMaterial.uniforms.pointViewportScale.value = pointViewportScale(width, height);
      if (trailHeadMaterial) {
        trailHeadMaterial.uniforms.viewportHeight.value = bufferHeight;
        trailHeadMaterial.uniforms.pixelRatio.value = pixelRatio;
        trailHeadMaterial.uniforms.pointViewportScale.value = pointViewportScale(width, height);
      }
      trajectoryMaterial.resolution.set(bufferWidth, bufferHeight);
      cameraFrames.forEach((item) => item.material.resolution.set(bufferWidth, bufferHeight));
      if (!resetAnimation && cameraSelected)
        followInputCamera(selectedStaticFrame ?? frame, selectedStaticFrame === null ? selectedInputView : 0);
      syncBackground(width, height);
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    resize();
    listen(window, "themechange", () => syncBackground(stageWidth, stageHeight));
    slider.setAttribute("aria-label", `${manifest.title} frame`);
    updateFrame(0);
    updateTimeline(0, true);
    if (isStatic && !stream) seekInset(inset, 0);
    if (!stream) listen(inset, "loadedmetadata", () => updateTimeline(sceneTime, true), { once: true });
    title.textContent = example.title;
    meta.textContent = sceneStats.get(activeExampleKey);
    controls.update();
    render();
    loading.hidden = true;
    viewer.classList.add("is-ready");
    if (stream || isStatic || isMulti || !inset.seeking) viewer.classList.remove("is-switching-inset");
    else listen(inset, "seeked", () => viewer.classList.remove("is-switching-inset"), { once: true });
    if (isStatic || isMulti) staticObservations.hidden = false;
    if (animateReveal && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      renderer.domElement.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 140,
        easing: "ease-out",
      });
      if (!viewer.classList.contains("is-cached-switch") && viewer.classList.contains("has-fallback-frame")) {
        video.animate([{ opacity: 0.48 }, { opacity: 0 }], {
          duration: 140,
          easing: "ease-out",
        });
      }
      if (!isStatic && !isMulti) {
        rgbInset.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 140,
          easing: "ease-out",
        });
      }
      if (isStatic || isMulti) {
        staticObservations.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 140,
          easing: "ease-out",
        });
      }
    }
    video.pause();

    const releaseCameraSelection = () => {
      cancelCameraAnimation();
      if (inputCameraLinked) setInputCameraLink(false);
      clearCameraSelection();
      projection.set(1, 0, 0);
      calibrations = [];
      updateCameraProjection();
    };
    const orbitDrag = pointerDrag(releaseCameraSelection);
    listen(
      inputElement,
      "pointerdown",
      (event) => {
        if (controls.enabled) orbitDrag.down(event);
      },
      { capture: true },
    );
    listen(
      inputElement,
      "pointermove",
      (event) => {
        if (controls.enabled) orbitDrag.move(event);
      },
      { capture: true },
    );
    for (const type of ["pointerup", "pointercancel"]) listen(inputElement, type, orbitDrag.end, { capture: true });
    listen(
      inputElement,
      "wheel",
      (event) => {
        if (controls.enabled && (event.deltaX || event.deltaY)) releaseCameraSelection();
      },
      { capture: true, passive: true },
    );
    const syncPointSize = () => {
      const size = Number(pointSizeInput.value);
      pointMaterial.uniforms.pointPixelRadius.value = pointRadiusPixels(size);
      if (trailHeadMaterial) trailHeadMaterial.uniforms.pointPixelRadius.value = pointRadiusPixels(size);
      pointSizeValue.textContent = size.toFixed(3);
      invalidate();
    };
    const syncTrajectorySample = () => {
      trajectoryTracks = sampleTrajectoryTracks(Number(trajectorySampleInput.value));
      sampledTrajectoryRequest = Number(trajectorySampleInput.value);
      trajectorySampleValue.textContent =
        trajectoryTracks.length > 0 && trajectoryTracks.length === Number(trajectorySampleInput.max)
          ? `all ${trajectoryTracks.length.toLocaleString()}`
          : trajectoryTracks.length.toLocaleString();
      updateTrajectories();
    };
    const cameraState = () => ({
      position: camera.position.toArray(),
      quaternion: camera.quaternion.toArray(),
      target: controls.target.toArray(),
      up: camera.up.toArray(),
      fov: camera.fov,
      projection: projection.toArray(),
      calibrations,
      near: camera.near,
      far: camera.far,
    });
    controls.addEventListener("change", invalidate);
    textureLoadListeners.add(invalidate);
    listen(renderer.domElement, "webglcontextrestored", invalidate);
    const stopProgress = stream ? onStreamProgress(scheduler.wake) : null;
    let prefetchRunning = false;
    const prefetch = () => {
      if (!stream || prefetchRunning || disposed || document.hidden) return;
      prefetchRunning = true;
      stream
        .prefetch(
          () => !disposed && !document.hidden,
          () => !inViewport,
        )
        .catch((error) => {
          if (!disposed) console.warn("Scene prefetch failed; requested timesteps can retry.", error);
        })
        .finally(() => {
          prefetchRunning = false;
        });
    };
    let streamRevision = stream?.revision;
    let bufferRevision = null;
    let bufferedHistory = null;
    let bufferedFrame = null;
    const syncBuffered = () => {
      const revision = stream?.bufferRevision ?? 0;
      if (revision === bufferRevision && trajectoryHistory === bufferedHistory && frame === bufferedFrame) return;
      const animate = bufferRevision !== null || !cachedBuffer;
      bufferRevision = revision;
      bufferedHistory = trajectoryHistory;
      bufferedFrame = frame;
      bufferedIndicator.update(
        (frame) => !isStatic && (!stream || stream.ready(frame, trajectoryHistory)),
        frame,
        animate,
      );
    };
    syncBuffered();
    // Playback advances time every vsync so frame changes land on time, but the
    // canvas is only redrawn when the displayed timestep or camera changes.
    const playbackAdvancing = () => !externalControl && playing && !pendingTimeline && !resetAnimation?.resumePlayback;
    animating = () => playbackAdvancing() || resetAnimation !== null || movementKeys.size > 0;
    renderFrame = (now, previous) => {
      syncBuffered();
      if (stream && streamRevision !== stream.revision) {
        streamRevision = stream.revision;
        if (stableTrackColors) {
          stableTrackColors = firstObservedTrackColors(colors, sourceColors, valid, visible, tracks, pointFrames);
        }
        updateFrame(frame);
      }
      if (pointMaterial.uniforms.pointPixelRadius.value !== pointRadiusPixels(Number(pointSizeInput.value)))
        syncPointSize();
      if (sampledTrajectoryRequest !== Number(trajectorySampleInput.value)) syncTrajectorySample();
      const delta = previous === null ? 0 : animationDeltaSeconds(now, previous);
      if (playbackAdvancing()) {
        const previousTime = sceneTime;
        updateTimeline(sceneTime + delta * (example.playbackFps || manifest.fps));
        if (sceneTime < previousTime) updateTimeline(sceneTime, true);
      }
      if (movementKeys.size) {
        const speed = radius * delta * (movementKeys.has("ShiftLeft") || movementKeys.has("ShiftRight") ? 2.8 : 0.8);
        const forward = camera.getWorldDirection(new THREE.Vector3());
        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
        const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
        const offset = new THREE.Vector3();
        if (movementKeys.has("KeyW")) offset.addScaledVector(forward, speed);
        if (movementKeys.has("KeyS")) offset.addScaledVector(forward, -speed);
        if (movementKeys.has("KeyD")) offset.addScaledVector(right, speed);
        if (movementKeys.has("KeyA")) offset.addScaledVector(right, -speed);
        if (movementKeys.has("KeyE")) offset.addScaledVector(up, speed);
        if (movementKeys.has("KeyQ")) offset.addScaledVector(up, -speed);
        camera.position.add(offset);
        controls.target.add(offset);
        invalidate();
      }
      if (resetAnimation) {
        const directOrientation = resetAnimation.directOrientation;
        const progress = Math.max(0, Math.min((now - resetAnimation.started) / (resetAnimation.duration || 520), 1));
        const eased = 1 - (1 - progress) ** 3;
        camera.position.lerpVectors(resetAnimation.position, resetAnimation.endPosition, eased);
        controls.target.lerpVectors(resetAnimation.target, resetAnimation.endTarget, eased);
        camera.fov = THREE.MathUtils.lerp(resetAnimation.startFov, resetAnimation.endFov, eased);
        projection.lerpVectors(resetAnimation.startProjection, resetAnimation.endProjection, eased);
        calibrations = blendCameraCalibrations(resetAnimation.startCalibrations, resetAnimation.endCalibrations, eased);
        updateCameraProjection();
        if (resetAnimation.endUp) camera.up.lerpVectors(resetAnimation.up, resetAnimation.endUp, eased).normalize();
        if (directOrientation)
          camera.quaternion.slerpQuaternions(resetAnimation.quaternion, resetAnimation.endQuaternion, eased);
        if (progress === 1) {
          const completed = resetAnimation;
          resetAnimation = null;
          completed.onComplete?.();
        }
        if (!directOrientation) controls.update();
        invalidate();
      } else if (!externalControl) {
        controls.update();
      }
      if (scheduler.consume()) {
        syncFrustumEdges();
        renderer.render(scene, camera);
        viewer.dispatchEvent(new CustomEvent("viewercamerachange", { detail: cameraState() }));
      }
    };
    const setActive = (active) => {
      if (!active) {
        scheduler.stop();
        movementKeys.clear();
        return;
      }
      // Streamed data or settings may have changed while off screen.
      invalidate();
      if (playing && !isMulti && !stream) inset.play().catch(() => {});
      prefetch();
    };
    prefetch();
    setActive(inViewport);
    const settleScrubber = () => {
      const from = Number(slider.value);
      const targetFrame = scrubberFrame(from, frames);
      const target = scrubberPosition(targetFrame, frames);
      updateTimeline(targetFrame, true, false);
      if (matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(target - from) < 0.0001) {
        setScrubberPosition(target);
        return;
      }
      const started = performance.now();
      const animate = (now) => {
        if (disposed || viewer.dataset.example !== sceneKey) return;
        const progress = Math.min((now - started) / 180, 1);
        setScrubberPosition(from + (target - from) * (1 - (1 - progress) ** 3));
        if (progress < 1) scrubAnimation = requestAnimationFrame(animate);
        else {
          setScrubberPosition(target);
          scrubAnimation = null;
        }
      };
      scrubAnimation = requestAnimationFrame(animate);
    };
    listen(slider, "pointerdown", (event) => {
      cancelScrubAnimation();
      scrubPointer = event.pointerId;
      setPlaying(false);
    });
    const releaseScrubber = (event) => {
      if (event.pointerId !== scrubPointer) return;
      scrubPointer = null;
      settleScrubber();
    };
    listen(window, "pointerup", releaseScrubber);
    listen(window, "pointercancel", releaseScrubber);
    listen(slider, "input", () => {
      paintScrubber(Number(slider.value));
      cancelCameraAnimation(false);
      setPlaying(false);
      updateTimeline(scrubberFrame(Number(slider.value), frames), true, scrubPointer === null);
    });
    listen(playButton, "click", () => {
      cancelCameraAnimation(false);
      setPlaying(!playing);
    });
    listen(
      stage,
      "pointerdown",
      (event) => {
        if (event.target === stage) stage.focus({ preventScroll: true });
      },
      { capture: true },
    );
    listen(inputElement, "pointerdown", () => {
      if (controls.enabled) inputElement.focus({ preventScroll: true });
    });
    listen(viewer, "keydown", (event) => {
      const action = viewerShortcut(event, { stage, canvas: inputElement, playButton, slider, isStatic });
      if (!action) return;
      event.preventDefault();
      if (action === "toggle") {
        if (!event.repeat) {
          cancelCameraAnimation(false);
          setPlaying(!playing);
        }
      } else {
        cancelCameraAnimation(false);
        setPlaying(false);
        updateTimeline(Math.max(0, Math.min(frames - 1, frame + (action === "next" ? 1 : -1))), true);
      }
    });
    listen(resetButton, "click", () => reset());
    if (isStatic) {
      staticObservations.querySelectorAll("[data-static-frame]").forEach((card) => {
        listen(card, "click", () => {
          selectCameraCard(card);
          selectedStaticFrame = Number(card.dataset.staticFrame);
          moveToCamera(selectedStaticFrame);
        });
      });
    } else if (isMulti) {
      staticObservations.querySelectorAll("[data-camera-view]").forEach((card) => {
        listen(card, "click", (event) => {
          if (inputCameraLinked) setInputCameraLink(false);
          selectCameraCard(card);
          selectedInputView = Number(card.dataset.cameraView);
          updateFrame(frame);
          moveToCamera(frame, selectedInputView, { linkAfter: true });
          if (event.detail > 0) inputElement.focus({ preventScroll: true });
        });
      });
    }
    const selectInputCamera = () => {
      if (inputCameraLinked || resetAnimation?.linkAfter) return false;
      cancelCameraAnimation();
      const resumePlayback = playing;
      if (resumePlayback) inset.pause();
      if (!moveToCamera(frame, selectedInputView, { linkAfter: true, resumePlayback }) && resumePlayback)
        setPlaying(true);
      return true;
    };
    listen(rgbInset, "click", (event) => {
      if (selectInputCamera() && event.detail > 0) inputElement.focus({ preventScroll: true });
    });
    listen(rgbInset, "keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectInputCamera();
      }
    });
    const setSettingsMenuOpen = (open) => {
      settingsMenu.hidden = !open;
      settingsButton.setAttribute("aria-expanded", String(open));
    };
    listen(settingsButton, "click", () => setSettingsMenuOpen(settingsMenu.hidden));
    listen(document, "pointerdown", (event) => {
      if (!settingsMenu.hidden && !settingsMenu.contains(event.target) && !settingsButton.contains(event.target)) {
        setSettingsMenuOpen(false);
      }
    });
    listen(confidenceCutoffInput, "input", updateConfidenceCutoff);
    listen(pointSizeInput, "input", syncPointSize);
    listen(staticAllCamerasInput, "change", () => {
      showAllStaticCameras = staticAllCamerasInput.checked;
      updateCameras();
    });
    listen(trajectorySampleInput, "input", syncTrajectorySample);
    listen(trajectoryHistoryInput, "input", () => {
      trajectoryHistory = Number(trajectoryHistoryInput.value);
      trajectoryHistoryValue.textContent = `${trajectoryHistory} frames`;
      syncBuffered();
      if (stream) updateTimeline(sceneTime, true);
      updateTrajectories();
    });
    listen(keepCamerasInput, "change", () => {
      keepCameras = isMulti && keepCamerasInput.checked;
      updateCameras();
    });
    listen(document, "visibilitychange", () => {
      if (document.hidden) {
        movementKeys.clear();
        cancelCameraAnimation(false);
        setPlaying(false);
      }
    });
    listen(document, "keydown", (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        movementKeys.clear();
        return;
      }
      if (!viewer.contains(document.activeElement)) return;
      const moving = isViewerMovementKey(event.code);
      if (
        !blocksViewerMovement(event.target) &&
        (moving || event.code === "ShiftLeft" || event.code === "ShiftRight")
      ) {
        movementKeys.add(event.code);
        scheduler.wake();
        if (moving) {
          releaseCameraSelection();
        }
        event.preventDefault();
      }
      if (event.key === "Escape" && !settingsMenu.hidden) {
        setSettingsMenuOpen(false);
        settingsButton.focus();
      }
    });
    listen(document, "keyup", (event) => {
      movementKeys.delete(event.code);
      if (event.code.startsWith("Meta") || event.code.startsWith("Control") || event.code.startsWith("Alt"))
        movementKeys.clear();
    });
    listen(window, "blur", () => movementKeys.clear());
    listen(viewer, "focusout", (event) => {
      if (!viewer.contains(event.relatedTarget)) movementKeys.clear();
    });
    setPlaying(playing);
    if (externalControl) {
      controls.enabled = false;
      setPlaying(false);
    }
    return {
      setActive,
      resize,
      render,
      getCameraState: cameraState,
      hitTestFrustum,
      getImagePlane,
      setImagePlane,
      getAlignmentPoints,
      getAlignmentCameras,
      setSceneAlignment,
      getSceneRadius: () => radius,
      setFrustumRadius,
      setFrame(nextFrame) {
        if (!Number.isFinite(nextFrame)) return;
        updateTimeline(Math.max(0, Math.min(frames - 1, nextFrame)), true);
      },
      setPlaying,
      reset,
      setCameraState(state) {
        if (!state) return;
        camera.position.fromArray(state.position);
        controls.target.fromArray(state.target);
        camera.up.fromArray(state.up);
        const framing = alignImagePlane
          ? alignedImagePlaneProjection(state, (frame, view, imageAspect) => {
              const item = cameraFrames.find((item) => item.frame === frame && item.view === view);
              return item
                ? {
                    ...calibrationForCamera(item),
                    projection: cameraProjectionParameters(worldIntrinsics(item), imageAspect),
                  }
                : null;
            })
          : state;
        if (Number.isFinite(framing.fov)) camera.fov = framing.fov;
        projection.fromArray(framing.projection || [1, 0, 0]);
        if (state.quaternion) camera.quaternion.fromArray(state.quaternion);
        if (Number.isFinite(state.near)) camera.near = state.near;
        if (Number.isFinite(state.far)) camera.far = state.far;
        updateCameraProjection();
        invalidate();
      },
      dispose() {
        disposed = true;
        bufferedIndicator.clear();
        buffering.clear();
        scheduler.stop();
        stopProgress?.();
        textureLoadListeners.delete(invalidate);
        controls.removeEventListener("change", invalidate);
        cancelScrubAnimation();
        eventAbort.abort();
        controls.dispose();
        resizeObserver.disconnect();
        background.geometry.dispose();
        backgroundMaterial.dispose();
        pointGeometry.dispose();
        pointMaterial.dispose();
        trailHeadGeometry?.dispose();
        trailHeadMaterial?.dispose();
        trajectoryGeometry.dispose();
        trajectoryMaterial.dispose();
        cameraFrames.forEach((item) =>
          item.group.traverse((object) => {
            object.geometry?.dispose?.();
            if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose?.());
            else object.material?.dispose?.();
            if (!object.material?.map?.userData?.cameraImage) object.material?.map?.dispose?.();
          }),
        );
        renderer.renderLists.dispose();
      },
    };
  }
  return {
    resize() {
      mountedViewer?.resize();
    },
    render() {
      mountedViewer?.render();
    },
    getCameraState() {
      return mountedViewer?.getCameraState();
    },
    hitTestFrustum(event) {
      return mountedViewer?.hitTestFrustum(event) || null;
    },
    getImagePlane() {
      return mountedViewer?.getImagePlane();
    },
    setImagePlane(reference) {
      mountedViewer?.setImagePlane(reference);
    },
    getAlignmentPoints() {
      return mountedViewer?.getAlignmentPoints() || [];
    },
    getAlignmentCameras() {
      return mountedViewer?.getAlignmentCameras() || [];
    },
    setSceneAlignment(matrix) {
      mountedViewer?.setSceneAlignment(matrix);
    },
    getSceneRadius() {
      return mountedViewer?.getSceneRadius();
    },
    setFrustumRadius(radius) {
      mountedViewer?.setFrustumRadius(radius);
    },
    select(key) {
      selectExample(key, false);
    },
    setFrame(frame) {
      mountedViewer?.setFrame(frame);
    },
    setPlaying(playing) {
      mountedViewer?.setPlaying(playing);
    },
    reset() {
      mountedViewer?.reset();
    },
    setCameraState(state) {
      mountedViewer?.setCameraState(state);
    },
    suspend() {
      ++loadVersion;
      rememberSceneSettings();
      mountedViewer?.dispose();
      mountedViewer = null;
      activeExampleKey = null;
      loadingIndicator?.clear();
      video.pause();
      inset.pause();
      renderer?.clear();
      viewer.classList.remove("is-ready");
    },
  };
}

function sceneSummary(selection, manifest) {
  const points = (
    (manifest[selection.pointLayer]?.positions.shape[0] || 0) +
    (manifest[selection.staticLayer]?.positions.shape[0] || 0)
  ).toLocaleString();
  const frames = manifest.frames;
  if (selection.mode === "static_collection") return `${points} points · ${frames} observations`;
  if (selection.mode === "multi_view_video") {
    const cameras =
      manifest.cameras.poses.shape[1] || manifest.input?.cameraIndices?.length || manifest.images?.length || 1;
    return `${points} points · ${cameras} context cameras · ${frames} timesteps`;
  }
  return `${points} points · ${frames} frames`;
}

function applyViewerDefaults(viewer, defaults = {}) {
  const setRange = (selector, value) => {
    if (!Number.isFinite(Number(value))) return;
    const input = viewer.querySelector(selector);
    const number = Number(value);
    input.value = String(Math.min(Number(input.max), Math.max(Number(input.min), number)));
  };
  setRange("[data-point-size]", defaults.point_size);
  setRange("[data-confidence-cutoff]", defaults.confidence_cutoff);
  setRange("[data-trajectory-history]", defaults.trajectory_history);
  setRange("[data-trajectory-sample]", defaults.trajectory_sample_count);
  viewer.querySelector("[data-keep-cameras]").checked = defaults.show_all_context_cameras === true;
  viewer.querySelector("[data-static-all-cameras]").checked = defaults.show_all_cameras === true;
}

function createPointMaterial(size) {
  return new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        pointPixelRadius: { value: pointRadiusPixels(size) },
        pointViewportScale: { value: 1 },
        viewportHeight: { value: 1 },
        pixelRatio: { value: 1 },
      },
    ]),
    transparent: false,
    alphaToCoverage: true,
    depthTest: true,
    depthWrite: true,
    fog: true,
    vertexShader: `
      uniform float pointPixelRadius;
      uniform float pointViewportScale;
      uniform float viewportHeight;
      uniform float pixelRatio;
      attribute vec3 instancePosition;
      attribute vec3 instanceColor;
      varying vec3 pointColor;
      varying vec2 offsetFromCenter;
      varying float resolvedRadius;
      #include <fog_pars_vertex>

      void main() {
        vec4 mvCenter = modelViewMatrix * vec4(instancePosition, 1.0);
        float pixelWorldSize = max(-mvCenter.z, 0.0001)
          / max(0.5 * viewportHeight * projectionMatrix[1][1], 0.0001);
        resolvedRadius = pointPixelRadius * pointViewportScale * pixelRatio * pixelWorldSize;
        float quadRadius = resolvedRadius + 0.5 * pixelWorldSize;
        offsetFromCenter = position.xy * quadRadius;
        vec4 mvPosition = mvCenter;
        mvPosition.xy += offsetFromCenter;
        gl_Position = projectionMatrix * mvPosition;
        pointColor = instanceColor;
        #include <fog_vertex>
      }
    `,
    fragmentShader: `
      varying vec3 pointColor;
      varying vec2 offsetFromCenter;
      varying float resolvedRadius;
      #include <fog_pars_fragment>

      void main() {
        float distanceFromCenter = length(offsetFromCenter);
        float feather = 0.5 * fwidth(distanceFromCenter);
        float coverage = 1.0 - smoothstep(
          resolvedRadius - feather,
          resolvedRadius + feather,
          distanceFromCenter
        );
        if (coverage <= 0.001) discard;
        gl_FragColor = vec4(pointColor, coverage);
        #include <fog_fragment>
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

function gcd(first, second) {
  let a = Math.abs(first);
  let b = Math.abs(second);
  while (b) [a, b] = [b, a % b];
  return a;
}

function createCameraFrames(
  manifest,
  poses,
  valid,
  intrinsics,
  radius,
  frames,
  views,
  isStatic,
  isMulti,
  cameraImages = null,
  displayViews = [0],
  imagePlaneFraction = sharedViewerDefaults.camera_image_plane_fraction,
) {
  const staticColors = isStatic ? cameraColorIndices(frames, [...(cameraImages?.keys() || [])]) : null;
  const result = [];
  const displaySlotByView = new Map(displayViews.map((view, slot) => [view, slot]));
  const count = poses ? poses.length / 16 : 1;
  for (let index = 0; index < count; index += 1) {
    if (valid && !valid[index]) continue;
    const frame = Math.floor(index / views);
    const view = index % views;
    const offset = index * 4;
    const fx = intrinsics?.[offset] ?? 1;
    const fy = intrinsics?.[offset + 1] ?? manifest.image.width / manifest.image.height;
    const cx = intrinsics?.[offset + 2] ?? 0.5;
    const cy = intrinsics?.[offset + 3] ?? 0.5;
    const { width, height, depth, centerX, centerY } = frustumDimensions(radius, [fx, fy, cx, cy], imagePlaneFraction);
    const colorIndex = isStatic
      ? staticColors.get(frame)
      : isMulti
        ? (manifest.input?.cameraIndices?.[view] ?? view)
        : frame + 1;
    const color = new THREE.Color().setHSL(...cameraColorHsl(colorIndex));
    const material = new LineMaterial({
      color,
      linewidth: isMulti ? 3 : 2,
      transparent: true,
      opacity: frame === 0 ? 0.9 : 0.2,
      depthTest: true,
      depthWrite: true,
    });
    const group = new THREE.Group();
    const frustum = cameraFrustum(width, height, depth, centerX, centerY, material);
    group.add(frustum.rays, ...frustum.edges);
    const displaySlot = displaySlotByView.get(view);
    const image = isMulti ? cameraImages?.get(frame * displayViews.length + displaySlot) : cameraImages?.get(index);
    const dimensions = [width, height, depth, centerX, centerY];
    const imagePlane = image && decodedPreviewImages.has(image) ? cameraImagePlane(...dimensions, image) : null;
    if (imagePlane) group.add(imagePlane);
    if (poses) {
      const poseOffset = index * 16;
      const converted = rdfPoseToThreeElements(poses.slice(poseOffset, poseOffset + 16));
      group.applyMatrix4(new THREE.Matrix4().set(...converted));
    }
    result.push({
      frame,
      view,
      index,
      group,
      material,
      color,
      dimensions,
      image,
      imagePlane,
      intrinsics: [fx, fy, cx, cy],
      edges: frustum.edges,
    });
  }
  return result;
}

function cameraImagePlane(width, height, depth, centerX, centerY, image) {
  let texture = cameraTextureCache.get(image);
  if (!texture) {
    const decoded = decodedPreviewImages.get(image);
    texture = decoded
      ? new THREE.Texture(decoded)
      : new THREE.TextureLoader().load(image, () => textureLoadListeners.forEach((listener) => listener()));
    if (decoded) texture.needsUpdate = true;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.userData.cameraImage = true;
    cameraTextureCache.set(image, texture);
  }
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide,
    depthTest: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
  // Three cameras look along -Z; this is exactly the frustum's image plane.
  plane.position.set(centerX, centerY, -depth);
  return plane;
}

function cameraFrustum(width, height, depth, centerX, centerY, material) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const corners = [
    [centerX - halfWidth, centerY - halfHeight, -depth],
    [centerX + halfWidth, centerY - halfHeight, -depth],
    [centerX + halfWidth, centerY + halfHeight, -depth],
    [centerX - halfWidth, centerY + halfHeight, -depth],
  ];
  const rays = [];
  for (let index = 0; index < 4; index += 1) {
    rays.push(0, 0, 0, ...corners[index]);
  }
  const line = (positions) => {
    const geometry = new LineSegmentsGeometry();
    geometry.setPositions(positions);
    const segment = new LineSegments2(geometry, material);
    segment.frustumCulled = false;
    return segment;
  };
  return {
    rays: line(rays),
    edges: corners.map((corner, index) => line([...corner, ...corners[(index + 1) % 4]])),
  };
}

const nextPaint = () => new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));

async function prepareScene(points, trails, cutoff, isCurrent) {
  const [tracks, frames] = points.shape;
  const { positions, valid, confidence } = points;
  const thresholds = async (layer, percent, framing = false) => {
    if (!layer?.confidence) return { display: null, framing: null };
    const layerFrames = layer.shape[1];
    const display = percent > 0 ? new Float32Array(layerFrames) : null;
    const frameThresholds = framing ? new Float32Array(layerFrames) : null;
    for (let frame = 0; frame < layerFrames; frame += 1) {
      const values = [];
      for (let index = frame; index < layer.confidence.length; index += layerFrames) {
        if (layer.valid[index] && Number.isFinite(layer.confidence[index])) values.push(layer.confidence[index]);
      }
      values.sort((first, second) => first - second);
      const threshold = (rank) =>
        values.length ? values[Math.min(values.length - 1, Math.floor((rank / 100) * (values.length - 1)))] : Infinity;
      if (display) display[frame] = threshold(percent);
      if (frameThresholds) frameThresholds[frame] = threshold(Math.max(50, percent));
      if (frame % (layer.shape[0] > 50000 ? 1 : 4) === 0) {
        await nextPaint();
        if (!isCurrent()) return null;
      }
    }
    return { display, framing: frameThresholds };
  };
  const pointThresholds = await thresholds(points, cutoff, true);
  if (!isCurrent()) return null;
  const trailThresholds = trails === points ? pointThresholds : await thresholds(trails, cutoff);
  if (!isCurrent()) return null;

  const bounds = new THREE.Box3();
  const point = new THREE.Vector3();
  const tracksPerBatch = Math.max(2048, Math.floor(100000 / frames));
  for (let track = 0; track < tracks; track += 1) {
    for (let frame = 0; frame < frames; frame += 1) {
      const index = track * frames + frame;
      if (!valid[index] || (pointThresholds.framing && confidence[index] < pointThresholds.framing[frame])) continue;
      const source = index * 3;
      point.set(positions[source], -positions[source + 1], -positions[source + 2]);
      bounds.expandByPoint(point);
    }
    if (track % tracksPerBatch === tracksPerBatch - 1) {
      await nextPaint();
      if (!isCurrent()) return null;
    }
  }
  return {
    framingThresholds: pointThresholds.framing,
    confidenceThresholds: pointThresholds.display,
    trailConfidenceThresholds: trailThresholds?.display,
    bounds,
  };
}

function confidenceThresholdByFrame(confidence, valid, frames, cutoffPercent) {
  const thresholds = new Float32Array(frames);
  if (cutoffPercent <= 0) {
    thresholds.fill(-Infinity);
    return thresholds;
  }
  for (let frame = 0; frame < frames; frame += 1) {
    const values = [];
    for (let index = frame; index < confidence.length; index += frames) {
      if (valid[index] && Number.isFinite(confidence[index])) values.push(confidence[index]);
    }
    values.sort((first, second) => first - second);
    thresholds[frame] = values.length
      ? values[Math.min(values.length - 1, Math.floor((cutoffPercent / 100) * (values.length - 1)))]
      : Infinity;
  }
  return thresholds;
}

function seekInset(video, time) {
  // Assigning before metadata arrives is intentional: browsers retain it as the
  // media start position, whereas ignoring early slider input loses that scrub.
  const duration = video.duration;
  video.currentTime = Number.isFinite(duration)
    ? Math.min(Math.max(0, time), Math.max(0, duration - 0.001))
    : Math.max(0, time);
}

function waitForVideo(video) {
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) return Promise.resolve();
  return new Promise((resolve, reject) => {
    video.addEventListener("canplay", resolve, { once: true });
    video.addEventListener("error", () => reject(new Error("Input RGB could not load.")), { once: true });
  });
}

function cachedSceneValue(cache, key, load) {
  if (!cache.has(key)) {
    const request = load();
    cache.set(key, request);
    request.catch(() => cache.delete(key));
  }
  return cache.get(key);
}

async function resolveSceneBundle(sourceURL, cache) {
  return cachedSceneValue(cache, `bundle:${sourceURL.href}`, async () => {
    const response = requireOK(await fetchManifest(sourceURL));
    const manifest = await response.json();
    if (!["arrow-web-example/v3", "arrow-web-example/v4"].includes(manifest.format))
      throw new Error("Expected a progressive scene bundle");
    return { manifest, manifestURL: sourceURL };
  });
}

async function loadSceneBundle({ manifest, manifestURL }, selection, cache, onBufferProgress) {
  return loadProgressiveBundle(manifest, manifestURL, selection, cache, onBufferProgress);
}

async function renderCameraImages(videoURL, manifest, requestedFrames) {
  const preview = document.createElement("video");
  preview.crossOrigin = "anonymous";
  preview.muted = true;
  preview.playsInline = true;
  preview.preload = "auto";
  preview.src = videoURL;
  await waitForVideo(preview);
  const frames = [...new Set(requestedFrames)].filter(
    (frame) => Number.isInteger(frame) && frame >= 0 && frame < manifest.frames,
  );
  const canvas = document.createElement("canvas");
  canvas.width = preview.videoWidth || manifest.image.width;
  canvas.height = preview.videoHeight || manifest.image.height;
  const context = canvas.getContext("2d");
  const images = new Map();
  for (const frame of frames) {
    // Seek to the middle of the encoded frame. Seeking exactly to a frame boundary
    // can resolve to the preceding image because MP4 timestamps are fractional.
    await seekVideoFrame(preview, (frame + 0.5) / manifest.fps);
    context.drawImage(preview, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/jpeg", 0.82);
    images.set(frame, dataURL);
  }
  preview.remove();
  return images;
}

async function renderMultiviewCameraImages(videoURLs, manifest, requestedFrames) {
  const perView = await Promise.all(videoURLs.map((url) => renderCameraImages(url, manifest, requestedFrames)));
  const images = new Map();
  for (let view = 0; view < perView.length; view += 1) {
    for (const [frame, image] of perView[view]) {
      images.set(frame * perView.length + view, image);
    }
  }
  return images;
}

function populateStaticObservations(container, images, title = "Brandenburg Gate", singleImage = false) {
  container.classList.remove("multiview-observations");
  const cards = [];
  for (const [frame, dataURL] of images) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "static-observation";
    card.dataset.staticFrame = String(frame);
    card.setAttribute("aria-label", `Move to ${title} observation ${frame + 1}`);
    const image = document.createElement("img");
    image.src = dataURL;
    image.alt = `Selected ${title} observation ${frame + 1}`;
    card.append(image);
    if (!singleImage) {
      const caption = document.createElement("span");
      caption.textContent = `view ${frame + 1}`;
      card.append(caption);
    }
    cards.push(card);
  }
  container.replaceChildren(...cards);
}

function populateMultiviewObservations(container, images, views, cameraViews = null, cameraIds = null) {
  container.classList.add("multiview-observations");
  const cards = Array.from({ length: views }, (_, view) => {
    const cameraView = cameraViews?.[view] ?? view;
    const cameraId = cameraIds?.[view] ?? cameraView;
    const card = document.createElement("button");
    card.type = "button";
    card.className = "static-observation";
    card.dataset.cameraView = String(cameraView);
    card.dataset.displayView = String(view);
    card.setAttribute("aria-label", `Select pStudio camera ${cameraId + 1}`);
    const image = document.createElement("img");
    image.src = images.get(view);
    image.alt = `pStudio camera ${cameraId + 1}`;
    const caption = document.createElement("span");
    caption.textContent = `camera ${cameraId + 1}`;
    card.append(image, caption);
    return card;
  });
  container.replaceChildren(...cards);
}

function seekVideoFrame(video, time) {
  if (Math.abs(video.currentTime - time) < 0.001) return Promise.resolve();
  return new Promise((resolve) => {
    video.addEventListener("seeked", resolve, { once: true });
    video.currentTime = time;
  });
}

function requireOK(response) {
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response;
}

document.querySelectorAll("[data-arrow-viewer]:not([data-viewer-manual])").forEach((viewer) => installViewer(viewer));
