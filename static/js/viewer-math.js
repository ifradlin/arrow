const linearRgb = Float32Array.from({ length: 256 }, (_, byte) => {
  const value = byte / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
});

export function srgbByteToLinear(byte) {
  return linearRgb[byte];
}

export function firstObservedTrackColors(colors, sourceColors, valid, visible, tracks, frames) {
  if (sourceColors?.length === tracks * 3) return sourceColors;
  const stable = new Uint8Array(tracks * 3);
  const colorFrames = colors.length === tracks * frames * 3 ? frames : 1;
  const sourceFrames = sourceColors?.length === tracks * frames * 3 ? frames : 1;
  for (let track = 0; track < tracks; track += 1) {
    let first = -1;
    for (let step = 0; step < frames; step += 1) {
      const index = track * frames + step;
      if (valid[index] && (!visible || visible[index])) {
        first = step;
        break;
      }
    }
    if (first < 0) {
      for (let step = 0; step < frames; step += 1) {
        if (valid[track * frames + step]) {
          first = step;
          break;
        }
      }
    }
    const selected = first >= 0 ? colors : sourceColors || colors;
    const selectedFrames = selected === colors ? colorFrames : sourceFrames;
    const source = (track * selectedFrames + Math.max(0, Math.min(first, selectedFrames - 1))) * 3;
    stable.set(selected.subarray(source, source + 3), track * 3);
  }
  return stable;
}

export function animationDeltaSeconds(now, previous) {
  return Math.max(0, Math.min((now - previous) / 1000, 0.1));
}

export function fovFromNormalizedFy(fy) {
  return (2 * Math.atan(0.5 / fy) * 180) / Math.PI;
}

export function blendCameraCalibrations(from, to, progress) {
  const mixed = new Map();
  for (const [entries, weight] of [
    [from, 1 - progress],
    [to, progress],
  ]) {
    for (const entry of entries) {
      const key = `${entry.frame}:${entry.view}`;
      const previous = mixed.get(key)?.weight || 0;
      mixed.set(key, { ...entry, weight: previous + entry.weight * weight });
    }
  }
  return [...mixed.values()].filter(({ weight }) => weight > 0);
}

export function alignedImagePlaneProjection(state, calibrationForCamera) {
  let fov = state.fov;
  const projection = [...(state.projection || [1, 0, 0])];
  for (const source of state.calibrations || []) {
    const local = calibrationForCamera(source.frame, source.view, source.imageAspect);
    if (!local) continue;
    fov += (local.fov - source.fov) * source.weight;
    for (let axis = 0; axis < 3; axis++) {
      projection[axis] += (local.projection[axis] - source.projection[axis]) * source.weight;
    }
  }
  return { fov, projection };
}

export function cameraProjectionParameters([fx, fy, cx = 0.5, cy = 0.5], imageAspect) {
  return [(fx * imageAspect) / fy, (1 - 2 * cx) * imageAspect, 2 * cy - 1];
}

export function pointRadiusPixels(size) {
  return Math.max(size * 40, 0.5);
}

export function pointViewportScale(width, height) {
  return Math.min(width, height) / 600;
}

export function viewportDistanceScale(previousAspect, nextAspect) {
  return Math.min(1, previousAspect) / Math.max(1e-6, Math.min(1, nextAspect));
}

export function cameraColorHsl(index) {
  return [((218 + index * 137.507764) % 360) / 360, 0.72, 0.62];
}

export function cameraColorIndices(frames, selected = []) {
  const indices = new Map();
  for (const frame of selected) {
    if (frame >= 0 && frame < frames && !indices.has(frame)) indices.set(frame, indices.size);
  }
  for (let frame = 0; frame < frames; frame++) {
    if (!indices.has(frame)) indices.set(frame, indices.size);
  }
  return indices;
}

export function frameAtTime(value, frames) {
  return Math.max(0, Math.min(frames - 1, Math.floor(value)));
}

export function scrubberPosition(time, frames) {
  return time / frames;
}

export function scrubberFrame(position, frames) {
  return frameAtTime(position * frames + 1e-9, frames);
}

export function frustumDimensions(radius, intrinsics, imagePlaneFraction) {
  const [fx, fy, cx = 0.5, cy = 0.5] = intrinsics;
  const depth = (radius * imagePlaneFraction) / Math.hypot(1 / fx, 1 / fy);
  return {
    depth,
    width: depth / fx,
    height: depth / fy,
    centerX: (depth * (0.5 - cx)) / fx,
    centerY: (depth * (cy - 0.5)) / fy,
  };
}

export function imagePlaneScale(source, target) {
  const x = target[0] / source[0];
  const y = target[1] / source[1];
  return [x, y, 1];
}

export function transformedCameraIntrinsics(intrinsics, scale) {
  return [(intrinsics[0] * scale[2]) / scale[0], (intrinsics[1] * scale[2]) / scale[1], ...intrinsics.slice(2)];
}

export function visibleFrustumEdges(
  [width, height, depth, centerX, centerY],
  projection,
  viewportWidth,
  viewportHeight,
  lineWidth,
) {
  const bottom = ((centerY - height / 2) / depth) * projection[5] - projection[9];
  const right = ((centerX + width / 2) / depth) * projection[0] - projection[8];
  const top = ((centerY + height / 2) / depth) * projection[5] - projection[9];
  const left = ((centerX - width / 2) / depth) * projection[0] - projection[8];
  const horizontalMargin = lineWidth / viewportWidth;
  const verticalMargin = lineWidth / viewportHeight;
  return [
    bottom > -1 + verticalMargin,
    right < 1 - horizontalMargin,
    top < 1 - verticalMargin,
    left > -1 + horizontalMargin,
  ];
}

export function rdfPoseToThreeElements(pose) {
  if (pose.length !== 16) throw new RangeError("a camera pose must contain 16 values");
  const signs = [1, -1, -1, 1];
  return Array.from({ length: 16 }, (_, index) => {
    const row = Math.floor(index / 4);
    const column = index % 4;
    return pose[index] * signs[row] * signs[column];
  });
}

export function projectRdfPoint(point, poseC2W, intrinsics) {
  const dx = point[0] - poseC2W[3];
  const dy = point[1] - poseC2W[7];
  const dz = point[2] - poseC2W[11];
  // c2w rotation is row-major. Its inverse is R^T.
  const x = poseC2W[0] * dx + poseC2W[4] * dy + poseC2W[8] * dz;
  const y = poseC2W[1] * dx + poseC2W[5] * dy + poseC2W[9] * dz;
  const z = poseC2W[2] * dx + poseC2W[6] * dy + poseC2W[10] * dz;
  if (!Number.isFinite(z) || z <= 0) return null;
  return [(intrinsics[0] * x) / z + intrinsics[2], (intrinsics[1] * y) / z + intrinsics[3], z];
}
