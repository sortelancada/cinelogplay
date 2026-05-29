# Checklist - TESTES (QA)

#### Responsável: Matheus (Mbolsanello)

#### Apoio: Winley

#### Referência: `11_RESPONSABILIDADES.md` → Seção "TESTES (QA)"

---

## Objetivo

Definir **todas as tarefas de testes (QA)** que Matheus e Winley deverão realizar, garantindo:

- Cobertura completa de testes E2E
- Cypress funcionando sem API real
- Testes 100% passando no CI
- Sistema validado antes de deploy

---

### CYPRESS E2E

### 1: Setup Cypress

- [x] Instalar Cypress v13.x

  ```bash
  pnpm add -D cypress@13
  ```

- [x] Criar `cypress.config.js` na raiz:

  ```js
  module.exports = {
    e2e: {
      baseUrl: "http://localhost:3000",
      viewportWidth: 1280,
      viewportHeight: 720,
      requestTimeout: 10000,
      responseTimeout: 10000,
    },
  };
  ```

- [x] Adicionar script em `package.json`:

  ```json
  {
    "scripts": {
      "test:ci": "cypress run",
      "cypress:open": "cypress open"
    }
  }
  ```

- [x] Criar estrutura de pastas:
  ```
  cypress/
  ├── e2e/
  │   ├── home.cy.js
  │   ├── diretores.cy.js
  │   ├── contato.cy.js
  │   └── responsividade.cy.js
  └── fixtures/
      ├── filmes.json
      ├── diretores.json
      └── contato.json
  ```

---

### 2: Criar Fixtures

**Arquivo: `cypress/fixtures/filmes.json`**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "titulo": "O Poderoso Chefão",
      "ano": 1972,
      "genero": "Crime",
      "tipo": "Clássico"
    },
    {
      "id": 2,
      "titulo": "Interestelar",
      "ano": 2014,
      "genero": "Ficção Científica",
      "tipo": "Moderno"
    },
    {
      "id": 3,
      "titulo": "Pulp Fiction",
      "ano": 1994,
      "genero": "Crime",
      "tipo": "Clássico"
    }
  ]
}
```

**Arquivo: `cypress/fixtures/diretores.json`**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "Francis Ford Coppola",
      "nacionalidade": "EUA",
      "principais_obras": ["O Poderoso Chefão", "Apocalypse Now"]
    },
    {
      "id": 2,
      "nome": "Christopher Nolan",
      "nacionalidade": "Reino Unido",
      "principais_obras": [
        "Interestelar",
        "A Origem",
        "Batman: O Cavaleiro das Trevas"
      ]
    }
  ]
}
```

**Arquivo: `cypress/fixtures/contato.json`**

```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso"
}
```

---

### 3: Testes Home

**Arquivo: `cypress/e2e/home.cy.js`**

```js
describe("Página Home", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/filmes", { fixture: "filmes.json" });
    cy.visit("/");
  });

  it("Deve carregar a página home", () => {
    cy.contains("h1", "CinelogPlay").should("be.visible");
  });

  it("Deve exibir navbar com links", () => {
    cy.get("nav").should("be.visible");
    cy.get("nav a").should("have.length.greaterThan", 0);
  });

  it("Deve exibir cards de filmes", () => {
    cy.get(".card").should("have.length.greaterThan", 0);
  });

  it("Deve exibir footer", () => {
    cy.get("footer").should("be.visible");
  });

  it("Deve funcionar em modo mock (sem API)", () => {
    cy.get(".card").first().should("contain", "Poderoso Chefão");
  });
});
```

- [ ] Testes home criados
- [ ] Testes passando localmente
- [ ] Adicionado ao `test:ci` script

---

### 4: Testes Navegação

**Arquivo: `cypress/e2e/navegacao.cy.js`**

```js
describe("Navegação", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/filmes", { fixture: "filmes.json" });
    cy.intercept("GET", "**/api/diretores", { fixture: "diretores.json" });
    cy.visit("/");
  });

  it("Deve navegar para Home", () => {
    cy.get("nav a[href='/']").click();
    cy.url().should("include", "/");
  });

  it("Deve navegar para Diretores", () => {
    cy.get("nav a[href='/diretores']").click();
    cy.url().should("include", "/diretores");
    cy.contains("h1", "Diretores").should("be.visible");
  });

  it("Deve navegar para Contato", () => {
    cy.get("nav a[href='/contato']").click();
    cy.url().should("include", "/contato");
    cy.get("form").should("be.visible");
  });

  it("Deve voltar da Home para outras páginas e retornar", () => {
    cy.visit("/diretores");
    cy.get("nav a[href='/']").click();
    cy.url().should("include", "/");
  });
});
```

- [ ] Testes navegação criados
- [ ] Testado em 3 resoluções (mobile, tablet, desktop)
- [ ] Testes passando localmente

---

### 5: Testes Diretores

**Arquivo: `cypress/e2e/diretores.cy.js`**

