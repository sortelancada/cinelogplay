import { useState, useEffect, useCallback } from "react";
import { favoritosService } from "../services/favoritos.js";

export function useFavoritos(isAuthenticated) {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!isAuthenticated) { setFavoritos([]); return; }
    setLoading(true);
    setError(null);
    try {
      const data = await favoritosService.getAll();
      setFavoritos(data);
    } catch (err) {
      setError(err.message);
      setFavoritos([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => { load(); }, [load]);

  const isFavorito = useCallback(
    (filmeId) => favoritos.some((f) => (f.filme_id ?? f.id) === filmeId),
    [favoritos]
  );

  const toggle = useCallback(
    async (filmeId) => {
      if (!isAuthenticated) return;
      if (isFavorito(filmeId)) {
        await favoritosService.remove(filmeId);
        setFavoritos((prev) => prev.filter((f) => (f.filme_id ?? f.id) !== filmeId));
      } else {
        const res = await favoritosService.add(filmeId);
        const novo = res?.data ?? { filme_id: filmeId };
        setFavoritos((prev) => [...prev, novo]);
      }
    },
    [isAuthenticated, isFavorito]
  );

  return { favoritos, loading, error, isFavorito, toggle, reload: load };
}
