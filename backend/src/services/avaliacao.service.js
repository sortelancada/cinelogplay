// ========================================
// AVALIACAO SERVICE
// ========================================

import pool from "../config/db.js";

export async function getAvaliacoesByFilme(filmeId) {
  try {
    const result = await pool.query(
      "SELECT * FROM avaliacoes WHERE filme_id = $1 ORDER BY criado_em DESC",
      [filmeId]
    );
    return { success: true, data: result.rows, total: result.rows.length };
  } catch (error) {
    console.error("Erro no service ao obter avaliações:", error);
    return { success: false, error: error.message };
  }
}

export async function getMediaFilme(filmeId) {
  try {
    const result = await pool.query(
      `SELECT
        COALESCE(ROUND(AVG(estrelas)::numeric, 2), 0) AS media,
        COUNT(*) AS total
       FROM avaliacoes
       WHERE filme_id = $1`,
      [filmeId]
    );
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error("Erro no service ao obter média:", error);
    return { success: false, error: error.message };
  }
}

export async function getAvaliacaoUsuario(usuarioId, filmeId) {
  try {
    const result = await pool.query(
      "SELECT * FROM avaliacoes WHERE usuario_id = $1 AND filme_id = $2",
      [usuarioId, filmeId]
    );
    return { success: true, data: result.rows[0] || null };
  } catch (error) {
    console.error("Erro no service ao obter avaliação do usuário:", error);
    return { success: false, error: error.message };
  }
}

export async function salvarAvaliacao(avaliacaoData) {
  try {
    const { filme_id, usuario_id, estrelas, comentario } = avaliacaoData;

    if (!filme_id || !usuario_id || !estrelas) {
      return {
        success: false,
        error: "filme_id, usuario_id e estrelas são obrigatórios",
      };
    }

    if (estrelas < 1 || estrelas > 5) {
      return { success: false, error: "Estrelas devem estar entre 1 e 5" };
    }

    // Verifica se já existe
    const existing = await pool.query(
      "SELECT * FROM avaliacoes WHERE usuario_id = $1 AND filme_id = $2",
      [usuario_id, filme_id]
    );

    let result;
    if (existing.rows.length > 0) {
      result = await pool.query(
        `UPDATE avaliacoes
         SET estrelas = $1, comentario = $2, atualizado_em = NOW()
         WHERE usuario_id = $3 AND filme_id = $4
         RETURNING *`,
        [estrelas, comentario, usuario_id, filme_id]
      );
    } else {
      result = await pool.query(
        `INSERT INTO avaliacoes (filme_id, usuario_id, estrelas, comentario)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [filme_id, usuario_id, estrelas, comentario]
      );
    }

    return {
      success: true,
      data: result.rows[0],
      message: "Avaliação salva com sucesso",
    };
  } catch (error) {
    console.error("Erro no service ao salvar avaliação:", error);
    return { success: false, error: error.message };
  }
}

export async function deletarAvaliacao(id) {
  try {
    await pool.query("DELETE FROM avaliacoes WHERE id = $1", [id]);
    return { success: true, message: "Avaliação deletada com sucesso" };
  } catch (error) {
    console.error("Erro no service ao deletar avaliação:", error);
    return { success: false, error: error.message };
  }
}
