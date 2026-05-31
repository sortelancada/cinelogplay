# Cypress — Testes End-to-End (E2E)

## Índice

- [Cypress — Testes End-to-End (E2E)](#cypress--testes-end-to-end-e2e)
  - [Índice](#índice)
  - [Instalação](#instalação)
  - [Estrutura obrigatória](#estrutura-obrigatória)
  - [Configuração do Cypress](#configuração-do-cypress)
    - [Arquivo: `cypress.config.js`](#arquivo-cypressconfigjs)
  - [Dados mock (OBRIGATÓRIO)](#dados-mock-obrigatório)
    - [Arquivo: `cypress/fixtures/filmes.json`](#arquivo-cypressfixturesfilmesjson)
  - [Teste inicial](#teste-inicial)
    - [Arquivo: `cypress/e2e/home.cy.js`](#arquivo-cypresse2ehomecyjs)
  - [Scripts Utilizados](#scripts-utilizados)
    - [Arquivo: `frontend/package.json`](#arquivo-frontendpackagejson)
  - [Execução local](#execução-local)
    - [Rodar aplicação:](#rodar-aplicação)
    - [Abrir Cypress:](#abrir-cypress)
  - [Execução no CI](#execução-no-ci)
  - [Boas práticas obrigatórias durante o desenvolvimento](#boas-práticas-obrigatórias-durante-o-desenvolvimento)
    - [CRÍTICO](#crítico)
    - [SEMPRE usar:](#sempre-usar)
    - [Benefícios:](#benefícios)
  - [Cenários de teste](#cenários-de-teste)
  - [Erros comuns](#erros-comuns)
  - [Resultado esperado](#resultado-esperado)

---

Garantir que o sistema funcione corretamente através de testes automatizados **sem depender do backend**, assegurando:

- Estabilidade do sistema
- Execução no CI (GitHub Actions)
- Independência de API externa

---

## Instalação

```bash
pnpm add cypress start-server-and-test --save-dev
```

---

## Estrutura obrigatória

```
frontend/
└── cypress/
    ├── e2e/
    │   ├── contato.cy.js
    │   ├── diretores.cy.js
    │   ├── home.cy.js
    │   └── responsividade.cy.js
    │
    ├── fixtures/
    │   ├── contato.json
    │   ├── diretores.json
    │   └── filmes.json
    │
    └── support/
        ├── commands.js
        └── e2e.js

frontend/cypress.config.js
```

---

## Configuração do Cypress

### Arquivo: `cypress.config.js`

```js
module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000",
  },
};
```

---

## Dados mock (OBRIGATÓRIO)

### Arquivo: `cypress/fixtures/filmes.json`

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "titulo": "Filme Teste",
      "ano": 2024,
      "genero": "Ação"
    }
  ]
}
```

---

## Teste inicial

### Arquivo: `cypress/e2e/home.cy.js`

```js
describe("Home", () => {
  it("deve carregar filmes", () => {
    cy.intercept("GET", "/api/filmes", {
      fixture: "filmes.json",
    });

    cy.visit("/");
    cy.contains("Filme Teste");
  });
});
```

---

## Scripts Utilizados

Os scripts oficiais utilizados pelos testes Cypress devem ser mantidos no arquivo:

### Arquivo: `frontend/package.json`

```js
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "test:ci": "start-server-and-test dev http://localhost:3000 cy:run"
  }
}
```

---

## Execução local

### Rodar aplicação:

```bash
cd frontend

pnpm run dev
```

### Abrir Cypress:

```bash
cd frontend

pnpm run cypress:open
```

---

## Execução no CI

```bash
pnpm run test:ci
```

Esse comando:

1. Sobe o servidor local
2. Aguarda a aplicação ficar disponível
3. Executa os testes automaticamente

---

## Boas práticas obrigatórias durante o desenvolvimento

### CRÍTICO

- NUNCA depender da API real
- NUNCA fazer requisição externa

---

### SEMPRE usar:

```js
cy.intercept(...)
```

---

### Benefícios:

- Testes sempre passam
- Independência do backend
- Execução confiável no CI

---

## Cenários de teste

Os testes devem cobrir:

1. Carregamento da página inicial
2. Navegação via navbar
3. Renderização de filmes
4. Interações do usuário
5. Formulário de contato
6. Responsividade (viewport)

---

## Erros comuns

- Cypress chamando API real
- Não usar `cy.intercept`
- Servidor não rodando no CI
- Porta diferente de `3000`
- Falta de fixtures
- Testes dependentes de dados externos

---

## Resultado esperado

- Cypress rodando localmente
- Cypress rodando no CI
- Testes passando sempre
- Sistema validado automaticamente

---
