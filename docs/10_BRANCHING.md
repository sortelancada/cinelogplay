# Branching - CinelogPlay

## Índice

- [Branching - CinelogPlay](#branching---cinelogplay)
  - [Índice](#índice)
  - [Proposta](#proposta)
  - [Estrutura da branch](#estrutura-da-branch)
  - [Branch](#branch)
    - [`main` (PRODUÇÃO)](#main-produção)
    - [`dev` (HOMOLOGAÇÃO)](#dev-homologação)
    - [`feature/*` (DESENVOLVIMENTO)](#feature-desenvolvimento)
      - [Áreas válidas:](#áreas-válidas)
      - [Exemplos CORRETOS:](#exemplos-corretos)
      - [Exemplos ERRADOS:](#exemplos-errados)
  - [Branch hotfix](#branch-hotfix)
  - [Padrão de nomenclatura](#padrão-de-nomenclatura)
    - [Features:](#features)
  - [Hotfix](#hotfix)
    - [Regras:](#regras)
  - [Fluxo de uso da branch](#fluxo-de-uso-da-branch)
    - [Criação da branch:](#criação-da-branch)
    - [Atualizar branch com `dev`](#atualizar-branch-com-dev)
    - [Depois do merge em `dev`:](#depois-do-merge-em-dev)
  - [Operações úteis do git](#operações-úteis-do-git)
    - [Listar branches:](#listar-branches)
    - [Ver qual branch está atual:](#ver-qual-branch-está-atual)
    - [Deletar branch local:](#deletar-branch-local)
    - [Deletar branch remota:](#deletar-branch-remota)
    - [Visualizar histórico:](#visualizar-histórico)
  - [Regras obrigatórias](#regras-obrigatórias)
    - [SEMPRE:](#sempre)
    - [NUNCA:](#nunca)
  - [Boas práticas](#boas-práticas)
  - [Erros a evitar](#erros-a-evitar)
  - [Resultado](#resultado)
    - [Essa estratégia garante:](#essa-estratégia-garante)

---

## Proposta

Definir **como as branches devem ser utilizadas no projeto**, garantindo:

- Organização do código

- Histórico limpo
- Facilidade de manutenção
- Controle de versões eficiente
- Fluxo claro e compreensível

---

## Estrutura da branch

```branch
main (PRODUÇÃO)
│
└── (merge apenas de dev quando pronto)

dev (HOMOLOGAÇÃO)
│
├── feature/frontend-home
├── feature/frontend-diretores
├── feature/frontend-contato
├── feature/backend-api-filmes
├── feature/backend-api-diretores
├── feature/backend-api-contato
├── feature/backend-fallback-mock
├── feature/tests-cypress-home
├── feature/tests-cypress-navegacao
├── feature/tests-cypress-formulario
├── feature/devops-docker
└── feature/devops-ci-cd
```

---

## Branch

### `main` (PRODUÇÃO)

- **Status:** Estável, pronto para produção
- **Acesso:** Somente via PR de `dev` (protegida)
- **Protegida:** (veja `07_CONFIG_REPO_GITHUB.md`)
- **Deploy:** Automático via CD
- **Público:** Produção

**Características:**

- Código sempre funcional
- Versões ready-to-ship
- Nenhum push direto permitido
- Requer 1 aprovação + CI verde

### `dev` (HOMOLOGAÇÃO)

- **Status:** Integração contínua
- **Acesso:** Merge de `feature/*` via PR (protegida)
- **Protegida:** (veja `07_CONFIG_REPO_GITHUB.md`)
- **Deploy:** CI automático (testes)
- **Privado:** Teste e validação

**Características:**

- Integra todas as features
- Base para todas as `feature/*`
- Testada continuamente (CI)
- Sempre atualizada com últimas mudanças

### `feature/*` (DESENVOLVIMENTO)

- **Status:** Temporária
- **Base:** Criada a partir de `dev`
- **Proteção:** Nenhuma
- **Deploy:** Nenhum
- **Público:** Privado (desenvolvedor)

#### Áreas válidas:

- `frontend` → UI/interface (Lucas)
- `backend` → API/servidor (Henrique)
- `tests` → Testes E2E (Matheus/Winley)
- `devops` → CI/CD/infraestrutura (Henrique/Winley)
- `docs` → Documentação (Todos)

#### Exemplos CORRETOS:

```bash
feature/frontend-home
feature/frontend-navbar
feature/frontend-diretores
feature/frontend-contato
feature/frontend-responsividade

feature/backend-api-filmes
feature/backend-api-diretores
feature/backend-api-contato
feature/backend-fallback-mock
feature/backend-postgres-integration

feature/tests-cypress-home
feature/tests-cypress-navegacao
feature/tests-cypress-formulario
feature/tests-cypress-responsividade

feature/devops-docker-compose
feature/devops-github-actions
feature/devops-vercel-integration
feature/devops-render-integration

feature/docs-atualizacao-workflow
```

#### Exemplos ERRADOS:

```bash
 feature/home (sem área)
 Feature/Frontend (maiúscula)
 feature/frontend home (espaço)
 feature/minha-feature (muito genérica)
```

---

## Branch hotfix

Usadas para correções urgentes em produção:

```bash id="hotfix-branch"
git checkout -b hotfix/correcao-urgente
```

Após correção:

- Merge direto na `main`
- Deploy imediato

---

## Padrão de nomenclatura

### Features:

```id="naming-feature"
feature/[area]-nome-da-feature
```

---

## Hotfix

```bash
# 1. Criar hotfix a partir de main

git checkout main
git pull origin main
git checkout -b hotfix/erro-critico
```

```bash
# 2. Commitar

git commit -m "fix: corrigir erro crítico"
```

```bash
# 3. Push

git push origin hotfix/erro-critico
```

```bash
# 4. Abrir PR para main

# 5. Merge após aprovação
```

```bash
# 6. IMPORTANTE: Também fazer merge em dev

git checkout dev
git pull origin dev
git merge hotfix/erro-critico
git push origin dev
```

```bash
# 7. Deletar hotfix

git branch -d hotfix/erro-critico
git push origin --delete hotfix/erro-critico
```

---

### Regras:

- Usar letras minúsculas
- Usar hífen (`-`) ao invés de espaço
- Nome claro e objetivo
- Siga sempre os padrões

---

## Fluxo de uso da branch

#### Criação da branch:

```bash
# 1. Estar em dev atualizada
git checkout dev
git pull origin dev
```

```bash
# 2. Criar branch a partir de dev
git checkout -b feature/frontend-navbar
```

```bash
# 3. Desenvolver e fazer alterações
```

```bash
# 4. Commitar (commits pequenos e frequentes)
git commit -m "feat: implementar navbar com Bootstrap"
git commit -m "feat: adicionar links de navegação"
```

```bash
# 5. Push
git push origin feature/frontend-navbar
```

```bash
# 6. PR
Abrir PR no GitHub (base: dev)
```

---

### Atualizar branch com `dev`

Caso a branch `dev` receba novas alterações durante o desenvolvimento:

```bash
git checkout dev
git pull origin dev

git checkout feature/seu-branch

git merge dev
# Resolver conflitos se houver
```

---

### Depois do merge em `dev`:

```bash
git checkout dev
git pull origin dev
git branch -d feature/seu-branch
git push origin --delete feature/seu-branch
```

---

## Operações úteis do git

### Listar branches:

```bash
git branch -a
```

### Ver qual branch está atual:

```bash
git branch --show-current
```

### Deletar branch local:

```bash
git branch -d feature/seu-branch
```

### Deletar branch remota:

```bash
git push origin --delete feature/seu-branch
```

### Visualizar histórico:

```bash
git log --oneline
```

---

## Regras obrigatórias

### SEMPRE:

- Criar `feature/*` a partir de `dev` atualizada
- Usar nomenclatura padrão: `feature/[area]-[nome]`
- Manter branch atualizada com `dev`
- Abrir PR antes de merge
- Deletar branch após merge

### NUNCA:

- Trabalhar direto em `main` (protegida)
- Trabalhar direto em `dev` (protegida)
- Criar branch de `main` (sempre de `dev`)
- Ignorar conflitos
- Deixar branch desatualizada dias
- Fazer merge sem PR e aprovação

---

## Boas práticas

- Manter branches pequenas
- Atualizar frequentemente com `dev`
- Resolver conflitos localmente
- Nomear corretamente
- Deletar branch após merge
- Sincronizar ambiente local após merge

---

## Erros a evitar

- Branch gigante (50+ arquivos mudados)
- Não atualizar com `dev` durante desenvolvimento
- Nomear confuso ou sem padrão
- Ignorar conflitos
- Deixar PR aberto dias sem revisão
- Não deletar branch após merge
- Trabalhar direto em `main` ou `dev`

---

## Resultado

- Código organizado
- Desenvolvimento paralelo eficiente
- Histórico limpo
- Deploy seguro
- Equipe totalmente alinhada

### Essa estratégia garante:

- Controle total do código
- Segurança na `main`
- Desenvolvimento paralelo entre membros sem conflitos

---
