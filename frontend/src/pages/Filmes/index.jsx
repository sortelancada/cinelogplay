import { useState, useMemo } from "react";
import { useFilmes } from "../../hooks/useFilmes.js";
import { useFavoritos } from "../../hooks/useFavoritos.js";
import { useAuth } from "../../context/AuthContext.jsx";
import FilmeCard from "../../components/ui/FilmeCard.jsx";
import SkeletonCard from "../../components/ui/SkeletonCard.jsx";
import { genresFrom } from "../../utils/helpers.js";

export default function FilmesPage() {
  const { filmes, loading, error } = useFilmes();
  const { isAuthenticated } = useAuth();
  const { isFavorito, toggle, favoritos } = useFavoritos(isAuthenticated);
  const favoritosIds = favoritos.map((f) => f.filme_id ?? f.id);

  const [busca, setBusca] = useState("");
  const [generoFiltro, setGeneroFiltro] = useState("");
  const [ordenacao, setOrdenacao] = useState("relevancia");

  const generos = useMemo(() => genresFrom(filmes), [filmes]);

  const resultado = useMemo(() => {
    let lista = [...filmes];

    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(
        (f) =>
          (f.titulo ?? "").toLowerCase().includes(q) ||
          (f.genero ?? "").toLowerCase().includes(q) ||
          (f.sinopse ?? "").toLowerCase().includes(q)
      );
    }

    if (generoFiltro) {
      lista = lista.filter((f) =>
        (f.genero ?? "").toLowerCase().includes(generoFiltro.toLowerCase())
      );
    }

    if (ordenacao === "ano-desc")  lista.sort((a, b) => (b.ano ?? 0) - (a.ano ?? 0));
    if (ordenacao === "ano-asc")   lista.sort((a, b) => (a.ano ?? 0) - (b.ano ?? 0));
    if (ordenacao === "az")        lista.sort((a, b) => (a.titulo ?? "").localeCompare(b.titulo ?? ""));
    if (ordenacao === "avaliacao") lista.sort((a, b) => (Number(b.media_avaliacao) || 0) - (Number(a.media_avaliacao) || 0));

    return lista;
  }, [filmes, busca, generoFiltro, ordenacao]);

  return (
    <div style={{ padding: "2.5rem 0 4rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            Catálogo de Filmes
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            {loading ? "Carregando…" : `${resultado.length} filmes encontrados`}
          </p>
        </div>

        {/* Filtros */}
        <div
          style={{
            display: "flex", gap: "0.75rem", flexWrap: "wrap",
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)", padding: "1rem",
            marginBottom: "2rem",
          }}
        >
          <input
            className="input"
            style={{ flex: "1 1 220px", minWidth: "180px" }}
            placeholder="Buscar por título, gênero…"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <select
            className="input"
            style={{ flex: "0 1 180px" }}
            value={generoFiltro}
            onChange={(e) => setGeneroFiltro(e.target.value)}
          >
            <option value="">Todos os gêneros</option>
            {generos.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>

          <select
            className="input"
            style={{ flex: "0 1 180px" }}
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
          >
            <option value="relevancia">Relevância</option>
            <option value="ano-desc">Mais recentes</option>
            <option value="ano-asc">Mais antigos</option>
            <option value="az">A → Z</option>
            <option value="avaliacao">Melhor avaliação</option>
          </select>

          {(busca || generoFiltro) && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => { setBusca(""); setGeneroFiltro(""); }}
            >
              ✕ Limpar
            </button>
          )}
        </div>

        {/* Erro */}
        {error && <div className="error-banner">{error}</div>}

        {/* Grid */}
        {loading ? (
          <div className="cards-grid">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i}>
                <div className="skeleton" style={{ height: "270px", borderRadius: "var(--radius-md)", marginBottom: "0.6rem" }} />
                <div className="skeleton" style={{ height: "14px", width: "80%", marginBottom: "0.4rem", borderRadius: "4px" }} />
                <div className="skeleton" style={{ height: "12px", width: "50%", borderRadius: "4px" }} />
              </div>
            ))}
          </div>
        ) : resultado.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎬</div>
            <h3>Nenhum filme encontrado</h3>
            <p>Tente outros termos de busca ou remova os filtros.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {resultado.map((filme) => (
              <FilmeCard
                key={filme.id}
                filme={filme}
                onFavoritar={isAuthenticated ? toggle : null}
                isFavorito={favoritosIds.includes(filme.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
