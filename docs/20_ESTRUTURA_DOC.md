# CinelogPlay

## Estrutura de Documentação com Explicações de Cada Arquivo

## **ATENÇÃO EQUIPE** !!!

> ### Sempre que qualquer documento da pasta `/docs` for **alterado ou criado**, é obrigatório atualizar este índice e manter a documentação sincronizada.
>
> ### `Nenhum membro deve trabalhar com informações desatualizadas.`

```bash
CinelogPlay/
│
├── README.md   ✅ 90%
│   # Documento principal do projeto
│   # Visão geral completa (o professor vai olhar primeiro)
│   # Resume: objetivo, tecnologias, como rodar, equipe e CI/CD e tudo contemplado abaixo
│
├── /docs
│   │
│   ├── 01_ESCOPO_DO_PROJETO.md ✅ 100%
│   │   # Define o QUE o projeto é
│   │   # Contém toda a ideia, funcionalidades e estrutura do sistema
│   │   # Base principal para todos os outros documentos
│   │
│   ├── 02_REQUISITOS.md   ✅ 100%
│   │   # Define O QUE é obrigatório no projeto
│   │   # Lista regras e funcionalidades que DEVEM existir
│   │   # Evita dúvidas do tipo isso precisava fazer?
│   │
│   ├── 03_ARQUITETURA.md  ✅ 0%
│   │   # Explica COMO o sistema foi estruturado
│   │   # Organização do frontend, backend e banco
│   │   # Mostra como as partes se conectam
│   │
│   ├── 04_TECNOLOGIAS_DO_PROJETO.md  ✅ 100%
│   │   # Define QUAIS tecnologias serão usadas
│   │   # Versões, ferramentas, frameworks e arquitetura técnica
│   │
│   ├── 05_AMBIENTE_WINDOWS.md ✅ 100%
│   │   # Passo a passo para configurar ambiente no Windows
│   │   # Evita problemas de incompatibilidade entre membros
│   │
│   ├── 06_AMBIENTE_LINUX.md ✅ 100%
│   │   # Passo a passo para configurar ambiente no Linux
│   │   # Garante que todos tenham o mesmo ambiente (padronização)
│   │
│   ├── 07_CONFIG_REPO_GITHUB.md   ✅ 0%
│   │   # Configuração do repositório no GitHub
│   │   # Proteções de branch, regras de PR e padrões do projeto
│   │
│   ├── 08_WORKFLOW.md  ✅ 0%
│   │   # Define COMO a equipe trabalha no dia a dia
│   │   # Passo a passo: tarefa → branch → commit → PR → merge
│   │   # Evita bagunça no desenvolvimento
│   │
│   ├── 09_VERSIONAMENTO.md    ✅ 0%
│   │   # Define COMO o Git deve ser usado corretamente
│   │   # Frequência de commits, organização e responsabilidades
│   │
│   ├── 10_BRANCHING.md   ✅ 0%
│   │   # Define COMO usar as branches do Git
│   │   # Explica: main, develop, feature, hotfix
│   │   # Garante organização no versionamento
│   │
│   ├── 11_RESPONSABILIDADES.md   ✅ 0%
│   │   # Define quem faz o quê dentro do projeto
│   │   # Distribui tarefas entre os membros
│   │   # Evita sobrecarga e falta de participação
│   │
│   ├── 12_CONTRIBUICAO.md    ✅ 100%
│   │   # Define REGRAS para contribuir no projeto
│   │   # Padrão de commit, uso de PR, revisão de código
│   │   # Garante qualidade e padronização
│   │
│   ├── 13_UI_GUIDELINES.md   ✅ 0%
│   │   # Define padrão visual do sistema
│   │   # Cores, layout, componentes e uso do Bootstrap
│   │   # Evita inconsistência entre telas
│   │
│   ├── 14_DEFINITION_OF_DONE.md   ✅ 0%
│   │   # Define quando uma tarefa está realmente pronta
│   │   # Evita entregas incompletas
│   │   # Padroniza qualidade final
│   │
│   ├── 15_TEST_PLAN.md   ✅ 0%
│   │   # Define O QUE será testado no sistema
│   │   # Lista cenários, passos e resultados esperados
│   │   # Base para validar se o sistema funciona
│   │
│   ├── 16_CYPRESS_E2E.md ✅ 70%
│   │   # Explica COMO rodar e estruturar testes com Cypress
│   │   # Inclui mock, intercept e testes independentes do backend
│   │
│   ├── 17_RESILIENCE.md   ✅ 0%
│   │   # Define COMO o sistema continua funcionando mesmo com falhas
│   │   # Mock no frontend + fallback no backend
│   │   # Garante que o site nunca quebra
│   │
│   ├── 18_CI_CD.md  ✅ 60%
│   │   # Explica COMO funciona a automação (DevOps)
│   │   # CI = testes automáticos
│   │   # CD = deploy automático
│   │   # Mostra quando e como o pipeline roda
│   │
│   ├── 19_DEPLOY_(VERCEL_RENDER).md ✅ 80%
│   │   # Passo a passo para colocar o projeto no ar
│   │   # Backend (Render) + Frontend (Vercel/GitHub Pages)
│   │   # Ordem correta para evitar erro
│   │
│   ├── 20_ESTRUTURA_DOC.md   ✅ 0%
│   │   # Estrutura e organização da documentação
│   │   # Define padrão e manutenção dos documentos
│   │
│   ├── 21_CHANGELOG.md ✅ 0%
│   │   # Histórico de mudanças do projeto
│   │   # Registra melhorias, correções e versões
│   │
│   ├── 22_EXTENSOES_VSCODE.md   ✅ 0%
│   │   # Lista de extensões obrigatórias do VSCode
│   │   # Padroniza ambiente de desenvolvimento da equipe
│   │
│   ├── 23_CONFIGURACAO_EXTENSOES.md   ✅ 0%
│   │   # Configuração das extensões do VSCode
│   │   # Garante comportamento padronizado no editor
│   │
│   ├── 24_CHECKLIST_MATHEUS.md   ✅ 0%
│   │   # Checklist de tarefas do Matheus
│   │   # Controle de progresso individual
│   │
│   ├── 25_CHECKLIST_LUCAS.md   ✅ 0%
│   │   # Checklist de tarefas do Lucas
│   │   # Controle de progresso individual
│   │
│   ├── 26_CHECKLIST_HENRIQUE.md   ✅ 0%
│   │   # Checklist de tarefas do Henrique
│   │   # Controle de progresso individual
│   ├── 26_CHECKLIST_.md   ✅ 0%
│   │   # Checklist de tarefas do Henrique
│   │   # Controle de progresso individual
│   │
│   └── 28_APRESENTACAO.md   ✅ 40%
│       # Roteiro da apresentação do projeto
│       # Passo a passo para demonstrar o sistema AO VIVO
│       # Evita travar na hora da entrega
│
├── /frontend   ✅ 0% CRIAR
│   # Código do site (HTML, CSS, JS, Bootstrap)
│
├── /backend  ✅ 0% CRIAR
│   # API (Node.js + Express)
│
├── /cypress   ✅ 0% CRIAR
│   # Testes automatizados (E2E)
│
└── /.github/workflows   ✅ 0% CRIAR
    # Arquivos do GitHub Actions (CI/CD automatizado)
```

---

## Como Vamos Usar Isso em Equipe

### Estrutura de responsabilidades:

- **Frontend** → olha **ESCOPO + UI_GUIDELINES**
- **Backend** → olha **ARCHITECTURE + ESCOPO**
- **DevOps** → olha **CI_CD + DEPLOY**
- **Testes** → olha **TEST_PLAN + CYPRESS**
- **Todos** → seguem **WORKFLOW + CONTRIBUTING**

---
