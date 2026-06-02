import { api } from "./api.js";

function extractList(res) {
  return Array.isArray(res) ? res : res?.data ?? [];
}

export const favoritosService = {
  getAll:  ()       => api.get("/api/favoritos").then(extractList),
  add:     (filmeId) => api.post("/api/favoritos", { filme_id: filmeId }),
  remove:  (filmeId) => api.delete(`/api/favoritos/${filmeId}`),
};
