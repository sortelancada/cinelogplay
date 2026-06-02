describe("Página de Login", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/login");
  });

  it("deve carregar a página de login", () => {
    cy.contains("Bem-vindo de volta").should("exist");
  });

  it("deve exibir formulário com campos de email e senha", () => {
    cy.get("input[type='email']").should("exist");
    cy.get("input[type='password']").should("exist");
    cy.contains("button", "Entrar").should("exist");
  });

  it("deve exibir link para cadastro", () => {
    cy.contains("Criar conta").should("exist");
  });

  it("deve exibir erro ao enviar campos vazios", () => {
    cy.contains("button", "Entrar").click();
    cy.contains("Preencha email e senha").should("exist");
  });

  it("deve exibir erro com credenciais inválidas", () => {
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 401,
      body: { success: false, message: "Credenciais inválidas" },
    }).as("loginFail");

    cy.get("input[type='email']").type("errado@teste.com");
    cy.get("input[type='password']").type("errado123");
    cy.contains("button", "Entrar").click();
    cy.wait("@loginFail");
    cy.contains("Credenciais inválidas").should("exist");
  });

  it("deve fazer login com credenciais válidas e redirecionar", () => {
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 200,
      body: {
        success: true,
        data: {
          token: "mock-token-123",
          usuario: { id: 1, email: "admin@test.com", nome: "Admin Test" },
        },
      },
    }).as("loginSuccess");

    cy.get("input[type='email']").type("admin@test.com");
    cy.get("input[type='password']").type("password123");
    cy.contains("button", "Entrar").click();

    cy.wait("@loginSuccess");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("clp_token")).to.equal("mock-token-123");
    });

    cy.url().should("not.include", "/login");
  });
});
