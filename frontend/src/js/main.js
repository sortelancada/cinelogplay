import "../css/style.css";
import { config, API_URL } from "./config.js";

console.log("Frontend CinelogPlay iniciado");

const currentUser = {
  name: "Lucas Dias",
  email: "lucas@email.com",
  avatar: "L",
};

document.addEventListener("DOMContentLoaded", () => {
  updateUserProfile();
  loadFilmesDestaque();
  loadLancamentos();
  loadClassicos();
  setupMenuToggle();
  setupUserDropdown();
});

function setupMenuToggle() {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  if (!menuToggle || !sidebar || !sidebarOverlay) {
    return;
  }

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.toggle("active");
    sidebarOverlay.classList.toggle("active");
  });

  sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
  });

  document.querySelectorAll(".sidebar-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  });

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

function setupUserDropdown() {
  const userProfileBtn = document.getElementById("userProfileBtn");
  const userDropdown = document.getElementById("userDropdown");
  const profileLink = document.getElementById("profileLink");
  const logoutLink = document.getElementById("logoutLink");

  if (!userProfileBtn || !userDropdown) {
    return;
  }

  userProfileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (
      !userProfileBtn.contains(e.target) &&
      !userDropdown.contains(e.target)
    ) {
      userDropdown.classList.remove("active");
    }
  });

  if (profileLink) {
    profileLink.addEventListener("click", (e) => {
      e.preventDefault();
      userDropdown.classList.remove("active");
      alert(`Perfil de ${currentUser.name}`);
    });
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      userDropdown.classList.remove("active");
      alert("Saindo da conta...");
    });
  }
}

function updateUserProfile() {
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const userAvatar = document.getElementById("userAvatar");

  if (userName) userName.textContent = currentUser.name;
  if (userEmail) userEmail.textContent = currentUser.email;
  if (userAvatar) userAvatar.textContent = currentUser.avatar;
}

function loadFilmesDestaque() {
  const container = document.getElementById("filmes-container");
  if (!container) return;

  fetch(`${API_URL}/api/filmes`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((response) => {
      const filmes = Array.isArray(response) ? response : response.data || [];
      container.innerHTML = "";

      if (filmes.length === 0) {
        container.innerHTML =
          '<p style="color: #999; grid-column: 1 / -1; text-align: center;">Nenhum filme encontrado</p>';
        return;
      }

      filmes.slice(0, 6).forEach((filme) => {
        const div = document.createElement("div");
        div.className = "filme-card";
        div.innerHTML = `
          <img src="${filme.imagem || "/logo/cinelogplay.png"}" alt="${filme.titulo}" loading="lazy" onerror="this.src='/logo/cinelogplay.png'">
          <h6>${filme.titulo || "Filme sem título"}</h6>
          <p><strong>Gênero:</strong> ${filme.genero || "N/A"}</p>
          <p><strong>Ano:</strong> ${filme.ano || "N/A"}</p>
        `;
        container.appendChild(div);
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar filmes em destaque:", err);
      const container = document.getElementById("filmes-container");
      if (container) {
        container.innerHTML =
          '<p style="color: #999; grid-column: 1 / -1; text-align: center;">Erro ao carregar filmes</p>';
      }
    });
}

function loadLancamentos() {
  const container = document.getElementById("lancamentos-container");
  if (!container) return;

  fetch(`${API_URL}/api/filmes`)
    .then((res) => res.json())
    .then((response) => {
      const filmes = Array.isArray(response) ? response : response.data || [];
      const lancamentos = filmes.filter((f) => f.tipo === "lancamento");

      container.innerHTML = "";
      if (lancamentos.length === 0) {
        container.innerHTML =
          '<p style="color: #999;">Nenhum lançamento disponível</p>';
        return;
      }

      lancamentos.forEach((filme) => {
        const div = document.createElement("div");
        div.className = "filme-card";
        div.innerHTML = `
          <img src="${filme.imagem || "/logo/cinelogplay.png"}" alt="${filme.titulo}" loading="lazy" onerror="this.src='/logo/cinelogplay.png'">
          <h6>${filme.titulo}</h6>
          <p><strong>Ano:</strong> ${filme.ano}</p>
        `;
        container.appendChild(div);
      });
    })
    .catch((err) => console.error("Erro ao carregar lançamentos:", err));
}

function loadClassicos() {
  const container = document.getElementById("classicos-container");
  if (!container) return;

  fetch(`${API_URL}/api/filmes`)
    .then((res) => res.json())
    .then((response) => {
      const filmes = Array.isArray(response) ? response : response.data || [];
      const classicos = filmes.filter((f) => f.tipo === "classico");

      container.innerHTML = "";
      if (classicos.length === 0) {
        container.innerHTML =
          '<p style="color: #999;">Nenhum clássico disponível</p>';
        return;
      }

      classicos.forEach((filme) => {
        const div = document.createElement("div");
        div.className = "filme-card";
        div.innerHTML = `
          <img src="${filme.imagem || "/logo/cinelogplay.png"}" alt="${filme.titulo}" loading="lazy" onerror="this.src='/logo/cinelogplay.png'">
          <h6>${filme.titulo}</h6>
          <p><strong>Ano:</strong> ${filme.ano}</p>
        `;
        container.appendChild(div);
      });
    })
    .catch((err) => console.error("Erro ao carregar clássicos:", err));
}
