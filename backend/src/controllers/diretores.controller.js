import { getDiretores, salvarDiretor } from "../services/diretores.service.js";
import { validateDiretor } from "../utils/validation.js";
import { sendSuccess, sendError } from "../utils/response.js";

export async function listarDiretoresController(req, res) {
  try {
    const resultado = await getDiretores();

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
      resultado.message || "Diretores obtidos com sucesso",
      200
    );
  } catch (error) {
    console.error("Erro ao buscar diretores:", error);
    return sendError(res, "Erro ao buscar diretores", "INTERNAL_ERROR", 500);
  }
}

export async function criarDiretorController(req, res) {
  try {
    const validacao = validateDiretor(req.body);

    if (!validacao.valid) {
      return sendError(
        res,
        "Dados de entrada inválidos",
        "VALIDATION_ERROR",
        400,
        validacao.errors
      );
    }

    const resultado = await salvarDiretor(req.body);

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
    console.error("Erro ao criar diretor:", error);
    return sendError(res, "Erro ao criar diretor", "INTERNAL_ERROR", 500);
  }
}

export { listarDiretoresController as listarDiretores };
