// frontend/cypress/e2e/diretores.cy.js

describe("Página de Diretores", () => {
  // Teste 1: Carregar página de diretores
  it("deve carregar a página de diretores", () => {
    cy.intercept("GET", "/api/diretores", {
      fixture: "diretores.json",
    }).as("getDiretores");

    cy.visit("/");
    cy.get('a[data-page="diretores"]').click();
    cy.contains("Nossos Diretores").should("be.visible");
  });

  // Teste 2: Exibir lista de diretores
  it("deve exibir lista de diretores", () => {
    cy.intercept("GET", "/api/diretores", {
      fixture: "diretores.json",
    }).as("getDiretores");

    cy.visit("/");
    cy.get('a[data-page="diretores"]').click();
    cy.wait("@getDiretores");

    cy.get(".filme-card").should("have.length.greaterThan", 0);
  });

  // Teste 3: Diretor tem informações corretas
  it("diretor deve ter nome e nacionalidade", () => {
    cy.intercept("GET", "/api/diretores", {
      fixture: "diretores.json",
    }).as("getDiretores");

    cy.visit("/");
    cy.get('a[data-page="diretores"]').click();
    cy.wait("@getDiretores");

    cy.contains("Nacionalidade").should("be.visible");
    cy.contains("Principais Obras").should("be.visible");
  });
});
