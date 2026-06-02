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

  // ──────────────────────────────────────────────────────────────────
  // LOGIN COM ERRO
  // ──────────────────────────────────────────────────────────────────

  it("deve exibir erro com credenciais inválidas", () => {
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 401,
      body: {
        success: false,
        message: "Email ou senha incorretos",
      },
    }).as("loginFailed");

    cy.get("#login-email").type("wrong@test.com");
    cy.get("#login-senha").type("wrongpassword");
    cy.get("#login-btn").click();

    cy.wait("@loginFailed");

    cy.get("#login-error").should("not.have.class", "d-none");
    cy.get("#login-error").should("contain", "Email ou senha");
  });

  it("deve exibir erro de conexão", () => {
    cy.intercept("POST", "**/api/auth/login", {
      forceNetworkError: true,
    }).as("networkError");

    cy.get("#login-email").type("test@test.com");
    cy.get("#login-senha").type("password");
    cy.get("#login-btn").click();

    cy.get("#login-error").should("not.have.class", "d-none");
    cy.get("#login-error").should("contain", "Erro de conexão");
  });

  // ──────────────────────────────────────────────────────────────────
  // UX E INTERAÇÃO
  // ──────────────────────────────────────────────────────────────────

  it("deve limpar erro ao digitar", () => {
    // Simular erro
    cy.get("#login-btn").click();
    cy.get("#login-error").should("not.have.class", "d-none");

    // Digitar email
    cy.get("#login-email").type("test@test.com");

    // Erro deve desaparecer
    cy.get("#login-error").should("have.class", "d-none");
  });

  it("deve desabilitar botão ao fazer login", () => {
    cy.intercept("POST", "**/api/auth/login", (req) => {
      // Delay para ver o estado desabilitado
      req.reply((res) => {
        setTimeout(() => {
          res.send({
            statusCode: 200,
            body: {
              success: true,
              data: {
                token: "test-token",
              },
            },
          });
        }, 100);
      });
    }).as("slowLogin");

    cy.get("#login-email").type("test@test.com");
    cy.get("#login-senha").type("password");
    cy.get("#login-btn").click();

    // Botão deve estar desabilitado durante login
    cy.get("#login-btn").should("be.disabled");
  });

  it("deve fazer login ao pressionar Enter na senha", () => {
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 200,
      body: {
        success: true,
        data: {
          token: "mock-token-123",
        },
      },
    }).as("loginWithEnter");

    cy.get("#login-email").type("admin@test.com");
    cy.get("#login-senha").type("password123{enter}");

    cy.wait("@loginWithEnter");
    cy.url().should("include", "/pages/home.html");
  });

  // ──────────────────────────────────────────────────────────────────
  // LINKS E NAVEGAÇÃO
  // ──────────────────────────────────────────────────────────────────

  it("deve permitir voltar para home", () => {
    cy.get("a[href='/pages/home.html']").click();
    cy.url().should("include", "/pages/home.html");
  });
});
