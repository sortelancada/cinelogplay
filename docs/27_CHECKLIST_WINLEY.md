# Checklist — Testes + DevOps Apoio

#### Responsável: Winley

#### Apoio para: Matheus (Testes), Henrique (DevOps)

#### Referência: `11_RESPONSABILIDADES.md` → Seções "TESTES (Apoio)" + "DEVOPS (Apoio)"

---

## Envolvidos

- **Winley** → Apoio Testes + DevOps
- **Matheus** → Responsável Testes
- **Henrique** → Responsável DevOps

---

## Objetivo

Definir **todas as tarefas de apoio em Testes e DevOps** que Winley deve realizar, garantindo:

- Testes E2E robustos
- CI/CD estável e confiável
- Infraestrutura funcionando
- Zero falhas em produção

---

## TESTES (Apoio a Matheus)

### 1: Validar Setup Cypress

- [x] Verificar que `cypress.config.js` existe
- [ ] Verificar que `cypress/e2e/` tem testes
- [ ] Verificar que `cypress/fixtures/` tem dados
- [ ] Rodar testes localmente:

  ```bash
  pnpm run cypress:open
  ```

- [ ] Verificar que não há erros de importação
- [ ] Verificar que fixtures são carregadas corretamente

---

### 2: Validar Testes Localmente

```bash
# Rodar testes
pnpm run test:ci

# Deve passar 100% (0 falhas)
```

- [ ] Todos os testes passam localmente
- [ ] Não há skipped tests
- [ ] Não há warnings desnecessários
- [ ] Tempo de execução razoável (5 min)

---

### 3: Validar Testes em CI

- [ ] GitHub Actions roda Cypress
  - [ ] Acessar: Repositório → Actions
  - [ ] Clicar no último workflow
  - [ ] Verificar job `ci` → Cypress roda
  - [ ] Verificar que testes passam

- [ ] Se falhar:
  - [ ] Ver logs detalhados
  - [ ] Comunicar com Matheus
  - [ ] Identificar root cause
  - [ ] Corrigir

---

### 4: Testes em 3 Resoluções

Validar que testes cobrem:

- [ ] Mobile (375x667):
  - [ ] Navbar hambúrguer funciona
  - [ ] Cards em 1 coluna
  - [ ] Sem scroll horizontal

- [ ] Tablet (768x1024):
  - [ ] Cards em 2 colunas
  - [ ] Navbar expandido
  - [ ] Layout responsivo

- [ ] Desktop (1920x1080):
  - [ ] Cards em 3-4 colunas
  - [ ] Layout completo
  - [ ] Sem truncamento

Se não estiver testando estas resoluções:

```js
// Adicionar ao arquivo de teste correspondente
describe("Responsividade", () => {
  it("Deve funcionar em mobile", () => {
    cy.viewport(375, 667);
    cy.visit("/");
    // Assertions
  });

  it("Deve funcionar em tablet", () => {
    cy.viewport(768, 1024);
    cy.visit("/");
    // Assertions
  });

  it("Deve funcionar em desktop", () => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    // Assertions
  });
});
```

- [ ] Testes responsividade existem
- [ ] Cobrem 3 resoluções
- [ ] Todos passam

---

### 5: Validar Fixtures

- [ ] `cypress/fixtures/filmes.json` existe
  - [ ] Tem estrutura correta
  - [ ] Tem mínimo 3 filmes
  - [ ] Campos: id, titulo, ano, genero, tipo

- [ ] `cypress/fixtures/diretores.json` existe
  - [ ] Tem estrutura correta
  - [ ] Tem mínimo 2 diretores
  - [ ] Campos: id, nome, nacionalidade, principais_obras

- [ ] `cypress/fixtures/contato.json` existe
  - [ ] Retorna `{ success: true }`

- [ ] Fixtures usadas com `cy.intercept()`:

  ```js
  cy.intercept("GET", "**/api/filmes", { fixture: "filmes.json" });
  ```

- [ ] Verificar que **NÃO usa API real** em testes

---

### 6: Validar Cenários de Teste

Verificar que testes cobrem:

#### Home

- [ ] Página carrega
- [ ] Cards aparecem
- [ ] Mock data funciona
- [ ] Sem erros

#### Diretores

- [ ] Página carrega
- [ ] Cards com diretores aparecem
- [ ] Dados corretos (nome, nacionalidade, obras)

#### Contato

