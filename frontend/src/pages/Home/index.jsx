import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFilmes } from "../../hooks/useFilmes.js";
import { useDiretores } from "../../hooks/useDiretores.js";
import { useFavoritos } from "../../hooks/useFavoritos.js";
import { useAuth } from "../../context/AuthContext.jsx";
import FilmeSection from "../../components/features/FilmeSection.jsx";
import FilmeCard from "../../components/ui/FilmeCard.jsx";
import DiretorCard from "../../components/ui/DiretorCard.jsx";
import SkeletonCard from "../../components/ui/SkeletonCard.jsx";
import { genresFrom } from "../../utils/helpers.js";

const HERO_FILMES = [
  {
    bg: "linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%)",
    titulo: "Descubra o Melhor do Cinema",
    sub: "Catálogo completo com filmes, diretores e avaliações",
  },
];

export default function HomePage() {
  const { filmes, loading: loadingFilmes } = useFilmes();
  const { diretores, loading: loadingDiretores } = useDiretores();
  const { isAuthenticated } = useAuth();
  const { isFavorito, toggle, favoritos } = useFavoritos(isAuthenticated);
  const favoritosIds = favoritos.map((f) => f.filme_id ?? f.id);
  const navigate = useNavigate();

  const [searchQ, setSearchQ] = useState("");
  const [generoAtivo, setGeneroAtivo] = useState(null);

  const generos = useMemo(() => genresFrom(filmes), [filmes]);

  const filmesDestaque  = useMemo(() => filmes.slice(0, 10),  [filmes]);
  const filmesRecentes  = useMemo(() =>
    [...filmes].sort((a, b) => (b.ano ?? 0) - (a.ano ?? 0)).slice(0, 10),
    [filmes]
  );
  const filmesClassicos = useMemo(() =>
    filmes.filter((f) => f.tipo === "classico").slice(0, 10),
    [filmes]
  );
  const filmesLancamentos = useMemo(() =>
    filmes.filter((f) => f.tipo === "lancamento").slice(0, 10),
    [filmes]
  );
  const filmesPorGenero = useMemo(() => {
    if (!generoAtivo) return [];
    return filmes.filter((f) =>
      (f.genero ?? "").toLowerCase().includes(generoAtivo.toLowerCase())
    ).slice(0, 10);
  }, [filmes, generoAtivo]);

  function handleSearch(e) {
    e.preventDefault();
    const q = searchQ.trim();
    if (!q) return;
    navigate(`/busca?q=${encodeURIComponent(q)}`);
  }

  return (
    <div>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #050D1A 0%, #0A1628 40%, #101D30 100%)",
          overflow: "hidden",
        }}
      >
        {/* Bokeh decorativo */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 60% 50% at 70% 40%, rgba(245,158,11,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 60%, rgba(59,130,246,0.06) 0%, transparent 70%)
          `,
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "680px" }}>
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: "20px", padding: "0.3rem 0.9rem",
                color: "var(--accent)", fontSize: "0.8rem", fontWeight: 600,
                marginBottom: "1.25rem",
              }}
            >
              🎬 Catálogo Informativo de Cinema
            </span>
            <h1
              style={{
                fontSize: "clamp(2.4rem, 6vw, 4rem)",
                fontWeight: 800,
                color: "var(--text)",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              O melhor do cinema<br />
              <span style={{ color: "var(--accent)" }}>você encontra aqui</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "2rem", lineHeight: 1.7 }}>
              Explore filmes, conheça diretores, leia sinopses e avalie as produções
              que marcaram a história do cinema.
            </p>

            {/* Busca hero */}
            <form
              onSubmit={handleSearch}
              style={{
                display: "flex", gap: "0.5rem", maxWidth: "520px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "0.4rem",
              }}
            >
              <input
                className="input"
                style={{ flex: 1, background: "transparent", border: "none", padding: "0.5rem 0.75rem" }}
                placeholder="Buscar filmes, gêneros, diretores…"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">🔍 Buscar</button>
            </form>

            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <Link to="/filmes" className="btn btn-outline btn-lg">
                🎥 Ver Catálogo
              </Link>
              {!isAuthenticated && (
                <Link to="/cadastro" className="btn btn-primary btn-lg">
                  ✨ Criar conta grátis
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Gradiente de transição para baixo */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
          background: "linear-gradient(to bottom, transparent, var(--bg))",
          pointerEvents: "none",
        }} />
      </section>

      {/* ═══════════════════════ STATS ═══════════════════════ */}
      {filmes.length > 0 && (
        <section style={{ padding: "2rem 0", background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" }}>
              {[
                { num: filmes.length,     label: "Filmes"    },
                { num: diretores.length,  label: "Diretores" },
                { num: generos.length,    label: "Gêneros"   },
              ].map(({ num, label }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>
                    {num}+
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════ FILMES EM DESTAQUE ═══════════════════════ */}
      <FilmeSection
        titulo="Filmes em Destaque"
        filmes={filmesDestaque}
        loading={loadingFilmes}
        verTodosLink="/filmes"
        onFavoritar={isAuthenticated ? toggle : null}
        favoritosIds={favoritosIds}
      />

      {/* ═══════════════════════ LANÇAMENTOS ═══════════════════════ */}
      {(loadingFilmes || filmesLancamentos.length > 0) && (
        <FilmeSection
          titulo="Lançamentos"
          filmes={filmesLancamentos}
          loading={loadingFilmes}
          verTodosLink="/filmes"
          onFavoritar={isAuthenticated ? toggle : null}
          favoritosIds={favoritosIds}
        />
      )}

      {/* ═══════════════════════ ÚLTIMAS ADIÇÕES ═══════════════════════ */}
      <FilmeSection
        titulo="Últimas Adições"
        filmes={filmesRecentes}
        loading={loadingFilmes}
        verTodosLink="/filmes"
        onFavoritar={isAuthenticated ? toggle : null}
        favoritosIds={favoritosIds}
      />

      {/* ═══════════════════════ CLÁSSICOS ═══════════════════════ */}
      {(loadingFilmes || filmesClassicos.length > 0) && (
        <FilmeSection
          titulo="Clássicos Imortais"
          filmes={filmesClassicos}
          loading={loadingFilmes}
          verTodosLink="/filmes"
          onFavoritar={isAuthenticated ? toggle : null}
          favoritosIds={favoritosIds}
        />
      )}

      {/* ═══════════════════════ CATEGORIAS ═══════════════════════ */}
      {generos.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Explorar por Categoria</h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <button
                onClick={() => setGeneroAtivo(null)}
                className={`badge ${!generoAtivo ? "badge-accent" : ""}`}
                style={{ cursor: "pointer", background: "none", border: "1px solid var(--border)", fontSize: "0.82rem", padding: "0.35rem 0.85rem" }}
              >
                Todos
              </button>
              {generos.map((g) => (
                <button
                  key={g}
                  onClick={() => setGeneroAtivo(generoAtivo === g ? null : g)}
                  className={`badge ${generoAtivo === g ? "badge-accent" : ""}`}
                  style={{ cursor: "pointer", background: "none", border: "1px solid var(--border)", fontSize: "0.82rem", padding: "0.35rem 0.85rem" }}
                >
                  {g}
                </button>
              ))}
            </div>
            {generoAtivo && filmesPorGenero.length > 0 && (
              <div className="scroll-strip">
                {filmesPorGenero.map((filme) => (
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
        </section>
      )}

      {/* ═══════════════════════ DIRETORES EM DESTAQUE ═══════════════════════ */}
      <section className="section" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Diretores em Destaque</h2>
            <Link to="/diretores" style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 500 }}>
              Ver todos →
            </Link>
          </div>
          <div className="scroll-strip">
            {loadingDiretores ? (
              <SkeletonCard count={5} variant="diretor" />
            ) : (
              diretores.slice(0, 8).map((d) => <DiretorCard key={d.id} diretor={d} />)
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PESQUISA RÁPIDA ═══════════════════════ */}
      <section
        className="section"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #0F172A 100%)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Encontre seu próximo favorito
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Busque por título, gênero ou diretor
          </p>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem" }}>
            <input
              className="input"
              placeholder="Ex: Interestelar, Drama, Nolan…"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </section>

      {/* ═══════════════════════ CTA CADASTRO ═══════════════════════ */}
      {!isAuthenticated && (
        <section
          style={{
            padding: "4rem 0",
            background: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.04) 100%)",
            borderTop: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          <div className="container" style={{ textAlign: "center" }}>
            <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>🎬</span>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              Junte-se à comunidade CinelogPlay
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem", maxWidth: "480px", margin: "0 auto 2rem" }}>
              Crie sua conta gratuitamente, salve favoritos e acompanhe seus filmes preferidos.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/cadastro" className="btn btn-primary btn-lg">
                ✨ Criar conta grátis
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Já tenho conta
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
