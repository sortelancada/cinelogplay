// src/auth/auth.controller.js
// Controlador mínimo para autenticação — placeholder seguro.
// Substitua por implementação real quando for integrar login/registro.

export function notImplementedAuth(req, res) {
  res.status(501).json({
    success: false,
    message: "Auth controller não implementado. Endpoint placeholder.",
  });
}

export default {
  notImplementedAuth,
};
