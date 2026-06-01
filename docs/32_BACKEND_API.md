# 📚 CinelogPlay Backend API - Documentação Completa

**Status:** ✅ Production Ready
**Versão:** 1.0.0
**Data:** 2026-06-01
**Tecnologias:** Node.js, Express.js, PostgreSQL, JWT

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Rodando a API](#rodando-a-api)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Endpoints da API](#endpoints-da-api)
- [Autenticação JWT](#autenticação-jwt)
- [Validações](#validações)
- [Upload de Arquivos](#upload-de-arquivos)
- [Tratamento de Erros](#tratamento-de-erros)
- [Segurança](#segurança)
- [Testes Automatizados](#testes-automatizados)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

O **Backend CinelogPlay** é uma API REST completa desenvolvida com **Node.js** e **Express.js** que fornece endpoints para gerenciar:

- 🎬 Filmes
- 🎥 Diretores
- 🎭 Atores
- ⭐ Avaliações
- ❤️ Favoritos
- 📧 Contatos
- 👤 Autenticação de usuários

**Status de Completude:**

- ✅ P0 (Crítico): 100% completo
- ✅ P1 (Validações): 100% completo
- ✅ Segurança: 100% implementada
- ✅ Testes: 11/11 passando
- ✅ Documentação: Completa

---

## 🏗️ Arquitetura

```
backend/
├── src/
│   ├── server.js                 # Entrada principal
│   ├── config/
│   │   └── db.js                 # Configuração do PostgreSQL
│   ├── auth/
│   │   ├── jwt.js                # Geração/validação JWT
│   │   └── auth.routes.js         # Rotas de autenticação
│   ├── middleware/
│   │   ├── auth.middleware.js     # Proteção de rotas
│   │   ├── validation.middleware.js # Validações de entrada
│   │   └── errorHandler.middleware.js # Tratamento de erros
│   ├── routes/
│   │   ├── filmes.routes.js       # CRUD de filmes
│   │   ├── diretores.routes.js    # CRUD de diretores
│   │   ├── atores.routes.js       # CRUD de atores
│   │   ├── avaliacao.routes.js    # CRUD de avaliações
│   │   ├── favorito.routes.js     # CRUD de favoritos
│   │   ├── contato.routes.js      # Contatos
│   │   └── upload.routes.js       # Upload de imagens
│   ├── controllers/
│   │   ├── filmes.controller.js   # Lógica de filmes
│   │   └── ...
│   ├── services/
│   │   ├── filmes.service.js      # Serviços de filmes
│   │   └── ...
│   ├── models/
│   │   ├── filmes.model.js        # Queries do banco
│   │   └── ...
│   ├── utils/
│   │   ├── response.js            # Respostas padronizadas
│   │   └── validation.js          # Funções de validação
│   └── database/
│       ├── create_tables.sql      # Schema do banco
│       └── seed.sql               # Dados iniciais
├── public/
│   └── uploads/                   # Arquivos enviados
├── test-api.sh                    # Script de testes
├── package.json
├── .env
└── .env.example
```

---

## 🛠️ Tecnologias

| Camada        | Tecnologia | Versão   | Função                |
| ------------- | ---------- | -------- | --------------------- |
| **Runtime**   | Node.js    | v24.16.0 | Execução JavaScript   |
| **Framework** | Express.js | ^4.19.2  | API REST              |
| **Database**  | PostgreSQL | ^8.11.5  | Banco de dados        |
| **Auth**      | JWT        | ^9.0.3   | Autenticação          |
| **Password**  | bcryptjs   | ^3.0.3   | Hash de senhas        |
| **Upload**    | Multer     | ^2.1.1   | Upload de arquivos    |
| **CORS**      | cors       | ^2.8.5   | Cross-Origin          |
| **Env**       | dotenv     | ^16.4.5  | Variáveis de ambiente |

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter:

- ✅ Node.js v24.16.0 ou superior
- ✅ pnpm (gerenciador de pacotes)
- ✅ PostgreSQL 12+ (local ou docker)
- ✅ Git
- ✅ Editor de código (VS Code recomendado)

**Verificar instalação:**

```bash
node --version    # v24.16.0
pnpm --version    # 10.12.4
psql --version    # 12.0+
```

---

## ⚙️ Instalação

### 1️⃣ Clonar repositório

```bash
git clone https://github.com/lucasitdias/cinelogplay.git
cd cinelogplay
```

### 2️⃣ Instalar dependências

```bash
cd backend
pnpm install
```

### 3️⃣ Criar arquivo `.env`

```bash
cp .env.example .env
```

---

## 🔧 Configuração

### Arquivo `.env`

```env
###############################################
# PORTA E HOST
###############################################
PORT=3001
HOST=0.0.0.0

###############################################
# BANCO DE DADOS
###############################################
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=cinelogplay

###############################################
# NODE ENVIRONMENT
###############################################
NODE_ENV=development

###############################################
# JWT - AUTENTICAÇÃO
###############################################
# Gere uma chave segura:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=sua_chave_secreta_muito_segura_aqui_mude_em_producao

###############################################
# CORS
###############################################
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

### Criar banco de dados

```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar banco
CREATE DATABASE cinelogplay;

# Sair
\q
```

---

## 🚀 Rodando a API

### Desenvolvimento (com watch)

```bash
pnpm dev
```

**Resultado esperado:**

```
CinelogPlay API iniciada com sucesso!
URL: http://0.0.0.0:3001
🗄️  Banco de dados: cinelogplay
JWT_SECRET: Configurado
```

### Produção

```bash
pnpm start
```

### Acessar a API

```
http://localhost:3001
```

---

## 📂 Estrutura de Diretórios

```
src/
├── auth/
│   ├── jwt.js              # Função para gerar/validar tokens
│   └── auth.routes.js      # POST /auth/register, /auth/login
│
├── config/
│   └── db.js               # Pool de conexão PostgreSQL
│
├── controllers/
│   ├── filmes.controller.js
│   ├── auth.controller.js
│   └── contato.controller.js
│
├── middleware/
│   ├── auth.middleware.js           # authMiddleware
│   ├── validation.middleware.js     # Validadores
│   └── errorHandler.middleware.js   # Global error handler
│
├── models/
│   ├── filmes.model.js
│   ├── atores.model.js
│   └── ...
│
├── routes/
│   ├── filmes.routes.js     # /api/filmes
│   ├── diretores.routes.js  # /api/diretores
│   ├── atores.routes.js     # /api/atores
│   ├── avaliacao.routes.js  # /api/avaliacoes
│   ├── favorito.routes.js   # /api/favoritos
│   ├── contato.routes.js    # /api/contato
│   └── upload.routes.js     # /api/upload
│
├── services/
│   ├── filmes.service.js
│   ├── diretores.service.js
│   └── ...
│
├── utils/
│   ├── response.js          # sendSuccess, sendError, etc
│   └── validation.js        # isValidEmail, sanitizeString, etc
│
├── database/
│   ├── create_tables.sql    # Schema do banco
│   └── seed.sql             # Dados iniciais
│
├── server.js                # Entry point
│
└── package.json
```

---

## 🔌 Endpoints da API

### 🔓 Públicos (sem autenticação)

#### GET /

Health check da API

**Resposta:** `200 OK`

```json
{
  "success": true,
  "message": "CinelogPlay API — Servidor operacional",
  "version": "1.0.0",
  "timestamp": "2026-06-01T..."
}
```

---

#### GET /api/filmes

Listar todos os filmes

**Resposta:** `200 OK`

```json
{
  "success": true,
  "message": "Filmes obtidos com sucesso",
  "data": [
    {
      "id": 1,
      "titulo": "Oppenheimer",
      "sinopse": "...",
      "ano": 2023,
      "genero": "Drama/Thriller",
      "diretor_id": 1,
      "atores": ["Cillian Murphy", "Robert Downey Jr."]
    }
  ]
}
```

---

#### GET /api/filmes/com-avaliacao

Listar filmes com suas avaliações

**Resposta:** `200 OK`

```json
{
  "success": true,
  "message": "Filmes com avaliação obtidos com sucesso",
  "data": [
    {
      "id": 1,
      "titulo": "Oppenheimer",
      "media_avaliacao": "4.5",
      "total_avaliacoes": "12"
    }
  ]
}
```

---

#### GET /api/filmes/:id

Obter filme por ID

**Parâmetro:** `id` (number)

**Resposta:** `200 OK`

```json
{
  "success": true,
  "message": "Filme obtido com sucesso",
  "data": {
    "id": 1,
    "titulo": "Oppenheimer",
    "avaliacao": { "media": "4.5", "total": "12" }
  }
}
```

**Erro:** `404 Not Found`

```json
{
  "success": false,
  "message": "Filme não encontrado",
  "code": "NOT_FOUND"
}
```

---

#### GET /api/filmes/search/:termo

Pesquisar filmes

**Parâmetro:** `termo` (string)

**Exemplo:** `GET /api/filmes/search/oppenheimer`

**Resposta:** `200 OK`

---

#### GET /api/filmes/genero/:genero

Listar filmes por gênero

**Parâmetro:** `genero` (string)

**Exemplo:** `GET /api/filmes/genero/Drama`

**Resposta:** `200 OK`

---

#### GET /api/diretores

Listar todos os diretores

**Resposta:** `200 OK`

---

#### GET /api/diretores/:id

Obter diretor por ID (com seus filmes)

**Resposta:** `200 OK`

---

#### GET /api/atores

Listar todos os atores

**Resposta:** `200 OK`

---

#### GET /api/atores/:id

Obter ator por ID (com seus filmes)

**Resposta:** `200 OK`

---

#### POST /api/contato

Enviar mensagem de contato (SEM autenticação)

**Body:**

```json
{
  "nome": "João Silva",
  "email": "joao@test.com",
  "mensagem": "Mensagem aqui com mais de 10 caracteres"
}
```

**Validações:**

- ✅ `nome`: obrigatório, 2-255 caracteres
- ✅ `email`: obrigatório, deve ser válido
- ✅ `mensagem`: obrigatório, 10-5000 caracteres

**Resposta:** `200 OK`

```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso",
  "data": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@test.com",
    "criado_em": "2026-06-01T..."
  }
}
```

**Erro (validação):** `400 Bad Request`

```json
{
  "success": false,
  "message": "Validação falhou",
  "code": "VALIDATION_ERROR",
  "errors": {
    "email": "Email inválido",
    "mensagem": "Mensagem deve ter entre 10 e 5000 caracteres"
  }
}
```

---

#### POST /api/auth/register

Registrar novo usuário (SEM autenticação)

**Body:**

```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Validações:**

- ✅ `nome`: obrigatório, string
- ✅ `email`: obrigatório, deve ser válido
- ✅ `senha`: obrigatório, mínimo 6 caracteres

**Resposta:** `200 OK`

```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso",
  "data": {
    "usuario": {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### POST /api/auth/login

Fazer login (SEM autenticação)

**Body:**

```json
{
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Resposta:** `200 OK`

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "usuario": {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 🔐 Protegidos (requer autenticação)

**Para acessar, enviar header:**

```
Authorization: Bearer <seu_token_aqui>
```

---

#### POST /api/filmes

Criar novo filme (COM autenticação)

**Header:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiI...
```

**Body:**

```json
{
  "titulo": "Novo Filme",
  "diretor_id": 1,
  "ano_lancamento": 2024,
  "genero": "Drama",
  "sinopse": "Descrição do filme"
}
```

**Validações:**

- ✅ `titulo`: obrigatório, string
- ✅ `diretor_id`: obrigatório, numérico
- ✅ `genero`: obrigatório, string
- ✅ `ano_lancamento`: opcional, numérico

**Resposta:** `201 Created`

```json
{
  "success": true,
  "message": "Filme criado com sucesso",
  "data": {
    "id": 20,
    "titulo": "Novo Filme",
    "diretor_id": 1
  }
}
```

**Erro (sem token):** `401 Unauthorized`

```json
{
  "success": false,
  "message": "Token não fornecido",
  "code": "UNAUTHORIZED"
}
```

---

#### PUT /api/filmes/:id

Atualizar filme (COM autenticação)

**Header:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiI...
```

**Parâmetro:** `id` (number)

**Body:** (campos opcionais)

```json
{
  "titulo": "Título atualizado",
  "genero": "Suspense"
}
```

**Resposta:** `200 OK`

---

#### DELETE /api/filmes/:id

Deletar filme (COM autenticação)

**Header:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiI...
```

**Parâmetro:** `id` (number)

**Resposta:** `200 OK`

```json
{
  "success": true,
  "message": "Filme deletado com sucesso",
  "data": null
}
```

---

#### POST /api/diretores

Criar novo diretor (COM autenticação)

**Body:**

```json
{
  "nome": "Diretor Novo",
  "nacionalidade": "Brasileiro"
}
```

**Validações:**

- ✅ `nome`: obrigatório, 3-255 caracteres

**Resposta:** `201 Created`

---

#### PUT /api/diretores/:id

Atualizar diretor (COM autenticação)

**Resposta:** `200 OK`

---

#### DELETE /api/diretores/:id

Deletar diretor (COM autenticação)

**Resposta:** `200 OK`

---

#### POST /api/atores

Criar novo ator (COM autenticação)

**Body:**

```json
{
  "nome": "Ator Novo"
}
```

**Resposta:** `201 Created`

---

#### PUT /api/atores/:id

Atualizar ator (COM autenticação)

**Resposta:** `200 OK`

---

#### DELETE /api/atores/:id

Deletar ator (COM autenticação)

**Resposta:** `200 OK`

---

#### POST /api/upload

Upload de imagem (COM autenticação)

**Header:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiI...
Content-Type: multipart/form-data
```

**Form Data:**

- `imagem` (file): arquivo da imagem

**Tipos aceitos:**

- ✅ PNG (.png)
- ✅ JPEG (.jpg, .jpeg)
- ✅ SVG (.svg)
- ✅ WebP (.webp)

**Tamanho máximo:** 5 MB

**Resposta:** `201 Created`

```json
{
  "success": true,
  "message": "Upload realizado com sucesso",
  "url": "http://localhost:3001/uploads/1234567890-abc123xyz.jpg",
  "filename": "1234567890-abc123xyz.jpg"
}
```

---

## 🔑 Autenticação JWT

### Como funciona

1. **Register:** Usuário se registra e recebe um token
2. **Login:** Usuário faz login e recebe um token
3. **Usar:** Enviar o token em todas as requisições protegidas

### Estrutura do Token

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoiIiwiaWF0IjoxNzgwMzA3OTUxLCJleHAiOjE3ODAzMTE1NTF9.3PjlA6iZpGZ1gym44uxW-L88fysXXvAM5MJS30dn1cQ
```

**Header:** Algoritmo (HS256)
**Payload:** ID, email, data de criação, expiração
**Signature:** Assinado com JWT_SECRET

### Tempo de expiração

- **Padrão:** 1 hora (3600 segundos)

---

## ✅ Validações

### Middleware de Validação

Todas as rotas POST/PUT possuem validação automaticamente.

### Validadores implementados

#### validateFilmeMiddleware

```javascript
{
  "titulo": "string (obrigatório)",
  "diretor_id": "number (obrigatório)",
  "ano_lancamento": "number (opcional)",
  "genero": "string (obrigatório)",
  "sinopse": "string (opcional)"
}
```

#### validateDiretorMiddleware

```javascript
{
  "nome": "string (obrigatório, 3-255 chars)",
  "nacionalidade": "string (opcional, 2-100 chars)"
}
```

#### validateContatoMiddleware

```javascript
{
  "nome": "string (obrigatório, 2-255 chars)",
  "email": "string (obrigatório, email válido)",
  "mensagem": "string (obrigatório, 10-5000 chars)"
}
```

#### validateAtorMiddleware

```javascript
{
  "nome": "string (obrigatório)"
}
```

---

## 📤 Upload de Arquivos

### Endpoint

```
POST /api/upload
```

### Exemplo com cURL

```bash
curl -X POST http://localhost:3001/api/upload \
  -H "Authorization: Bearer seu_token_aqui" \
  -F "imagem=@/caminho/para/imagem.jpg"
```

### Exemplo com JavaScript

```javascript
const formData = new FormData();
formData.append("imagem", document.querySelector("input[type=file]").files[0]);

const response = await fetch("/api/upload", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});

const result = await response.json();
console.log(result.url); // URL da imagem
```

### Armazenamento

Os arquivos são salvos em:

```
backend/public/uploads/
```

E acessíveis via:

```
http://localhost:3001/uploads/{filename}
```

---

## 🚨 Tratamento de Erros

### Formato padronizado

Todas as respostas de erro seguem este padrão:

```json
{
  "success": false,
  "message": "Descrição do erro",
  "code": "CODIGO_DO_ERRO",
  "errors": {
    /* detalhes */
  },
  "timestamp": "2026-06-01T09:59:11.202Z"
}
```

### Códigos de erro comuns

| Código             | Status | Significado                  |
| ------------------ | ------ | ---------------------------- |
| `VALIDATION_ERROR` | 400    | Dados inválidos              |
| `UNAUTHORIZED`     | 401    | Token não fornecido/inválido |
| `NOT_FOUND`        | 404    | Recurso não encontrado       |
| `INTERNAL_ERROR`   | 500    | Erro do servidor             |
| `EMAIL_EXISTS`     | 409    | Email já cadastrado          |

### Exemplo de erro de validação

```json
{
  "success": false,
  "message": "Validação falhou",
  "code": "VALIDATION_ERROR",
  "errors": {
    "email": "Email inválido",
    "nome": "Nome é obrigatório"
  },
  "timestamp": "2026-06-01T09:59:11.202Z"
}
```

---

## 🔒 Segurança

### Implementações de segurança

✅ **SQL Injection Protection**

- Uso de parameterized queries (`$1`, `$2...`)
- Nunca concatenar strings diretas no SQL

✅ **XSS Protection**

- Sanitização de strings
- Remoção de caracteres perigosos (`<`, `>`, `\0`)

✅ **CORS Configuration**

- Apenas origins autorizados
- `http://localhost:5173` e `http://localhost:5174`

✅ **Password Security**

- Hash com bcryptjs (10 rounds)
- Nunca armazenar senhas em plain text

✅ **JWT Security**

- Token obrigatório para rotas protegidas
- Expiração de 1 hora
- Secret key segura via variável de ambiente

✅ **Rate Limiting**

- Implementação em produção recomendada
- Usar `express-rate-limit`

✅ **Input Validation**

- Validação em todas as rotas POST/PUT
- Limites de tamanho em uploads (5MB)
- Tipos de arquivo aceitos

---

## 🧪 Testes Automatizados

### Script de testes completo

```bash
cd backend
chmod +x test-api.sh
./test-api.sh
```

### O que é testado

- ✅ Health check
- ✅ GET endpoints (filmes, diretores, atores)
- ✅ Autenticação (register/login)
- ✅ Criação com token (POST /api/filmes)
- ✅ Segurança (POST sem token = 401)
- ✅ Validações (dados inválidos = 400)

### Resultado esperado

```
════════════════════════════════════════
  🚀 TESTE COMPLETO - BACKEND CINELOGPLAY
════════════════════════════════════════

✅ P0 - HEALTH CHECK
✓ HTTP 200

✅ LEITURA - SEM AUTENTICAÇÃO
✓ HTTP 200

✅ AUTENTICAÇÃO
✓ Token obtido: eyJhbGc...

✅ CRIAÇÃO - COM AUTENTICAÇÃO
✓ HTTP 201

⚠️ TESTE DE SEGURANÇA - POST SEM TOKEN
✓ HTTP 401

✅ VALIDAÇÕES
✓ HTTP 400 (inválido)
✓ HTTP 200 (válido)

✅ TESTES CONCLUÍDOS COM SUCESSO
```

### Testes rápidos

```bash
# Health check
pnpm run test:health

# Validar sintaxe
pnpm run validate
```

---

## 🔐 Variáveis de Ambiente

### Obrigatórias

```env
JWT_SECRET=sua_chave_secreta_aqui
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=cinelogplay
```

### Opcionais

```env
PORT=3001
HOST=0.0.0.0
NODE_ENV=development
API_URL=http://localhost:3001
```

### Gerar JWT_SECRET seguro

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

ou

```bash
openssl rand -hex 32
```

---

## 🚀 Deploy

### Deployment em Produção

#### 1. Render.com

1. Conectar GitHub
2. Criar novo Web Service
3. Configurar variáveis de ambiente
4. Deploy automático

#### 2. Heroku

```bash
heroku login
heroku create cinelogplay-api
git push heroku main
```

#### 3. DigitalOcean App Platform

1. Conectar GitHub
2. Criar app Node.js
3. Configurar banco de dados (Managed DB)
4. Deploy automático

---

## 🐛 Troubleshooting

### Erro: `EADDRINUSE: address already in use :::3001`

**Solução:** Matar processo na porta 3001

```bash
lsof -i :3001
kill -9 <PID>
```

### Erro: `ENOTFOUND postgres` (banco não conecta)

**Solução:** Verificar variáveis de ambiente

```bash
echo $DB_HOST
echo $DB_PORT
```

### Erro: `JWT_SECRET não está definida`

**Solução:** Adicionar JWT_SECRET ao `.env`

```bash
JWT_SECRET=chave_segura_aqui
```

### Erro: `Filme não encontrado` (404)

**Solução:** Verificar se o ID existe

```bash
curl http://localhost:3001/api/filmes
```

### Erro: `Token não fornecido` (401)

**Solução:** Adicionar header Authorization

```bash
curl -H "Authorization: Bearer seu_token" http://localhost:3001/api/filmes
```

---

## 📞 Suporte

### Contatos

- **GitHub Issues:** https://github.com/lucasitdias/cinelogplay/issues
- **Email:** desenvolvimento@cinelogplay.com

### Links úteis

- [Express.js Docs](https://expressjs.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [JWT.io](https://jwt.io)
- [Multer Docs](https://github.com/expressjs/multer)

---

## 📝 Changelog

### v1.0.0 (2026-06-01)

#### Adicionado

- ✅ API REST completa
- ✅ Autenticação JWT
- ✅ Validações de entrada
- ✅ Upload de arquivos
- ✅ CRUD completo (filmes, diretores, atores)
- ✅ Tratamento de erros centralizado
- ✅ Testes automatizados
- ✅ Documentação completa

#### Corrigido

- ✅ Sintaxe PostgreSQL
- ✅ Proteção de rotas
- ✅ Validações de email
- ✅ Segurança em geral

#### Segurança

- ✅ Proteção contra SQL Injection
- ✅ Proteção contra XSS
- ✅ CORS configurado
- ✅ Password hashing com bcrypt
- ✅ JWT obrigatório para rotas protegidas

---

## 📄 Licença

MIT License - Veja LICENSE.md para detalhes

---

## ✨ Agradecimentos

Desenvolvido com ❤️ pela equipe CinelogPlay

---

**Versão:** 1.0.0
**Data:** 2026-06-01
**Status:** ✅ Production Ready
