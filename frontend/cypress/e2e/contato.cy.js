describe("Página de Contato (Perfil)", () => {
  const USER = { id: 1, nome: "Test User", email: "test@test.com" };

  beforeEach(() => {
    cy.intercept("GET", "**/api/favoritos", {
      body: { success: true, data: [] },
    }).as("getFavoritos");
    cy.visit("/perfil", {
      onBeforeLoad(win) {
        win.localStorage.setItem("clp_token", "test-token");
        win.localStorage.setItem("clp_user", JSON.stringify(USER));
      },
    });
  });

  it("deve exibir seção de contato no perfil", () => {
    cy.contains("Entre em Contato").should("exist");
  });

  it("deve exibir campos de nome, email e mensagem", () => {
    cy.contains("Nome").should("exist");
    cy.contains("Email").should("exist");
    cy.contains("Mensagem").should("exist");
  });

  it("deve enviar formulário de contato válido", () => {
    cy.intercept("POST", "**/api/contato", {
      statusCode: 200,
      body: { success: true, data: { id: 1 } },
    }).as("sendContato");

    cy.get("form")
      .last()
      .within(() => {
        cy.get("input").first().type("Test User");
        cy.get("input").last().type("test@email.com");
        cy.get("textarea").type("Mensagem de teste E2E");
        cy.get("button[type='submit']").click();
      });

    cy.wait("@sendContato");
    cy.contains("sucesso").should("exist");
  });
});
