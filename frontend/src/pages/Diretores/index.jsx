import { useState, useMemo } from "react";
import { useDiretores } from "../../hooks/useDiretores.js";
import DiretorCard from "../../components/ui/DiretorCard.jsx";

export default function DiretoresPage() {
  const { diretores, loading, error } = useDiretores();
  const [busca, setBusca] = useState("");

  const resultado = useMemo(() => {
    if (!busca.trim()) return diretores;
    const q = busca.toLowerCase();
    return diretores.filter(
      (d) =>
        (d.nome ?? "").toLowerCase().includes(q) ||
        (d.nacionalidade ?? "").toLowerCase().includes(q)
    );
  }, [diretores, busca]);

  return (
    <div style={{ padding: "2.5rem 0 4rem" }}>
      <div className="container">
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Diretores</h1>
          <p style={{ color: "var(--text-muted)" }}>
            {loading ? "Carregando…" : `${resultado.length} diretores`}
          </p>
        </div>

        <div style={{ marginBottom: "2rem", maxWidth: "400px" }}>
          <input
            className="input"
            placeholder="Buscar por nome ou nacionalidade…"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <div className="cards-grid">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i}>
                <div className="skeleton" style={{ height: "200px", borderRadius: "var(--radius-md)", marginBottom: "0.6rem" }} />
                <div className="skeleton" style={{ height: "14px", width: "70%", marginBottom: "0.4rem", borderRadius: "4px" }} />
                <div className="skeleton" style={{ height: "12px", width: "50%", borderRadius: "4px" }} />
              </div>
            ))}
          </div>
        ) : resultado.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎥</div>
            <h3>Nenhum diretor encontrado</h3>
            <p>Tente outro termo de busca.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {resultado.map((d) => <DiretorCard key={d.id} diretor={d} />)}
          </div>
        )}
      </div>
    </div>
  );
}
