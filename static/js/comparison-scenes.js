const root = new URL("../../assets/exports/progressive", import.meta.url).href;
const prediction = (bundle, options = {}) => ({
  manifest: `${root}/${bundle}/manifest.json`,
  mode: "monocular_video",
  pointLayer: "geometry",
  ...options,
});
const preview = (bundle) => `${root}/${bundle}/previews/0/000000.jpg`;
const kubricPrediction = (model) =>
  prediction(`kubric-20/${model}`, {
    mode: "multi_view_video",
    pointLayer: "tracks",
    trailLayer: "tracks",
    staticLayer: "static",
    fallback: "rgb-view-0.mp4",
    playbackFps: 6,
    viewerDefaults: { prebuffer_timesteps: 2 },
  });

export const models = {
  tracking: ["OmniX", "MVTracker+DA3"],
  reconstruction: ["VGGT-Ω", "DA3"],
};

export const scenes = {
  tracking: [
    {
      id: "davis",
      title: "DAVIS Train",
      image: preview("davis-train/arrow"),
      imageSize: [504, 280],
      predictions: {
        ARROW: prediction("davis-train/arrow", {
          pointLayer: "tracks",
          trailLayer: "tracks",
          staticLayer: "static",
          playbackFps: 12,
          fallbackPlaybackRate: 6,
          viewerDefaults: { show_cameras: true },
        }),
      },
    },
    {
      id: "horse",
      title: "Horse jump",
      image: preview("horse-jump/arrow"),
      imageSize: [504, 280],
      predictions: {
        ARROW: prediction("horse-jump/arrow", {
          pointLayer: "tracks",
          trailLayer: "tracks",
          staticLayer: "static",
          playbackFps: 6,
          viewerDefaults: { point_size: 0.05, background: "page", show_cameras: true },
        }),
      },
    },
    {
      id: "bus",
      title: "DAVIS Bus",
      image: preview("bus/arrow"),
      imageSize: [504, 280],
      viewerDefaults: { background: "page" },
      predictions: {
        ARROW: prediction("bus/arrow", {
          pointLayer: "tracks",
          trailLayer: "tracks",
          staticLayer: "static",
        }),
      },
    },
    {
      id: "swan",
      title: "Swan",
      image: preview("swan/arrow"),
      imageSize: [504, 280],
      viewerDefaults: { background: "page", camera_image_plane_fraction: 0.14 },
      predictions: {
        ARROW: prediction("swan/arrow", {
          pointLayer: "tracks",
          trailLayer: "tracks",
          staticLayer: "static",
        }),
      },
    },
    {
      id: "dance",
      title: "Dance",
      image: preview("dance-twirl/arrow"),
      imageSize: [504, 280],
      viewerDefaults: { background: "page", camera_image_plane_fraction: 0.14 },
      predictions: {
        ARROW: prediction("dance-twirl/arrow", {
          pointLayer: "tracks",
          trailLayer: "tracks",
          staticLayer: "static",
        }),
      },
    },
    {
      id: "kubric-20",
      title: "Kubric",
      alignment: "unaligned",
      image: preview("kubric-20/arrow"),
      imageSize: [504, 504],
      predictions: {
        ARROW: kubricPrediction("arrow"),
        OmniX: kubricPrediction("omnix"),
        "MVTracker+DA3": kubricPrediction("mvtracker_da3"),
      },
    },
  ],
  reconstruction: [
    {
      id: "umic",
      title: "UMIC",
      viewerDefaults: { confidence_cutoff: 8, point_size: 0.09 },
      image: preview("umic/arrow"),
      imageSize: [378, 504],
      predictions: {
        ARROW: prediction("umic/arrow", { mode: "static_collection", observationFrames: [0] }),
        "VGGT-Ω": prediction("umic/vggt-omega-new", { mode: "static_collection", observationFrames: [0] }),
        DA3: prediction("umic/da3", { mode: "static_collection", observationFrames: [0] }),
      },
    },
    {
      id: "mono-chair",
      title: "Chair",
      viewerDefaults: { confidence_cutoff: 2 },
      image: preview("mono-chair/arrow"),
      imageSize: [504, 280],
      predictions: {
        ARROW: prediction("mono-chair/arrow", { mode: "static_collection", observationFrames: [0] }),
        "VGGT-Ω": prediction("mono-chair/vggt-omega-new", {
          mode: "static_collection",
          observationFrames: [0],
        }),
        DA3: prediction("mono-chair/da3", { mode: "static_collection", observationFrames: [0] }),
      },
    },
    {
      id: "drone",
      title: "Drone",
      image: preview("drone/arrow"),
      imageSize: [504, 378],
      viewerDefaults: { background: "page" },
      predictions: {
        ARROW: prediction("drone/arrow", {
          mode: "static_collection",
          pointLayer: "static",
          observationFrames: [0, 7, 13, 20, 26],
        }),
      },
    },
    {
      id: "chess",
      title: "Chess",
      image: preview("chess/arrow"),
      imageSize: [504, 378],
      viewerDefaults: { background: "page" },
      predictions: {
        ARROW: prediction("chess/arrow", {
          mode: "static_collection",
          pointLayer: "static",
          observationFrames: [0, 5, 10, 15, 20],
        }),
      },
    },
  ],
};

export function predictionKey(task, scene, method) {
  return `${task}:${scene}:${method}`;
}

export function viewerExamples(reference) {
  const examples = {};
  for (const [task, entries] of Object.entries(scenes)) {
    for (const scene of entries) {
      for (const [method, selection] of Object.entries(scene.predictions)) {
        if ((method === "ARROW") !== reference) continue;
        examples[predictionKey(task, scene.id, method)] = {
          ...selection,
          title: scene.title,
          viewerDefaults: {
            ...scene.viewerDefaults,
            ...selection.viewerDefaults,
            trajectory_sample_count: task === "tracking" ? 2048 : 1024,
          },
        };
      }
    }
  }
  return examples;
}
