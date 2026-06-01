// importa o express (framework de rotas HTTP)
import express from "express";

// importa a função responsável por enviar/salvar mensagem de contato
import { enviarMensagem } from "../controllers/contato.controller.js";

// importa validador de contato
import { validateContatoMiddleware } from "../middleware/validation.middleware.js";

// cria o roteador do express para organizar as rotas de contato
const router = express.Router();

// define rota POST para enviar mensagem de contato
router.post("/", validateContatoMiddleware, enviarMensagem);

// exporta o router para ser usado no server.js
export default router;
