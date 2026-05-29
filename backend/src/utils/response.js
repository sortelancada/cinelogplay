/**
 * ============================================
 * STANDARDIZED API RESPONSE HANDLER
 * ============================================
 * Provides consistent response format across all API endpoints
 * ensuring predictability for frontend clients
 */

/**
 * Send a success response with data
 * @param {Object} res - Express response object
 * @param {any} data - Response data (array, object, etc)
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default: 200)
 * @returns {void}
 */
export function sendSuccess(
  res,
  data,
  message = "Operação realizada com sucesso",
  statusCode = 200
) {
  res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Send a success response without data (like DELETE operations)
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default: 200)
 * @returns {void}
 */
export function sendSuccessMessage(
  res,
  message = "Operação realizada com sucesso",
  statusCode = 200
) {
  res.status(statusCode).json({
    success: true,
    message: message,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @param {number} statusCode - HTTP status code (default: 400)
 * @param {Object} details - Optional detailed error object
 * @returns {void}
 */
export function sendError(
  res,
  message = "Ocorreu um erro",
  code = "ERROR",
  statusCode = 400,
  details = null
) {
  res.status(statusCode).json({
    success: false,
    message: message,
    code: code,
    errors: details || null,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Send a validation error response
 * @param {Object} res - Express response object
 * @param {Object} validationErrors - Object with field names as keys and errors as values
 * @returns {void}
 */
export function sendValidationError(res, validationErrors) {
  res.status(400).json({
    success: false,
    message: "Validação falhou",
    code: "VALIDATION_ERROR",
    errors: validationErrors,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Send a not found error response
 * @param {Object} res - Express response object
 * @param {string} message - Custom not found message
 * @returns {void}
 */
export function sendNotFound(res, message = "Recurso não encontrado") {
  sendError(res, message, "NOT_FOUND", 404);
}

/**
 * Send an unauthorized error response
 * @param {Object} res - Express response object
 * @param {string} message - Custom unauthorized message
 * @returns {void}
 */
export function sendUnauthorized(res, message = "Acesso não autorizado") {
  sendError(res, message, "UNAUTHORIZED", 401);
}

/**
 * Send a forbidden error response
 * @param {Object} res - Express response object
 * @param {string} message - Custom forbidden message
 * @returns {void}
 */
export function sendForbidden(res, message = "Acesso proibido") {
  sendError(res, message, "FORBIDDEN", 403);
}

/**
 * Send a server error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {Error} error - Original error object (for logging)
 * @returns {void}
 */
export function sendServerError(
  res,
  message = "Erro interno do servidor",
  error = null
) {
  // Log the actual error for debugging
  if (error) {
    console.error("[SERVER ERROR]", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }

  sendError(res, message, "INTERNAL_ERROR", 500);
}
