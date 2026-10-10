const linearRgb = Float32Array.from({ length: 256 }, (_, byte) => {
  const value = byte / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
});
export const srgbByteToLinear = (byte: number) => linearRgb[Math.round(byte)];
