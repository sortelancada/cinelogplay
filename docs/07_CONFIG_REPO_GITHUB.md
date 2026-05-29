# CinelogPlay — Guia de Configuração do Repositório

Este documento descreve **todas as configurações realizadas no repositório GitHub** do projeto CinelogPlay, com explicações detalhadas, decisões tomadas e orientações para manutenções futuras do Time.

---

# IMPORTANTE !!!

### `Este documento deverá sempre ser atualizado por toda a equipe durante o desenvolvimento conforme novas configurações forem adicionadas ao projeto.`

---

# PROPOSTA

Garantir que o projeto tenha:

- Controle de qualidade de código
- Fluxo de trabalho organizado em equipe
- Proteção contra erros críticos
- Base preparada para CI/CD

---

# ESTRUTURA DO REPOSITÓRIO

```
cinelogplay-web/
├── frontend/
├── backend/
├── cypress/
├── docs/
├── .github/
│   └── workflows/
│       └── ci-cd.yml (será criado em 18_CI_CD.md)
├── .gitignore
├── README.md
└── package.json (raiz)
```

---

# PRÉVIA

### Configuração

- Imagem `(Logo)` configurada no repositório
- Tamanho recomendado: **1280x640**

### ATENÇÃO !!!

- Evitar imagens maiores ou fora da proporção (podem ser cortadas)

---

# FEATURES DO REPOSITÓRIO

## Wiki

**Desativado**

### Motivo:

- O projeto já utiliza `/docs` com todas as documentações estruturadas
- Evita duplicação de conteúdo

---

## Issues

**Ativado**

### Uso:

- Controle de tarefas
- Registro de bugs
- Organização do projeto

---

## Projects

**Ativado**

### Uso:

- Gestão de tarefas da equipe

---

## Sponsors

**Desativado**

### Motivo:

- Não é um projeto open source com financiamento externo

---

## Discussions

**Desativado**

### Motivo:

- Não necessário para o escopo atual

---

# CONFIGURAÇÃO DE MERGE

**Ativado**

- Merge commit (mantém histórico completo)
- Squash merge (junta commits - padrão do projeto)

**Desativado**

- Rebase merge

---

## Decisão das configurações aplicadas

### Squash (principal)

- Mantém histórico limpo
- Junta múltiplos commits em um só

### Merge commit

- Mantém histórico completo

### Rebase

- Evitado por ser mais complexo e professor não explicou o cenário de uso

---

# PROTEÇÃO DE BRANCH

Configuração feita em:

```
Settings → Rules → Rulesets
```

---

### STATUS

Enforcement: **Active**

---

## BRANCHES PROTEGIDAS

### 1. Branch `main` (PRODUÇÃO)

**Target:** `main`

> **Regras obrigatórias:**

#### Restrict updates
- Impede push direto na branch main

#### Restrict deletions
- Impede deletar a branch

#### Block force pushes
- Impede uso de `git push --force`

#### Pull Request (OBRIGATÓRIO)
- Todo código deve passar por PR

**Required approvals:** `1`

**Motivo:**
- Garante revisão mínima
- Aprovação por qualquer membro da equipe
- Evita travar fluxo

#### Require conversation resolution
- Obriga resolver comentários antes do merge


#### Dismiss stale approvals

- Remove aprovação quando novos commits são adicionados


#### Require approval of most recent push

- Exige nova aprovação após alterações

---

### 2. Branch `dev` (HOMOLOGAÇÃO)

**Target:** `dev`

> **Regras obrigatórias:**

#### Restrict deletions
- Impede deletar a branch

#### Pull Request (OBRIGATÓRIO)
- Todo código deve passar por PR

**Required approvals:** `1`

**Motivo:**
- Garante qualidade antes de integração
- Evita merge de código quebrado
- Permite fluxo contínuo

#### Require conversation resolution
- Obriga resolver comentários antes do merge

**Diferença de `main`:**
- `dev` é menos restritiva (permite rebase e force push para correções)
- `main` é totalmente restritiva (apenas merges seguros)

#### Dismiss stale approvals

- Remove aprovação quando novos commits são adicionados


#### Require approval of most recent push

- Exige nova aprovação após alterações

---

# STATUS CHECKS (CI/CD)

### Require status checks to pass

### Estado atual:

- Configurado para `dev` e `main`

### Quando ativado:

- Cypress deve passar
- Testes backend devem passar

### Motivo:

- Garante que código quebrado não seja mergeado


### Quando CI estiver pronto:
Ativar `Require status checks to pass`:
- [ ] GitHub Actions CI deve passar
- [ ] Cypress deve ter sucesso

---

## Futuro

Após configurar CI:

- Adicionar checks (Cypress, backend tests e demais features)

---

## Require deployments to succeed

- Só permite merge se o deploy for bem-sucedido
- Backend precisa subir no Render
- Frontend precisa subir no Vercel

Usar quando:

- CI/CD completo já estiver funcionando

---

## Require code scanning results

- Analisa automaticamente vulnerabilidades no código

Detecta:

- Falhas de segurança
- Dependências vulneráveis

Usar quando:

- Projeto em produção
- API pública

Situação atual:

- Não utilizar agora, não é prioridade

---

## Require code quality results

- Exige validação de qualidade do código
- ESLint
- SonarCloud

Usar quando:

- Pipeline de qualidade estiver configurada

Situação atual:

- Não utilizar agora pois depende do CI configurado

---

## Automatically request Copilot review

- Solicita revisão automática com IA

Usar quando:

- Equipe utiliza GitHub Copilot

Situação atual:

- Desativado

---


# FLUXO DE TRABALHO EM EQUIPE

### Processo padrão:

1. Atualizar `dev`:
```bash
git checkout dev
git pull origin dev
```

2. Criar branch feature a partir de `dev`:
```bash
git checkout -b feature/<area>-nome-da-feature
```

3. Desenvolver

4. Commitar

5. Abrir Pull Request:
   - **Base:** `dev` (para homologação/testes)
   - **Explicar o que foi feito**

6. Comunicar no grupo (WhatsApp)

7. Aguardar:
   - CI passar em `dev`
   - 1 aprovação de qualquer membro

8. Merge na `dev`

9. Após validação completa de todas as features da etapa:
   - Criar PR de `dev` para `main`
   - Merge em `main` (entrega para produção)


---

## PROIBIDO

- Push direto na `main`
- Merge sem PR
- Forçar push

---

## BOAS PRÁTICAS

- Usar nomes claros de branch
- Commits descritivos
- Revisar código antes de aprovar
- Não ignorar falhas de CI

---

## PRÓXIMO PASSO

- Configurar GitHub Actions (CI/CD)
- Adicionar testes automatizados
- Integrar Cypress

---

# CONCLUSÃO

O repositório agora está:

Protegido contra erros
Organizado para trabalho em equipe
Preparado para CI/CD
Alinhado com boas práticas

---
