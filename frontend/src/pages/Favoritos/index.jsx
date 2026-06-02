import { useAuth } from "../../context/AuthContext.jsx";
import { useFavoritos } from "../../hooks/useFavoritos.js";
import { useFilmes } from "../../hooks/useFilmes.js";
import { useMemo } from "react";
import FilmeCard from "../../components/ui/FilmeCard.jsx";
import { Link } from "react-router-dom";

export default function FavoritosPage() {
  const { user, isAuthenticated } = useAuth();
  const { favoritos, loading, error, toggle } = useFavoritos(isAuthenticated);
  const { filmes } = useFilmes();

  const filmesIds = new Set(favoritos.map((f) => f.filme_id ?? f.id));

  const filmesFavoritos = useMemo(
    () => filmes.filter((f) => filmesIds.has(f.id)),
    [filmes, favoritos]
  );

  const favoritosIds = filmesFavoritos.map((f) => f.id);

  if (loading) {
    return (
      <div style={{ padding: "4rem 0" }}>
        <div className="container">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2.5rem 0 4rem" }}>
      <div className="container">
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            Meus Favoritos
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            {filmesFavoritos.length > 0
              ? `${filmesFavoritos.length} filme${filmesFavoritos.length > 1 ? "s" : ""} salvos`
              : "Você ainda não tem favoritos"}
          </p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        {filmesFavoritos.length === 0 && !loading ? (
          <div className="empty-state">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>♡</div>
            <h3>Nenhum favorito ainda</h3>
            <p>Explore o catálogo e clique em ♡ para salvar seus filmes preferidos.</p>
            <Link to="/filmes" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
              🎬 Explorar filmes
            </Link>
          </div>
        ) : (
          <div className="cards-grid">
            {filmesFavoritos.map((filme) => (
              <FilmeCard
                key={filme.id}
                filme={filme}
                onFavoritar={toggle}
                isFavorito={favoritosIds.includes(filme.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
