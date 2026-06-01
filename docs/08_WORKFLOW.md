# Workflow de Desenvolvimento - CinelogPlay

## Índice

- [Workflow de Desenvolvimento - CinelogPlay](#workflow-de-desenvolvimento---cinelogplay)
  - [Índice](#índice)
  - [Proposta](#proposta)
  - [Visão Geral](#visão-geral)
  - [Fluxo de Trabalho (Passo a Passo)](#fluxo-de-trabalho-passo-a-passo)
    - [Criação de Tarefas](#criação-de-tarefas)
  - [Criação de Branch](#criação-de-branch)
  - [Desenvolvimento](#desenvolvimento)
  - [Commits](#commits)
    - [Padrão de commits (OBRIGATÓRIO SEGUIR)](#padrão-de-commits-obrigatório-seguir)
  - [Pull Request (PR)](#pull-request-pr)
  - [Code Review](#code-review)
  - [Merge](#merge)
  - [Atualização da Base](#atualização-da-base)
  - [Regras obrigatórias (CRITICO)](#regras-obrigatórias-critico)
  - [Boas práticas](#boas-práticas)
  - [Erros a evitar (`Com dúvida?` Pergunte a um membro da equipe)](#erros-a-evitar-com-dúvida-pergunte-a-um-membro-da-equipe)
  - [Fluxo resumido](#fluxo-resumido)
  - [Resultado](#resultado)

---

## Proposta

Definir **como a equipe deve trabalhar no dia a dia**, garantindo:

- Organização
- Padronização
- Qualidade do código
- Evitar conflitos e retrabalho

---

## Visão Geral

Todo desenvolvimento deve seguir este fluxo:

```id="workflow-flow"
Tarefa → Branch → Código → Commit → PR → Review → Merge
```

---

## Fluxo de Trabalho (Passo a Passo)

### Criação de Tarefas

Antes de começar qualquer coisa:

- Definir o que será feito
- Ter clareza do objetivo
- Saber qual parte do sistema será afetada

---

## Criação de Branch

Sempre criar uma branch nova a partir da `dev`:

```bash id="create-branch"
git checkout dev
git pull origin dev
git checkout -b feature/[area]-nome-da-feature
```

---

## Desenvolvimento

Durante o desenvolvimento:

- Seguir arquitetura definida
- Usar mock se necessário
- Não quebrar funcionalidades existentes

---

## Commits

Realizar commits pequenos e organizados, exemplo:

```bash id="commit-example"
git add .
git commit -m "feat: adiciona listagem de filmes"
git commit -m "fix: corrige validação do formulário"
git commit -m "test: adiciona testes Cypress da navbar"
git commit -m "docs: atualiza ambiente Linux"
```

---

### Padrão de commits (OBRIGATÓRIO SEGUIR)

- `feat:` nova funcionalidade
- `fix:` correção de erro
- `refactor:` melhoria
- `test:` testes
- `docs:` documentação

---

## Pull Request (PR)

Após finalizar:

```bash id="push-branch"
git push origin feature/nome-da-feature
```

Criar PR no GitHub:

- Base: `dev`
- Explicar o que foi feito
- Descrever mudanças

---

## Code Review

Antes do merge:

- Outro membro deve revisar
- Validar funcionamento
- Verificar padrões
- O Pull Request deve receber pelo menos 1 aprovação
- Comentários pendentes devem ser resolvidos antes do merge
- Caso novos commits sejam enviados, a revisão poderá ser solicitada novamente

---

## Merge

Após aprovação:

- Realizar merge na `dev` (via Pull Request)
- Garantir que CI passou
- A `main` recebe apenas merges de `dev` quando pronto para produção

---

## Atualização da Base

Após merge:

```bash id="update-main"
git checkout dev
git pull origin dev
```

---

## Regras obrigatórias (CRITICO)

- Nunca commitar direto na `main`
- Nunca pular PR
- Nunca subir código quebrado
- Nunca ignorar CI
- Seguir padrões definidos

---

- Sempre usar branch
- Sempre abrir PR
- Sempre passar pelo CI
- Sempre seguir arquitetura

---

## Boas práticas

- Commits pequenos
- Nome claro de branch
- Código limpo
- Testar antes de subir

---

## Erros a evitar (`Com dúvida?` Pergunte a um membro da equipe)

- Trabalhar direto na main
- Commits gigantes
- Não atualizar base
- Ignorar conflitos
- Não testar código

---

## Fluxo resumido

```id="workflow-summary"
1. Atualizar ambiente
2. Criar branch feature/*
3. Desenvolver
4. Commitar
5. Push
6. PR
7. Comunicar no grupo
8. Revisão
10. Merge
11. Atualizar ambiente
```

---

## Resultado

- Código organizado
- Histórico limpo
- Equipe alinhada
- Sem retrabalho
- Deploy seguro

---
