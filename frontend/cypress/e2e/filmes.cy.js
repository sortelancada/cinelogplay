describe("Página de Filmes", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/filmes", { fixture: "filmes.json" }).as(
      "getFilmes"
    );
    cy.visit("/pages/filmes.html");
  });

  it("deve carregar a página com título do catálogo", () => {
    cy.contains("Catálogo de Filmes").should("be.visible");
  });

  it("deve exibir cards de filmes", () => {
    cy.get("#filmes-container .filme-card", { timeout: 6000 }).should(
      "have.length.greaterThan",
      0
    );
  });

  it("card deve ter título, gênero e ano", () => {
    cy.get(".filme-card")
      .first()
      .within(() => {
        cy.get(".filme-card-titulo").should("not.be.empty");
        cy.get(".filme-card-genero").should("contain", "Gênero");
        cy.get(".filme-card-ano-classificacao").should("contain", "Ano");
      });
  });

  it("deve filtrar filmes pela pesquisa", () => {
    cy.get("#pesquisa-input").type("Crime");
    cy.get(".filme-card .filme-card-genero").each(($el) => {
      cy.wrap($el).should("contain.text", "Crime");
    });
  });

  it("ao clicar no card deve mostrar detalhes do filme", () => {
    cy.get(".filme-card").first().click();
    cy.get("#app").should("contain", "Sinopse");
    cy.get("#btn-voltar-filmes").should("be.visible");
  });

  it("botão voltar deve retornar ao catálogo", () => {
    cy.get(".filme-card").first().click();
    cy.get("#btn-voltar-filmes").click();
    cy.contains("Catálogo de Filmes").should("be.visible");
  });
});
