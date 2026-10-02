const identity = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
const distance = (a, b) => a.reduce((sum, value, axis) => sum + (value - b[axis]) ** 2, 0);
export const transformPoint = (matrix, point) =>
  [0, 1, 2].map(
    (row) => matrix[row] * point[0] + matrix[row + 4] * point[1] + matrix[row + 8] * point[2] + matrix[row + 12],
  );

export function alignCameras(source, reference) {
  const targets = new Map(reference.map((camera) => [camera.id, camera.matrix]));
  const pairs = source
    .filter(({ id, matrix }) => targets.has(id) && matrix.every(Number.isFinite))
    .map(({ id, matrix }) => [matrix, targets.get(id)])
    .filter(([, matrix]) => matrix.every(Number.isFinite));
  if (!pairs.length) return null;
  const [own, target] = pairs[0];
  const matrix = identity();
  for (let col = 0; col < 3; col++)
    for (let row = 0; row < 3; row++)
      matrix[col * 4 + row] = [0, 1, 2].reduce((sum, axis) => sum + target[axis * 4 + row] * own[axis * 4 + col], 0);
  const ratios = pairs
    .map(([a, b]) => {
      const from = Math.hypot(...[0, 1, 2].map((axis) => a[12 + axis] - own[12 + axis]));
      const to = Math.hypot(...[0, 1, 2].map((axis) => b[12 + axis] - target[12 + axis]));
      return from > 1e-6 && to > 1e-6 ? to / from : NaN;
    })
    .filter(Number.isFinite)
    .sort((a, b) => a - b);
  if (!ratios.length) return null;
  const middle = ratios.length >> 1;
  const scale = ratios.length % 2 ? ratios[middle] : (ratios[middle - 1] + ratios[middle]) / 2;
  for (let col = 0; col < 3; col++) for (let row = 0; row < 3; row++) matrix[col * 4 + row] *= scale;
  transformPoint(matrix, own.slice(12, 15)).forEach((value, axis) => (matrix[12 + axis] = target[12 + axis] - value));
  return matrix;
}

function tree(points, depth = 0) {
  if (!points.length) return null;
  const axis = depth % 3;
  points.sort((a, b) => a[axis] - b[axis]);
  const middle = points.length >> 1;
  return {
    point: points[middle],
    axis,
    left: tree(points.slice(0, middle), depth + 1),
    right: tree(points.slice(middle + 1), depth + 1),
  };
}

function nearest(node, point, best = { point: null, error: Infinity }) {
  if (!node) return best;
  const error = distance(point, node.point);
  if (error < best.error) best = { point: node.point, error };
  const difference = point[node.axis] - node.point[node.axis];
  best = nearest(difference < 0 ? node.left : node.right, point, best);
  if (difference ** 2 < best.error) best = nearest(difference < 0 ? node.right : node.left, point, best);
  return best;
}

function eigenvector(matrix) {
  const vectors = Array.from({ length: 4 }, (_, row) => Array.from({ length: 4 }, (_, col) => Number(row === col)));
  for (let iteration = 0; iteration < 40; iteration++) {
    let p = 0,
      q = 1;
    for (let row = 0; row < 4; row++)
      for (let col = row + 1; col < 4; col++) {
        if (Math.abs(matrix[row][col]) > Math.abs(matrix[p][q])) [p, q] = [row, col];
      }
    if (Math.abs(matrix[p][q]) < 1e-12) break;
    const angle = 0.5 * Math.atan2(2 * matrix[p][q], matrix[q][q] - matrix[p][p]);
    const c = Math.cos(angle),
      s = Math.sin(angle);
    const pp = matrix[p][p],
      qq = matrix[q][q],
      pq = matrix[p][q];
    for (let row = 0; row < 4; row++) {
      if (row !== p && row !== q) {
        const rp = matrix[row][p],
          rq = matrix[row][q];
        matrix[row][p] = matrix[p][row] = c * rp - s * rq;
        matrix[row][q] = matrix[q][row] = s * rp + c * rq;
      }
      const vp = vectors[row][p],
        vq = vectors[row][q];
      vectors[row][p] = c * vp - s * vq;
      vectors[row][q] = s * vp + c * vq;
    }
    matrix[p][p] = c * c * pp - 2 * s * c * pq + s * s * qq;
    matrix[q][q] = s * s * pp + 2 * s * c * pq + c * c * qq;
    matrix[p][q] = matrix[q][p] = 0;
  }
  const values = matrix.map((row, i) => row[i]);
  return vectors.map((row) => row[values.indexOf(Math.max(...values))]);
}