```js
describe("Página Diretores", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/diretores", { fixture: "diretores.json" });
    cy.visit("/diretores");
  });

  it("Deve carregar página de diretores", () => {
    cy.contains("h1", "Diretores").should("be.visible");
  });

  it("Deve exibir cards de diretores", () => {
    cy.get(".card").should("have.length.greaterThan", 0);
  });

  it("Deve exibir informações dos diretores", () => {
    cy.get(".card").first().should("contain", "Francis Ford Coppola");
    cy.get(".card").first().should("contain", "EUA");
  });

  it("Deve exibir principais obras", () => {
    cy.get(".card").first().should("contain", "O Poderoso Chefão");
  });
});
```

- [ ] Testes diretores criados
- [ ] Validação de dados (nome, nacionalidade, obras)
- [ ] Testes passando localmente

---

### 6: Testes Formulário Contato

**Arquivo: `cypress/e2e/contato.cy.js`**

```js
describe("Página Contato", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/api/contato", { fixture: "contato.json" });
    cy.visit("/contato");
  });

  it("Deve carregar página de contato", () => {
    cy.contains("h1", "Contato").should("be.visible");
  });

  it("Deve exibir formulário", () => {
    cy.get("form").should("be.visible");
    cy.get('input[name="nome"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('textarea[name="mensagem"]').should("exist");
  });

  it("Deve validar campo nome obrigatório", () => {
    cy.get('button[type="submit"]').click();
    cy.get('input[name="nome"]').should("have.class", "is-invalid");
  });

  it("Deve validar email válido", () => {
    cy.get('input[name="email"]').type("email-invalido");
    cy.get('button[type="submit"]').click();
    cy.get('input[name="email"]').should("have.class", "is-invalid");
  });

  it("Deve enviar formulário com dados válidos", () => {
    cy.get('input[name="nome"]').type("João Silva");
    cy.get('input[name="email"]').type("joao@example.com");
    cy.get('textarea[name="mensagem"]').type("Ótimo filme!");
    cy.get('button[type="submit"]').click();
    cy.contains("Mensagem enviada").should("be.visible");
  });

  it("Deve funcionar em modo offline (fallback localStorage)", () => {
    // Simular erro de rede
    cy.intercept("POST", "**/api/contato", { forceNetworkError: true });
    cy.get('input[name="nome"]').type("João Silva");
    cy.get('input[name="email"]').type("joao@example.com");
    cy.get('textarea[name="mensagem"]').type("Teste offline");
    cy.get('button[type="submit"]').click();
    // Verificar que fallback funcionou
    cy.contains("modo offline").should("be.visible");
  });
});
```

- [ ] Testes formulário criados
- [ ] Validações de campos testadas
- [ ] Teste de fallback offline implementado
- [ ] Testes passando localmente

---

### 7: Testes Responsividade

**Arquivo: `cypress/e2e/responsividade.cy.js`**

```js
describe("Responsividade", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/filmes", { fixture: "filmes.json" });
    cy.intercept("GET", "**/api/diretores", { fixture: "diretores.json" });
  });

  describe("Mobile (375x667)", () => {
    beforeEach(() => {
      cy.viewport(375, 667);
      cy.visit("/");
    });

    it("Deve exibir navbar mobile", () => {
      cy.get(".navbar-toggler").should("be.visible");
    });

    it("Deve exibir 1 coluna de cards", () => {
      cy.get(".row .col-12").should("have.length.greaterThan", 0);
    });

    it("Não deve ter scroll horizontal", () => {
      cy.get("body").should("not.have.css", "overflow-x", "auto");
    });
  });

  describe("Tablet (768x1024)", () => {
    beforeEach(() => {
      cy.viewport(768, 1024);
      cy.visit("/");
    });

    it("Deve exibir 2 colunas de cards", () => {
      cy.get(".row")
        .first()
        .find(".col-md-6, .col-lg-4")
        .should("have.length.greaterThan", 1);
    });

    it("Deve funcionar navegação", () => {
      cy.get("nav a").should("have.length.greaterThan", 0);
    });
  });

  describe("Desktop (1920x1080)", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit("/");
    });

    it("Deve exibir 3-4 colunas de cards", () => {
      cy.get(".row")
        .first()
        .find(".col-lg-4, .col-lg-3")
        .should("have.length.greaterThan", 2);
    });

    it("Navbar deve estar expandido", () => {
      cy.get(".navbar-collapse").should("have.class", "show");
    });
  });
});
```

- [ ] Testes responsividade em 3 resoluções
- [ ] Mobile (375x667): 1 coluna, hambúrguer menu
- [ ] Tablet (768x1024): 2 colunas
- [ ] Desktop (1920x1080): 3-4 colunas
- [ ] Sem scroll horizontal em nenhuma resolução
- [ ] Testes passando localmente

---

### 8: Configurar CI

- [ ] Verificar `.github/workflows/ci-cd.yml` existe
- [ ] Verificar `test:ci` script em `package.json`
- [ ] Cypress roda com fixtures (SEM API real)
- [ ] CI bloqueador: merge impossível se testes falharem
- [ ] Testes rodando no GitHub Actions (todos passando)

---

### 9: Documentação

