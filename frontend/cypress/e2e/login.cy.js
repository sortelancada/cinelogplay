describe("Página de Login", () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    cy.clearLocalStorage();
    cy.visit("http://localhost:5173/pages/login.html");
  });

  // ──────────────────────────────────────────────────────────────────
  // CARREGAMENTO DA PÁGINA
  // ──────────────────────────────────────────────────────────────────

  it("deve carregar a página de login", () => {
    cy.get(".login-card").should("exist");
    cy.get("#login-form").should("exist");
    cy.get("#login-email").should("exist");
    cy.get("#login-senha").should("exist");
  });

  it("deve exibir formulário com todos os campos", () => {
    cy.get("#login-email").should("exist");
    cy.get("#login-senha").should("exist");
    cy.get("#login-btn").should("exist").and("contain", "Entrar");
    cy.get("a[href='/pages/home.html']").should("exist");
  });

  it("deve ter logo ou texto de marca", () => {
    // Verificar se existe logo ou texto de fallback
    cy.get(".login-logo, #login-brand-text").should("exist");
  });

  // ──────────────────────────────────────────────────────────────────
  // VALIDAÇÃO DE CAMPOS
  // ──────────────────────────────────────────────────────────────────

  it("deve validar email vazio", () => {
    cy.get("#login-email").should("have.attr", "required");
  });

  it("deve validar senha vazia", () => {
    cy.get("#login-senha").should("have.attr", "required");
  });

  it("deve exibir erro ao tentar enviar vazio", () => {
    cy.get("#login-btn").click();
    cy.get("#login-error").should("not.have.class", "d-none");
  });

  // ──────────────────────────────────────────────────────────────────
  // LOGIN COM SUCESSO
  // ──────────────────────────────────────────────────────────────────

  it("deve fazer login com credenciais válidas", () => {
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 200,
      body: {
        success: true,
        data: {
          token: "mock-token-123",
          usuario: {
            id: 1,
            email: "admin@test.com",
            nome: "Admin Test",
          },
        },
      },
    }).as("loginSuccess");

    cy.get("#login-email").type("admin@test.com");
    cy.get("#login-senha").type("password123");
    cy.get("#login-btn").click();

    cy.wait("@loginSuccess");

    // Verificar se token foi salvo
    cy.window().then((win) => {
      expect(win.localStorage.getItem("clp_token")).to.equal("mock-token-123");
    });

    // Verificar se redirecionou
    cy.url().should("include", "/pages/home.html");
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
