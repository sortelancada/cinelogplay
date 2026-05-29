import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import filmesRoutes from "./routes/filmes.routes.js";
import diretoresRoutes from "./routes/diretores.routes.js";
import contatoRoutes from "./routes/contato.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "0.0.0.0";

const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
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

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Rota não encontrada",
    path: req.path,
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Erro interno do servidor",
  });
});

app.listen(PORT, HOST, () => {
  console.log(` CinelogPlay API rodando em http://${HOST}:${PORT}`);
});

export default app;
