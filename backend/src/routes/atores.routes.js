// ========================================
// ROTAS DE ATORES
// ========================================

import express from "express";
import Ator from "../models/atores.model.js";

const router = express.Router();

// GET - Obter todos os atores
router.get("/", async (req, res) => {
  try {
    const atores = await Ator.getAll();

    res.json({
      success: true,
      data: atores,
      total: atores.length,
    });
  } catch (error) {
    console.error("Erro ao obter atores:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao obter atores",
      error: error.message,
    });
  }
});

// GET - Obter ator por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ator = await Ator.getById(id);

    if (!ator) {
      return res.status(404).json({
        success: false,
        message: "Ator não encontrado",
      });
    }

    // Obter filmes do ator
    const filmes = await Ator.getFilmes(id);

    res.json({
      success: true,
      data: {
        ...ator,
        filmes,
      },
    });
  } catch (error) {
    console.error("Erro ao obter ator:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao obter ator",
      error: error.message,
    });
  }
});

// POST - Criar novo ator
router.post("/", async (req, res) => {
  try {
    const atorData = req.body;

    if (!atorData.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome é obrigatório",
      });
    }

    const novoAtor = await Ator.create(atorData);

    res.status(201).json({
      success: true,
      message: "Ator criado com sucesso",
      data: novoAtor,
    });
  } catch (error) {
    console.error("Erro ao criar ator:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao criar ator",
      error: error.message,
    });
  }
});

// PUT - Atualizar ator
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const atorData = req.body;

    const ator = await Ator.getById(id);
    if (!ator) {
      return res.status(404).json({
        success: false,
        message: "Ator não encontrado",
      });
    }

    const atorAtualizado = await Ator.update(id, atorData);

    res.json({
      success: true,
      message: "Ator atualizado com sucesso",
      data: atorAtualizado,
    });
  } catch (error) {
    console.error("Erro ao atualizar ator:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar ator",
      error: error.message,
    });
  }
});

// DELETE - Deletar ator
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const ator = await Ator.getById(id);
    if (!ator) {
      return res.status(404).json({
        success: false,
        message: "Ator não encontrado",
      });
    }

    await Ator.delete(id);

    res.json({
      success: true,
      message: "Ator deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar ator:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao deletar ator",
      error: error.message,
    });
  }
});

export default router;
