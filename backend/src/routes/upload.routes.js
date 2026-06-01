// ========================================
// UPLOAD ROUTE — imagens (png, jpg, jpeg, svg, webp)
// ========================================

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Pasta de destino
const UPLOAD_DIR = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Tipos aceitos
const ALLOWED_TYPES = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/svg+xml": ".svg",
  "image/webp": ".webp",
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = ALLOWED_TYPES[file.mimetype] || path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_TYPES[file.mimetype]) return cb(null, true);
    cb(new Error("Formato invalido. Use: png, jpg, jpeg, svg ou webp."));
  },
});

router.post("/", upload.single("imagem"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Nenhum arquivo enviado ou formato invalido.",
      });
  }
  const host =
    process.env.API_URL || `http://localhost:${process.env.PORT || 3001}`;
  const url = `${host}/uploads/${req.file.filename}`;
  return res
    .status(201)
    .json({
      success: true,
      message: "Upload realizado com sucesso.",
      url,
      filename: req.file.filename,
    });
});

router.use((err, _req, res, _next) => {
  return res
    .status(400)
    .json({ success: false, message: err.message || "Erro no upload." });
});

export default router;
