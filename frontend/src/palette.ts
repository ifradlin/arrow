import type { GradientMode, Settings } from './types';

const CORNERS: [number, number, number][] = [[0xff, 0x4d, 0x6d], [0xff, 0xd2, 0x3f], [0x3b, 0xce, 0xac], [0x5e, 0x60, 0xce]];
const GREY = 115;

/** Google's polynomial Turbo approximation; `t` in [0, 1]. */
export function turbo(t: number): [number, number, number] {
  const c = (k: number[]) => Math.round(255 * Math.min(1, Math.max(0, k.reduce((sum, a, i) => sum + a * t ** i, 0))));
  return [c([.13572138, 4.6153926, -42.66032258, 132.13108234, -152.94239396, 59.28637943]), c([.09140261, 2.19418839, 4.84296658, -14.18503333, 4.27729857, 2.82956604]), c([.1066733, 12.64194608, -60.58204836, 110.36276771, -89.90310912, 27.34824973])];
}

/** Matplotlib's viridis as a polynomial fit (purple at 0, yellow at 1); `t` in [0, 1]. */
export function viridis(t: number): [number, number, number] {
  const c = (k: number[]) => Math.round(255 * Math.min(1, Math.max(0, k.reduce((sum, a, i) => sum + a * t ** i, 0))));
  return [c([.2777273272, .1050930431, -.3308618287, -4.634230499, 6.228269936, 4.776384998, -5.435455856]),
    c([.005407344545, 1.404613530, .2148475595, -5.799100973, 14.17993337, -13.74514538, 4.645852612]),
    c([.3340998053, 1.384590163, .09509516303, -19.33244096, 56.69055260, -65.35303263, 26.31243525])];
}

function hsl(hue: number, saturation: number, lightness: number, out: Uint8Array, at: number) {
  const a = saturation * Math.min(lightness, 1 - lightness);
  for (const [channel, n] of [0, 8, 4].entries()) {
    const k = (n + hue * 12) % 12;
    out[at + channel] = Math.round((lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255);
  }
}

/** The colour at `(s, t)` of a unit square, both clamped to 0..1. */
function gradient(mode: GradientMode, s: number, t: number, out: Uint8Array, at: number) {
  s = Math.min(1, Math.max(0, s));
  t = Math.min(1, Math.max(0, t));
  if (mode === 'wheel') {
    const dx = s - .5, dy = t - .5;
    hsl((Math.atan2(dy, dx) / (2 * Math.PI) + 1) % 1, .85, .85 - .3 * Math.min(1, Math.hypot(dx, dy) * 2), out, at);
  } else if (mode === 'bands') {
    const wave = (value: number) => { const repeated = value * 3, fraction = repeated - Math.floor(repeated); return Math.floor(repeated) % 2 ? 1 - fraction : fraction; };
    hsl((wave(s) + wave(t)) / 2, .78, .62, out, at);
  } else if (mode === 'xy') {
    for (let channel = 0; channel < 3; channel++) {
      const top = CORNERS[0][channel] * (1 - s) + CORNERS[1][channel] * s;
      const bottom = CORNERS[2][channel] * (1 - s) + CORNERS[3][channel] * s;
      out[at + channel] = Math.round(top * (1 - t) + bottom * t);
    }
  } else out.set(turbo(mode === 'x' ? s : t), at);
}

/**
 * `uv` is each track's seed pixel in [0, 1], `rgb` its colour there. The first box a track
 * falls in colours it, stretched over that box; outside every box, `outside` decides.
 */
export function trailPalette(settings: Pick<Settings, 'trailGradient' | 'trailBoxes' | 'trailOutside'>, uv: [number, number][], rgb?: number[][], sources?: number[]): Uint8Array {
  const out = new Uint8Array(uv.length * 3);
  const { trailBoxes: boxes, trailOutside: outside } = settings;
  uv.forEach(([u, v], track) => {
    const at = track * 3;
    const local = boxes.filter(box => box.sourceFrame === undefined || box.sourceFrame === sources?.[track]);
    const box = local.find(({ rect }) => u >= rect[0] && u <= rect[2] && v >= rect[1] && v <= rect[3]);
    if (box) {
      const [u0, v0, u1, v1] = box.rect;
      gradient(box.mode, (u - u0) / Math.max(1e-6, u1 - u0), (v - v0) / Math.max(1e-6, v1 - v0), out, at);
    } else if (!local.length || outside === 'gradient') gradient(settings.trailGradient, u, v, out, at);
    else if (outside === 'rgb' && rgb) out.set(rgb[track], at);
    else out.fill(GREY, at, at + 3);
  });
  return out;
}

/** A gradient as a picture, for the box editor to lay over the frame. */
export function gradientImage(mode: GradientMode, width = 96, height = 64): string {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const context = canvas.getContext('2d')!;
  const image = context.createImageData(width, height);
  const rgb = new Uint8Array(3);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    gradient(mode, (x + .5) / width, (y + .5) / height, rgb, 0);
    image.data.set([rgb[0], rgb[1], rgb[2], 255], (y * width + x) * 4);
  }
  context.putImageData(image, 0, 0);
  return canvas.toDataURL();
}