- [ ] Formulário aparece
- [ ] Validações funcionam (campos obrigatórios)
- [ ] Envia sem erro
- [ ] Fallback offline funciona

#### Navegação

- [ ] Home → Diretores
- [ ] Diretores → Contato
- [ ] Contato → Home
- [ ] Voltando volta

Se faltarem cenários, adicionar:

```js
it("Deve testar [cenário]", () => {
  //teste
});
```

- [ ] Todos cenários cobertos
- [ ] Testes bem estruturados
- [ ] Nomes descritivos

---

### 7: Ajudas com Problemas de Teste

Se algum teste está falhando:

**Passo 1:** Entender o erro

```bash
# Ver logs detalhados
pnpm run cypress:open
# Clicar no teste que falha
# Ver exatamente o que quebrou
```

**Passo 2:** Identificar causa

- Seletor CSS mudou?
- Fixture data incorreta?
- Timing issue (elemento não apareceu)?
- Validação incorreta?

**Passo 3:** Comunicar

```
Teste falhando: [nome do teste]
Erro: [copiar mensagem de erro]
Causa provável: [sua análise]
```

**Passo 4:** Ajudar a Matheus a corrigir

---

## DEVOPS (Apoio a Henrique)

### 8: Validar Docker

```bash
# Verificar que arquivo existe
ls docker-compose.yml

# Subir containers
docker-compose up -d

# Verificar status
docker-compose ps
```

- [ ] `docker-compose.yml` existe
- [ ] Containers sobem sem erro
- [ ] PostgreSQL roda (`docker-compose ps`)
- [ ] Backend roda (`docker-compose ps`)
- [ ] Health check passa

```bash
# Ver logs
docker-compose logs postgres
docker-compose logs backend

# Deve mostrar que está rodando
```

- [ ] Logs mostram serviços online
- [ ] Sem erros de conexão

---

### 9: Validar GitHub Actions

```
Repositório → Actions
```

- [ ] Workflow `CI/CD Pipeline - cinelogplay` existe
- [ ] Roda em cada PR
- [ ] Roda em cada push

**Em um PR:**

```
Repositório → Pull Requests → [seu PR]
Scroll down → Checks
```

- [ ] CI roda automaticamente
- [ ] Se passa, permite merge
- [ ] Se falha, bloqueia merge

**Verificar Status Checks:**

```
Settings → Code and automation → Rulesets
```

- [ ] `main` tem proteção
- [ ] `dev` tem proteção
- [ ] CI é obrigatório
- [ ] Merge requer aprovação

---

### 10: Validar Deploy Render

```
Render Dashboard → seu-backend
```

- [ ] Build roda sem erro
- [ ] Deploy completa
- [ ] Serviço está "Live"

```bash
# Testar endpoint
curl https://seu-backend.onrender.com/api/filmes

# Deve retornar JSON
```

- [ ] Retorna `{ success: true, data: [...] }`
- [ ] Sem timeout
- [ ] Sem erro 500

**Se tiver erro:**

```
Render Dashboard → seu-backend → Logs
```

- [ ] Ver exatamente qual erro
- [ ] Comunicar com Henrique
- [ ] Análise de root cause

---

### 11: Validar Variáveis de Ambiente

**Em Vercel (Frontend):**

```
Vercel Dashboard → seu-projeto → Settings → Environment Variables
```

- [ ] `VITE_API_URL` está configurada
- [ ] Aponta para URL Render correta
- [ ] Não vazia

**Em Render (Backend):**

```
Render Dashboard → seu-backend → Settings → Environment
```

- [ ] `DATABASE_URL` configurada
- [ ] `NODE_ENV=production`
- [ ] `PORT` configurada
- [ ] `CORS_ORIGIN` configurada (inclui Vercel)

Se algo falta:

```
Render → seu-backend → Environment
Adicionar variável
Redeploy
```

- [ ] Todas variáveis presentes
- [ ] Valores corretos
- [ ] Backend reredeploy automático

---

### 12: Teste de Robustez

**Cenário 1: Backend online, Frontend offline**

```
1. Abrir DevTools (F12)
2. Network → Throttling → Offline
3. Recarregar página
4. Verificar erro
5. Colocar online novamente
6. Recarregar
7. Frontend funciona?
```

- [ ] Sem backend funciona (fallback)
- [ ] Com backend funciona (integração)

**Cenário 2: Desligar backend completamente**

