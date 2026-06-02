// ========================================
// AUTH CONTROLLER
// ========================================

import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import { signToken } from "./jwt.js";

/**
 * POST /api/auth/register
 */
export async function register(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        success: false,
        message: "nome, email e senha são obrigatórios",
        code: "VALIDATION_ERROR",
      });
    }

    // Verificar se email já existe
    const existing = await pool.query(
      "SELECT id FROM usuarios WHERE email = $1",
      [email]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email já cadastrado",
        code: "EMAIL_EXISTS",
      });
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Inserir usuário
    const result = await pool.query(
      `INSERT INTO usuarios (nome, email, senha)
       VALUES ($1, $2, $3)
       RETURNING id, nome, email, criado_em`,
      [nome, email, senhaHash]
    );

    const usuario = result.rows[0];
    const token = signToken({ id: usuario.id, email: usuario.email });

    return res.status(201).json({
      success: true,
      message: "Usuário cadastrado com sucesso",
      data: {
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("[AUTH] Erro no register:", error.message);
    return res.status(500).json({
      success: false,
      message: "Erro ao cadastrar usuário",
      code: "INTERNAL_ERROR",
    });
  }
}

/**
 * POST /api/auth/login
 */
export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        message: "email e senha são obrigatórios",
        code: "VALIDATION_ERROR",
      });
    }

    // Buscar usuário
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    const usuario = result.rows[0];

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
        code: "INVALID_CREDENTIALS",
      });
    }

    // Comparar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
        code: "INVALID_CREDENTIALS",
      });
    }

    const token = signToken({ id: usuario.id, email: usuario.email });

    return res.json({
      success: true,
      message: "Login realizado com sucesso",
      data: {
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("[AUTH] Erro no login:", error.message);
    return res.status(500).json({
      success: false,
      message: "Erro ao realizar login",
      code: "INTERNAL_ERROR",
    });
  }
}

/**
 * POST /api/auth/change-password
 * Requer autenticação (authMiddleware injeta req.user)
 */
export async function changePassword(req, res) {
  try {
    const { senhaAtual, novaSenha } = req.body;
    const usuarioId = req.user?.id;

    if (!senhaAtual || !novaSenha) {
      return res.status(400).json({
        success: false,
        message: "senhaAtual e novaSenha são obrigatórios",
        code: "VALIDATION_ERROR",
      });
    }

    if (novaSenha.length < 6) {
      return res.status(400).json({
        success: false,
        message: "A nova senha deve ter ao menos 6 caracteres",
        code: "VALIDATION_ERROR",
      });
    }

    const result = await pool.query(
      "SELECT senha FROM usuarios WHERE id = $1",
      [usuarioId]
    );
    const usuario = result.rows[0];

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
        code: "NOT_FOUND",
      });
    }

    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({
        success: false,
        message: "Senha atual incorreta",
        code: "INVALID_CREDENTIALS",
      });
    }

    const novaSenhaHash = await bcrypt.hash(novaSenha, 10);
    await pool.query(
      "UPDATE usuarios SET senha = $1, atualizado_em = NOW() WHERE id = $2",
      [novaSenhaHash, usuarioId]
    );

    return res.json({
      success: true,
      message: "Senha alterada com sucesso",
    });
  } catch (error) {
    console.error("[AUTH] Erro no change-password:", error.message);
    return res.status(500).json({
      success: false,
      message: "Erro ao alterar senha",
      code: "INTERNAL_ERROR",
    });
  }
}
