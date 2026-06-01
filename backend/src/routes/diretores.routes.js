// ========================================
// ROTAS DE DIRETORES
// ========================================

import express from "express";
import {
  getDiretores,
  salvarDiretor,
  getDiretorById,
  getFilmesPorDiretor,
  updateDiretor,
  deleteDiretor,
} from "../services/diretores.service.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { validateDiretorMiddleware } from "../middleware/validation.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// ============================================
// GET ROUTES (SEM AUTENTICAÇÃO)
// ============================================

// GET - Obter todos os diretores
router.get("/", async (req, res) => {
  try {
    const resultado = await getDiretores();
    if (!resultado.success) {
      return sendError(
        res,
        resultado.error,
        resultado.code,
        500,
        resultado.details
      );
    }

    return sendSuccess(res, resultado.data, resultado.message, 200);
  } catch (error) {
    console.error("Erro ao obter diretores:", error);
    return sendError(
      res,
      "Erro ao obter diretores",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

// GET - Obter diretor por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const diretor = await getDiretorById(Number(id));
    if (!diretor) {
      return sendError(res, "Diretor não encontrado", "NOT_FOUND", 404);
    }

    const filmes = await getFilmesPorDiretor(Number(id));

    return sendSuccess(
      res,
      { ...diretor, filmes },
      "Diretor obtido com sucesso",
      200
    );
  } catch (error) {
    console.error("Erro ao obter diretor:", error);
    return sendError(
      res,
      "Erro ao obter diretor",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

// ============================================
// POST ROUTE (COM AUTENTICAÇÃO)
// ============================================

// POST - Criar novo diretor
router.post(
  "/",
  authMiddleware,
  validateDiretorMiddleware,
  async (req, res) => {
    try {
      const diretorData = req.body;

      const resultado = await salvarDiretor(diretorData);
      if (!resultado.success) {
        return sendError(
          res,
          resultado.error,
          resultado.code,
          500,
          resultado.details
        );
      }

      return sendSuccess(res, resultado.data, resultado.message, 201);
    } catch (error) {
      console.error("Erro ao criar diretor:", error);
      return sendError(
        res,
        "Erro ao criar diretor",
        "INTERNAL_ERROR",
        500,
        error.message
      );
    }
  }
);

// ============================================
// PUT ROUTE (COM AUTENTICAÇÃO)
// ============================================

// PUT - Atualizar diretor
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const diretorData = req.body;

    const diretor = await getDiretorById(Number(id));
    if (!diretor) {
      return sendError(res, "Diretor não encontrado", "NOT_FOUND", 404);
    }

    const diretorAtualizado = await updateDiretor(Number(id), diretorData);

    return sendSuccess(
      res,
      diretorAtualizado,
      "Diretor atualizado com sucesso",
      200
    );
  } catch (error) {
    console.error("Erro ao atualizar diretor:", error);
    return sendError(
      res,
      "Erro ao atualizar diretor",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

// ============================================
// DELETE ROUTE (COM AUTENTICAÇÃO)
// ============================================

// DELETE - Deletar diretor
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const diretor = await getDiretorById(Number(id));
    if (!diretor) {
      return sendError(res, "Diretor não encontrado", "NOT_FOUND", 404);
    }

    await deleteDiretor(Number(id));

    return sendSuccess(res, null, "Diretor deletado com sucesso", 200);
  } catch (error) {
    console.error("Erro ao deletar diretor:", error);
    return sendError(
      res,
      "Erro ao deletar diretor",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

export default router;
