/**
 * login.js
 * Autenticação e gerenciamento de sessão
 */

const API_URL = "http://localhost:3001";

document.addEventListener("DOMContentLoaded", () => {
  setupLoginForm();
});

function setupLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email")?.value;
    const senha = document.getElementById("login-senha")?.value;

    if (!email || !senha) {
      alert("Email e senha são obrigatórios");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/pages/home.html";
      } else {
        alert("Erro: " + (data.message || "Login falhou"));
      }
    } catch (err) {
      alert("Erro ao fazer login");
    }
  });
}
