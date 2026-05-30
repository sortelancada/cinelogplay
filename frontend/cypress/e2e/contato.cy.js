// frontend/cypress/e2e/contato.cy.js

describe("Página de Contato", () => {
  // Teste 1: Carregar página de contato
  it("deve carregar a página de contato", () => {
    cy.visit("/");
    cy.get('a[data-page="contato"]').click();
    cy.contains("Entre em Contato").should("be.visible");
  });

  // Teste 2: Formulário tem campos obrigatórios
  it("formulário deve ter campos de email e mensagem", () => {
    cy.visit("/");
    cy.get('a[data-page="contato"]').click();

    cy.get("input[type='email']").should("exist");
    cy.get("textarea").should("exist");
    cy.get("button[type='submit']").should("exist");
  });

  // Teste 3: Enviar mensagem válida
  it("deve enviar mensagem válida", () => {
    cy.visit("/");
    cy.get('a[data-page="contato"]').click();

    // Preenche o formulário
    cy.get("input[type='email']").type("teste@example.com");
    cy.get("textarea").type("Mensagem de teste");

    // Envia o formulário
    cy.get("button[type='submit']").click();

    // Verifica se alerta aparece
    cy.on("window:alert", (str) => {
      expect(str).to.contain("sucesso");
    });
  });

  // Teste 4: Não enviar sem email
  it("não deve enviar sem email", () => {
    cy.visit("/");
    cy.get('a[data-page="contato"]').click();

    // Preenche apenas mensagem
    cy.get("textarea").type("Mensagem de teste");

    // Tenta enviar
    cy.get("button[type='submit']").click();

    // Verifica se input de email fica inválido
    cy.get("input[type='email']").should("have.attr", "required");
  });

  // Teste 5: Não enviar sem mensagem
  it("não deve enviar sem mensagem", () => {
    cy.visit("/");
    cy.get('a[data-page="contato"]').click();

    // Preenche apenas email
    cy.get("input[type='email']").type("teste@example.com");

    // Tenta enviar
    cy.get("button[type='submit']").click();

    // Verifica se textarea fica inválido
    cy.get("textarea").should("have.attr", "required");
  });
});
