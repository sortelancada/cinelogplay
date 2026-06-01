describe("Responsividade", () => {
  it("deve ser responsivo em mobile (375x667)", () => {
    cy.viewport(375, 667);
    cy.visit("http://localhost:5173/pages/home.html");
    cy.get(".navbar-custom").should("be.visible");
    cy.get("#menuToggle").should("be.visible");
  });

  it("deve ser responsivo em tablet (768x1024)", () => {
    cy.viewport(768, 1024);
    cy.visit("http://localhost:5173/pages/home.html");
    cy.get(".navbar-custom").should("be.visible");
  });

  it("deve ser responsivo em desktop (1920x1080)", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:5173/pages/home.html");
    cy.get(".navbar-custom").should("be.visible");
  });

  it("menu hambúrguer deve funcionar em mobile", () => {
    cy.viewport(375, 667);
    cy.visit("http://localhost:5173/pages/home.html");
    cy.get("#menuToggle").click();
    cy.get("#sidebar").should("have.class", "active");
  });

  it("deve navegar entre páginas em mobile via sidebar", () => {
    cy.viewport(375, 667);
    cy.visit("http://localhost:5173/pages/home.html");
    // Abrir menu
    cy.get("#menuToggle").click();
    // Clicar no primeiro link de filmes no sidebar (não no dropdown)
    cy.get(".sidebar-nav a[href='/pages/filmes.html']").first().click();
    // Verificar navegação
    cy.url().should("include", "/pages/filmes.html");
  });
});
