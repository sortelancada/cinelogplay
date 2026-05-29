# Apresentação do Projeto — CinelogPlay

Este documento define o **roteiro oficial da apresentação**, garantindo que toda a equipe saiba:

- O que mostrar
- Em que ordem apresentar
- Como demonstrar funcionamento real
- Como reagir a perguntas e testes ao vivo

---

# Objetivo da Apresentação

Demonstrar que o projeto:

- Está **funcionando**
- Possui **qualidade técnica**
- Tem **testes automatizados**
- Possui **CI/CD ativo**
- Está **publicado (deploy real)**

---

# Checklist Obrigatório (ANTES da Apresentação)

Todos os itens abaixo devem estar validados:

- [ ] Repositório no GitHub acessível
- [ ] README completo e atualizado
- [ ] Projeto rodando localmente
- [ ] Cypress funcionando (`pnpm run test:ci`)
- [ ] Pipeline CI (GitHub Actions) funcionando
- [ ] Frontend online (Vercel)
- [ ] Backend online (Render)
- [ ] Endpoint `/api/filmes` respondendo
- [ ] Deploy automático ativo

Se qualquer item falhar → corrigir ANTES da apresentação

---

# Roteiro Oficial (PASSO A PASSO)

## 1. Introdução

Apresentar:

- Nome do projeto: **CinelogPlay**
- Objetivo:
  - Portal cultural de cinema
- Tecnologias principais:
  - Frontend
  - Backend
  - Testes
  - CI/CD

---

## 2. Demonstração do Frontend

Abrir:

- Vercel (link do projeto)

Mostrar:

- Home
- Navegação
- Listagem de filmes
- Layout responsivo

Explicar:

- Estrutura baseada em Bootstrap
- Organização por categorias

---

## 3. Demonstração do Backend

Abrir no navegador:

```

[https://seu-backend.onrender.com/api/filmes](https://seu-backend.onrender.com/api/filmes)

```

Mostrar:

- JSON retornado
- Estrutura dos dados

Explicar:

- API REST simples
- Endpoint funcional

---

## 4. Mostrar Repositório (GitHub)

Abrir:

- Página principal do repositório

Mostrar:

- Estrutura de pastas
- Pasta `/docs`
- Organização profissional

---

## 5. Demonstrar CI (GitHub Actions)

Ir em:

- Aba **Actions**

Mostrar:

- Pipeline rodando
- Execução automática

Explicar:

- A cada push:
  - Instala dependências
  - Sobe servidor
  - Executa Cypress

---

## 6. TESTE AO VIVO

### Alteração simples no código

Editar:

```html
<h1>CinelogPlay</h1>
```

Para:

```html
<h1>CinelogPlay 2026</h1>
```

---

### Commit em tempo real

```bash
git add .
git commit -m "teste: alteração ao vivo"
git push
```

---

## 7. Mostrar CI executando

Voltar ao GitHub:

- Pipeline rodando automaticamente

Explicar:

- Isso é **CI (Continuous Integration)**

---

## 8. Mostrar Deploy automático

Abrir:

- Vercel

Atualizar página:

- Alteração aplicada automaticamente

Explicar:

- Isso é **CD (Continuous Deployment)**

---

# Teste de Resiliência

Simular falha:

1. Derrubar backend (ou explicar simulação)
2. Acessar frontend

Resultado esperado:

- Sistema continua funcionando
- Dados mockados exibidos

Explicar:

- Uso de `cy.intercept()` no frontend
- Sistema não depende 100% da API

---

# Perguntas Técnicas (Caso ocorra)

Esteja preparado para responder:

- Como funciona o CI/CD?
- O que acontece se o teste falhar?
- Por que usar Cypress?
- Como o sistema lida com falhas?
- Como o deploy é feito?

---

# Erros Críticos (EVITAR)

- Não mostrar CI funcionando
- Fazer deploy manual
- Testes quebrados
- Backend offline
- Não fazer commit ao vivo
- Travar durante apresentação

---

## Divisão da Apresentação

| Etapa      | Responsável |
| ---------- | ----------- |
| Introdução | Lucas       |
| Frontend   | Lucas       |
| Backend    | Henrique    |
| CI/CD      | Henrique    |
| Testes     | Matheus     |
| Final      | Matheus     |

---

# Resultado

Ao final da apresentação deve ficar claro que:

- O sistema funciona
- Está testado
- Está automatizado
- Está publicado
- Segue boas práticas

---

# Status (Pré-apresentação)

| Área     | Status esperado |
| -------- | --------------- |
| Cypress  | ✅ 0%           |
| CI/CD    | ✅ 0%           |
| Deploy   | ✅ 0%           |
| Backend  | ✅ 0%           |
| Frontend | ✅ 0%           |

---

# Conclusão

A apresentação não é só mostrar código.

É provar que:

- O sistema é **confiável**
- O processo é **automatizado**
- Que todos trabalharam em **Equipe**

---
