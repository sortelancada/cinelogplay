// ========================================
// ROTAS DE DIRETORES
// ========================================

import express from "express";
import Diretor from "../models/diretores.model.js";

const router = express.Router();

// GET - Obter todos os diretores
router.get("/", async (req, res) => {
  try {
    const diretores = await Diretor.getAll();

    res.json({
      success: true,
      data: diretores,
      total: diretores.length,
    });
  } catch (error) {
    console.error("Erro ao obter diretores:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao obter diretores",
      error: error.message,
    });
  }
});

// GET - Obter diretor por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const diretor = await Diretor.getById(id);

    if (!diretor) {
      return res.status(404).json({
        success: false,
        message: "Diretor não encontrado",
      });
    }

    // Obter filmes do diretor
    const filmes = await Diretor.getFilmes(id);

    res.json({
      success: true,
      data: {
        ...diretor,
        filmes,
      },
    });
  } catch (error) {
    console.error("Erro ao obter diretor:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao obter diretor",
      error: error.message,
    });
  }
});

// POST - Criar novo diretor
router.post("/", async (req, res) => {
  try {
    const diretorData = req.body;

    if (!diretorData.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome é obrigatório",
      });
    }

    const novoDiretor = await Diretor.create(diretorData);

    res.status(201).json({
      success: true,
      message: "Diretor criado com sucesso",
      data: novoDiretor,
    });
  } catch (error) {
    console.error("Erro ao criar diretor:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao criar diretor",
      error: error.message,
    });
  }
});

// PUT - Atualizar diretor
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const diretorData = req.body;

    const diretor = await Diretor.getById(id);
    if (!diretor) {
      return res.status(404).json({
        success: false,
        message: "Diretor não encontrado",
      });
    }

    const diretorAtualizado = await Diretor.update(id, diretorData);

    res.json({
      success: true,
      message: "Diretor atualizado com sucesso",
      data: diretorAtualizado,
    });
  } catch (error) {
    console.error("Erro ao atualizar diretor:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar diretor",
      error: error.message,
    });
  }
});

// DELETE - Deletar diretor
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const diretor = await Diretor.getById(id);
    if (!diretor) {
      return res.status(404).json({
        success: false,
        message: "Diretor não encontrado",
      });
    }

    await Diretor.delete(id);

    res.json({
      success: true,
      message: "Diretor deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar diretor:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao deletar diretor",
      error: error.message,
    });
  }
});

export default router;
