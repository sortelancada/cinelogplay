# Checklist — Backend + DevOps

#### Responsável: Henrique (IronVisuals)

#### Apoio: Lucas (Backend), Winley (DevOps)

#### Referência: `11_RESPONSABILIDADES.md` → Seções "BACKEND" + "DEVOPS"

---

## Objetivo

Definir **todas as tarefas de backend e DevOps** que Henrique deve realizar, garantindo:

- API REST completa e funcional
- Resiliência com fallback (mock data)
- Integração com PostgreSQL/Supabase
- CI/CD configurado e funcionando
- Deploy automático em Render
- Zero dependência de configuração local

---

### Backend

### 1: Setup e Estrutura

#### Criar Pasta Backend

```bash
mkdir backend
cd backend
```

#### Configurar `backend/package.json`

```json
{
  "name": "cinelogplay-backend",
  "version": "1.0.0",
  "description": "API backend CinelogPlay",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "pg": "^8.11.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

- [ ] `package.json` criado
- [ ] Scripts: `dev`, `start`, `test`
- [ ] Dependências corretas

#### Criar `.env.example` (Nunca commitar `.env` real)

```
# BANCO DE DADOS
DATABASE_URL=postgresql://user:password@localhost:5432/cinelogplay
NODE_ENV=development

# SERVIDOR
PORT=3001
HOST=localhost

# CORS
CORS_ORIGIN=http://localhost:5173,https://seu-frontend.vercel.app
```

- [ ] `.env.example` criado
- [ ] Todas variáveis documentadas
- [ ] Adicionado ao `.gitignore` (`.env`, `node_modules/`)

#### Criar Estrutura de Pastas

```
backend/
├── controllers/
│   ├── filmesController.js
│   ├── diretoresController.js
│   └── contatoController.js
├── routes/
│   ├── filmes.js
│   ├── diretores.js
│   └── contato.js
├── services/
│   ├── filmesService.js
│   ├── diretoresService.js
│   └── contatoService.js
├── config/
│   ├── database.js
│   └── cors.js
├── mock/
│   ├── filmes.json
│   ├── diretores.json
│   └── mensagens.json
├── .env.example
├── server.js
└── package.json
```

- [ ] Pastas criadas

---

### 2: Configuração do Servidor

#### Criar `backend/server.js`

```js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import filmesRoutes from "./routes/filmes.js";
import diretoresRoutes from "./routes/diretores.js";
import contatoRoutes from "./routes/contato.js";

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "0.0.0.0";

// MIDDLEWARE

// CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HEALTH CHECK

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CinelogPlay API — Servidor operacional",
    version: "1.0.0",
  });
});

// ROTAS

app.use("/api/filmes", filmesRoutes);
app.use("/api/diretores", diretoresRoutes);
app.use("/api/contato", contatoRoutes);

// TRATAMENTO DE ERROS

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Rota não encontrada",
    path: req.path,
  });
});

// Error Handler Global
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Erro interno do servidor",
  });
});

// INICIAR SERVIDOR

app.listen(PORT, HOST, () => {
  console.log(` CinelogPlay API rodando em http://${HOST}:${PORT}`);
});

export default app;
```

- [ ] `server.js` criado
- [ ] Middleware CORS configurado
- [ ] Health check em `/`
- [ ] Rotas conectadas
- [ ] Error handlers funcionando

#### Instalar Dependências

```bash
pnpm install
```

- [ ] Dependências instaladas
- [ ] `pnpm-lock.yaml` gerado

---

### 3: Mock Data

#### Criar `backend/mock/filmes.json`

- [ ] `filmes.json` criado
- [ ] Dados espelham escopo

#### Criar `backend/mock/diretores.json`

- [ ] `diretores.json` criado
- [ ] Dados espelham escopo

#### Criar `backend/mock/mensagens.json`

- [ ] `mensagens.json` criado (para fallback)

---

### 4: Services lógica de negócio

#### Criar `backend/services/filmesService.js`

#### Criar `backend/services/diretoresService.js`

- [ ] `diretoresService.js` criado
- [ ] Métodos: `getAll()`, `getById()`

#### Criar `backend/services/contatoService.js`

- [ ] `contatoService.js` criado
- [ ] Método: `sendMessage()`
- [ ] Validação de dados (nome, email, mensagem)

---

### 5: Controllers

#### Criar `backend/controllers/filmesController.js`

- [ ] `filmesController.js` criado
- [ ] Métodos: `getAll()`, `getById()`

#### Criar `backend/controllers/diretoresController.js`

- [ ] `diretoresController.js` criado
- [ ] Métodos: `getAll()`, `getById()`

#### Criar `backend/controllers/contatoController.js`

- [ ] `contatoController.js` criado
- [ ] Método: `sendMessage()`

---

### 6: Rotas

#### Criar `backend/routes/filmes.js`

- [ ] `filmes.js` criado
- [ ] Rotas: `GET /`, `GET /:id`

#### Criar `backend/routes/diretores.js`

- [ ] `diretores.js` criado
- [ ] Rotas: `GET /`, `GET /:id`

#### Criar `backend/routes/contato.js`

- [ ] `contato.js` criado
- [ ] Rota: `POST /`

---

### 7: Testar backend Localmente

```bash
# Instalar dependências
pnpm install

