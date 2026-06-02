const MOCK_FILMES = [
  { id: 1, titulo: "Inception", ano: 2010, genero: "Ficção Científica", imagem: "", media_avaliacao: "4.5" },
  { id: 2, titulo: "Oppenheimer", ano: 2023, genero: "Drama", imagem: "", media_avaliacao: "4.8" },
  { id: 3, titulo: "Dune", ano: 2021, genero: "Ficção Científica", imagem: "", media_avaliacao: "4.2" },
];

describe("Página de Filmes", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/filmes", { body: { success: true, data: MOCK_FILMES } }).as("getFilmes");
    cy.intercept("GET", "**/api/favoritos", { body: { success: true, data: [] } }).as("getFavoritos");
    cy.visit("/filmes");
  });

  it("deve carregar a página de filmes", () => {
    cy.contains("Catálogo de Filmes").should("exist");
  });

  it("deve exibir input de pesquisa", () => {
    cy.get("input[placeholder*='Buscar']").should("exist");
  });

  it("deve exibir select de gênero", () => {
    cy.get("select").should("exist");
  });

  it("deve exibir contagem de filmes após carregamento", () => {
    cy.wait("@getFilmes");
    cy.contains(`${MOCK_FILMES.length} filmes encontrados`).should("exist");
  });

  it("deve filtrar filmes por título", () => {
    cy.wait("@getFilmes");
    cy.get("input[placeholder*='Buscar']").type("Inception");
    cy.contains("1 filmes encontrados").should("exist");
  });

  it("deve limpar filtros ao clicar em Limpar", () => {
    cy.wait("@getFilmes");
    cy.get("input[placeholder*='Buscar']").type("algo");
    cy.contains("Limpar").click();
    cy.get("input[placeholder*='Buscar']").should("have.value", "");
  });
});
