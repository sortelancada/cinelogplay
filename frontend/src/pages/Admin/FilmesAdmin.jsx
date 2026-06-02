import { useState, useEffect, useCallback } from "react";
import { adminService } from "../../services/admin.service.js";
import AdminHeader from "../../components/admin/Header.jsx";
import ImagePicker from "../../components/admin/ImagePicker.jsx";

// ── Helpers ──────────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  titulo: "",
  ano: new Date().getFullYear(),
  duracao: "",
  genero: "",
  classificacao: "12",
  tipo: "filme",
  descricao_curta: "",
  sinopse: "",
  imagem: "",
  trailer_youtube: "",
  diretor_id: "",
};

function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div
      style={{
        ...toastStyle,
        background: type === "error" ? "#ef4444" : "#22c55e",
      }}
    >
      {msg}
    </div>
  );
}

function DeleteModal({ item, onConfirm, onClose }) {
  if (!item) return null;
  return (
    <div
      style={overlayStyle}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={smallDialog}>
        <div style={dHeader}>
          <span style={{ color: "#ef4444" }}>⚠ Confirmar Exclusão</span>
          <button style={closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>
        <div style={{ padding: "16px 20px" }}>
          <p style={{ marginBottom: 6 }}>Excluir "{item.titulo}"?</p>
          <small style={{ color: "#888" }}>
            Esta ação não pode ser desfeita.
          </small>
        </div>
        <div style={dFooter}>
          <button style={btnSecondary} onClick={onClose}>
            Cancelar
          </button>
          <button style={btnDanger} onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function FilmesAdmin() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null); // null | { mode, filme|null }
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [pickerField, setPickerField] = useState(null); // 'imagem' or null
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setFilmes(await adminService.getFilmes());
    } catch {
      setError("Erro ao carregar filmes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setForm(EMPTY_FORM);
    setModal({ mode: "create" });
  }

  function openEdit(filme) {
    setForm({
      titulo: filme.titulo ?? "",
      ano: filme.ano ?? new Date().getFullYear(),
      duracao: filme.duracao ?? "",
      genero: filme.genero ?? "",
      classificacao: filme.classificacao ?? "12",
      tipo: filme.tipo ?? "filme",
      descricao_curta: filme.descricao_curta ?? "",
      sinopse: filme.sinopse ?? "",
      imagem: filme.imagem ?? "",
      trailer_youtube: filme.trailer_youtube ?? "",
      diretor_id: filme.diretor_id ?? "",
    });
    setModal({ mode: "edit", filme });
  }

  async function handleSave() {
    if (!form.titulo.trim()) return showToast("Título é obrigatório.", "error");
    setSaving(true);
    const body = {
      ...form,
      ano: parseInt(form.ano) || null,
      diretor_id: parseInt(form.diretor_id) || null,
    };
    try {
      if (modal.mode === "edit") {
        await adminService.updateFilme(modal.filme.id, body);
        showToast("Filme atualizado!");
      } else {
        await adminService.createFilme(body);
        showToast("Filme criado!");
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
    if (!deleteTarget) return;
    try {
      await adminService.deleteFilme(deleteTarget.id);
      showToast("Filme excluído!");
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
        title="Filmes"
        subtitle="Gerenciar catálogo de filmes"
        action={
          <button style={btnDanger} onClick={openCreate}>
            + Novo Filme
          </button>
        }
      />

      {/* Table */}
      {loading && <p style={{ color: "#888" }}>Carregando...</p>}
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}
      {!loading && !error && (
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={th}></th>
                <th style={th}>Título</th>
                <th style={th}>Ano</th>
                <th style={th}>Gênero</th>
                <th style={th}>Class.</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {filmes.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      ...td,
                      textAlign: "center",
                      color: "#888",
                      padding: 32,
                    }}
                  >
                    Nenhum filme cadastrado.
                  </td>
                </tr>
              ) : (
                filmes.map((f) => (
                  <tr key={f.id} style={{ borderBottom: "1px solid #2a2a2a" }}>
                    <td style={{ ...td, width: 48 }}>
                      {f.imagem ? (
                        <img
                          src={f.imagem}
                          alt=""
                          style={{
                            width: 36,
                            height: 52,
                            objectFit: "cover",
                            borderRadius: 4,
                            background: "#333",
                          }}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td style={td}>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                        {f.titulo}
                      </div>
                      <small style={{ color: "#888" }}>
                        {f.tipo || "filme"}
                      </small>
                    </td>
                    <td style={{ ...td, color: "#888", fontSize: "0.85rem" }}>
                      {f.ano || "—"}
                    </td>
                    <td style={{ ...td, fontSize: "0.85rem" }}>
                      {f.genero || "—"}
                    </td>
                    <td style={td}>
                      <span style={classBadge}>{f.classificacao || "—"}</span>
                    </td>
                    <td style={{ ...td, width: 90 }}>
                      <button
                        style={btnIconLight}
                        onClick={() => openEdit(f)}
                        title="Editar"
                      >
                        ✏
                      </button>
                      <button
                        style={btnIconRed}
                        onClick={() => setDeleteTarget(f)}
                        title="Excluir"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Filme Modal */}
      {modal && (
        <div
          style={overlayStyle}
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div style={largeDialog}>
            <div style={dHeader}>
              <span>
                {modal.mode === "edit" ? "Editar Filme" : "Novo Filme"}
              </span>
              <button style={closeBtn} onClick={() => setModal(null)}>
                ✕
              </button>
            </div>
            <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
              <div style={grid2}>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>TÍTULO *</label>
                  <input {...field("titulo")} placeholder="Nome do filme" />
                </div>
                <div>
                  <label style={labelStyle}>ANO</label>
                  <input
                    {...field("ano")}
                    type="number"
                    min="1800"
                    max="2030"
                  />
                </div>
                <div>
                  <label style={labelStyle}>DURAÇÃO</label>
                  <input {...field("duracao")} placeholder="120 min" />
                </div>
                <div>
                  <label style={labelStyle}>CLASSIFICAÇÃO</label>
                  <select {...field("classificacao")} style={inputStyle}>
                    {["L", "10", "12", "14", "16", "18"].map((v) => (
                      <option key={v} value={v}>
                        {v === "L" ? "Livre" : v}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>TIPO</label>
                  <select {...field("tipo")} style={inputStyle}>
                    <option value="filme">Filme</option>
                    <option value="serie">Série</option>
                    <option value="documentario">Documentário</option>
                  </select>
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>GÊNERO</label>
                  <input
                    {...field("genero")}
                    placeholder="ex: Ficção Científica / Ação"
                  />
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>DESCRIÇÃO CURTA</label>
                  <input
                    {...field("descricao_curta")}
                    maxLength={500}
                    placeholder="Resumo curto..."
                  />
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>SINOPSE</label>
                  <textarea
                    {...field("sinopse")}
                    rows={3}
                    placeholder="Sinopse completa..."
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>CAPA DO FILME</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      {...field("imagem")}
                      placeholder="URL ou selecione →"
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button
                      style={btnSecondary}
                      type="button"
                      onClick={() => setPickerField("imagem")}
                    ></button>
                  </div>
                  {form.imagem && (
                    <img
                      src={form.imagem}
                      alt="preview"
                      style={{
                        maxHeight: 64,
                        marginTop: 6,
                        borderRadius: 4,
                        border: "1px solid #2a2a2a",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>TRAILER (YouTube embed URL)</label>
                  <input
                    {...field("trailer_youtube")}
                    type="url"
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>
                <div>
                  <label style={labelStyle}>ID DO DIRETOR</label>
                  <input
                    {...field("diretor_id")}
                    type="number"
                    placeholder="ex: 1"
                  />
                </div>
              </div>
            </div>
            <div style={dFooter}>
              <button style={btnSecondary} onClick={() => setModal(null)}>
                Cancelar
              </button>
              <button style={btnDanger} onClick={handleSave} disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <DeleteModal
        item={deleteTarget}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />

      {/* Image picker */}
      {pickerField && (
        <ImagePicker
          defaultTab="filmes"
          onSelect={(url) => setForm((f) => ({ ...f, [pickerField]: url }))}
          onClose={() => setPickerField(null)}
        />
      )}

      <Toast msg={toast?.msg} type={toast?.type} />
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  zIndex: 500,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const largeDialog = {
  background: "#1e1e1e",
  border: "1px solid #333",
  borderRadius: 12,
  width: "min(720px, 94vw)",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const smallDialog = {
  background: "#1e1e1e",
  border: "1px solid #900",
  borderRadius: 10,
  width: "min(360px, 90vw)",
};

const dHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
  borderBottom: "1px solid #2a2a2a",
  fontWeight: 600,
  color: "#f0f0f0",
};

const dFooter = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  padding: "12px 20px",
  borderTop: "1px solid #2a2a2a",
};

const closeBtn = {
  background: "none",
  border: "none",
  color: "#888",
  fontSize: "1rem",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#1e1e1e",
  borderRadius: 10,
  overflow: "hidden",
};

const th = {
  background: "#0e0e0e",
  borderBottom: "1px solid #2a2a2a",
  color: "#888",
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  padding: "10px 12px",
  textAlign: "left",
};

const td = {
  padding: "10px 12px",
  color: "#d0d0d0",
  verticalAlign: "middle",
};

const classBadge = {
  background: "rgba(255,193,7,0.15)",
  color: "#ffc107",
  border: "1px solid rgba(255,193,7,0.3)",
  borderRadius: 4,
  padding: "2px 7px",
  fontSize: "0.7rem",
  fontWeight: 600,
};

const btnDanger = {
  background: "#e50914",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "7px 14px",
  fontSize: "0.82rem",
  fontWeight: 600,
  cursor: "pointer",
};

const btnSecondary = {
  background: "#333",
  color: "#ccc",
  border: "1px solid #444",
  borderRadius: 6,
  padding: "7px 14px",
  fontSize: "0.82rem",
  cursor: "pointer",
};

const btnIconLight = {
  background: "transparent",
  border: "1px solid #444",
  borderRadius: 4,
  color: "#ccc",
  padding: "3px 7px",
  cursor: "pointer",
  marginRight: 4,
  fontSize: "0.85rem",
};

const btnIconRed = {
  ...btnIconLight,
  borderColor: "#e50914",
  color: "#e50914",
  marginRight: 0,
};

const inputStyle = {
  width: "100%",
  background: "#252525",
  color: "#e8e8e8",
  border: "1px solid #3a3a3a",
  borderRadius: 6,
  padding: "8px 10px",
  fontSize: "0.9rem",
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#888",
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
};

const toastStyle = {
  position: "fixed",
  bottom: 24,
  right: 24,
  zIndex: 9999,
  color: "#fff",
  padding: "10px 18px",
  borderRadius: 8,
  fontSize: "0.875rem",
  fontWeight: 600,
  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
};
