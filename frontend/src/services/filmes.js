import { api } from "./api.js";

function extractList(res) {
  return Array.isArray(res) ? res : res?.data ?? [];
}

function extractItem(res) {
  return res?.data ?? res;
}

export const filmesService = {
  getAll:       ()         => api.get("/api/filmes").then(extractList),
  getById:      (id)       => api.get(`/api/filmes/${id}`).then(extractItem),
  search:       (termo)    => api.get(`/api/filmes/search/${encodeURIComponent(termo)}`).then(extractList),
  getByGenero:  (genero)   => api.get(`/api/filmes/genero/${encodeURIComponent(genero)}`).then(extractList),
  comAvaliacao: ()         => api.get("/api/filmes/com-avaliacao").then(extractList),
};
