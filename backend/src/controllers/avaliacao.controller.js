// backend/src/controllers/avaliacao.controller.js

import {
  getAvaliacoesByFilme,
  getMediaFilme,
  getAvaliacaoUsuario,
  salvarAvaliacao,
  deletarAvaliacao,
} from "../services/avaliacao.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export async function listarAvaliacoesFilme(req, res) {
  const { filmeId } = req.params;

  const resultado = await getAvaliacoesByFilme(filmeId);

  if (!resultado.success) {
    return sendError(
      res,
      "Erro ao obter avaliações",
      "INTERNAL_ERROR",
      500,
      resultado.error
    );
  }

  return sendSuccess(
    res,
    resultado.data,
    "Avaliações obtidas com sucesso",
    200
  );
}

export async function mediaFilme(req, res) {
  const { filmeId } = req.params;

  const resultado = await getMediaFilme(filmeId);

  if (!resultado.success) {
    return sendError(
      res,
      "Erro ao obter média",
      "INTERNAL_ERROR",
      500,
      resultado.error
    );
  }

  return sendSuccess(res, resultado.data, "Média obtida com sucesso", 200);
}

export async function avaliacaoUsuario(req, res) {
  const { usuarioId, filmeId } = req.params;

  const resultado = await getAvaliacaoUsuario(usuarioId, filmeId);

  if (!resultado.success) {
    return sendError(
      res,
      "Erro ao obter avaliação do usuário",
      "INTERNAL_ERROR",
      500,
      resultado.error
    );
  }

  return sendSuccess(
    res,
    resultado.data,
    "Avaliação do usuário obtida com sucesso",
    200
  );
}

export async function criarOuAtualizarAvaliacao(req, res) {
  const resultado = await salvarAvaliacao(req.body);

  if (!resultado.success) {
    return sendError(res, resultado.error, "VALIDATION_ERROR", 400);
  }

  return sendSuccess(res, resultado.data, resultado.message, 201);
}

export async function deletarAvaliacaoController(req, res) {
  const { id } = req.params;

  const resultado = await deletarAvaliacao(id);

  if (!resultado.success) {
    return sendError(
      res,
      "Erro ao deletar avaliação",
      "INTERNAL_ERROR",
      500,
      resultado.error
    );
  }

  return sendSuccess(res, null, resultado.message, 200);
}
