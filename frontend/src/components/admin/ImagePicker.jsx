import { useState, useRef } from "react";
import { adminService } from "../../services/admin.service.js";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://cinelogplay.onrender.com";

function toAbsolute(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const path = url.startsWith("/") ? url : "/" + url;
  return BASE_URL + path;
}

const TABS = [
  { id: "upload", label: "Upload" },
  { id: "filmes", label: "Filmes" },
  { id: "diretores", label: "Diretores" },
  { id: "uploads", label: "Enviados" },
];

function useToastLocal() {
  const [msg, setMsg] = useState(null);
  const show = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(null), 2500);
  };
  return [msg, show];
}

export default function ImagePicker({ onSelect, onClose, defaultTab = "filmes" }) {
  const [tab, setTab] = useState(defaultTab);
  const [grids, setGrids] = useState({});
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();
  const [toast, showToast] = useToastLocal();

  async function loadGrid(pasta) {
    if (grids[pasta]) return;
    try {
      const imgs = await adminService.listImages(pasta);
      setGrids((g) => ({ ...g, [pasta]: imgs }));
    } catch {
      setGrids((g) => ({ ...g, [pasta]: [] }));
    }
  }

  function handleTabChange(id) {
    setTab(id);
    if (id !== "upload") loadGrid(id);
  }

  async function handleFile(file) {
    if (!file) return;
    setUploading(true);
    try {
      const data = await adminService.uploadImage(file);
      if (data.success) {
        showToast("Upload concluído!");
        onSelect(toAbsolute(data.url));
        onClose();
      } else {
        showToast(data.message || "Erro no upload");
      }
    } catch {
      showToast("Erro ao enviar imagem");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div style={overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={dialog}>
        {/* Header */}
        <div style={dialogHeader}>
          <span>🖼 Selecionar Imagem</span>
          <button style={closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div style={tabBar}>
          {TABS.map((t) => (
            <button
              key={t.id}
              style={tabBtn(tab === t.id)}
              onClick={() => handleTabChange(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: 16, flex: 1, overflowY: "auto", minHeight: 200 }}>
          {tab === "upload" && (
            <div>
              <div
                style={dropzone}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {uploading ? (
                  <p style={{ color: "#888" }}>Enviando...</p>
                ) : (
                  <>
                    <div style={{ fontSize: "2.5rem", color: "#555" }}>⬆</div>
                    <p style={{ color: "#888", margin: "12px 0 4px" }}>
                      Clique ou arraste uma imagem
                    </p>
                    <small style={{ color: "#555" }}>PNG, JPG, JPEG, WEBP — máx 5 MB</small>
                  </>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                style={{ display: "none" }}
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
          )}

          {tab !== "upload" && (
            <div style={imgGrid}>
              {!grids[tab] ? (
                <p style={{ color: "#888", gridColumn: "1/-1" }}>Carregando...</p>
              ) : grids[tab].length === 0 ? (
                <p style={{ color: "#888", gridColumn: "1/-1" }}>Nenhuma imagem.</p>
              ) : (
                grids[tab].map((img) => (
                  <div
                    key={img.url}
                    style={imgItem}
                    onClick={() => {
                      onSelect(toAbsolute(img.url));
                      onClose();
                    }}
                    title={img.filename}
                  >
                    <img
                      src={toAbsolute(img.url)}
                      alt={img.filename}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.closest("div").style.display = "none";
                      }}
                    />
                    <div style={imgLabel}>{img.filename}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {toast && (
          <div style={toastStyle}>{toast}</div>
        )}
      </div>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const dialog = {
  background: "#1e1e1e",
  border: "1px solid #333",
  borderRadius: 12,
  width: "min(900px, 92vw)",
  maxHeight: "85vh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const dialogHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
  borderBottom: "1px solid #2a2a2a",
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#f0f0f0",
};

const closeBtn = {
  background: "none",
  border: "none",
  color: "#888",
  fontSize: "1rem",
  cursor: "pointer",
};

const tabBar = {
  display: "flex",
  borderBottom: "1px solid #2a2a2a",
  padding: "0 16px",
};

const tabBtn = (active) => ({
  background: "none",
  border: "none",
  borderBottom: active ? "2px solid #e50914" : "2px solid transparent",
  color: active ? "#fff" : "#888",
  padding: "10px 14px",
  fontSize: "0.85rem",
  cursor: "pointer",
  transition: "color 0.15s",
});

const dropzone = {
  border: "2px dashed #444",
  borderRadius: 10,
  padding: "40px 20px",
  textAlign: "center",
  cursor: "pointer",
  transition: "border-color 0.2s",
};

const imgGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
  gap: 8,
};

const imgItem = {
  position: "relative",
  aspectRatio: "2/3",
  borderRadius: 6,
  overflow: "hidden",
  cursor: "pointer",
  border: "2px solid transparent",
  transition: "border-color 0.15s",
  background: "#333",
};

const imgLabel = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
  color: "#ccc",
  fontSize: "0.62rem",
  padding: "4px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const toastStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
  background: "#22c55e",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: 6,
  fontSize: "0.85rem",
  fontWeight: 600,
};
