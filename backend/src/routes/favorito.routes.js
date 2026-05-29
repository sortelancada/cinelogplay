// ========================================
// ROTAS DE FAVORITOS
// ========================================

import express from "express";
import Favorito from "../models/favorito.model.js";

const router = express.Router();

// GET - Obter favoritos do usuário
router.get("/usuario/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const favoritos = await Favorito.getByUsuario(usuarioId);

    res.json({
      success: true,
      data: favoritos,
      total: favoritos.length,
    });
  } catch (error) {
    console.error("Erro ao obter favoritos:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao obter favoritos",
      error: error.message,
    });
  }
});

// GET - Verificar se é favorito
router.get("/usuario/:usuarioId/filme/:filmeId", async (req, res) => {
  try {
    const { usuarioId, filmeId } = req.params;
    const isFavorito = await Favorito.isFavorito(usuarioId, filmeId);

    res.json({
      success: true,
      isFavorito,
    });
  } catch (error) {
    console.error("Erro ao verificar favorito:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao verificar favorito",
      error: error.message,
    });
  }
});

// POST - Adicionar favorito
router.post("/", async (req, res) => {
  try {
    const { usuario_id, filme_id } = req.body;

    if (!usuario_id || !filme_id) {
      return res.status(400).json({
        success: false,
        message: "usuario_id e filme_id são obrigatórios",
      });
    }

    // Verificar se já é favorito
    const isFavorito = await Favorito.isFavorito(usuario_id, filme_id);
    if (isFavorito) {
      return res.status(400).json({
        success: false,
        message: "Este filme já está nos favoritos",
      });
    }

    const novoFavorito = await Favorito.create(usuario_id, filme_id);

    res.status(201).json({
      success: true,
      message: "Adicionado aos favoritos",
      data: novoFavorito,
    });
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao adicionar favorito",
      error: error.message,
    });
  }
});

// DELETE - Remover favorito
router.delete("/:usuarioId/:filmeId", async (req, res) => {
  try {
    const { usuarioId, filmeId } = req.params;

    const isFavorito = await Favorito.isFavorito(usuarioId, filmeId);
    if (!isFavorito) {
      return res.status(404).json({
        success: false,
        message: "Este filme não está nos favoritos",
      });
    }

    await Favorito.delete(usuarioId, filmeId);

    res.json({
      success: true,
      message: "Removido dos favoritos",
    });
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao remover favorito",
      error: error.message,
    });
  }
});

// GET - Contar favoritos de um filme
router.get("/filme/:filmeId/count", async (req, res) => {
  try {
    const { filmeId } = req.params;
    const total = await Favorito.countByFilme(filmeId);

    res.json({
      success: true,
      data: {
        filme_id: filmeId,
        total_favoritos: total,
      },
    });
  } catch (error) {
    console.error("Erro ao contar favoritos:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao contar favoritos",
      error: error.message,
    });
  }
});

export default router;
