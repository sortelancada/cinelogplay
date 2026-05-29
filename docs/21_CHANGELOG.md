# Histórico de Alterações

## Proposta

Registrar de forma clara e organizada **todas as mudanças relevantes do projeto**, garantindo:

- Rastreabilidade
- Controle de evolução
- Transparência
- Organização de versões

Este documento é **obrigatório** e deve ser atualizado continuamente por todos da equipe.

---

## Padrão utilizado

### Seguimos o padrão inspirado no **Keep a Changelog** + versionamento semântico.

### O que isso significa?

- Cada versão do sistema é registrada com um número no formato:

```
MAJOR.MINOR.PATCH
```

#### E cada mudança é categorizada para facilitar o entendimento:

- **Added** → novas funcionalidades
- **Changed** → alterações em funcionalidades existentes
- **Fixed** → correções de bugs

### Idéia:

- Manter um histórico claro e organizado
- Facilitar o entendimento das evoluções do projeto
- Permitir que qualquer membro da equipe saiba rapidamente o que mudou

### Resumo

- **SemVer** define _como versionar_
- **Keep a Changelog** define _como documentar as mudanças_

---

## Formato das versões

```
MAJOR.MINOR.PATCH
```

### Definições:

- **MAJOR** → mudanças grandes / quebra de compatibilidade
- **MINOR** → novas funcionalidades
- **PATCH** → correções e ajustes

---

## Tipos de mudanças

Cada versão deve conter:

- **Added** → novas funcionalidades
- **Changed** → alterações em funcionalidades existentes
- **Fixed** → correções de bugs
- **Removed** → remoções
- **Security** → ajustes de segurança (se houver)

---

## Estrutura obrigatória

Cada versão deve seguir este padrão:

```md
## [versão] - data

### Added

- ...

### Changed

- ...

### Fixed

- ...
```

---

## Versões do Projeto

### [1.0.0] - (Data de entrega final)

### Added

- Sistema completo CinelogPlay
- Frontend com páginas:
  - Home
  - Diretores
  - Contato

- Backend com API REST
- Integração com banco de dados
- Testes E2E com Cypress
- CI/CD com GitHub Actions
- Deploy automático (Vercel + Render)

### Changed

- Ajustes finais de layout e integração

### Fixed

- Correções gerais antes da entrega

---

## [0.9.0] - (Pré-entrega)

### Added

- Integração frontend ↔ backend
- Testes automatizados completos

### Changed

- Ajustes na API
- Melhorias na responsividade

### Fixed

- Correções de bugs críticos

---

## [0.8.0]

### Added

- Implementação do backend (Node + Express)
- Endpoints principais:
  - /api/filmes
  - /api/diretores
  - /api/contato

---

## [0.7.0]

### Added

- Implementação do frontend
- Estrutura de páginas

---

## [0.6.0]

### Added

- Configuração do Cypress
- Testes iniciais E2E

---

## [0.5.0]

### Added

- Configuração do CI/CD (GitHub Actions)

---

## [0.4.0]

### Added

- Configuração do ambiente backend
- Estrutura do projeto

---

## [0.3.0]

### Added

- Configuração do frontend (HTML, CSS, JS)

---

## [0.2.0]

### Added

- Definição da arquitetura do sistema
- Definição do escopo

---

## [0.1.0]

### Added

- Inicialização do projeto
- Criação do repositório

---

## Como atualizar o CHANGELOG

Sempre que houver mudança:

1. Identificar o tipo:
   - feature → Added
   - ajuste → Changed
   - bug → Fixed

2. Atualizar a versão

3. Adicionar data

4. Registrar mudança de forma clara

---

## Exemplo de atualização

```md
## [0.9.1] - 2026-04-21

### Fixed

- Correção no carregamento de filmes
```

---

## Regras obrigatórias

- NÃO deixar versões sem descrição
- NÃO pular versões
- NÃO usar descrições vagas
- Sempre atualizar após mudanças relevantes

---

## Integração com o projeto

Este documento está ligado a:

- VERSIONAMENTO.md
- WORKFLOW.md
- CI_CD.md

---

## Resultado

- Histórico claro do projeto
- Controle de evolução
- Facilidade de auditoria
- Organização profissional

---
