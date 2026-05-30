// frontend/cypress/e2e/responsividade.cy.js

describe("Responsividade", () => {
  // Teste 1: Mobile (375x667)
  it("deve ser responsivo em mobile (375x667)", () => {
    cy.viewport(375, 667);
    cy.visit("/");
    cy.get("h1").should("be.visible");
  });

  // Teste 2: Tablet (768x1024)
  it("deve ser responsivo em tablet (768x1024)", () => {
    cy.viewport(768, 1024);
    cy.visit("/");
    cy.get("h1").should("be.visible");
  });

  // Teste 3: Desktop (1920x1080)
  it("deve ser responsivo em desktop (1920x1080)", () => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.get("h1").should("be.visible");
  });

  // Teste 4: Menu hambúrguer em mobile
  it("menu hambúrguer deve funcionar em mobile", () => {
    cy.viewport(375, 667);
    cy.visit("/");

    cy.get("#menuToggle").click();
    cy.get("#sidebar").should("have.class", "active");
  });

  // Teste 5: Filmes grid responsivo
  it("grid de filmes deve ser responsivo", () => {
    cy.intercept("GET", "/api/filmes", {
      fixture: "filmes.json",
    }).as("getFilmes");

    cy.viewport(375, 667);
    cy.visit("/");
    cy.get('a[data-page="filmes"]').click();
    cy.wait("@getFilmes");

    cy.get(".filme-card").should("be.visible");
  });
});
