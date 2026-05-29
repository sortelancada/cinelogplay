// src/middleware/validation.middleware.js
import {
  validateFilme,
  validateContato,
  validateDiretor,
} from "../utils/validation.js";
import { sendValidationError } from "../utils/response.js";

export function validateFilmeMiddleware(req, res, next) {
  const { valid, errors } = validateFilme(req.body);
  if (!valid) return sendValidationError(res, errors);
  next();
}

export function validateContatoMiddleware(req, res, next) {
  const { valid, errors } = validateContato(req.body);
  if (!valid) return sendValidationError(res, errors);
  next();
}

export function validateDiretorMiddleware(req, res, next) {
  const { valid, errors } = validateDiretor(req.body);
  if (!valid) return sendValidationError(res, errors);
  next();
}
