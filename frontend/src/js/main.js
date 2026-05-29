import "../css/style.css";
import { config } from "./config.js";

console.log("Frontend CinelogPlay iniciado");

// ========================================
// DADOS DO USUÁRIO
// ========================================

const currentUser = {
  name: "Lucas Dias",
  email: "lucas@email.com",
  avatar: "L",
};

// ========================================
// INICIALIZAR
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  updateUserProfile();
  loadFilmes();
  setupMenuToggle();
  setupUserDropdown();
});

// ========================================
// MENU HAMBÚRGUER
// ========================================

function setupMenuToggle() {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  if (!menuToggle || !sidebar || !sidebarOverlay) {
    return;
  }

  // Abrir/Fechar menu
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.toggle("active");
    sidebarOverlay.classList.toggle("active");
  });

  // Fechar menu ao clicar fora
  sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll(".sidebar-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  });

  // Fechar menu ao clicar fora dele
  document.addEventListener("click", (e) => {
    if (
      !sidebar.contains(e.target) &&
      !menuToggle.contains(e.target) &&
      sidebar.classList.contains("active")
    ) {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    }
  });
}

// ========================================
// DROPDOWN DO PERFIL
// ========================================

function setupUserDropdown() {
  const userProfileBtn = document.getElementById("userProfileBtn");
  const userDropdown = document.getElementById("userDropdown");
  const profileLink = document.getElementById("profileLink");
  const logoutLink = document.getElementById("logoutLink");

  if (!userProfileBtn || !userDropdown || !profileLink || !logoutLink) {
    return;
  }

  // Abrir/Fechar dropdown
  userProfileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("active");
  });

  // Fechar ao clicar fora
  document.addEventListener("click", (e) => {
    if (
      !userProfileBtn.contains(e.target) &&
      !userDropdown.contains(e.target)
    ) {
      userDropdown.classList.remove("active");
    }
  });

  // Perfil
  profileLink.addEventListener("click", (e) => {
    e.preventDefault();
    userDropdown.classList.remove("active");
    alert(`Perfil de ${currentUser.name}`);
  });

  // Sair
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    userDropdown.classList.remove("active");
    alert("Saindo da conta...");
  });
}

// ========================================
// ATUALIZAR PERFIL
// ========================================

function updateUserProfile() {
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const userAvatar = document.getElementById("userAvatar");

  if (userName) {
    userName.textContent = currentUser.name;
  }

  if (userEmail) {
    userEmail.textContent = currentUser.email;
  }

  if (userAvatar) {
    userAvatar.textContent = currentUser.avatar;
  }
}

// ========================================
// CARREGAR FILMES
// ========================================

function loadFilmes() {
  fetch(`${config.apiUrl}/api/filmes`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      return res.json();
    })
    .then((response) => {
      const filmes = Array.isArray(response) ? response : response.data || [];

      const container = document.getElementById("filmes-container");

      if (!container) return;

      container.innerHTML = "";

      if (filmes.length === 0) {
        container.innerHTML =
          '<p style="color: #999; grid-column: 1 / -1; text-align: center;">Nenhum filme encontrado</p>';
        return;
      }

      filmes.forEach((filme) => {
        const div = document.createElement("div");

        div.className = "filme-card";

        div.innerHTML = `
          <h2>${filme.titulo || "Filme sem título"}</h2>
          <p><strong>Gênero:</strong> ${filme.genero || "N/A"}</p>
          <p><strong>Ano:</strong> ${filme.ano || "N/A"}</p>
        `;

        container.appendChild(div);
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar filmes:", err);

      const container = document.getElementById("filmes-container");

      if (container) {
        container.innerHTML =
          '<p style="color: #999; grid-column: 1 / -1; text-align: center;">Erro ao carregar filmes</p>';
      }
    });
}
