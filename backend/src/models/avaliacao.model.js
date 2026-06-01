// ========================================
// MODELO DE AVALIAÇÕES
// ========================================

import db from "../config/db.js";

const Avaliacao = {
  // Obter todas as avaliações
  async getAll() {
    try {
      const query = `
        SELECT av.*, f.titulo as filme_titulo
        FROM avaliacoes av
        JOIN filmes f ON av.filme_id = f.id
        ORDER BY av.data_criacao DESC
      `;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error("Erro ao obter avaliações:", error);
      throw error;
    }
  },

  // Obter avaliações de um filme
  async getByFilmeId(filmeId) {
    try {
      const query = `
        SELECT * FROM avaliacoes
        WHERE filme_id = $1
        ORDER BY data_criacao DESC
      `;
      const result = await db.query(query, [filmeId]);
      return result.rows;
    } catch (error) {
      console.error("Erro ao obter avaliações do filme:", error);
      throw error;
    }
  },

  // Obter avaliação média de um filme
  async getMediaFilme(filmeId) {
    try {
      const query = `
        SELECT
          AVG(estrelas) as media,
          COUNT(*) as total,
          MIN(estrelas) as minima,
          MAX(estrelas) as maxima
        FROM avaliacoes
        WHERE filme_id = $1
      `;
      const result = await db.query(query, [filmeId]);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao obter média de avaliação:", error);
      throw error;
    }
  },

  // Criar nova avaliação
  async create(avaliacaoData) {
    try {
      const { filme_id, usuario_id, estrelas, comentario } = avaliacaoData;

      const query = `
        INSERT INTO avaliacoes (filme_id, usuario_id, estrelas, comentario)
        VALUES ($1, $2, $3, $4)
        RETURNING id, filme_id, usuario_id, estrelas, comentario, data_criacao
      `;

      const result = await db.query(query, [
        filme_id,
        usuario_id,
        estrelas,
        comentario || null,
      ]);

      return result.rows[0];
    } catch (error) {
      console.error("Erro ao criar avaliação:", error);
      throw error;
    }
  },

  // Atualizar avaliação
  async update(id, avaliacaoData) {
    try {
      const { estrelas, comentario } = avaliacaoData;

      const query = `
        UPDATE avaliacoes
        SET estrelas = $1, comentario = $2
        WHERE id = $3
        RETURNING id, filme_id, usuario_id, estrelas, comentario, data_criacao
      `;

      const result = await db.query(query, [estrelas, comentario || null, id]);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao atualizar avaliação:", error);
      throw error;
    }
  },

  // Deletar avaliação
  async delete(id) {
    try {
      const query = "DELETE FROM avaliacoes WHERE id = $1";
      await db.query(query, [id]);
      return { message: "Avaliação deletada com sucesso" };
    } catch (error) {
      console.error("Erro ao deletar avaliação:", error);
      throw error;
    }
  },

  // Obter avaliação por usuário e filme
  async getByUsuarioEFilme(usuarioId, filmeId) {
    try {
      const query = `
        SELECT * FROM avaliacoes
        WHERE usuario_id = $1 AND filme_id = $2
      `;
      const result = await db.query(query, [usuarioId, filmeId]);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao obter avaliação do usuário:", error);
      throw error;
    }
  },
};

export default Avaliacao;
