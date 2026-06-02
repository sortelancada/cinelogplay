const MOCK_DIRETORES = [
  { id: 1, nome: "Christopher Nolan", nacionalidade: "Britânico", foto: "" },
  { id: 2, nome: "Denis Villeneuve", nacionalidade: "Canadense", foto: "" },
];

describe("Página de Diretores", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/diretores", {
      body: { success: true, data: MOCK_DIRETORES },
    }).as("getDiretores");
    cy.visit("/diretores");
  });

  it("deve carregar a página de diretores", () => {
    cy.contains("Diretores").should("exist");
  });

  it("deve exibir input de busca", () => {
    cy.get("input[placeholder*='Buscar']").should("exist");
  });

  it("deve exibir contagem de diretores após carregamento", () => {
    cy.wait("@getDiretores");
    cy.contains(`${MOCK_DIRETORES.length} diretores`).should("exist");
  });

  it("deve filtrar diretores por nome", () => {
    cy.wait("@getDiretores");
    cy.get("input[placeholder*='Buscar']").type("Nolan");
    cy.contains("1 diretores").should("exist");
  });
});
