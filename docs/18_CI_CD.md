# CI/CD - Integração e Entrega Contínua

## Índice

- [CI/CD - Integração e Entrega Contínua](#cicd---integração-e-entrega-contínua)
  - [Índice](#índice)
  - [Proposta](#proposta)
  - [Conceito do CI/CD](#conceito-do-cicd)
    - [CI (Continuous Integration)](#ci-continuous-integration)
    - [CD (Continuous Deployment)](#cd-continuous-deployment)
  - [Estrutura Obrigatória](#estrutura-obrigatória)
  - [Pipeline CI e CD (GitHub Actions)](#pipeline-ci-e-cd-github-actions)
    - [Arquivo: `.github/workflows/ci.yml`](#arquivo-githubworkflowsciyml)
    - [Arquivo: `.github/workflows/cd.yml`](#arquivo-githubworkflowscdyml)
  - [Scripts Necessários no `frontend/package.json`](#scripts-necessários-no-frontendpackagejson)
  - [Fluxo da feature](#fluxo-da-feature)
  - [CI](#ci)
    - [Resultado](#resultado)
  - [CD — Deploy](#cd--deploy)
    - [Frontend (Vercel)](#frontend-vercel)
    - [Build:](#build)
    - [Output:](#output)
  - [Configuração do Backend (Render)](#configuração-do-backend-render)
    - [Pré-requisito:](#pré-requisito)
    - [Passos:](#passos)
  - [Configuração do Frontend (Vercel)](#configuração-do-frontend-vercel)
    - [Pré-requisito:](#pré-requisito-1)
    - [Passos:](#passos-1)
  - [Monitoramento de CI/CD](#monitoramento-de-cicd)
    - [Ver Status na GitHub:](#ver-status-na-github)
    - [Verificar Deploy:](#verificar-deploy)
  - [Testes (Cypress)](#testes-cypress)
    - [CRÍTICO](#crítico)
  - [Validação do CI/CD](#validação-do-cicd)
    - [1. Teste de CI](#1-teste-de-ci)
    - [2. Teste de CD](#2-teste-de-cd)
  - [Requisitos de Implementação](#requisitos-de-implementação)
  - [Erros (EVITAR)](#erros-evitar)
  - [Comunicação quando CI/CD Falha](#comunicação-quando-cicd-falha)
    - [Se CI Falhar:](#se-ci-falhar)
    - [Se CD Falhar:](#se-cd-falhar)
  - [Resultado](#resultado-1)
  - [Documentos Relacionados](#documentos-relacionados)

---

## Proposta

Implementar integração contínua (CI) e entrega contínua (CD), garantindo:

- Testes automáticos a cada alteração
- Deploy automático após validação
- Qualidade e estabilidade
- Confiabilidade na entrega

---

## Conceito do CI/CD

### CI (Continuous Integration)

Toda vez que faz push em `dev` ou `main`:

```
1. GitHub Actions é acionado automaticamente
2. Clona repositório
3. Instala dependências (pnpm v9.x)
4. Roda Cypress com mock (testes E2E com fixtures)
5. Passou → PR pode ser mergeado
6. Falhou → PR é bloqueado (obrigatório corrigir)
```

**Tempo de execução:** 5 a 10 minutos

**Bloqueio:** Merge é impossível se CI falhar

---

### CD (Continuous Deployment)

Após merge em `dev` ou `main`:

```
1. Vercel (frontend) detecta mudança
   → Rebuilda automaticamente
   → Deploy em preview (dev) ou produção (main)

2. Render (backend) detecta mudança
   → Rebuilda automaticamente
   → Deploy em staging (dev) ou produção (main)

Resultado: Alterações online em ~5 minutos
```

**Tempo de execução:** 3 a 5 minutos depende da plataforma

---

## Estrutura Obrigatória

Criar dentro do projeto:

```
Sua-Pasta-Raiz/
└── .github/
    └── workflows/
        └── ci-cd.yml
```

---

## Pipeline CI e CD (GitHub Actions)

### Arquivo: `.github/workflows/ci.yml`

```yaml
name: CI Pipeline - CinelogPlay

on:
  push:
    branches:
      - dev
      - main
  pull_request:
    branches:
      - dev
      - main

env:
  NODE_VERSION: "24"

jobs:
  ci:
    name: Testes (CI)
    runs-on: ubuntu-latest

    steps:
      - name: Clonar repositório
        uses: actions/checkout@v4

      - name: Configurar Node.js ${{ env.NODE_VERSION }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Ativar pnpm via Corepack
        run: corepack enable

      - name: Instalar dependências
        run: pnpm install --frozen-lockfile

      - name: Rodar Cypress (Testes E2E)
        run: pnpm run test:ci

      - name: Upload artifacts (screenshots/videos)
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: cypress-artifacts-${{ github.run_number }}
          path: |
            cypress/screenshots/
            cypress/videos/
          retention-days: 7
```

### Arquivo: `.github/workflows/cd.yml`

```yaml
name: CD Pipeline - CinelogPlay

on:
  push:
    branches:
      - dev
      - main

jobs:
  cd:
    name: Deploy Notification (CD)
    runs-on: ubuntu-latest

    steps:
      - name: Status do Deploy
        run: |
          echo " Validações concluídas com sucesso!"
          echo " O deploy automático foi disparado para as plataformas:"
          echo " Frontend (Vercel): https://seu-dominio.vercel.app"
          echo " Backend (Render): https://seu-backend.onrender.com"
```

---

## Scripts Necessários no `frontend/package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test:ci": "cypress run",
    "cypress:open": "cypress open"
  }
}
```

---

## Fluxo da feature

```
1. Trabalho em feature/*
   ↓
2. git push origin feature/seu-branch
   ↓
3. Abrir PR para dev (base: dev)
   ↓
4. CI é acionado (GitHub Actions)
   └─ Cypress roda automaticamente com fixtures
   └─ Se passou  → PR pode ser mergeado
   └─ Se falhou  → PR é bloqueado (obrigatório corrigir)
   ↓
5. Aguardar aprovação + CI verde
   ↓
6. Merge em dev
   ↓
7. CD é acionado automaticamente
   └─ Vercel rebuilda e faz deploy do frontend
   └─ Render rebuilda e faz deploy do backend
   └─ Alterações online em 5 minutos em staging
   ↓
8. Equipe testa em homologação (dev)
   ↓
9. Quando pronto para produção: PR de dev para main
   ↓
10. CI roda novamente (validação final)
   ↓
11. Merge em main
   ↓
12. CD faz deploy em produção
   └─ Vercel deploya em prod
   └─ Render deploya em prod
   ↓
13. Usuários recebem nova versão (produção)
```

---

## CI

Quando ocorre um push ou Pull Request para `dev` ou `main`, o GitHub Actions:

1. Clona o repositório
2. Configura Node.js
3. Ativa pnpm via Corepack
4. Instala dependências
5. Instala o binário do Cypress
6. Executa build do frontend
7. Inicia o servidor Vite
8. Aguarda a aplicação responder em `http://localhost:5173`
9. Executa os testes Cypress

### Resultado

- Falhou → pipeline interrompida
- Passou → etapa de CD é liberada

---

## CD — Deploy

### Frontend (Vercel)

1. Acessar Vercel
2. Importar repositório
3. Conectar com GitHub
4. Deploy automático ativado

### Build:

```bash
pnpm install && pnpm run build
```

### Output:

```
dist
```

---

## Configuração do Backend (Render)

### Pré-requisito:

- Conta em [render.com](https://render.com)
- Repositório GitHub conectado

### Passos:

1. Acessar [render.com](https://render.com)
2. **New +** → **Web Service**
3. Conectar repositório GitHub
4. Selecionar `lucasitdias/cinelogplay-web`
5. Configurar:

```
Name: cinelogplay-backend
Environment: Node
Region: (selecionare nearest)
Build Command: pnpm install
Start Command: node backend/server.js
```

6. **Environment Variables** → Adicionar:

```
DATABASE_URL=postgresql://user:pass@host:port/dbname
NODE_ENV=production
PORT=10000
```

7. **Create Web Service** → Deploy automático ativado

**Resultado:**

- Cada push em `dev` → deploy em staging
- Cada push em `main` → deploy em produção
- URL: `https://seu-backend.onrender.com`

---

## Configuração do Frontend (Vercel)

### Pré-requisito:

- Conta em [vercel.com](https://vercel.com)
- Repositório GitHub conectado

### Passos:

1. Acessar [vercel.com](https://vercel.com)
2. **Import Project** → Selecionar repositório GitHub
3. Selecionar `lucasitdias/cinelogplay-web`
4. Configurar Build Settings:

```
Framework: Vite
Build Command: pnpm install && pnpm run build
Output Directory: dist
Install Command: pnpm install
```

5. **Environment Variables** → Adicionar:

```
VITE_API_URL=https://seu-backend.onrender.com
```

6. **Deploy** → Ativar auto-deploy

**Resultado:**

- Cada push em `dev` → deploy automático em preview
- Cada push em `main` → deploy automático em produção
- URL: `https://seu-projeto.vercel.app`

---

## Monitoramento de CI/CD

### Ver Status na GitHub:

1. Repositório → **Actions**
2. Clique no workflow mais recente (`CI/CD Pipeline - cinelogoplay`)
3. Veja cada job:
   - **ci** → Testes Cypress
   - **cd** → Deploy (se CI passou)
4. Se falhar, clique no job e veja logs detalhados

### Verificar Deploy:

**Frontend (Vercel):**

```
https://seu-projeto.vercel.app
```

**Backend (Render):**

```
https://seu-backend.onrender.com/api/filmes
```

Deve retornar JSON com dados ou erro, mas não timeout

---

## Testes (Cypress)

Garantir estrutura:

```
frontend/cypress/e2e/
frontend/cypress/fixtures/
frontend/cypress.config.js
```

Rodar com:

```bash
pnpm run test:ci
```

---

### CRÍTICO

- NUNCA usar API real nos testes
- SEMPRE usar:

```js
cy.intercept(...)
```

---

## Validação do CI/CD

### 1. Teste de CI

```bash
git push origin main
```

Verificar:

- GitHub → Actions
- Pipeline executando
- Testes passando

---

### 2. Teste de CD

1. Alterar frontend
2. Commit + push

Verificar:

- Vercel atualizou
- Render atualizou

---

## Requisitos de Implementação

- Arquivo `ci-cd.yml` existe em `.github/workflows/`
- GitHub Actions executando em cada PR
- Cypress rodando com fixtures (SEM API real)
- Testes 100% passando no CI
- Vercel conectado e deployando
- Render conectado e deployando
- Variáveis de ambiente configuradas
- Status checks bloqueando merge se CI falhar
- Deploy automático funcionando em `dev` e `main`

---

## Erros (EVITAR)

- Não usar pnpm no CI
- Não ter script `test:ci`
- Cypress dependendo da API real
- Pipeline quebrando por dependência
- Não conectar Vercel/Render
- Não testar antes da entrega

---

## Comunicação quando CI/CD Falha

### Se CI Falhar:

```
CI falhou no PR [link]
Verificar logs em: GitHub → Actions → [workflow] → ci
Erro: [copiar erro do log]
```

### Se CD Falhar:

```
Deploy falhou após merge
Verificar logs em: Vercel/Render dashboard
Erro: [copiar erro]
```

---

## Resultado

Quando CI/CD está funcionando 100%:

- Cada push dispara testes automaticamente
- Testes passam em ambiente padrão (CI)
- Deploy automático após merge
- Site sempre atualizado
- Confiabilidade garantida
- Zero manual testing para deploy

---

## Documentos Relacionados

- **08_WORKFLOW.md** → Como trabalhar com PRs
- **16_CYPRESS_E2E.md** → Testes E2E com Cypress
- **07_CONFIG_REPO_GITHUB.md** → Proteção de branches
- **11_RESPONSABILIDADES.md** → Quem é responsável pelo DevOps

---
