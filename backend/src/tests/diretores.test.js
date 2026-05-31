// import http from "http";
import app from "../server.js";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";

describe("Diretores API", () => {
  let server;

  beforeAll(() => {
    server = app.listen(3003);
  });

  afterAll(() => {
    server.close();
  });

  // Teste: Listar todos os diretores
  it("GET /api/diretores deve retornar lista de diretores", async () => {
    const response = await fetch("http://localhost:3003/api/diretores");

    expect(response.status).toBe(200);

    const data = await response.json();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    // Verifica propriedades do primeiro diretor
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("nome");
    expect(data[0]).toHaveProperty("nacionalidade");
    expect(data[0]).toHaveProperty("principais_obras");
  });

  // Teste: Validar formato dos dados
  it("Diretores devem ter todas as propriedades obrigatórias", async () => {
    const response = await fetch("http://localhost:3003/api/diretores");
    const diretores = await response.json();

    diretores.forEach((diretor) => {
      expect(diretor).toHaveProperty("id");
      expect(diretor).toHaveProperty("nome");
      expect(typeof diretor.nome).toBe("string");
      expect(diretor.nome.length).toBeGreaterThan(0);
    });
  });
});
