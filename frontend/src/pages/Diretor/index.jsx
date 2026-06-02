import { useParams, Link, useNavigate } from "react-router-dom";
import { useDiretor } from "../../hooks/useDiretores.js";
import { useFilmes } from "../../hooks/useFilmes.js";
import { useFavoritos } from "../../hooks/useFavoritos.js";
import { useAuth } from "../../context/AuthContext.jsx";
import FilmeCard from "../../components/ui/FilmeCard.jsx";
import { imgFallback } from "../../utils/helpers.js";

export default function DiretorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { diretor, loading, error } = useDiretor(id);
  const { filmes } = useFilmes();
  const { isAuthenticated } = useAuth();
  const { isFavorito, toggle, favoritos } = useFavoritos(isAuthenticated);
  const favoritosIds = favoritos.map((f) => f.filme_id ?? f.id);

  const filmografia = filmes.filter(
    (f) => f.diretor_id === Number(id) || f.diretor_nome === diretor?.nome
  );

  if (loading) {
    return (
      <div style={{ padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <div className="skeleton" style={{ width: "200px", height: "260px", borderRadius: "var(--radius-lg)", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton" style={{ height: "32px", width: "50%", borderRadius: "6px", marginBottom: "1rem" }} />
              <div className="skeleton" style={{ height: "14px", width: "30%", borderRadius: "4px", marginBottom: "0.75rem" }} />
              <div className="skeleton" style={{ height: "14px", width: "100%", borderRadius: "4px", marginBottom: "0.4rem" }} />
              <div className="skeleton" style={{ height: "14px", width: "90%",  borderRadius: "4px" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !diretor) {
    return (
      <div style={{ padding: "4rem 0" }}>
        <div className="container">
          <div className="error-banner">{error ?? "Diretor não encontrado."}</div>
          <button className="btn btn-outline" style={{ marginTop: "1rem" }} onClick={() => navigate(-1)}>
            ← Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2.5rem 0 4rem" }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link to="/diretores" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Diretores</Link>
          <span>›</span>
          <span style={{ color: "var(--text)" }}>{diretor.nome}</span>
        </div>

        {/* Perfil */}
        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {/* Foto */}
          <div
            style={{
              width: "200px", flexShrink: 0,
              borderRadius: "var(--radius-lg)", overflow: "hidden",
              boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
              border: "1px solid var(--border)",
            }}
          >
            <img
              src={diretor.foto || "/logo/cinelogplay.png"}
              alt={diretor.nome}
              onError={imgFallback}
              style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center top" }}
            />
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: "240px" }}>
            <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
              {diretor.nome}
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
              {diretor.nacionalidade && (
                <span className="badge badge-accent">🌍 {diretor.nacionalidade}</span>
              )}
              {filmografia.length > 0 && (
                <span className="badge">🎬 {filmografia.length} filme{filmografia.length > 1 ? "s" : ""}</span>
              )}
            </div>

            {/* Principais obras */}
            {diretor.principais_obras && (
              <>
                <h3 style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
                  Principais Obras
                </h3>
                <p style={{ color: "var(--text)", marginBottom: "1.25rem", lineHeight: 1.7 }}>
                  {diretor.principais_obras}
                </p>
              </>
            )}

            {/* Biografia */}
            {diretor.biografia && (
              <>
                <h3 style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
                  Biografia
                </h3>
                <p style={{ color: "var(--text)", lineHeight: 1.8 }}>
                  {diretor.biografia}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Filmografia */}
        {filmografia.length > 0 && (
          <section>
            <div className="section-header">
              <h2 className="section-title">Filmografia</h2>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                {filmografia.length} filme{filmografia.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="scroll-strip">
              {filmografia.map((f) => (
                <FilmeCard
                  key={f.id}
                  filme={f}
                  onFavoritar={isAuthenticated ? toggle : null}
                  isFavorito={favoritosIds.includes(f.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
