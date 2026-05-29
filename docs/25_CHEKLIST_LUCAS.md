# Checklist — Frontend

#### Responsável: Lucas (lucasitdev)
#### Referência: `11_RESPONSABILIDADES.md` → Seção "FRONTEND"

---

## Objetivo

Definir **todas as tarefas de frontend** que Lucas deve realizar, garantindo:

- Interface completa e funcional
- Responsiva em 3 resoluções
- Integração com backend funcionando
- Sem dependência de backend (mock data)

---

### FRONTEND

### 1: Setup Frontend

- [ ] Criar pasta `/frontend`
  ```bash
  mkdir frontend
  cd frontend
  ```

- [ ] Inicializar Vite com HTML/CSS/JS
  ```bash
  pnpm create vite@latest . --template vanilla
  ```

- [ ] Instalar Bootstrap 5.3.x
  ```bash
  pnpm add bootstrap@5.3.x
  ```

- [ ] Criar estrutura de pastas:
  ```
  frontend/
  ├── index.html
  ├── css/
  │   └── style.css
  ├── js/
  │   ├── main.js
  │   └── api.js
  ├── pages/
  │   ├── diretores.html
  │   └── contato.html
  ├── data/
  │   ├── filmes.json
  │   ├── diretores.json
  │   └── mensagens.json (para fallback localStorage)
  └── img/
      └── cinelogplay.png
  ```

- [ ] Configurar `.env` para frontend:
  ```
  VITE_API_URL=https://seu-backend.onrender.com
  ```

- [ ] Criar `.env.local` para desenvolvimento (não commitar):
  ```
  VITE_API_URL=http://localhost:3001
  ```

---

### 2: Criar Mock Data

**Arquivo: `frontend/data/filmes.json`**

**Arquivo: `frontend/data/diretores.json`**

- [ ] Criar `frontend/data/filmes.json`:
  - [ ] Mínimo 5 filmes com id, titulo, ano, genero, diretor_id, tipo, imagem
  - [ ] Seguir estrutura do banco
- [ ] Criar `frontend/data/diretores.json`:
  - [ ] Mínimo 5 diretores com id, nome, nacionalidade, principais_obras

---

### 3: Criar Home Page

- [ ] HTML home criado
- [ ] Navbar com links (Home, Diretores, Contato)
- [ ] Seções: Destaque, Lançamentos, Gêneros, Clássicos
- [ ] Footer com redes sociais

---

### 4: Criar API Service

**Arquivo: `frontend/js/api.js`**

- [ ] Arquivo api.js criado
- [ ] Função getFilmes() implementada
- [ ] Função getDiretores() implementada
- [ ] Função enviarFormulario() com fallback localStorage
- [ ] USE_MOCK automático quando sem API

---

### 5: Criar Main.js

**Arquivo: `frontend/js/main.js`**

- [ ] main.js criado
- [ ] Função renderFilmes() implementada
- [ ] Função renderDiretores() exportada
- [ ] DOMContentLoaded dispara renderização
- [ ] Funcionando com mock data

---

### 6: Criar Página Diretores

**Arquivo: `frontend/pages/diretores.html`**

- [ ] Página diretores criada
- [ ] Renderiza cards com diretores
- [ ] Navbar com link ativo
- [ ] Funcionando com mock data

---

### 7: Criar Página Contato

**Arquivo: `frontend/pages/contato.html`**

- [ ] Página contato criada
- [ ] Formulário com validação JavaScript
- [ ] Campos: nome, email, mensagem
- [ ] Fallback localStorage se API falhar
- [ ] Resposta visual ao usuário

---

### 8: Criar CSS

**Arquivo: `/frontend/css/style.css`**

- [ ] CSS criado em `/frontend/css/style.css`
- [ ] Cores seguem paleta (escuro, vermelho, azul)
- [ ] Hover effects em cards e botões
- [ ] Responsivo mobile/tablet/desktop
- [ ] Acessibilidade (contraste, focus states)

---

### 9: Testar Localmente

- [ ] `pnpm install` (instalar dependências)
- [ ] `pnpm run dev` (rodar servidor local)
- [ ] Acessar http://localhost:5173
- [ ] Testar em 3 resoluções:
  - [ ] Mobile (375x667): 1 coluna, hambúrguer menu
  - [ ] Tablet (768x1024): 2 colunas
  - [ ] Desktop (1920x1080): 3-4 colunas
- [ ] Testar navegação (Home → Diretores → Contato → Home)
- [ ] Testar formulário (com e sem dados)
- [ ] Testar fallback offline (sem API)
- [ ] Verificar console (0 erros)

---

### 10: Build para Produção

- [ ] `pnpm run build` (gerar `/dist`)
- [ ] Verificar que `/dist` foi criado
- [ ] Testar build localmente: `pnpm run preview`
- [ ] Pronto para deploy em Vercel

