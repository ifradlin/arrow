import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { srgbByteToLinear } from './colors';
import { trailPalette, turbo, viridis } from './palette';
import { defaultSettings, type CameraEntry, type CameraView, type ColorMode, type SceneData, type Settings, type TracksEntry, type Vec3 } from './types';

const MOVE_KEYS: Record<string, Vec3> = { KeyW: [0, 0, -1], KeyS: [0, 0, 1], KeyA: [-1, 0, 0], KeyD: [1, 0, 0], KeyE: [0, 1, 0], KeyQ: [0, -1, 0] };
const STATIC_TINT: Vec3 = [.35, .6, 1];
const MOVING_TINT: Vec3 = [1, .55, .2];
const TRANSITION_MS = 650;
const FOV = 50;
const DIM_OCCLUDED = .35;
const TRAIL_DEPTH_BIAS = .03; // fraction of the scene diagonal
const ROLL_RATE = .004; // radians of horizon tilt per pixel dragged

/** Camera colors: golden-angle hues from 218°. */
const cameraColor = (index: number) => new THREE.Color().setHSL(((218 + index * 137.507764) % 360) / 360, .72, .62);

/**
 * Radial backdrop with sRGB interpolation and half-LSB dither.
 */
const BACKDROP_VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = vec2(uv.x, 1.0 - uv.y);
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;
const BACKDROP_FRAGMENT = `
  uniform vec2 uSize;
  varying vec2 vUv;
  void main() {
    vec2 point = vUv * uSize, center = uSize * vec2(0.55, 0.47);
    float t = length(point - center) / max(length(max(center, uSize - center)), 1e-3);
    vec3 inner = vec3(32.0, 35.0, 50.0) / 255.0, middle = vec3(16.0, 17.0, 25.0) / 255.0, outer = vec3(9.0, 9.0, 15.0) / 255.0;
    vec3 color = t < 0.57 ? mix(inner, middle, t / 0.57) : mix(middle, outer, clamp((t - 0.57) / 0.43, 0.0, 1.0));
    float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    gl_FragColor = vec4(color + (noise - 0.5) / 255.0, 1.0);
  }
`;

/**
 * Round, antialiased discs of a constant on-screen radius, drawn as instanced quads.
 * `uRadius` is in drawing-buffer pixels; a quad is half a pixel larger so the edge can feather.
 */
const POINT_VERTEX = `
  uniform float uRadius;
  uniform float uViewportHeight;
  attribute vec3 instancePosition;
  attribute vec3 instanceColor;
  varying vec3 vColor;
  varying vec2 vOffset;
  varying float vRadius;
  void main() {
    vec4 center = modelViewMatrix * vec4(instancePosition, 1.0);
    float pixel = max(-center.z, 1e-4) / max(0.5 * uViewportHeight * projectionMatrix[1][1], 1e-4);
    vRadius = uRadius * pixel;
    vOffset = position.xy * (vRadius + 0.5 * pixel);
    center.xy += vOffset;
    gl_Position = projectionMatrix * center;
    vColor = instanceColor;
  }
`;
const POINT_FRAGMENT = `
  uniform float uOpacity;
  varying vec3 vColor;
  varying vec2 vOffset;
  varying float vRadius;
  void main() {
    float distance = length(vOffset), feather = 0.5 * fwidth(distance);
    float coverage = 1.0 - smoothstep(vRadius - feather, vRadius + feather, distance);
    if (coverage <= 0.001) discard;
    gl_FragColor = vec4(vColor, coverage * uOpacity);
    #include <colorspace_fragment>
  }
`;
const QUAD = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]);

/** Deterministically select the `keep` fraction of tracks that draw trails. */
function trackKept(track: number, keep: number) {
  if (keep >= .9999) return true;
  let hash = Math.imul(track, 2654435761) >>> 0;
  hash = (hash ^ (hash >>> 15)) >>> 0;
  hash = Math.imul(hash, 2246822519) >>> 0;
  hash = (hash ^ (hash >>> 13)) >>> 0;
  return (hash & 0xffffff) / 16777216 < keep;
}

/** Fade trails from transparent at the oldest end to opaque at 30% of their length. */
function fadeLines(material: LineMaterial) {
  material.vertexShader = material.vertexShader
    .replace('attribute vec3 instanceColorEnd;', 'attribute vec3 instanceColorEnd;\nattribute float instanceProgressStart;\nattribute float instanceProgressEnd;\nvarying float vTrailProgress;')
    .replace('void main() {', 'void main() {\nvTrailProgress = (position.y < 0.5) ? instanceProgressStart : instanceProgressEnd;');
  material.fragmentShader = material.fragmentShader
    .replace('varying float vLineDistance;', 'varying float vLineDistance;\nvarying float vTrailProgress;')
    .replace('vec4 diffuseColor = vec4( diffuse, alpha );', 'alpha *= clamp(vTrailProgress / 0.3, 0.0, 1.0);\nvec4 diffuseColor = vec4( diffuse, alpha );');
}

/**
 * Turn a faded trail material into its depth-only pass: segments are pushed `bias` away from the eye along their
 * view rays (so they keep their place on screen) and the faint, faded end draws no depth. A track point behind
 * another track's trail is then hidden by it, while a trail never hides the point it ends at.
 */
