// src/middleware/auth.middleware.js
import { verifyToken } from "../auth/jwt.js";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token)
      return res
        .status(401)
        .json({ success: false, error: "Token não fornecido" });

    const payload = await verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, error: "Token inválido ou expirado" });
  }
}

export default authMiddleware;
