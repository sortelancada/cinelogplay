// ========================================
// AUTH MIDDLEWARE — JWT
// ========================================

import { verifyToken } from "../auth/jwt.js";
import { sendError } from "../utils/response.js";

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, "Token não fornecido", "UNAUTHORIZED", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return sendError(res, "Token inválido ou expirado", "UNAUTHORIZED", 401);
  }
}
