describe("Página de Contato", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/pages/contato.html");
  });

  it("deve carregar a página de contato", () => {
    cy.get("h1").should("contain", "Entre em Contato");
  });

  it("deve exibir formulário com todos os campos", () => {
    cy.get("#contato-nome").should("exist");
    cy.get("#contato-email").should("exist");
    cy.get("#contato-assunto").should("exist");
    cy.get("#contato-mensagem").should("exist");
    cy.get("button[type=submit]").should("exist");
  });

  it("deve validar email", () => {
    cy.get("#contato-email").type("email-invalido");
    cy.get("button[type=submit]").click();
    cy.get("#contato-email").then(($input) => {
      expect($input[0].validity.valid).to.be.false;
    });
  });

  it("deve enviar formulário válido", () => {
    cy.intercept("POST", "**/api/contato", {
      statusCode: 200,
      body: { success: true },
    }).as("sendContato");

    cy.get("#contato-nome").type("Test User");
    cy.get("#contato-email").type("test@email.com");
    cy.get("#contato-assunto").type("Test Subject");
    cy.get("#contato-mensagem").type("Test message content");
    cy.get("button[type=submit]").click();

    cy.wait("@sendContato");
  });
});
