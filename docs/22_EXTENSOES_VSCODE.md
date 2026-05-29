# Extensões Vscode

## Índice

- [Base / Qualidade de Código](#base--qualidade-de-código)
- [Frontend (HTML + CSS + JS + Bootstrap)](#frontend-html--css--js--bootstrap)
- [Backend / API](#backend--api)
- [Docker / Ambiente](#docker--ambiente)
- [Testes](#testes)
- [Git / DevOps](#git--devops)
- [Produtividade](#produtividade)
- [Documentação](#documentação)
- [Utilitários](#utilitários)
- [Extensões Opcionais](#extensões-opcionais)
- [Banco de Dados](#banco-de-dados)

---

## Base / Qualidade de Código

### 1. ESLint

**O que faz no VSCode**  
Analisa código JavaScript/TypeScript e aponta problemas.

**Pra que serve**  
Padronizar e manter qualidade do código.

**Impacto no ambiente de programação**  
Muito alto, garante consistência.

**Peso / Performance**  
Leve.

**Configuração**  
Criar arquivo .eslintrc na raiz do projeto.

---

### 2. Prettier - Code formatter
**O que faz no VSCode**  
Formata código automaticamente.

**Pra que serve**  
Evitar estilos diferentes entre devs.

**Impacto no ambiente de programação**  
Muito alto, melhora legibilidade.

**Peso / Performance**  
Leve.

**Configuração**  
Integrar com ESLint para não gerar conflito.

---

### 3. EditorConfig
**O que faz no VSCode**  
Padroniza formatação entre desenvolvedores.

**Pra que serve**  
Consistência de indentação e estilo.

**Impacto no ambiente de programação**  
Muito positivo.

**Peso / Performance**  
Leve.

**Configuração**  
Criar arquivo .editorconfig na raiz.

---

### 4. DotENV
**O que faz no VSCode**  
Suporte a arquivos .env.

**Pra que serve**  
Melhor leitura e organização de variáveis de ambiente.

**Impacto no ambiente de programação**  
Facilita configuração.

**Peso / Performance**  
Leve.

**Configuração**  
Nenhuma extra, apenas instalar.

---

### 5. Error Lens
**O que faz no VSCode**  
Mostra erros inline no editor.

**Pra que serve**  
Debug rápido e direto.

**Impacto no ambiente de programação**  
Alta produtividade.

**Peso / Performance**  
Leve.

---

## Frontend (HTML + CSS + JS + Bootstrap)

### 6. CSS Peek
**O que faz no VSCode**  
Navega entre HTML/JSX e CSS.

**Pra que serve**  
Agilidade no desenvolvimento frontend.

**Impacto no ambiente de programação**  
Alta produtividade.

**Peso / Performance**  
Leve.

---

### 7. Color Highlight
**O que faz no VSCode**  
Mostra cores diretamente no código CSS.

**Pra que serve**  
Facilitar visualização de estilos.

**Impacto no ambiente de programação**  
Melhora clareza visual.

**Peso / Performance**  
Leve.

---

### 8. Live Server
**O que faz no VSCode**  
Cria servidor local para testes rápidos.

**Pra que serve**  
Testar HTML/CSS sem precisar buildar.

**Impacto no ambiente de programação**  
Útil em protótipos.

**Peso / Performance**  
Leve.

---

## Backend / API

### 9. Thunder Client
**O que faz no VSCode**  
Cliente REST para testar APIs.

**Pra que serve**  
Testar endpoints /api/filmes, /api/diretores, /api/contato.

**Impacto no ambiente de programação**  
Muito útil para backend.

**Peso / Performance**  
Leve.

**Configuração**  
Criar collections com os endpoints do projeto.

---

### 10. REST Client
**O que faz no VSCode**  
Permite testar APIs direto em arquivos .http.

**Pra que serve**  
Alternativa leve ao Thunder Client.

**Impacto no ambiente de programação**  
Facilita testes rápidos.

**Peso / Performance**  
Leve.

---

## Docker / Ambiente

### 11. Docker (oficial)
**O que faz no VSCode**  
Gerencia containers Docker.

**Pra que serve**  
Facilitar controle de containers do projeto.

**Impacto no ambiente de programação**  
Muito alto se usar Docker.

**Peso / Performance**  
Médio.

**Configuração**  
Integrar com docker-compose.yml do projeto.

---

## Testes

### 12. Cypress Helper
**O que faz no VSCode**  
Fornece snippets e suporte para Cypress.

**Pra que serve**  
Facilitar escrita de testes E2E.

**Impacto no ambiente de programação**  
Alta produtividade em QA.

**Peso / Performance**  
Leve.

---

### 13. Cypress Snippets
**O que faz no VSCode**  
Snippets prontos para comandos Cypress.

**Pra que serve**  
Agilizar criação de testes automatizados.

**Impacto no ambiente de programação**  
Muito útil para QA.

**Peso / Performance**  
Leve.

---

### 14. Jest
**O que faz no VSCode**  
Integra testes unitários com Jest.

**Pra que serve**  
Rodar testes de backend e unitários.

**Impacto no ambiente de programação**  
Muito positivo.

**Peso / Performance**  
Médio.

---

## Git / DevOps

### 15. GitLens
**O que faz no VSCode**  
Amplia recursos do Git (histórico avançado).

**Pra que serve**  
Entender quem fez cada alteração.

**Impacto no ambiente de programação**  
Muito alto.

**Peso / Performance**  
Médio.

---

### 16. Git Graph
**O que faz no VSCode**  
Visualiza histórico e branches em gráfico.

**Pra que serve**  
Facilitar controle de versões.

**Impacto no ambiente de programação**  
Muito útil.

**Peso / Performance**  
Leve.

---

### 17. GitHub Pull Requests and Issues
**O que faz no VSCode**  
Gerencia PRs e issues direto no editor.

**Pra que serve**  
Colaboração e revisão de código.

**Impacto no ambiente de programação**  
Alta integração com GitHub.

**Peso / Performance**  
Leve.

---

### 18. GitHub Actions
**O que faz no VSCode**  
Gerencia workflows CI/CD.

**Pra que serve**  
Acompanhar pipelines direto no VSCode.

**Impacto no ambiente de programação**  
Muito útil para DevOps.

**Peso / Performance**  
Leve.

---

### 19. Conventional Commits
**O que faz no VSCode**  
Padroniza mensagens de commit.

**Pra que serve**  
Manter histórico limpo e organizado.

**Impacto no ambiente de programação**  
Melhora fluxo da equipe.

**Peso / Performance**  
Leve.

---

## Produtividade

### 20. Path Intellisense
**O que faz no VSCode**  
Autocomplete de caminhos de arquivos.

**Pra que serve**  
Evitar erros em imports.

**Impacto no ambiente de programação**  
Muito útil.

**Peso / Performance**  
Leve.

---

### 21. npm Intellisense
**O que faz no VSCode**  
Autocomplete para pacotes npm/pnpm.

**Pra que serve**  
Evitar erros em imports de libs.

**Impacto no ambiente de programação**  
Alta produtividade.

**Peso / Performance**  
Leve.

---

### 22. Import Cost
**O que faz no VSCode**  
Mostra tamanho das libs importadas.

**Pra que serve**  
Otimizar uso de dependências.

**Impacto no ambiente de programação**  
Muito útil.

**Peso / Performance**  
Leve.

---

### 23. TODO Highlight
**O que faz no VSCode**  
Destaca comentários TODO.

**Pra que serve**  
Organizar tarefas dentro do código.

**Impacto no ambiente de programação**  
Melhora organização.

**Peso / Performance**  
Leve.

---

### 24. Better Comments
**O que faz no VSCode**  
Coloriza comentários para organização.

**Pra que serve**  
Facilitar leitura e entendimento.

**Impacto no ambiente de programação**  
Muito útil.

**Peso / Performance**  
Leve.

---

## Documentação

### 25. Markdown All in One
**O que faz no VSCode**  
Pacote completo para Markdown (atalhos, preview).

**Pra que serve**  
Facilitar criação e edição de documentação.

**Impacto no ambiente de programação**  
Alta produtividade em docs.

**Peso / Performance**  
Leve.

---

### 26. markdownlint
**O que faz no VSCode**  
Valida e padroniza Markdown.

**Pra que serve**  
Garantir qualidade da documentação.

**Impacto no ambiente de programação**  
Muito útil.

**Peso / Performance**  
Leve.

---

### 27. Auto-Open Markdown Preview
**O que faz no VSCode**  
Abre preview automático de arquivos Markdown.

**Pra que serve**  
Agilizar leitura de documentação.

**Impacto no ambiente de programação**  
Nenhum técnico.

**Peso / Performance**  
Leve.

---

## Utilitários

### 28. Image Preview
**O que faz no VSCode**  
Mostra preview de imagens.

**Pra que serve**  
Facilidade visual.

**Impacto no ambiente de programação**  
Nenhum técnico.

**Peso / Performance**  
Leve.

---

### 29. SVG Preview
**O que faz no VSCode**  
Preview de arquivos SVG.

**Pra que serve**  
Visualização rápida.

**Impacto no ambiente de programação**  
Nenhum técnico.

**Peso / Performance**  
Leve.

---

## Extensões Opcionais

### 30. Portuguese Language Pack
**O que faz no VSCode**  
Traduz interface para PT-BR.

**Pra que serve**  
Facilitar uso para quem prefere português.

**Impacto no ambiente de programação**  
Nenhum técnico.

**Peso / Performance**  
Leve.

---

### 31. Bookmarks
**O que faz no VSCode**  
Permite marcar linhas e navegar entre elas.

**Pra que serve**  
Produtividade pessoal.

**Impacto no ambiente de programação**  
Nenhum técnico.

**Peso / Performance**  
Leve.

---

### 32. Material Icon Theme / Omni Theme
**O que faz no VSCode**  
Adiciona ícones e temas visuais.

**Pra que serve**  
Customização estética.

**Impacto no ambiente de programação**  
Nenhum técnico.

**Peso / Performance**  
Leve.

---

### 33. Mintlify Doc Writer
**O que faz no VSCode**  
Gera documentação com IA.

**Pra que serve**  
Acelerar criação de docs.

**Impacto no ambiente de programação**  
Produtividade opcional.

**Peso / Performance**  
Leve a médio.

---

### 34. Rainbow CSV
**O que faz no VSCode**  
Coloriza arquivos CSV.

**Pra que serve**  
Melhor leitura de dados.

**Impacto no ambiente de programação**  
Nenhum técnico.

**Peso / Performance**  
Leve.

---

### 35. Random Everything
**O que faz no VSCode**  
Gera dados aleatórios.

**Pra que serve**  
Testes e mock.

**Impacto no ambiente de programação**  
Auxiliar.

**Peso / Performance**  
Leve.

---

### 36. SonarQube for IDE
**O que faz no VSCode**  
Analisa qualidade de código.

**Pra que serve**  
Detectar problemas e vulnerabilidades.

**Impacto no ambiente de programação**  
Muito alto (se configurado).

**Peso / Performance**  
Médio.

---

## Banco de Dados

### 37. PostgreSQL
**O que faz no VSCode**  
Gerencia queries no banco PostgreSQL.

**Pra que serve**  
Executar consultas e validar dados.

**Impacto no ambiente de programação**  
Centraliza acesso ao banco.

**Peso / Performance**  
Médio.

**Configuração**  
Conectar ao container Docker com host, user e senha definidos.

---

### 38. Stylelint
**O que faz no VSCode**  
Lint para CSS.

**Pra que serve**  
Padronizar estilos.

**Impacto no ambiente de programação**  
Alto, mas opcional (já usamos Bootstrap).

**Peso / Performance**  
Leve.

---
