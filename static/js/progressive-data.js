const types = { uint8: Uint8Array, uint16: Uint16Array, float32: Float32Array };

export async function fetchGzip(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  if (response.headers.get("content-encoding")?.includes("gzip")) return response.arrayBuffer();
  return new Response(response.body.pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
}

export function decodeChunk(buffer, chunk, quantization) {
  if (buffer.byteLength !== chunk.bytes) throw new Error("Incorrect chunk size");
  const result = {};
  for (const [name, field] of Object.entries(chunk.fields)) {
    const Type = types[field.dtype];
    if (!Type) throw new Error(`Unsupported chunk dtype: ${field.dtype}`);
    const length = field.shape.reduce((a, b) => a * b, 1);
    if (field.offset + length * Type.BYTES_PER_ELEMENT > buffer.byteLength) throw new Error("Truncated chunk field");
    const packed = new Type(buffer, field.offset, length);
    if (name === "positions" && field.dtype === "uint16") {
      const positions = new Float32Array(length);
      for (let index = 0; index < length; index++) {
        const axis = index % 3;
        positions[index] = quantization.offset[axis] + packed[index] * quantization.scale[axis];
      }
      result[name] = positions;
    } else result[name] = packed.slice();
  }
  return result;
}

export function confidenceThresholds(layer, percent) {
  if (!layer?.ranks || percent <= 0) return null;
  const frames = layer.shape[1];
  return Float32Array.from({ length: frames }, (_, frame) => layer.ranks[frame * 101 + Math.round(percent)]);
}

let worker;
let nextRequest = 0;
const requests = new Map();

function requestChunk(url, chunk, quantization) {
  if (!worker) {
    worker = new Worker(new URL("./viewer-data-worker.js", import.meta.url), { type: "module" });
    worker.onmessage = ({ data }) => {
      const request = requests.get(data.id);
      if (!request) return;
      requests.delete(data.id);
      if (data.error) request.reject(new Error(data.error));
      else request.resolve(data.fields);
    };
    worker.onerror = (event) => {
      for (const request of requests.values()) request.reject(new Error(event.message));
      requests.clear();
      worker.terminate();
      worker = null;
    };
  }
  return new Promise((resolve, reject) => {
    const id = ++nextRequest;
    requests.set(id, { resolve, reject });
    worker.postMessage({ id, url, chunk, quantization });
  });
}

export async function copyChunk(layer, chunk, fields) {
  const copies = Object.entries(fields).map(([name, source]) => {
    const shape = layer.descriptor.fields[name].shape;
    const components = shape[2] || 1;
    return {
      source,
      target: layer[name],
      stride: shape[1] * components,
      count: chunk.fields[name].shape[1] * components,
      offset: chunk.frameStart * components,
    };
  });
  let started = performance.now();
  for (let start = 0; start < chunk.trackCount; start += 256) {
    const end = Math.min(start + 256, chunk.trackCount);
    for (const { source, target, stride, count, offset } of copies) {
      for (let track = start; track < end; track++) {
        target.set(source.subarray(track * count, (track + 1) * count), (chunk.trackStart + track) * stride + offset);
      }
    }
    if (end < chunk.trackCount && performance.now() - started >= 2) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      started = performance.now();
    }
  }
}

const completedRequests = new WeakMap();

function cached(cache, key, load) {
  if (!cache.has(key)) {
    const promise = load();
    cache.set(key, promise);
    promise.then(
      (value) => completedRequests.set(promise, value),
      () => {},
    );
    promise.catch(() => cache.delete(key));
  }
  return cache.get(key);
}

export const decodedPreviewImages = new Map();
const imageRequests = new Map();
const progressListeners = new Set();

// Notifies idle viewers that streamed geometry or preview images arrived, so
// they can refresh without polling every animation frame.
export function onStreamProgress(listener) {
  progressListeners.add(listener);
  return () => progressListeners.delete(listener);
}

