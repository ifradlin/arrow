const requests = new Map();

export async function fetchManifest(url) {
  const key = String(url);
  if (!requests.has(key)) {
    const request = fetch(url);
    requests.set(key, request);
    request.then(
      (response) => {
        if (!response.ok) requests.delete(key);
      },
      () => requests.delete(key),
    );
  }
  return (await requests.get(key)).clone();
}

export function preloadManifests(paths, baseURL) {
  return Promise.allSettled(
    [...new Set(paths)].map(async (path) => {
      await fetchManifest(new URL(path, baseURL));
    }),
  );
}
