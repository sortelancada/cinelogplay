// Exporta configuração do Commitlint
export default {
  // Extende a configuração convencional (padrão de commits semânticos)
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Regra para tipos de commit permitidos
    "type-enum": [
      2, // Nível de severidade (2 = erro)
      "always", // Sempre aplicar a regra
      [
        // Tipos válidos de commit
        "feat", // Nova funcionalidade
        "fix", // Correção de bug
        "docs", // Alterações na documentação
        "style", // Alterações de estilo (formatação, espaçamento, etc.)
        "refactor", // Refatoração de código sem mudança de funcionalidade
        "test", // Adição ou alteração de testes
        "chore", // Tarefas de manutenção (build, configuração, etc.)
      ],
    ],
  },
};
