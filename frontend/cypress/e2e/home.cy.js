describe("Home", () => {
  it("deve carregar filmes", () => {
    cy.intercept("GET", "/api/filmes", {
      fixture: "filmes.json",
    }).as("getFilmes");

    cy.visit("/");

    cy.wait("@getFilmes");

    cy.contains("Filme Teste").should("be.visible");
  });
});
