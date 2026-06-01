// ========================================
// ROTAS DE ATORES
// ========================================

import express from "express";
import Ator from "../models/atores.model.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { validateAtorMiddleware } from "../middleware/validation.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// ============================================
// GET ROUTES (SEM AUTENTICAÇÃO)
// ============================================

// GET - Obter todos os atores
router.get("/", async (req, res) => {
  try {
    const atores = await Ator.getAll();

    return sendSuccess(res, atores, "Atores obtidos com sucesso", 200);
  } catch (error) {
    console.error("Erro ao obter atores:", error);
    return sendError(
      res,
      "Erro ao obter atores",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

// GET - Obter ator por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ator = await Ator.getById(id);

    if (!ator) {
      return sendError(res, "Ator não encontrado", "NOT_FOUND", 404);
    }

    // Obter filmes do ator
    const filmes = await Ator.getFilmes(id);

    return sendSuccess(
      res,
      {
        ...ator,
        filmes,
      },
      "Ator obtido com sucesso",
      200
    );
  } catch (error) {
    console.error("Erro ao obter ator:", error);
    return sendError(
      res,
      "Erro ao obter ator",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

// ============================================
// POST ROUTE (COM AUTENTICAÇÃO)
// ============================================

// POST - Criar novo ator
router.post("/", authMiddleware, validateAtorMiddleware, async (req, res) => {
  try {
    const atorData = req.body;

    const novoAtor = await Ator.create(atorData);

    return sendSuccess(res, novoAtor, "Ator criado com sucesso", 201);
  } catch (error) {
    console.error("Erro ao criar ator:", error);
    return sendError(
      res,
      "Erro ao criar ator",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

// ============================================
// PUT ROUTE (COM AUTENTICAÇÃO)
// ============================================

// PUT - Atualizar ator
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const atorData = req.body;

    const ator = await Ator.getById(id);
    if (!ator) {
      return sendError(res, "Ator não encontrado", "NOT_FOUND", 404);
    }

    const atorAtualizado = await Ator.update(id, atorData);

    return sendSuccess(res, atorAtualizado, "Ator atualizado com sucesso", 200);
  } catch (error) {
    console.error("Erro ao atualizar ator:", error);
    return sendError(
      res,
      "Erro ao atualizar ator",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

// ============================================
// DELETE ROUTE (COM AUTENTICAÇÃO)
// ============================================

// DELETE - Deletar ator
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const ator = await Ator.getById(id);
    if (!ator) {
      return sendError(res, "Ator não encontrado", "NOT_FOUND", 404);
    }

    await Ator.delete(id);

    return sendSuccess(res, null, "Ator deletado com sucesso", 200);
  } catch (error) {
    console.error("Erro ao deletar ator:", error);
    return sendError(
      res,
      "Erro ao deletar ator",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

export default router;
