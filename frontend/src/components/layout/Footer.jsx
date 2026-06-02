import { Link } from "react-router-dom";

const GENEROS = ["Ação", "Drama", "Ficção Científica", "Crime", "Suspense", "Animação"];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#080F1E",
        borderTop: "1px solid var(--border)",
        padding: "3rem 0 1.5rem",
        marginTop: "auto",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "2rem",
            marginBottom: "2rem",
          }}
          className="footer-grid"
        >
          {/* Marca */}
          <div>
            <img src="/logo/cinelogplay.png" alt="CinelogPlay" style={{ height: "40px", marginBottom: "0.75rem" }} />
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: "280px" }}>
              Catálogo Informativo de Produções Cinematográficas.
              Descubra, avalie e compartilhe sua paixão pelo cinema.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
              {[
                { label: "Instagram", icon: "📷", href: "#" },
                { label: "Twitter",   icon: "🐦", href: "#" },
                { label: "YouTube",   icon: "▶️", href: "#" },
                { label: "Facebook",  icon: "👍", href: "#" },
              ].map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: "36px", height: "36px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.9rem", textDecoration: "none",
                    transition: "all 0.2s ease",
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
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div>
            <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
              Navegar
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { to: "/",          label: "Home"      },
                { to: "/filmes",    label: "Filmes"    },
                { to: "/diretores", label: "Diretores" },
                { to: "/busca",     label: "Buscar"    },
                { to: "/favoritos", label: "Favoritos" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ color: "var(--text-muted)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gêneros */}
          <div>
            <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
              Gêneros
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {GENEROS.map((g) => (
                <li key={g}>
                  <Link
                    to={`/busca?genero=${encodeURIComponent(g)}`}
                    style={{ color: "var(--text-muted)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                  >
                    {g}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Conta */}
          <div>
            <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
              Sua Conta
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { to: "/login",    label: "Entrar"    },
                { to: "/cadastro", label: "Cadastrar" },
                { to: "/perfil",   label: "Perfil"    },
                { to: "/favoritos",label: "Favoritos" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ color: "var(--text-muted)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
            © 2026 CinelogPlay. Todos os direitos reservados.
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
            Feito com ♥ para os amantes do cinema
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
