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
  // Aceita `ano` (frontend admin) ou `ano_lancamento` (padrão DB)
  const {
    titulo,
    diretor_id,
    ano_lancamento,
    ano,
    genero,
    sinopse,
    duracao,
  } = req.body;

  const anoEfetivo = ano_lancamento ?? ano;
  const errors = {};

  if (!titulo || typeof titulo !== "string" || titulo.trim().length === 0) {
    errors.titulo = "Título é obrigatório e deve ser texto";
  }

  // diretor_id é opcional (pode criar filme sem diretor)
  if (diretor_id !== undefined && diretor_id !== null && diretor_id !== "" &&
      Number.isNaN(Number(diretor_id))) {
    errors.diretor_id = "Diretor ID deve ser numérico quando informado";
  }

  // ano é opcional mas deve ser numérico quando informado
  if (anoEfetivo !== undefined && anoEfetivo !== null && anoEfetivo !== "" &&
      Number.isNaN(Number(anoEfetivo))) {
    errors.ano_lancamento = "Ano de lançamento deve ser numérico quando informado";
  }

  if (!genero || typeof genero !== "string" || genero.trim().length === 0) {
    errors.genero = "Gênero é obrigatório e deve ser texto";
  }

  if (sinopse && typeof sinopse !== "string") {
    errors.sinopse = "Sinopse deve ser texto";
  }

  // duracao é opcional — DB armazena como VARCHAR(20), aceita "120 min" ou número
  if (duracao !== undefined && duracao !== null && duracao !== "" &&
      typeof duracao !== "string" && typeof duracao !== "number") {
    errors.duracao = "Duração deve ser texto ou número quando informada";
  }

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
