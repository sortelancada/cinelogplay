import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { adminService } from "../../services/admin.service.js";

const SIDEBAR_W = 250;

const linkStyle = ({ isActive }) => ({
  color: isActive ? "#fff" : "#888",
  padding: "11px 20px",
  display: "flex",
  alignItems: "center",
  gap: 10,
  cursor: "pointer",
  borderLeft: isActive ? "3px solid #e50914" : "3px solid transparent",
  background: isActive ? "rgba(229,9,20,0.08)" : "transparent",
  fontSize: "0.875rem",
  transition: "all 0.18s",
  textDecoration: "none",
});

const actionLinkStyle = {
  color: "#888",
  padding: "11px 20px",
  display: "flex",
  alignItems: "center",
  gap: 10,
  cursor: "pointer",
  borderLeft: "3px solid transparent",
  background: "transparent",
  fontSize: "0.875rem",
  transition: "all 0.18s",
  border: "none",
  width: "100%",
  textAlign: "left",
  fontFamily: "inherit",
};

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: "⚡", end: true },
  { to: "/admin/filmes", label: "Filmes", icon: "🎬" },
  { to: "/admin/atores", label: "Atores", icon: "🎭" },
  { to: "/admin/diretores", label: "Diretores", icon: "🎥" },
  { to: "/admin/usuarios", label: "Usuários", icon: "👥" },
];

const EMPTY_SENHA = { atual: "", nova: "", confirmar: "" };

