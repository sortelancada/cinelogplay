# Plano de Testes — CinelogPlay

## Proposta

Este documento define como o sistema CinelogPlay será testado, garantindo que todas as funcionalidades estejam corretas, estáveis e alinhadas com os requisitos do projeto.

---

## Estratégia de Testes

O projeto utiliza:

- Testes End-to-End (E2E) com Cypress
- Testes desacoplados do backend
- Uso de mocks (fixtures)

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

## Ambiente de Testes

- URL base: `http://localhost:3000`
- Cypress configurado
- Fixtures disponíveis

---

## Estrutura de Testes

```

cypress/
e2e/
fixtures/
cypress.config.js

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

### Local

```bash
pnpm run dev
pnpm run cy:open
```

---

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
