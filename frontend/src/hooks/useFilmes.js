import { useState, useEffect, useCallback } from "react";
import { filmesService } from "../services/filmes.js";

export function useFilmes() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await filmesService.getAll();
      setFilmes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { filmes, loading, error, reload: load };
}

export function useFilme(id) {
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    filmesService
      .getById(id)
      .then(setFilme)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { filme, loading, error };
}

export function useFilmesComAvaliacao() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    filmesService
      .comAvaliacao()
      .then(setFilmes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { filmes, loading, error };
}
