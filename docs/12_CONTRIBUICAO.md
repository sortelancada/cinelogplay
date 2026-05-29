# Contribuição no Projeto — CinelogPlay

## Proposta

Este documento define todas as regras obrigatórias para contribuição no projeto CinelogPlay, garantindo:

- Padronização do código
- Organização do repositório
- Qualidade das entregas
- Colaboração eficiente entre os membros

---
## `Leia Primeiro os seguintes documentos (Obrigatório):`

1. **01_ESCOPO_DO_PROJETO.md** → Entender o projeto
2. **03_ARQUITETURA.md** → Entender estrutura
3. **11_RESPONSABILIDADES.md** → Saber sua função
4. **08_WORKFLOW.md** → Entender fluxo diário
5. **10_BRANCHING.md** → Estratégia de branches
6. **09_VERSIONAMENTO.md** → Padrão de commits
7. **14_DEFINITION_OF_DONE.md** → Critérios de conclusão

---

## Checklist de contribuição

### ANTES DE COMEÇAR:

- [ ] Sincronizar branch `dev` local com remoto
  ```bash
  git checkout dev
  git pull origin dev
  ```

- [ ] Ler `11_RESPONSABILIDADES.md` para saber sua função

- [ ] Criar branch `feature/*` a partir de `dev` atualizada
  ```bash
  git checkout -b feature/[area]-nome
  ```

### DURANTE O DESENVOLVIMENTO:

- [ ] Seguir arquitetura em `03_ARQUITETURA.md`

- [ ] Fazer commits pequenos e frequentes
  ```bash
  git commit -m "tipo: descrição clara"
  ```

- [ ] Testar localmente antes de push

- [ ] Não quebrar funcionalidades existentes

- [ ] Usar mock (frontend) ou fallback (backend)

- [ ] Sem `console.log`, `debugger` ou comentários desnecessários

### ANTES DE FAZER PUSH:

- [ ] Validar que código funciona localmente

- [ ] Verificar se há erros no console/terminal

- [ ] Garantir que segue padrão do projeto

- [ ] Se frontend: testar em 3 resoluções (mobile, tablet, desktop)

- [ ] Se backend: testar todos os endpoints

- [ ] Se testes: rodar `pnpm run test:ci` localmente

### AO ABRIR PULL REQUEST (PR):

- [ ] Base branch: **`dev`** (NÃO `main`)

- [ ] Compare branch: sua `feature/*`

- [ ] Descrição clara e objetiva com:
  - O que foi feito
  - Como testar
  - Checklist completado

- [ ] Comunicar no WhatsApp:
  ```
  @todos
  PR aberto: [link]
  Funcionalidade: [descrição]
  Aguardando revisão!
  ```

### DURANTE REVISÃO (Code Review):

- [ ] Responder comentários construtivos

- [ ] Fazer ajustes se solicitado (novo commit + push)

- [ ] Aguardar CI passar (GitHub Actions - testes)

- [ ] Aguardar aprovação de colega (1 mínimo)

### APÓS MERGE:

- [ ] Sincronizar ambiente local
  ```bash
  git checkout dev
  git pull origin dev
  git branch -d feature/seu-branch
  ```

- [ ] Deletar branch remota (GitHub oferece botão manual)

- [ ] Atualizar `21_CHANGELOG.md` se necessário

- [ ] Validar que funcionalidade está em `dev`

---

## Regra Geral

Nenhum código pode ir direto para a branch `main` ou `dev`.

Todo desenvolvimento deve seguir:

```

tarefa → branch → commit → pull request → revisão → merge

```

### Código:

- Funcionando sem erros
- Testado localmente
- Segue padrão do projeto (`13_UI_GUIDELINES.md` para frontend)
- Sem `console.log` ou `debugger`
- Sem comentários desnecessários
- Comentarios somente os padrões estabelecidos no código
- Responsivo (frontend) / Resiliente (backend)

### Commits:

- Pequenos e frequentes
- Mensagem clara: `tipo: descrição`
- Sem commits genéricos ("update", "fix", "ajustes")

### Pull Requests:

