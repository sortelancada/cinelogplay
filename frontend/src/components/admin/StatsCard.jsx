export default function StatsCard({ icon, label, value, color = "rgba(229,9,20,0.1)" }) {
  return (
    <div
      style={{
        background: "#1e1e1e",
        border: "1px solid #2a2a2a",
        borderRadius: 10,
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ color: "#888", fontSize: "0.75rem" }}>{label}</div>
        <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#f0f0f0", lineHeight: 1.2 }}>
          {value ?? "—"}
        </div>
      </div>
    </div>
  );
}
