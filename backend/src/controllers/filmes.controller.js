// backend/src/controllers/filmes.controller.js

import { getFilmes, salvarFilme } from "../services/filmes.service.js";
import { validateFilme } from "../utils/validation.js";
import { sendSuccess, sendError } from "../utils/response.js";

export async function getFilmesController(req, res) {
  try {
    const resultado = await getFilmes();

    if (resultado.success === false) {
      return sendError(
        res,
        resultado.error,
        resultado.code,
        500,
        resultado.details
      );
    }

    return sendSuccess(
      res,
      resultado.data,
      resultado.message || "Filmes obtidos com sucesso",
      200
    );
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return sendError(res, "Erro ao buscar filmes", "INTERNAL_ERROR", 500);
  }
}

export async function criarFilmeController(req, res) {
  try {
    const validacao = validateFilme(req.body);

    if (!validacao.valid) {
      return sendError(
        res,
        "Dados de entrada inválidos",
        "VALIDATION_ERROR",
        400,
        validacao.errors
      );
    }

    const resultado = await salvarFilme(req.body);

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
    console.error("Erro ao criar filme:", error);
    return sendError(res, "Erro ao criar filme", "INTERNAL_ERROR", 500);
  }
}
