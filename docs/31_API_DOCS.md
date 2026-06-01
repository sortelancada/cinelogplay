# 📚 Documentação da API REST

**CinelogPlay Backend**

---

## Versão

- **1.0.0**
- **Status:** ✅ Production Ready
- **Base URL Produção:** https://api.cinelogplay.com
- **Base URL Desenvolvimento:** http://localhost:3001

---

## 1. Introdução

A API CinelogPlay fornece endpoints RESTful para gerenciar:

- 🎬 Filmes
- 🎥 Diretores
- 🎭 Atores
- ⭐ Avaliações
- ❤️ Favoritos
- 📧 Contatos
- 👤 Autenticação

### 1.1 Características

- ✅ Autenticação JWT
- ✅ Validação de entrada
- ✅ Tratamento de erros padronizado
- ✅ Upload de imagens
- ✅ CORS habilitado
- ✅ Rate limiting recomendado

---

## 2. Início Rápido

### 2.1 Registrar Usuário

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "senha": "senha123"
  }'
Resposta (201):

JSON
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
2.2 Fazer Login
bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123"
  }'
2.3 Usar Token em Requisições
bash
curl -X GET http://localhost:3001/api/filmes \
  -H "Authorization: Bearer seu_token_aqui"
3. Formatos e Padrões
3.1 Formato de Resposta Sucesso
JSON
{
  "success": true,
  "message": "Descrição da operação",
  "data": {},
  "timestamp": "2026-06-01T10:00:00.000Z"
}
3.2 Formato de Resposta Erro
JSON
{
  "success": false,
  "message": "Descrição do erro",
  "code": "CODIGO_ERRO",
  "errors": {},
  "timestamp": "2026-06-01T10:00:00.000Z"
}
3.3 Códigos HTTP
Código	Significado
200	OK - Sucesso
201	Created - Recurso criado
400	Bad Request - Dados inválidos
401	Unauthorized - Sem autenticação
404	Not Found - Recurso não existe
409	Conflict - Email já existe
500	Server Error - Erro do servidor
4. Autenticação
4.1 JWT Bearer Token
Todos os endpoints protegidos requerem:

Code
Authorization: Bearer <token>
4.2 Estrutura do Token
Code
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJpZCI6MjAsImVtYWlsIjoiZXhhbXBsZUB0ZXN0LmNvbSIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwMDAzNjAwfQ
.signature
Payload:

id: ID do usuário
email: Email do usuário
iat: Data de criação
exp: Data de expiração (1 hora)
5. Endpoints Públicos
5.1 Health Check
GET /
Verifica se a API está ativa.

Resposta:

JSON
{
  "success": true,
  "message": "CinelogPlay API — Servidor operacional",
  "version": "1.0.0",
  "timestamp": "2026-06-01T10:00:00.000Z"
}
5.2 Filmes
GET /api/filmes
Lista todos os filmes.

Query Parameters:

limite: Número máximo de resultados (padrão: 50)
pagina: Página (padrão: 1)
Resposta (200):

JSON
{
  "success": true,
  "message": "Filmes obtidos com sucesso",
  "data": [
    {
      "id": 1,
      "titulo": "Oppenheimer",
      "descricao_curta": "A história do criador da bomba atômica",
      "sinopse": "Oppenheimer segue J. Robert Oppenheimer...",
      "ano": 2023,
      "genero": "Drama/Thriller",
      "duracao": "180 min",
      "classificacao": "14",
      "imagem": "https://...",
      "trailer_youtube": "https://...",
      "diretor_id": 1,
      "atores": ["Cillian Murphy", "Robert Downey Jr."],
      "criado_em": "2026-05-31T19:42:27.576Z",
      "atualizado_em": "2026-05-31T19:42:27.576Z"
    }
  ],
  "timestamp": "2026-06-01T10:00:00.000Z"
}
GET /api/filmes/com-avaliacao
Lista filmes com suas avaliações médias.

Resposta (200):

JSON
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
GET /api/filmes/:id
Obtém detalhes de um filme específico com avaliação.

Parâmetro: id (number) - ID do filme

Resposta (200):

JSON
{
  "success": true,
  "message": "Filme obtido com sucesso",
  "data": {
    "id": 1,
    "titulo": "Oppenheimer",
    "avaliacao": {
      "media": "4.5",
      "total": "12"
    }
  }
}
Erro (404):

JSON
{
  "success": false,
  "message": "Filme não encontrado",
  "code": "NOT_FOUND"
}
GET /api/filmes/search/:termo
Pesquisa filmes por termo.

Parâmetro: termo (string) - Termo de busca

Exemplo:

bash
GET /api/filmes/search/oppenheimer
Resposta (200):

