// ========================================
// GERENCIAMENTO DE DIRETORES
// ========================================

import { config } from "./config.js";
const API_URL = config.apiUrl;

document.addEventListener("DOMContentLoaded", () => {
  console.log("Página de diretores carregada");
  carregarDiretores();
});

// ========================================
// CARREGAR DIRETORES DO BACKEND
// ========================================

function carregarDiretores() {
  const url = `${API_URL}/api/diretores`;

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
      const diretores = Array.isArray(data) ? data : data.data || [];
      console.log("Diretores carregados:", diretores.length);
      renderizarDiretores(diretores);
    })
    .catch((err) => {
      console.error("Erro ao carregar diretores:", err);
      const container = document.getElementById("diretores-container");
      if (container) {
        container.innerHTML =
          '<div class="alert alert-warning" role="alert">Erro ao carregar diretores. Tente novamente mais tarde.</div>';
      }
    });
}

// ========================================
// RENDERIZAR GRID DE DIRETORES
// ========================================

function renderizarDiretores(diretores) {
  const container = document.getElementById("diretores-container");

  if (!container) {
    console.error("Container de diretores não encontrado");
    return;
  }

  container.innerHTML = "";

  if (!diretores || diretores.length === 0) {
    container.innerHTML =
      '<div class="alert alert-info">Nenhum diretor encontrado</div>';
    return;
  }

  const gridDiv = document.createElement("div");
  gridDiv.className = "filmes-grid";

  diretores.forEach((diretor) => {
    const card = criarCartaoDiretor(diretor);
    gridDiv.appendChild(card);
  });

  container.appendChild(gridDiv);
}

// ========================================
// CRIAR CARTÃO DE DIRETOR
// ========================================

function criarCartaoDiretor(diretor) {
  const card = document.createElement("div");
  card.className = "diretor-card";
  card.role = "button";
  card.tabindex = "0";
  card.title = `Clique para ver detalhes de ${diretor.nome}`;

  // IMAGEM
  const imagemDiv = document.createElement("div");
  imagemDiv.className = "diretor-card-imagem";

  const img = document.createElement("img");
  img.src = diretor.foto || "/diretores";
  img.alt = diretor.nome;
  img.loading = "lazy";
  img.onerror = () => {
    img.src = "/logo/cinelogplay.png";
  };

  imagemDiv.appendChild(img);
  card.appendChild(imagemDiv);

  // INFORMAÇÕES
  const infoDiv = document.createElement("div");
  infoDiv.className = "diretor-card-info";

  // NOME
  const nome = document.createElement("h3");
  nome.className = "diretor-card-nome";
  nome.textContent = diretor.nome || "Diretor";
  infoDiv.appendChild(nome);

  // NACIONALIDADE
  const nacionalidade = document.createElement("p");
  nacionalidade.className = "diretor-card-nacionalidade";
  nacionalidade.textContent = `Nacionalidade: ${diretor.nacionalidade || "N/A"}`;
  infoDiv.appendChild(nacionalidade);

  // OBRAS
  const obras = document.createElement("p");
  obras.className = "diretor-card-obras";
  obras.textContent = diretor.principais_obras || "N/A";
  infoDiv.appendChild(obras);

  card.appendChild(infoDiv);

  // EVENTOS
  card.addEventListener("click", () => {
    mostrarDetalhesDirector(diretor);
  });

  card.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      mostrarDetalhesDirector(diretor);
    }
  });

  return card;
}

// ========================================
// MOSTRAR DETALHES DO DIRETOR
// ========================================

function mostrarDetalhesDirector(diretor) {
  const app = document.getElementById("app");

  const html = `
    <div class="container-fluid py-5">
      <div class="container">
        <div class="row mb-4">
          <div class="col-12">
            <button class="btn btn-secondary btn-sm" onclick="voltarParaDiretores()">
              ← Voltar aos Diretores
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-4 mb-4">
            <img
              src="${diretor.foto || "/logo/cinelogplay.png"}"
              alt="${diretor.nome}"
              class="img-fluid rounded shadow"
              loading="lazy"
              onerror="this.src='/logo/cinelogplay.png'"
            >
          </div>

          <div class="col-12 col-md-8">
            <h1 class="display-6 fw-bold mb-3">${diretor.nome}</h1>

            <div class="row mb-4">
              <div class="col-12 col-sm-6">
                <small class="text-muted">Nacionalidade</small>
                <p class="fw-bold">${diretor.nacionalidade || "N/A"}</p>
              </div>
            </div>

            <hr>

            <h5 class="fw-bold mb-3">Principais Obras</h5>
            <p class="text-muted">${diretor.principais_obras || "Informação não disponível"}</p>

            <hr>

            <h5 class="fw-bold mb-3">Biografia</h5>
            <p class="text-muted">${diretor.biografia || "Biografia não disponível"}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  app.innerHTML = html;
  window.scrollTo(0, 0);
}

// ========================================
// VOLTAR PARA DIRETORES
// ========================================

function voltarParaDiretores() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="container-fluid py-5">
      <div class="row mb-5">
        <div class="col-12 text-center">
          <h1 class="display-5 fw-light">Nossos Diretores</h1>
          <p class="text-secondary fs-5">Conheça os grandes nomes do cinema</p>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div id="diretores-container"></div>
        </div>
      </div>
    </div>
  `;

  carregarDiretores();
  window.scrollTo(0, 0);
}