# Rodar servidor em desenvolvimento
pnpm run dev
```

#### Testes com `curl` ou Postman (Opcional):

```bash
# GET /api/filmes
curl http://localhost:3001/api/filmes

# GET /api/filmes/1
curl http://localhost:3001/api/filmes/1

# GET /api/diretores
curl http://localhost:3001/api/diretores

# GET /api/diretores/1
curl http://localhost:3001/api/diretores/1

# POST /api/contato
curl -X POST http://localhost:3001/api/contato \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@example.com","mensagem":"Ótimo filme!"}'
```

- [ ] GET /api/filmes retorna lista
- [ ] GET /api/filmes/1 retorna detalhe
- [ ] GET /api/diretores retorna lista
- [ ] GET /api/diretores/1 retorna detalhe
- [ ] POST /api/contato aceita dados
- [ ] Sem erros no console
- [ ] Respostas em padrão (success + data)

---

## `DEVOPS (Responsabilidade) HENRIQUE - (IronVisuals)`

## `Apoio: Winley`

### 8: Docker

#### Criar `docker-compose.yml` (Raiz do Projeto)

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:16
    container_name: cinelogplay-postgres
    environment:
      POSTGRES_USER: cinelogplay
      POSTGRES_PASSWORD: cinelogplay123
      POSTGRES_DB: cinelogplay
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - cinelogplay-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U cinelogplay"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: cinelogplay-backend
    environment:
      DATABASE_URL: postgresql://cinelogplay:cinelogplay123@postgres:5432/cinelogplay
      NODE_ENV: development
      PORT: 3001
      HOST: 0.0.0.0
    ports:
      - "3001:3001"
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - cinelogplay-network
    volumes:
      - ./backend:/app
    command: npm run dev

volumes:
  postgres_data:

networks:
  cinelogplay-network:
    driver: bridge
```

- [ ] `docker-compose.yml` criado
- [ ] PostgreSQL v16 configurado
- [ ] Backend conectado ao banco
- [ ] Health check implementado

#### Criar `backend/Dockerfile`

```dockerfile
FROM node:24.16.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

- [ ] `Dockerfile` criado
- [ ] Node 24 como base
- [ ] Porta 3001 exposta

#### Testar Docker Localmente

```bash
# Subir containers
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f backend

# Parar
docker-compose down
```

- [ ] Docker Compose rodando
- [ ] PostgreSQL online
- [ ] Backend conectando ao banco
- [ ] Health check passando

---

### 9: GitHub Actions CI/CD

#### Criar `.github/workflows/ci.yml` e depois crie `cd.yml`

- Arquivo: `.github/workflows/ci.yml`

```yaml
name: CI Pipeline - cinelogplay

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
  # INTEGRAÇÃO CONTÍNUA (CI)
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
          cache: "pnpm"

      - name: Ativar pnpm via Corepack
        run: corepack enable

      - name: Instalar dependências
        run: pnpm install --frozen-lockfile

      - name: Rodar Cypress (Testes E2E)
        run: pnpm run test:ci

      - name: Upload artifacts
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: cypress-artifacts-${{ github.run_number }}
          path: cypress/screenshots/
          retention-days: 7
```

- Arquivo: `.github/workflows/cd.yml`

```yaml
name: CD Pipeline - cinelogplay

on:
  workflow_run:
    workflows: ["CI Pipeline - cinelogplay"]
    types:
      - completed

jobs:
  # ENTREGA CONTÍNUA (CD)
  cd:
    name: Deploy (CD)
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' && (github.event.workflow_run.head_branch == 'dev' || github.event.workflow_run.head_branch == 'main') }}

    steps:
      - name: CI passou! Deploy automático será executado
        run: |
          echo " CI passou com sucesso!"
          echo " Vercel e Render farão deploy automático nos próximos minutos"