function depthLines(material: LineMaterial, bias: number) {
  material.colorWrite = false;
  material.uniforms.trailDepthBias = { value: bias };
  material.vertexShader = material.vertexShader
    .replace('uniform float linewidth;', 'uniform float linewidth;\nuniform float trailDepthBias;')
    .replace('vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );', 'vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );\nstart.xyz += normalize(start.xyz) * trailDepthBias;\nend.xyz += normalize(end.xyz) * trailDepthBias;');
  material.fragmentShader = material.fragmentShader
    .replace('vec4 diffuseColor = vec4( diffuse, alpha );', 'if (alpha < 0.5) discard;\nvec4 diffuseColor = vec4( diffuse, alpha );');
}

/** Where each track is and how far it strays: the largest distance of a sample from its mean, and its per-axis median. */
function trackStatistics(track: TracksEntry) {
  const count = track.positions[0]?.length ?? 0, frames = track.positions.length;
  const radius = new Float32Array(count), median = new Float32Array(count * 3);
  const values = new Float64Array(frames);
  for (let i = 0; i < count; i++) {
    const samples = track.valid ? track.positions.filter((_, f) => track.valid![f][i]) : track.positions;
    if (!samples.length) continue;
    const mean = [0, 1, 2].map(axis => samples.reduce((sum, frame) => sum + frame[i][axis], 0) / samples.length);
    for (const frame of samples) radius[i] = Math.max(radius[i], Math.hypot(frame[i][0] - mean[0], frame[i][1] - mean[1], frame[i][2] - mean[2]));
    for (let axis = 0; axis < 3; axis++) {
      samples.forEach((frame, f) => values[f] = frame[i][axis]);
      const sorted = values.subarray(0, samples.length).sort();
      median[i * 3 + axis] = (sorted[(samples.length - 1) >> 1] + sorted[samples.length >> 1]) / 2;
    }
  }
  return { radius, median };
}

/** 1-based ranks of every value across all `groups`, ties broken in order so saturated tails can still be trimmed. */
function rank(groups: ArrayLike<number>[]) {
  const sorted = Float64Array.from(groups.flatMap(group => Array.from(group))).sort();
  const next = new Map<number, number>();
  sorted.forEach((value, index) => { if (!next.has(value)) next.set(value, index + 1); });
  return groups.map(group => Uint32Array.from(group, value => {
    const position = next.get(value)!;
    next.set(value, position + 1);
    return position;
  }));
}

/** What a point can be colored by; normals are RGB bytes, `rank` and `visibility` run 0 to 1. */
interface Sample { rgb?: Vec3; p: Vec3; time: number; rank?: number; visibility?: number; normal?: Vec3; cloud?: Vec3; }
const MISSING: Vec3 = [110, 110, 110];

interface Transition { started: number; position: THREE.Vector3; endPosition: THREE.Vector3; target: THREE.Vector3; endTarget: THREE.Vector3; up: THREE.Vector3; endUp: THREE.Vector3; quaternion: THREE.Quaternion; endQuaternion: THREE.Quaternion; fov: number; endFov: number; projection: THREE.Vector3; endProjection: THREE.Vector3; follow: string | null; }

