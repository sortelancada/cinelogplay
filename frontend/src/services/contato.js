import { api } from "./api.js";

export const contatoService = {
  enviar: (nome, email, mensagem) =>
    api.post("/api/contato", { nome, email, mensagem }),
};
