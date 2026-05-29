# Requisitos do Site — CinelogPlay

Este documento define **todos os requisitos obrigatórios do projeto**, garantindo clareza sobre o que deve ser desenvolvido, evitando dúvidas e desalinhamento entre os membros da equipe.

---

## Classificação dos Requisitos

- Requisitos Funcionais (RF) → O sistema deve FAZER
- Requisitos Não Funcionais (RNF) → Como o sistema deve FUNCIONAR

---

# Requisitos Funcionais (RF)

## RF01 — Exibição de Filmes

O sistema deve exibir uma lista de filmes contendo:

- Título
- Ano
- Gênero
- Imagem

---

## RF02 — Organização por Categorias

O sistema deve organizar filmes nas seguintes seções:

- Lançamentos
- Gêneros
- Clássicos
- Por ano

---

## RF03 — Página de Diretores

O sistema deve exibir diretores contendo:

- Nome
- Nacionalidade
- Principais obras
- Imagem (opcional — utilizada para exibição visual no frontend)

---

## RF04 — Formulário de Contato

O sistema deve permitir envio de mensagens contendo:

- Nome
- Email
- Mensagem

---

## RF05 — Integração com Backend

O frontend deve consumir dados via API quando disponível:

- `/api/filmes`
- `/api/diretores`
- `/api/contato`

Comportamento obrigatório:

- API disponível → consumir backend
- API indisponível → fallback automático para dados locais
- API não configurada ou variável de ambiente ausente → utilizar mock automaticamente


Todas as respostas devem seguir o padrão definido em RF11.

---

## RF06 — Fallback Frontend (Modo Offline)

O sistema deve funcionar sem backend:

- Utilizar dados locais (`/frontend/data/*.json`)
- Ativar automaticamente quando API não estiver disponível
- Nunca quebrar a interface do usuário
- O frontend nunca pode quebrar, independentemente da disponibilidade da API

---

## RF07 — Fallback Backend

O backend deve funcionar sem banco:

- Retornar dados mock (`/backend/mock/*.json`)
- Não interromper o funcionamento da API
- Garantir resposta no padrão definido
- A API nunca pode parar de responder

---

## RF08 — Responsividade

O sistema deve funcionar corretamente em:

- Desktop
- Tablet
- Mobile

---

## RF09 — Navegação

O sistema deve possuir:

- Navbar funcional
- Navegação entre páginas sem erro

---

## RF10 — Testes Automatizados

O sistema deve possuir testes E2E que validem:

- Carregamento de páginas
- Navegação via navbar
- Interações do usuário
- Formulário de contato
- Responsividade

Regras obrigatórias:

- Testes devem utilizar `cy.intercept()` para mockar requisições
- Testes não devem depender da API real

---

## RF11 — Padrão de Resposta da API

A API deve retornar respostas no seguinte formato:

Sucesso:

```
{
  "success": true,
  "data": [...]
}

Erro:

{
  "success": false,
  "error": "mensagem descritiva"
}
```

---

# Requisitos Não Funcionais (RNF)

## RNF01 — Desacoplamento

Frontend e backend devem funcionar de forma independente.

---

## RNF02 — Resiliência

O sistema não pode quebrar em caso de falhas:

- Backend indisponível
- Banco indisponível

---

## RNF03 — Performance

- Carregamento rápido das páginas
- Uso eficiente de recursos

---

## RNF04 — Padronização

Todos os membros devem seguir:

- Estrutura de pastas
- Documentação
- Workflow
- Versionamento

---

## RNF05 — Qualidade de Código

- Código organizado
- Sem duplicação desnecessária
- Legível e padronizado

---

## RNF06 — Versionamento

- Uso obrigatório de Git
- Branch `main` → produção
- Branch `dev` → integração
- Uso obrigatório de branches `feature/*`
- Proibido commit direto em `main` e `dev`
- Uso obrigatório de Pull Requests para `dev`
- Merge somente após aprovação
- Integração final para `main` apenas após validação completa do projeto

---

## RNF07 — CI/CD

- Testes automatizados obrigatórios
- CI deve rodar automaticamente em todos os Pull Requests para a branch `dev`
- Falha na pipeline deve bloquear o merge
- CD (deploy) só deve ocorrer após validação final do projeto
- Deploy NÃO deve ocorrer automaticamente em branches de desenvolvimento

---

## RNF08 — Segurança Básica

- Não expor dados sensíveis
- Uso de `.env` para variáveis

---

## RNF09 — Compatibilidade

Sistema deve funcionar em navegadores modernos:

- Chrome
- Edge
- Firefox

---

## RNF10 — Fluxo de Trabalho (Obrigatório)

O desenvolvimento deve seguir o fluxo:

1. Criar branch a partir da dev
2. Desenvolver funcionalidade
3. Abrir Pull Request para dev
4. CI executa automaticamente
5. Aguardar revisão
6. Realizar merge após aprovação

Regras:

- PR é obrigatório
- Não é permitido commit direto em dev ou main
- Todo PR deve ser revisado

---

# Requisitos Operacionais

## Requisitos de Testes

- Testes devem ser independentes da API real
- Uso obrigatório de `cy.intercept()` para mockar requisições
- Uso de fixtures para dados de teste
- Testes devem passar mesmo com backend desligado

---

## Requisitos de Deploy

- Backend deve ser publicado antes do frontend
- Frontend deve usar variável `.env`
- API deve estar validada antes do deploy

---

## Requisitos da Entrega

Deve conter:

- Frontend funcional
- Backend funcional
- Banco configurado
- Testes implementados
- CI/CD funcionando
- Deploy realizado
- Documentação completa

---

# Critérios

- Todas as funcionalidades devem funcionar
- Sistema não pode quebrar sem backend
- Sistema não pode quebrar sem banco
- Frontend deve funcionar com mock
- Backend deve funcionar com fallback
- Testes devem passar (mesmo sem backend)
- Deploy online funcional
- Documentação completa

---

# Validação para entrega

Antes da entrega, devemos validar:

1. Rodar frontend sem backend
2. Rodar backend sem banco
3. Executar testes com sucesso
4. Acessar sistema online

---

# Regra

#### `Se não estiver documentado aqui como requisito, não é obrigatório.`

#### `Se estiver aqui, é obrigatório cumprir.`

---
