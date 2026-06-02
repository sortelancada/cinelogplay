import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? "/";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !senha) { setErro("Preencha email e senha."); return; }
    setErro("");
    setLoading(true);
    try {
      await login(email, senha);
      navigate(from, { replace: true });
    } catch (err) {
      setErro(err.message ?? "Credenciais inválidas.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--nav-height))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 70%)",
      }}
    >
      <div
        style={{
          width: "100%", maxWidth: "420px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "2.5rem",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
        className="animate-fade-up"
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <img src="/logo/cinelogplay.png" alt="CinelogPlay" style={{ height: "44px", margin: "0 auto 1rem" }} />
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>Bem-vindo de volta</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Entre na sua conta CinelogPlay</p>
        </div>

        {erro && <div className="error-banner" style={{ marginBottom: "1.25rem" }}>{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="senha">Senha</label>
            <div style={{ position: "relative" }}>
              <input
                id="senha"
                type={showSenha ? "text" : "password"}
                className="input"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="current-password"
                required
                style={{ paddingRight: "3rem" }}
              />
              <button
                type="button"
                onClick={() => setShowSenha((p) => !p)}
                style={{
                  position: "absolute", right: "0.75rem", top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text-muted)", fontSize: "1rem",
                }}
                aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {showSenha ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem", padding: "0.75rem" }}
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Não tem conta?{" "}
            <Link to="/cadastro" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Criar conta grátis
            </Link>
          </p>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", marginTop: "1.5rem", paddingTop: "1.25rem", textAlign: "center" }}>
          <Link
            to="/"
            style={{ color: "var(--text-muted)", fontSize: "0.85rem", textDecoration: "none" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--text)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
          >
            ← Continuar sem conta
          </Link>
        </div>
      </div>
    </div>
  );
}
