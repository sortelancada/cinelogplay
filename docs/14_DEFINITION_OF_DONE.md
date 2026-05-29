# Definition of Done (DoD) — CinelogPlay

## Proposta

Definir **quando uma tarefa está REALMENTE pronta**, evitando:

- Entregas incompletas
- Código não testado
- Funcionalidades quebradas
- Retrabalho desnecessário

---

## Conceito

Uma tarefa **NÃO está pronta** quando:

- apenas “funciona na máquina do desenvolvedor”
- não foi testada
- não foi validada
- não foi revisada

Uma tarefa só está pronta quando atende **TODOS os critérios definidos neste documento**.

---

## Regra Principal

> Se qualquer item deste documento não for atendido, a tarefa NÃO pode ser considerada concluída.

---

## Checklist de Conclusão

### Funcionalidade Implementada

- [ ] Feature está completa conforme `01_ESCOPO_DO_PROJETO.md`
- [ ] Sem erros no console (browser/terminal)
- [ ] Sem warnings desnecessários
- [ ] Código limpo (sem `console.log`, `debugger`)
- [ ] Funcionalidade testada localmente
- [ ] Comportamento esperado validado

---

### Segue Padrão do Projeto

- [ ] Estrutura de pastas respeitada (`03_ARQUITETURA.md`)
- [ ] Nomenclatura padrão de arquivos
- [ ] Estilo de código consistente
- [ ] Mock implementado (se frontend - `01_ESCOPO_DO_PROJETO.md`)
- [ ] Fallback implementado (se backend - `17_RESILIENCE.md`)
- [ ] Segue `13_UI_GUIDELINES.md` (se frontend)

---

### Integração Funcional

- [ ] Frontend consome API corretamente (se aplicável)
- [ ] Backend retorna formato correto (conforme `02_REQUISITOS.md`)
- [ ] Não quebra funcionalidades existentes
- [ ] Integração frontend ↔ backend validada localmente

---

### Resiliência Garantida

- [ ] Funciona com API/banco ativo
- [ ] Funciona sem API (frontend mock conforme `01_ESCOPO_DO_PROJETO.md`)
- [ ] Funciona sem banco (backend fallback conforme `17_RESILIENCE.md`)
- [ ] Mensagens de erro claras e úteis

---

### Testes Locais (Manual)

- [ ] Testado manualmente em múltiplos navegadores
- [ ] Testado em responsividade:
  - [ ] Mobile (375x667)
  - [ ] Tablet (768x1024)
  - [ ] Desktop (1920x1080)
- [ ] Fluxo completo validado
- [ ] Casos de erro testados
- [ ] Modo offline testado (sem conexão)

---

### Testes Automatizados (Cypress)

- [ ] Testes criados para a funcionalidade (se aplicável)
- [ ] Uso de `cy.intercept()` (SEM API real - conforme `16_CYPRESS_E2E.md`)
- [ ] Fixtures criadas e corretas (`cypress/fixtures/`)
- [ ] Testes passando 100% localmente
- [ ] Cobertura de cenários principais (happy path + edge cases)

---

### Testes no CI (GitHub Actions)

- [ ] Cypress rodando no GitHub Actions 
- [ ] Nenhum teste falhando (0 falhas)
- [ ] Pipeline CI verde (all checks passed)
- [ ] Build sem erros (conforme `18_CI_CD.md`)

---

### Sem Dependência Local

- [ ] Não depende de configuração específica de máquina
- [ ] Não usa caminhos hardcoded
- [ ] Não usa portas fixas (hardcoded)
- [ ] Funciona em outro ambiente/máquina
- [ ] Variáveis de ambiente configuradas (`.env.example`)

---

### Versionamento Correto

-  [ ] Branch criada a partir de `dev` atualizada (conforme `10_BRANCHING.md`)
-  [ ] Commits claros e descritivos (conforme `09_VERSIONAMENTO.md`)
-  [ ] Padrão de commit seguido: `tipo: descrição` (feat, fix, test, docs, etc)
-  [ ] Histórico organizado (sem squashing acidental)
-  [ ] Sem commits genéricos ("update", "fix", "ajustes")

---

### Pull Request Obrigatório

- [ ] PR criado para `dev` (NÃO para `main` - conforme `08_WORKFLOW.md`)
- [ ] Base branch: `dev`
- [ ] Compare branch: sua `feature/*`
- [ ] Descrição clara e objetiva:
  - O que foi feito
  - Como testar
  - Checklist completado
  - Referência a issue (se houver)
- [ ] Comunicado no WhatsApp (obrigatório - conforme `08_WORKFLOW.md`)

---

### Revisão de Código

- [ ] PR revisado por pelo menos 1 membro (não é você)
- [ ] Todos os comentários respondidos
- [ ] Problemas apontados foram corrigidos
- [ ] Conversa resolvida (sem comentários abertos)
- [ ] Aprovação recebida (1 mínimo conforme `11_RESPONSABILIDADES.md`)

