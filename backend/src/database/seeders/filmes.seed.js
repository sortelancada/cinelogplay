// ========================================
// SEED - INSERIR FILMES
// ========================================

import db from "../../config/db.js";

const filmesData = [
  {
    titulo: "O Poderoso Chefão",
    ano: 1972,
    genero: "Crime",
    duracao: "175 min",
    classificacao: "14",
    imagem: "/filmes/o-poderoso-chefao.png",
    descricao_curta: "Saga épica sobre a família mafiosa Corleone",
    sinopse:
      "O envelhecido patriarca da família mafiosa organizada transfere o controle de seu império clandestino para seu filho relutante Michael Corleone.",
    diretor_id: 1,
    trailer_youtube: "https://www.youtube.com/embed/sY1S34973zA",
  },

  {
    titulo: "Tempo de Violência",
    ano: 1994,
    genero: "Crime",
    duracao: "154 min",
    classificacao: "16",
    imagem: "/filmes/tempo-de-violencia.jpg",
    descricao_curta:
      "Narrativa não-linear repleta de tensão e humor entre criminosos",
    sinopse:
      "As vidas de dois assassinos, um boxeador, um gângster e sua esposa se entrelaçam em eventos violentos e inesperados.",
    diretor_id: 2,
    trailer_youtube: "https://www.youtube.com/embed/s7EdQ4FqbhY",
  },

  {
    titulo: "A Origem",
    ano: 2010,
    genero: "Ficção Científica",
    duracao: "148 min",
    classificacao: "12",
    imagem: "/filmes/a-origem.png",
    descricao_curta: "Thriller psicológico de ficção científica sobre sonhos",
    sinopse:
      "Um ladrão especializado em roubar segredos através de sonhos recebe a missão de implantar uma ideia na mente de um CEO.",
    diretor_id: 3,
    trailer_youtube: "https://www.youtube.com/embed/YoHD9XEInc0",
  },

  {
    titulo: "Parasita",
    ano: 2019,
    genero: "Drama",
    duracao: "132 min",
    classificacao: "16",
    imagem: "/filmes/parasita.jpg",
    descricao_curta: "Thriller social que conquistou o mundo",
    sinopse:
      "Uma família pobre se infiltra na vida de uma família rica causando consequências inesperadas.",
    diretor_id: 4,
    trailer_youtube: "https://www.youtube.com/embed/5xH0HfJHsaY",
  },

  {
    titulo: "Interestelar",
    ano: 2014,
    genero: "Ficção Científica",
    duracao: "169 min",
    classificacao: "10",
    imagem: "/filmes/interstellar.png",
    descricao_curta: "Épico cósmico sobre amor, sacrifício e sobrevivência",
    sinopse:
      "Astronautas atravessam um buraco de minhoca em busca de um novo lar para a humanidade.",
    diretor_id: 3,
    trailer_youtube: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },

  {
    titulo: "2001: Uma Odisseia no Espaço",
    ano: 1968,
    genero: "Ficção Científica",
    duracao: "149 min",
    classificacao: "12",
    imagem: "/filmes/a-odisseia.png",
    descricao_curta: "Obra-prima do cinema de ficção científica",
    sinopse:
      "Uma missão espacial evolui para uma jornada filosófica sobre humanidade e inteligência artificial.",
    diretor_id: 5,
    trailer_youtube: "https://www.youtube.com/embed/oR_e9y-bka0",
  },

  {
    titulo: "Alice no País das Maravilhas",
    ano: 2010,
    genero: "Fantasia",
    duracao: "109 min",
    classificacao: "L",
    imagem: "/filmes/alice-no-pais-das-maravilhas.png",
    descricao_curta: "Adaptação visual espetacular do clássico",
    sinopse:
      "Alice retorna ao País das Maravilhas para enfrentar a Rainha Vermelha.",
    diretor_id: 6,
    trailer_youtube: "https://www.youtube.com/embed/9POCgSRVvf0",
  },

  {
    titulo: "Avatar: O Caminho da Água",
    ano: 2022,
    genero: "Ficção Científica",
    duracao: "192 min",
    classificacao: "12",
    imagem: "/filmes/avatar-fogo-e-cinzas.png",
    descricao_curta: "Continuação épica em Pandora",
    sinopse:
      "Jake Sully e sua família enfrentam novas ameaças no planeta Pandora.",
    diretor_id: 7,
    trailer_youtube: "https://www.youtube.com/embed/d9MyW72ELq0",
  },

  {
    titulo: "Dune",
    ano: 2021,
    genero: "Ficção Científica",
    duracao: "156 min",
    classificacao: "12",
    imagem: "/filmes/dune-movie-1.png",
    descricao_curta: "Adaptação épica do clássico de ficção científica",
    sinopse:
      "Paul Atreides é levado ao perigoso planeta Arrakis onde descobre seu destino.",
    diretor_id: 8,
    trailer_youtube: "https://www.youtube.com/embed/n9xhJrPXop4",
  },

  {
    titulo: "Dune: Parte Dois",
    ano: 2024,
    genero: "Ficção Científica",
    duracao: "166 min",
    classificacao: "12",
    imagem: "/filmes/dune-movie-2.png",
    descricao_curta: "Continuação épica da saga Dune",
    sinopse:
      "Paul Atreides une forças com os Fremen para enfrentar os Harkonnen.",
    diretor_id: 8,
    trailer_youtube: "https://www.youtube.com/embed/Way9Dexny3w",
  },

  {
    titulo: "O Invencível",
    ano: 2021,
    genero: "Animação",
    duracao: "60 min",
    classificacao: "14",
    imagem: "/filmes/invencivel.png",
    descricao_curta: "Série animada sobre super-heróis",
    sinopse:
      "Mark Grayson descobre seus poderes e aprende o verdadeiro custo de ser herói.",
    diretor_id: 9,
    trailer_youtube: "https://www.youtube.com/embed/-bfAVpuko5o",
  },
];

