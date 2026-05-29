# Responsabilidades da Equipe — CinelogPlay

## Proposta

Definir **quem faz o quê dentro do projeto**, garantindo:

- Clareza total sobre responsabilidades
- Distribuição equilibrada de tarefas
- Evitar sobrecarga ou confusão
- Garantir entrega completa

Este documento é nossa **regra do projeto**.

---

## Estrutura da equipe

| Área | Responsável | Apoio | Status |
|------|-------------|-------|--------|
| Frontend | Lucas (lucasitdev) | -   | -
| Backend | Henrique (IronVisuals) | Lucas | -
| Testes (QA) | Matheus (Mbolsanello) | Winley | -
| DevOps | Henrique (IronVisuals) | Winley | -
| Documentação | **Todos** | -  | Em andamento

###
---

# Frontend

### Responsabilidades: `Lucas (lucasitdev)`

- Desenvolver toda interface do sistema
- Implementar telas conforme `01_ESCOPO_DO_PROJETO.md`
- Aplicar padrões definidos em `13_UI_GUIDELINES.md`
- Consumir API do backend
- Garantir responsividade (mobile, tablet, desktop)
- Criar validações visuais em formulários
- Testar frontend localmente

### Deve seguir:

1. **01_ESCOPO_DO_PROJETO.md** → O que deve ser feito
2. **02_REQUISITOS.md** → Requisitos funcionais
3. **03_ARQUITETURA.md** → Como estruturar
4. **04_TECNOLOGIAS_DO_PROJETO.md** → Stack utilizada
5. **13_UI_GUIDELINES.md** → Padrões visuais
6. **08_WORKFLOW.md** → Como trabalhar
7. **10_BRANCHING.md** → Como criar branches
8. **09_VERSIONAMENTO.md** → Padrões de commit



### Entregas obrigatórias:

- [ ] Página Home completa (navbar, seções, footer)
- [ ] Página de Diretores (cards, informações)
- [ ] Página de Contato (formulário, validação)
- [ ] Integração com backend funcionando
- [ ] Mock data funcional (`/frontend/data/*.json`)
- [ ] Interface responsiva ( 3 resoluções: mobile, tablet, desktop )
- [ ] Navegação sem erros
- [ ] Sem erros no console do navegador

### Branches de trabalho (exemplos):

```
feature/frontend-home
feature/frontend-navbar
feature/frontend-filmes-section
feature/frontend-lançamentos-carrossel
feature/frontend-generos-section
feature/frontend-classicos-section
feature/frontend-diretores-page
feature/frontend-diretores-cards
feature/frontend-contato-page
feature/frontend-contato-formulario
feature/frontend-responsividade-mobile
feature/frontend-responsividade-tablet
feature/frontend-integracao-api
feature/frontend-fallback-mock
```

### Apoio que pode fornecer:

- Revisar PRs de outros membros
- Testar integração frontend ↔ backend
- Ajudar em correções críticas de outros

---

## BACKEND

### Responsável principal: `Henrique (IronVisuals)`
### Apoio: `Lucas (lucasitdev)`

### Responsabilidades (Henrique):

- Criar API REST completa
- Implementar endpoints conforme escopo
- Integrar com PostgreSQL/Supabase
- Garantir estabilidade da aplicação
- Implementar fallback (resiliência com mock)
- Validar dados de entrada
- Tratar erros apropriadamente
- Configurar Docker e ambiente

### Responsabilidades `(Lucas - Apoio)`:

- Testar endpoints durante desenvolvimento
- Ajudar em correções críticas
- Validar integração frontend ↔ backend
- Revisar estrutura de respostas da API

### Documentos que deve seguir (ordem):

1. **01_ESCOPO_DO_PROJETO.md** → Escopo funcional
2. **02_REQUISITOS.md** → Requisitos funcionais
3. **03_ARQUITETURA.md** → Arquitetura do sistema
4. **04_TECNOLOGIAS_DO_PROJETO.md** → Stack utilizada
5. **17_RESILIENCE.md** → Implementar fallback
6. **08_WORKFLOW.md** → Como trabalhar
7. **10_BRANCHING.md** → Como criar branches
8. **09_VERSIONAMENTO.md** → Padrões de commit

