import { config } from "./config.js";
import { initializeApplication } from "./aplicacao.js";

const API_URL = config.apiUrl;

document.addEventListener("DOMContentLoaded", () => {
  initializeApplication();
  setupContatoForm();
});

function setupContatoForm() {
  const form = document.getElementById("contato-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("contato-nome")?.value;
    const email = document.getElementById("contato-email")?.value;
    const assunto = document.getElementById("contato-assunto")?.value;
    const mensagem = document.getElementById("contato-mensagem")?.value;

    if (!nome || !email || !assunto || !mensagem) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/contato`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, assunto, mensagem }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Mensagem enviada com sucesso!");
        form.reset();
      } else {
        alert(
          "Erro ao enviar mensagem: " + (data.message || "Tente novamente")
        );
      }
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao enviar mensagem");
    }
  });
}
