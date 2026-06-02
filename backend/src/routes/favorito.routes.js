// ========================================
// ROTAS DE FAVORITOS
// ========================================

import express from "express";
import Favorito from "../models/favorito.model.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { sendSuccess, sendError } from "../utils/response.js";

const router = express.Router();

// Todas as rotas de favoritos exigem autenticação
router.use(authMiddleware);

// ────────────────────────────────────────────────────────────────────────────
// GET /api/favoritos
// Retorna os favoritos do usuário autenticado (frontend chama sem parâmetros)
// ────────────────────────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const favoritos = await Favorito.getByUsuario(usuarioId);
    return sendSuccess(res, favoritos, "Favoritos obtidos com sucesso");
  } catch (error) {
    console.error("Erro ao obter favoritos:", error);
    return sendError(res, "Erro ao obter favoritos", "INTERNAL_ERROR", 500);
  }
});

// ────────────────────────────────────────────────────────────────────────────
// POST /api/favoritos
// Body: { filme_id }
// usuario_id extraído do JWT
// ────────────────────────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { filme_id } = req.body;

    if (!filme_id) {
      return sendError(res, "filme_id é obrigatório", "VALIDATION_ERROR", 400);
    }

    const jaFavorito = await Favorito.isFavorito(usuarioId, filme_id);
    if (jaFavorito) {
      return sendError(
        res,
        "Este filme já está nos favoritos",
        "ALREADY_EXISTS",
        400
      );
    }

    const novoFavorito = await Favorito.create(usuarioId, filme_id);
    return sendSuccess(res, novoFavorito, "Adicionado aos favoritos", 201);
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    return sendError(res, "Erro ao adicionar favorito", "INTERNAL_ERROR", 500);
  }
});

// ────────────────────────────────────────────────────────────────────────────
// DELETE /api/favoritos/:filmeId
// usuario_id extraído do JWT
// ────────────────────────────────────────────────────────────────────────────
router.delete("/:filmeId", async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { filmeId } = req.params;

    const jaFavorito = await Favorito.isFavorito(usuarioId, filmeId);
    if (!jaFavorito) {
      return sendError(
        res,
        "Este filme não está nos favoritos",
        "NOT_FOUND",
        404
      );
    }

    await Favorito.delete(usuarioId, filmeId);
    return sendSuccess(res, null, "Removido dos favoritos");
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    return sendError(res, "Erro ao remover favorito", "INTERNAL_ERROR", 500);
  }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/favoritos/usuario/:usuarioId  (mantido para compatibilidade admin)
// ────────────────────────────────────────────────────────────────────────────
router.get("/usuario/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const favoritos = await Favorito.getByUsuario(usuarioId);
    return sendSuccess(res, favoritos, "Favoritos obtidos com sucesso");
  } catch (error) {
    console.error("Erro ao obter favoritos:", error);
    return sendError(res, "Erro ao obter favoritos", "INTERNAL_ERROR", 500);
  }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/favoritos/verificar/:filmeId
// Verifica se o filme autenticado é favorito do usuário logado
// ────────────────────────────────────────────────────────────────────────────
router.get("/verificar/:filmeId", async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { filmeId } = req.params;
    const isFavorito = await Favorito.isFavorito(usuarioId, filmeId);
    return sendSuccess(res, { isFavorito }, "Verificação concluída");
  } catch (error) {
    console.error("Erro ao verificar favorito:", error);
    return sendError(res, "Erro ao verificar favorito", "INTERNAL_ERROR", 500);
  }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/favoritos/filme/:filmeId/count
// ────────────────────────────────────────────────────────────────────────────
router.get("/filme/:filmeId/count", async (req, res) => {
  try {
    const { filmeId } = req.params;
    const total = await Favorito.countByFilme(filmeId);
    return sendSuccess(
      res,
      { filme_id: filmeId, total_favoritos: total },
      "Contagem obtida com sucesso"
    );
  } catch (error) {
    console.error("Erro ao contar favoritos:", error);
    return sendError(res, "Erro ao contar favoritos", "INTERNAL_ERROR", 500);
  }
});

export default router;
