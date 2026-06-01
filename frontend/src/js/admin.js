/**
 * admin.js
 * Gerenciamento do painel administrativo
 */

const API_URL = "http://localhost:3001";
let currentUser = null;
let filmosGlobal = [];
let diretoresGlobal = [];
let atoresGlobal = [];

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  initializeAdmin();
});

async function initializeAdmin() {
  setupMenuToggle();
  setupUserDropdown();

  // Verificar autenticação
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/pages/login.html";
    return;
  }

  // Carregar dados
  await carregarDados();
  setupEventListeners();
}

// ========================================
// CARREGAR DADOS
// ========================================

async function carregarDados() {
  try {
    const [filmes, diretores, atores] = await Promise.all([
      fetch(`${API_URL}/api/filmes`).then((r) => r.json()),
      fetch(`${API_URL}/api/diretores`).then((r) => r.json()),
      fetch(`${API_URL}/api/atores`).then((r) => r.json()),
    ]);

    filmosGlobal = Array.isArray(filmes) ? filmes : filmes.data || [];
    diretoresGlobal = Array.isArray(diretores)
      ? diretores
      : diretores.data || [];
    atoresGlobal = Array.isArray(atores) ? atores : atores.data || [];

    renderizarDados();
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
  }
}

// ========================================
// RENDERIZAR DADOS
// ========================================

function renderizarDados() {
  // Atualizar stats
  document.getElementById("total-filmes").textContent = filmosGlobal.length;
  document.getElementById("total-diretores").textContent =
    diretoresGlobal.length;
  document.getElementById("total-atores").textContent = atoresGlobal.length;

  // Renderizar tabelas
  renderizarTabelaFilmes();
  renderizarTabelaDiretores();
  renderizarTabelaAtores();
}

function renderizarTabelaFilmes() {
  const tbody = document.getElementById("filmes-tbody");
  if (!tbody) return;

  tbody.innerHTML = filmosGlobal
    .map(
      (filme) => `
    <tr>
      <td>${filme.titulo}</td>
      <td>${filme.genero || "N/A"}</td>
      <td>${filme.ano}</td>
      <td>
        <button onclick="editarFilme(${filme.id})" class="btn btn-sm btn-primary">Editar</button>
        <button onclick="deletarFilme(${filme.id})" class="btn btn-sm btn-danger">Deletar</button>
      </td>
    </tr>
  `
    )
    .join("");
}

function renderizarTabelaDiretores() {
  const tbody = document.getElementById("diretores-tbody");
  if (!tbody) return;

  tbody.innerHTML = diretoresGlobal
    .map(
      (diretor) => `
    <tr>
      <td>${diretor.nome}</td>
      <td>${diretor.nacionalidade || "N/A"}</td>
      <td>
        <button onclick="editarDiretor(${diretor.id})" class="btn btn-sm btn-primary">Editar</button>
        <button onclick="deletarDiretor(${diretor.id})" class="btn btn-sm btn-danger">Deletar</button>
      </td>
    </tr>
  `
    )
    .join("");
}

function renderizarTabelaAtores() {
  const tbody = document.getElementById("atores-tbody");
  if (!tbody) return;

  tbody.innerHTML = atoresGlobal
    .map(
      (ator) => `
    <tr>
      <td>${ator.nome}</td>
      <td>${ator.nacionalidade || "N/A"}</td>
      <td>
        <button onclick="editarAtor(${ator.id})" class="btn btn-sm btn-primary">Editar</button>
        <button onclick="deletarAtor(${ator.id})" class="btn btn-sm btn-danger">Deletar</button>
      </td>
    </tr>
  `
    )
    .join("");
}

// ========================================
// MENU E DROPDOWN
// ========================================

function setupMenuToggle() {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  if (!menuToggle || !sidebar || !sidebarOverlay) return;

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.toggle("active");
    sidebarOverlay.classList.toggle("active");
  });

  sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
  });
}

function setupUserDropdown() {
  const userProfileBtn = document.getElementById("userProfileBtn");
  const userDropdown = document.getElementById("userDropdown");
  const logoutLink = document.getElementById("logoutLink");

  if (!userProfileBtn || !userDropdown) return;

  userProfileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("active");
  });

  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      window.location.href = "/pages/login.html";
    });
  }
}

// ========================================
// EVENT LISTENERS
// ========================================

function setupEventListeners() {
  // Botões de criar
  const btnCriarFilme = document.getElementById("btn-criar-filme");
  const btnCriarDiretor = document.getElementById("btn-criar-diretor");
  const btnCriarAtor = document.getElementById("btn-criar-ator");

  if (btnCriarFilme)
    btnCriarFilme.addEventListener("click", () => abrirModalFilme());
  if (btnCriarDiretor)
    btnCriarDiretor.addEventListener("click", () => abrirModalDiretor());
  if (btnCriarAtor)
    btnCriarAtor.addEventListener("click", () => abrirModalAtor());
}

// ========================================
// FILMES
// ========================================

function editarFilme(id) {
  const filme = filmosGlobal.find((f) => f.id === id);
  if (filme) {
    document.getElementById("filme-id").value = filme.id;
    document.getElementById("filme-titulo").value = filme.titulo;
    document.getElementById("filme-genero").value = filme.genero;
    document.getElementById("filme-ano").value = filme.ano;
    abrirModalFilme();
  }
}

function deletarFilme(id) {
  if (confirm("Tem certeza que deseja deletar este filme?")) {
    fetch(`${API_URL}/api/filmes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => carregarDados())
      .catch((err) => console.error("Erro ao deletar filme:", err));
  }
}

function abrirModalFilme() {
  // Implementar modal de filme
  const titulo = document.getElementById("filme-titulo")?.value || "";
  const genero = document.getElementById("filme-genero")?.value || "";
  const ano = document.getElementById("filme-ano")?.value || "";

  console.log("Modal de filme aberto", { titulo, genero, ano });
}

// ========================================
// DIRETORES
// ========================================

function editarDiretor(id) {
  const diretor = diretoresGlobal.find((d) => d.id === id);
  if (diretor) {
    document.getElementById("diretor-id").value = diretor.id;
    document.getElementById("diretor-nome").value = diretor.nome;
    document.getElementById("diretor-nacionalidade").value =
      diretor.nacionalidade;
    abrirModalDiretor();
  }
}

function deletarDiretor(id) {
  if (confirm("Tem certeza que deseja deletar este diretor?")) {
    fetch(`${API_URL}/api/diretores/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => carregarDados())
      .catch((err) => console.error("Erro ao deletar diretor:", err));
  }
}

function abrirModalDiretor() {
  console.log("Modal de diretor aberto");
}

// ========================================
// ATORES
// ========================================

function editarAtor(id) {
  const ator = atoresGlobal.find((a) => a.id === id);
  if (ator) {
    document.getElementById("ator-id").value = ator.id;
    document.getElementById("ator-nome").value = ator.nome;
    document.getElementById("ator-nacionalidade").value = ator.nacionalidade;
    abrirModalAtor();
  }
}

function deletarAtor(id) {
  if (confirm("Tem certeza que deseja deletar este ator?")) {
    fetch(`${API_URL}/api/atores/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => carregarDados())
      .catch((err) => console.error("Erro ao deletar ator:", err));
  }
}

function abrirModalAtor() {
  console.log("Modal de ator aberto");
}