JSON
{
  "success": true,
  "message": "Pesquisa realizada com sucesso",
  "data": [
    {
      "id": 1,
      "titulo": "Oppenheimer"
    }
  ]
}
GET /api/filmes/genero/:genero
Lista filmes filtrados por gênero.

Parâmetro: genero (string) - Gênero do filme

Exemplo:

bash
GET /api/filmes/genero/Drama
Resposta (200):

JSON
{
  "success": true,
  "message": "Filmes obtidos por gênero com sucesso",
  "data": [...]
}
5.3 Diretores
GET /api/diretores
Lista todos os diretores.

Resposta (200):

JSON
{
  "success": true,
  "message": "Diretores obtidos com sucesso",
  "data": [
    {
      "id": 1,
      "nome": "Christopher Nolan",
      "nacionalidade": "Britânico-Americano",
      "data_nascimento": "1970-07-30T03:00:00.000Z",
      "biografia": "...",
      "principais_obras": "The Dark Knight Trilogy, Inception, Interstellar",
      "foto": "https://...",
      "ativo": true
    }
  ]
}
GET /api/diretores/:id
Obtém diretor com seus filmes.

Parâmetro: id (number) - ID do diretor

Resposta (200):

JSON
{
  "success": true,
  "message": "Diretor obtido com sucesso",
  "data": {
    "id": 1,
    "nome": "Christopher Nolan",
    "filmes": [
      { "id": 1, "titulo": "Oppenheimer" },
      { "id": 2, "titulo": "Inception" }
    ]
  }
}
5.4 Atores
GET /api/atores
Lista todos os atores.

Resposta (200):

JSON
{
  "success": true,
  "message": "Atores obtidos com sucesso",
  "data": []
}
GET /api/atores/:id
Obtém ator com seus filmes.

Parâmetro: id (number) - ID do ator

Resposta (200):

JSON
{
  "success": true,
  "message": "Ator obtido com sucesso",
  "data": {
    "id": 1,
    "nome": "Ator Teste",
    "filmes": []
  }
}
5.5 Contato
POST /api/contato
Envia mensagem de contato. Sem autenticação necessária.

Headers:

Code
Content-Type: application/json
Body:

JSON
{
  "nome": "João Silva",
  "email": "joao@test.com",
  "mensagem": "Mensagem aqui com mais de 10 caracteres"
}
Validações:

nome: 2-255 caracteres
email: Email válido
mensagem: 10-5000 caracteres
Resposta (200):

JSON
{
  "success": true,
  "message": "Mensagem enviada com sucesso",
  "data": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@test.com",
    "criado_em": "2026-06-01T12:59:11.158Z"
  }
}
Erro (400):

JSON
{
  "success": false,
  "message": "Validação falhou",
  "code": "VALIDATION_ERROR",
  "errors": {
    "email": "Email inválido",
    "mensagem": "Mensagem deve ter entre 10 e 5000 caracteres"
  }
}
6. Endpoints de Autenticação
6.1 Registrar
POST /api/auth/register
Cria novo usuário.

Body:

JSON
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
Validações:

nome: Obrigatório
email: Obrigatório, deve ser único
senha: Obrigatório, mínimo 6 caracteres
Resposta (201):

JSON
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
Erro (409):

JSON
{
  "success": false,
  "message": "Email já cadastrado",
  "code": "EMAIL_EXISTS"
}
6.2 Login
POST /api/auth/login
Autentica usuário existente.

Body:

JSON
{
  "email": "joao@example.com",
  "senha": "senha123"
}
Resposta (200):

JSON
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
Erro (401):

JSON
{
  "success": false,
  "message": "Credenciais inválidas",
  "code": "INVALID_CREDENTIALS"
}
7. Endpoints Protegidos
Todos os endpoints abaixo requerem autenticação JWT.

Header obrigatório:

Code
Authorization: Bearer seu_token_aqui
7.1 Filmes (Protegido)
POST /api/filmes
Cria novo filme. Requer autenticação.

Headers:

Code
Authorization: Bearer token
Content-Type: application/json
Body:

JSON
{
  "titulo": "Novo Filme",
  "diretor_id": 1,
  "ano_lancamento": 2024,
  "genero": "Drama",
  "sinopse": "Descrição do filme"
}
Validações:

titulo: Obrigatório
diretor_id: Obrigatório, numérico
genero: Obrigatório
ano_lancamento: Opcional
Resposta (201):

JSON
{
  "success": true,
  "message": "Filme criado com sucesso",
  "data": {
    "id": 20,
    "titulo": "Novo Filme",
    "diretor_id": 1
  }
}
Erro (401):

