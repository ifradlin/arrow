export async function request(path: string, init?: RequestInit) {
  const response = await fetch(path, init);
  if (!response.ok) {
    // FastAPI errors carry a JSON `detail`; anything else (a crash) is plain text.
    const text = await response.text();
    let detail = text || response.statusText;
    try {
      const value = JSON.parse(text).detail;
      detail = Array.isArray(value) ? value.map((issue: {msg: string}) => issue.msg).join('; ') : value ?? detail;
    } catch { /* not JSON */ }
    throw new Error(`${response.status} ${detail}`);
  }
  return response;
}
