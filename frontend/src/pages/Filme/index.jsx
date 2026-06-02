import { useParams, Link, useNavigate } from "react-router-dom";
import { useFilme, useFilmes } from "../../hooks/useFilmes.js";
import { useFavoritos } from "../../hooks/useFavoritos.js";
import { useAuth } from "../../context/AuthContext.jsx";
import FilmeCard from "../../components/ui/FilmeCard.jsx";
import { imgFallback, classificacaoLabel, classificacaoBadgeClass } from "../../utils/helpers.js";

export default function FilmePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { filme, loading, error } = useFilme(id);
  const { filmes } = useFilmes();
  const { isAuthenticated } = useAuth();
  const { isFavorito, toggle, favoritos } = useFavoritos(isAuthenticated);
  const favoritosIds = favoritos.map((f) => f.filme_id ?? f.id);

  const relacionados = filmes
    .filter((f) => f.id !== Number(id) && f.genero && filme?.genero &&
      f.genero.split(/[,/]/)[0]?.trim() === filme.genero.split(/[,/]/)[0]?.trim())
    .slice(0, 8);

  if (loading) {
    return (
      <div style={{ padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <div className="skeleton" style={{ width: "280px", height: "420px", borderRadius: "var(--radius-lg)", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: "260px" }}>
              <div className="skeleton" style={{ height: "36px", width: "70%", borderRadius: "6px", marginBottom: "1rem" }} />
              <div className="skeleton" style={{ height: "16px", width: "40%", borderRadius: "4px", marginBottom: "0.75rem" }} />
              <div className="skeleton" style={{ height: "14px", width: "100%", borderRadius: "4px", marginBottom: "0.4rem" }} />
              <div className="skeleton" style={{ height: "14px", width: "90%",  borderRadius: "4px", marginBottom: "0.4rem" }} />
              <div className="skeleton" style={{ height: "14px", width: "80%",  borderRadius: "4px" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !filme) {
    return (
      <div style={{ padding: "4rem 0" }}>
        <div className="container">
          <div className="error-banner">
            {error ?? "Filme não encontrado."}
          </div>
          <button className="btn btn-outline" style={{ marginTop: "1rem" }} onClick={() => navigate(-1)}>
            ← Voltar
          </button>
        </div>
      </div>
    );
  }

  const fav = isFavorito(filme.id);

  return (
    <div>
      {/* Backdrop */}
      <div
        style={{
          background: "linear-gradient(180deg, rgba(15,23,42,0.4) 0%, var(--bg) 100%)",
          padding: "2.5rem 0 0",
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span>›</span>
            <Link to="/filmes" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Filmes</Link>
            <span>›</span>
            <span style={{ color: "var(--text)" }}>{filme.titulo}</span>
          </div>

          {/* Hero do filme */}
          <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            {/* Poster */}
            <div style={{ flexShrink: 0 }}>
              <div
                style={{
                  width: "240px", borderRadius: "var(--radius-lg)",
                  overflow: "hidden", boxShadow: "0 24px 48px rgba(0,0,0,0.7)",
                  border: "1px solid var(--border)",
                }}
              >
                <img
                  src={filme.imagem || "/logo/cinelogplay.png"}
                  alt={filme.titulo}
                  onError={imgFallback}
                  style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Detalhes */}
            <div style={{ flex: 1, minWidth: "260px" }}>
              <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem", lineHeight: 1.15 }}>
                {filme.titulo}
              </h1>

              {/* Badges meta */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                {filme.ano && <span className="badge">{filme.ano}</span>}
                {filme.genero && <span className="badge badge-accent">{filme.genero}</span>}
                {filme.classificacao && (
                  <span className={`badge ${classificacaoBadgeClass(filme.classificacao)}`}>
                    {classificacaoLabel(filme.classificacao)}
                  </span>
                )}
                {filme.duracao && <span className="badge">⏱ {filme.duracao}</span>}
              </div>

              {/* Avaliação */}
              {filme.media_avaliacao && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  <span style={{ color: "var(--accent)", fontSize: "1.3rem" }}>★</span>
                  <span style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                    {Number(filme.media_avaliacao).toFixed(1)}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    / 5 · {filme.total_avaliacoes ?? "—"} avaliações
                  </span>
                </div>
              )}

              {/* Descrição curta */}
              {filme.descricao_curta && (
                <p style={{ fontSize: "1rem", color: "var(--text)", fontStyle: "italic", marginBottom: "1rem", opacity: 0.85 }}>
                  "{filme.descricao_curta}"
                </p>
              )}

              {/* Sinopse */}
              <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                Sinopse
              </h3>
              <p style={{ color: "var(--text)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                {filme.sinopse ?? "Sinopse não disponível."}
              </p>

              {/* Ações */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {filme.trailer_youtube && (
                  <a
                    href={filme.trailer_youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                  >
                    ▶ Assistir Trailer
                  </a>
                )}

                {isAuthenticated && (
                  <button
                    onClick={() => toggle(filme.id)}
                    className={`btn btn-lg ${fav ? "btn-primary" : "btn-outline"}`}
                    style={fav ? { background: "rgba(245,158,11,0.2)", color: "var(--accent)", border: "1px solid var(--accent)" } : {}}
                  >
                    {fav ? "♥ Favoritado" : "♡ Favoritar"}
                  </button>
                )}

                <button
                  className="btn btn-outline btn-lg"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: filme.titulo, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copiado!");
                    }
                  }}
                >
                  ↗ Compartilhar
                </button>
              </div>
            </div>
          </div>

          {/* Detalhes técnicos */}
          <div
            style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", padding: "1.5rem",
              display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            {[
              { label: "Ano", valor: filme.ano },
              { label: "Gênero", valor: filme.genero },
              { label: "Duração", valor: filme.duracao },
              { label: "Classificação", valor: classificacaoLabel(filme.classificacao) },
            ].filter((item) => item.valor).map(({ label, valor }) => (
              <div key={label}>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>
                  {label}
                </p>
                <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>{valor}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filmes relacionados */}
      {relacionados.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Filmes Relacionados</h2>
            </div>
            <div className="scroll-strip">
              {relacionados.map((f) => (
                <FilmeCard
                  key={f.id}
                  filme={f}
                  onFavoritar={isAuthenticated ? toggle : null}
                  isFavorito={favoritosIds.includes(f.id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
