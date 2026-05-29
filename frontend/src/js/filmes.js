// ========================================
// GERENCIAMENTO DE FILMES - CATÁLOGO
// ========================================

import { config } from "./config.js";

const API_URL = config.apiUrl;
let filmesGlobal = [];

document.addEventListener("DOMContentLoaded", () => {
  console.log("📽️ Página de catálogo carregada");
  carregarFilmes();
});

// ========================================
// CARREGAR FILMES DO BACKEND
// ========================================

function carregarFilmes() {
  const url = `${API_URL}/api/filmes`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      filmesGlobal = Array.isArray(data) ? data : data.data || [];
      console.log("✅ Filmes carregados:", filmesGlobal.length);
      renderizarGridFilmes(filmesGlobal);
      configurarPesquisa();
    })
    .catch((err) => {
      console.error("❌ Erro ao carregar filmes:", err);
      const container = document.getElementById("filmes-container");
      if (container) {
        container.innerHTML =
          '<div class="alert alert-warning" role="alert">Erro ao carregar filmes. Tente novamente mais tarde.</div>';
      }
    });
}

// ========================================
// RENDERIZAR GRID DE FILMES
// ========================================

function renderizarGridFilmes(filmes) {
  const container = document.getElementById("filmes-container");

  if (!container) {
    console.error("❌ Container de filmes não encontrado");
    return;
  }

  container.innerHTML = "";

  if (!filmes || filmes.length === 0) {
    container.innerHTML =
      '<div class="alert alert-info">Nenhum filme encontrado</div>';
    return;
  }

  const gridDiv = document.createElement("div");
  gridDiv.className = "filmes-grid";

  filmes.forEach((filme) => {
    const card = criarCartaoFilme(filme);
    gridDiv.appendChild(card);
  });

  container.appendChild(gridDiv);
}

// ========================================
// OBTER COR DA CLASSIFICAÇÃO
// ========================================

function obterCorClassificacao(classificacao) {
  if (!classificacao) return "#999";
  const classif = String(classificacao).replace("+", "").trim();
  if (classif === "L" || classif === "Livre") return "#4CAF50";
  if (classif === "10" || classif === "12") return "#4CAF50";
  if (classif === "14" || classif === "16") return "#FF9800";
  if (classif === "18") return "#F44336";
  return "#999";
}

// ========================================
// CRIAR CARTÃO DE FILME
// ========================================

function criarCartaoFilme(filme) {
  const card = document.createElement("div");
  card.className = "filme-card";
  card.role = "button";
  card.tabindex = "0";
  card.title = `Clique para ver detalhes de ${filme.titulo}`;
  card.style.cursor = "pointer";

  // IMAGEM
  const imagemDiv = document.createElement("div");
  imagemDiv.className = "filme-card-imagem";

  const img = document.createElement("img");
  img.src = filme.imagem || "/cinelogplay.png";
  img.alt = filme.titulo;
  img.loading = "lazy";
  img.onerror = () => {
    img.src = "/cinelogplay.png";
  };

  imagemDiv.appendChild(img);
  card.appendChild(imagemDiv);

  // INFORMAÇÕES
  const infoDiv = document.createElement("div");
  infoDiv.className = "filme-card-info";

  // TÍTULO
  const titulo = document.createElement("h6");
  titulo.className = "filme-card-titulo";
  titulo.textContent = filme.titulo;
  infoDiv.appendChild(titulo);

  // GÊNERO
  const generoP = document.createElement("p");
  generoP.className = "filme-card-genero";
  generoP.textContent = filme.genero || "N/A";
  infoDiv.appendChild(generoP);

  // ANO + CLASSIFICAÇÃO
  const anoP = document.createElement("p");
  anoP.className = "filme-card-ano-classificacao";

  const anoText = document.createTextNode(`${filme.ano || "N/A"} | `);
  anoP.appendChild(anoText);

  const classificacaoSpan = document.createElement("span");
  classificacaoSpan.className = "filme-card-classificacao";
  const classif = String(filme.classificacao || "L")
    .replace("+", "")
    .trim();
  classificacaoSpan.style.color = obterCorClassificacao(filme.classificacao);
  classificacaoSpan.textContent =
    classif === "L" || classif === "Livre" ? "L" : `+${classif}`;

  anoP.appendChild(classificacaoSpan);
  infoDiv.appendChild(anoP);

  // DESCRIÇÃO CURTA
  const sinopse = document.createElement("p");
  sinopse.className = "filme-card-sinopse";
  sinopse.textContent =
    filme.descricao_curta || filme.sinopse || "Sem descrição";
  infoDiv.appendChild(sinopse);

  card.appendChild(infoDiv);

  // EVENTOS - IR PARA DETALHES
  card.addEventListener("click", () => {
    irParaDetalhes(filme.id);
  });

  card.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      irParaDetalhes(filme.id);
    }
  });

  return card;
}

// ========================================
// IR PARA PÁGINA DE DETALHES
// ========================================

function irParaDetalhes(filmeId) {
  window.location.href = `/pages/filmes-detalhes.html?id=${filmeId}`;
}

// ========================================
// CONFIGURAR PESQUISA
// ========================================

function configurarPesquisa() {
  const inputPesquisa = document.querySelector("#pesquisa-input");
  if (inputPesquisa) {
    inputPesquisa.addEventListener("input", (e) => {
      const termo = e.target.value.toLowerCase();
      const filmesFiltrados = filmesGlobal.filter(
        (f) =>
          f.titulo.toLowerCase().includes(termo) ||
          f.genero.toLowerCase().includes(termo) ||
          (f.descricao_curta && f.descricao_curta.toLowerCase().includes(termo))
      );
      renderizarGridFilmes(filmesFiltrados);
    });
  }
}
