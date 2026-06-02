import pkg from "pg";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { seedUsuarios } from "../database/seeders/usuarios.seed.js";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,

  ssl: {
    rejectUnauthorized: false,
  },
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

    // 🔧 AJUSTE IMPORTANTE: seedUsuarios com proteção de erro
    try {
      await seedUsuarios();
      console.log("Admin garantido no banco");
    } catch (err) {
      console.error("Seed usuarios falhou:", err.message);
    }

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

export { initializeDatabase };
export default pool;