---

### Integração em `dev`

- [ ] Merge realizado em `dev` (após CI verde + aprovação)
- [ ] Branch deletada (local: `git branch -d` e remota: GitHub)
- [ ] Ambiente sincronizado:
  ```bash
  git checkout dev
  git pull origin dev
  ```

---

### Validação em Homologação (`dev`)

- [ ] Funcionalidade testada em `dev`
- [ ] Integrada corretamente com outras features
- [ ] Sem conflitos com alterações paralelas
- [ ] Validação manual em `dev` realizada
- [ ] Modo offline funcionando (se aplicável)

---

### Documentação Atualizada

- [ ] `README.md` atualizado (se necessário)
- [ ] Novos endpoints documentados (se backend - conforme `02_REQUISITOS.md`)
- [ ] `21_CHANGELOG.md` atualizado com mudança
- [ ] Comentários no código (se complexo ou crítico)
- [ ] Nenhum documento contradiz `01_ESCOPO_DO_PROJETO.md`

---

## Fluxo Correto de Conclusão

```
1. Desenvolver funcionalidade
   ↓
2. Testar localmente (manual + automatizado)
   ↓
3. Criar testes Cypress (conforme 16_CYPRESS_E2E.md)
   ↓
4. Validar fallback/mock/resiliência
   ↓
5. Commit com mensagem clara (conforme 09_VERSIONAMENTO.md)
   ↓
6. Push para GitHub
   ↓
7. Abrir PR para dev (base: dev, conforme 08_WORKFLOW.md)
   ↓
8. Comunicar no WhatsApp (obrigatório)
   ↓
9. Aguardar revisão de colega
   ↓
10. Corrigir se necessário (novo commit + push)
   ↓
11. Receber aprovação (1 mínimo)
   ↓
12. Aguardar CI passar (conforme 18_CI_CD.md)
   ↓
13. Merge em dev
   ↓
14. Excluir branch (local e remota)
   ↓
15. Sincronizar dev local
   ↓
16. Validar em dev
   ↓
17. Atualizar documentação
   ↓
18. PRONTO PARA PRÓXIMA FEATURE
```

---

## Erros Críticos (INVALIDAM ENTREGA)

Estes erros **impedem conclusão**:

-  "Funciona só na minha máquina" (sem teste em outro ambiente)
-  Não criou testes Cypress (si aplicável)
-  Ignorou CI quebrado (testes falhando)
-  Fez merge sem revisão de colega
-  Não validou deploy/modo offline
-  Código com `console.log` / `debugger` / comentários de debug
-  Sem fallback/resiliência (se backend)
-  Quebrou outra funcionalidade (teste manual insuficiente)
-  Não comunicou bloqueio no WhatsApp
-  Documentação desatualizada ou contraditória

---

## Checklist por Tipo de Feature

### Se Frontend (Lucas):

- [ ] Responsivo em 3 resoluções (conforme `13_UI_GUIDELINES.md`)
- [ ] Sem erros visuais
- [ ] Navegação funciona
- [ ] Mock data funcionando (conforme `01_ESCOPO_DO_PROJETO.md`)
- [ ] Fallback automático sem backend
- [ ] Testes Cypress criados

### Se Backend (Henrique):

- [ ] Endpoint funcionando (conforme `02_REQUISITOS.md`)
- [ ] Padrão de resposta correto (success/error)
- [ ] Validação de entrada implementada
- [ ] Error handling completo
- [ ] Mock data para fallback (conforme `17_RESILIENCE.md`)
- [ ] CORS configurado (se necessário)

### Se Testes (Matheus/Winley):

- [ ] Testes Cypress criados (conforme `16_CYPRESS_E2E.md`)
- [ ] Usando `cy.intercept()` com fixtures
- [ ] SEM dependência de API real
- [ ] Testes 100% passando
- [ ] Cobertura de casos principais

### Se DevOps (Henrique/Winley):

- [ ] CI/CD configurado (conforme `18_CI_CD.md`)
- [ ] GitHub Actions rodando
- [ ] Testes automáticos executando
- [ ] Deploy funcionando

---

## Resultado

Quando todos os critérios são atendidos:

-  Entregas completas e funcionais
-  Sistema estável em homologação (`dev`)
-  Código padronizado e consistente
-  Menos retrabalho
-  Qualidade garantida
-  Confiança na entrega final

---

## Documentos Relacionados

- **08_WORKFLOW.md** → Como trabalhar
- **09_VERSIONAMENTO.md** → Padrão de commits
- **10_BRANCHING.md** → Estratégia de branches
- **11_RESPONSABILIDADES.md** → Quem faz o quê
- **16_CYPRESS_E2E.md** → Testes E2E
- **18_CI_CD.md** → Configuração CI/CD

---
