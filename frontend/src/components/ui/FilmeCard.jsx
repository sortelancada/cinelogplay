import { Link } from "react-router-dom";
import { imgFallback, classificacaoLabel, classificacaoBadgeClass } from "../../utils/helpers.js";

export default function FilmeCard({ filme, onFavoritar, isFavorito = false, size = "md" }) {
  if (!filme) return null;

  const width  = size === "sm" ? "140px" : size === "lg" ? "220px" : "180px";
  const height = size === "sm" ? "210px" : size === "lg" ? "330px" : "270px";

  return (
    <Link
      to={`/filmes/${filme.id}`}
      style={{ width, flexShrink: 0, display: "block", textDecoration: "none" }}
      title={filme.titulo}
    >
      <div
        style={{
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          background: "var(--bg-card)",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        {/* Poster */}
        <div style={{ position: "relative", height, overflow: "hidden" }}>
          <img
            src={filme.imagem || "/logo/cinelogplay.png"}
            alt={filme.titulo}
            loading="lazy"
            onError={imgFallback}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Overlay com badge de classificação */}
          <div style={{
            position: "absolute", top: "0.5rem", left: "0.5rem",
            display: "flex", gap: "0.3rem", flexWrap: "wrap",
          }}>
            <span className={`badge ${classificacaoBadgeClass(filme.classificacao)}`}>
              {classificacaoLabel(filme.classificacao)}
            </span>
          </div>
          {/* Botão de favorito */}
          {onFavoritar && (
            <button
              onClick={(e) => { e.preventDefault(); onFavoritar(filme.id); }}
              aria-label={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              style={{
                position: "absolute", top: "0.5rem", right: "0.5rem",
                background: isFavorito ? "var(--accent)" : "rgba(0,0,0,0.5)",
                border: "none", borderRadius: "50%",
                width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.2s ease",
                fontSize: "0.9rem",
              }}
            >
              {isFavorito ? "♥" : "♡"}
            </button>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "0.65rem 0.75rem" }}>
          <p style={{
            fontWeight: 600,
            fontSize: "0.85rem",
            color: "var(--text)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "0.2rem",
          }}>
            {filme.titulo}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {filme.genero ?? ""}
            {filme.ano ? ` · ${filme.ano}` : ""}
          </p>
          {filme.media_avaliacao && (
            <p style={{ fontSize: "0.75rem", color: "var(--accent)", marginTop: "0.2rem" }}>
              ★ {Number(filme.media_avaliacao).toFixed(1)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