```
1. Ir em Render Dashboard
2. seu-backend → Settings → Delete Service
3. Acessar frontend
4. Funciona? (mock data)
```

- [ ] Frontend não quebra
- [ ] Mostra dados mock
- [ ] Mensagem de erro clara (ou silenciosa)

**Cenário 3: Teste formulário**

```
1. Ir em Contato
2. Preencher formulário
3. Submeter
4. Ver resposta
5. Verificar que não quebrou
```

- [ ] Formulário funciona
- [ ] Feedback visual (sucesso/erro)
- [ ] Fallback localStorage (se offline)

---

### FASE 13: Monitoramento Contínuo

**Diariamente:**

```
GitHub Actions → Verificar último workflow
- Passou?
- Falhou?  Comunicar
```

```
Render Dashboard → seu-backend
- Status: Live?
- Health: Green?
```

```
Vercel Dashboard → seu-frontend
- Status: Ready?
- Build: Last deployment OK?
```

Se algo não está ok:

```
[Componente] falhou
Detalhes: [link para logs]
Ação: [o que vai fazer]
```

---

### 14: Documentação DevOps

- [ ] Atualizar `README.md`:
  - [ ] Como rodar Docker localmente
  - [ ] Como fazer deploy
  - [ ] URLs de produção
  - [ ] Troubleshooting comum

- [ ] Atualizar `18_CI_CD.md`:
  - [ ] Como monitorar CI/CD
  - [ ] Quais são os status checks
  - [ ] Como resolver falhas

- [ ] Atualizar `21_CHANGELOG.md`:
  - [ ] Mudanças de infraestrutura
  - [ ] Novos workflows

---

## Checklist de Qualidade

### Testes:

- [ ] Cypress roda localmente (0 falhas)
- [ ] Cypress roda em CI (0 falhas)
- [ ] Fixtures corretas e usadas
- [ ] 3 resoluções testadas
- [ ] Sem dependência de API real
- [ ] Cobertura: home, diretores, contato, navegação

### DevOps:

- [ ] Docker Compose roda
- [ ] GitHub Actions funciona
- [ ] CI bloqueia merge se falhar
- [ ] Deploy Render automático
- [ ] Variáveis de ambiente seguras
- [ ] Backend respondendo em produção
- [ ] Teste de robustez passa

### Integração:

- [ ] CI verde em cada PR
- [ ] Deploy automático em cada merge
- [ ] Frontend + Backend integrados
- [ ] Sem dependência local

---

## Comunicação com Henrique e Matheus

### Com Matheus (Testes):

```
Testes passando
Teste [nome] falhando
Erro: [descrição]
Solução proposta: [sua ideia]
```

### Com Henrique (Backend/DevOps):

```
Docker funcionando
GitHub Actions falhando
Erro: [o que mostra no log]
Variável faltando: [qual]
Deploy bloqueado: [motivo]
```

---

## Documentos Relacionados

- **16_CYPRESS_E2E.md** → Detalhes Cypress
- **18_CI_CD.md** → CI/CD configurado
- **14_DEFINITION_OF_DONE.md** → Quando está pronto
- **11_RESPONSABILIDADES.md** → Suas responsabilidades

---

## Critério

- [ ] Testes passando 100% (localmente + CI)
- [ ] Docker rodando sem problemas
- [ ] GitHub Actions verde
- [ ] Deploy Render automático
- [ ] Backend online respondendo
- [ ] Variáveis de ambiente seguras
- [ ] Teste de robustez OK
- [ ] Monitoramento contínuo
- [ ] Documentação atualizada
- [ ] Equipe alinhada (0 bloqueios)

---

## Responsabilidades

| Fase | Tarefa                    | Status |
| ---- | ------------------------- | ------ |
| 1    | Setup Cypress             | -      |
| 2    | Validar testes localmente | -      |
| 3    | Validar CI                | -      |
| 4    | 3 resoluções              | -      |
| 5    | Fixtures corretas         | -      |
| 6    | Cenários cobertos         | -      |
| 7    | Debug testes              | -      |
| 8    | Docker funciona           | -      |
| 9    | GitHub Actions OK         | -      |
| 10   | Deploy Render OK          | -      |
| 11   | Variáveis ambiente        | -      |
| 12   | Teste de robustez         | -      |
| 13   | Monitoramento             | -      |
| 14   | Documentação              | -      |

---

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