- [ ] Atualizar `16_CYPRESS_E2E.md` com testes criados
- [ ] Adicionar exemplos de fixture
- [ ] Documentar padrão de `cy.intercept()`
- [ ] Atualizar `21_CHANGELOG.md`

---

## Checklist de Qualidade

### Testes Funcionais:

- [ ] Home carrega sem erros
- [ ] Navegação funciona (Home → Diretores → Contato)
- [ ] Diretores exibem dados corretamente
- [ ] Formulário valida campos obrigatórios
- [ ] Formulário funciona sem API (fallback)
- [ ] Testes passam em modo offline

### Cobertura:

- [ ] Todos endpoints testados (`/api/filmes`, `/api/diretores`, `/api/contato`)
- [ ] Cenários happy path cobertos
- [ ] Cenários de erro cobertos
- [ ] Validações testadas
- [ ] Responsividade em 3 resoluções

### CI/CD:

- [ ] Testes rodam no GitHub Actions
- [ ] Todos testes passando (0 falhas)
- [ ] CI bloqueia merge se testes falharem
- [ ] Artifacts capturados se falhar (screenshots)

---

## Comunicação com Winley (Apoio)

Se precisar de ajuda:

```
@Winley
Preciso de ajuda com testes [descrição]
Bloqueio: [o que está impedindo]
```

---

## Documentos Relacionados

- **01_ESCOPO_DO_PROJETO.md** → O que testar
- **16_CYPRESS_E2E.md** → Detalhes técnicos Cypress
- **14_DEFINITION_OF_DONE.md** → Quando testes estão prontos
- **18_CI_CD.md** → CI/CD configurado

---

## Critério de Sucesso

- Todos 7 arquivos de teste criados (home, navegação, diretores, contato, responsividade + fixtures)
- 100% dos testes passando localmente
- 100% dos testes passando no CI (GitHub Actions)
- CI bloqueador funcionando (merge impossível se falhar)
- Documentação atualizada
- Winley validou testes

---

# `TAREFAS COMPARTILHADAS (TODOS) !!!`

### Versionamento e Workflow

#### Branch Management

- [ ] Criar feature branch: `git checkout -b feature/[area]`
- [ ] Manter branch atualizada: `git pull origin main`
- [ ] Commits descritivos: `feat:`, `fix:`, `docs:`, `test:`

#### Pull Requests

- [ ] Criar PR para main com descrição clara
- [ ] Aguardar 1 aprovação mínima
- [ ] Garantir CI verde antes de merge
- [ ] Resolver comentários antes de merge

#### Documentação

- [ ] Atualizar docs se fazer mudanças na arquitetura
- [ ] Documentar novos endpoints (se backend)
- [ ] Documentar novos testes (se testes)

---

# `Deploy e Apresentação`

#### Antes da Apresentação

- [ ] Frontend funciona sem backend
- [ ] Backend funciona sem banco
- [ ] Testes passam localmente
- [ ] CI/CD verde no GitHub
- [ ] Deploy online funcionando

#### Checklist de Apresentação

- [ ] Repositório no GitHub acessível
- [ ] README.md completo e atualizado
- [ ] Projeto rodando localmente
- [ ] Cypress funcionando
- [ ] Pipeline CI executando
- [ ] Frontend online (Vercel)
- [ ] Backend online (Render)
- [ ] Teste de robustez: desligar backend, frontend funciona

---

## Plano de Desenvolvimento — `CinelogPlay`

Este cronograma organiza a divisão de responsabilidades entre os membros do time, Lucas, Matheus e Henrique, garantindo fluxo contínuo de desenvolvimento, testes e DevOps.

> ## Distribuição de Responsabilidades

| Semana | `Lucas (Frontend)`                                    | `Henrique (Backend+DevOps)`                               | `Matheus (Testes)`                           | `Winley (Apoio Testes + DevOps)`                             |
| ------ | ----------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------ |
| **1**  | Estrutura base (HTML, CSS, layout inicial, mock data) | Setup do backend (Express, rotas iniciais, estrutura API) | Setup do Cypress + fixtures iniciais         | Validar setup do Cypress + estrutura inicial do projeto      |
| **2**  | Páginas adicionais + integração com API               | Services, regras de negócio + melhorias de arquitetura    | Testes E2E (Home, navegação, formulários)    | Validar testes localmente + apoio na criação de cenários E2E |
| **3**  | Integração completa + ajustes UI/UX                   | Docker + CI/CD (GitHub Actions + deploy pipeline)         | Validação CI + automação Cypress no pipeline | Validar CI/CD + apoiar integração dos testes no pipeline     |
| **4**  | Ajustes finais + refinamento visual                   | Ajustes finais + deploy backend                           | Testes finais + regressão completa           | Monitoramento, validação de deploy e testes de robustez      |

---

## (DoD)

Uma tarefa está pronta quando:

- Código funcional
- Segue padrão do projeto
- Sem erros no console
- Funciona com mock/fallback
- Testes passam localmente
- Commit realizado corretamente
- PR criado e aprovado
- CI verde
- Deploy refletido online

---
