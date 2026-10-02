export function imageWasDownloaded(image) {
  const resource = performance.getEntriesByName(image.currentSrc || image.src).at(-1);
  return resource?.encodedBodySize > 0 && resource.transferSize >= resource.encodedBodySize;
}
