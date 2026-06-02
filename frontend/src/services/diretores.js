import { api } from "./api.js";

function extractList(res) {
  return Array.isArray(res) ? res : res?.data ?? [];
}

function extractItem(res) {
  return res?.data ?? res;
}

export const diretoresService = {
  getAll:  ()   => api.get("/api/diretores").then(extractList),
  getById: (id) => api.get(`/api/diretores/${id}`).then(extractItem),
};
