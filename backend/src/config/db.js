import pkg from "pg";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const { Pool } = pkg;

// Defaults seguros: se as variáveis não estiverem definidas, usamos os
// padrões de desenvolvimento local (localhost + padrões do Postgres).
// Quando o .env define DB_HOST (ex.: "postgres" no Docker), o valor é
// respeitado — isto apenas evita um crash de DNS (ENOTFOUND) quando a
// configuração está ausente. Funciona igual em Windows e Linux.
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "cinelogplay",
});

async function initializeDatabase() {
  try {
    console.log("Inicializando banco de dados...");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const createTablesPath = path.join(
      __dirname,
      "../database/create_tables.sql"
    );
    const seedPath = path.join(__dirname, "../database/seed.sql");

    if (!fs.existsSync(createTablesPath)) {
      console.warn(
        "Arquivo create_tables.sql não encontrado. Saltando inicialização."
      );
      return;
    }

    console.log("Criando tabelas...");

    const createTablesSQL = fs.readFileSync(createTablesPath, "utf-8");
    await pool.query(createTablesSQL);

    console.log("Tabelas criadas com sucesso!");

    if (fs.existsSync(seedPath)) {
      console.log("Populando banco com dados iniciais via SQL...");

      const seedSQL = fs.readFileSync(seedPath, "utf-8");

      try {
        await pool.query(seedSQL);
        console.log("Banco populado com sucesso via SQL!");
      } catch (error) {
        if (
          error.message.includes("duplicate") ||
          error.message.includes("already exists")
        ) {
          console.warn("Alguns dados já existem no banco.");
        } else {
          throw error;
        }
      }
    }

    console.log("Banco de dados inicializado!");
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error.message);
  }
}

// NÃO executar initializeDatabase automaticamente aqui.
// Exportamos pool e a função initializeDatabase para execução manual.
export { initializeDatabase };
export default pool;
