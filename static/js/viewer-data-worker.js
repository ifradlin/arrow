import { decodeChunk, fetchGzip } from "./progressive-data.js";

self.onmessage = async ({ data: { id, url, chunk, quantization } }) => {
  try {
    const fields = decodeChunk(await fetchGzip(url), chunk, quantization);
    self.postMessage(
      { id, fields },
      Object.values(fields).map((array) => array.buffer),
    );
  } catch (error) {
    self.postMessage({ id, error: error.message });
  }
};
