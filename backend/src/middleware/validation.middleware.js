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
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export function validateFilmeMiddleware(req, res, next) {
  const { titulo, diretor_id, ano_lancamento, genero, sinopse } = req.body;

  const errors = {};

  // Validate titulo
  if (!titulo || typeof titulo !== "string" || titulo.trim().length === 0) {
    errors.titulo = "Título é obrigatório e deve ser texto";
  }

  // Validate diretor_id
  if (!diretor_id || Number.isNaN(Number(diretor_id))) {
    errors.diretor_id = "Diretor ID é obrigatório e deve ser numérico";
  }

  // Validate ano_lancamento (opcional mas se presente deve ser número)
  if (ano_lancamento && Number.isNaN(Number(ano_lancamento))) {
    errors.ano_lancamento = "Ano deve ser numérico";
  }

  // Validate genero
  if (!genero || typeof genero !== "string" || genero.trim().length === 0) {
    errors.genero = "Gênero é obrigatório e deve ser texto";
  }

  // Validate sinopse (opcional)
  if (sinopse && typeof sinopse !== "string") {
    errors.sinopse = "Sinopse deve ser texto";
  }

  // Se houver erros, retornar resposta de validação
  if (Object.keys(errors).length > 0) {
    return sendValidationError(res, errors);
  }

  next();
}

/**
 * Middleware para validar dados de Diretor
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export function validateDiretorMiddleware(req, res, next) {
  const { nome, data_nascimento, nacionalidade } = req.body;

  const errors = {};

  // Validate nome
  if (!nome || !isValidString(nome, 3, 255)) {
    errors.nome = "Nome é obrigatório e deve ter entre 3 e 255 caracteres";
  }

  // Validate data_nascimento (opcional)
  if (data_nascimento && isNaN(new Date(data_nascimento).getTime())) {
    errors.data_nascimento = "Data deve ser válida (formato: YYYY-MM-DD)";
  }

  // Validate nacionalidade (opcional)
  if (nacionalidade && !isValidString(nacionalidade, 2, 100)) {
    errors.nacionalidade = "Nacionalidade deve ter entre 2 e 100 caracteres";
  }

  // Se houver erros, retornar resposta de validação
  if (Object.keys(errors).length > 0) {
    return sendValidationError(res, errors);
  }

  next();
}

/**
 * Middleware para validar dados de Contato
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export function validateContatoMiddleware(req, res, next) {
  const { nome, email, mensagem } = req.body;

  const errors = {};

  // Validate nome
  if (!nome || typeof nome !== "string" || nome.trim().length === 0) {
    errors.nome = "Nome é obrigatório";
  }

  // Validate email
  if (!email || typeof email !== "string") {
    errors.email = "Email é obrigatório";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Email inválido";
    }
  }

  // Validate mensagem
  if (
    !mensagem ||
    typeof mensagem !== "string" ||
    mensagem.trim().length === 0
  ) {
    errors.mensagem = "Mensagem é obrigatória";
  }

  // Se houver erros, retornar resposta de validação
  if (Object.keys(errors).length > 0) {
    return sendValidationError(res, errors);
  }

  next();
}

/**
 * Middleware para validar dados de Ator
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export function validateAtorMiddleware(req, res, next) {
  const { nome, data_nascimento } = req.body;

  const errors = {};

  // Validate nome
  if (!nome || typeof nome !== "string" || nome.trim().length === 0) {
    errors.nome = "Nome é obrigatório e deve ser texto";
  }

  // Validate data_nascimento (opcional)
  if (data_nascimento && isNaN(new Date(data_nascimento).getTime())) {
    errors.data_nascimento = "Data deve ser válida (formato: YYYY-MM-DD)";
  }

  // Se houver erros, retornar resposta de validação
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
