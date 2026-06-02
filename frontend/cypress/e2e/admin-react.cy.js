/**
 * admin-react.cy.js
 * Testes E2E para o painel administrativo React (/admin/*)
 * Não testa admin.html legado — usa rotas e seletores React.
 */

// ── Dados de mock ─────────────────────────────────────────────────────────────

const ADMIN_USER = { id: 1, nome: "Admin Teste", email: "admin@test.com" };
const ADMIN_TOKEN = "admin-test-token-123";

const MOCK_FILMES = [
  { id: 1, titulo: "Filme Alfa", ano: 2023, genero: "Ação", classificacao: "12", tipo: "filme", imagem: "" },
  { id: 2, titulo: "Filme Beta", ano: 2022, genero: "Drama", classificacao: "14", tipo: "filme", imagem: "" },
];

const MOCK_ATORES = [
  { id: 1, nome: "Ator Um", nacionalidade: "Brasileiro", data_nascimento: "1980-01-01", foto: "" },
];

const MOCK_DIRETORES = [
  { id: 1, nome: "Diretor Um", nacionalidade: "Americano", principais_obras: "Obra A", foto: "" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function interceptApiDefaults() {
  cy.intercept("GET", "**/api/filmes", { body: { success: true, data: MOCK_FILMES } }).as("getFilmes");
  cy.intercept("GET", "**/api/atores", { body: { success: true, data: MOCK_ATORES } }).as("getAtores");
  cy.intercept("GET", "**/api/diretores", { body: { success: true, data: MOCK_DIRETORES } }).as("getDiretores");
}

function visitAsAdmin(path = "/admin") {
  interceptApiDefaults();
  cy.visit(path, {
    onBeforeLoad(win) {
      win.localStorage.setItem("clp_token", ADMIN_TOKEN);
      win.localStorage.setItem("clp_user", JSON.stringify(ADMIN_USER));
    },
  });
}

// ── Suite de testes ───────────────────────────────────────────────────────────

describe("Admin React — Autenticação", () => {
  beforeEach(() => cy.clearLocalStorage());

  it("redireciona para /login quando não autenticado", () => {
    cy.visit("/admin");
    cy.url().should("include", "/login");
    cy.url().should("not.include", "/admin");
  });

  it("permanece em /admin quando autenticado", () => {
    visitAsAdmin();
    cy.url().should("include", "/admin");
    cy.url().should("not.include", "/login");
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("Admin React — Dashboard", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    visitAsAdmin();
  });

  it("exibe título Dashboard", () => {
    cy.contains("h4", "Dashboard").should("be.visible");
  });

  it("exibe cards de estatísticas", () => {
    cy.wait("@getFilmes");
    cy.wait("@getAtores");
    cy.wait("@getDiretores");
    cy.contains("Filmes").should("be.visible");
    cy.contains("Atores").should("be.visible");
    cy.contains("Diretores").should("be.visible");
  });

  it("exibe nome do usuário na sidebar", () => {
    cy.contains(ADMIN_USER.nome).should("be.visible");
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("Admin React — Navegação", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    visitAsAdmin();
  });

  it("navega para /admin/filmes via sidebar", () => {
    cy.contains("a", "Filmes").click();
    cy.url().should("include", "/admin/filmes");
    cy.contains("h4", "Filmes").should("be.visible");
  });

  it("navega para /admin/atores via sidebar", () => {
    cy.contains("a", "Atores").click();
    cy.url().should("include", "/admin/atores");
    cy.contains("h4", "Atores").should("be.visible");
  });

  it("navega para /admin/diretores via sidebar", () => {
    cy.contains("a", "Diretores").click();
    cy.url().should("include", "/admin/diretores");
    cy.contains("h4", "Diretores").should("be.visible");
  });

  it("navega de volta ao dashboard via sidebar", () => {
    cy.contains("a", "Filmes").click();
    cy.contains("a", "Dashboard").click();
    cy.url().should("match", /\/admin\/?$/);
    cy.contains("h4", "Dashboard").should("be.visible");
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("Admin React — Filmes: listagem", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    visitAsAdmin("/admin/filmes");
    cy.wait("@getFilmes");
  });

  it("exibe a tabela de filmes com cabeçalhos", () => {
    cy.contains("th", "Título").should("be.visible");
    cy.contains("th", "Ano").should("be.visible");
    cy.contains("th", "Gênero").should("be.visible");
    cy.contains("th", "Class.").should("be.visible");
  });

  it("lista os filmes retornados pela API", () => {
    cy.contains("td", "Filme Alfa").should("be.visible");
    cy.contains("td", "Filme Beta").should("be.visible");
  });

  it("exibe classificação em badge", () => {
    cy.contains("span", "12").should("be.visible");
    cy.contains("span", "14").should("be.visible");
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("Admin React — Filmes: criar", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    visitAsAdmin("/admin/filmes");
    cy.wait("@getFilmes");
  });

  it("abre o modal ao clicar em '+ Novo Filme'", () => {
    cy.contains("button", "+ Novo Filme").click();
    cy.contains("Novo Filme").should("be.visible");
    cy.get("input[placeholder='Nome do filme']").should("be.visible");
  });

  it("fecha o modal ao clicar em Cancelar", () => {
    cy.contains("button", "+ Novo Filme").click();
    cy.contains("button", "Cancelar").click();
    cy.get("input[placeholder='Nome do filme']").should("not.exist");
  });

  it("valida título obrigatório antes de enviar", () => {
    cy.contains("button", "+ Novo Filme").click();
    cy.contains("button", "Salvar").click();
    cy.contains("Título é obrigatório").should("be.visible");
  });

  it("cria filme com sucesso e fecha modal", () => {
    cy.intercept("POST", "**/api/filmes", {
      body: { success: true, data: { id: 99, titulo: "Filme Novo" } },
    }).as("createFilme");

    cy.contains("button", "+ Novo Filme").click();
    cy.get("input[placeholder='Nome do filme']").type("Filme Novo");
    cy.contains("button", "Salvar").click();

    cy.wait("@createFilme");
    cy.get("input[placeholder='Nome do filme']").should("not.exist");
    cy.contains("Filme criado").should("be.visible");
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("Admin React — Filmes: editar", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    visitAsAdmin("/admin/filmes");
    cy.wait("@getFilmes");
  });

  it("abre modal de edição com dados preenchidos ao clicar em ✏", () => {
    cy.contains("tr", "Filme Alfa").within(() => {
      cy.get("button[title='Editar']").click();
    });
    cy.contains("Editar Filme").should("be.visible");
    cy.get("input[placeholder='Nome do filme']").should("have.value", "Filme Alfa");
  });

  it("salva edição e fecha modal", () => {
    cy.intercept("PUT", "**/api/filmes/1", {
      body: { success: true },
    }).as("updateFilme");

    cy.contains("tr", "Filme Alfa").within(() => {
      cy.get("button[title='Editar']").click();
    });
    cy.get("input[placeholder='Nome do filme']").clear().type("Filme Alfa Editado");
    cy.contains("button", "Salvar").click();

    cy.wait("@updateFilme");
    cy.get("input[placeholder='Nome do filme']").should("not.exist");
    cy.contains("Filme atualizado").should("be.visible");
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("Admin React — Filmes: excluir", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    visitAsAdmin("/admin/filmes");
    cy.wait("@getFilmes");
  });

  it("abre modal de confirmação ao clicar em 🗑", () => {
    cy.contains("tr", "Filme Beta").within(() => {
      cy.get("button[title='Excluir']").click();
    });
    cy.contains("Confirmar Exclusão").should("be.visible");
    cy.contains("Filme Beta").should("be.visible");
  });

  it("cancela exclusão e fecha modal", () => {
    cy.contains("tr", "Filme Beta").within(() => {
      cy.get("button[title='Excluir']").click();
    });
    cy.contains("button", "Cancelar").last().click();
    cy.contains("Confirmar Exclusão").should("not.exist");
  });

  it("confirma exclusão e exibe toast de sucesso", () => {
    cy.intercept("DELETE", "**/api/filmes/2", {
      body: { success: true },
    }).as("deleteFilme");

    cy.contains("tr", "Filme Beta").within(() => {
      cy.get("button[title='Excluir']").click();
    });
    cy.contains("button", "Excluir").last().click();

    cy.wait("@deleteFilme");
    cy.contains("Filme excluído").should("be.visible");
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("Admin React — Logout", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    visitAsAdmin();
  });

  it("remove token e redireciona para /login ao clicar em Sair", () => {
    cy.contains("button", "Sair").click();
    cy.url().should("include", "/login");
    cy.window().then((win) => {
      expect(win.localStorage.getItem("clp_token")).to.be.null;
    });
  });
});
