import { useState, useEffect } from "react";

import rawFetch from "../api/client";

/* Colección genérica: GET lista, POST crear, DELETE eliminar */
function useCollection(token, path, enabled = true) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = () => {
    if (!enabled || !token) { setLoading(false); return; }
    setLoading(true);
    rawFetch(path, {}, token)
      .then((d) => { setItems(Array.isArray(d) ? d : []); setError(null); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { reload(); /* eslint-disable-next-line */ }, [token, enabled, path]);

  const create = (body) => rawFetch(path, { method: "POST", body: JSON.stringify(body) }, token).then((r) => { reload(); return r; });
  const remove = (id) => rawFetch(`${path}/${id}`, { method: "DELETE" }, token).then(() => reload());

  return { items, loading, error, reload, create, remove };
}

const fmt = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(Math.round(n || 0));

const monthLabel = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-CO", { month: "short", year: "numeric" });
};

export default useCollection;