JSON
{
  "success": false,
  "message": "Token não fornecido",
  "code": "UNAUTHORIZED"
}
PUT /api/filmes/:id
Atualiza filme existente. Requer autenticação.

Parâmetro: id (number) - ID do filme

Headers:

Code
Authorization: Bearer token
Content-Type: application/json
Body:

JSON
{
  "titulo": "Título atualizado",
  "genero": "Suspense"
}
Resposta (200):

JSON
{
  "success": true,
  "message": "Filme atualizado com sucesso",
  "data": {
    "id": 1,
    "titulo": "Título atualizado"
  }
}
DELETE /api/filmes/:id
Deleta filme. Requer autenticação.

Parâmetro: id (number) - ID do filme

Headers:

Code
Authorization: Bearer token
Resposta (200):

JSON
{
  "success": true,
  "message": "Filme deletado com sucesso",
  "data": null
}
7.2 Diretores (Protegido)
POST /api/diretores
Cria novo diretor. Requer autenticação.

Body:

JSON
{
  "nome": "Novo Diretor",
  "nacionalidade": "Brasileiro"
}
Validações:

nome: 3-255 caracteres
Resposta (201):

JSON
{
  "success": true,
  "message": "Diretor criado com sucesso",
  "data": {
    "id": 31,
    "nome": "Novo Diretor",
    "nacionalidade": "Brasileiro"
  }
}
PUT /api/diretores/:id
Atualiza diretor. Requer autenticação.

Resposta (200):

JSON
{
  "success": true,
  "message": "Diretor atualizado com sucesso",
  "data": {}
}
DELETE /api/diretores/:id
Deleta diretor. Requer autenticação.

Resposta (200):

JSON
{
  "success": true,
  "message": "Diretor deletado com sucesso",
  "data": null
}
7.3 Atores (Protegido)
POST /api/atores
Cria novo ator. Requer autenticação.

Body:

JSON
{
  "nome": "Novo Ator"
}
Validações:

nome: Obrigatório
Resposta (201):

JSON
{
  "success": true,
  "message": "Ator criado com sucesso",
  "data": {
    "id": 1,
    "nome": "Novo Ator"
  }
}
PUT /api/atores/:id
Atualiza ator. Requer autenticação.

Resposta (200):

JSON
{
  "success": true,
  "message": "Ator atualizado com sucesso"
}
DELETE /api/atores/:id
Deleta ator. Requer autenticação.

Resposta (200):

JSON
{
  "success": true,
  "message": "Ator deletado com sucesso"
}
7.4 Upload
POST /api/upload
Upload de imagem. Requer autenticação.

Headers:

Code
Authorization: Bearer token
Content-Type: multipart/form-data
Form Data:

imagem (file): Arquivo de imagem
Tipos Aceitos:

PNG (.png)
JPEG (.jpg, .jpeg)
SVG (.svg)
WebP (.webp)
Tamanho Máximo: 5 MB

Resposta (201):

JSON
{
  "success": true,
  "message": "Upload realizado com sucesso",
  "url": "http://localhost:3001/uploads/1234567890-abc123xyz.jpg",
  "filename": "1234567890-abc123xyz.jpg"
}
Erro (400):

JSON
{
  "success": false,
  "message": "Formato invalido. Use: png, jpg, jpeg, svg ou webp."
}
8. Códigos de Erro
Código	Significado	HTTP
VALIDATION_ERROR	Dados inválidos	400
UNAUTHORIZED	Token inválido/faltando	401
NOT_FOUND	Recurso não existe	404
EMAIL_EXISTS	Email já cadastrado	409
INTERNAL_ERROR	Erro do servidor	500
INVALID_CREDENTIALS	Email/senha incorretos	401
9. Testes
9.1 Health Check
bash
pnpm run test:health
9.2 Validação de Sintaxe
bash
pnpm run validate
9.3 Teste Completo
bash
chmod +x test-api.sh
./test-api.sh
10. Exemplo Completo
Cliente em JavaScript
JavaScript
// Registrar
const registroResponse = await fetch(
  'http://localhost:3001/api/auth/register',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: 'João',
      email: 'joao@test.com',
      senha: 'senha123'
    })
  }
);

const { data } = await registroResponse.json();
const token = data.token;

// Criar filme
const filmeResponse = await fetch(
  'http://localhost:3001/api/filmes',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      titulo: 'Novo Filme',
      diretor_id: 1,
      genero: 'Drama',
      sinopse: 'Descrição'
    })
  }
);

const filme = await filmeResponse.json();
console.log('Filme criado:', filme.data);
11. Suporte
Encontrou um problema?

Email: support@cinelogplay.com
GitHub Issues: https://github.com/lucasitdias/cinelogplay/issues

Versão 1.0.0 — 01 de junho de 2026
```
