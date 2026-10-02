import { srgbByteToLinear } from "./viewer-math.js";

export function positionTrackColor(position, low, high) {
  const normalized = position.map((value, axis) =>
    Math.max(0, Math.min(1, (value - low[axis]) / Math.max(high[axis] - low[axis], 1e-6))),
  );
  const value = normalized[0] * 0.5 + normalized[1] * 0.3 + normalized[2] * 0.2;
  const hue = 0.83 * (1 - value);
  const sector = hue * 6;
  const index = Math.floor(sector);
  const fraction = sector - index;
  const saturation = 0.86;
  const brightness = 0.95;
  const chroma = brightness * saturation;
  const secondary = chroma * (1 - Math.abs(((index + fraction) % 2) - 1));
  const rgb = [
    [chroma, secondary, 0],
    [secondary, chroma, 0],
    [0, chroma, secondary],
    [0, secondary, chroma],
    [secondary, 0, chroma],
    [chroma, 0, secondary],
  ][index % 6];
  const match = brightness - chroma;
  return rgb.map((channel) => srgbByteToLinear(Math.round((channel + match) * 255)));
}

export function writeTrailStyle(
  colors,
  progressStart,
  progressEnd,
  segment,
  step,
  first,
  last,
  trackColors,
  trackOffset = 0,
) {
  const length = Math.max(1, last - first + 1);
  const start = (step - first) / length;
  const end = (step - first + 1) / length;
  const destination = segment * 6;
  for (let channel = 0; channel < 3; channel += 1) {
    colors[destination + channel] = trackColors[trackOffset + channel];
    colors[destination + 3 + channel] = trackColors[trackOffset + channel];
  }
  progressStart[segment] = start;
  progressEnd[segment] = end;
}

// Pure trajectory helpers. Keeping windowing and motion filtering independent
// from Three.js makes their semantics cheap to test and hard to regress.
export function trailWindow(frame, history) {
  const lastSegment = Math.max(0, Math.floor(frame));
  const length = Math.max(1, Math.floor(history));
  return {
    firstSegment: Math.max(1, lastSegment - length + 1),
    lastSegment,
  };
}

export function trailHeadPresent(valid, visible, track, frames, frame, showOccluded, passesConfidence) {
  const index = track * frames + frame;
  return Boolean(valid[index]) && (showOccluded || !visible || Boolean(visible[index])) && passesConfidence(index);
}

export function contiguousTrailStart(valid, track, frames, first, last, passesConfidence) {
  for (let step = last; step >= first; step -= 1) {
    const previous = track * frames + step - 1;
    const current = previous + 1;
    if (!valid[previous] || !valid[current] || !passesConfidence(previous) || !passesConfidence(current)) {
      return step + 1;
    }
  }
  return first;
}

export function summarizeTracks(positions, valid, confidence, tracks, frames) {
  const meanPositions = new Float32Array(tracks * 3);
  const motionRadius = new Float32Array(tracks);
  const meanConfidence = confidence ? new Float32Array(tracks) : null;
  for (let track = 0; track < tracks; track += 1) {
    let count = 0;
    for (let frame = 0; frame < frames; frame += 1) {
      const index = track * frames + frame;
      if (!valid[index]) continue;
      count += 1;
      for (let axis = 0; axis < 3; axis++) meanPositions[track * 3 + axis] += positions[index * 3 + axis];
      if (meanConfidence) meanConfidence[track] += confidence[index];
    }
    if (!count) continue;
    for (let axis = 0; axis < 3; axis++) meanPositions[track * 3 + axis] /= count;
    if (meanConfidence) meanConfidence[track] /= count;
    for (let frame = 0; frame < frames; frame += 1) {
      const index = track * frames + frame;
      if (!valid[index]) continue;
      let distanceSquared = 0;
      for (let axis = 0; axis < 3; axis++) {
        const delta = positions[index * 3 + axis] - meanPositions[track * 3 + axis];
        distanceSquared += delta * delta;
      }
      motionRadius[track] = Math.max(motionRadius[track], Math.sqrt(distanceSquared));
    }
  }
  return { meanPositions, motionRadius, meanConfidence };
}

export function trackConfidenceThreshold(scores, percent) {
  if (!scores || percent <= 0) return -Infinity;
  const sorted = Float32Array.from(scores).sort();
  return sorted[Math.min(sorted.length - 1, Math.floor((percent / 100) * (sorted.length - 1)))];
}

export function isStaticTrack(radius, sceneDiagonal, tolerancePercent) {
  return tolerancePercent > 0 && radius <= (tolerancePercent / 100) * sceneDiagonal;
}

export function ensureTrailCapacity(positions, colors, requiredValues) {
  if (requiredValues <= positions.length) return [positions, colors];
  const capacity = Math.max(requiredValues, positions.length * 2);
  return [new Float32Array(capacity), new Float32Array(capacity)];
}

export function trailMotionSquared(positions, valid, track, frames, firstSegment, lastSegment, passes = () => true) {
  let anchor = -1;
  let maximumMotionSquared = 0;
  for (let step = Math.max(0, firstSegment - 1); step <= lastSegment; step += 1) {
    const index = track * frames + step;
    if (!valid[index] || !passes(index)) continue;
    if (anchor < 0) {
      anchor = index;
      continue;
    }
    const anchorOffset = anchor * 3;
    const currentOffset = index * 3;
    const dx = positions[currentOffset] - positions[anchorOffset];
    const dy = positions[currentOffset + 1] - positions[anchorOffset + 1];
    const dz = positions[currentOffset + 2] - positions[anchorOffset + 2];
    maximumMotionSquared = Math.max(maximumMotionSquared, dx * dx + dy * dy + dz * dz);
  }
  return maximumMotionSquared;
}
