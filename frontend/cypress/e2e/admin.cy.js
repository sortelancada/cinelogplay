describe("Painel Administrativo", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  // ──────────────────────────────────────────────────────────────────
  // FLUXO DE LOGIN
  // ──────────────────────────────────────────────────────────────────

  it("deve redirecionar para login se não estiver autenticado", () => {
    cy.visit("http://localhost:5173/pages/admin.html");
    // O admin.html com JS inline deve verificar token
    // Se não tiver, mostra login-screen
    cy.get("#login-screen").should("exist");
  });

  it("deve fazer login e acessar o painel", () => {
    cy.visit("http://localhost:5173/pages/admin.html");

    // Interceptar login
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 200,
      body: {
        success: true,
        data: {
          token: "admin-token-123",
          usuario: {
            id: 1,
            email: "admin@test.com",
            nome: "Admin Teste",
          },
        },
      },
    }).as("adminLogin");

    // Preencher formulário de login
    cy.get("#login-email").type("admin@test.com");
    cy.get("#login-senha").type("password123");
    cy.get("button:contains('Entrar')").first().click();

    cy.wait("@adminLogin");

    // Verificar se token foi salvo
    cy.window().then((win) => {
      expect(win.localStorage.getItem("clp_token")).to.equal(
        "admin-token-123"
      );
    });

    // Admin panel deve ser visível
    cy.get("#admin-panel").should("be.visible");
    cy.get("#login-screen").should("not.be.visible");
  });

  // ──────────────────────────────────────────────────────────────────
  // DASHBOARD
  // ──────────────────────────────────────────────────────────────────

  it("deve exibir dashboard com stats", () => {
    // Setup: Login primeiro
    setupAdminLogin();

    // Interceptar chamadas de API
    cy.intercept("GET", "**/api/filmes", {
      statusCode: 200,
      body: {
        success: true,
        data: [
          { id: 1, titulo: "Filme 1" },
          { id: 2, titulo: "Filme 2" },
        ],
      },
    });

    cy.intercept("GET", "**/api/diretores", {
      statusCode: 200,
      body: {
        success: true,
        data: [{ id: 1, nome: "Diretor 1" }],
      },
    });

    cy.intercept("GET", "**/api/atores", {
      statusCode: 200,
      body: {
        success: true,
        data: [
          { id: 1, nome: "Ator 1" },
          { id: 2, nome: "Ator 2" },
        ],
      },
    });

    cy.visit("http://localhost:5173/pages/admin.html");

    // Stats devem aparecer
    cy.get("#stat-filmes").should("contain", "2");
    cy.get("#stat-diretores").should("contain", "1");
    cy.get("#stat-atores").should("contain", "2");
  });

  it("deve exibir welcome message", () => {
    setupAdminLogin();
    cy.visit("http://localhost:5173/pages/admin.html");

    // Deve exibir nome do usuário
    cy.get("#user-info").should("contain", "Admin Teste");
  });

  // ──────────────────────────────────────────────────────────────────
  // NAVEGAÇÃO DO PAINEL
  // ──────────────────────────────────────────────────────────────────

  it("deve navegar entre seções", () => {
    setupAdminLogin();
    cy.visit("http://localhost:5173/pages/admin.html");

    // Interceptar dados
    cy.intercept("GET", "**/api/filmes", { data: [] });
    cy.intercept("GET", "**/api/diretores", { data: [] });
    cy.intercept("GET", "**/api/atores", { data: [] });

    // Dashboard ativo por padrão
    cy.get("#section-dashboard").should("have.class", "active");

    // Clicar em Filmes
    cy.get(".nav-link").contains("Filmes").click();
    cy.get("#section-filmes").should("have.class", "active");

    // Clicar em Atores
    cy.get(".nav-link").contains("Atores").click();
    cy.get("#section-atores").should("have.class", "active");

    // Clicar em Diretores
    cy.get(".nav-link").contains("Diretores").click();
    cy.get("#section-diretores").should("have.class", "active");
  });

  // ──────────────────────────────────────────────────────────────────
  // SEÇÃO DE FILMES
  // ──────────────────────────────────────────────────────────────────

  it("deve listar filmes", () => {
    setupAdminLogin();

    cy.intercept("GET", "**/api/filmes", {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            id: 1,
            titulo: "Filme Teste",
            ano: 2024,
            genero: "Ação",
            classificacao: "12",
          },
        ],
      },
    }).as("getFilmes");

    cy.visit("http://localhost:5173/pages/admin.html");
    cy.get(".nav-link").contains("Filmes").click();

    cy.wait("@getFilmes");

    // Verificar se filme aparece na tabela
    cy.get("#table-filmes").should("be.visible");
    cy.get("#tbody-filmes").should("contain", "Filme Teste");
  });

  it("deve abrir modal para criar novo filme", () => {
    setupAdminLogin();

    cy.intercept("GET", "**/api/filmes", { data: [] });
    cy.visit("http://localhost:5173/pages/admin.html");

    cy.get(".nav-link").contains("Filmes").click();
    cy.get("button").contains("Novo Filme").click();

    // Modal deve abrir
    cy.get("#modalFilme").should("be.visible");
    cy.get("#tituloModalFilme").should("contain", "Novo Filme");
  });

  // ──────────────────────────────────────────────────────────────────
  // LOGOUT
  // ──────────────────────────────────────────────────────────────────

  it("deve fazer logout", () => {
    setupAdminLogin();
    cy.visit("http://localhost:5173/pages/admin.html");

    // Encontrar e clicar no botão de logout
    cy.get(".sidebar-nav").within(() => {
      cy.get("button").contains("Sair").click();
    });

    // Deve voltar para login
    cy.get("#login-screen").should("be.visible");
    cy.get("#admin-panel").should("not.be.visible");
  });

  // ──────────────────────────────────────────────────────────────────
  // RESPONSIVIDADE
  // ──────────────────────────────────────────────────────────────────

  it("deve ser responsivo em mobile", () => {
    cy.viewport("iphone-x");
    setupAdminLogin();

    cy.intercept("GET", "**/api/filmes", { data: [] });
    cy.intercept("GET", "**/api/diretores", { data: [] });
    cy.intercept("GET", "**/api/atores", { data: [] });

    cy.visit("http://localhost:5173/pages/admin.html");

    // Sidebar deve existir
    cy.get(".sidebar").should("exist");

    // Deve ser acessível
    cy.get(".nav-link").first().should("be.visible");
  });
});

// ──────────────────────────────────────────────────────────────────
// HELPER: Setup admin login
// ──────────────────────────────────────────────────────────────────

function setupAdminLogin() {
  cy.intercept("POST", "**/api/auth/login", {
    statusCode: 200,
    body: {
      success: true,
      data: {
        token: "admin-token-123",
        usuario: {
          id: 1,
          email: "admin@test.com",
          nome: "Admin Teste",
        },
      },
    },
  });
}