### Entregas obrigatórias:

- [ ] Endpoint `GET /api/filmes` (lista de filmes)
- [ ] Endpoint `GET /api/filmes/:id` (detalhe filme)
- [ ] Endpoint `GET /api/diretores` (lista diretores)
- [ ] Endpoint `GET /api/diretores/:id` (detalhe diretor)
- [ ] Endpoint `POST /api/contato` (enviar mensagem)
- [ ] Integração com PostgreSQL/Supabase
- [ ] Mock data para fallback (`/backend/mock/*.json`)
- [ ] API funcional e estável
- [ ] Respostas padronizadas (success + data/error)
- [ ] Error handling completo
- [ ] CORS configurado
- [ ] Sem erros no console

### Branch de trabalho (exemplos):

```
feature/backend-setup
feature/backend-routes-setup
feature/backend-controllers-setup
feature/backend-services-setup
feature/backend-api-filmes
feature/backend-api-diretores
feature/backend-api-contato
feature/backend-postgres-integration
feature/backend-supabase-integration
feature/backend-fallback-mock
feature/backend-validacao-dados
feature/backend-error-handling
feature/backend-cors-setup
```

### Apoio que pode fornecer:

- Revisar PRs de outros membros
- Ajudar em problemas críticos
- Orientar sobre estrutura backend

---

## TESTES (QA)

### Responsável principal: **Matheus (Mbolsanello)**
### Apoio: **Winley**

### Responsabilidades (Matheus):

- Criar testes automatizados E2E (Cypress)
- Garantir funcionamento sem backend real
- Validar fluxos principais do sistema
- Testar responsividade em 3 resoluções
- Testar navegação entre páginas
- Testar formulários e validações
- Manter testes 100% passando no CI

### Responsabilidades (Winley - Apoio):

- Validar testes no CI/CD
- Ajudar em testes complexos
- Testar integrações entre áreas
- Ajudar em testes de regressão

### Regras críticas:

- **NÃO** usar API real nos testes
- **SEMPRE** usar `cy.intercept()` com fixtures
- Testes devem rodar no CI (GitHub Actions)
- **100%** dos testes passando sempre
- Sem dependência de backend real

### Documentos que deve seguir (ordem):

1. **15_TEST_PLAN.md** → Plano de testes
2. **16_CYPRESS_E2E.md** → Detalhes Cypress
3. **02_REQUISITOS.md** → O que testar
4. **08_WORKFLOW.md** → Como trabalhar
5. **10_BRANCHING.md** → Como criar branches
6. **09_VERSIONAMENTO.md** → Padrões de commit

### Entregas obrigatórias:

- [ ] Setup Cypress com `cypress.config.js`
- [ ] Fixtures de teste (`filmes.json`, `diretores.json`)
- [ ] Testes de carregamento (home, diretores)
- [ ] Testes de navegação (navbar, links)
- [ ] Testes de formulário (validação, envio)
- [ ] Testes de responsividade (mobile, tablet, desktop)
- [ ] Testes usando `cy.intercept()` (SEM API real)
- [ ] Testes passando localmente 100%
- [ ] Testes passando no CI 100%

### Branches de trabalho (exemplos):

```
feature/tests-cypress-setup
feature/tests-cypress-fixtures
feature/tests-cypress-home
feature/tests-cypress-navegacao
feature/tests-cypress-diretores
feature/tests-cypress-formulario
feature/tests-cypress-responsividade
feature/tests-cypress-validacoes
```

### Apoio que pode fornecer:

- Revisar PRs de outros membros
- Ajudar com problemas de teste
- Orientar sobre Cypress

---

## DEVOPS

### Responsável principal: **Henrique (IronVisuals)**
### Apoio: **Winley**

### Responsabilidades (Henrique):

- Configurar CI/CD (GitHub Actions)
- Garantir execução automática dos testes
- Configurar deploy automático
- Monitorar status dos builds
- Resolver falhas de CI/CD
- Configurar Docker e PostgreSQL
- Integrar Vercel (frontend)
- Integrar Render (backend)
- Configurar variáveis de ambiente

### Responsabilidades (Winley - Apoio):

