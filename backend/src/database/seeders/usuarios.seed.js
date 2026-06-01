import bcrypt from "bcryptjs";
import pool from "../../config/db.js";

export async function seedUsuarios() {
  const senhaHash = await bcrypt.hash("Senha@123", 10);

  await pool.query(
    `
    INSERT INTO usuarios (nome, email, senha)
    VALUES ($1, $2, $3)
    ON CONFLICT (email)
    DO UPDATE SET senha = EXCLUDED.senha
    `,
    ["Admin", "ci@teste.com", senhaHash]
  );
}
