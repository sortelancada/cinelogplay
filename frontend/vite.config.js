// Importa utilitário de resolução de caminhos
import { resolve } from "path";

// Importa defineConfig do Vite
import { defineConfig } from "vite";

// Exporta configuração
export default defineConfig({
  // Configuração do servidor dev
  server: {
    host: "0.0.0.0",
    port: 5173,
    open: false,
  },

  // Configuração de preview
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },

  // Configuração de build
  build: {
    outDir: "dist",
    sourcemap: true,

    // Configura entradas HTML multipágina
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "pages/home.html"),
        filmes: resolve(__dirname, "pages/filmes.html"),
        diretores: resolve(__dirname, "pages/diretores.html"),
        contato: resolve(__dirname, "pages/contato.html"),
        login: resolve(__dirname, "pages/login.html"),
        cadastro: resolve(__dirname, "pages/cadastro.html"),
        admin: resolve(__dirname, "pages/admin.html"),
      },
    },
  },
});
