// Mirrors the stage's CSS background inside the (opaque) WebGL canvas.
//
// The canvas is drawn without alpha so browsers can composite it as an opaque
// layer, which keeps page scrolling smooth.  The stage's computed `background`
// stays the single source of truth: a solid color, or the first layer of a
// `linear-gradient()` / `radial-gradient()` with percentage color stops.
// Anything else falls back to the solid `background-color`.
export const MAX_BACKGROUND_STOPS = 16;

const SOLID = 0;
const LINEAR = 1;
const RADIAL = 2;

export function splitTopLevel(value, separator) {
  const parts = [];
  let depth = 0;
  let current = "";
  for (const character of value) {
    if (character === "(") depth += 1;
    else if (character === ")") depth -= 1;
    const splits = separator === " " ? /\s/.test(character) : character === separator;
    if (splits && depth === 0) {
      if (current.trim()) parts.push(current.trim());
      current = "";
    } else current += character;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

export function parseRgb(color) {
  const value = color.trim().toLowerCase();
  const hex = value.match(/^#([\da-f]{3}|[\da-f]{6})$/);
  if (hex) {
    const digits = hex[1].length === 3 ? [...hex[1]].map((digit) => digit + digit) : hex[1].match(/../g);
    return digits.map((digit) => parseInt(digit, 16));
  }
  const rgb = value.match(/^rgba?\(([^)]*)\)$/);
  if (!rgb) return null;
  const channels = rgb[1]
    .split(/[\s,/]+/)
    .filter(Boolean)
    .slice(0, 3);
  if (channels.length !== 3) return null;
  const bytes = channels.map((channel) =>
    channel.endsWith("%") ? Number.parseFloat(channel) * 2.55 : Number.parseFloat(channel),
  );
  return bytes.every(Number.isFinite) ? bytes.map((byte) => Math.max(0, Math.min(255, byte))) : null;
}

const length = (token) => {
  const match = token.match(/^(-?[\d.]+)(px|%)$/);
  return match ? { value: Number(match[1]), unit: match[2] } : null;
};

const angle = (token) => {
  const match = token.match(/^(-?[\d.]+)(deg|rad|grad|turn)$/);
  if (!match) return null;
  const turns = { deg: 1 / 360, rad: 1 / (2 * Math.PI), grad: 1 / 400, turn: 1 };
  return Number(match[1]) * turns[match[2]] * 2 * Math.PI;
};

function parseStops(args, resolveColor) {
  const stops = [];
  for (const arg of args) {
    const [color, ...positions] = splitTopLevel(arg, " ");
    const rgb = resolveColor(color);
    // A lone position is an interpolation hint, which is not mirrored.
    if (!rgb || positions.length > 2) return null;
    if (!positions.length) stops.push({ color: rgb, offset: null });
    for (const position of positions) {
      const parsed = length(position);
      if (parsed?.unit !== "%") return null;
      stops.push({ color: rgb, offset: parsed.value / 100 });
    }
  }
  if (stops.length < 2 || stops.length > MAX_BACKGROUND_STOPS) return null;
  // CSS Images 3 §3.4.3: default the ends, clamp to the running maximum, then
  // space runs of unpositioned stops evenly between their neighbours.
  stops[0].offset ??= 0;
  stops.at(-1).offset ??= 1;
  let maximum = stops[0].offset;
  for (const stop of stops) {
    if (stop.offset !== null) maximum = stop.offset = Math.max(stop.offset, maximum);
  }
  for (let index = 1; index < stops.length; index += 1) {
    if (stops[index].offset !== null) continue;
    let end = index;
    while (stops[end].offset === null) end += 1;
    const from = stops[index - 1].offset;
    const step = (stops[end].offset - from) / (end - index + 1);
    for (let missing = index; missing < end; missing += 1) stops[missing].offset = from + step * (missing - index + 1);
  }
  return stops;
}

function parseLinear(config) {
  if (config === null) return { angle: Math.PI };
  const radians = angle(config);
  if (radians !== null) return { angle: radians };
  const sides = config.match(/^to\s+(.+)$/)?.[1].split(/\s+/);
  if (!sides || sides.length > 2) return null;
  const x = sides.includes("left") ? -1 : sides.includes("right") ? 1 : 0;
  const y = sides.includes("top") ? -1 : sides.includes("bottom") ? 1 : 0;
  if (Math.abs(x) + Math.abs(y) !== sides.length) return null;
  return { corner: [x, y] };
}

const positionKeywords = { left: [0, "x"], right: [100, "x"], top: [0, "y"], bottom: [100, "y"], center: [50, null] };

function parsePosition(tokens) {
  if (!tokens.length)
    return [
      { value: 50, unit: "%" },
      { value: 50, unit: "%" },
    ];
  if (tokens.length > 2) return null;
  const resolved = tokens.map((token) => {
    const keyword = positionKeywords[token];
    return keyword ? { value: keyword[0], unit: "%", axis: keyword[1] } : length(token);
  });
  if (resolved.some((item) => !item)) return null;
  if (resolved.length === 1) {
    return resolved[0].axis === "y" ? [{ value: 50, unit: "%" }, resolved[0]] : [resolved[0], { value: 50, unit: "%" }];
  }
  if (resolved[0].axis === "y" || resolved[1].axis === "x") resolved.reverse();
  return resolved[0].axis === "y" || resolved[1].axis === "x" ? null : resolved;
}

function parseRadial(config) {
  const [shapeSize, position = ""] = config === null ? [""] : config.split(/(?:^|\s+)at\s+/);
  const tokens = shapeSize.split(/\s+/).filter(Boolean);
  let shape = null;
  let size = "farthest-corner";
  const lengths = [];
  for (const token of tokens) {
    if (token === "circle" || token === "ellipse") shape = token;
    else if (/^(closest|farthest)-(side|corner)$/.test(token)) size = token;
    else if (length(token)) lengths.push(length(token));
    else return null;
  }
  shape ??= lengths.length === 1 ? "circle" : "ellipse";
  if (lengths.length && lengths.length !== (shape === "circle" ? 1 : 2)) return null;
  if (shape === "circle" && lengths[0]?.unit === "%") return null;
  const center = parsePosition(position.split(/\s+/).filter(Boolean));
  return center && { shape, size: lengths.length ? lengths : size, center };
}

// Returns a resolution-independent description of the background, or null
// when the CSS cannot be mirrored exactly.
export function parseViewerBackground(backgroundImage, backgroundColor, resolveColor = parseRgb) {
  const image = (backgroundImage || "none").trim();
  if (image === "none") {
    const color = resolveColor(backgroundColor || "");
    return color && { type: "solid", color };
  }
  const layer = splitTopLevel(image, ",")[0];
  const match = layer.match(/^(linear|radial)-gradient\((.*)\)$/s);
  if (!match) return null;
  const args = splitTopLevel(match[2], ",");
  const configured = /^(to\s|-?[\d.]+(deg|rad|grad|turn|px|%)(\s|$)|circle|ellipse|closest-|farthest-|at\s)/.test(
    args[0],
  );
  const config = configured ? args.shift().replace(/\s+/g, " ") : null;
  const stops = parseStops(args, resolveColor);
  if (!stops) return null;
  const geometry = match[1] === "linear" ? parseLinear(config) : parseRadial(config);
  return geometry && { type: match[1], ...geometry, stops };
}

const resolveLength = ({ value, unit }, extent) => (unit === "%" ? (value / 100) * extent : value);

function radialRadius(spec, cx, cy, width, height) {
  const circle = spec.shape === "circle";
  if (Array.isArray(spec.size)) {
    return circle
      ? [spec.size[0].value, spec.size[0].value]
      : [resolveLength(spec.size[0], width), resolveLength(spec.size[1], height)];
  }
  const horizontal = [Math.abs(cx), Math.abs(width - cx)];
  const vertical = [Math.abs(cy), Math.abs(height - cy)];
  const pick = spec.size.startsWith("closest") ? Math.min : Math.max;
  const sideX = pick(...horizontal);
  const sideY = pick(...vertical);
  if (spec.size.endsWith("side")) return circle ? Array(2).fill(pick(sideX, sideY)) : [sideX, sideY];
  // The chosen corner is the nearest/farthest one; ellipses keep the aspect
  // ratio of the matching `-side` size (CSS Images 3 §3.2.1).
  if (circle) return Array(2).fill(Math.hypot(sideX, sideY));
  const ratio = sideX / Math.max(sideY, 1e-6);
  const radiusY = Math.hypot(sideX / Math.max(ratio, 1e-6), sideY);
  return [ratio * radiusY, radiusY];
}

// Converts a parsed background into shader uniforms for a stage of the given
// CSS pixel size.  Coordinates use CSS conventions: origin top-left, y down.
export function backgroundUniformValues(spec, width, height) {
  const colors = new Float32Array(MAX_BACKGROUND_STOPS * 3);
  const offsets = new Float32Array(MAX_BACKGROUND_STOPS);
  const stops = spec.type === "solid" ? [{ color: spec.color, offset: 0 }] : spec.stops;
  stops.forEach((stop, index) => {
    colors.set(
      stop.color.map((byte) => byte / 255),
      index * 3,
    );
    offsets[index] = stop.offset;
  });
  const values = {
    type: SOLID,
    size: [width, height],
    start: [0, 0],
    axis: [0, 0],
    center: [0, 0],
    radius: [1, 1],
    colors,
    offsets,
    count: stops.length,
  };
  if (spec.type === "linear") {
    let direction = [Math.sin(spec.angle ?? 0), -Math.cos(spec.angle ?? 0)];
    if (spec.corner) {
      // The gradient line is perpendicular to the diagonal between the two
      // neighbouring corners and points into the requested corner.
      const [x, y] = spec.corner;
      const lengthToCorner = Math.hypot(height, width) || 1;
      direction = x && y ? [(x * height) / lengthToCorner, (y * width) / lengthToCorner] : [x, y];
    }
    const gradientLength = Math.abs(width * direction[0]) + Math.abs(height * direction[1]) || 1;
    values.type = LINEAR;
    values.start = [width / 2 - (direction[0] * gradientLength) / 2, height / 2 - (direction[1] * gradientLength) / 2];
    values.axis = [direction[0] / gradientLength, direction[1] / gradientLength];
  } else if (spec.type === "radial") {
    const cx = resolveLength(spec.center[0], width);
    const cy = resolveLength(spec.center[1], height);
    values.type = RADIAL;
    values.center = [cx, cy];
    values.radius = radialRadius(spec, cx, cy, width, height).map((radius) => Math.max(radius, 1e-3));
  }
  return values;
}

export const backgroundVertexShader = `
  varying vec2 backgroundUv;
  void main() {
    backgroundUv = vec2(uv.x, 1.0 - uv.y);
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Interpolates in gamma-encoded sRGB like CSS does, and writes the result
// without a color-space conversion.  Half-LSB dithering avoids banding in the
// large, dark gradient.
export const backgroundFragmentShader = `
  uniform int backgroundType;
  uniform vec2 size;
  uniform vec2 start;
  uniform vec2 axis;
  uniform vec2 center;
  uniform vec2 radius;
  uniform vec3 colors[${MAX_BACKGROUND_STOPS}];
  uniform float offsets[${MAX_BACKGROUND_STOPS}];
  uniform int count;
  varying vec2 backgroundUv;

  void main() {
    vec2 point = backgroundUv * size;
    float t = 0.0;
    if (backgroundType == ${LINEAR}) t = dot(point - start, axis);
    else if (backgroundType == ${RADIAL}) t = length((point - center) / radius);
    vec3 color = colors[0];
    for (int index = 1; index < ${MAX_BACKGROUND_STOPS}; index++) {
      if (index >= count) break;
      float from = offsets[index - 1];
      float to = offsets[index];
      if (t >= from) color = to > from
        ? mix(colors[index - 1], colors[index], clamp((t - from) / (to - from), 0.0, 1.0))
        : colors[index];
    }
    float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    gl_FragColor = vec4(color + (noise - 0.5) / 255.0, 1.0);
  }
`;
