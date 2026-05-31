import { API_URL, USE_MOCK } from "./config.js";
import { setupUI } from "./shared.js";
import filmesMock from "../data/filmes.json";

let filmesGlobal = [];

document.addEventListener("DOMContentLoaded", () => {
  setupUI();
  carregarFilmes();
});

async function carregarFilmes() {
  try {
    if (USE_MOCK) {
      filmesGlobal = filmesMock.data || filmesMock;
      renderizarGridFilmes(filmesGlobal);
      configurarPesquisa();
      return;
    }

    const res = await fetch(`${API_URL}/api/filmes`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    filmesGlobal = Array.isArray(data) ? data : data.data || [];
    renderizarGridFilmes(filmesGlobal);
    configurarPesquisa();
  } catch (err) {
    console.warn("API indisponível, usando mock:", err.message);
    filmesGlobal = filmesMock.data || filmesMock;
    renderizarGridFilmes(filmesGlobal);
    configurarPesquisa();
  }
}

function renderizarGridFilmes(filmes) {
  const container = document.getElementById("filmes-container");
  if (!container) return;

  container.innerHTML = "";

  if (!filmes || filmes.length === 0) {
    container.innerHTML =
      '<div class="alert alert-info">Nenhum filme encontrado</div>';
    return;
  }

  const gridDiv = document.createElement("div");
  gridDiv.className = "filmes-grid";
  filmes.forEach((filme) => gridDiv.appendChild(criarCartaoFilme(filme)));
  container.appendChild(gridDiv);
}

function obterCorClassificacao(classificacao) {
  if (!classificacao) return "#999";
  const c = String(classificacao).replace("+", "").trim();
  if (c === "L" || c === "Livre") return "#4CAF50";
  if (c === "10" || c === "12") return "#4CAF50";
  if (c === "14" || c === "16") return "#FF9800";
  if (c === "18") return "#F44336";
  return "#999";
}

function criarCartaoFilme(filme) {
  const card = document.createElement("div");
  card.className = "filme-card";
  card.role = "button";
  card.tabIndex = 0;
  card.title = `Ver detalhes de ${filme.titulo}`;

  const imagemDiv = document.createElement("div");
  imagemDiv.className = "filme-card-imagem";
  const img = document.createElement("img");
  img.src = filme.imagem || "/logo/cinelogplay.png";
  img.alt = filme.titulo;
  img.loading = "lazy";
  img.onerror = () => {
    img.src = "/logo/cinelogplay.png";
  };
  imagemDiv.appendChild(img);
  card.appendChild(imagemDiv);

  const infoDiv = document.createElement("div");
  infoDiv.className = "filme-card-info";

  const titulo = document.createElement("h6");
  titulo.className = "filme-card-titulo";
  titulo.textContent = filme.titulo;
  infoDiv.appendChild(titulo);

  const generoP = document.createElement("p");
  generoP.className = "filme-card-genero";
  generoP.textContent = `Gênero: ${filme.genero || "N/A"}`;
  infoDiv.appendChild(generoP);

  const anoP = document.createElement("p");
  anoP.className = "filme-card-ano-classificacao";
  const classif = String(filme.classificacao || "L")
    .replace("+", "")
    .trim();
  const classificacaoLabel =
    classif === "L" || classif === "Livre" ? "L" : `+${classif}`;
  anoP.innerHTML = `Ano: ${filme.ano || "N/A"} | <span class="filme-card-classificacao" style="color:${obterCorClassificacao(filme.classificacao)}">${classificacaoLabel}</span>`;
  infoDiv.appendChild(anoP);

  const sinopse = document.createElement("p");
  sinopse.className = "filme-card-sinopse";
  sinopse.textContent =
    filme.descricao_curta || filme.sinopse || "Descrição não disponível";
  infoDiv.appendChild(sinopse);

  card.appendChild(infoDiv);

  card.addEventListener("click", () => mostrarDetalhesFilme(filme));
  card.addEventListener("keypress", (e) => {
    if (e.key === "Enter") mostrarDetalhesFilme(filme);
  });

  return card;
}

function mostrarDetalhesFilme(filme) {
  const app = document.getElementById("app");
  if (!app) return;

  const classif = String(filme.classificacao || "L")
    .replace("+", "")
    .trim();
  const classificacaoLabel =
    classif === "L" || classif === "Livre" ? "L" : `+${classif}`;
  const classificacaoCor = obterCorClassificacao(filme.classificacao);

  app.innerHTML = `
    <div class="container-fluid py-5">
      <div class="container">
        <div class="mb-4">
          <button class="btn btn-outline-secondary btn-sm" id="btn-voltar-filmes">
            ← Voltar ao Catálogo
          </button>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 mb-4">
            <img src="${filme.imagem || "/logo/cinelogplay.png"}"
                 alt="${filme.titulo}" class="img-fluid rounded shadow"
                 loading="lazy" onerror="this.src='/logo/cinelogplay.png'">
          </div>
          <div class="col-12 col-md-8">
            <h1 class="display-6 fw-bold mb-3" style="color: var(--color-text-dark)">${filme.titulo}</h1>
            <div class="row mb-3">
              <div class="col-6 col-sm-3">
                <small class="text-muted d-block">Ano</small>
                <strong>${filme.ano || "N/A"}</strong>
              </div>
              <div class="col-6 col-sm-3">
                <small class="text-muted d-block">Gênero</small>
                <strong>${filme.genero || "N/A"}</strong>
              </div>
              <div class="col-6 col-sm-3">
                <small class="text-muted d-block">Duração</small>
                <strong>${filme.duracao || "N/A"}</strong>
              </div>
              <div class="col-6 col-sm-3">
                <small class="text-muted d-block">Classificação</small>
                <strong style="color: ${classificacaoCor}">${classificacaoLabel}</strong>
              </div>
            </div>
            ${filme.descricao_curta ? `<p class="lead" style="color: var(--color-text-dark)">${filme.descricao_curta}</p>` : ""}
            <hr>
            <h5 class="fw-bold mb-2" style="color: var(--color-text-dark)">Sinopse</h5>
            <p class="text-muted">${filme.sinopse || "Sinopse não disponível"}</p>
            ${
              filme.trailer_youtube
                ? `
              <hr>
              <a href="${filme.trailer_youtube}" target="_blank" rel="noopener noreferrer"
                 class="btn btn-danger btn-sm">▶ Assistir Trailer</a>
            `
                : ""
            }
          </div>
        </div>
      </div>
    </div>`;

  document
    .getElementById("btn-voltar-filmes")
    ?.addEventListener("click", voltarParaFilmes);
  window.scrollTo(0, 0);
}

function voltarParaFilmes() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <div class="container-fluid py-5">
      <div class="row mb-5">
        <div class="col-12">
          <div class="container">
            <h1 class="display-5 fw-light mb-3" style="color: var(--color-text-dark)">Catálogo de Filmes</h1>
            <p class="text-muted fs-5">Conheça todos os nossos filmes</p>
            <div class="mt-4">
              <input type="text" id="pesquisa-input" class="form-control form-control-lg"
                     placeholder="Pesquisar por título, gênero..." />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="container">
            <div id="filmes-container"></div>
          </div>
        </div>
      </div>
    </div>`;

  renderizarGridFilmes(filmesGlobal);
  configurarPesquisa();
  window.scrollTo(0, 0);
}

function configurarPesquisa() {
  const input = document.querySelector("#pesquisa-input");
  if (!input) return;
  input.addEventListener("input", (e) => {
    const termo = e.target.value.toLowerCase();
    const filtrados = filmesGlobal.filter(
      (f) =>
        (f.titulo || "").toLowerCase().includes(termo) ||
        (f.genero || "").toLowerCase().includes(termo) ||
        (f.descricao_curta || "").toLowerCase().includes(termo)
    );
    renderizarGridFilmes(filtrados);
  });
}
