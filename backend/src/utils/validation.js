/**
 * ============================================
 * INPUT VALIDATION UTILITIES
 * ============================================
 * Provides secure input validation and sanitization
 * to prevent injection attacks and invalid data
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
}

/**
 * Validate that a string is not empty
 * @param {string} value - String to validate
 * @param {number} minLength - Minimum length (default: 1)
 * @param {number} maxLength - Maximum length (default: 5000)
 * @returns {boolean} - True if valid
 */
export function isValidString(value, minLength = 1, maxLength = 5000) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}

/**
 * Validate that a value is a number
 * @param {any} value - Value to validate
 * @param {number} min - Minimum value (optional)
 * @param {number} max - Maximum value (optional)
 * @returns {boolean} - True if valid number
 */
export function isValidNumber(value, min = null, max = null) {
  const num = Number(value);
  if (isNaN(num)) return false;
  if (min !== null && num < min) return false;
  if (max !== null && num > max) return false;
  return true;
}

/**
 * Validate year is within acceptable range
 * @param {number} year - Year to validate
 * @returns {boolean} - True if valid year
 */
export function isValidYear(year) {
  const currentYear = new Date().getFullYear();
  return isValidNumber(year, 1800, currentYear + 5);
}

/**
 * Validate film classification
 * @param {string} classification - Classification to validate
 * @returns {boolean} - True if valid classification
 */
export function isValidClassification(classification) {
  const validClassifications = [
    "L",
    "10",
    "12",
    "14",
    "16",
    "18",
    "10+",
    "12+",
    "14+",
    "16+",
    "18+",
  ];
  return validClassifications.includes(String(classification).trim());
}

/**
 * Validate URL format (basic validation)
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL format
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize string by removing potentially harmful characters
 * @param {string} input - String to sanitize
 * @returns {string} - Sanitized string
 */
export function sanitizeString(input) {
  if (typeof input !== "string") return "";

  return String(input)
    .trim()
    .slice(0, 5000)
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/\x00/g, ""); // Remove null bytes
}

/**
 * Validate contact form data
 * @param {Object} data - Contact form data
 * @returns {Object} - { valid: boolean, errors: Object }
 */
export function validateContato(data) {
  const errors = {};

  // Validate nome
  if (!data.nome || !isValidString(data.nome, 2, 255)) {
    errors.nome = "Nome deve ter entre 2 e 255 caracteres";
  }

  // Validate email
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = "Email inválido";
  } else if (!isValidString(data.email, 5, 255)) {
    errors.email = "Email deve ter entre 5 e 255 caracteres";
  }

  // Validate mensagem
  if (!data.mensagem || !isValidString(data.mensagem, 10, 5000)) {
    errors.mensagem = "Mensagem deve ter entre 10 e 5000 caracteres";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : null,
  };
}

// Alias para validateContato
export const validateContactData = validateContato;

/**
 * Validate film data
 * @param {Object} data - Film data
 * @returns {Object} - { valid: boolean, errors: Object }
 */
export function validateFilme(data) {
  const errors = {};

  // Validate titulo
  if (!data.titulo || !isValidString(data.titulo, 3, 500)) {
    errors.titulo = "Título deve ter entre 3 e 500 caracteres";
  }

  // Validate ano
  if (data.ano && !isValidYear(data.ano)) {
    errors.ano = "Ano deve estar entre 1800 e próximos 5 anos";
  }

  // Validate classificacao
  if (data.classificacao && !isValidClassification(data.classificacao)) {
    errors.classificacao = "Classificação inválida";
  }

  // Validate duracao
  if (data.duracao && !isValidString(data.duracao, 2, 20)) {
    errors.duracao = "Duração deve ter formato válido";
  }

  // Validate trailer_youtube URL if provided
  if (data.trailer_youtube && !isValidUrl(data.trailer_youtube)) {
    errors.trailer_youtube = "URL do trailer inválida";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : null,
  };
}

/**
 * Validate director data
 * @param {Object} data - Director data
 * @returns {Object} - { valid: boolean, errors: Object }
 */
export function validateDiretor(data) {
  const errors = {};

  // Validate nome
  if (!data.nome || !isValidString(data.nome, 3, 255)) {
    errors.nome = "Nome deve ter entre 3 e 255 caracteres";
  }

  // Validate nacionalidade if provided
  if (data.nacionalidade && !isValidString(data.nacionalidade, 2, 100)) {
    errors.nacionalidade = "Nacionalidade deve ter entre 2 e 100 caracteres";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : null,
  };
}

/**
 * Extract IP address from request
 * @param {Object} req - Express request object
 * @returns {string} - Client IP address
 */
export function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown"
  );
}
