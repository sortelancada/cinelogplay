import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { avatarInitials } from "../../utils/helpers.js";

const NAV_LINKS = [
  { to: "/",          label: "Início"    },
  { to: "/filmes",    label: "Filmes"    },
  { to: "/diretores", label: "Diretores" },
  { to: "/busca",     label: "Buscar"    },
  { to: "/favoritos", label: "Favoritos" },
];

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen,     setMenuOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery,  setSearchQuery]  = useState("");
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [scrolled,     setScrolled]     = useState(false);

  const dropdownRef = useRef(null);
  const searchRef   = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  function handleSearch(e) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/busca?q=${encodeURIComponent(q)}`);
    setSearchQuery("");
    setSearchOpen(false);
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    setDropdownOpen(false);
    navigate("/");
  }

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "var(--nav-height)",
          zIndex: 1000,
          background: scrolled
            ? "rgba(15,23,42,0.97)"
            : "linear-gradient(180deg, rgba(15,23,42,0.98) 0%, rgba(15,23,42,0.7) 100%)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "background 0.3s ease, border-color 0.3s ease",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {/* LOGO */}
          <Link to="/" style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
            <img
              src="/logo/cinelogplay.png"
              alt="CinelogPlay"
              style={{ height: "38px", width: "auto" }}
            />
          </Link>

          {/* NAV DESKTOP */}
          <nav
            aria-label="Navegação principal"
            style={{ display: "flex", gap: "0.25rem", flex: 1, alignItems: "center" }}
            className="header-nav-desktop"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                style={({ isActive }) => ({
                  padding: "0.4rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: isActive ? "var(--accent)" : "var(--text-muted)",
                  background: isActive ? "rgba(245,158,11,0.1)" : "transparent",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                })}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.style.color.includes("accent"))
                    e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  /* NavLink style prop handles active colour */
                }}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* BUSCA GLOBAL */}
          <div ref={searchRef} style={{ position: "relative" }}>
            <button
              onClick={() => setSearchOpen((p) => !p)}
              aria-label="Abrir busca"
              className="btn btn-ghost btn-sm"
              style={{ fontSize: "1.1rem", padding: "0.4rem 0.6rem" }}
            >
              🔍
            </button>
            {searchOpen && (
              <form
                onSubmit={handleSearch}
                className="animate-fade-down"
                style={{
                  position: "absolute",
                  top: "calc(100% + 0.5rem)",
                  right: 0,
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.5rem",
                  display: "flex",
                  gap: "0.4rem",
                  minWidth: "280px",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <input
                  autoFocus
                  className="input"
                  style={{ flex: 1, padding: "0.5rem 0.75rem", fontSize: "0.9rem" }}
                  placeholder="Buscar filmes, diretores…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-sm">Ir</button>
              </form>
            )}
          </div>

          {/* AUTH AREA */}
          {isAuthenticated ? (
            <div ref={dropdownRef} style={{ position: "relative", flexShrink: 0 }}>
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                aria-label="Menu do usuário"
                aria-expanded={dropdownOpen}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.3rem 0.5rem",
                  borderRadius: "var(--radius-sm)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-hover)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    color: "#0F172A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    flexShrink: 0,
                  }}
                >
                  {avatarInitials(user?.nome)}
                </div>
                <span
                  style={{ fontSize: "0.85rem", color: "var(--text)", maxWidth: "120px",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  className="header-username"
                >
                  {user?.nome}
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>▾</span>
              </button>

              {dropdownOpen && (
                <div
                  className="animate-fade-down"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 0.5rem)",
                    right: 0,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    minWidth: "200px",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-card)",
                    zIndex: 200,
                  }}
                >
                  {[
                    { to: "/perfil",    icon: "👤", label: "Meu Perfil"  },
                    { to: "/favoritos", icon: "♥",  label: "Favoritos"   },
                  ].map(({ to, icon, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.6rem",
                        padding: "0.7rem 1rem", color: "var(--text-muted)",
                        fontSize: "0.9rem", transition: "all 0.15s",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--bg-hover)";
                        e.currentTarget.style.color = "var(--text)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "";
                        e.currentTarget.style.color = "var(--text-muted)";
                      }}
                    >
                      <span>{icon}</span> {label}
                    </Link>
                  ))}
                  <div style={{ borderTop: "1px solid var(--border)" }} />
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: "0.6rem",
                      padding: "0.7rem 1rem", color: "#EF4444", fontSize: "0.9rem",
                      background: "none", border: "none", cursor: "pointer", transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.08)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                  >
                    <span>🚪</span> Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }} className="header-auth-buttons">
              <Link to="/login"    className="btn btn-ghost btn-sm">Entrar</Link>
              <Link to="/cadastro" className="btn btn-primary btn-sm">Cadastrar</Link>
            </div>
          )}

          {/* HAMBÚRGUER MOBILE */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="header-hamburger"
            style={{
              background: "none",
              border: "none",
              color: "var(--text)",
              fontSize: "1.5rem",
              padding: "0.4rem",
              display: "none",
              cursor: "pointer",
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* MENU MOBILE */}
      {menuOpen && (
        <>
          <div
            className="overlay animate-fade-in"
            onClick={() => setMenuOpen(false)}
            style={{ zIndex: 998 }}
          />
          <div
            className="animate-fade-down"
            style={{
              position: "fixed",
              top: "var(--nav-height)",
              left: 0,
              right: 0,
              background: "var(--bg-card)",
              borderBottom: "1px solid var(--border)",
              zIndex: 999,
              padding: "1rem 1.5rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {/* Busca mobile */}
            <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.4rem", marginBottom: "0.75rem" }}>
              <input
                className="input"
                style={{ flex: 1, padding: "0.55rem 0.8rem", fontSize: "0.9rem" }}
                placeholder="Buscar filmes, diretores…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">🔍</button>
            </form>

            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  padding: "0.7rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: isActive ? "var(--accent)" : "var(--text)",
                  background: isActive ? "rgba(245,158,11,0.1)" : "transparent",
                  textDecoration: "none",
                })}
              >
                {label}
              </NavLink>
            ))}

            <div style={{ borderTop: "1px solid var(--border)", margin: "0.5rem 0" }} />

            {isAuthenticated ? (
              <>
                <Link
                  to="/perfil"
                  onClick={() => setMenuOpen(false)}
                  style={{ padding: "0.7rem 0.75rem", color: "var(--text)", textDecoration: "none", fontSize: "0.95rem" }}
                >
                  👤 {user?.nome}
                </Link>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  style={{ background: "none", border: "none", color: "#EF4444", padding: "0.7rem 0.75rem",
                    textAlign: "left", fontSize: "0.95rem", cursor: "pointer", borderRadius: "var(--radius-sm)" }}
                >
                  🚪 Sair
                </button>
              </>
            ) : (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Link to="/login"    className="btn btn-outline" onClick={() => setMenuOpen(false)} style={{ flex: 1, justifyContent: "center" }}>Entrar</Link>
                <Link to="/cadastro" className="btn btn-primary" onClick={() => setMenuOpen(false)} style={{ flex: 1, justifyContent: "center" }}>Cadastrar</Link>
              </div>
            )}
          </div>
        </>
      )}

      {/* CSS responsivo inline */}
      <style>{`
        @media (max-width: 900px) {
          .header-nav-desktop { display: none !important; }
          .header-hamburger   { display: flex !important; }
          .header-username    { display: none !important; }
          .header-auth-buttons { display: none !important; }
        }
      `}</style>
    </>
  );
}
