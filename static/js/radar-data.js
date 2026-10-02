export const radarMethods = [
  "ARROW",
  "OmniX",
  "4RC",
  "SpatialTracker-V2",
  "St4RTrack",
  "V-DPM",
  "OpenD4RT",
  "SM4RT",
  "Point4D",
  "UniQuery4R",
  "VGGT",
  "Pi3",
  "VGGT-Ω",
  "DA3",
  "MVTracker + VGGT-Ω",
  "LAPA + VGGT-Ω",
  "TapIP3D + VGGT-Ω",
];

// Visible paper rows at displayed precision; null means not reported.
export const radarTasks = [
  {
    label: "3D tracking",
    source: "worldtrack_paper_ready.html",
    overviewMetric: 0,
    metrics: [{ label: "APD (All)", direction: "higher", unit: "%", digits: 2 }],
    datasets: [
      {
        label: "Aria Digital Twin",
        reported: {
          "SpatialTracker-V2": [91.75],
          St4RTrack: [72.89],
          "V-DPM": [85.35],
          "4RC": [83.19],
          OpenD4RT: [71.92],
          OmniX: [91.05],
          SM4RT: [86.86],
          Point4D: [62.73],
          UniQuery4R: [87.18],
          ARROW: [93.55],
        },
      },
      {
        label: "Dynamic Replica",
        reported: {
          "SpatialTracker-V2": [69.9],
          St4RTrack: [74.29],
          "V-DPM": [77.28],
          "4RC": [84.41],
          OpenD4RT: [76.59],
          OmniX: [79.91],
          SM4RT: [82.77],
          Point4D: [77.77],
          UniQuery4R: [79.25],
          ARROW: [88],
        },
      },
      {
        label: "PointOdyssey",
        reported: {
          "SpatialTracker-V2": [67.36],
          St4RTrack: [67.45],
          "V-DPM": [80.47],
          "4RC": [83.15],
          OpenD4RT: [67.61],
          OmniX: [78.68],
          SM4RT: [81.05],
          Point4D: [69.84],
          UniQuery4R: [83.84],
          ARROW: [85.26],
        },
      },
      {
        label: "Panoptic Studio",
        reported: {
          "SpatialTracker-V2": [73.42],
          St4RTrack: [70.79],
          "V-DPM": [77.11],
          "4RC": [68.19],
          OpenD4RT: [78.98],
          OmniX: [77.23],
          SM4RT: [78.76],
          Point4D: [72.92],
          UniQuery4R: [84.76],
          ARROW: [85.76],
        },
      },
    ],
  },
  {
    label: "Camera pose",
    source: "3d_reconstruction_paper_ready.html",
    overviewMetric: 0,
    metrics: [
      { label: "ATE", direction: "lower", unit: "m", digits: 4 },
      { label: "RPE-t", direction: "lower", unit: "m", digits: 4 },
      { label: "RPE-R", direction: "lower", unit: "°", digits: 3 },
    ],
    datasets: [
      {
        label: "Bonn",
        reported: {
          VGGT: [0.0151, 0.0066, 0.223],
          Pi3: [0.0114, 0.0063, 0.225],
          "VGGT-Ω": [0.0081, 0.0041, 0.213],
          DA3: [0.0088, 0.0047, 0.212],
          "V-DPM": [0.0118, 0.0064, 0.219],
          "4RC": [0.0081, 0.0037, 0.211],
          OpenD4RT: [0.0289, 0.0062, 0.331],
          OmniX: [0.0084, 0.004, 0.214],
          SM4RT: [0.0168, 0.0075, 0.24],
          ARROW: [0.0084, 0.0036, 0.211],
        },
      },
      {
        label: "Sintel",
        reported: {
          VGGT: [0.1657, 0.0512, 0.484],
          Pi3: [0.0735, 0.0417, 0.263],
          "VGGT-Ω": [0.0777, 0.0305, 0.195],
          DA3: [0.1287, 0.0531, 0.357],
          "V-DPM": [0.1284, 0.0544, 0.461],
          "4RC": [0.1292, 0.0527, 0.396],
          OpenD4RT: [0.2328, 0.1256, 1.833],
          OmniX: [0.077, 0.0352, 0.291],
          SM4RT: [0.112, 0.0445, 0.422],
          ARROW: [0.0613, 0.0337, 0.453],
        },
      },
      {
        label: "PStudio",
        reported: {
          VGGT: [0.431, 0.9849, 16.914],
          Pi3: [0.1506, 0.3755, 5.663],
          "VGGT-Ω": [0.3195, 0.6475, 8.947],
          DA3: [0.2084, 0.503, 6.037],
          "V-DPM": [0.2146, 0.3906, 3.797],
          "4RC": [0.1414, 0.2785, 1.942],
          OpenD4RT: [1.5576, 2.8762, 78.012],
          OmniX: [0.0786, 0.1459, 1.824],
          SM4RT: [0.1483, 0.3366, 3.281],
          ARROW: [0.0714, 0.1301, 1.406],
        },
      },
    ],
  },
  {
    label: "3D reconstruction",
    source: "3d_reconstruction_paper_ready.html",
    overviewMetric: 0,
    metrics: [
      { label: "Chamfer", direction: "lower", unit: "m", digits: 4 },
      { label: "NC", direction: "higher", unit: "", digits: 3 },
    ],
    datasets: [
      {
        label: "NRGBD",
        reported: {
          VGGT: [0.0429, 0.91],
          Pi3: [0.03, 0.91],
          "VGGT-Ω": [0.0354, 0.895],
          DA3: [0.0287, 0.927],
          "V-DPM": [0.0397, 0.887],
          "4RC": [0.0374, 0.911],
          OpenD4RT: [0.4077, 0.592],
          OmniX: [0.0294, 0.927],
          SM4RT: [0.1082, 0.776],
          ARROW: [0.0263, 0.933],
        },
      },
      {
        label: "7-Scenes",
        reported: {
          VGGT: [0.0538, 0.754],
          Pi3: [0.0721, 0.736],
          "VGGT-Ω": [0.0411, 0.754],
          DA3: [0.0598, 0.752],
          "V-DPM": [0.0739, 0.73],
          "4RC": [0.0616, 0.754],
          OpenD4RT: [0.2503, 0.556],
          OmniX: [0.0481, 0.769],
          SM4RT: [0.0831, 0.691],
          ARROW: [0.0487, 0.762],
        },
      },
    ],
  },
  {
    label: "RGB-only multi-view tracking",
    source: "mvtrack_paper_ready.html",
    overviewMetric: 0,
    metrics: [
      { label: "APD", direction: "higher", unit: "%", digits: 1 },
      { label: "AJ", direction: "higher", unit: "%", digits: 1 },
    ],
    datasets: [
      {
        label: "Panoptic Studio",
        reported: {
          "MVTracker + VGGT-Ω": [49.1, 28.5],
          "LAPA + VGGT-Ω": [41.4, 31],
          "TapIP3D + VGGT-Ω": [50.1, 38.8],
          "4RC": [56.9, null],
          OmniX: [68.4, null],
          ARROW: [79.2, 66.9],
        },
      },
      {
        label: "DexYCB",
        reported: {
          "MVTracker + VGGT-Ω": [49.3, 39.9],
          "LAPA + VGGT-Ω": [31.3, 24.4],
          "TapIP3D + VGGT-Ω": [50.2, 38.6],
          "4RC": [42.9, null],
          OmniX: [45.6, null],
          ARROW: [54.8, 44.2],
        },
      },
      {
        label: "Multi-View Kubric",
        reported: {
          "MVTracker + VGGT-Ω": [28.4, 18],
          "LAPA + VGGT-Ω": [13.6, 7],
          "TapIP3D + VGGT-Ω": [32.4, 21.8],
          "4RC": [32.1, null],
          OmniX: [30, null],
          ARROW: [49, 36.5],
        },
      },
    ],
    overview: false,
  },
  {
    label: "Video depth",
    source: "video-depth_paper_ready.html",
    overviewMetric: 1,
    metrics: [
      { label: "AbsRel", direction: "lower", unit: "", digits: 3 },
      { label: "δ₁", direction: "higher", unit: "%", digits: 1, scale: 100 },
    ],
    datasets: [
      {
        label: "Bonn",
        reported: {
          VGGT: [0.053, 0.975],
          Pi3: [0.042, 0.986],
          "VGGT-Ω": [0.115, 0.937],
          DA3: [0.042, 0.982],
          "V-DPM": [0.049, 0.985],
          "4RC": [0.043, 0.983],
          OpenD4RT: [0.071, 0.952],
          OmniX: [0.042, 0.984],
          SM4RT: [0.051, 0.979],
          ARROW: [0.041, 0.987],
        },
      },
      {
        label: "KITTI",
        reported: {
          VGGT: [0.056, 0.961],
          Pi3: [0.037, 0.986],
          "VGGT-Ω": [0.038, 0.988],
          DA3: [0.051, 0.976],
          "V-DPM": [0.068, 0.943],
          "4RC": [0.053, 0.953],
          OpenD4RT: [0.112, 0.854],
          OmniX: [0.079, 0.929],
          SM4RT: [0.037, 0.977],
          ARROW: [0.036, 0.983],
        },
      },
      {
        label: "7-Scenes",
        reported: {
          VGGT: [0.212, 0.896],
          Pi3: [0.219, 0.876],
          "VGGT-Ω": [0.21, 0.91],
          DA3: [0.209, 0.919],
          "V-DPM": [0.21, 0.921],
          "4RC": [0.204, 0.903],
          OpenD4RT: [0.223, 0.913],
          OmniX: [0.214, 0.87],
          SM4RT: [0.211, 0.904],
          ARROW: [0.213, 0.924],
        },
      },
    ],
  },
];