const filmesDataParte2 = [
  {
    titulo: "Os Jogos Vorazes",
    ano: 2012,
    genero: "Ficção Científica",
    duracao: "142 min",
    classificacao: "12",
    imagem: "/filmes/jogos-vorazes.png",
    descricao_curta: "Distopia onde adolescentes competem pela sobrevivência",
    sinopse:
      "Katniss Everdeen participa de um torneio mortal televisionado para salvar sua irmã.",
    diretor_id: 10,
    trailer_youtube: "https://www.youtube.com/embed/mfmrPu43DF8",
  },

  {
    titulo: "Malevola",
    ano: 2014,
    genero: "Fantasia",
    duracao: "97 min",
    classificacao: "12",
    imagem: "/filmes/malevola.png",
    descricao_curta:
      "Retelling do clássico da Disney do ponto de vista da vilã",
    sinopse:
      "A história da vilã Malévola e os acontecimentos que levaram à maldição da princesa Aurora.",
    diretor_id: 11,
    trailer_youtube: "https://www.youtube.com/embed/w-XO4XiRop0",
  },

  {
    titulo: "Panico 7",
    ano: 2023,
    genero: "Horror",
    duracao: "122 min",
    classificacao: "16",
    imagem: "/filmes/painco-7.png",
    descricao_curta: "Novo capítulo da série de horror clássica",
    sinopse: "Ghostface retorna aterrorizando um novo grupo de sobreviventes.",
    diretor_id: 12,
    trailer_youtube: "https://www.youtube.com/embed/h74AXqw4Opc",
  },

  {
    titulo: "Picaretas Não Vão Pro Céu",
    ano: 2020,
    genero: "Drama",
    duracao: "115 min",
    classificacao: "14",
    imagem: "/filmes/picaretas-nao-vao-pro-ceu.png",
    descricao_curta: "Drama sobre redenção e família",
    sinopse:
      "Um homem tenta reconstruir sua vida enquanto enfrenta fantasmas do passado.",
    diretor_id: 13,
    trailer_youtube: "https://www.youtube.com/embed/xxxxxxxx",
  },

  {
    titulo: "Searching - Desaparecida",
    ano: 2018,
    genero: "Thriller",
    duracao: "102 min",
    classificacao: "12",
    imagem: "/filmes/searching.png",
    descricao_curta: "Thriller inovador contado através de telas de computador",
    sinopse:
      "Um pai utiliza a internet para investigar o desaparecimento de sua filha.",
    diretor_id: 14,
    trailer_youtube: "https://www.youtube.com/embed/3Ro9ebQxEOY",
  },

  {
    titulo: "Street Fighter: A Lenda de Chun-Li",
    ano: 2009,
    genero: "Ação",
    duracao: "88 min",
    classificacao: "14",
    imagem: "/filmes/street-fighter.png",
    descricao_curta: "Adaptação do videogame icônico",
    sinopse:
      "Chun-Li busca vingança contra M. Bison e o império criminoso Shadaloo.",
    diretor_id: 15,
    trailer_youtube: "https://www.youtube.com/embed/ArN0_UK7uV0",
  },

  {
    titulo: "Super Mario Galaxy",
    ano: 2023,
    genero: "Animação",
    duracao: "92 min",
    classificacao: "L",
    imagem: "/filmes/super-mario-galax.png",
    descricao_curta: "Aventura cósmica do encanador mais famoso",
    sinopse:
      "Mario embarca em uma aventura intergaláctica para salvar Peach e derrotar Bowser.",
    diretor_id: 16,
    trailer_youtube: "https://www.youtube.com/embed/TnGl01FkMMo",
  },

  {
    titulo: "Toy Story 5",
    ano: 2024,
    genero: "Animação",
    duracao: "96 min",
    classificacao: "L",
    imagem: "/filmes/toy-story-5.png",
    descricao_curta: "Novo capítulo da amizade entre Woody e Buzz",
    sinopse:
      "Os brinquedos vivem uma nova aventura cheia de emoção e descobertas.",
    diretor_id: 17,
    trailer_youtube: "https://www.youtube.com/embed/xxxxxxxx",
  },

  {
    titulo: "Homem de Aço",
    ano: 2013,
    genero: "Ação",
    duracao: "143 min",
    classificacao: "12",
    imagem: "/filmes/zero-dc.png",
    descricao_curta: "Origem épica do Superman",
    sinopse:
      "Clark Kent descobre sua origem kryptoniana e assume o papel de Superman.",
    diretor_id: 18,
    trailer_youtube: "https://www.youtube.com/embed/T6DJcgm3wNY",
  },

  {
    titulo: "Dune: Parte Três",
    ano: 2026,
    genero: "Ficção Científica",
    duracao: "170 min",
    classificacao: "12",
    imagem: "/filmes/dune-movie-3.png",
    descricao_curta: "Continuação da guerra em Arrakis",
    sinopse:
      "Paul Atreides enfrenta consequências políticas e religiosas após assumir poder entre os Fremen.",
    diretor_id: 8,
    trailer_youtube: "https://www.youtube.com/embed/xxxxxxxx",
  },

  {
    titulo: "Dune: Parte Quatro",
    ano: 2028,
    genero: "Ficção Científica",
    duracao: "175 min",
    classificacao: "12",
    imagem: "/filmes/dune-movie-4.png",
    descricao_curta: "Conclusão épica da saga Dune",
    sinopse:
      "O destino do império galáctico é decidido na batalha final em Arrakis.",
    diretor_id: 8,
    trailer_youtube: "https://www.youtube.com/embed/xxxxxxxx",
  },
];

// ========================================
// FUNÇÃO SEED
// ========================================

const todosFilmes = [...filmesData, ...filmesDataParte2];

async function seedFilmes() {
  try {
    console.log("Iniciando seed de filmes...");

    for (const filme of todosFilmes) {
      const query = `
        INSERT INTO filmes (
          titulo,
          ano,
          genero,
          duracao,
          classificacao,
          imagem,
          descricao_curta,
          sinopse,
          diretor_id,
          trailer_youtube
        )
        VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10
        )
        ON CONFLICT (titulo)
        DO NOTHING
        RETURNING *;
      `;

      await db.query(query, [
        filme.titulo,
        filme.ano,
        filme.genero,
        filme.duracao,
        filme.classificacao,
        filme.imagem,
        filme.descricao_curta,
        filme.sinopse,
        filme.diretor_id,
        filme.trailer_youtube,
      ]);

      console.log(`Filme adicionado: ${filme.titulo}`);
    }

    console.log("Seed de filmes concluído com sucesso!");
  } catch (error) {
    console.error("Erro ao fazer seed de filmes:", error);
    throw error;
  }
}

export { seedFilmes };
