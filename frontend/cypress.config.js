// importa a função defineConfig do Cypress para configurar o ambiente de testes E2E
import { defineConfig } from "cypress";

// exporta a configuração principal do Cypress
export default defineConfig({
  e2e: {
    // PORTA CORRETA: 5173 (Vite), NÃO 3000
    baseUrl: "http://localhost:5173",

    // Timeouts para as requisições e comandos
    requestTimeout: 10000,
    responseTimeout: 10000,
    defaultCommandTimeout: 5000,

    // Viewport padrão para os testes
    viewportWidth: 1280,
    viewportHeight: 720,

    // Configurações de teste
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: false,

    setupNodeEvents(on, config) {
      // Adicionar event listeners para personalizar o comportamento do Cypress
      return config;
    },
  },
});
