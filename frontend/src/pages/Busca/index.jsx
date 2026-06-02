import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFilmes } from "../../hooks/useFilmes.js";
import { useDiretores } from "../../hooks/useDiretores.js";
import { useFavoritos } from "../../hooks/useFavoritos.js";
import { useAuth } from "../../context/AuthContext.jsx";
import FilmeCard from "../../components/ui/FilmeCard.jsx";
import DiretorCard from "../../components/ui/DiretorCard.jsx";
import { genresFrom } from "../../utils/helpers.js";

export default function BuscaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const qParam      = searchParams.get("q") ?? "";
  const generoParam = searchParams.get("genero") ?? "";

  const [query,  setQuery]  = useState(qParam);
  const [genero, setGenero] = useState(generoParam);
  const [aba,    setAba]    = useState("filmes");

  const { filmes, loading: loadFilmes } = useFilmes();
  const { diretores, loading: loadDir } = useDiretores();
  const { isAuthenticated } = useAuth();
  const { isFavorito, toggle, favoritos } = useFavoritos(isAuthenticated);
  const favoritosIds = favoritos.map((f) => f.filme_id ?? f.id);

  const generos = useMemo(() => genresFrom(filmes), [filmes]);

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const g = searchParams.get("genero") ?? "";
    setQuery(q);
    setGenero(g);
  }, [searchParams]);

  const filmesResultado = useMemo(() => {
    let lista = [...filmes];
    if (query) {
      const q = query.toLowerCase();
      lista = lista.filter(
        (f) =>
          (f.titulo ?? "").toLowerCase().includes(q) ||
          (f.genero ?? "").toLowerCase().includes(q) ||
          (f.sinopse ?? "").toLowerCase().includes(q)
      );
    }
    if (genero) {
      lista = lista.filter((f) =>
        (f.genero ?? "").toLowerCase().includes(genero.toLowerCase())
      );
    }
    return lista;
  }, [filmes, query, genero]);

  const diretoresResultado = useMemo(() => {
    if (!query) return diretores;
    const q = query.toLowerCase();
    return diretores.filter(
      (d) =>
        (d.nome ?? "").toLowerCase().includes(q) ||
        (d.nacionalidade ?? "").toLowerCase().includes(q)
    );
  }, [diretores, query]);

  function handleSubmit(e) {
    e.preventDefault();
    const params = {};
    if (query.trim())  params.q = query.trim();
    if (genero)        params.genero = genero;
    setSearchParams(params);
  }

  const termoBusca = query || genero;
  const semResultado = filmesResultado.length === 0 && diretoresResultado.length === 0;

  return (
    <div style={{ padding: "2.5rem 0 4rem" }}>
      <div className="container">
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Busca</h1>
        {termoBusca && (
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            {filmesResultado.length + diretoresResultado.length} resultado{(filmesResultado.length + diretoresResultado.length) !== 1 ? "s" : ""} para{" "}
            <strong style={{ color: "var(--text)" }}>"{termoBusca}"</strong>
          </p>
        )}

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex", gap: "0.75rem", flexWrap: "wrap",
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)", padding: "1rem",
            marginBottom: "2rem",
          }}
        >
          <input
            className="input"
            style={{ flex: "1 1 240px" }}
            placeholder="Título, sinopse, nome do diretor…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            className="input"
            style={{ flex: "0 1 200px" }}
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="">Todos os gêneros</option>
            {generos.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>

          <button type="submit" className="btn btn-primary">
            🔍 Buscar
          </button>

          {(query || genero) && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => { setQuery(""); setGenero(""); setSearchParams({}); }}
            >
              ✕ Limpar
            </button>
          )}
        </form>

        {/* Abas */}
        {termoBusca && (
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "0" }}>
            {[
              { key: "filmes",    label: `Filmes (${filmesResultado.length})` },
              { key: "diretores", label: `Diretores (${diretoresResultado.length})` },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setAba(key)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: 600,
                  color: aba === key ? "var(--accent)" : "var(--text-muted)",
                  borderBottom: aba === key ? "2px solid var(--accent)" : "2px solid transparent",
                  transition: "all 0.2s ease",
                  marginBottom: "-1px",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Estado vazio inicial */}
        {!termoBusca && !loadFilmes && (
          <div className="empty-state">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <h3>O que você quer encontrar?</h3>
            <p>Digite um título, gênero ou nome de diretor para começar.</p>
          </div>
        )}

        {/* Sem resultados */}
        {termoBusca && !loadFilmes && !loadDir && semResultado && (
          <div className="empty-state">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>😕</div>
            <h3>Nenhum resultado encontrado</h3>
            <p>Tente outros termos ou remova os filtros.</p>
          </div>
        )}

        {/* Resultados — Filmes */}
        {(aba === "filmes" || !termoBusca) && filmesResultado.length > 0 && (
          <>
            {!termoBusca && (
              <h2 className="section-title" style={{ marginBottom: "1rem" }}>Filmes em destaque</h2>
            )}
            <div className="cards-grid">
              {filmesResultado.map((filme) => (
                <FilmeCard
                  key={filme.id}
                  filme={filme}
                  onFavoritar={isAuthenticated ? toggle : null}
                  isFavorito={favoritosIds.includes(filme.id)}
                />
              ))}
            </div>
          </>
        )}

        {/* Resultados — Diretores */}
        {aba === "diretores" && diretoresResultado.length > 0 && (
          <div className="cards-grid">
            {diretoresResultado.map((d) => <DiretorCard key={d.id} diretor={d} />)}
          </div>
        )}
      </div>
    </div>
  );
}
