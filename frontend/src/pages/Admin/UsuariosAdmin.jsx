export default function UsuariosAdmin() {
  return (
    <div>
      <h4 style={{ fontWeight: 700, margin: "0 0 8px", fontSize: "1.25rem", color: "#f0f0f0" }}>
        Usuários
      </h4>
      <p style={{ color: "#888", fontSize: "0.82rem", marginBottom: 32 }}>
        Gerenciar usuários do sistema
      </p>
      <div
        style={{
          background: "#1e1e1e",
          border: "1px solid #2a2a2a",
          borderRadius: 10,
          padding: "48px 24px",
          textAlign: "center",
          color: "#555",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>👥</div>
        <p style={{ fontSize: "0.95rem" }}>
          Gestão de usuários em desenvolvimento.
        </p>
        <small>Endpoint: <code style={{ color: "#888" }}>/api/usuarios</code></small>
      </div>
    </div>
  );
}
