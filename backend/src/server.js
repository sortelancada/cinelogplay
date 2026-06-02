import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import filmesRoutes from "./routes/filmes.routes.js";
import diretoresRoutes from "./routes/diretores.routes.js";
import contatoRoutes from "./routes/contato.routes.js";
import avaliacaoRoutes from "./routes/avaliacao.routes.js";
import atoresRoutes from "./routes/atores.routes.js";
import favoritoRoutes from "./routes/favorito.routes.js";
import authRoutes from "./auth/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { initializeDatabase } from "./config/db.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/errorHandler.middleware.js";

// ============================================
// CONFIGURAÇÃO DO ENVIRONMENT
// ============================================
dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.disable("x-powered-by");

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "0.0.0.0";

// ============================================
// CONFIGURAÇÃO DO CORS
// ============================================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origem não permitida pelo CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// ============================================
// MIDDLEWARES GLOBAIS
// ============================================
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options("*", cors(corsOptions));

// ============================================
// ROTA DE STATUS/HEALTH CHECK
// ============================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CinelogPlay API — Servidor operacional",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// ROTAS DA API
// ============================================
app.use("/api/filmes", filmesRoutes);
app.use("/api/diretores", diretoresRoutes);
app.use("/api/contato", contatoRoutes);
app.use("/api/avaliacoes", avaliacaoRoutes);
app.use("/api/atores", atoresRoutes);
app.use("/api/favoritos", favoritoRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use("/api/upload", uploadRoutes);

// ============================================
// MIDDLEWARES DE TRATAMENTO DE ERRO
// ============================================
// 404 handler (deve vir antes do error handler)
app.use(notFoundHandler);

// Global error handler (deve ser o último)
app.use(errorHandler);

// ============================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================
async function startServer() {
  try {
    // Inicializar banco de dados
    if (process.env.RUN_MIGRATIONS === "false") {
      await initializeDatabase();
    }

    // Iniciar servidor
    app.listen(PORT, HOST, () => {
      console.log(`\nCinelogPlay API iniciada com sucesso!`);
      console.log(`URL: http://${HOST}:${PORT}`);
      console.log(
        `🗄️  Banco de dados: ${process.env.DB_NAME || "cinelogplay"}`
      );
      console.log(
        `JWT_SECRET: ${process.env.JWT_SECRET ? "Configurado" : "NÃO CONFIGURADO"}\n`
      );
    });
  } catch (error) {
    console.error("Erro ao inicializar servidor:", error.message);
    process.exit(1);
  }
}

// Iniciar servidor
await startServer();

export default app;
