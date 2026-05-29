// Importa o módulo http do Node.js para fazer requisições
import http from "http";

// Importa a aplicação Express
import app from "../server.js";

// Importa o jest para usar funções de teste
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";

describe("Filmes API", () => {
  let server;

  // Inicia o servidor antes dos testes
  beforeAll(() => {
    server = app.listen(3002);
  });

  // Encerra o servidor após os testes
  afterAll(() => {
    server.close();
  });

  // Teste 1: Verificar se a rota /api/filmes existe
  it("GET /api/filmes deve retornar lista de filmes", async () => {
    // Faz requisição GET para a rota
    const response = await fetch("http://localhost:3002/api/filmes");

    // Verifica se o status é 200 (sucesso)
    expect(response.status).toBe(200);

    // Converte resposta para JSON
    const data = await response.json();

    // Verifica se é um array
    expect(Array.isArray(data)).toBe(true);

    // Verifica se tem pelo menos um filme
    expect(data.length).toBeGreaterThan(0);

    // Verifica se primeiro filme tem as propriedades obrigatórias
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("titulo");
    expect(data[0]).toHaveProperty("ano");
    expect(data[0]).toHaveProperty("genero");
  });

  // Teste 2: Verificar se os dados têm formato correto
  it("Filmes devem ter todas as propriedades obrigatórias", async () => {
    const response = await fetch("http://localhost:3002/api/filmes");
    const filmes = await response.json();

    // Validar cada filme
    filmes.forEach((filme) => {
      expect(filme).toHaveProperty("id");
      expect(filme).toHaveProperty("titulo");
      expect(typeof filme.titulo).toBe("string");
      expect(typeof filme.ano).toBe("number");
      expect(typeof filme.genero).toBe("string");
    });
  });
});
