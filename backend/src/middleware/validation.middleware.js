/**
 * ============================================
 * VALIDATION MIDDLEWARE
 * ============================================
 * Middleware functions for validating request data
 * before processing in route handlers
 */

import { sendValidationError } from "../utils/response.js";
import { isValidString } from "../utils/validation.js";

/**
 * Middleware para validar dados de Filme
 */
export function validateFilmeMiddleware(req, res, next) {
  const { titulo, diretor_id, ano_lancamento, genero, sinopse, duracao } =
    req.body;

  const errors = {};

  // Validate titulo
  if (!titulo || typeof titulo !== "string" || titulo.trim().length === 0) {
    errors.titulo = "Título é obrigatório e deve ser texto";
  }

  // Validate diretor_id
  if (!diretor_id || Number.isNaN(Number(diretor_id))) {
    errors.diretor_id = "Diretor ID é obrigatório e deve ser numérico";
  }

  // Validate ano_lancamento
  if (!ano_lancamento || Number.isNaN(Number(ano_lancamento))) {
    errors.ano_lancamento =
      "Ano de lançamento é obrigatório e deve ser numérico";
  }

  // Validate genero
  if (!genero || typeof genero !== "string" || genero.trim().length === 0) {
    errors.genero = "Gênero é obrigatório e deve ser texto";
  }

  // Validate sinopse (opcional)
  if (sinopse && typeof sinopse !== "string") {
    errors.sinopse = "Sinopse deve ser texto";
  }

  // Validate duracao (OBRIGATÓRIO)
  if (
    duracao === undefined ||
    duracao === null ||
    Number.isNaN(Number(duracao))
  ) {
    errors.duracao = "Duração é obrigatória e deve ser numérica";
  }

  // Se houver erros, retornar resposta de validação
  if (Object.keys(errors).length > 0) {
    return sendValidationError(res, errors);
  }

  next();
}

/**
 * Middleware para validar dados de Diretor
 */
export function validateDiretorMiddleware(req, res, next) {
  const { nome, data_nascimento, nacionalidade } = req.body;

  const errors = {};

  if (!nome || !isValidString(nome, 3, 255)) {
    errors.nome = "Nome é obrigatório e deve ter entre 3 e 255 caracteres";
  }

  if (data_nascimento && isNaN(new Date(data_nascimento).getTime())) {
    errors.data_nascimento = "Data deve ser válida (formato: YYYY-MM-DD)";
  }

  if (nacionalidade && !isValidString(nacionalidade, 2, 100)) {
    errors.nacionalidade = "Nacionalidade deve ter entre 2 e 100 caracteres";
  }

  if (Object.keys(errors).length > 0) {
    return sendValidationError(res, errors);
  }

  next();
}

/**
 * Middleware para validar dados de Contato
 */
export function validateContatoMiddleware(req, res, next) {
  const { nome, email, mensagem } = req.body;

  const errors = {};

  if (!nome || typeof nome !== "string" || nome.trim().length === 0) {
    errors.nome = "Nome é obrigatório";
  }

  if (!email || typeof email !== "string") {
    errors.email = "Email é obrigatório";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Email inválido";
    }
  }

  if (
    !mensagem ||
    typeof mensagem !== "string" ||
    mensagem.trim().length === 0
  ) {
    errors.mensagem = "Mensagem é obrigatória";
  }

  if (Object.keys(errors).length > 0) {
    return sendValidationError(res, errors);
  }

  next();
}

/**
 * Middleware para validar dados de Ator
 */
export function validateAtorMiddleware(req, res, next) {
  const { nome, data_nascimento } = req.body;

  const errors = {};

  if (!nome || typeof nome !== "string" || nome.trim().length === 0) {
    errors.nome = "Nome é obrigatório e deve ser texto";
  }

  if (data_nascimento && isNaN(new Date(data_nascimento).getTime())) {
    errors.data_nascimento = "Data deve ser válida (formato: YYYY-MM-DD)";
  }

  if (Object.keys(errors).length > 0) {
    return sendValidationError(res, errors);
  }

  next();
}

export default {
  validateFilmeMiddleware,
  validateDiretorMiddleware,
  validateContatoMiddleware,
  validateAtorMiddleware,
};
