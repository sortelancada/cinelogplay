export default function SkeletonCard({ count = 6, variant = "filme" }) {
  const height = variant === "diretor" ? "220px" : "270px";
  return Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      style={{
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--bg-card)",
        flexShrink: 0,
        width: variant === "diretor" ? "160px" : "180px",
      }}
    >
      <div className="skeleton" style={{ height, width: "100%" }} />
      <div style={{ padding: "0.75rem" }}>
        <div className="skeleton" style={{ height: "14px", width: "80%", marginBottom: "0.5rem", borderRadius: "4px" }} />
        <div className="skeleton" style={{ height: "12px", width: "50%", borderRadius: "4px" }} />
      </div>
    </div>
  ));
}