- Base: `dev` (obrigatório)
- Descrição clara e completa
- Um conceito por PR
- Comunicado no WhatsApp

### Fluxo:

- Branch criada de `dev` atualizada
- **NUNCA** fazer commit direto em `main` ou `dev`
- Sempre fazer PR (nenhuma exceção)
- Aguardar CI verde + 1 aprovação
- Deletar branch após merge

---

## PROIBIDO (Crítico)

-  Commit direto em `main` ( protegida)
-  Commit direto em `dev` (protegida)
-  PR sem descrição ou genérica
-  Código não testado localmente
-  Ignorar CI quebrado (testes falhando)
-  Fazer merge sem aprovação de colega
-  Deixar `console.log` no código
-  Ignorar padrões do projeto
-  Criar branch de `main` (sempre de `dev`)
-  Trabalhar muito tempo sem fazer push (risco de conflitos)

---


## Comunicação (Obrigatório)

### Ao Abrir PR:

```
@todos no (WhatsApp)
PR aberto: [copia o link do PR]
Funcionalidade: [descrição breve]
Aguardando revisão!
```

### Se Tiver Bloqueio:

```
Bloqueio encontrado: [descrição]
@membro pode ajudar?
```

### Se CI Falhar:

```
CI falhou no PR [link]
Verificando logs...
```

---

## Dúvidas?

  - Consulte ordem abaixo:

1. **01_ESCOPO_DO_PROJETO.md** → O que fazer
2. **03_ARQUITETURA.md** → Como estruturar
3. **11_RESPONSABILIDADES.md** → Quem faz o quê
4. **08_WORKFLOW.md** → Como trabalhar
5. **14_DEFINITION_OF_DONE.md** → Quando terminar
6. **Pergunte no WhatsApp** → Comunique dúvidas

---

## Fluxo Obrigatório

### 1. Atualizar base

```bash
git checkout main
git pull origin main
```

---

### 2. Criar branch

```bash
git checkout -b feature/nome-da-feature
```

---

### 3. Desenvolver a tarefa

- Implementar funcionalidade
- Garantir que não quebrou nada
- Seguir padrões do projeto

---

### 4. Commit

```bash
git add .
git commit -m "feat: descrição clara da alteração"
```

---

### 5. Enviar para o repositório

```bash
git push origin feature/nome-da-feature
```

---

### 6. Criar Pull Request (PR)

No GitHub:

- Base: `main`
- Comparar com: sua branch

---

### 7. Revisão obrigatória

- Outro membro deve revisar
- Validar:
  - Código
  - Funcionamento
  - Testes

---

### 8. Merge

Após aprovação:

- Merge na `main`
- Branch pode ser deletada

---

## Padrão de Commits

Usar padrão:

```
tipo: descrição
```

### Tipos permitidos:

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` melhoria interna
- `test:` testes
- `chore:` ajustes gerais

---

### Exemplos

```
feat: adicionar listagem de filmes
fix: corrigir erro na API de diretores
docs: atualizar README
```

---

## Regras de Código

- Código deve ser legível
- Evitar duplicação
- Seguir padrão do projeto
- Não subir código quebrado

---

## Testes Obrigatórios

Antes de abrir PR:

- Rodar Cypress localmente
- Garantir que testes passam

```bash
pnpm run cy:run
```

---

## Boas Práticas

- Fazer commits pequenos
- Nomear bem as branches
- Escrever mensagens claras
- Testar antes de subir

---

## O que NÃO fazer

- Commit direto na `main`
- Subir código quebrado
- Ignorar testes
- Fazer PR sem revisão
- Subir arquivos desnecessários

---

## Conflitos

Caso ocorra conflito:

```bash
git pull origin main
```

Resolver manualmente antes de continuar

---

## Responsabilidade

Cada membro é responsável por:

- Seu código
- Seus commits
- Seus testes
- Sua documentação

---

## Regra Final

Se não seguir este documento:

- O PR deve ser recusado

---

## Validação

Para considerar uma contribuição válida:

- Código funcionando
- Testes passando
- PR aprovado
- Padrões seguidos

---
