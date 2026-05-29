/**
 * Middleware centralizado para tratamento de erros
 * Captura erros de toda a aplicação e retorna no padrão correto
 */

import { sendError } from "../utils/response.js";

/**
 * Middleware de tratamento de erros
 * Deve ser o último middleware no server.js
 */
export function errorHandler(err, req, res, next) {
  console.error("ERRO:", err);

  // Erro de validação (exemplo: JSON inválido)
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return sendError(
      res,
      "JSON inválido no corpo da requisição",
      "INVALID_JSON",
      400
    );
  }

  // Erro de banco de dados
  if (err.name === "QueryResultError" || err.code === "42P01") {
    return sendError(
      res,
      "Erro ao acessar banco de dados",
      "DATABASE_ERROR",
      503
    );
  }

  // Erro de conexão
  if (err.code === "ECONNREFUSED") {
    return sendError(
      res,
      "Banco de dados indisponível",
      "CONNECTION_ERROR",
      503
    );
  }

  // Erro genérico
  return sendError(
    res,
    err.message || "Erro interno do servidor",
    err.code || "INTERNAL_ERROR",
    err.status || 500
  );
}

/**
 * Middleware para capturar rotas não encontradas
 * Deve vir ANTES do errorHandler
 */
export function notFoundHandler(req, res, next) {
  sendError(
    res,
    `Rota não encontrada: ${req.method} ${req.path}`,
    "NOT_FOUND",
    404
  );
}