export default function Sidebar({ isMobile, isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [senhaModal, setSenhaModal] = useState(false);
  const [senhaForm, setSenhaForm] = useState(EMPTY_SENHA);
  const [senhaError, setSenhaError] = useState("");
  const [senhaSaving, setSenhaSaving] = useState(false);
  const [senhaToast, setSenhaToast] = useState(null);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function openSenhaModal() {
    setSenhaForm(EMPTY_SENHA);
    setSenhaError("");
    setSenhaModal(true);
  }

  function closeSenhaModal() {
    setSenhaModal(false);
    setSenhaError("");
  }

  function showSenhaToast(msg, type = "success") {
    setSenhaToast({ msg, type });
    setTimeout(() => setSenhaToast(null), 3000);
  }

  async function handleAlterarSenha() {
    const { atual, nova, confirmar } = senhaForm;

    if (!atual || !nova || !confirmar) {
      return setSenhaError("Preencha todos os campos.");
    }
    if (nova.length < 6) {
      return setSenhaError("A nova senha deve ter ao menos 6 caracteres.");
    }
    if (nova !== confirmar) {
      return setSenhaError("As novas senhas não coincidem.");
    }

    setSenhaError("");
    setSenhaSaving(true);
    try {
      await adminService.changePassword(atual, nova);
      showSenhaToast("Senha alterada com sucesso!");
      closeSenhaModal();
    } catch (e) {
      setSenhaError(e.message || "Erro ao alterar senha.");
    } finally {
      setSenhaSaving(false);
    }
  }

  function sfld(key, id) {
    return {
      id,
      value: senhaForm[key],
      onChange: (e) => setSenhaForm((f) => ({ ...f, [key]: e.target.value })),
      style: inputStyle,
      type: "password",
      placeholder: "••••••••",
    };
  }

  let sidebarLeft = 0;
  if (isMobile) {
    sidebarLeft = isOpen ? 0 : -SIDEBAR_W;
  }

  const sidebarStyle = {
    width: SIDEBAR_W,
    minHeight: "100vh",
    background: "#0a0a0a",
    borderRight: "1px solid #2a2a2a",
    position: "fixed",
    top: 0,
    left: sidebarLeft,
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    transition: "left 0.22s ease",
  };

  return (
    <>
      <aside style={sidebarStyle}>
        {/* Brand */}
        <div style={brandStyle}>
          <img
            src="/logo/cinelogplay.png"
            alt="CinelogPlay"
            style={{ maxHeight: 42, margin: "0 auto" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <p style={brandSub}>ADMIN</p>
        </div>

        {/* Nav */}
        <nav style={{ padding: "12px 0", flex: 1, overflowY: "auto" }}>
          {NAV_ITEMS.map(({ to, label, icon, end }) => {
            const handleNavClick = isMobile ? onClose : undefined;
            return (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={linkStyle}
              onClick={handleNavClick}
            >
              <span>{icon}</span> {label}
            </NavLink>
            );
          })}
          <hr style={divider} />
          <button style={actionLinkStyle} onClick={openSenhaModal}>
            <span>🔑</span> Alterar Senha
          </button>
        </nav>

        {/* Footer */}
        <div style={footer}>
          {user && (
            <div style={userInfo}>{user.nome || user.email}</div>
          )}
          <button style={logoutBtn} onClick={handleLogout}>
            ↩ Sair
          </button>
        </div>
      </aside>

      {/* ── Modal Alterar Senha ────────────────────────────────────── */}
      {senhaModal && (
        <div style={modalOverlay}>
          <dialog open aria-labelledby="modal-senha-title" style={modalDialog}>
            <div style={modalHeader}>
              <span id="modal-senha-title">🔑 Alterar Senha</span>
              <button style={closeBtn} onClick={closeSenhaModal} aria-label="Fechar">✕</button>
            </div>

            <div style={{ padding: "20px 24px" }}>
              {senhaError && (
                <div role="alert" style={errorBox}>{senhaError}</div>
              )}
              <div style={{ marginBottom: 14 }}>
                <label htmlFor="senha-atual" style={labelStyle}>SENHA ATUAL</label>
                <input {...sfld("atual", "senha-atual")} autoComplete="current-password" />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label htmlFor="senha-nova" style={labelStyle}>NOVA SENHA</label>
                <input {...sfld("nova", "senha-nova")} placeholder="mín. 6 caracteres" autoComplete="new-password" />
              </div>
              <div>
                <label htmlFor="senha-confirmar" style={labelStyle}>CONFIRMAR NOVA SENHA</label>
                <input {...sfld("confirmar", "senha-confirmar")} autoComplete="new-password" />
              </div>
            </div>

            <div style={modalFooter}>
              <button style={btnSecondary} onClick={closeSenhaModal}>
                Cancelar
              </button>
              <button style={btnDanger} onClick={handleAlterarSenha} disabled={senhaSaving}>
                {senhaSaving ? "Alterando..." : "Alterar Senha"}
              </button>
            </div>
          </dialog>
        </div>
      )}

      {/* Toast da senha */}
      {senhaToast && (
        <output
          style={{
            ...toastStyle,
            background: senhaToast.type === "error" ? "#ef4444" : "#22c55e",
          }}
        >
          {senhaToast.msg}
        </output>
      )}
    </>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const brandStyle = {
  padding: "18px 20px 14px",
  borderBottom: "1px solid #2a2a2a",
  textAlign: "center",
};

const brandSub = {
  color: "#e50914",
  fontWeight: 700,
  margin: "6px 0 0",
  fontSize: "0.8rem",
  letterSpacing: "0.5px",
};

const divider = {
  border: "none",
  borderTop: "1px solid #2a2a2a",
  margin: "6px 16px",
};

const footer = {
  padding: "12px 16px",
  borderTop: "1px solid #2a2a2a",
};

const userInfo = {
  color: "#888",
  fontSize: "0.78rem",
  marginBottom: 8,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const logoutBtn = {
  width: "100%",
  padding: "6px 12px",
  background: "transparent",
  border: "1px solid #e50914",
  borderRadius: 6,
  color: "#e50914",
  fontSize: "0.82rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  fontFamily: "inherit",
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  zIndex: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalDialog = {
  background: "#1e1e1e",
  border: "1px solid #333",
  borderRadius: 10,
  width: "min(380px, 92vw)",
};

const modalHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
  borderBottom: "1px solid #2a2a2a",
  fontWeight: 600,
  color: "#f0f0f0",
  fontSize: "0.95rem",
};

const modalFooter = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  padding: "12px 20px",
  borderTop: "1px solid #2a2a2a",
};

const closeBtn = {
  background: "none",
  border: "none",
  color: "#888",
  fontSize: "1rem",
  cursor: "pointer",
};

const errorBox = {
  background: "rgba(239,68,68,0.12)",
  border: "1px solid rgba(239,68,68,0.3)",
  borderRadius: 6,
  color: "#fca5a5",
  padding: "8px 12px",
  fontSize: "0.82rem",
  marginBottom: 14,
};

const inputStyle = {
  width: "100%",
  background: "#252525",
  color: "#e8e8e8",
  border: "1px solid #3a3a3a",
  borderRadius: 6,
  padding: "8px 10px",
  fontSize: "0.9rem",
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#888",
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const btnDanger = {
  background: "#e50914",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "7px 14px",
  fontSize: "0.82rem",
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
};

const btnSecondary = {
  background: "#333",
  color: "#ccc",
  border: "1px solid #444",
  borderRadius: 6,
  padding: "7px 14px",
  fontSize: "0.82rem",
  cursor: "pointer",
  fontFamily: "inherit",
};

const toastStyle = {
  position: "fixed",
  bottom: 24,
  right: 24,
  zIndex: 9999,
  color: "#fff",
  padding: "10px 18px",
  borderRadius: 8,
  fontSize: "0.875rem",
  fontWeight: 600,
  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
};