export class SceneRenderer {
  readonly renderer: THREE.WebGLRenderer;
  readonly camera = new THREE.PerspectiveCamera(FOV, 1, .001, 10000);
  readonly scene = new THREE.Scene();
  readonly root = new THREE.Group();
  readonly orbit: OrbitControls;
  private textures = new Map<string, THREE.Texture>();
  private backdrop: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  private data: SceneData | null = null;
  private timeRange: [number, number] = [0, 0];
  private prepared = new WeakMap<SceneData, {
    timeRange: [number, number]; pointRanks: Map<number[], Uint32Array>; pointCount: number;
    statistics: Map<TracksEntry, ReturnType<typeof trackStatistics>>;
    center: THREE.Vector3; radius: number;
    trackRanks: Map<Settings['trajectoryMode'], { ranks: Map<TracksEntry, Uint32Array>; count: number }>;
  }>();
  private settings: Settings = defaultSettings;
  /** The settings a scene without saved ones starts with: the built-in ones under the viewer config's. */
  private defaults: Settings = defaultSettings;
  // Points are ranked one by one; tracks as a whole, by their mean confidence over frames.
  private pointRanks = new Map<number[], Uint32Array>();
  private trackRanks = new Map<TracksEntry, Uint32Array>();
  private pointCount = 0;
  private trackCount = 0;
  private pointDrop = 0;
  private trackDrop = 0;
  private statistics = new Map<TracksEntry, ReturnType<typeof trackStatistics>>();
  private palettes = new Map<TracksEntry, Uint8Array>();
  private center = new THREE.Vector3();
  private radius = 1;
  private time = 0;
  private generation = 0;
  private lines: LineMaterial[] = [];
  private points: THREE.ShaderMaterial[] = [];
  private frusta: { object: THREE.Object3D; entry: CameraEntry }[] = [];
  // Focal scale and principal point of a camera being looked through (1, 0, 0: none).
  private projection = new THREE.Vector3(1, 0, 0);
  private transition: Transition | null = null;
  private following: string | null = null;
  private keys = new Set<string>();
  private pointer: [number, number] | null = null;
  private rolling: number | null = null;
  private raycaster = new THREE.Raycaster();
  /** Called with the static and moving track counts whenever the scene is rebuilt. */
  onMotionCounts: (counts: { still: number; moving: number }) => void = () => {};
  /** Called with a camera's time when it is double-clicked, so scene time moves to its frame. */
  onSeek: (time: number) => void = () => {};

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.backdrop = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
      uniforms: { uSize: { value: new THREE.Vector2(1, 1) } }, vertexShader: BACKDROP_VERTEX, fragmentShader: BACKDROP_FRAGMENT, depthTest: false, depthWrite: false,
    }));
    this.backdrop.frustumCulled = false;
    this.backdrop.renderOrder = -1;
    this.scene.add(this.backdrop);
    // OpenCV right/down/forward to Three.js right/up/back (a half turn about x); raw arrays stay intact.
    this.root.scale.set(1, -1, -1);
    this.scene.add(this.root);
    this.camera.position.set(2, 1, 3);
    this.orbit = new OrbitControls(this.camera, canvas);
    this.orbit.enableDamping = true;
    // The middle button tilts the horizon (pointerMove).
    this.orbit.mouseButtons.MIDDLE = -1 as THREE.MOUSE;
    // OrbitControls caches its up basis at construction; a camera looked through can have any roll.
    const orbit = this.orbit as unknown as { _quat: THREE.Quaternion; _quatInverse: THREE.Quaternion };
    const update = this.orbit.update.bind(this.orbit), worldUp = new THREE.Vector3(0, 1, 0);
    this.orbit.update = (delta?: number) => {
      orbit._quat.setFromUnitVectors(this.camera.up, worldUp);
      orbit._quatInverse.copy(orbit._quat).invert();
      return update(delta);
    };
    canvas.addEventListener('contextmenu', this.contextMenu);
    canvas.addEventListener('dblclick', this.doubleClick);
    canvas.addEventListener('pointerdown', this.pointerDown, { capture: true });
    canvas.addEventListener('pointermove', this.pointerMove, { capture: true });
    canvas.addEventListener('pointerup', this.pointerUp);
    canvas.addEventListener('wheel', this.release, { capture: true, passive: true });
    window.addEventListener('keydown', this.keyDown);
    window.addEventListener('keyup', this.keyUp);
    window.addEventListener('blur', this.blur);
  }

  private contextMenu = (event: Event) => event.preventDefault();
  private pointerDown = (event: PointerEvent) => {
    this.pointer = [event.clientX, event.clientY];
    if (event.button === 1) { this.rolling = event.clientX; event.preventDefault(); }
  };
  private pointerUp = (event: PointerEvent) => { if (event.button === 1) this.rolling = null; };
  private pointerMove = (event: PointerEvent) => {
    if (this.rolling !== null) {
      // Turn the up vector about the view direction; the orbit's next lookAt applies it as a roll.
      const forward = this.orbit.target.clone().sub(this.camera.position).normalize();
      this.camera.up.applyAxisAngle(forward, (event.clientX - this.rolling) * ROLL_RATE).normalize();
      this.rolling = event.clientX;
    }
    if (this.pointer && event.buttons && Math.hypot(event.clientX - this.pointer[0], event.clientY - this.pointer[1]) > 2) { this.pointer = null; this.release(); }
  };
  private keyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null;
    if (event.metaKey || event.ctrlKey || (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return;
    if (event.code in MOVE_KEYS || event.code.startsWith('Shift')) this.keys.add(event.code);
  };
  private keyUp = (event: KeyboardEvent) => { this.keys.delete(event.code); };
  private blur = () => this.keys.clear();

  /** Stop following a camera: the view keeps its pose, with an ordinary centred projection. */
  private release = () => {
    if (!this.transition && !this.following) return;
    this.transition = null; this.following = null;
    this.projection.set(1, 0, 0);
    this.updateProjection();
  };

  private updateProjection() {
    this.camera.updateProjectionMatrix();
    const m = this.camera.projectionMatrix.elements;
    // Keep the image's vertical framing while applying its focal scale and principal point.
    m[0] *= this.projection.x;
    m[8] = this.projection.y / this.camera.aspect;
    m[9] = this.projection.z;
    this.camera.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert();
  }

  resize(width: number, height: number) {
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.updateProjection();
    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    this.lines.forEach(material => material.resolution.copy(size));
    this.points.forEach(material => this.sizePoints(material));
    this.backdrop.material.uniforms.uSize.value.copy(size);
  }

  /** Constant on-screen point diameter at the display's pixel ratio. */
  private sizePoints(material: THREE.ShaderMaterial) {
    material.uniforms.uRadius.value = material.userData.diameter / 2 * this.renderer.getPixelRatio();
    material.uniforms.uViewportHeight.value = this.renderer.getDrawingBufferSize(new THREE.Vector2()).y;
  }

  async setScene(data: SceneData) {
    const generation = ++this.generation;
    const loader = new THREE.TextureLoader();
    const textures = new Map<string, THREE.Texture>();
    await Promise.all(data.images.map(async image => {
      const texture = await loader.loadAsync(image.url);
      texture.colorSpace = THREE.SRGBColorSpace;
      textures.set(image.url, texture);
    }));
    if (generation !== this.generation) { textures.forEach(texture => texture.dispose()); return; }
    this.textures.forEach(texture => texture.dispose());
    this.textures = textures;
    this.data = data;
    const prepared = this.prepared.get(data);
    if (prepared) {
      this.timeRange = prepared.timeRange;
      this.pointRanks = prepared.pointRanks; this.pointCount = prepared.pointCount;
      this.statistics = prepared.statistics;
      this.center.copy(prepared.center); this.radius = prepared.radius;
    } else {
      const times = [...data.images.map(x => x.time), ...data.points.map(x => x.time), ...data.cameras.map(x => x.time), ...data.tracks.flatMap(x => x.times)];
      this.timeRange = times.length ? [Math.min(...times), Math.max(...times)] : [0, 0];
      const clouds = data.points.flatMap(item => item.confidence ? [item.confidence] : []);
      this.pointRanks = new Map(rank(clouds).map((ranks, i) => [clouds[i], ranks]));
      this.pointCount = clouds.reduce((n, cloud) => n + cloud.length, 0);
      this.statistics = new Map(data.tracks.map(track => [track, trackStatistics(track)]));
      this.measure(data);
      this.prepared.set(data, {
        timeRange: this.timeRange, pointRanks: this.pointRanks, pointCount: this.pointCount,
        statistics: this.statistics, center: this.center.clone(), radius: this.radius, trackRanks: new Map(),
      });
    }
    this.palettes.clear();
    const {confidence, imagePlanes, ...saved} = data.presentation.settings ?? {};
    const settings = {...this.defaults, ...saved};
    if (imagePlanes === false) settings.planeOpacity = 0;
    if (saved.confidenceKeep === undefined && confidence !== undefined && this.pointCount) {
      const confidences = data.points.flatMap(item => item.confidence ?? []);
      settings.confidenceKeep = confidences.reduce((count, value) => count + Number(value >= confidence), 0) / confidences.length;
    }
    this.time = this.range()[0];
    this.trackRanks = new Map();
    this.fit(false);
    if (data.presentation.view) this.setCamera(data.presentation.view);
    this.setSettings(settings);
    return settings;
  }

  /** The scene's extent from its 1st to 99th percentile on each axis, so stray points do not set the scale. */
  private measure(data: SceneData) {
    const samples: Vec3[] = [];
    const every = Math.max(1, Math.floor((data.points.reduce((n, item) => n + item.positions.length, 0) + data.tracks.reduce((n, track) => n + track.positions.length * (track.positions[0]?.length ?? 0), 0)) / 100_000));
    let index = 0;
    const add = (point: Vec3) => { if (index++ % every === 0) samples.push(point); };
    data.points.forEach(item => item.positions.forEach(add));
    data.tracks.forEach(track => track.positions.forEach((frame, f) => frame.forEach((point, i) => { if (!track.valid || track.valid[f][i]) add(point); })));
    data.cameras.forEach(camera => samples.push([camera.pose[0][3], camera.pose[1][3], camera.pose[2][3]]));
    if (!samples.length) { this.center.set(0, 0, 0); this.radius = 1; return; }
    const [low, high] = [0, 1].map(end => [0, 1, 2].map(axis => {
      const values = samples.map(point => point[axis]).sort((a, b) => a - b);
      return values[Math.round((end ? .99 : .01) * (values.length - 1))];
    }));
    // Into Three.js axes (the root's half turn about x).
    this.center.set((low[0] + high[0]) / 2, -(low[1] + high[1]) / 2, -(low[2] + high[2]) / 2);
    this.radius = Math.max(.01, Math.hypot(high[0] - low[0], high[1] - low[1], high[2] - low[2]) / 2);
  }

  /** Takes `defaults` for scenes loaded from now on; true when no scene is shown yet, so they apply now too. */
  setDefaults(defaults: Settings) {
    this.defaults = defaults;
    return !this.data;
  }

  private rankTracks() {
    const prepared = this.data && this.prepared.get(this.data);
    const cached = prepared?.trackRanks.get(this.settings.trajectoryMode);
    if (cached) { this.trackRanks = cached.ranks; this.trackCount = cached.count; return; }
    const scored = (this.data?.tracks ?? []).filter(track => track.confidence && (!track.mode || track.mode === this.settings.trajectoryMode));
    const means = scored.map(track => Float64Array.from(track.confidence![0], (_, i) => track.confidence!.reduce((sum, frame) => sum + frame[i], 0) / track.confidence!.length));
    this.trackRanks = new Map(rank(means).map((ranks, i) => [scored[i], ranks]));
    this.trackCount = means.reduce((n, mean) => n + mean.length, 0);
    prepared?.trackRanks.set(this.settings.trajectoryMode, { ranks: this.trackRanks, count: this.trackCount });
  }

  setSettings(settings: Settings) {
    if (settings === this.settings) return;
    const coloring = (['trailGradient', 'trailBoxes', 'trailOutside'] as const).some(key => settings[key] !== this.settings[key]);
    if (coloring) this.palettes.clear();
    const changedMode = settings.trajectoryMode !== this.settings.trajectoryMode;
    this.settings = settings;
    if (changedMode || !this.trackRanks.size) this.rankTracks();
    this.pointDrop = Math.round((1-settings.confidenceKeep)*this.pointCount);
    this.trackDrop = Math.round((1-settings.confidenceKeep)*this.trackCount);
    this.backdrop.visible = settings.background === 'gradient';
    this.scene.background = settings.background === 'gradient' ? null : new THREE.Color(settings.backgroundColor);
    this.rebuild();
  }

  range(): [number, number] {
    return [...this.timeRange];
  }

  setTime(time: number) {
    if (time === this.time) return;
    this.time = time;
    this.rebuild();
    if (this.following && !this.transition) this.follow(this.following);
  }

  /**
   * A point's color in linear RGB. Confidence (its rank among what the filter keeps) and visibility use viridis; normals arrive as RGB bytes; time and depth use turbo. What a point lacks is grey.
   */
  private color(mode: ColorMode, sample: Sample): Vec3 {
    const bytes = mode === 'rgb' ? sample.rgb : mode === 'normals' ? sample.normal : mode === 'cloud_normals' ? sample.cloud : undefined;
    // A normal with no estimate arrives black, which no unit normal maps to.
    const missing = !bytes || (mode !== 'rgb' && !bytes[0] && !bytes[1] && !bytes[2]);
    if (mode === 'rgb' || mode === 'normals' || mode === 'cloud_normals') return (missing ? MISSING : bytes).map(srgbByteToLinear) as Vec3;
    if (mode === 'confidence' || mode === 'visibility') {
      const value = mode === 'confidence' ? sample.rank : sample.visibility;
      return (value === undefined ? MISSING : viridis(value)).map(srgbByteToLinear) as Vec3;
    }
    const [start, end] = this.range();
    // Time across the clip, or camera-forward z of the reference frame across the scene's extent.
    const value = mode === 'time' ? (sample.time - start) / Math.max(1e-6, end - start)
      : 1 - Math.min(1, Math.max(0, (sample.p[2] + this.center.z + this.radius) / (2 * this.radius)));
    return turbo(value).map(srgbByteToLinear) as Vec3;
  }

  /** Where a confidence rank falls among the ranks the filter keeps, 0 to 1. */
  private kept(rank: number | undefined, drop: number, count: number) {
    return rank === undefined ? undefined : Math.min(1, Math.max(0, (rank - drop - 1) / Math.max(1, count - drop - 1)));
  }

  private clear() {
    this.root.traverse(object => {
      if (object instanceof THREE.Points || object instanceof THREE.Line || object instanceof THREE.Mesh) {
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach(material => material.dispose());
      }
    });
    this.root.clear();
    this.lines = []; this.points = []; this.frusta = [];
  }

  private lineMaterial(parameters: ConstructorParameters<typeof LineMaterial>[0]) {
    const material = new LineMaterial(parameters);
    material.resolution.copy(this.renderer.getDrawingBufferSize(new THREE.Vector2()));
    this.lines.push(material);
    return material;
  }

  /**
   * Points at `opacity`: opaque ones resolve their edge by alpha to coverage, faded ones blend over the scene without
   * writing depth. `onTop` points are drawn after the trails, so a trail
   * ending at its point never covers it.
   */
  private addPoints(positions: number[], colors: number[], diameter: number, opacity = 1, onTop = false) {
    if (!positions.length) return;
    const geometry = new THREE.InstancedBufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(QUAD, 3));
    geometry.setAttribute('instancePosition', new THREE.InstancedBufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('instanceColor', new THREE.InstancedBufferAttribute(new Float32Array(colors), 3));
    geometry.instanceCount = positions.length / 3;
    const faded = opacity < 1;
    const material = new THREE.ShaderMaterial({
      uniforms: { uRadius: { value: 1 }, uViewportHeight: { value: 1 }, uOpacity: { value: opacity } },
      vertexShader: POINT_VERTEX, fragmentShader: POINT_FRAGMENT,
      alphaToCoverage: !faded && !onTop, transparent: faded || onTop, depthWrite: !faded,
    });
    material.userData.diameter = diameter;
    this.sizePoints(material);
    this.points.push(material);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    if (onTop) mesh.renderOrder = 2;
    this.root.add(mesh);
  }

  private palette(track: TracksEntry) {
    if (!this.palettes.has(track)) this.palettes.set(track, trailPalette(this.settings, track.source_uv ?? track.positions[0].map(() => [.5, .5]), track.colors, track.source_frames ?? track.positions[0].map(() => track.source_frame ?? 0)));
    return this.palettes.get(track)!;
  }

  /** Whether an entry's layer (the index its name ends with, as `tracks/2`) is shown. */
  private shown(name: string) {
    const layer = name.match(/\/(\d+)$/);
    return !layer || !this.settings.hiddenLayers.includes(Number(layer[1]));
  }

  private rebuild() {
    this.clear();
    if (!this.data) return;
    const s = this.settings;
    const latest = new Map<string, number>();
    for (const item of this.data.points) if (item.time <= this.time) latest.set(item.name, Math.max(latest.get(item.name) ?? -Infinity, item.time));
    const positions: number[] = [], colors: number[] = [];
    for (const item of this.data.points) {
      if (!this.shown(item.name)) continue;
      if (!s.allClouds && item.time !== latest.get(item.name)) continue;
      item.positions.forEach((point, index) => {
        if (item.confidence && this.pointRanks.get(item.confidence)![index] <= this.pointDrop) return;
        positions.push(...point);
        colors.push(...this.color(s.pointColor, {
          rgb: item.colors?.[index], p: point, time: item.time, normal: item.normals?.[index], cloud: item.cloud_normals?.[index],
          rank: this.kept(item.confidence && this.pointRanks.get(item.confidence)![index], this.pointDrop, this.pointCount),
          visibility: item.visibility && item.visibility[index] / 255,
        }));
      });
    }
    this.addPoints(positions, colors, s.pointSize);
    const trail = { positions: [] as number[], colors: [] as number[], start: [] as number[], end: [] as number[] };
    // Points without a trail draw with the cloud, so trails behind them are hidden; points leading a trail draw after
    // the trails so their own trail never covers them.
    const heads = { positions: [] as number[], colors: [] as number[] }, leading = { positions: [] as number[], colors: [] as number[] };
    const dimmed = { positions: [] as number[], colors: [] as number[] };
    const threshold = s.motion.threshold / 100 * 2 * this.radius;
    const counts = { still: 0, moving: 0 };
    for (const track of this.data.tracks) {
      if (!track.times.length || !this.shown(track.name) || (track.mode && track.mode !== s.trajectoryMode)) continue;
      const { radius, median } = this.statistics.get(track)!;
      let lower = 0;
      while (lower+1 < track.times.length && track.times[lower+1] <= this.time) lower++;
      const upper = Math.min(lower+1, track.times.length-1);
      const mix = s.frameTransition === 'direct' || upper === lower || this.time < track.times[0] ? 0 : (this.time-track.times[lower]) / (track.times[upper]-track.times[lower]);
      const ranks = this.trackRanks.get(track);
      const confident = (_frame: number, point: number) => !ranks || ranks[point] > this.trackDrop;
      const seen = (frame: number, point: number) => 1 / (1 + Math.exp(-(track.visibility_logits?.[frame][point] ?? 100))) >= s.visibility;
      const valid = (frame: number, point: number) => (track.valid?.[frame][point] ?? true) && confident(frame, point) && (s.occluded !== 'hide' || seen(frame, point));
      const palette = s.trailColor === 'position' ? this.palette(track) : null;
      const sample = (frame: number, index: number, p: Vec3, time: number): Sample => ({
        rgb: track.colors?.[index], p, time, normal: track.normals?.[frame][index], cloud: track.cloud_normals?.[frame][index],
        rank: this.kept(ranks?.[index], this.trackDrop, this.trackCount),
        visibility: track.visibility_logits && 1 / (1 + Math.exp(-track.visibility_logits[frame][index])),
      });
      track.positions[lower].forEach((point, index) => {
        const still = s.motion.enabled && radius[index] <= threshold;
        counts[still ? 'still' : 'moving']++;
        let p: Vec3;
        if (still && s.motion.collapse) {
          if (!track.positions.some((_, frame) => valid(frame, index))) return;
          p = [median[index*3], median[index*3+1], median[index*3+2]];
        } else {
          if (!valid(lower,index) || (mix > 0 && !valid(upper,index))) return;
          p = point.map((value,axis) => value + (track.positions[upper][index][axis]-value)*mix) as Vec3;
        }
        // A trail is the unbroken run of valid frames that ends at its point.
        let first = lower;
        while (first > Math.max(0, lower - s.trailLength) && valid(first - 1, index)) first--;
        const trailed = !still && s.trails && s.trailLength > 0 && trackKept(index, s.trailDensity) && (first < lower || mix > 0);
        const head = s.occluded === 'dim' && !(seen(lower, index) && (mix === 0 || seen(upper, index))) ? dimmed : trailed ? leading : heads;
        head.positions.push(...p);
        head.colors.push(...(s.motion.enabled && s.motion.tint ? still ? STATIC_TINT : MOVING_TINT : this.color(s.pointColor, sample(lower, index, p, this.time))));
        if (!trailed) return;
        const segment = (from: Vec3, to: Vec3, frame: number) => {
          // Trails keep their original confidence scale: turbo over log confidence.
          const color = palette ? Array.from(palette.subarray(index*3, index*3+3), srgbByteToLinear) as Vec3
            : s.trailColor === 'confidence' ? turbo(Math.min(1, Math.log1p(Math.max(0, (track.confidence?.[frame][index] ?? 1) - 1)) / 4)).map(srgbByteToLinear) as Vec3
            : this.color(s.trailColor as ColorMode, sample(Math.min(frame + 1, track.times.length - 1), index, to, track.times[Math.min(frame + 1, track.times.length - 1)]));
          trail.positions.push(...from, ...to); trail.colors.push(...color, ...color);
          const length = lower + mix - first;
          trail.start.push((frame - first) / Math.max(1e-6, length)); trail.end.push(Math.min(1, (frame + 1 - first) / Math.max(1e-6, length)));
        };
        for (let frame = first; frame < lower; frame++) segment(track.positions[frame][index], track.positions[frame+1][index], frame);
        if (mix > 0) segment(track.positions[lower][index], p, lower);
      });
    }
    this.onMotionCounts(counts);
    this.addPoints(heads.positions, heads.colors, s.pointSize);
    this.addPoints(leading.positions, leading.colors, s.pointSize, 1, true);
    this.addPoints(dimmed.positions, dimmed.colors, s.pointSize, DIM_OCCLUDED, true);
    if (trail.positions.length) {
      const geometry = new LineSegmentsGeometry().setPositions(trail.positions).setColors(trail.colors);
      for (const [name, progress] of [['instanceProgressStart', trail.start], ['instanceProgressEnd', trail.end]] as const)
        geometry.setAttribute(name, new THREE.InstancedBufferAttribute(s.trailFade ? new Float32Array(progress) : new Float32Array(progress.length).fill(1), 1));
      const material = this.lineMaterial({ vertexColors: true, linewidth: s.trailWidth, transparent: true, opacity: s.trailOpacity, depthWrite: false });
      fadeLines(material);
      const lines = new LineSegments2(geometry, material);
      lines.renderOrder = 1;
      // Drawn with the opaque points, before any colour: trails then hide what is behind them, each other included.
      const depth = this.lineMaterial({ linewidth: s.trailWidth });
      fadeLines(depth);
      depthLines(depth, TRAIL_DEPTH_BIAS * 2 * this.radius);
      this.root.add(lines, new LineSegments2(geometry, depth));
    }
    if (s.cameras) this.addCameras();
  }

  private addCameras() {
    if (!this.data) return;
    const s = this.settings;
    const cameras = this.data.cameras.filter(camera => this.shown(camera.name));
    const current = new Map<string, number>();
    for (const camera of cameras) if (camera.time <= this.time) current.set(camera.name, Math.max(current.get(camera.name) ?? -Infinity, camera.time));
    // The current camera in the first hue, every other in its frame's own, fading with distance in frames.
    const frames = new Map<string, number[]>();
    for (const camera of cameras) frames.set(camera.name, [...frames.get(camera.name) ?? [], camera.time]);
    frames.forEach(times => times.sort((a, b) => a - b));
    if (s.cameras) {
      const paths = new Map<string, CameraEntry[]>();
      for (const camera of cameras) paths.set(camera.name, [...paths.get(camera.name) ?? [], camera]);
      for (const path of paths.values()) {
        if (path.length < 2) continue;
        const centers = path.sort((a,b) => a.time-b.time).flatMap((camera, i, all) => i ? [...all[i-1].pose.slice(0, 3).map(row => row[3]), ...camera.pose.slice(0, 3).map(row => row[3])] : []);
        this.root.add(new LineSegments2(new LineSegmentsGeometry().setPositions(centers), this.lineMaterial({ color: cameraColor(0), linewidth: Math.max(1, s.frustumWidth * .75), transparent: true, opacity: .55 })));
      }
    }
    for (const entry of cameras) {
      const k = entry.intrinsics, depth = this.radius*s.frustumSize;
      const corners = [[-.5,-.5], [entry.width-.5,-.5], [entry.width-.5,entry.height-.5], [-.5,entry.height-.5]].map(([x,y]) => [(x-k[0][2])/k[0][0]*depth, (y-k[1][2])/k[1][1]*depth, depth]);
      const group = new THREE.Group();
      group.applyMatrix4(new THREE.Matrix4().fromArray(entry.pose.flat()).transpose());
      const isActive = current.get(entry.name) === entry.time;
      if (s.cameras) {
        const times = frames.get(entry.name)!, frame = times.indexOf(entry.time), age = frame - times.indexOf(current.get(entry.name) ?? times[0]);
        const material = this.lineMaterial({ color: isActive ? cameraColor(0) : cameraColor(frame + 1), linewidth: s.frustumWidth, transparent: true,
          opacity: isActive ? .9 : Math.max(.16, .42 * Math.exp(-Math.abs(age) / 14)) });
        const segments = corners.flatMap((corner, i) => [0, 0, 0, ...corner, ...corner, ...corners[(i+1)%4]]);
        group.add(new LineSegments2(new LineSegmentsGeometry().setPositions(segments), material));
      }
      if (isActive && s.planeOpacity > 0) {
        const image = this.data.images.filter(image => image.name === entry.image && image.time <= this.time).sort((a,b) => b.time-a.time)[0];
        if (image) {
          const geometry = new THREE.BufferGeometry().setFromPoints(corners.map(c => new THREE.Vector3(...c)));
          geometry.setIndex([0,1,2,0,2,3]);
          geometry.setAttribute('uv', new THREE.Float32BufferAttribute([0,1,1,1,1,0,0,0],2));
          group.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: this.textures.get(image.url), side: THREE.DoubleSide, transparent: true, opacity: s.planeOpacity, depthWrite: false })));
        }
      }
      if (group.children.length) { this.root.add(group); this.frusta.push({ object: group, entry }); }
    }
  }

  /** The Three.js view through `entry`: its pose, vertical field of view, and focal scale and principal point. */
  private through(entry: CameraEntry) {
    this.root.updateMatrixWorld();
    const pose = new THREE.Matrix4().fromArray(entry.pose.flat()).transpose().premultiply(this.root.matrixWorld);
    const position = new THREE.Vector3(), quaternion = new THREE.Quaternion();
    pose.decompose(position, quaternion, new THREE.Vector3());
    // OpenCV looks down +z with y down; a Three.js camera down -z with y up: a half turn about x.
    quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI));
    const k = entry.intrinsics, aspect = entry.width / entry.height;
    const fx = k[0][0] / entry.width, fy = k[1][1] / entry.height, cx = (k[0][2] + .5) / entry.width, cy = (k[1][2] + .5) / entry.height;
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(quaternion);
    return {
      position, quaternion,
      up: new THREE.Vector3(0, 1, 0).applyQuaternion(quaternion),
      target: position.clone().addScaledVector(forward, this.radius * .65),
      fov: 2 * Math.atan(.5 / fy) * 180 / Math.PI,
      projection: new THREE.Vector3(fx * aspect / fy, (1 - 2 * cx) * aspect, 2 * cy - 1),
    };
  }

  private camerasAt(name: string) {
    return this.data?.cameras.filter(camera => camera.name === name && camera.time <= this.time).sort((a, b) => b.time - a.time)[0];
  }

  private follow(name: string) {
    const entry = this.camerasAt(name);
    if (!entry) return;
    const view = this.through(entry);
    this.camera.position.copy(view.position); this.camera.quaternion.copy(view.quaternion); this.camera.up.copy(view.up);
    this.camera.fov = view.fov; this.projection.copy(view.projection); this.updateProjection();
    this.orbit.target.copy(view.target);
  }

  private doubleClick = (event: MouseEvent) => {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.raycaster.params.Line2 = { threshold: 6 };
    this.raycaster.setFromCamera(new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2), this.camera);
    const hit = this.raycaster.intersectObjects(this.frusta.map(item => item.object), true)[0];
    const item = hit && this.frusta.find(frustum => frustum.object === hit.object.parent);
    if (!item) return;
    event.preventDefault();
    this.onSeek(item.entry.time);
    this.lookThrough(item.entry);
  };

  /** Fly into a camera over 650 ms, then stay in it while scene time changes; any drag, scroll or move key leaves. */
  lookThrough(entry: CameraEntry) {
    const view = this.through(entry);
    this.following = null;
    this.transition = {
      started: performance.now(), follow: entry.name,
      position: this.camera.position.clone(), endPosition: view.position,
      target: this.orbit.target.clone(), endTarget: view.target,
      up: this.camera.up.clone(), endUp: view.up,
      quaternion: this.camera.quaternion.clone(), endQuaternion: view.quaternion,
      fov: this.camera.fov, endFov: view.fov,
      projection: this.projection.clone(), endProjection: view.projection,
    };
  }

  /**
   * Back to the view from just behind and above the reference camera (the origin, looking down -z here),
   * aimed at the scene's centre, animated unless `animate` is false.
   */
  fit(animate = true) {
    const position = new THREE.Vector3(0, .3 * this.radius, .8 * this.radius);
    this.camera.near = this.radius/1000; this.camera.far = this.radius*100;
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().lookAt(position, this.center, new THREE.Vector3(0, 1, 0)));
    this.following = null;
    if (animate) {
      this.transition = {
        started: performance.now(), follow: null,
        position: this.camera.position.clone(), endPosition: position,
        target: this.orbit.target.clone(), endTarget: this.center.clone(),
        up: this.camera.up.clone(), endUp: new THREE.Vector3(0, 1, 0),
        quaternion: this.camera.quaternion.clone(), endQuaternion: quaternion,
        fov: this.camera.fov, endFov: FOV,
        projection: this.projection.clone(), endProjection: new THREE.Vector3(1, 0, 0),
      };
      return;
    }
    this.transition = null;
    this.camera.position.copy(position); this.camera.quaternion.copy(quaternion); this.camera.up.set(0, 1, 0);
    this.camera.fov = FOV; this.projection.set(1, 0, 0); this.updateProjection();
    this.orbit.target.copy(this.center); this.orbit.update();
  }

  view(): CameraView {
    return { position: this.camera.position.toArray(), quaternion: this.camera.quaternion.toArray(), target: this.orbit.target.toArray(), up: this.camera.up.toArray(), fov: this.camera.fov, near: this.camera.near, far: this.camera.far, zoom: this.camera.zoom, projection: this.projection.toArray() };
  }

  setCamera(view: CameraView) {
    this.transition = null; this.following = null;
    this.camera.position.fromArray(view.position); this.camera.quaternion.fromArray(view.quaternion);
    this.camera.up.fromArray(view.up); this.orbit.target.fromArray(view.target);
    this.camera.fov = view.fov; this.camera.near = view.near; this.camera.far = view.far; this.camera.zoom = view.zoom;
    this.projection.fromArray(view.projection ?? [1, 0, 0]); this.updateProjection();
  }

  render(dt=0) {
    if (this.keys.size) this.move(dt);
    const t = this.transition;
    if (t) {
      const progress = Math.min(1, (performance.now() - t.started) / TRANSITION_MS), eased = 1 - (1 - progress) ** 3;
      this.camera.position.lerpVectors(t.position, t.endPosition, eased);
      this.orbit.target.lerpVectors(t.target, t.endTarget, eased);
      this.camera.up.lerpVectors(t.up, t.endUp, eased).normalize();
      this.camera.quaternion.slerpQuaternions(t.quaternion, t.endQuaternion, eased);
      this.camera.fov = THREE.MathUtils.lerp(t.fov, t.endFov, eased);
      this.projection.lerpVectors(t.projection, t.endProjection, eased);
      this.updateProjection();
      if (progress === 1) { this.transition = null; this.following = t.follow; if (t.follow) this.follow(t.follow); }
    } else if (!this.following) this.orbit.update();
    this.renderer.render(this.scene, this.camera);
  }

  /** WASD along the view, Q/E down and up; Shift is four times faster. Camera and orbit target move together. */
  private move(dt: number) {
    const direction = new THREE.Vector3();
    for (const code of this.keys) if (MOVE_KEYS[code]) direction.add(new THREE.Vector3(...MOVE_KEYS[code]));
    if (!direction.lengthSq()) return;
    this.release();
    const speed = this.radius * .8 * (this.keys.has('ShiftLeft') || this.keys.has('ShiftRight') ? 4 : 1);
    const step = direction.normalize().applyQuaternion(this.camera.quaternion).multiplyScalar(speed * dt);
    this.camera.position.add(step); this.orbit.target.add(step);
  }

  dispose() {
    this.generation++;
    this.clear(); this.textures.forEach(texture => texture.dispose());
    this.backdrop.geometry.dispose(); this.backdrop.material.dispose();
    const canvas = this.renderer.domElement;
    canvas.removeEventListener('contextmenu', this.contextMenu); canvas.removeEventListener('dblclick', this.doubleClick);
    canvas.removeEventListener('pointerdown', this.pointerDown, { capture: true }); canvas.removeEventListener('pointermove', this.pointerMove, { capture: true });
    canvas.removeEventListener('pointerup', this.pointerUp);
    canvas.removeEventListener('wheel', this.release, { capture: true });
    window.removeEventListener('keydown', this.keyDown); window.removeEventListener('keyup', this.keyUp); window.removeEventListener('blur', this.blur);
    this.orbit.dispose(); this.renderer.dispose();
  }
}
