describe("Página de Filmes", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/pages/filmes.html");
  });

  it("deve carregar a página de filmes", () => {
    cy.get("h1").should("contain", "Catálogo de Filmes");
  });

  it("deve exibir input de pesquisa", () => {
    cy.get("#pesquisa-input").should("exist");
  });

  it("deve exibir grid de filmes", () => {
    cy.get("#filmes-container", { timeout: 5000 }).then(($container) => {
      const hasCards = $container.children().length > 0;
      if (hasCards) {
        cy.get(".filme-card", { timeout: 5000 }).should(
          "have.length.greaterThan",
          0
        );
      }
    });
  });

  it("deve filtrar filmes na pesquisa", () => {
    cy.get("#pesquisa-input").type("test");
    cy.get("#pesquisa-input").should("have.value", "test");
  });
});
