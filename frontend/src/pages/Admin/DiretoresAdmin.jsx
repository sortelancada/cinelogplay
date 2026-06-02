import { useState, useEffect, useCallback } from "react";
import { adminService } from "../../services/admin.service.js";
import AdminHeader from "../../components/admin/Header.jsx";
import ImagePicker from "../../components/admin/ImagePicker.jsx";

const EMPTY_FORM = {
  nome: "",
  foto: "",
  nacionalidade: "",
  data_nascimento: "",
  principais_obras: "",
  biografia: "",
};

function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div style={{ ...toastStyle, background: type === "error" ? "#ef4444" : "#22c55e" }}>
      {msg}
    </div>
  );
}

export default function DiretoresAdmin() {
  const [diretores, setDiretores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setDiretores(await adminService.getDiretores());
    } catch {
      setError("Erro ao carregar diretores.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function openCreate() {
    setForm(EMPTY_FORM);
    setModal({ mode: "create" });
  }

  function openEdit(d) {
    setForm({
      nome: d.nome ?? "",
      foto: d.foto ?? "",
      nacionalidade: d.nacionalidade ?? "",
      data_nascimento: d.data_nascimento?.split("T")[0] ?? "",
      principais_obras: d.principais_obras ?? "",
      biografia: d.biografia ?? "",
    });
    setModal({ mode: "edit", diretor: d });
  }

  async function handleSave() {
    if (!form.nome.trim()) return showToast("Nome é obrigatório.", "error");
    setSaving(true);
    const body = { ...form, data_nascimento: form.data_nascimento || null };
    try {
      if (modal.mode === "edit") {
        await adminService.updateDiretor(modal.diretor.id, body);
        showToast("Diretor atualizado!");
      } else {
        await adminService.createDiretor(body);
        showToast("Diretor criado!");
      }
      setModal(null);
      load();
    } catch (e) {
      showToast(e.message || "Erro ao salvar.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await adminService.deleteDiretor(deleteTarget.id);
      showToast("Diretor excluído!");
      setDeleteTarget(null);
      load();
    } catch (e) {
      showToast(e.message || "Erro ao excluir.", "error");
    }
  }

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
    style: inputStyle,
  });

  return (
    <div style={{ position: "relative" }}>
      <AdminHeader
        title="Diretores"
        subtitle="Gerenciar diretores"
        action={
          <button style={btnDanger} onClick={openCreate}>+ Novo Diretor</button>
        }
      />

      {loading && <p style={{ color: "#888" }}>Carregando...</p>}
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}
      {!loading && !error && (
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={th}></th>
                <th style={th}>Nome</th>
                <th style={th}>Nacionalidade</th>
                <th style={th}>Principais Obras</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {diretores.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ ...td, textAlign: "center", color: "#888", padding: 32 }}>
                    Nenhum diretor cadastrado.
                  </td>
                </tr>
              ) : (
                diretores.map((d) => (
                  <tr key={d.id} style={{ borderBottom: "1px solid #2a2a2a" }}>
                    <td style={{ ...td, width: 48 }}>
                      {d.foto ? (
                        <img
                          src={d.foto}
                          alt=""
                          style={{ width: 36, height: 36, objectFit: "cover", borderRadius: "50%", background: "#333" }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      ) : "—"}
                    </td>
                    <td style={{ ...td, fontWeight: 600 }}>{d.nome}</td>
                    <td style={{ ...td, color: "#888", fontSize: "0.85rem" }}>{d.nacionalidade || "—"}</td>
                    <td style={{ ...td, fontSize: "0.82rem", color: "#aaa" }}>{d.principais_obras || "—"}</td>
                    <td style={{ ...td, width: 90 }}>
                      <button style={btnIconLight} onClick={() => openEdit(d)} title="Editar">✏</button>
                      <button style={btnIconRed} onClick={() => setDeleteTarget(d)} title="Excluir">🗑</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && setModal(null)}>
          <div style={dialogStyle}>
            <div style={dHeader}>
              <span>{modal.mode === "edit" ? "Editar Diretor" : "Novo Diretor"}</span>
              <button style={closeBtn} onClick={() => setModal(null)}>✕</button>
            </div>
            <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
              <div style={grid2}>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>NOME *</label>
                  <input {...field("nome")} placeholder="Nome do diretor" />
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>FOTO</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input {...field("foto")} placeholder="URL ou selecione →" style={{ ...inputStyle, flex: 1 }} />
                    <button style={btnSecondary} type="button" onClick={() => setShowPicker(true)}>📁</button>
                  </div>
                  {form.foto && (
                    <img
                      src={form.foto}
                      alt="preview"
                      style={{ width: 48, height: 48, objectFit: "cover", borderRadius: "50%", marginTop: 6, border: "1px solid #2a2a2a" }}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  )}
                </div>
                <div>
                  <label style={labelStyle}>NACIONALIDADE</label>
                  <input {...field("nacionalidade")} />
                </div>
                <div>
                  <label style={labelStyle}>NASCIMENTO</label>
                  <input {...field("data_nascimento")} type="date" />
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>PRINCIPAIS OBRAS</label>
                  <input {...field("principais_obras")} placeholder="ex: Inception, Interstellar" />
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>BIOGRAFIA</label>
                  <textarea {...field("biografia")} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                </div>
              </div>
            </div>
            <div style={dFooter}>
              <button style={btnSecondary} onClick={() => setModal(null)}>Cancelar</button>
              <button style={btnDanger} onClick={handleSave} disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && setDeleteTarget(null)}>
          <div style={smallDialog}>
            <div style={dHeader}>
              <span style={{ color: "#ef4444" }}>⚠ Confirmar Exclusão</span>
              <button style={closeBtn} onClick={() => setDeleteTarget(null)}>✕</button>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <p>Excluir "{deleteTarget.nome}"?</p>
              <small style={{ color: "#888" }}>Esta ação não pode ser desfeita.</small>
            </div>
            <div style={dFooter}>
              <button style={btnSecondary} onClick={() => setDeleteTarget(null)}>Cancelar</button>
              <button style={btnDanger} onClick={handleDelete}>Excluir</button>
            </div>
          </div>
        </div>
      )}

      {showPicker && (
        <ImagePicker
          defaultTab="diretores"
          onSelect={(url) => setForm((f) => ({ ...f, foto: url }))}
          onClose={() => setShowPicker(false)}
        />
      )}

      <Toast msg={toast?.msg} type={toast?.type} />
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const overlayStyle = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" };
const dialogStyle = { background: "#1e1e1e", border: "1px solid #333", borderRadius: 12, width: "min(520px, 94vw)", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" };
const smallDialog = { background: "#1e1e1e", border: "1px solid #900", borderRadius: 10, width: "min(360px, 90vw)" };
const dHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #2a2a2a", fontWeight: 600, color: "#f0f0f0" };
const dFooter = { display: "flex", justifyContent: "flex-end", gap: 8, padding: "12px 20px", borderTop: "1px solid #2a2a2a" };
const closeBtn = { background: "none", border: "none", color: "#888", fontSize: "1rem", cursor: "pointer" };
const tableStyle = { width: "100%", borderCollapse: "collapse", background: "#1e1e1e", borderRadius: 10, overflow: "hidden" };
const th = { background: "#0e0e0e", borderBottom: "1px solid #2a2a2a", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px", padding: "10px 12px", textAlign: "left" };
const td = { padding: "10px 12px", color: "#d0d0d0", verticalAlign: "middle" };
const btnDanger = { background: "#e50914", color: "#fff", border: "none", borderRadius: 6, padding: "7px 14px", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" };
const btnSecondary = { background: "#333", color: "#ccc", border: "1px solid #444", borderRadius: 6, padding: "7px 14px", fontSize: "0.82rem", cursor: "pointer" };
const btnIconLight = { background: "transparent", border: "1px solid #444", borderRadius: 4, color: "#ccc", padding: "3px 7px", cursor: "pointer", marginRight: 4, fontSize: "0.85rem" };
const btnIconRed = { ...btnIconLight, borderColor: "#e50914", color: "#e50914", marginRight: 0 };
const inputStyle = { width: "100%", background: "#252525", color: "#e8e8e8", border: "1px solid #3a3a3a", borderRadius: 6, padding: "8px 10px", fontSize: "0.9rem", fontFamily: "inherit", outline: "none", boxSizing: "border-box" };
const labelStyle = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#888", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" };
const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 };
const toastStyle = { position: "fixed", bottom: 24, right: 24, zIndex: 9999, color: "#fff", padding: "10px 18px", borderRadius: 8, fontSize: "0.875rem", fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.5)" };