- Ajudar na configuração do Docker
- Testar CI/CD em PRs
- Validar deploys automáticos
- Ajudar em troubleshooting

### Documentos que deve seguir (ordem):

1. **18_CI_CD.md** → Configuração CI/CD
2. **19_DEPLOY_(VERCEL_RENDER).md** → Deploy
3. **07_CONFIG_REPO_GITHUB.md** → Config repo
4. **08_WORKFLOW.md** → Como trabalhar
5. **10_BRANCHING.md** → Como criar branches

### Entregas obrigatórias:

- [ ] Docker Compose com PostgreSQL funcionando
- [ ] GitHub Actions configurado (`ci.yml`) e (`cd.yml`)
- [ ] CI rodando em PRs para `dev` e `main`
- [ ] Cypress rodando no CI automaticamente
- [ ] Testes bloqueando merge se falharem
- [ ] Deploy automático em Vercel (frontend)
- [ ] Deploy automático em Render (backend)
- [ ] Health checks funcionando
- [ ] Variáveis de ambiente configuradas

### Branches de trabalho (exemplos):

```
feature/devops-docker-compose
feature/devops-github-actions-ci
feature/devops-github-actions-cd
feature/devops-vercel-integration
feature/devops-render-integration
feature/devops-status-checks
feature/devops-postgres-setup
```

### Apoio que pode fornecer:

- Revisar PRs de outros membros
- Ajudar em configuração de infraestrutura
- Orientar sobre CI/CD

---

## DOCUMENTAÇÃO (OBRIGAÇÃO DE TODOS)

### Responsabilidades de todos:

- Manter documentação **atualizada**
- Documentar mudanças realizadas
- Atualizar `CHANGELOG.md` em cada feature
- Garantir clareza e objetividade
- Manter consistência entre documentos
- Revisar documentação dos colegas

### Documentos principais:

- **README.md** → Overview do projeto
- **01_ESCOPO_DO_PROJETO.md** → Escopo funcional (CENTRAL)
- **21_CHANGELOG.md** → Histórico de mudanças
- Todos em `/docs` → Referência completa

---

## Integração entre áreas

### Frontend ↔ Backend

- **Frontend** consome API definida
- **Backend** garante retorno correto
- **Ambos** testam integração localmente
- **Acordam** contrato de dados (estrutura JSON)

### Backend ↔ Testes

- **Testes** **NÃO** dependem do backend real
- **Testes** usam `cy.intercept()` com fixtures
- **Backend** valida se dados fazem sentido
- **Ambos** garantem funcionalidades críticas

### DevOps ↔ Todos

- **Todos** garantem que:
  - Código roda localmente sem erros
  - Testes passam antes de push
  - CI está verde antes de merge
  - Deploy reflete no ambiente online

---

## Comunicação

- **WhatsApp** → Comunicações rápidas, PRs, bloqueios
- **GitHub Issues** → Rastreamento de tarefas
- **Pull Requests** → Detalhamento técnico
- **Reuniões** → Alinhamento semanal (necessário)

### Regra Crítica:

**Comunicar IMEDIATAMENTE se tiver bloqueios, dificuldades  ou dúvidas!**

---

## Regras (OBRIGATÓRIO PARA TODOS)

Todos os membros DEVEM:

- Seguir os documentos oficiais (01 até 28)
- Criar `feature/*` para cada tarefa
- Fazer PR antes de qualquer merge
- Testar código antes de subir
- Não quebrar o projeto
- Comunicar bloqueios imediatamente
- Revisar código dos colegas
- Manter documentação atualizada
- Seguir padrões do projeto

---

## Em caso de problema

1. **Comunicar no WhatsApp**
   - Descrever o problema
   - Mencionar o bloqueio

2. **Pedir ajuda de colega**
   - Mesmo se for de outra área
   - Ninguém trabalha isolado

3. **Resolver juntos**
   - Compartilhar conhecimento
   - Documentar solução

4. **Levar para reunião**
   - Se problema sistêmico
   - Para alinhar equipe

---

## Resultado

Quando todos seguem suas responsabilidades:

- Projeto organizado e claro
- Equipe totalmente alinhada
- Entregas completas
- Zero retrabalho
- Zero confusão de responsabilidades
- Entrega 100% garantida

---