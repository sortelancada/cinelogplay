describe("Responsividade", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/filmes", { body: { success: true, data: [] } });
    cy.intercept("GET", "**/api/diretores", {
      body: { success: true, data: [] },
    });
    cy.intercept("GET", "**/api/favoritos", {
      body: { success: true, data: [] },
    });
  });

  it("deve carregar a home em mobile (375x667)", () => {
    cy.viewport(375, 667);
    cy.visit("/");
    cy.get("nav").should("be.visible");
  });

  it("deve carregar a home em tablet (768x1024)", () => {
    cy.viewport(768, 1024);
    cy.visit("/");
    cy.get("nav").should("be.visible");
  });

  it("deve carregar a home em desktop (1920x1080)", () => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.get("nav").should("be.visible");
  });

  it("deve exibir o conteúdo principal em mobile", () => {
    cy.viewport(375, 667);
    cy.visit("/");
    cy.get("h1").should("be.visible");
  });

  it("deve navegar para /filmes em mobile", () => {
    cy.viewport(375, 667);
    cy.visit("/");
    cy.contains("Ver Catálogo").click();
    cy.url().should("include", "/filmes");
  });
});
