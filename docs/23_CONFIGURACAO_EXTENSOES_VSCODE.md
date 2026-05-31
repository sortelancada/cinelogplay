# Configuração das Extensões VSCode

## LEIA COM ATENÇÃO

Este documento define a configuração padronizada das extensões do VS Code utilizadas no projeto CinelogPlay, garantindo que todos os desenvolvedores utilizem o mesmo ambiente e comportamento no editor.

---

# Índice

- [Configurações Obrigatórias](#configurações-obrigatórias)
- [Base e Qualidade do Código](#base-e-qualidade-do-código)
- [Backend / API](#backend--api)
- [Banco de Dados](#banco-de-dados)
- [Docker / Ambiente](#docker--ambiente)
- [Testes](#testes)
- [Git / DevOps](#git--devops)
- [Produtividade](#produtividade)
- [Documentação](#documentação)
- [Extensões Opcionais](#extensões-opcionais)
- [Configurações no VS Code](#17-configurações-no-vs-code-settingsjson)
- [Resultado](#resultado)

---

## Configurações Obrigatórias

### As seguintes ferramentas e recursos são obrigatórios para o funcionamento do ambiente do projeto

- ESLint + Prettier + EditorConfig → precisam de arquivos de configuração no repositório
- Thunder Client / REST Client → configurar collections para endpoints `/api/filmes`, `/api/diretores`, `/api/contato`
- PostgreSQL → configurar conexão local (host, user, senha do Docker)
- Docker → utilizar `docker-compose.yml`
- Cypress → integrado via `package.json` e scripts (`cy:open`, `cy:run`)
- GitHub Actions → já configurado via `.github/workflows/ci-cd.yml`

---

### Arquivos de Configuração na raiz do projeto

As seguintes extensões/ferramentas exigem arquivos físicos no repositório:

- ESLint → `.eslintrc.json`
- Prettier → `.prettierrc`
- EditorConfig → `.editorconfig`
- Docker (oficial) → `docker-compose.yml`
- Jest → `jest.config.js`
- Conventional Commits → `commitlint.config.js`
- markdownlint → `.markdownlint.json`

---

### Configurações via VS Code sem arquivos

As seguintes ferramentas são configuradas diretamente no editor:

- Thunder Client → Collections no VS Code
- PostgreSQL → conexão com container Docker

---

### Integrações já presentes no projeto

Não exigem configuração manual adicional, elas já estão integradas:

- Cypress → via `package.json` (`cy:open`, `cy:run`)
- GitHub Actions → `.github/workflows/ci-cd.yml`

---

# Base e Qualidade do Código

## 1. ESLint

**O que configurar**

- Criar arquivo `.eslintrc.json` na raiz do projeto.

**Instalação**

```bash
npm install --save-dev eslint eslint-plugin-cypress
```

**Passo a passo**

1. No VS Code, vá até a raiz do repositório.
2. Crie o arquivo `.eslintrc.json`.
3. Adicione:

```json
{
  "env": { "browser": true, "es2021": true, "node": true },
  "extends": ["eslint:recommended", "plugin:cypress/recommended", "prettier"],
  "parserOptions": { "ecmaVersion": 12 },
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "no-unused-vars": "warn"
  }
}
```

#### **Onde configurar** → raiz do repositório

#### **Objetivo** → garantir padrão de código JS/TS

---

## 2. Prettier

**O que configurar**

- Criar arquivo `.prettierrc` na raiz.

**Instalação**

```bash
npm install --save-dev prettier eslint-config-prettier
```

**Passo a passo**

1. Na raiz do repositório, crie `.prettierrc`.
2. Adicione:

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "printWidth": 80
}
```

**Integração com ESLint (OBRIGATÓRIA)**

- No `.eslintrc.json`, garantir que `"prettier"` esteja no final do array `"extends"`:

```json
"extends": [
  "eslint:recommended",
  "plugin:cypress/recommended",
  "prettier"
]
```

#### **Onde configurar** → raiz do repositório

#### **Objetivo** → manter formatação consistente

#### **Extra** → instalar `eslint-config-prettier` para evitar conflito com ESLint

---

## 3. EditorConfig

**O que configurar**

- Criar arquivo `.editorconfig` na raiz.

**Passo a passo**

1. Na raiz do repositório, crie `.editorconfig`.
2. Adicione:

```
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

#### **Onde configurar** → raiz do repositório

#### **Objetivo** → padronizar indentação e estilo entre os membros da equipe

---

# Backend / API

## 4. Thunder Client

**O que configurar**

- Criar **collections** com os endpoints do projeto.

**Passo a passo**

1. Abra o VS Code.
2. Vá em **Thunder Client → Collections → New Collection**.
3. Crie uma coleção chamada `CinelogPlay`.
4. Adicione requests:

- `GET http://localhost:3000/api/filmes`
- `GET http://localhost:3000/api/diretores`
- `POST http://localhost:3000/api/contato`

#### **Onde configurar** → dentro do VS Code (Thunder Client)

#### **Objetivo** → testar APIs sem Postman

---

# Banco de Dados

## 5. PostgreSQL

**O que configurar**

- Criar conexão com o container Docker.

**Passo a passo**

1. Abra o painel da extensão PostgreSQL no VS Code.
2. Clique em **Add Connection**.
3. Configure:

- Host: `localhost` (ou `postgres` se usar docker-compose)
- Porta: `5432`
- Usuário: `postgres`
- Senha: `postgres` (definida no docker-compose.yml)
- Database: `CinelogPlay`

#### **Onde configurar** → painel da extensão PostgreSQL

#### **Objetivo** → rodar queries direto no editor

---

# Docker / Ambiente

## 6. Docker

**O que configurar**

- Integrar com `docker-compose.yml` do projeto.

**Passo a passo**

1. Na raiz do repositório, crie `docker-compose.yml`.
2. Adicione:

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:16
    container_name: postgres-CinelogPlay
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: CinelogPlay
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

1. No VS Code, abra o painel da extensão Docker.
2. Conecte ao container `postgres-CinelogPlay`.

#### **Onde configurar** → raiz do repositório + painel Docker no VS Code

#### **Objetivo** → gerenciar containers direto no editor

---

# Testes

## 7. Jest

**O que configurar**

- Criar arquivo `jest.config.js` na raiz.

**Passo a passo**

1. Na raiz do repositório, crie `jest.config.js`.
2. Adicione:

```js
module.exports = {
  testEnvironment: "node",
  verbose: true,
  coverageDirectory: "coverage",
};
```

#### **Onde configurar** → raiz do repositório

#### **Objetivo** → rodar testes unitários no backend

---

# Git / DevOps

## 8. GitLens

**O que configurar**

- Não precisa de arquivos extras, mas pode ser ajustado nas **Configurações do VS Code**.
- Recomenda-se ativar:
  - Mostrar autor da linha (`Current Line Blame`).
  - Mostrar histórico de commits no painel lateral.

#### **Onde configurar** → `Configurações → Extensões → GitLens`

#### **Objetivo** → visualizar histórico avançado e autoria de código

---

## 9. Git Graph

**O que configurar**

- Não exige arquivos, apenas instalar.
- Recomenda-se configurar atalhos:
  - `Ctrl+Shift+Alt+G` para abrir o gráfico.

#### **Onde configurar** → `Configurações → Atalhos de Teclado`

#### **Objetivo** → visualizar branches e merges em gráfico

---

## 10. GitHub Pull Requests and Issues

**O que configurar**

- Precisa autenticar com GitHub.

**Passo a passo**

1. Instale a extensão.
2. Vá em **Accounts → Sign in with GitHub**.
3. Autorize o VS Code a acessar seu repositório.

#### **Onde configurar** → dentro do VS Code (barra lateral GitHub)

#### **Objetivo** → gerenciar PRs e issues sem sair do editor

---

## 11. GitHub Actions

**O que configurar**

- Precisa autenticar com GitHub (mesmo processo da extensão anterior).
- Recomenda-se configurar para monitorar o workflow `.github/workflows/ci-cd.yml`.

#### **Onde configurar** → painel GitHub Actions no VS Code

#### **Objetivo** → acompanhar pipelines CI/CD direto no editor

---

## 12. Conventional Commits

**O que configurar**

- Criar arquivo `commitlint.config.js` na raiz.

**Passo a passo**

1. Na raiz do repositório, crie `commitlint.config.js`.
2. Adicione:

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

#### **Onde configurar** → raiz do repositório

#### **Objetivo** → validar mensagens de commit no padrão (`feat:`, `fix:`, etc.)

---

## Produtividade

### 13. Import Cost

**O que configurar**

- Não precisa de arquivos, mas pode ser ajustado nas **Configurações do VS Code**.

- Recomenda-se ativar:
  - Mostrar tamanho das libs importadas no código.

#### **Onde configurar** → `Configurações → Extensões → Import Cost`

#### **Objetivo** → otimizar uso de dependências

---

## Documentação

### 14. markdownlint

**O que configurar**

- Criar arquivo `.markdownlint.json` na raiz.

**Passo a passo**

1. Na raiz do repositório, crie `.markdownlint.json`.
2. Adicione:

```json
{
  "default": true,
  "MD013": false,
  "MD033": false
}
```

#### **Onde configurar** → raiz do repositório

#### **Objetivo** → validar e padronizar Markdown sem regras muito rígidas

---

## Extensões Opcionais

### 15. SonarQube for IDE

**O que configurar**

- Precisa de servidor SonarQube configurado (não obrigatório para o projeto).

- Se usar:
  - Criar arquivo `sonar-project.properties` na raiz.

**Exemplo**

```
sonar.projectKey=CinelogPlay
sonar.projectName=CinelogPlay
sonar.sources=./frontend,./backend
```

#### **Onde configurar** → raiz do repositório

#### **Objetivo** → análise avançada de qualidade e segurança

---

## 16. Stylelint

**O que configurar**

- Criar arquivo `.stylelintrc.json` na raiz.

**Passo a passo**

1. Na raiz do repositório, crie `.stylelintrc.json`.
2. Adicione:

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "indentation": 2,
    "string-quotes": "double"
  }
}
```

#### **Onde configurar** → raiz do repositório

#### **Objetivo** → padronizar CSS (VAMOS USAR BOOTSTRAP ENTÃO NÃO PRECISA)

---

## 17. Configurações no VS Code (settings.json)

**Onde criar** → pasta `.vscode` na raiz do repositório.

**Arquivo** → `.vscode/settings.json`

**Conteúdo:**

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.eol": "\n",
  "files.insertFinalNewline": true
}
```

---

## Resultado

Depois de tudo configurado:

- **Prettier** → formata o código automaticamente
- **ESLint** → valida e corrige problemas
- **VS Code** → executa tudo no `save`

### Fluxo

1. Você salva o arquivo
2. VS Code roda:
   - `formatOnSave` → Prettier formata
   - `fixAll.eslint` → ESLint corrige

3. Código já sai padronizado e limpo

---
