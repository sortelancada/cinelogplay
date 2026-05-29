---
<p align="center">
<img src="../img/cinelogplay.png" alt="CinelogPlay Banner" width="600"/>
</p>
---

## Índice

- [Tema](#tema)
- [Objetivo do Documento](#objetivo-do-documento)
  - [Documentos complementares](#documentos-complementares)
- [Fluxo Geral do Projeto](#fluxo-geral-do-projeto)
  - [Fluxo de Trabalho da Equipe (Obrigatório)](#fluxo-de-trabalho-da-equipe-obrigatório)
- [Tecnologias e Versões](#tecnologias-e-versões)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Arquitetura Geral](#arquitetura-geral)
  - [Características obrigatórias](#características-obrigatórias)
- [Resiliência do Backend](#resiliência-do-backend)

- [Estrutura do Frontend](#estrutura-do-frontend)
- [Integração Frontend + Backend](#integração-frontend--backend)

- [Estrutura do Backend](#estrutura-do-backend)
- [Banco de Dados](#banco-de-dados)

- [Testes](#testes)
- [Versionamento (GitHub)](#versionamento-github)
  - [Estratégia de Branching](#estratégia-de-branching)
  - [Fluxo Técnico de Trabalho (Git)](#fluxo-técnico-de-trabalho-git)
  - [Regras Obrigatórias de Versionamento](#regras-obrigatórias-de-versionamento)

- [DevOps](#devops)
- [Ordem de Desenvolvimento](#ordem-de-desenvolvimento)
- [Ordem de Deploy](#ordem-de-deploy)

- [Modo Offline](#modo-offline)
- [Teste de Robustez](#teste-de-robustez)

- [Documentação](#documentação)
- [Validação Final](#validação-final)
- [Definition of Done (DoD)](#definition-of-done-dod)
- [Entrega](#entrega)

---

## Tema

**CinelogPlay — Catálogo Informativo de Produções Cinematográficas**

O CinelogPlay é uma plataforma centralizada de consulta sobre o universo do cinema mundial. O objetivo do projeto é oferecer um inventário organizado que vai além da sinopse, apresentando detalhes técnicos de produção, composição de elenco e a trajetória de diretores.

A proposta é ser um "diário de bordo" do cinema, onde o usuário encontra informações rápidas e estruturadas sobre filmes de diversos gêneros e épocas, servindo como uma fonte de referência prática e funcional.

---

## Objetivo do Documento

Este documento define **o escopo funcional do projeto**, ou seja, **o que será construído** e **como o sistema deve se comportar**.

Este documento **NÃO cobre configuração de ambiente**.

Para isso, consulte:

- `05_AMBIENTE_WINDOWS.md`
- `06_AMBIENTE_LINUX.md`

---

### Documentos complementares

- Arquitetura → `03_ARQUITETURA.md`
- Resiliência → `17_RESILIENCE.md`
- Testes → `15_TEST_PLAN.md` e `16_CYPRESS_E2E.md`
- CI/CD → `18_CI_CD.md`
- Deploy → `19_DEPLOY_(VERCEL_RENDER).md`

Este documento atua como **visão central do projeto**, conectando todos os demais.

---

## Fluxo Geral do Projeto

Este é o fluxo de execução do projeto:

1. Definição da arquitetura
2. Implementação do backend (com fallback)
3. Implementação do frontend (modo mock)
4. Integração frontend + backend
5. Implementação dos testes (Cypress)
6. SonarQuebe
7. Configuração de CI/CD
8. Deploy (backend → frontend)
9. Validação final (modo offline incluso)

Este fluxo deve ser seguido por toda a equipe.

---

### Responsabilidade por Área

- Frontend → Lucas
- Backend → Henrique (principal) + Lucas (apoio)
- Testes → Matheus + Winley (apoio)
- DevOps → Henrique + Winley (apoio)
- Documentação → Todos

---

## Versionamento (GitHub)

O projeto utiliza controle de versão com fluxo padronizado.

- Repositório privado

### Estratégia de Branching

O projeto utiliza um fluxo baseado em ambiente de desenvolvimento controlado:

- `main` → branch estável (produção / entrega final)
- `dev` → branch de integração contínua (homologação)
- `feature/*` → branches de desenvolvimento criadas a partir de `dev`

### ATENÇÃO!!!

> ❗ ANTES DE INICIAR A CRIAÇÃO DA BRANCH → ATUALIZAR SEU AMBIENTE LOCAL

---

## Fluxo de Trabalho da Equipe (Obrigatório)

Este fluxo define como os membros devem atuar no projeto utilizando o modelo de versionamento e integração contínua com branch `dev`.

    →  Cada desenvolvedor trabalha em sua branch de feature

1. Sincronizar branch `dev` local:
   - `git checkout dev` → `git pull origin dev`

2. Criar branch `feature/*` a partir da `dev` atualizada:
   - `git checkout -b feature/[area]-nome`

### Exemplos:

```bash
git checkout -b feature/frontend-home
git checkout -b feature/backend-api-filmes
git checkout -b feature/tests-cypress-navbar
git checkout -b feature/devops-docker-setup
git checkout -b feature/docs-nome-do-ajuste
```

3. Desenvolver a funcionalidade seguindo padrões do projeto

4. Commitar alterações seguindo padrão:
   - `tipo: descrição clara`

5. Push para GitHub:
   - `git push origin feature/[area]-nome`

6. Abrir Pull Request para `dev` (base: `dev`, compare: seu-branch)
7. Comunicar no grupo da equipe (`WhatsApp`) com link do PR
8. Aguardar revisão de outro membro da equipe
9. Ajustar caso necessário (novo commit + push)
10. Merge na `dev` após aprovação + CI verde
11. CI executa automaticamente no Pull Request
12. CD será executado após validação em `dev`
13. Realizar exclusão manual da sua branch após finalizar

14. Quando pronto para produção:
    - PR de dev → main → **Deploy final**

---

## Regras Obrigatórias de Versionamento

> **LEIA ANTES DE FAZER QUALQUER COMMIT**

- ❗ Pull Request é obrigatório
- ❗ Todo código deve ser enviado via Pull Request
- ❗ Proibido commit direto na `main`
- ❗ Proibido commit direto na `dev`
- ❗ Toda alteração deve ser feita via branch `feature/*`
- ❗ Todo PR deve ser revisado antes do merge
- ❗ CI deve rodar em todos os PRs
- ❗ Manter commits organizados, claros e limpos
- ❗ Comunicar PR no grupo da equipe via (`WhatsApp`) para aprovção
- ❗ Nunca criar branch a partir de código desatualizado

> **PR NÃO É OPCIONAL — É REGRA DO PROJETO**

---

## Tecnologias e Versões

### Frontend

- HTML5 → Documentação (https://www.w3schools.com/html/)
- CSS3 → Documentação (https://www.w3schools.com/css/)
- Bootstrap 5.3.8 (framework CSS) → [Download](https://getbootstrap.com/) | Documentação (https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- JavaScript ES6+ ( para filtros, carrossel e validação de formulários ) → Documentação (https://www.w3schools.com/js/)

### Backend

- Node.js v24.16.0LTS → [Download](https://nodejs.org/en/download) | [Documentação](https://nodejs.org/docs/latest-v20.x/api/)
  - Gerenciamento de versão: fnm ( Linux e Windows ) → [Instalação](https://github.com/Schniz/fnm)
  - Execução:
    - Linux: terminal padrão
    - Windows: Git Bash v2.54.0 ( obrigatório )
- Express.js v4.22.2 → [Documentação](https://expressjs.com/)
- pnpm v10.12.4 → [Documentação](https://pnpm.io/)
- Docker
  - Linux: Docker Engine 29.5.2 → [Download](https://docs.docker.com/engine/install/) | [Documentação](https://docs.docker.com/engine/)
  - Windows: Docker Desktop 4.69.0 x → [Download](https://www.docker.com/products/docker-desktop) | [Documentação](https://docs.docker.com/desktop/)
- PostgreSQL v16-alpine.x ( homologação via Docker ) → [Download](https://www.postgresql.org/download/) | [Documentação](https://www.postgresql.org/docs/16/)
- Supabase v16.x ( produção ) → [Site Oficial](https://supabase.com/) | [Documentação](https://supabase.com/docs)

---

## Arquitetura Geral

O sistema segue uma arquitetura em 3 camadas:

- Frontend (interface do usuário)
- Backend (API REST)
- Banco de dados (PostgreSQL)

### Características obrigatórias:

- Frontend desacoplado do backend
- Backend resiliente (fallback ativo)
- Testes independentes da API
- Deploy separado por camada

---

## Resiliência do Backend

O backend deve continuar funcionando mesmo se o banco estiver indisponível.

### Implementação obrigatória (Exemplo):

```js
let dbConnected = true;

try {
  await conectarBanco();
} catch {
  dbConnected = false;
  console.log("Banco indisponível — modo fallback ativo");
}
```

---

### Comportamento esperado:

- Banco ativo → usar dados reais
- Banco indisponível → retornar dados mock

### Exemplo do endpoint:

```js
const mockFilmes = require("./mock/filmes.json");

app.get("/api/filmes", async (req, res) => {
  try {
    if (!dbConnected) {
      return res.json({
        success: true,
        data: mockFilmes,
      });
    }

    const filmes = await buscarFilmes();

    return res.json({
      success: true,
      data: filmes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Erro ao buscar filmes",
    });
  }
});
```

---

## Estrutura do Frontend

### Home

- Navbar com links para todas as páginas
- Seções:
  - Filmes variados (cards com imagem + título)
  - Lançamentos (carrossel ou grid)
  - Gêneros (cards clicáveis)
  - Por ano de lançamento
  - Clássicos

- Footer com redes sociais

---

## Integração Frontend + Backend

### Comportamento do Frontend

> Modo Mock (Desacoplamento)

O frontend deve funcionar de forma independente do backend.

### Estrutura obrigatória (exemplo):

```
/frontend/data/filmes.json
```

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "titulo": "O Poderoso Chefão",
      "ano": 1972,
      "genero": "Crime",
      "tipo": "Clássico"
    },
    {
      "id": 2,
      "titulo": "Interestelar",
      "ano": 2014,
      "genero": "Ficção Científica",
      "tipo": "Moderno"
    }
  ]
}
```

```
/frontend/data/diretores.json
```

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "Francis Ford Coppola",
      "nacionalidade": "EUA",
      "principais_obras": ["O Poderoso Chefão", "Apocalypse Now"]
    },
    {
      "id": 2,
      "nome": "Christopher Nolan",
      "nacionalidade": "Reino Unido",
      "principais_obras": [
        "Interestelar",
        "A Origem",
        "Batman: O Cavaleiro das Trevas"
      ]
    }
  ]
}
```

---

### Configuração de consumo de API

```js
const API_URL = import.meta.env.VITE_API_URL || "";
const USE_MOCK = !API_URL;
```

---

### Regra de funcionamento:

- API disponível → consumir backend
- API indisponível → usar mock local
- API não configurada → usar mock automaticamente

---

### Implementação:

```js
const API_URL = import.meta.env.VITE_API_URL || "";
const USE_MOCK = !API_URL;

async function getFilmes() {
  if (USE_MOCK || !API_URL) {
    return fetch("/data/filmes.json")
      .then((res) => res.json())
      .then((json) => json.data);
  }

  return fetch(`${API_URL}/api/filmes`)
    .then((res) => res.json())
    .then((json) => json.data);
}
```

---

### Fluxo:

- USE_MOCK = true → usa dados locais
- USE_MOCK = false → usa API
- Sem API → fallback automático
- Frontend nunca quebra

Referência:

- [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

### Configuração de Ambiente do Frontend

Criar arquivo `.env`:

```
VITE_API_URL=https://seu-backend.onrender.com
```

---

## ATENÇÃO !!!

- `Nunca deixar VITE_API_URL vazio em produção`
- Nunca subir frontend antes do backend
- Sempre validar API antes do deploy

---

### Obrigatório:

- O frontend nunca pode quebrar
- O sistema deve funcionar sem backend
- O fallback deve ser automático

---

### Página: Diretores Icônicos

- Cards com foto, nome e principais obras
- Informações:
  - Nome
  - Foto
  - Principais obras

- Layout responsivo com Bootstrap

---

### Página: Contato

- Campos obrigatórios no Formulário:
  - Nome
  - Email
  - Mensagem

* Validação em JavaScript
* Integração com backend

---

### Regras:

- Validação via JavaScript
- Integração com backend quando disponível
- Funcionamento offline obrigatório

---

### Formulário com fallback

O formulário deve funcionar mesmo se a API falhar.

```js
const API_URL = import.meta.env.VITE_API_URL || "";
const USE_MOCK = !API_URL;

async function enviarFormulario(dados) {
  try {
    await fetch(`${API_URL}/api/contato`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    alert("Mensagem enviada com sucesso!");
  } catch {
    alert("Modo offline: mensagem salva localmente");
    localStorage.setItem("mensagem", JSON.stringify(dados));
  }
}
```

---

### Regras

- O formulário nunca pode falhar
- Em caso de erro → fallback localStorage
- Experiência do usuário deve ser contínua

---

## Estrutura do Backend

### Estrutura de pastas inicial:

```
/backend
 ├── controllers/
 ├── routes/
 ├── services/
 ├── config/
 ├── mock/
 └── server.js
```

O backend é responsável por fornecer dados via API REST.

### Responsabilidades:

- Disponibilizar endpoints
- Gerenciar acesso ao banco
- Atuar com fallback em caso de falha
- Garantir respostas consistentes

---

### Ambiente de desenvolvimento

O backend deve suportar dois modos de execução:

- Local (Node.js v24.16.0)
- Docker (ambiente de homologação)

#### Requisitos obrigatórios:

- Docker Compose | v5.1.4

- `docker-compose.yml` para subida do PostgreSQL
- Variáveis de ambiente configuradas (`.env`)

#### Objetivo:

Garantir que o ambiente de desenvolvimento seja padronizado e reproduzível por todos os membros da equipe.

---

### Endpoints obrigatórios (exemplos):

- `/api/filmes`
- `/api/diretores`
- `/api/contato`

### Padrão de resposta da API

Seguir obrigatoriamente o padrão definido em `02_REQUISITOS.md (RF11)`.

Sucesso:

```
{
  "success": true,
  "data": [...]
}
```

Erro:

```
{
  "success": false,
  "error": "mensagem descritiva"
}
```

---

### Dados Mock (Backend)

Estrutura obrigatória:

```
/backend/mock/filmes.json
```

Referência:

- [https://expressjs.com/](https://expressjs.com/)
- [https://nodejs.org/docs/latest-v24.16.0.x/api/](https://nodejs.org/docs/latest-v24.16.0.x/api/)

---

### Regra de fallback:

- Banco disponível → consulta real
- Banco indisponível → retornar mock

---

## Banco de Dados

O sistema utiliza PostgreSQL como banco relacional.

### Tabela: filmes

- id (PK)
- título
- ano
- gênero
- diretor_id (FK)
- tipo

---

### Tabela: diretores

- id (PK)
- nome
- nacionalidade
- principais_obras

---

### Tabela: mensagens

- id (PK)
- nome
- email
- mensagem
- data_envio

---

### Regras:

- Integridade referencial obrigatória
- Dados devem refletir o mock
- Estrutura deve ser compatível com a API

---

## Testes

O projeto deve garantir qualidade e estabilidade através de testes automatizados.

### Ferramentas

- Cypress v14.5.4.x (E2E) → [Documentação](https://docs.cypress.io/)
- Jest v30.4.2.x → Documentação (https://jestjs.io/docs/getting-started)
- Supertest v6.x (opcional) → [Documentação](https://github.com/ladjs/supertest)

---

### Testes End-to-End (Cypress)

Validar o comportamento completo da aplicação do ponto de vista do usuário.

### Cenários obrigatórios

1. Carregamento das páginas
2. Navegação via navbar
3. Interações do usuário
4. Formulário de contato
5. Responsividade

---

### Configuração

Arquivo obrigatório (exemplo):

- Criar arquivo do `cypress.config.js`:

```js
module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000",
  },
};
```

---

### Testes desacoplados do backend

Os testes NÃO devem depender da API.

### Estrutura:

```
/cypress/fixtures/filmes.json
```

---

### Interceptação obrigatória:

```js
cy.intercept("GET", "/api/filmes", {
  fixture: "filmes.json",
});
```

---

### Benefícios:

- Testes estáveis
- Independência do backend
- Execução confiável

Referência:

- [https://docs.cypress.io/api/commands/intercept](https://docs.cypress.io/api/commands/intercept)

---

## DevOps

O projeto utiliza práticas de integração e entrega contínua para garantir qualidade e consistência.

### Ferramentas

- GitHub Actions (CI/CD) → [Documentação](https://docs.github.com/actions)
- Render (backend) → [Site Oficial](https://render.com/) | [Documentação](https://render.com/docs)
- Vercel ou GitHub Pages (frontend) → [Vercel](https://vercel.com/) | [GitHub Pages](https://pages.github.com/)

---

### Integração Contínua (CI)

O pipeline de CI deve executar automaticamente em todos os Pull Requests.

### Execuções obrigatórias:

- Testes E2E (Cypress) em cada PR
- Testes de backend (Jest + Supertest)

---

### Regras:

- Cypress deve rodar com dados mock
- Testes não podem depender do backend
- Falha na pipeline → bloqueia merge

---

## Entrega Contínua (CD)

O deploy deve ocorrer após validação completa do sistema.

### Destinos:

- Frontend → Vercel ou GitHub Pages
- Backend → Render
- Banco → Docker (homologação) / Supabase (produção)

---

## Ordem de Desenvolvimento

> Esta seção detalha a execução prática do fluxo definido anteriormente.

A execução do projeto deve seguir a seguinte ordem:

1. Backend (estrutura + endpoints + fallback)
2. Frontend (modo mock)
3. Integração frontend + backend
4. Testes (Cypress)
5. CI/CD
6. Deploy

---

## Ordem de Deploy

### Passo a passo obrigatório:

1. Subir backend no Render
2. Validar endpoint:
   - `/api/filmes`

3. Configurar variável `.env` no frontend:

```
Exemplo: VITE_API_URL=https://seu-backend.onrender.com
```

4. Subir frontend no Vercel ou GitHub Pages

---

### Regras:

- ❗ Nunca subir frontend antes do backend
- ❗ Nunca deixar variável de API vazia em produção
- ❗ Sempre validar API antes do deploy

---

## Modo Offline

O sistema deve ser resiliente a falhas externas.

### Comportamento esperado:

Frontend:

- Utiliza dados mock automaticamente

Backend:

- Utiliza fallback em caso de falha no banco

Testes:

- Utilizam interceptação (Cypress)

---

## Teste de Robustez

Antes da apresentação, deve ser executado o seguinte cenário:

### Procedimento:

1. Desligar o backend
2. Executar o frontend
3. Rodar testes Cypress
4. Testar envio do formulário

### Resultado:

- Aplicação funcionando
- Dados sendo exibidos
- Testes passando
- Formulário operando com fallback

---

## Documentação

O projeto deve conter os seguintes documentos:

### Documentos principais

- `README.md` → Visão geral do projeto
- `01_ESCOPO_DO_PROJETO.md` → Escopo funcional do sistema
- `02_REQUISITOS.md` → Levantamento de requisitos
- `03_ARQUITETURA.md` → Definição da arquitetura do sistema
- `04_TECNOLOGIAS_DO_PROJETO.md` → Stack e tecnologias utilizadas
- `05_AMBIENTE_WINDOWS.md` → Configuração do ambiente Windows
- `06_AMBIENTE_LINUX.md` → Configuração do ambiente Linux

---

### Documentos de processo e organização

- `07_CONFIG_REPO_GITHUB.md` → Configuração do repositório
- `08_WORKFLOW.md` → Fluxo de trabalho do projeto
- `09_VERSIONAMENTO.md` → Regras de versionamento
- `10_BRANCHING.md` → Estratégia de branches
- `11_RESPONSABILIDADES.md` → Papéis da equipe
- `12_CONTRIBUICAO.md` → Regras de contribuição

---

### Documentos de desenvolvimento

- `13_UI_GUIDELINES.md` → Padrões de interface (UI)
- `14_DEFINITION_OF_DONE.md` → Critérios de conclusão

---

### Documentos de qualidade e testes

- `15_TEST_PLAN.md` → Plano de testes
- `16_CYPRESS_E2E.md` → Testes End-to-End

---

### Documentos de arquitetura operacional

- `17_RESILIENCE.md` → Estratégia de fallback
- `18_CI_CD.md` → Integração e entrega contínua
- `19_DEPLOY_(VERCEL_RENDER).md` → Processo de deploy

---

### Documentos de apoio e padronização

- `20_ESTRUTURA_DOC.md` → Estrutura da documentação
- `21_CHANGELOG.md` → Histórico de mudanças
- `22_EXTENSOES_VSCODE.md` → Extensões utilizadas
- `23_CONFIGURACAO_EXTENSOES.md` → Configuração das extensões

---

### Documentos operacionais (checklists)

- `24_CHECKLIST_MATHEUS.md` → Checklist operacional
- `25_CHECKLIST_LUCAS.md` → Checklist operacional
- `26_CHECKLIST_HENRIQUE.md` → Checklist operacional

---

### Documento final

- `27_APRESENTACAO.md` → Material de apresentação

---

### Regras obrigatórias para equipe!!!

- Todos os documentos devem estar **atualizados**
- Todos devem ser **consistentes entre si**
- Nenhum documento pode **contradizer o escopo**
- Devem refletir **exatamente o comportamento real do sistema**

---

## Validação Final

Antes da entrega, o sistema deve atender aos seguintes critérios:

### Requisitos técnicos:

- HTML, CSS, Bootstrap implementados
- JavaScript funcional (ES6+)
- Backend em Node.js v24.16.0LTS + Express v4.22.2x
- Banco PostgreSQL v16-alpine (Docker + Supabase)
- Testes Cypress implementados
- GitHub privado
- CI/CD configurado
- Deploy (Render + Vercel/GitHub Pages)
- README completo

### Requisitos de projeto:

- Código versionado corretamente
- PRs revisados
- Estrutura organizada
- Documentação completa

---

## Definition of Done (DoD)

Uma tarefa só é considerada concluída quando:

- Código implementado
- Testado (manual ou automatizado)
- Sem erros no console
- Seguindo padrões do projeto
- PR aprovado
- Integrado na branch `dev`

---

### Entrega

O sistema deve:

- Funcionar com backend ativo
- Funcionar sem backend (modo offline)
- Passar em todos os testes
- Estar pronto para apresentação

---
