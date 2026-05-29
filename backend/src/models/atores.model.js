// ========================================
// MODELO DE ATORES
// ========================================

import db from "../config/db.js";

const Ator = {
  // Obter todos os atores
  async getAll() {
    try {
      const query = "SELECT * FROM atores ORDER BY nome ASC";
      const [atores] = await db.query(query);
      return atores;
    } catch (error) {
      console.error("Erro ao obter atores:", error);
      throw error;
    }
  },

  // Obter ator por ID
  async getById(id) {
    try {
      const query = "SELECT * FROM atores WHERE id = $13";
      const [atores] = await db.query(query, [id]);
      return atores[0];
    } catch (error) {
      console.error("Erro ao obter ator:", error);
      throw error;
    }
  },

  // Criar novo ator
  async create(atorData) {
    try {
      const { nome, foto, nacionalidade, data_nascimento, biografia } =
        atorData;

      const query = `
        INSERT INTO atores (nome, foto, nacionalidade, data_nascimento, biografia)
        VALUES (?, ?, ?, ?, ?)
      `;

      const result = await db.query(query, [
        nome,
        foto,
        nacionalidade,
        data_nascimento,
        biografia,
      ]);

      return { id: result.insertId, ...atorData };
    } catch (error) {
      console.error("Erro ao criar ator:", error);
      throw error;
    }
  },

  // Obter filmes de um ator
  async getFilmes(atorId) {
    try {
      const query = `
        SELECT f.* FROM filmes f
        JOIN filme_atores fa ON f.id = fa.filme_id
        WHERE fa.ator_id = ?
        ORDER BY f.ano DESC
      `;
      const result = await db.query(query, [atorId]);
      return result.rows;
    } catch (error) {
      console.error("Erro ao obter filmes do ator:", error);
      throw error;
    }
  },

  // Atualizar ator
  async update(id, atorData) {
    try {
      const { nome, foto, nacionalidade, data_nascimento, biografia } =
        atorData;

      const query = `
        UPDATE atores
        SET nome = ?, foto = ?, nacionalidade = ?, data_nascimento = ?, biografia = ?
        WHERE id = $13
      `;

      await db.query(query, [
        nome,
        foto,
        nacionalidade,
        data_nascimento,
        biografia,
        id,
      ]);

      return { id, ...atorData };
    } catch (error) {
      console.error("Erro ao atualizar ator:", error);
      throw error;
    }
  },

  // Deletar ator
  async delete(id) {
    try {
      const query = "DELETE FROM atores WHERE id = $1";
      await db.query(query, [id]);
      return { message: "Ator deletado com sucesso" };
    } catch (error) {
      console.error("Erro ao deletar ator:", error);
      throw error;
    }
  },
};

export default Ator;
