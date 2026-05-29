// Exporta configuração do Jest
export default {
  // Define o ambiente de teste como Node.js v24.16.0
  testEnvironment: "node",

  // Exibe informações detalhadas durante a execução dos testes
  verbose: true,

  // Define quais arquivos devem ser incluídos na coleta de cobertura
  collectCoverageFrom: [
    "backend/*/.js", // Arquivos JS dentro da pasta backend
    "frontend/*/.js", // Arquivos JS dentro da pasta frontend
    "!/node_modules/", // Ignora dependências
    "!/dist/", // Ignora arquivos gerados na build
  ],

  // Diretório onde será gerado o relatório de cobertura
  coverageDirectory: "coverage",
};
