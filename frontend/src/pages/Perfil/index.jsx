import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useFavoritos } from "../../hooks/useFavoritos.js";
import { avatarInitials } from "../../utils/helpers.js";
import { contatoService } from "../../services/contato.js";

export default function PerfilPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const { favoritos } = useFavoritos(isAuthenticated);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [contatoStatus, setContatoStatus] = useState("");
  const [contatoLoading, setContatoLoading] = useState(false);

  function handleLogout() {
    logout();
    navigate("/");
  }

  async function handleContato(e) {
    e.preventDefault();
    if (!nome.trim() || !email.trim() || !mensagem.trim()) return;
    setContatoLoading(true);
    try {
      await contatoService.enviar(nome, email, mensagem);
      setContatoStatus("Mensagem enviada com sucesso!");
      setNome(""); setEmail(""); setMensagem("");
    } catch (err) {
      setContatoStatus(err.message ?? "Erro ao enviar mensagem.");
    } finally {
      setContatoLoading(false);
    }
  }

  return (
    <div style={{ padding: "2.5rem 0 4rem" }}>
      <div className="container" style={{ maxWidth: "760px" }}>

        {/* Card do perfil */}
        <div
          style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", padding: "2rem",
            marginBottom: "2rem", display: "flex", gap: "1.5rem",
            flexWrap: "wrap", alignItems: "center",
          }}
        >
          <div
            style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: "var(--accent)", color: "#0F172A",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.5rem", fontWeight: 800, flexShrink: 0,
            }}
          >
            {avatarInitials(user?.nome)}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.2rem" }}>{user?.nome}</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{user?.email}</p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem" }}>
              <span className="badge">
                ♥ {favoritos.length} favorito{favoritos.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-outline"
            style={{ color: "#EF4444", borderColor: "rgba(239,68,68,0.3)" }}
          >
            🚪 Sair
          </button>
        </div>

        {/* Links rápidos */}
        <div
          style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "0.75rem", marginBottom: "2rem",
          }}
        >
          {[
            { to: "/favoritos", icon: "♥", label: "Meus Favoritos", sub: `${favoritos.length} filmes` },
            { to: "/filmes",    icon: "🎬", label: "Catálogo",       sub: "Explorar filmes" },
            { to: "/busca",     icon: "🔍", label: "Buscar",         sub: "Pesquisar" },
          ].map(({ to, icon, label, sub }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)", padding: "1rem",
                textDecoration: "none", transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.background = "var(--bg-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--bg-card)";
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>{icon}</span>
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)" }}>{label}</p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Formulário de contato */}
        <div
          style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)", padding: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>
            📧 Entre em Contato
          </h2>

          {contatoStatus && (
            <div
              className={contatoStatus.includes("sucesso") ? "" : "error-banner"}
              style={contatoStatus.includes("sucesso") ? {
                background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: "var(--radius-sm)", padding: "0.75rem 1rem",
                color: "#86EFAC", marginBottom: "1.25rem",
              } : { marginBottom: "1.25rem" }}
            >
              {contatoStatus}
            </div>
          )}

          <form onSubmit={handleContato}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div className="form-group">
                <label className="form-label">Nome</label>
                <input className="input" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Mensagem</label>
              <textarea
                className="input"
                rows={4}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Sua mensagem (mínimo 10 caracteres)"
                style={{ resize: "vertical" }}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={contatoLoading || mensagem.length < 10}
              style={{ padding: "0.7rem 1.5rem" }}
            >
              {contatoLoading ? "Enviando…" : "Enviar Mensagem"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
