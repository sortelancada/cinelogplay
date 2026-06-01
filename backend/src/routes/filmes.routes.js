import express from "express";

import { getFilmesController } from "../controllers/filmes.controller.js";

import {
  getFilmeById,
  searchFilmes,
  getFilmesByGenero,
  getFilmesComAvaliacao,
  salvarFilme,
  updateFilme,
  deleteFilme,
} from "../services/filmes.service.js";

import { getMediaFilme } from "../services/avaliacao.service.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { validateFilmeMiddleware } from "../middleware/validation.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// ============================================
// GET ROUTES (SEM AUTENTICAÇÃO)
// ============================================

// GET - Listar todos os filmes
router.get("/", getFilmesController);

// GET - Filmes com avaliação (DEVE VIR ANTES DE /:id)
router.get("/com-avaliacao", async (req, res) => {
  try {
    const filmes = await getFilmesComAvaliacao();

    return sendSuccess(
      res,
      filmes,
      "Filmes com avaliação obtidos com sucesso",
      200
    );
  } catch (error) {
    console.error("Erro ao obter filmes com avaliação:", error);
    return sendError(
      res,
      "Erro ao obter filmes com avaliação",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

// GET - Pesquisar filmes
router.get("/search/:termo", async (req, res) => {
  try {
    const { termo } = req.params;

    const filmes = await searchFilmes(termo);

    return sendSuccess(res, filmes, "Pesquisa realizada com sucesso", 200);
  } catch (error) {
    return sendError(
      res,
      "Erro ao pesquisar filmes",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

// GET - Obter filmes por gênero
router.get("/genero/:genero", async (req, res) => {
  try {
    const { genero } = req.params;

    const filmes = await getFilmesByGenero(genero);

    return sendSuccess(
      res,
      filmes,
      "Filmes obtidos por gênero com sucesso",
      200
    );
  } catch (error) {
    return sendError(
      res,
      "Erro ao obter filmes por gênero",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

// GET - Obter filme por ID (DEVE VIR POR ÚLTIMO ENTRE GET)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const filme = await getFilmeById(Number(id));

    if (!filme) {
      return sendError(res, "Filme não encontrado", "NOT_FOUND", 404);
    }

    const media = await getMediaFilme(id);

    return sendSuccess(
      res,
      {
        ...filme,
        avaliacao: media?.data || null,
      },
      "Filme obtido com sucesso",
      200
    );
  } catch (error) {
    console.error("Erro ao obter filme:", error);
    return sendError(
      res,
      "Erro ao obter filme",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

// ============================================
// POST ROUTE (COM AUTENTICAÇÃO)
// ============================================

// POST - Criar novo filme
router.post("/", authMiddleware, validateFilmeMiddleware, async (req, res) => {
  try {
    const filmData = req.body;

    const resultado = await salvarFilme(filmData);

    if (!resultado.success) {
      return sendError(
        res,
        resultado.error || "Erro ao criar filme",
        "CREATION_ERROR",
        500,
        resultado.details
      );
    }

    const novoFilme = resultado.data;

    return sendSuccess(res, novoFilme, "Filme criado com sucesso", 201);
  } catch (error) {
    return sendError(
      res,
      "Erro ao criar filme",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

// ============================================
// PUT ROUTE (COM AUTENTICAÇÃO)
// ============================================

// PUT - Atualizar filme
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const filme = await getFilmeById(Number(id));

    if (!filme) {
      return sendError(res, "Filme não encontrado", "NOT_FOUND", 404);
    }

    const filmeAtualizado = await updateFilme(Number(id), req.body);

    return sendSuccess(
      res,
      filmeAtualizado,
      "Filme atualizado com sucesso",
      200
    );
  } catch (error) {
    return sendError(
      res,
      "Erro ao atualizar filme",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

// ============================================
// DELETE ROUTE (COM AUTENTICAÇÃO)
// ============================================

// DELETE - Deletar filme
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const filme = await getFilmeById(Number(id));

    if (!filme) {
      return sendError(res, "Filme não encontrado", "NOT_FOUND", 404);
    }

    await deleteFilme(Number(id));

    return sendSuccess(res, null, "Filme deletado com sucesso", 200);
  } catch (error) {
    return sendError(
      res,
      "Erro ao deletar filme",
      "INTERNAL_ERROR",
      500,
      error.message
    );
  }
});

export default router;
