# Arquitetura do Site - CinelogPlay

## Índice

- [Arquitetura do Site - CinelogPlay](#arquitetura-do-site---cinelogplay)
  - [Índice](#índice)
  - [Proposta](#proposta)
  - [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
  - [Modelo Arquitetural](#modelo-arquitetural)
  - [Estrutura do Projeto](#estrutura-do-projeto)
    - [Estrutura de Testes](#estrutura-de-testes)
    - [Arquivos obrigatórios de gerenciamento](#arquivos-obrigatórios-de-gerenciamento)
    - [Objetivo](#objetivo)
    - [Modelo de Repositório](#modelo-de-repositório)
  - [Camadas do Sistema](#camadas-do-sistema)
    - [Frontend](#frontend)
      - [Tecnologias:](#tecnologias)
    - [Backend](#backend)
      - [Tecnologias:](#tecnologias-1)
    - [Banco de Dados](#banco-de-dados)
      - [Tecnologia:](#tecnologia)
  - [Fluxo de Comunicação](#fluxo-de-comunicação)
    - [Fluxo padrão:](#fluxo-padrão)
  - [Resiliência do Sistema](#resiliência-do-sistema)
    - [Frontend (Mock)](#frontend-mock)
    - [Backend (Fallback)](#backend-fallback)
    - [Resultado:](#resultado)
  - [Estrutura de Dados](#estrutura-de-dados)
    - [Tabela: filmes](#tabela-filmes)
    - [Tabela: diretores](#tabela-diretores)
    - [Tabela: mensagens](#tabela-mensagens)
  - [Endpoints da API](#endpoints-da-api)
  - [Organização do Código](#organização-do-código)
    - [Backend](#backend-1)
      - [Responsabilidades:](#responsabilidades)
    - [Frontend](#frontend-1)
      - [Responsabilidades:](#responsabilidades-1)
  - [Padrões obrigatórios](#padrões-obrigatórios)
  - [Fluxo de desenvolvimento](#fluxo-de-desenvolvimento)
  - [Integração com CI/CD](#integração-com-cicd)
  - [Boas práticas](#boas-práticas)
  - [Erros a evitar](#erros-a-evitar)
  - [Resultado](#resultado-1)
    - [Essa arquitetura garante que:](#essa-arquitetura-garante-que)

---

## Proposta

Definir **como o sistema é estruturado internamente**, garantindo:

- Organização clara do projeto
- Separação de responsabilidades
- Facilidade de manutenção
- Padronização entre todos os membros da equipe

---

## Visão Geral da Arquitetura

O CinelogPlay segue uma arquitetura baseada em:

- Frontend desacoplado
- Backend com API REST
- Banco de dados relacional
- Sistema resiliente (funciona sem backend e sem banco de dados)

---

## Modelo Arquitetural

Arquitetura em **3 camadas (Three-Tier Architecture)**:

```
Frontend (Cliente)
↓
Backend (API REST)
↓
Banco de Dados (PostgreSQL)
```

---

## Estrutura do Projeto

```
CINELOGPLAY-WEB/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── pages/
│   ├── cypress/
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   │   └── seeders/
│   │   ├── middleware/
│   │   ├── mock/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── tests/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── package.json
│   └── Dockerfile
│
├── docs/
│
├── .github/
│
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── docker-compose.yml
```

---

### Estrutura de Testes

Frontend:

- Cypress
- frontend/cypress

Backend:

- Jest
- backend/src/tests

```
O uso de `.env` no frontend é destinado à configuração de URLs da API e variáveis de ambiente em contexto de deploy.
```

---

### Arquivos obrigatórios de gerenciamento

Raiz do projeto:

- package.json
- pnpm-workspace.yaml
- pnpm-lock.yaml

Frontend:

- package.json
- vite.config.js
- .env.example

Backend:

- package.json
- Dockerfile
- .env.example

```
Os arquivos `.env` não são versionados.

Cada módulo utiliza seu respectivo `.env.example`
como referência para configuração do ambiente.
```

### Objetivo

- Controle de dependências
- Execução da pipeline CI/CD
- Padronização do ambiente
- Reprodutibilidade do projeto

---

### Modelo de Repositório

O projeto utiliza a estratégia Monorepo.

O gerenciamento do workspace é realizado através do arquivo:

- pnpm-workspace.yaml

Esse arquivo define os pacotes participantes do workspace:

- frontend
- backend

Benefícios:

- instalação centralizada de dependências
- execução unificada de scripts
- compartilhamento de configurações
- integração simplificada com CI/CD
- gerenciamento consistente de versões

---

## Camadas do Sistema

### Frontend

Responsável por:

- Interface do usuário
- Consumo da API
- Exibição de dados
- Fallback com dados mock

#### Tecnologias:

- HTML5
- CSS3
- Bootstrap
- JavaScript (ES6+)

---

### Backend

Responsável por:

- Regras de negócio
- API REST
- Integração com banco
- Fallback (modo offline)
- Autenticação e autorização (JWT)

#### Tecnologias:

- Node.js v24.16.0
- Express v4.22.2

---

### Banco de Dados

Responsável por:

- Armazenamento persistente
- Relacionamento entre entidades

#### Tecnologia:

- PostgreSQL

## Fluxo de Comunicação

### Fluxo padrão:

1. Usuário acessa frontend
2. Frontend chama API:

```js
fetch(`${config.apiUrl}/api/filmes`)
  .then((res) => res.json())
  .then((json) => json.data);
```

```js
// fallback automático (modo offline)
import filmes from "../data/filmes.json";

function getFilmes() {
  return filmes.data;
}
```

```js
// fallback automático (modo offline)
import diretores from "../data/diretores.json";

function getDiretores() {
  return diretores.data;
}
```

3. Backend processa
4. Retorna JSON
5. Frontend renderiza dados

---

## Resiliência do Sistema

### Frontend (Mock)

Se API falhar:

```js
// fallback automático (modo offline)
import filmes from "../data/filmes.json";

function getFilmes() {
  return filmes.data;
}
```

```js
// fallback automático (modo offline)
import diretores from "../data/diretores.json";

function getDiretores() {
  return diretores.data;
}
```

---

### Backend (Fallback)

Se banco falhar:

```js
return res.json({
  success: true,
  data: mockFilmes,
});
```

---

### Resultado:

- Sistema nunca quebra
- Sempre retorna dados
- Sempre mantém o padrão de resposta da API

---

## Estrutura de Dados

### Tabela: filmes

- id
- titulo
- ano
- genero
- diretor_id
- tipo

---

### Tabela: diretores

- id
- nome
- nacionalidade
- principais_obras

---

### Tabela: mensagens

- id
- nome
- email
- mensagem
- data_envio

---

## Endpoints da API

- GET /api/filmes
- GET /api/filmes/:id

- GET /api/diretores
- GET /api/diretores/:id

- POST /api/contato

- Rotas de autenticação (auth)
- Rotas de atores
- Rotas de avaliações
- Rotas de favoritos

---

## Organização do Código

### Backend

```
/backend
└── src
    ├── auth/
    ├── config/
    ├── controllers/
    ├── database/
    │   └── seeders/
    ├── middleware/
    ├── mock/
    ├── models/
    ├── routes/
    ├── services/
    ├── tests/
    ├── utils/
    └── server.js
```

#### Responsabilidades:

- auth → autenticação e autorização (JWT)
- config → configuração da aplicação e conexão com banco
- controllers → recebimento e tratamento das requisições
- database → scripts, estrutura e seeders do banco
- middleware → validações e tratamento das requisições
- mock → dados de fallback
- models → acesso e modelagem dos dados
- routes → definição dos endpoints
- services → regras de negócio
- tests → testes automatizados
- utils → funções utilitárias compartilhadas
- server.js → inicialização da aplicação backend

---

### Frontend

```
frontend/
├── pages/
├── src/
│   ├── js/
│   ├── css/
│   ├── data/
│   │   ├── filmes.json
│   │   └── diretores.json
│   └── img/
```

#### Responsabilidades:

- pages → telas
- js → lógica
- css → estilos
- data → mock

---

## Padrões obrigatórios

- Separação clara de responsabilidades
- Código modular
- Uso de `.env`
- Uso de mock (frontend e testes)
- API REST padronizada

- Todas as respostas da API devem obrigatoriamente seguir o padrão:

  Sucesso:

```
{
  "success": true,
  "data": [...]
}

Erro:
{
  "success": false,
  "error": "mensagem descritiva"
}
```

---

## Fluxo de desenvolvimento

1. Atualizar branch local `dev`
2. Criar branch `feature/<area>-nome`
3. Desenvolver funcionalidade (frontend com mock ou backend)
4. Criar/ajustar testes (Cypress com intercept)
5. Validar funcionamento local (com e sem backend)
6. Abrir Pull Request para `dev`
7. Aguardar revisão
8. Realizar ajustes se necessário
9. Merge após aprovação

---

## Integração com CI/CD

- Pipeline CI executa em todos os Pull Requests
- Cypress roda com dados mock (sem depender do backend)
- Falha na pipeline bloqueia o merge
- Deploy ocorre automaticamente após validação

Fluxo da pipeline:

```
Pull Request
↓
Jest
↓
Cypress
↓
SonarQube
↓
Merge
↓
Deploy
```

---

## Boas práticas

- Nomear arquivos corretamente
- Arquivos dentro das suas respectivas `(Pastas)`
- Evitar código duplicado
- Códigos comentados e claros
- Separar lógica de UI
- Validar dados no backend
- Usar try/catch

---

## Erros a evitar

- Acoplamento frontend/backend
- Não usar fallback
- Misturar responsabilidades
- Não usar mock

---

## Resultado

- Sistema organizado
- Código estruturado
- Equipe alinhada
- Projeto resiliente
- Fácil manutenção

### Essa arquitetura garante que:

- O sistema funcione mesmo com falhas
- O desenvolvimento seja paralelo (frontend/backend)
- O projeto seja escalável

---
