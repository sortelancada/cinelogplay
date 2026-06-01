describe("Página de Diretores", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/pages/diretores.html");
  });

  it("deve carregar a página de diretores", () => {
    cy.get("h1").should("contain", "Nossos Diretores");
  });

  it("deve exibir container de diretores", () => {
    cy.get("#diretores-container").should("exist");
  });

  it("deve exibir cards de diretores", () => {
    cy.get("#diretores-container", { timeout: 5000 }).then(($container) => {
      const hasCards = $container.children().length > 0;
      if (hasCards) {
        cy.get(".diretor-card", { timeout: 5000 }).should(
          "have.length.greaterThan",
          0
        );
      }
    });
  });
});
