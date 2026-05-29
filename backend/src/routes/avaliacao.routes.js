// ========================================
// ROTAS DE AVALIAÇÕES
// ========================================

import express from "express";
import Avaliacao from "../models/avaliacao.model.js";

const router = express.Router();

// GET - Obter avaliações de um filme
router.get("/filme/:filmeId", async (req, res) => {
  try {
    const { filmeId } = req.params;
    const avaliacoes = await Avaliacao.getByFilmeId(filmeId);

    res.json({
      success: true,
      data: avaliacoes,
      total: avaliacoes.length,
    });
  } catch (error) {
    console.error("Erro ao obter avaliações:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao obter avaliações",
      error: error.message,
    });
  }
});

// GET - Obter média de um filme
router.get("/filme/:filmeId/media", async (req, res) => {
  try {
    const { filmeId } = req.params;
    const media = await Avaliacao.getMediaFilme(filmeId);

    res.json({
      success: true,
      data: media,
    });
  } catch (error) {
    console.error("Erro ao obter média:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao obter média",
      error: error.message,
    });
  }
});

// GET - Obter avaliação do usuário para um filme
router.get("/usuario/:usuarioId/filme/:filmeId", async (req, res) => {
  try {
    const { usuarioId, filmeId } = req.params;
    const avaliacao = await Avaliacao.getByUsuarioEFilme(usuarioId, filmeId);

    res.json({
      success: true,
      data: avaliacao,
    });
  } catch (error) {
    console.error("Erro ao obter avaliação:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao obter avaliação",
      error: error.message,
    });
  }
});

// POST - Criar/Atualizar avaliação
router.post("/", async (req, res) => {
  try {
    const { filme_id, usuario_id, estrelas, comentario } = req.body;

    if (!filme_id || !usuario_id || !estrelas) {
      return res.status(400).json({
        success: false,
        message: "filme_id, usuario_id e estrelas são obrigatórios",
      });
    }

    if (estrelas < 1 || estrelas > 5) {
      return res.status(400).json({
        success: false,
        message: "Estrelas devem estar entre 1 e 5",
      });
    }

    // Verificar se já existe avaliação
    const avaliacaoExistente = await Avaliacao.getByUsuarioEFilme(
      usuario_id,
      filme_id
    );

    let novaAvaliacao;
    if (avaliacaoExistente) {
      // Atualizar
      novaAvaliacao = await Avaliacao.update(avaliacaoExistente.id, {
        estrelas,
        comentario,
      });
    } else {
      // Criar nova
      novaAvaliacao = await Avaliacao.create({
        filme_id,
        usuario_id,
        estrelas,
        comentario,
      });
    }

    res.status(201).json({
      success: true,
      message: "Avaliação salva com sucesso",
      data: novaAvaliacao,
    });
  } catch (error) {
    console.error("Erro ao salvar avaliação:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao salvar avaliação",
      error: error.message,
    });
  }
});

// DELETE - Deletar avaliação
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Avaliacao.delete(id);

    res.json({
      success: true,
      message: "Avaliação deletada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar avaliação:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao deletar avaliação",
      error: error.message,
    });
  }
});

export default router;