const notifyProgress = () => progressListeners.forEach((listener) => listener());

export function progressiveBundleCached(manifest, manifestURL, selection, cache, bufferFrames = 1) {
  const names = new Set(
    [selection.pointLayer, selection.trailLayer, selection.staticLayer].filter((name) => manifest[name]),
  );
  const keys = [...names].map((name) => `progressive:${manifestURL.href}:${name}`);
  keys.push(`progressive-cameras:${manifestURL.href}`);
  if (!keys.every((key) => completedRequests.has(cache.get(key)))) return false;
  for (let frame = 0; frame < Math.min(bufferFrames, manifest.frames); frame++) {
    if (
      ![...names].every((name) =>
        completedRequests.get(cache.get(`progressive:${manifestURL.href}:${name}`)).ready(frame),
      )
    )
      return false;
    if (!manifest.previews.every((frames) => decodedPreviewImages.has(new URL(frames[frame], manifestURL).href)))
      return false;
  }
  return true;
}

function decodeImage(url) {
  return cached(imageRequests, url, async () => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;
    await image.decode();
    decodedPreviewImages.set(url, image);
    return image;
  });
}

export async function loadProgressiveBundle(manifest, manifestURL, selection, cache, onBufferProgress = () => {}) {
  const url = (entry) => {
    const asset = new URL(entry.path, manifestURL);
    if (manifestURL.search) asset.search = manifestURL.search;
    return asset.href;
  };
  const isStatic = selection.mode === "static_collection";
  const cameraImages = new Map();
  const views = manifest.previews.length;
  for (let frame = 0; frame < manifest.frames; frame++) {
    if (isStatic && !selection.observationFrames?.includes(frame)) continue;
    for (let view = 0; view < views; view++) {
      cameraImages.set(frame * views + view, new URL(manifest.previews[view][frame], manifestURL).href);
    }
  }
  const imagesReady = new Set();
  for (let frame = 0; frame < manifest.frames; frame++) {
    if (
      Array.from({ length: views }, (_, view) => cameraImages.get(frame * views + view)).every((image) =>
        decodedPreviewImages.has(image),
      )
    )
      imagesReady.add(frame);
  }
  const ensureImages = async (frame) => {
    await Promise.all(Array.from({ length: views }, (_, view) => decodeImage(cameraImages.get(frame * views + view))));
    imagesReady.add(frame);
    notifyProgress();
  };
  const firstImages = isStatic ? Promise.all((selection.observationFrames || []).map(ensureImages)) : ensureImages(0);
  const loadLayer = (name) =>
    cached(cache, `progressive:${manifestURL.href}:${name}`, async () => {
      const descriptor = manifest[name];
      if (!descriptor) throw new Error(`Missing ${name} layer`);
      const layer = { descriptor, shape: descriptor.positions.shape.slice(0, 2), revision: 0 };
      for (const [key, field] of Object.entries(descriptor.fields)) {
        layer[key] = new types[field.dtype](field.shape.reduce((a, b) => a * b, 1));
      }
      const metadata = Promise.all([
        descriptor.ranks ? fetchGzip(url(descriptor.ranks)) : null,
        manifest.format === "arrow-web-example/v4" && descriptor.palette ? fetchGzip(url(descriptor.palette)) : null,
      ]);
      const loaded = new Set();
      const pending = new Map();
      layer.load = (chunk) =>
        cached(pending, chunk.path, async () => {
          const fields = await requestChunk(url(chunk), chunk, descriptor.quantization);
          await copyChunk(layer, chunk, fields);
          loaded.add(chunk.path);
          layer.revision++;
          notifyProgress();
        });
      layer.ready = (frame) => {
        if (layer.shape[1] === 1) return loaded.has(descriptor.chunks[0].path);
        const chunk = descriptor.chunks.find(
          (item) => frame >= item.frameStart && frame < item.frameStart + item.frameCount,
        );
        return chunk && loaded.has(chunk.path);
      };
      layer.ensure = (frame) => {
        const chunk =
          layer.shape[1] === 1
            ? descriptor.chunks[0]
            : descriptor.chunks.find((item) => frame >= item.frameStart && frame < item.frameStart + item.frameCount);
        if (!chunk) throw new Error(`Missing timestep ${frame}`);
        return layer.load(chunk);
      };
      const [[ranks, palette]] = await Promise.all([
        metadata,
        layer.load(descriptor.chunks[0]),
        descriptor.constants ? layer.load(descriptor.constants) : null,
      ]);
      layer.ranks = ranks && new Float32Array(ranks);
      layer.palette = palette && new Float32Array(palette);
      return layer;
    });
  const cameras = cached(cache, `progressive-cameras:${manifestURL.href}`, async () => {
    const [cameraPoses, cameraValid, cameraIntrinsics] = await Promise.all(
      ["poses", "valid", "intrinsics"].map((key) => fetchGzip(url(manifest.cameras[key]))),
    );
    return { cameraPoses, cameraValid, cameraIntrinsics };
  });
  const hasPoints = Boolean(manifest[selection.pointLayer]);
  const hasStatic = Boolean(manifest[selection.staticLayer]);
  if (!hasPoints && !hasStatic) throw new Error("Bundle has no point layer");
  const [points, trails, staticPoints, cameraData] = await Promise.all([
    hasPoints ? loadLayer(selection.pointLayer) : null,
    manifest[selection.trailLayer] ? loadLayer(selection.trailLayer) : null,
    hasStatic ? loadLayer(selection.staticLayer) : null,
    cameras,
    firstImages,
  ]);
  const stream = {
    cameraImages,
    get revision() {
      return (points?.revision || 0) + (trails === points ? 0 : trails?.revision || 0) + (staticPoints?.revision || 0);
    },
    get bufferRevision() {
      return this.revision + imagesReady.size;
    },
    ready(frame, history = 0) {
      if (isStatic) return points.ready(0);
      if (staticPoints && !staticPoints.ready(0)) return false;
      if ((points && !points.ready(frame)) || !imagesReady.has(frame)) return false;
      for (let previous = Math.max(0, frame - history); trails && previous <= frame; previous++) {
        if (!trails.ready(previous)) return false;
      }
      return true;
    },
    async ensure(frame, history = 0) {
      const work = points ? [points.ensure(isStatic ? 0 : frame)] : [];
      for (let previous = Math.max(0, frame - history); trails && previous <= frame; previous++)
        work.push(trails.ensure(previous));
      if (!isStatic) work.push(ensureImages(frame));
      await Promise.all(work);
      onBufferProgress(this);
    },
    async prefetch(isCurrent, lowPriority = () => false) {
      const wait = async () => {
        if (!lowPriority()) return;
        await new Promise((resolve) => {
          if (globalThis.requestIdleCallback) requestIdleCallback(resolve, { timeout: 1500 });
          else setTimeout(resolve, 50);
        });
      };
      if (isStatic) {
        for (const chunk of points.descriptor.chunks) {
          if (!isCurrent()) return;
          await wait();
          if (!isCurrent()) return;
          await points.load(chunk);
        }
      } else {
        // The rest of a still background, coarse chunk first, before later timesteps.
        for (const chunk of staticPoints?.descriptor.chunks || []) {
          if (!isCurrent()) return;
          await wait();
          if (!isCurrent()) return;
          await staticPoints.load(chunk);
        }
        for (let frame = 1; frame < manifest.frames; frame++) {
          if (!isCurrent()) return;
          await wait();
          if (!isCurrent()) return;
          await this.ensure(frame);
        }
      }
    },
  };
  await stream.ensure(0);
  return { points, trails, staticPoints, ...cameraData, stream, cameraImages };
}
