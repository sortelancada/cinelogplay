export default function AdminHeader({ title, subtitle, action }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 24,
      }}
    >
      <div>
        <h4 style={{ fontWeight: 700, margin: 0, fontSize: "1.25rem", color: "#f0f0f0" }}>
          {title}
        </h4>
        {subtitle && (
          <p style={{ color: "#888", fontSize: "0.82rem", margin: "4px 0 0" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