```

- [ ] `.github/workflows/ci.yml` de forma separadas `cd.yml`
- [ ] CI roda em cada PR e push
- [ ] CD roda após CI bem-sucedido
- [ ] Artifacts capturados se falhar

---

### 10: Deploy Backend (Render)

#### Configurar no Render

1. Acessar [render.com](https://render.com)
2. **New +** → **Web Service**
3. Conectar repositório GitHub
4. Configurar:

```
Name: cinelogplay-backend
Environment: Node
Region: (nearest)
Build Command: pnpm install
Start Command: node backend/server.js
```

5. **Environment Variables**:

```
DATABASE_URL=postgresql://user:pass@host:port/dbname
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://seu-frontend.vercel.app
```

6. Deploy automático ativado

#### Validar Deploy

```bash
# Testar endpoint
curl https://seu-backend.onrender.com/api/filmes

# Deve retornar JSON com dados
```

- [ ] Backend online em Render
- [ ] Endpoints respondendo
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy automático ativado

---

### 11: Integração Backend ↔ Frontend

- [ ] Lucas atualizar `.env` do frontend com URL do Render:

  ```
  VITE_API_URL=https://seu-backend.onrender.com
  ```

- [ ] Testar integração:
  - [ ] Frontend carrega dados do backend
  - [ ] Formulário envia para backend
  - [ ] Fallback funciona (sem backend)

- [ ] Validar modo offline:
  - [ ] Desligar backend (ferramentas dev)
  - [ ] Frontend continua funcionando (mock data)

---

### 12: Documentação Backend

- [ ] Atualizar `README.md` com:
  - [ ] Instruções de instalação backend
  - [ ] Como rodar localmente
  - [ ] Variáveis de ambiente
  - [ ] Endpoints disponíveis

- [ ] Documentar endpoints em `02_REQUISITOS.md`:
  - [ ] GET /api/filmes
  - [ ] GET /api/filmes/:id
  - [ ] GET /api/diretores
  - [ ] GET /api/diretores/:id
  - [ ] POST /api/contato

- [ ] Atualizar `21_CHANGELOG.md`

---

## Checklist de Qualidade

### Backend:

- [ ] `/api/filmes` retorna lista (mock data)
- [ ] `/api/filmes/:id` retorna detalhe
- [ ] `/api/diretores` retorna lista (mock data)
- [ ] `/api/diretores/:id` retorna detalhe
- [ ] `/api/contato` POST valida e salva
- [ ] Padrão de resposta: `{ success: true, data: [...] }`
- [ ] Padrão de erro: `{ success: false, error: "..." }`
- [ ] CORS configurado
- [ ] Health check em `/`
- [ ] Error handlers funcionando
- [ ] Sem erros no console

### DevOps:

- [ ] Docker Compose rodando
- [ ] PostgreSQL conectando
- [ ] Backend connectando ao postgres
- [ ] GitHub Actions CI verde
- [ ] Deploy automático Render
- [ ] Backend online respondendo
- [ ] Variáveis de ambiente seguras
- [ ] Health check passando em produção

### Integração:

- [ ] Frontend integrado (VITE_API_URL)
- [ ] Modo fallback funcionando
- [ ] Teste de robustez: sem backend, frontend funciona

---

## Comunicação com Apoio

### Com Lucas (Backend apoio):

```
@Lucas
Preciso de ajuda com [descrição]
Bloqueio: [o que está impedindo]
```

### Com Winley (DevOps apoio):

```
@Winley
Docker/GitHub Actions: [descrição do problema]
Variáveis de ambiente: [o que está faltando]
```

---

## Documentos Relacionados

- **01_ESCOPO_DO_PROJETO.md** → O que fazer (backend)
- **02_REQUISITOS.md** → Especificações dos endpoints
- **03_ARQUITETURA.md** → Estrutura do backend
- **17_RESILIENCE.md** → Implementar fallback
- **18_CI_CD.md** → CI/CD detalhado
- **11_RESPONSABILIDADES.md** → Responsabilidades

---

## Critério

- [ ] 3 endpoints funcionando (filmes, diretores, contato)
- [ ] Mock data funcionando (fallback)
- [ ] Docker Compose rodando
- [ ] GitHub Actions CI verde
- [ ] Deploy Render funcionando
- [ ] Backend online respondendo
- [ ] Integração com frontend OK
- [ ] Teste de robustez passando
- [ ] Documentação atualizada

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
