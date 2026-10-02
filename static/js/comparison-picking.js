export function comparisonPickSide(x, width, { split, comparing }) {
  if (!comparing || width <= 0) return "arrow";
  const boundary = width * (split / 100);
  return x >= boundary ? "baseline" : "arrow";
}
