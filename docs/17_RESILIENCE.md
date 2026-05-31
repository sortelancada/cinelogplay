# Resiliência do Sistema — CinelogPlay

## Porposta

Garantir que o sistema continue funcionando corretamente mesmo diante de falhas externas, principalmente:

- indisponibilidade do backend
- falha de conexão com banco de dados
- problemas de rede

O sistema **NUNCA deve quebrar** para o usuário.

---

## Conceito de Resiliência

Resiliência é a capacidade do sistema de:

- continuar operando mesmo com falhas
- degradar de forma controlada
- manter a experiência do usuário funcional

---

## Estratégia do Projeto

A resiliência do CinelogPlay é baseada em dois pilares:

### 1. Frontend desacoplado (Mock)

- Funciona sem backend
- Usa dados locais (`JSON`)
- Fallback automático

---

### 2. Backend com fallback

- Detecta falha no banco
- Retorna dados mock
- Mantém API funcional

---

## Resiliência no Frontend

### Estrutura obrigatória

```

/frontend/src/data/filmes.json
/frontend/src/data/diretores.json

```

---

### Variável de ambiente

```env
VITE_API_URL=https://seu-backend.onrender.com
```

---

### Regra de funcionamento

- Se API existir → usar backend
- Se API falhar → usar mock
- Se não houver API → usar mock automaticamente

---

### Implementação obrigatória

```js
const API_URL = import.meta.env.VITE_API_URL || "";
const USE_MOCK = !API_URL;

import filmes from "../data/filmes.json";

async function getFilmes() {
  if (USE_MOCK || !API_URL) {
    return filmes.data;
  }

  return fetch(`${API_URL}/api/filmes`)
    .then((res) => res.json())
    .then((json) => json.data);
}
```

---

### Resultado

- Frontend nunca quebra
- Sempre exibe dados
- Funciona offline

## Resiliência no Backend

Garantir que a API continue respondendo mesmo sem banco de dados.

---

### Implementação obrigatória

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

### Comportamento esperado

- Banco disponível → usar dados reais
- Banco indisponível → usar mock

---

### Exemplo de endpoint resiliente

```js
const mockFilmes = require("./mock/filmes.json");

app.get("/api/filmes", async (req, res) => {
  if (!dbConnected) {
    return res.json({
      success: true,
      data: mockFilmes,
    });
  }

  // consulta real no banco
});
```

---

### Estrutura obrigatória

```
/backend/src/mock/filmes.json
/backend/src/mock/diretores.json
```

---

### Implementação obrigatória

```js
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

### Comportamento esperado

- API funcionando → envia normalmente
- API falhando → salva no localStorage
- usuário não perde dados

---

## Resiliência nos Testes

Os testes **NUNCA devem depender do backend real**.

Sempre usar:

```js
cy.intercept(...)
```

---

### Exemplo

```js
cy.intercept("GET", "/api/filmes", {
  fixture: "filmes.json",
});
```

---

### Benefícios

- testes sempre passam
- independência do backend
- estabilidade no CI

---

## Teste de Robustez (OBRIGATÓRIO)

Antes da apresentação:

### Passos

1. Desligar backend
2. Rodar frontend
3. Rodar Cypress
4. Testar formulário

---

### Resultado

- Site funcionando
- Dados carregando (mock)
- Testes passando
- Formulário não quebrando

---

## Regras obrigatórias

- Frontend deve funcionar sem backend
- Backend deve funcionar sem banco
- Testes não podem depender de API real
- Sistema nunca deve quebrar

---

## Erros críticos (EVITAR)

- frontend travar sem API
- backend retornar erro ao perder banco
- testes chamarem API real
- ausência de mock

---

## Esperado

- sistema resiliente
- funcionamento offline
- experiência do usuário preservada
- estabilidade em apresentação e produção

---
