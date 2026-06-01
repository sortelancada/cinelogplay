describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/pages/home.html");
  });

  it("deve carregar a página home", () => {
    cy.get(".hero-title").should("contain", "O melhor do cinema");
  });

  it("deve exibir seções de filmes", () => {
    cy.get("#section-destaque").should("exist");
    cy.get("#section-lancamentos").should("exist");
    cy.get("#section-classicos").should("exist");
  });

  it("deve abrir e fechar menu hambúrguer", () => {
    cy.get("#menuToggle").click();
    cy.get("#sidebar").should("have.class", "active");
    cy.get("#menuToggle").click();
    cy.get("#sidebar").should("not.have.class", "active");
  });

  it("deve abrir e fechar dropdown de perfil", () => {
    cy.get("#userProfileBtn").click();
    cy.get("#userDropdown").should("have.class", "active");
    cy.get("#userProfileBtn").click();
    cy.get("#userDropdown").should("not.have.class", "active");
  });

  it("deve navegar para página de filmes via sidebar", () => {
    // Abrir menu primeiro
    cy.get("#menuToggle").click();
    // Clicar no link via sidebar
    cy.get(".sidebar-nav a[href='/pages/filmes.html']").click();
    // Verificar navegação
    cy.url().should("include", "/pages/filmes.html");
  });
});
