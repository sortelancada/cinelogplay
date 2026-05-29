import { salvarMensagem } from "../services/contato.service.js";
import { validateContactData, getClientIp } from "../utils/validation.js";
import { sendSuccess, sendError } from "../utils/response.js";

export async function enviarMensagem(req, res) {
  try {
    const { nome, email, mensagem } = req.body;

    const validacao = validateContactData({ nome, email, mensagem });

    if (!validacao.isValid) {
      return sendError(
        res,
        "Dados de entrada inválidos",
        "VALIDATION_ERROR",
        400,
        validacao.errors
      );
    }

    const clientIp = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "unknown";

    const resultado = await salvarMensagem(
      { nome, email, mensagem },
      clientIp,
      userAgent
    );

    return sendSuccess(res, resultado, "Mensagem enviada com sucesso", 201);
  } catch (error) {
    console.error("Erro ao enviar contato:", error);

    return sendError(res, "Erro ao enviar mensagem", "INTERNAL_ERROR", 500);
  }
}
