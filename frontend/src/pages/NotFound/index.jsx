import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--nav-height))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "480px" }} className="animate-fade-up">
        <p style={{ fontSize: "6rem", lineHeight: 1, marginBottom: "1rem" }}>🎬</p>
        <h1
          style={{
            fontSize: "5rem", fontWeight: 900, color: "var(--accent)",
            lineHeight: 1, marginBottom: "0.5rem",
          }}
        >
          404
        </h1>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Página não encontrada
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", lineHeight: 1.7 }}>
          O filme que você procura não está em cartaz aqui.<br />
          Mas temos muitos outros esperando por você!
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="btn btn-primary btn-lg">
            🏠 Ir para a Home
          </Link>
          <Link to="/filmes" className="btn btn-outline btn-lg">
            🎥 Ver Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
