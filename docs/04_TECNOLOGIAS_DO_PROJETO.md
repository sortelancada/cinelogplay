# Tecnologias e Arquitetura

> IMPORTANTE
>
> Este documento define exclusivamente as tecnologias utilizadas no projeto.
>
> Algumas seções aqui aparecem de forma resumida, mas possuem documentos específicos:
>
> - Arquitetura → ver `ARQUITETURA.md`
> - Testes → ver `TEST_PLAN.md` e `CYPRESS_E2E.md`
> - CI/CD → ver `CI_CD.md`
> - Deploy → ver `DEPLOY_(VERCEL_RENDER).md`
> - Versionamento → ver `VERSIONAMENTO.md`
>
> Este documento não substitui esses arquivos.

---

## Frontend

- HTML5 → Documentação (https://www.w3schools.com/html/)
- CSS3 → Documentação (https://www.w3schools.com/css/)
- Bootstrap 5.3.8.x → [Download](https://getbootstrap.com/) | Documentação (https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- JavaScript ES6+ → Documentação (https://www.w3schools.com/js/)
- Vite v7.3.3 → [Site Oficial](https://vite.dev/) | [Documentação](https://vite.dev/guide/)
  - Servidor de desenvolvimento
  - Build de produção
  - Gerenciamento de variáveis de ambiente

---

## Backend

- Node.js v24.16.0 → [Download](https://nodejs.org/en/download) | [Documentação](https://nodejs.org/docs/latest-v24.x/api/)
  - Gerenciamento de versão: fnm (Linux e Windows) → [Instalação](https://github.com/Schniz/fnm)
  - Execução:
    - Linux: terminal padrão
    - Windows: Git Bash (obrigatório)
- pnpm v10.12.4.x (`corepack enable pnpm`) → [Documentação](https://pnpm.io/)
- Express.js v4.22.2.x → [Documentação](https://expressjs.com/)
- JSON Web Token (JWT)
  - Autenticação
  - Autorização
  - Proteção de rotas
- Docker
  - Linux: Docker Engine 29.5.2 → [Download](https://docs.docker.com/engine/install/) | [Documentação](https://docs.docker.com/engine/)
  - Windows: Docker Desktop 4.69.0 → [Download](https://www.docker.com/products/docker-desktop) | [Documentação](https://docs.docker.com/desktop/)
- PostgreSQL v16-alpine (homologação) → [Download](https://www.postgresql.org/download/) | [Documentação](https://www.postgresql.org/docs/16/)
- Supabase v16.x (produção) → [Site Oficial](https://supabase.com/) | [Documentação](https://supabase.com/docs)

---

## Testes

- Cypress v14.5.4.x → [Documentação](https://docs.cypress.io/)
- Jest v30.4.2.x → [Documentação](https://jestjs.io/docs/getting-started)

---

## DevOps

- GitHub Actions → Documentação (https://docs.github.com/actions)

- SonarQube Community Edition
  - Análise estática de código
  - Quality Gate
  - Integração com GitHub Actions

- Render → Site Oficial (https://render.com/) | Documentação (https://render.com/docs)

- Vercel ou GitHub Pages
  - Vercel (https://vercel.com/)
  - GitHub Pages (https://pages.github.com/)

---

## Ferramentas de Desenvolvimento

- **Git v2.54 (recomendado)** → [Download](https://git-scm.com/downloads) | [Documentação](https://git-scm.com/doc)
- **Visual Studio Code (VS Code)** → [Download](https://code.visualstudio.com/) | [Documentação](https://code.visualstudio.com/docs)

### Extensões recomendadas para VS Code

- ESLint → Extensão (https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - Padronização de código JavaScript
  - Análise estática
  - Identificação de problemas de qualidade

- Prettier → Extensão (https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Docker → Extensão (https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- PostgreSQL → Extensão (https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres)
- GitHub Pull Requests and Issues → Extensão (https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
- Cypress Test Runner → Extensão (https://marketplace.visualstudio.com/items?itemName=cypress.cypress)
- REST Client → Extensão (https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

---

## Estrutura do Site (Frontend)

### Home

- Navbar
- Seções:
  - Filmes por Categorias
  - Lançamentos
  - Gêneros
  - Por ano
  - Clássicos
- Footer

### Diretores Icônicos

- Grid com cards

### Contato

- Formulário com validação
- Integração com backend

---

## Estrutura do Backend

### Endpoints

- `/api/filmes`
- `/api/diretores`
- `/api/contato`

### Banco

- `filmes` → id, título, ano, gênero, diretor_id, tipo
- `diretores` → id, nome, nacionalidade, principais_obras
- `mensagens` → id, nome, e-mail, mensagem, data_envio

---

## Testes (Cypress)

1. Carregamento
2. Navegação
3. Interatividade
4. Formulário
5. Responsividade

---

## Versionamento

- Repositório privado

- Branch `main` → produção
- Branch `dev` → integração

### Branches

- Uso obrigatório de branches no padrão:
  - feature/<area>-nome

Exemplos:

- feature/frontend-home
- feature/backend-api-filmes
- feature/tests-navbar
- feature/devops-pipeline

### Regras obrigatórias

- Proibido commit direto em `main` e `dev`
- Toda alteração deve ser feita via branch `feature/*`
- Pull Request obrigatório para `dev`
- Merge somente após aprovação

---

## CI/CD

### CI

- Cypress
- Jest

### CD

- Frontend → Vercel / GitHub Pages
- Backend → Render
- Banco → Docker / Supabase

---

## Documentação

- Setup completo
- Execução
- Homologação
- Produção
- Créditos

---

## Validações

- HTML, CSS, Bootstrap
- JavaScript ES6+
- Node.js v24.16.0 + Express
- PostgreSQL + Supabase
- Cypress
- GitHub
- CI/CD
- Deploy
- README completo
- Git instalado e configurado
- VS Code com extensões recomendadas

---
