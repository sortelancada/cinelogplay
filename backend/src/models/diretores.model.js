// ========================================
// MODELO DE DIRETORES
// ========================================

import db from "../config/db.js";

const Diretor = {
  // Obter todos os diretores
  async getAll() {
    try {
      const query = "SELECT * FROM diretores ORDER BY nome ASC";
      const [diretores] = await db.query(query);
      return diretores;
    } catch (error) {
      console.error("Erro ao obter diretores:", error);
      throw error;
    }
  },

  // Obter diretor por ID
  async getById(id) {
    try {
      const query = "SELECT * FROM diretores WHERE id = $13";
      const [diretores] = await db.query(query, [id]);
      return diretores[0];
    } catch (error) {
      console.error("Erro ao obter diretor:", error);
      throw error;
    }
  },

  // Criar novo diretor
  async create(diretorData) {
    try {
      const {
        nome,
        foto,
        nacionalidade,
        data_nascimento,
        biografia,
        principais_obras,
      } = diretorData;

      const query = `
        INSERT INTO diretores (nome, foto, nacionalidade, data_nascimento, biografia, principais_obras)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const result = await db.query(query, [
        nome,
        foto,
        nacionalidade,
        data_nascimento,
        biografia,
        principais_obras,
      ]);

      return { id: result.insertId, ...diretorData };
    } catch (error) {
      console.error("Erro ao criar diretor:", error);
      throw error;
    }
  },

  // Obter filmes de um diretor
  async getFilmes(diretorId) {
    try {
      const query = `
        SELECT * FROM filmes
        WHERE diretor_id = ?
        ORDER BY ano DESC
      `;
      const result = await db.query(query, [diretorId]);
      return result.rows;
    } catch (error) {
      console.error("Erro ao obter filmes do diretor:", error);
      throw error;
    }
  },

  // Atualizar diretor
  async update(id, diretorData) {
    try {
      const {
        nome,
        foto,
        nacionalidade,
        data_nascimento,
        biografia,
        principais_obras,
      } = diretorData;

      const query = `
        UPDATE diretores
        SET nome = ?, foto = ?, nacionalidade = ?, data_nascimento = ?, biografia = ?, principais_obras = ?
        WHERE id = $13
      `;

      await db.query(query, [
        nome,
        foto,
        nacionalidade,
        data_nascimento,
        biografia,
        principais_obras,
        id,
      ]);

      return { id, ...diretorData };
    } catch (error) {
      console.error("Erro ao atualizar diretor:", error);
      throw error;
    }
  },

  // Deletar diretor
  async delete(id) {
    try {
      const query = "DELETE FROM diretores WHERE id = $1";
      await db.query(query, [id]);
      return { message: "Diretor deletado com sucesso" };
    } catch (error) {
      console.error("Erro ao deletar diretor:", error);
      throw error;
    }
  },
};

export default Diretor;
