import express from "express";

import { getFilmesController } from "../controllers/filmes.controller.js";

import {
  getFilmeById,
  searchFilmes,
  getFilmesByGenero,
  getFilmesComAvaliacao,
} from "../services/filmes.service.js";

import { getMediaFilme } from "../services/avaliacao.service.js";

import Filmes from "../models/filmes.model.js"; // necessário enquanto estiver usando create/update/delete

const router = express.Router();

router.get("/", getFilmesController);

// GET - Obter filme por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const filme = await getFilmeById(Number(id));

    if (!filme) {
      return res.status(404).json({
        success: false,
        message: "Filme não encontrado",
      });
    }

    const media = await getMediaFilme(id);

    return res.json({
      success: true,
      data: {
        ...filme,
        avaliacao: media?.data || null,
      },
    });
  } catch (error) {
    console.error("Erro ao obter filme:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao obter filme",
      error: error.message,
    });
  }
});

// GET - Pesquisar filmes
router.get("/search/:termo", async (req, res) => {
  try {
    const { termo } = req.params;

    const filmes = await searchFilmes(termo);

    return res.json({
      success: true,
      data: filmes,
      total: filmes.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao pesquisar filmes",
      error: error.message,
    });
  }
});

// GET - Obter filmes por gênero
router.get("/genero/:genero", async (req, res) => {
  try {
    const { genero } = req.params;

    const filmes = await getFilmesByGenero(genero);

    return res.json({
      success: true,
      data: filmes,
      total: filmes.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao obter filmes por gênero",
      error: error.message,
    });
  }
});

// POST - Criar novo filme
router.post("/", async (req, res) => {
  try {
    const filmData = req.body;

    if (!filmData.titulo) {
      return res.status(400).json({
        success: false,
        message: "Título é obrigatório",
      });
    }

    const novoFilme = await Filmes.create(filmData);

    return res.status(201).json({
      success: true,
      message: "Filme criado com sucesso",
      data: novoFilme,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao criar filme",
      error: error.message,
    });
  }
});

// PUT - Atualizar filme
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const filme = await getFilmeById(Number(id));

    if (!filme) {
      return res.status(404).json({
        success: false,
        message: "Filme não encontrado",
      });
    }

    const filmeAtualizado = await Filmes.update(id, req.body);

    return res.json({
      success: true,
      message: "Filme atualizado com sucesso",
      data: filmeAtualizado,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar filme",
      error: error.message,
    });
  }
});

// DELETE - Deletar filme
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const filme = await getFilmeById(Number(id));

    if (!filme) {
      return res.status(404).json({
        success: false,
        message: "Filme não encontrado",
      });
    }

    await Filmes.delete(id);

    return res.json({
      success: true,
      message: "Filme deletado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao deletar filme",
      error: error.message,
    });
  }
});

router.get("/com-avaliacao", async (req, res) => {
  const filmes = await getFilmesComAvaliacao();

  res.json({
    success: true,
    data: filmes,
    total: filmes.length,
  });
});

export default router;
