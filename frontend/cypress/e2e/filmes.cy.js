// frontend/cypress/e2e/filmes.cy.js

describe("Página de Filmes", () => {
  // Teste 1: Carregar página de filmes
  it("deve carregar a página de filmes", () => {
    cy.intercept("GET", "/api/filmes", {
      fixture: "filmes.json",
    }).as("getFilmes");

    cy.visit("/");
    cy.get('a[data-page="filmes"]').click();
    cy.contains("Catálogo de Filmes").should("be.visible");
  });

  // Teste 2: Exibir lista de filmes
  it("deve exibir lista de filmes", () => {
    cy.intercept("GET", "/api/filmes", {
      fixture: "filmes.json",
    }).as("getFilmes");

    cy.visit("/");
    cy.get('a[data-page="filmes"]').click();
    cy.wait("@getFilmes");

    // Verifica se pelo menos um filme aparece
    cy.get(".filme-card").should("have.length.greaterThan", 0);
  });

  // Teste 3: Filme tem informações corretas
  it("filme deve ter título, gênero e ano", () => {
    cy.intercept("GET", "/api/filmes", {
      fixture: "filmes.json",
    }).as("getFilmes");

    cy.visit("/");
    cy.get('a[data-page="filmes"]').click();
    cy.wait("@getFilmes");

    // Verifica se contém os elementos esperados
    cy.get(".filme-card h2").first().should("not.be.empty");
    cy.contains("Gênero").should("be.visible");
    cy.contains("Ano").should("be.visible");
  });
});
