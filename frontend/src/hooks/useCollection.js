import { useState, useEffect } from "react";
import rawFetch from "../api/client";


function useCollection(token, path, enabled = true) {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const reload = () => {

    if (!enabled || !token) {
      setLoading(false);
      return;
    }

    setLoading(true);

    rawFetch(path, {}, token)
      .then((d) => {
        setItems(Array.isArray(d) ? d : []);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });

  };


  useEffect(() => {
    reload();
  }, [token, enabled, path]);



  const create = (body) => {

    return rawFetch(
      path,
      {
        method: "POST",
        body: JSON.stringify(body)
      },
      token
    ).then((r) => {
      reload();
      return r;
    });

  };



  const update = (id, body) => {

    return rawFetch(
      `${path}/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(body)
      },
      token
    ).then((r) => {
      reload();
      return r;
    });

  };



  const remove = (id) => {

    return rawFetch(
      `${path}/${id}`,
      {
        method: "DELETE"
      },
      token
    ).then(() => {
      reload();
    });

  };



  return {
    items,
    loading,
    error,
    reload,
    create,
    update,
    remove
  };

}


export const fmt = (n) =>
  new Intl.NumberFormat(
    "es-CO",
    {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }
  ).format(Math.round(n || 0));



export const monthLabel = (dateStr) => {

  if (!dateStr) return "";

  const d = new Date(dateStr);

  return d.toLocaleDateString(
    "es-CO",
    {
      month: "short",
      year: "numeric"
    }
  );

};



export default useCollection;