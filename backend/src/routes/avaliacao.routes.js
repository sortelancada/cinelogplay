import express from "express";

import {
  listarAvaliacoesFilme,
  mediaFilme,
  avaliacaoUsuario,
  criarOuAtualizarAvaliacao,
  deletarAvaliacaoController,
} from "../controllers/avaliacao.controller.js";

const router = express.Router();

router.get("/filme/:filmeId", listarAvaliacoesFilme);

router.get("/filme/:filmeId/media", mediaFilme);

router.get("/usuario/:usuarioId/filme/:filmeId", avaliacaoUsuario);

router.post("/", criarOuAtualizarAvaliacao);

router.delete("/:id", deletarAvaliacaoController);

export default router;
