export const API_BASE = "http://localhost:8080";

async function rawFetch(path, options = {}, token) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    let msg = `Error ${res.status}`;
    try {
      const body = await res.json();
      msg = body.message || body.error || msg;
    } catch (_) {}
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  try { return await res.json(); } catch (_) { return null; }
}

export default rawFetch;