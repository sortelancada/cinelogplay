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
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { initializeDatabase } from "./config/db.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/errorHandler.middleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "0.0.0.0";

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CinelogPlay API — Servidor operacional",
    version: "1.0.0",
  });
});

app.use("/api/filmes", filmesRoutes);
app.use("/api/diretores", diretoresRoutes);
app.use("/api/contato", contatoRoutes);
app.use("/api/avaliacoes", avaliacaoRoutes);
app.use("/api/atores", atoresRoutes);
app.use("/api/favoritos", favoritoRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use("/api/upload", uploadRoutes);

// 404 handler
app.use(notFoundHandler);

// error handler global
app.use(errorHandler);

// BOOTSTRAP DO SERVIDOR
async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, HOST, () => {
      console.log(`CinelogPlay API rodando em http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao inicializar servidor:", error);
    process.exit(1);
  }
}

startServer();

export default app;
