import http from "http";
import app from "../server.js";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";

describe("Contato API", () => {
  let server;

  beforeAll(() => {
    server = app.listen(3004);
  });

  afterAll(() => {
    server.close();
  });

  // Teste 1: Enviar mensagem com dados válidos
  it("POST /api/contato deve aceitar mensagem válida", async () => {
    const mensagem = {
      nome: "João Silva",
      email: "joao@example.com",
      mensagem: "Teste de mensagem",
    };

    const response = await fetch("http://localhost:3004/api/contato", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mensagem),
    });

    expect(response.status).toBe(201);

    const data = await response.json();
    expect(data).toHaveProperty("message");
    expect(data.message).toBe("Mensagem enviada com sucesso");
  });

  // Teste 2: Rejeitar mensagem sem campos obrigatórios
  it("POST /api/contato deve rejeitar sem nome", async () => {
    const mensagem = {
      email: "joao@example.com",
      mensagem: "Teste",
    };

    const response = await fetch("http://localhost:3004/api/contato", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mensagem),
    });

    expect(response.status).toBe(400);
  });

  // Teste 3: Rejeitar mensagem sem email
  it("POST /api/contato deve rejeitar sem email", async () => {
    const mensagem = {
      nome: "João Silva",
      mensagem: "Teste",
    };

    const response = await fetch("http://localhost:3004/api/contato", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mensagem),
    });

    expect(response.status).toBe(400);
  });

  // Teste 4: Rejeitar mensagem sem mensagem
  it("POST /api/contato deve rejeitar sem mensagem", async () => {
    const mensagem = {
      nome: "João Silva",
      email: "joao@example.com",
    };

    const response = await fetch("http://localhost:3004/api/contato", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mensagem),
    });

    expect(response.status).toBe(400);
  });
});