---

### 11: Deploy Vercel

- [ ] Conectar repositório ao Vercel
- [ ] Configurar build:
  ```
  Build Command: pnpm install && pnpm run build
  Output Directory: frontend/dist
  ```
- [ ] Configurar variável de ambiente:
  ```
  VITE_API_URL=https://seu-backend.onrender.com
  ```
- [ ] Fazer deploy
- [ ] Validar que funciona em produção

---

### 12: Integração com Backend

- [ ] Backend deve estar rodando (Henrique)
- [ ] Atualizar `VITE_API_URL` em `.env` para URL do Render
- [ ] Testar integração:
  - [ ] Home deve carregar dados do backend
  - [ ] Diretores deve carregar dados do backend
  - [ ] Contato deve enviar para backend
- [ ] Verificar modo fallback (sem API)

---

### 13: Documentação

- [ ] Atualizar `README.md` com instruções de instalação
- [ ] Documentar estrutura de pastas frontend
- [ ] Adicionar exemplos de como usar API
- [ ] Atualizar `21_CHANGELOG.md`

---

## Checklist de Qualidade

### Páginas:

- [ ] Home completa (navbar, 4+ seções, footer)
- [ ] Diretores funcional (cards com dados)
- [ ] Contato com formulário validado

### Funcionalidades:

- [ ] Navegação funcionando (links na navbar)
- [ ] Mock data carregando (sem backend)
- [ ] Integração backend (quando backend disponível)
- [ ] Fallback automático (sem backend)
- [ ] Formulário com validação JavaScript
- [ ] Fallback localStorage (formulário offline)

### Design:

- [ ] Cores seguem `13_UI_GUIDELINES.md`
- [ ] Tipografia consistente
- [ ] Cards com hover effects
- [ ] Botões com estados (hover, active, disabled)
- [ ] Sombras e espaçamentos

### Responsividade:

- [ ] Testado mobile (375x667)
- [ ] Testado tablet (768x1024)
- [ ] Testado desktop (1920x1080)
- [ ] Sem scroll horizontal
- [ ] Navbar hambúrguer em mobile

### Qualidade:

- [ ] Sem erros no console
- [ ] Sem warnings desnecessários
- [ ] Código limpo e comentado
- [ ] Sem código duplicado
- [ ] Performance boa (sem lag)

---

## Documentos Relacionados

- **01_ESCOPO_DO_PROJETO.md** → O que fazer (frontend)
- **13_UI_GUIDELINES.md** → Padrões visuais
- **14_DEFINITION_OF_DONE.md** → Quando pronto
- **08_WORKFLOW.md** → Como trabalhar
- **11_RESPONSABILIDADES.md** → Responsabilidades

---

## Critério

- 3 páginas criadas (home, diretores, contato)
- 3 páginas funcionando sem backend (mock data)
- 3 páginas responsivas (3 resoluções)
- Integração backend funcionando
- Formulário com validação + fallback offline
- 0 erros no console
- Testes Cypress passando
- Deploy em Vercel funcionando
- Documentação atualizada

---

# `APOIO BACKEND (HENRIQUE)`

- [ ] Revisar arquitetura do backend
- [ ] Apoiar na integração frontend ↔ backend
- [ ] Testar endpoints durante desenvolvimento
- [ ] Ajudar em correções de bugs críticos

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

| Semana | `Lucas (Frontend)` | `Henrique (Backend+DevOps)` | `Matheus (Testes)` | `Winley (Apoio Testes + DevOps)` |
|--------|--------------------|------------------------------|--------------------|----------------------------------|
| **1** | Estrutura base (HTML, CSS, layout inicial, mock data) | Setup do backend (Express, rotas iniciais, estrutura API) | Setup do Cypress + fixtures iniciais | Validar setup do Cypress + estrutura inicial do projeto |
| **2** | Páginas adicionais + integração com API | Services, regras de negócio + melhorias de arquitetura | Testes E2E (Home, navegação, formulários) | Validar testes localmente + apoio na criação de cenários E2E |
| **3** | Integração completa + ajustes UI/UX | Docker + CI/CD (GitHub Actions + deploy pipeline) | Validação CI + automação Cypress no pipeline | Validar CI/CD + apoiar integração dos testes no pipeline |
| **4** | Ajustes finais + refinamento visual | Ajustes finais + deploy backend | Testes finais + regressão completa | Monitoramento, validação de deploy e testes de robustez |


---

## (DoD)

Uma tarefa está pronta quando:

-  Código funcional
-  Segue padrão do projeto
-  Sem erros no console
-  Funciona com mock/fallback
-  Testes passam localmente
-  Commit realizado corretamente
-  PR criado e aprovado
-  CI verde
-  Deploy refletido online

---
