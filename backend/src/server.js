import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
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
import { initializeDatabase } from "./config/db.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/errorHandler.middleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "0.0.0.0";

// ============================================
// CORS
// ============================================
// CORS_ORIGIN aceita lista CSV: "https://a.com,https://b.com"
const extraOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim()).filter(Boolean)
  : [];

const allowedOriginsSet = new Set(
  [
    "http://localhost:5173",
    "http://localhost:4173",
    process.env.FRONTEND_URL,
    ...extraOrigins,
  ].filter(Boolean)
);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOriginsSet.has(origin)) return callback(null, true);
    return callback(new Error(`Origem não permitida pelo CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// ============================================
// RATE LIMITING
// ============================================
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Muitas requisições. Tente novamente em 15 minutos." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Muitas tentativas de login. Tente novamente em 15 minutos." },
});

// ============================================
// MIDDLEWARES GLOBAIS
// ============================================
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/", apiLimiter);

// ============================================
// HEALTH CHECK
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
app.use("/api/auth", authLimiter, authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use("/api/upload", uploadRoutes);

// ============================================
// ERROR HANDLERS
// ============================================
app.use(notFoundHandler);
app.use(errorHandler);

// ============================================
// INIT
// ============================================
async function startServer() {
  try {
    // Roda migrations a não ser que RUN_MIGRATIONS=false explicitamente
    if (process.env.RUN_MIGRATIONS !== "false") {
      await initializeDatabase();
    }

    app.listen(PORT, HOST, () => {
      console.log(`\nCinelogPlay API iniciada!`);
      console.log(`URL: http://${HOST}:${PORT}`);
      console.log(`DB: ${process.env.DB_NAME || "cinelogplay"}`);
      console.log(`JWT: ${process.env.JWT_SECRET ? "OK" : "NÃO CONFIGURADO"}\n`);
    });
  } catch (error) {
    console.error("Erro ao inicializar servidor:", error.message);
    process.exit(1);
  }
}

await startServer();

export default app;
