import { useState, useEffect, useCallback } from "react";
import { diretoresService } from "../services/diretores.js";

export function useDiretores() {
  const [diretores, setDiretores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await diretoresService.getAll();
      setDiretores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { diretores, loading, error, reload: load };
}

export function useDiretor(id) {
  const [diretor, setDiretor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    diretoresService
      .getById(id)
      .then(setDiretor)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { diretor, loading, error };
}
