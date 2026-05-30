// ========================================
// GERENCIAMENTO DE CONTATO
// ========================================

import { config } from "./configuracao.js";
const API_URL = config.apiUrl;

document.addEventListener("DOMContentLoaded", () => {
  console.log("Página de contato carregada");
  setupFormContato();
});

// ========================================
// SETUP DO FORMULÁRIO DE CONTATO
// ========================================

function setupFormContato() {
  const form = document.getElementById("contato-form");

  if (!form) {
    console.error("Formulário de contato não encontrado");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleContactSubmit();
  });
}

// ========================================
// ENVIAR FORMULÁRIO DE CONTATO
// ========================================

function handleContactSubmit() {
  const nome = document.getElementById("contato-nome")?.value || "";
  const email = document.getElementById("contato-email")?.value || "";
  const mensagem = document.getElementById("contato-mensagem")?.value || "";

  if (!nome.trim() || !email.trim() || !mensagem.trim()) {
    alert("Todos os campos são obrigatórios");
    return;
  }

  const url = `${API_URL}/api/contato`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, email, mensagem }),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      if (data.message || data.success) {
        alert("Mensagem enviada com sucesso!");
        document.getElementById("contato-form")?.reset();
      } else {
        alert("Erro: " + (data.error || "Erro ao enviar mensagem"));
      }
    })
    .catch((err) => {
      console.error("Erro ao enviar contato:", err);
      alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
    });
}
