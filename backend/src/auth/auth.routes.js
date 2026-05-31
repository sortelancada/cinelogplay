import express from "express";
import { notImplementedAuth } from "./auth.controller.js";

const router = express.Router();

// Rota placeholder para verificar que o módulo existe
router.get("/placeholder", notImplementedAuth);

// Exemplo de rota de login (placeholder)
router.post("/login", (req, res) => {
  res.status(501).json({
    success: false,
    message: "Login não implementado. Use placeholder.",
  });
});

export default router;
