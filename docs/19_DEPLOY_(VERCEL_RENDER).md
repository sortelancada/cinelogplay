# Deploy + CI/CD

## Índice

- [Deploy + CI/CD](#deploy--cicd)
  - [Índice](#índice)
    - [Garantir:](#garantir)
  - [Pré-requisitos](#pré-requisitos)
  - [GitHub Actions (CI)](#github-actions-ci)
    - [Arquivo obrigatório:](#arquivo-obrigatório)
  - [Frontend — Vercel](#frontend--vercel)
    - [Passo a passo](#passo-a-passo)
    - [Configuração](#configuração)
      - [Build:](#build)
      - [Output:](#output)
    - [Variável de ambiente (`OBRIGATÓRIO`)](#variável-de-ambiente-obrigatório)
  - [Backend — Render](#backend--render)
    - [Passo a passo](#passo-a-passo-1)
    - [Configuração](#configuração-1)
      - [Build:](#build-1)
      - [Start:](#start)
    - [Porta dinâmica (OBRIGATÓRIO)](#porta-dinâmica-obrigatório)
    - [Endpoint mínimo obrigatório](#endpoint-mínimo-obrigatório)
  - [Integração Frontend ↔ Backend](#integração-frontend--backend)
    - [CRÍTICO](#crítico)
  - [Ordem correta de deploy](#ordem-correta-de-deploy)
    - [Passo a passo obrigatório (primeira configuração)](#passo-a-passo-obrigatório-primeira-configuração)
      - [Observação](#observação)
  - [Validação do Deploy](#validação-do-deploy)
    - [Testar:](#testar)
    - [Teste de robustez](#teste-de-robustez)
  - [Erros comuns](#erros-comuns)
  - [Resultado:](#resultado)

---

### Garantir:

- Deploy automático (CD)
- Testes automáticos (CI)
- Sistema online funcionando
- Integração correta entre frontend e backend

---

## Pré-requisitos

- Repositório no GitHub
- CI/CD configurado
- Projeto funcionando localmente
- Cypress rodando
- Backend com endpoints ativos

---

## GitHub Actions (CI)

### Arquivo obrigatório:

```id="ci-file"
.github/workflows/ci-cd.yml
```

---

## Frontend — Vercel

### Passo a passo

1. Acessar: [https://vercel.com](https://vercel.com)
2. Login com GitHub
3. Clicar em **New Project**
4. Selecionar o repositório

---

### Configuração

#### Build:

```bash id="build-frontend"
pnpm install && pnpm run build
```

#### Output:

```id="output-frontend"
dist
```

---

### Variável de ambiente (`OBRIGATÓRIO`)

```id="env-frontend"
VITE_API_URL=https://seu-backend.onrender.com
```

---

## Backend — Render

### Passo a passo

1. Acessar: [https://render.com](https://render.com)
2. Criar **New Web Service**
3. Conectar repositório

---

### Configuração

#### Build:

```bash id="build-backend"
pnpm install
```

#### Start:

```bash id="start-backend"
node backend/src/server.js
```

---

### Porta dinâmica (OBRIGATÓRIO)

```js id="port-backend"
const PORT = process.env.PORT || 3001;
app.listen(PORT);
```

---

### Endpoint mínimo obrigatório

```js id="endpoint-backend"
app.get("/api/filmes", (req, res) => {
  res.json([{ titulo: "Filme Teste" }]);
});
```

---

## Integração Frontend ↔ Backend

Frontend consome backend via:

```id="integration-env"
VITE_API_URL=https://seu-backend.onrender.com
```

---

### CRÍTICO

- Nunca deixar `VITE_API_URL` vazio em produção
- Nunca subir frontend antes do backend
- Sempre validar API antes do deploy

---

## Ordem correta de deploy

### Passo a passo obrigatório (primeira configuração)

1. Subir backend no Render
2. Testar endpoint:

https://seu-backend.onrender.com/api/filmes

3. Configurar `.env` no frontend
4. Subir frontend no Vercel

#### Observação

Após a configuração inicial e a integração das plataformas com o GitHub, os deploys passam a ocorrer automaticamente a cada push ou merge nas branches configuradas (`dev` e `main`), não sendo necessário realizar novos deploys manuais.

---

## Validação do Deploy

### Testar:

- Acessar frontend online
- Verificar se filmes carregam
- Validar integração com API
- Rodar Cypress local
- Verificar pipeline no GitHub

---

### Teste de robustez

1. Derrubar backend
2. Acessar frontend

Resultado esperado:

- Frontend continua funcionando (modo mock)
- Sistema não quebra

---

## Erros comuns

- Não usar GitHub Actions
- Não usar pnpm
- Deploy manual
- Backend não funcionando
- API não integrada
- Variável `.env` incorreta
- Não validar antes da entrega

---

## Resultado:

- CI rodando automaticamente
- Testes passando
- Deploy automático ativo
- Frontend online
- Backend online
- Integração funcionando
- Sistema resiliente (modo mock + fallback)

---
