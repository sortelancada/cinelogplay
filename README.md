---
<p align="center"> <img src="img/cinelogplay.png" alt="CinelogPlay Banner" width="600"/> </p>
---

## Índice

- [Índice](#índice)
- [Visão ](#visão-)
- [Objetivo ](#objetivo-)
- [Arquitetura do Projeto ](#arquitetura-do-projeto-)
  - [Frontend ](#frontend-)
  - [Backend ](#backend-)
  - [Banco de Dados ](#banco-de-dados-)
- [Tecnologias Utilizadas ](#tecnologias-utilizadas-)
- [Como Executar o Projeto ](#como-executar-o-projeto-)
  - [Pré-requisitos](#pré-requisitos)
  - [1. Clonar o repositório](#1-clonar-o-repositório)
  - [2. Instalar dependências](#2-instalar-dependências)
  - [3. Rodar o projeto](#3-rodar-o-projeto)
  - [4. Acessar](#4-acessar)
- [Testes Automatizados ](#testes-automatizados-)
  - [Rodar local:](#rodar-local)
  - [Rodar CI:](#rodar-ci)
  - [Regras importantes:](#regras-importantes)
- [CI/CD ](#cicd-)
  - [CI (Integração Contínua)](#ci-integração-contínua)
  - [CD (Deploy Contínuo)](#cd-deploy-contínuo)
- [Deploy ](#deploy-)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Estrutura do Projeto ](#estrutura-do-projeto-)
- [Documentação Completa ](#documentação-completa-)
  - [Principais documentos:](#principais-documentos)
- [Equipe ](#equipe-)
- [Workflow de Desenvolvimento ](#workflow-de-desenvolvimento-)
  - [Fluxo oficial do projeto](#fluxo-oficial-do-projeto)
  - [Como funciona](#como-funciona)
  - [Liberação para produção](#liberação-para-produção)
  - [Regras](#regras)
- [Versionamento ](#versionamento-)
- [Definição de Pronto (DoD) ](#definição-de-pronto-dod-)
- [Resiliência ](#resiliência-)
- [Qualidade ](#qualidade-)
- [Resultado ](#resultado-)
- [Observação ](#observação-)

---

## Visão <a id="visao"></a>

O **CinelogPlay** é um portal web desenvolvido com foco cultural, voltado para a organização, exibição e exploração de informações sobre filmes e diretores.

O projeto foi construído seguindo boas práticas de:

- Arquitetura de software
- Organização de código
- Testes automatizados
- Integração contínua e deploy automático

---

## Objetivo <a id="objetivo"></a>

Desenvolver uma aplicação completa que contemple:

- Frontend interativo e responsivo
- Backend com API REST
- Banco de dados estruturado
- Testes automatizados (E2E)
- Pipeline CI/CD
- Deploy em produção

---

## Arquitetura do Projeto <a id="arquitetura-do-projeto"></a>

O sistema é dividido em três camadas principais:

### Frontend <a id="frontend"></a>

- HTML5
- CSS3
- Bootstrap 5
- JavaScript ES6+

Responsável por:

- Interface do usuário
- Consumo da API
- Renderização dos dados

---

### Backend <a id="backend"></a>

- Node.js (v24.16.0)
- Express.js

Responsável por:

- Regras de negócio
- API REST
- Integração com banco

---

### Banco de Dados <a id="banco-de-dados"></a>

- PostgreSQL (homologação)
- Supabase (produção)

Responsável por:

- Persistência dos dados

---

## Tecnologias Utilizadas <a id="tecnologias-utilizadas"></a>

| Camada   | Tecnologias              |
| -------- | ------------------------ |
| Frontend | HTML, CSS, Bootstrap, JS |
| Backend  | Node.js, Express         |
| Banco    | PostgreSQL, Supabase     |
| Testes   | Cypress                  |
| DevOps   | GitHub Actions           |
| Deploy   | Vercel / Render          |

---

## Como Executar o Projeto <a id="como-executar-o-projeto"></a>

### Pré-requisitos

- Node.js v24.16.0
- pnpm
- Git
- Docker Desktop

---

### 1. Clonar o repositório

```bash
git clone <url-do-repo>
cd CinelogPlay
```

---

### 2. Instalar dependências

```bash
pnpm install
```

---

### 3. Rodar o projeto

```bash
pnpm run dev
```

---

### 4. Acessar

```
http://localhost:3000
```

---

## Testes Automatizados <a id="testes-automatizados"></a>

Utilizamos **Cypress (E2E)**.

### Rodar local:

```bash
pnpm run cy:open
```

### Rodar CI:

```bash
pnpm run test:ci
```

### Regras importantes:

- NÃO depender do backend real
- Uso obrigatório de `cy.intercept`
- Testes devem passar sempre

---

## CI/CD <a id="cicd"></a>

O projeto possui pipeline automatizado com **GitHub Actions**.

### CI (Integração Contínua)

A cada push:

- Instala dependências
- Sobe servidor
- Executa testes Cypress

---

### CD (Deploy Contínuo)

Após sucesso no CI:

- Frontend → deploy automático (Vercel ou GitHub Pages)
- Backend → deploy automático (Render)

---

## Deploy <a id="deploy"></a>

### Frontend

- Vercel ou GitHub Pages

### Backend

- Render

---

## Estrutura do Projeto <a id="estrutura-do-projeto"></a>

```bash
CinelogPlay/
│
├── frontend/
├── backend/
├── cypress/
├── docs/
├── .github/workflows/
│
└── README.md
```

---

## Documentação Completa <a id="documentacao-completa"></a>

Toda a documentação está organizada na pasta `/docs`.

### Principais documentos:

- 01_ESCOPO_DO_PROJETO.md
- 02_REQUISITOS.md
- 03_ARQUITETURA.md
- 04_TECNOLOGIAS_DO_PROJETO.md
- 05_AMBIENTE_WINDOWS.md
- 06_AMBIENTE_LINUX.md
- 07_CONFIG_REPO_GITHUB.md
- 08_WORKFLOW.md
- 09_VERSIONAMENTO.md
- 10_BRANCHING.md
- 11_RESPONSABILIDADES.md
- 12_CONTRIBUICAO.md
- 13_UI_GUIDELINES.md
- 14_DEFINITION_OF_DONE.md
- 15_TEST_PLAN.md
- 16_CYPRESS_E2E.md
- 17_RESILIENCE.md
- 18_CI_CD.md
- 19*DEPLOY*(VERCEL_RENDER).md
- 20_ESTRUTURA_DOC.md
- 21_CHANGELOG.md
- 22_EXTENSOES_VSCODE.md
- 23_CONFIGURACAO_EXTENSOES_VSCODE.md
- 24_CHECKLIST_MATHEUS.md
- 25_CHECKLIST_LUCAS.md
- 26_CHECKLIST_HENRIQUE.md
- 27_APRESENTACAO.md

---

## Equipe <a id="equipe"></a>

| Área     | Responsável      |
| -------- | ---------------- |
| Frontend | Lucas            |
| Backend  | Henrique + Lucas |
| Testes   | Matheus          |
| DevOps   | Henrique         |

---

## Workflow de Desenvolvimento <a id="workflow-de-desenvolvimento"></a>

### Fluxo oficial do projeto

O projeto segue o seguinte padrão de branches:

```
feature/*  →  dev  →  main
```

---

### Como funciona

1. Criar uma branch a partir da `dev`:

```bash
git checkout dev
git pull
git checkout -b feature/nome-da-feature
```

2. Desenvolver a funcionalidade

3. Commit:

```bash
git add .
git commit -m "feat: descrição"
git push origin feature/nome-da-feature
```

4. Abrir Pull Request:

```
feature/... → dev
```

5. Code Review + CI (GitHub Actions)

6. Merge na `dev`

---

### Liberação para produção

Somente quando tudo estiver validado:

```
dev → main
```

---

### Regras

- Nunca fazer commit direto na `main`
- Nunca pular a `dev`
- Toda feature passa por PR
- CI deve estar verde antes do merge

---

## Versionamento <a id="versionamento"></a>

Utilizamos:

- **Versionamento Semântico**
- **Keep a Changelog**

Formato:

```bash
MAJOR.MINOR.PATCH
```

---

## Definição de Pronto (DoD) <a id="definicao-de-pronto-dod"></a>

Uma tarefa só é considerada finalizada quando:

- Código implementado
- Testes passando
- PR aprovado
- CI verde
- Sem erros

---

## Resiliência <a id="resiliencia"></a>

O sistema foi projetado para:

- Não depender do backend nos testes
- Utilizar mock de dados
- Evitar quebra da aplicação

---

## Qualidade <a id="qualidade"></a>

O projeto garante:

- Código organizado
- Testes automatizados
- Pipeline CI/CD
- Deploy automático
- Documentação completa

---

## Resultado <a id="resultado"></a>

- Sistema funcional
- Testado
- Automatizado
- Online
- Documentado

---

## Observação <a id="observacao"></a>

Este projeto foi desenvolvido seguindo boas práticas.

- Escalabilidade
- Manutenibilidade
- Confiabilidade

---
