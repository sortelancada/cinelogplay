/**
 * aplicacao.js
 * Arquivo de inicialização global
 * Usado por páginas que carregam este script
 */

document.addEventListener("DOMContentLoaded", () => {
  initializeMenus();
  initializeDropdowns();
  initializePageLinks();
});

// ========================================
// MENU HAMBÚRGUER
// ========================================

function initializeMenus() {
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

// ========================================
// DROPDOWN DO PERFIL
// ========================================

function initializeDropdowns() {
  const userProfileBtn = document.getElementById("userProfileBtn");
  const userDropdown = document.getElementById("userDropdown");

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
}

// ========================================
// NAVEGAÇÃO
// ========================================

function initializePageLinks() {
  // Links são navegados via HTML href
  // Esta função fica como placeholder para lógica futura
}
