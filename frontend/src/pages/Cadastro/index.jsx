import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function CadastroPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [nome,  setNome]  = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [erro,   setErro]   = useState("");
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  if (isAuthenticated) {
    navigate("/", { replace: true });
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nome || !email || !senha) { setErro("Preencha todos os campos."); return; }
    if (senha.length < 6) { setErro("A senha deve ter pelo menos 6 caracteres."); return; }
    if (senha !== confirmSenha) { setErro("As senhas não coincidem."); return; }
    setErro("");
    setLoading(true);
    try {
      await register(nome, email, senha);
      navigate("/", { replace: true });
    } catch (err) {
      setErro(err.message ?? "Erro ao criar conta.");
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
          width: "100%", maxWidth: "440px",
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
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>Crie sua conta</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Grátis, rápido e sem anúncios</p>
        </div>

        {erro && <div className="error-banner" style={{ marginBottom: "1.25rem" }}>{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="nome">Nome completo</label>
            <input
              id="nome"
              type="text"
              className="input"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

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
                placeholder="Mínimo 6 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="new-password"
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

          <div className="form-group">
            <label className="form-label" htmlFor="confirm-senha">Confirmar senha</label>
            <input
              id="confirm-senha"
              type={showSenha ? "text" : "password"}
              className="input"
              placeholder="Repita a senha"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem", padding: "0.75rem" }}
          >
            {loading ? "Criando conta…" : "✨ Criar conta grátis"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Já tem uma conta?{" "}
            <Link to="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
