# Plano de Testes — CinelogPlay

## Proposta

Este documento define como o sistema CinelogPlay será testado, garantindo que todas as funcionalidades estejam corretas, estáveis e alinhadas com os requisitos do projeto.

---

## Estratégia de Testes

O projeto utiliza uma estratégia combinada de testes para validar tanto o frontend quanto o backend da aplicação.

- Testes End-to-End (E2E) com Cypress
- Testes automatizados de backend com Jest
- Testes desacoplados do backend utilizando mocks (fixtures)
- Validação de funcionamento em modo offline e cenários de fallback

---

## Tipos de Testes

### 1. Testes Funcionais

Validam se o sistema faz o que foi definido nos requisitos.

---

### 2. Testes de Interface (UI)

Validam:

- Layout
- Renderização
- Elementos visuais

---

### 3. Testes de Navegação

Validam:

- Mudança de páginas
- Links da navbar
- Fluxo do usuário

---

### 4. Testes de Resiliência

Validam:

- Funcionamento sem backend
- Funcionamento sem banco
- Uso de fallback

---

### 5. Testes de Responsividade

Validam:

- Desktop
- Tablet
- Mobile

---

### 6. Testes de Backend

Validam:

- Serviços
- Controladores
- Regras de negócio da API

Executados utilizando Jest.

---

## Ambiente de Testes

- URL base: `http://localhost:5173`
- Cypress configurado
- Fixtures disponíveis

---

## Estrutura de Testes

### Frontend

```text
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

### Backend

```text
backend/src/tests/
├── contato.test.js
├── diretores.test.js
└── filmes.test.js
```

---

## Regras Obrigatórias

- Testes NÃO podem depender da API real
- Uso obrigatório de `cy.intercept`
- Uso obrigatório de fixtures

---

## Cenários de Teste

### CT01 — Carregamento da Home

- Acessar `/`
- Validar carregamento de filmes

Resultado esperado:

- Página carrega corretamente
- Filmes aparecem na tela

---

### CT02 — Navegação

- Clicar nos links da navbar

Resultado esperado:

- Navegação funciona sem erro

---

### CT03 — Exibição de Filmes

- Validar presença de:
  - título
  - gênero
  - ano

Resultado esperado:

- Dados exibidos corretamente

---

### CT04 — Página de Diretores

- Acessar página de diretores

Resultado esperado:

- Diretores exibidos corretamente

---

### CT05 — Formulário de Contato

- Preencher formulário
- Enviar

Resultado esperado:

- Mensagem enviada ou fallback acionado

---

### CT06 — Fallback Frontend

- Remover API

Resultado esperado:

- Sistema usa `/data/*.json`

---

### CT07 — Resiliência Backend

- Simular falha do banco

Resultado esperado:

- API retorna mock

---

### CT08 — Responsividade

- Testar em diferentes resoluções

Resultado esperado:

- Layout adaptado corretamente

---

## Execução dos Testes

Frontend:

```bash
cd frontend

pnpm run dev
pnpm run cy:open
```

Backend (quando necessário):

```bash
cd backend

pnpm test
```

### CI (Automático)

```bash
pnpm run test:ci
```

---

## Critérios

Sistema aprovado:

- Todos os testes devem passar
- Nenhum erro crítico deve existir
- Sistema deve funcionar offline
- Navegação deve funcionar
- Formulário não pode quebrar

---

## Evidências

Durante a validação:

- Capturas de tela (Cypress)
- Logs de execução
- Pipeline CI aprovado

---

## Erros a Evitar

- Testar com API real
- Não usar intercept
- Ignorar falhas
- Não testar responsividade

---

## Validação

Antes da entrega:

1. Rodar todos os testes
2. Validar funcionamento offline
3. Validar navegação completa
4. Validar formulário
5. Garantir CI funcionando

---

## Resultado

- Sistema estável
- Testes confiáveis
- Projeto validado tecnicamente

---
