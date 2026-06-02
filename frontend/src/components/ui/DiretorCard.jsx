import { Link } from "react-router-dom";
import { imgFallback } from "../../utils/helpers.js";

export default function DiretorCard({ diretor }) {
  if (!diretor) return null;

  return (
    <Link
      to={`/diretores/${diretor.id}`}
      style={{ width: "160px", flexShrink: 0, display: "block", textDecoration: "none" }}
      title={diretor.nome}
    >
      <div
        style={{
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          background: "var(--bg-card)",
          textAlign: "center",
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
        <div style={{ height: "190px", overflow: "hidden" }}>
          <img
            src={diretor.foto || "/logo/cinelogplay.png"}
            alt={diretor.nome}
            loading="lazy"
            onError={imgFallback}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        <div style={{ padding: "0.65rem 0.75rem" }}>
          <p style={{
            fontWeight: 600,
            fontSize: "0.82rem",
            color: "var(--text)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "0.15rem",
          }}>
            {diretor.nome}
          </p>
          {diretor.nacionalidade && (
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              {diretor.nacionalidade}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
