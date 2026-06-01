// ========================================
// MODELO DE FILMES
// ========================================

import db from "../config/db.js";

const Filmes = {
  // Obter todos os filmes
  async getAll() {
    try {
      const query = "SELECT * FROM filmes ORDER BY id ASC";
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error("Erro ao obter filmes:", error);
      throw error;
    }
  },

  // Obter filme por ID
  async getById(id) {
    try {
      const query = "SELECT * FROM filmes WHERE id = $1";
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao obter filme:", error);
      throw error;
    }
  },

  // Criar novo filme
  async create(filmData) {
    try {
      const {
        titulo,
        ano,
        genero,
        duracao,
        classificacao,
        imagem,
        descricao_curta,
        sinopse,
        diretor_id,
        diretor_nome,
        diretor_foto,
        trailer_youtube,
      } = filmData;

      const query = `
        INSERT INTO filmes
        (titulo, ano, genero, duracao, classificacao, imagem, descricao_curta, sinopse, diretor_id, diretor_nome, diretor_foto, trailer_youtube)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
RETURNING *
      `;

      const result = await db.query(query, [
        titulo,
        ano,
        genero,
        duracao,
        classificacao,
        imagem,
        descricao_curta,
        sinopse,
        diretor_id,
        diretor_nome,
        diretor_foto,
        trailer_youtube,
      ]);

      return result.rows[0];
    } catch (error) {
      console.error("Erro ao criar filme:", error);
      throw error;
    }
  },

  async update(id, filmData) {
    try {
      const {
        titulo,
        ano,
        genero,
        duracao,
        classificacao,
        imagem,
        descricao_curta,
        sinopse,
        diretor_id,
        diretor_nome,
        diretor_foto,
        trailer_youtube,
      } = filmData;

      const query = `
      UPDATE filmes
      SET titulo = $1, ano = $2, genero = $3, duracao = $4, classificacao = $5,
          imagem = $6, descricao_curta = $7, sinopse = $8, diretor_id = $9,
          diretor_nome = $10, diretor_foto = $11, trailer_youtube = $12
      WHERE id = $13
      RETURNING *;
    `;

      const result = await db.query(query, [
        titulo,
        ano,
        genero,
        duracao,
        classificacao,
        imagem,
        descricao_curta,
        sinopse,
        diretor_id,
        diretor_nome,
        diretor_foto,
        trailer_youtube,
        id,
      ]);

      return result.rows[0];
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
      throw error;
    }
  },
  // Deletar filme
  async delete(id) {
    try {
      const query = "DELETE FROM filmes WHERE id = $1";
      await db.query(query, [id]);
      return { message: "Filme deletado com sucesso" };
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
      throw error;
    }
  },

  // Obter atores de um filme
  async getAtores(filmeId) {
    try {
      const query = `
        SELECT a.* FROM atores a
        JOIN filme_atores fa ON a.id = fa.ator_id
        WHERE fa.filme_id = $1
      `;
      const result = await db.query(query, [filmeId]);
      return result.rows;
    } catch (error) {
      console.error("Erro ao obter atores do filme:", error);
      throw error;
    }
  },

  // Pesquisar filmes
  async search(termo) {
    try {
      const query = `
        SELECT * FROM filmes
        WHERE titulo ILIKE $1
        OR genero ILIKE $2
        OR sinopse ILIKE $3
        ORDER BY id ASC
      `;
      const searchTerm = `%${termo}%`;
      const result = await db.query(query, [
        searchTerm,
        searchTerm,
        searchTerm,
      ]);
      return result.rows;
    } catch (error) {
      console.error("Erro ao pesquisar filmes:", error);
      throw error;
    }
  },

  // Obter filmes por gênero
  async getByGenero(genero) {
    try {
      const query = "SELECT * FROM filmes WHERE genero = $1 ORDER BY id ASC";
      const result = await db.query(query, [genero]);
      return result.rows;
    } catch (error) {
      console.error("Erro ao obter filmes por gênero:", error);
      throw error;
    }
  },

  // Obter filmes com avaliação
  async getComAvaliacao() {
    try {
      const query = `
        SELECT f.*,
              COALESCE(AVG(av.estrelas), 0) as media_avaliacao,
              COUNT(av.id) as total_avaliacoes
        FROM filmes f
        LEFT JOIN avaliacoes av ON f.id = av.filme_id
        GROUP BY f.id
        ORDER BY f.id ASC
      `;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error("Erro ao obter filmes com avaliação:", error);
      throw error;
    }
  },
};

export default Filmes;
