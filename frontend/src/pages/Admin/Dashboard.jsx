import { useEffect, useState } from "react";
import { adminService } from "../../services/admin.service.js";
import StatsCard from "../../components/admin/StatsCard.jsx";
import AdminHeader from "../../components/admin/Header.jsx";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        subtitle="Bem-vindo ao painel de controle CinelogPlay."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatsCard
          icon="🎬"
          label="Filmes"
          value={loading ? "…" : stats?.filmes}
          color="rgba(229,9,20,0.1)"
        />
        <StatsCard
          icon="🎭"
          label="Atores"
          value={loading ? "…" : stats?.atores}
          color="rgba(13,202,240,0.1)"
        />
        <StatsCard
          icon="🎥"
          label="Diretores"
          value={loading ? "…" : stats?.diretores}
          color="rgba(25,135,84,0.1)"
        />
        <StatsCard
          icon="⭐"
          label="Avaliações"
          value="★"
          color="rgba(255,193,7,0.1)"
        />
      </div>

      <p style={{ color: "#888", fontSize: "0.85rem" }}>
        Use o menu lateral para gerenciar o conteúdo do site.
      </p>
    </div>
  );
}
