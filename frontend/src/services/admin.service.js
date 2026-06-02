import { api } from "./api.js";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://cinelogplay.onrender.com";

function extractList(res) {
  return Array.isArray(res) ? res : res?.data ?? [];
}

export const adminService = {
  // ── Stats ──────────────────────────────────────────────────────────────────
  async getStats() {
    const [filmes, atores, diretores] = await Promise.all([
      api.get("/api/filmes"),
      api.get("/api/atores"),
      api.get("/api/diretores"),
    ]);
    return {
      filmes: extractList(filmes).length,
      atores: extractList(atores).length,
      diretores: extractList(diretores).length,
    };
  },

  // ── Filmes ─────────────────────────────────────────────────────────────────
  getFilmes: () => api.get("/api/filmes").then(extractList),
  createFilme: (body) => api.post("/api/filmes", body),
  updateFilme: (id, body) => api.put(`/api/filmes/${id}`, body),
  deleteFilme: (id) => api.delete(`/api/filmes/${id}`),

  // ── Atores ─────────────────────────────────────────────────────────────────
  getAtores: () => api.get("/api/atores").then(extractList),
  createAtor: (body) => api.post("/api/atores", body),
  updateAtor: (id, body) => api.put(`/api/atores/${id}`, body),
  deleteAtor: (id) => api.delete(`/api/atores/${id}`),

  // ── Diretores ──────────────────────────────────────────────────────────────
  getDiretores: () => api.get("/api/diretores").then(extractList),
  createDiretor: (body) => api.post("/api/diretores", body),
  updateDiretor: (id, body) => api.put(`/api/diretores/${id}`, body),
  deleteDiretor: (id) => api.delete(`/api/diretores/${id}`),

  // ── Auth ───────────────────────────────────────────────────────────────────
  changePassword: (senhaAtual, novaSenha) =>
    api.post("/api/auth/change-password", { senhaAtual, novaSenha }),

  // ── Upload ─────────────────────────────────────────────────────────────────
  async uploadImage(file) {
    const token = localStorage.getItem("clp_token");
    const fd = new FormData();
    fd.append("imagem", file);
    const res = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: fd,
    });
    return res.json();
  },

  async listImages(pasta) {
    const token = localStorage.getItem("clp_token");
    const res = await fetch(`${BASE_URL}/api/upload/list?pasta=${pasta}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    return data.data || [];
  },
};