function rigidFit(source, target) {
  const mean = (points) => [0, 1, 2].map((axis) => points.reduce((sum, point) => sum + point[axis], 0) / points.length);
  const a = mean(source),
    b = mean(target);
  const covariance = Array.from({ length: 3 }, (_, row) =>
    Array.from({ length: 3 }, (_, col) =>
      source.reduce((sum, point, i) => sum + (point[row] - a[row]) * (target[i][col] - b[col]), 0),
    ),
  );
  const [[xx, xy, xz], [yx, yy, yz], [zx, zy, zz]] = covariance;
  const [w, x, y, z] = eigenvector([
    [xx + yy + zz, yz - zy, zx - xz, xy - yx],
    [yz - zy, xx - yy - zz, xy + yx, zx + xz],
    [zx - xz, xy + yx, -xx + yy - zz, yz + zy],
    [xy - yx, zx + xz, yz + zy, -xx - yy + zz],
  ]);
  const matrix = [
    1 - 2 * (y * y + z * z),
    2 * (x * y + z * w),
    2 * (x * z - y * w),
    0,
    2 * (x * y - z * w),
    1 - 2 * (x * x + z * z),
    2 * (y * z + x * w),
    0,
    2 * (x * z + y * w),
    2 * (y * z - x * w),
    1 - 2 * (x * x + y * y),
    0,
    0,
    0,
    0,
    1,
  ];
  transformPoint(matrix, a).forEach((value, axis) => (matrix[12 + axis] = b[axis] - value));
  return matrix;
}

export async function registerPointClouds(
  source,
  reference,
  {
    iterations = 30,
    trim = 0.7,
    initialMatrix = identity(),
    yieldFrame = () => new Promise((resolve) => setTimeout(resolve, 0)),
  } = {},
) {
  const finite = (points) => points.filter((point) => point.length === 3 && point.every(Number.isFinite));
  source = finite(source);
  reference = finite(reference);
  if (source.length < 16 || reference.length < 16) return null;
  const index = tree([...reference]);
  const count = Math.max(16, Math.floor(source.length * trim));
  const matches = (matrix) =>
    source
      .map((point) => {
        const match = nearest(index, transformPoint(matrix, point));
        return { source: point, target: match.point, error: match.error };
      })
      .sort((a, b) => a.error - b.error)
      .slice(0, count);
  const score = (pairs) => pairs.reduce((sum, pair) => sum + pair.error, 0) / pairs.length;
  const scale = Math.hypot(...initialMatrix.slice(0, 3));
  let matrix = [...initialMatrix],
    pairs = matches(matrix),
    error = score(pairs);
  const initialError = error;
  for (let iteration = 0; iteration < iterations; iteration++) {
    const next = rigidFit(
      pairs.map((pair) => pair.source.map((value) => value * scale)),
      pairs.map((pair) => pair.target),
    );
    for (let col = 0; col < 3; col++) for (let row = 0; row < 3; row++) next[col * 4 + row] *= scale;
    const candidates = matches(next);
    const nextError = score(candidates);
    if (!Number.isFinite(nextError) || nextError > error + 1e-12) break;
    const improvement = error - nextError;
    matrix = next;
    pairs = candidates;
    error = nextError;
    if (improvement < Math.max(1e-12, error * 1e-5)) break;
    await yieldFrame();
  }
  return { matrix, initialRms: Math.sqrt(initialError), rms: Math.sqrt(error), matches: pairs.length };
}
