// ========================================
// ROTAS DE FILMES
// ========================================

import express from "express";
import Filmes from "../models/filmes.model.js";
import Avaliacao from "../models/avaliacao.model.js";

const router = express.Router();

// GET - Obter todos os filmes
router.get("/", async (req, res) => {
  try {
    const filmes = await Filmes.getAll();
    res.json({
      success: true,
      data: filmes,
      total: filmes.length,
    });
  } catch (error) {
    console.error("Erro ao obter filmes:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao obter filmes",
      error: error.message,
    });
  }
});

// GET - Obter filme por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const filme = await Filmes.getById(id);

    if (!filme) {
      return res.status(404).json({
        success: false,
        message: "Filme não encontrado",
      });
    }

    // Obter avaliação média
    const avaliacao = await Avaliacao.getMediaFilme(id);

    res.json({
      success: true,
      data: {
        ...filme,
        avaliacao,
      },
    });
  } catch (error) {
    console.error("Erro ao obter filme:", error);
    res.status(500).json({
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
    const filmes = await Filmes.search(termo);

    res.json({
      success: true,
      data: filmes,
      total: filmes.length,
    });
  } catch (error) {
    console.error("Erro ao pesquisar filmes:", error);
    res.status(500).json({
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
    const filmes = await Filmes.getByGenero(genero);

    res.json({
      success: true,
      data: filmes,
      total: filmes.length,
    });
  } catch (error) {
    console.error("Erro ao obter filmes por gênero:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao obter filmes por gênero",
      error: error.message,
    });
  }
});

// GET - Obter filmes com avaliação
router.get("/com-avaliacao", async (req, res) => {
  try {
    const filmes = await Filmes.getComAvaliacao();

    res.json({
      success: true,
      data: filmes,
      total: filmes.length,
    });
  } catch (error) {
    console.error("Erro ao obter filmes com avaliação:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao obter filmes com avaliação",
      error: error.message,
    });
  }
});

// POST - Criar novo filme
router.post("/", async (req, res) => {
  try {
    const filmData = req.body;

    // Validações básicas
    if (!filmData.titulo) {
      return res.status(400).json({
        success: false,
        message: "Título é obrigatório",
      });
    }

    const novoFilme = await Filmes.create(filmData);

    res.status(201).json({
      success: true,
      message: "Filme criado com sucesso",
      data: novoFilme,
    });
  } catch (error) {
    console.error("Erro ao criar filme:", error);
    res.status(500).json({
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
    const filmData = req.body;

    // Verificar se filme existe
    const filme = await Filmes.getById(id);
    if (!filme) {
      return res.status(404).json({
        success: false,
        message: "Filme não encontrado",
      });
    }

    const filmeAtualizado = await Filmes.update(id, filmData);

    res.json({
      success: true,
      message: "Filme atualizado com sucesso",
      data: filmeAtualizado,
    });
  } catch (error) {
    console.error("Erro ao atualizar filme:", error);
    res.status(500).json({
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

    // Verificar se filme existe
    const filme = await Filmes.getById(id);
    if (!filme) {
      return res.status(404).json({
        success: false,
        message: "Filme não encontrado",
      });
    }

    await Filmes.delete(id);

    res.json({
      success: true,
      message: "Filme deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar filme:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao deletar filme",
      error: error.message,
    });
  }
});

export default router;
