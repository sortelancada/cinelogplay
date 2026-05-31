// ========================================
// UPLOAD ROUTES — imagens (PNG, JPG, JPEG, SVG, WEBP)
// ========================================

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { sendSuccess, sendError } from "../utils/response.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "../../uploads");

// Garante que a pasta existe
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Tipos permitidos
const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
  "image/webp",
];

const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".svg", ".webp"];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, safeName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (
      ALLOWED_TYPES.includes(file.mimetype) &&
      ALLOWED_EXTENSIONS.includes(ext)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Formato não permitido. Use: PNG, JPG, JPEG, SVG ou WEBP (máx 5MB)"
        )
      );
    }
  },
});

const router = express.Router();

// POST /api/upload
router.post("/", upload.single("imagem"), (req, res) => {
  if (!req.file) {
    return sendError(res, "Nenhum arquivo enviado", "NO_FILE", 400);
  }

  const host = `${req.protocol}://${req.get("host")}`;
  const url = `${host}/uploads/${req.file.filename}`;

  return sendSuccess(
    res,
    { url, filename: req.file.filename, size: req.file.size },
    "Upload realizado com sucesso",
    201
  );
});

// Handler de erro do multer
router.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return sendError(
        res,
        "Arquivo muito grande. Máximo: 5MB",
        "FILE_TOO_LARGE",
        400
      );
    }
    return sendError(res, err.message, "UPLOAD_ERROR", 400);
  }
  return sendError(res, err.message || "Erro no upload", "UPLOAD_ERROR", 400);
});

export default router;
