const MOCK_FILMES = [
  {
    id: 1,
    titulo: "Inception",
    ano: 2010,
    genero: "Ficção Científica",
    imagem: "",
    media_avaliacao: "4.5",
    total_avaliacoes: 10,
  },
  {
    id: 2,
    titulo: "Oppenheimer",
    ano: 2023,
    genero: "Drama",
    imagem: "",
    media_avaliacao: "4.8",
    total_avaliacoes: 20,
  },
];
const MOCK_DIRETORES = [
  { id: 1, nome: "Christopher Nolan", nacionalidade: "Britânico", foto: "" },
];

describe("Home Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/filmes", {
      body: { success: true, data: MOCK_FILMES },
    }).as("getFilmes");
    cy.intercept("GET", "**/api/diretores", {
      body: { success: true, data: MOCK_DIRETORES },
    }).as("getDiretores");
    cy.intercept("GET", "**/api/favoritos", {
      body: { success: true, data: [] },
    }).as("getFavoritos");
    cy.visit("/");
  });

  it("deve carregar a página home", () => {
    cy.contains("O melhor do cinema").should("exist");
  });

  it("deve exibir o título principal", () => {
    cy.get("h1").should("exist");
  });

  it("deve exibir link para catálogo de filmes", () => {
    cy.contains("Ver Catálogo").should("exist");
  });

  it("deve exibir link para criar conta quando não autenticado", () => {
    cy.contains("Criar conta").should("exist");
  });

  it("deve navegar para /filmes ao clicar em Ver Catálogo", () => {
    cy.contains("Ver Catálogo").click();
    cy.url().should("include", "/filmes");
  });

  it("deve realizar busca pelo formulário do hero", () => {
    cy.get("input[placeholder*='Buscar']").first().type("Inception");
    cy.get("button[type='submit']").first().click();
    cy.url().should("include", "/busca");
    cy.url().should("include", "Inception");
  });
});
