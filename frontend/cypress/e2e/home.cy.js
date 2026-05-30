// frontend/cypress/e2e/home.cy.js

describe("Home Page", () => {
  // Teste 1: Carregar página home
  it("deve carregar a página home", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "CinelogPlay");
  });

  // Teste 2: Carregar filmes com fixture
  it("deve carregar filmes da API", () => {
    // Intercepta requisição GET /api/filmes e retorna fixture
    cy.intercept("GET", "/api/filmes", {
      fixture: "filmes.json",
    }).as("getFilmes");

    // Visita a página
    cy.visit("/");

    // Aguarda a requisição ser completada
    cy.wait("@getFilmes");

    // Verifica se um dos filmes aparece
    cy.contains("O Poderoso Chefão").should("be.visible");
  });

  // Teste 3: Menu hambúrguer funciona
  it("deve abrir e fechar menu hambúrguer", () => {
    cy.visit("/");

    // Clica no botão menu
    cy.get("#menuToggle").click();

    // Verifica se sidebar fica ativa
    cy.get("#sidebar").should("have.class", "active");

    // Clica fora para fechar
    cy.get("#sidebarOverlay").click();

    // Verifica se sidebar fecha
    cy.get("#sidebar").should("not.have.class", "active");
  });

  // Teste 4: Dropdown de perfil funciona
  it("deve abrir e fechar dropdown de perfil", () => {
    cy.visit("/");

    // Clica no botão de perfil
    cy.get("#userProfileBtn").click();

    // Verifica se dropdown fica ativo
    cy.get("#userDropdown").should("have.class", "active");

    // Clica fora para fechar
    cy.get("body").click(0, 0);

    // Verifica se dropdown fecha
    cy.get("#userDropdown").should("not.have.class", "active");
  });

  // Teste 5: Navegação funciona
  it("deve navegar para página de filmes", () => {
    cy.visit("/");

    // Clica no link de filmes
    cy.get('a[data-page="filmes"]').click();

    // Verifica se a página mudou
    cy.contains("Catálogo de Filmes").should("be.visible");
  });
});