export function relativeScores(values, direction) {
  const reported = values.filter((value) => value !== null);
  if (!reported.length) return values.map(() => null);
  const best = direction === "higher" ? Math.max(...reported) : Math.min(...reported);
  return values.map((value) =>
    value === null ? null : value === best ? 1 : direction === "higher" ? value / best : best / value,
  );
}

// Reflected logarithmic scale expands differences near the best score.
export function radialScore(score) {
  return score === null ? null : 1 - Math.log10(10 - 9 * Math.max(0, Math.min(1, score)));
}

const overviewMethods = new Set(["ARROW", "OmniX", "4RC", "V-DPM", "OpenD4RT"]);

export function radarPages(tasks = radarTasks) {
  const axis = (task, dataset, metricIndex, overview) => {
    const metric = task.metrics[metricIndex];
    const values = radarMethods.map((method) =>
      overview && !overviewMethods.has(method) ? null : (dataset.reported[method]?.[metricIndex] ?? null),
    );
    return {
      ...metric,
      group: overview ? `${task.label} · ${metric.label} ${metric.direction === "higher" ? "↑" : "↓"}` : dataset.label,
      caption: overview ? dataset.label : `${metric.label} ${metric.direction === "higher" ? "↑" : "↓"}`,
      dataset: dataset.label,
      task: task.label,
      source: task.source,
      values,
      scores: relativeScores(values, metric.direction),
    };
  };
  const pages = [
    {
      label: "Across tasks",
      axes: tasks
        .filter((task) => task.overview !== false)
        .flatMap((task) => task.datasets.map((dataset) => axis(task, dataset, task.overviewMetric, true))),
    },
    ...tasks.map((task) => ({
      label: task.label,
      axes: task.datasets.flatMap((dataset) => task.metrics.map((_, metric) => axis(task, dataset, metric, false))),
    })),
  ];
  return pages.map((page) => ({
    ...page,
    methods: radarMethods
      .map((_, index) => index)
      .filter((index) => page.axes.some((axis) => axis.values[index] !== null)),
  }));
}
