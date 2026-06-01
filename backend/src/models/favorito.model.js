// ========================================
// MODELO DE FAVORITOS
// ========================================

import db from "../config/db.js";

const Favorito = {
  // Obter todos os favoritos de um usuário
  async getByUsuario(usuarioId) {
    try {
      const query = `
        SELECT f.* FROM filmes f
        JOIN favoritos fav ON f.id = fav.filme_id
        WHERE fav.usuario_id = $1
        ORDER BY fav.criado_em DESC
      `;
      const result = await db.query(query, [usuarioId]);
      return result.rows;
    } catch (error) {
      console.error("Erro ao obter favoritos do usuário:", error);
      throw error;
    }
  },

  // Verificar se um filme é favorito
  async isFavorito(usuarioId, filmeId) {
    try {
      const query = `
        SELECT id FROM favoritos
        WHERE usuario_id = $1 AND filme_id = $2
      `;
      const result = await db.query(query, [usuarioId, filmeId]);
      return result.rows.length > 0;
    } catch (error) {
      console.error("Erro ao verificar favorito:", error);
      throw error;
    }
  },

  // Adicionar favorito
  async create(usuarioId, filmeId) {
    try {
      const query = `
        INSERT INTO favoritos (usuario_id, filme_id)
        VALUES ($1, $2)
        RETURNING *
      `;
      const result = await db.query(query, [usuarioId, filmeId]);
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
      throw error;
    }
  },

  // Remover favorito
  async delete(usuarioId, filmeId) {
    try {
      const query = `
        DELETE FROM favoritos
        WHERE usuario_id = $1 AND filme_id = $2
      `;
      await db.query(query, [usuarioId, filmeId]);
      return { message: "Favorito removido com sucesso" };
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      throw error;
    }
  },

  // Contar favoritos de um filme
  async countByFilme(filmeId) {
    try {
      const query = `
        SELECT COUNT(*) AS total FROM favoritos
        WHERE filme_id = $1
      `;
      const result = await db.query(query, [filmeId]);
      return result.rows[0].total;
    } catch (error) {
      console.error("Erro ao contar favoritos:", error);
      throw error;
    }
  },
};

export default Favorito;
