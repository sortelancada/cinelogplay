/**
 * ============================================
 * CONTATO SERVICE
 * ============================================
 * Handles all business logic for contact messages
 * Includes database persistence and in-memory fallback
 */

import pool from "../config/db.js";

// In-memory storage for contacts when database is unavailable
let contatosMemoria = [];

/**
 * Save a contact message to database or memory
 * @param {Object} contatoData - Contact data
 * @param {string} ipAddress - Client IP address
 * @param {string} userAgent - Client user agent
 * @returns {Promise<Object>} - { success, data, message, error, code }
 */
export async function salvarMensagem(
  contatoData,
  ipAddress = "unknown",
  userAgent = "unknown"
) {
  try {
    const { nome, email, mensagem, assunto = "" } = contatoData;

    // Try to save to database first
    const result = await pool.query(
      `INSERT INTO contatos
       (nome, email, assunto, mensagem, ip_address, user_agent, lido, respondido, criado_em)
       VALUES ($1, $2, $3, $4, $5, $6, false, false, NOW())
       RETURNING id, nome, email, assunto, mensagem, criado_em`,
      [nome, email, assunto, mensagem, ipAddress, userAgent]
    );

    console.log("[CONTATO SERVICE] Message saved to database", {
      contactId: result.rows[0].id,
      email: email,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      data: result.rows[0],
      message: "Mensagem salva com sucesso",
    };
  } catch (dbError) {
    // If database fails, save to memory as fallback
    console.error("[CONTATO SERVICE] Database error, saving to memory", {
      error: dbError.message,
      email: contatoData.email,
    });

    const contatoId = Date.now(); // Simple ID generation
    const contatoEmMemoria = {
      id: contatoId,
      nome: contatoData.nome,
      email: contatoData.email,
      assunto: contatoData.assunto || "",
      mensagem: contatoData.mensagem,
      ip_address: ipAddress,
      user_agent: userAgent,
      lido: false,
      respondido: false,
      criado_em: new Date().toISOString(),
      origem: "memoria", // Mark as in-memory storage
    };

    contatosMemoria.push(contatoEmMemoria);

    // Keep only last 100 messages in memory
    if (contatosMemoria.length > 100) {
      contatosMemoria = contatosMemoria.slice(-100);
    }

    console.log("[CONTATO SERVICE] Message saved to memory", {
      totalInMemory: contatosMemoria.length,
      email: contatoData.email,
    });

    return {
      success: true,
      data: contatoEmMemoria,
      message: "Mensagem salva com sucesso (modo offline)",
    };
  }
}

/**
 * Get all contact messages (admin function)
 * @param {Object} filters - Optional filters { lido, respondido, limit, offset }
 * @returns {Promise<Array>} - Array of contact messages
 */
export async function obterContatos(filters = {}) {
  try {
    const { lido = null, respondido = null, limit = 50, offset = 0 } = filters;

    let query = "SELECT * FROM contatos WHERE 1=1";
    const values = [];
    let paramIndex = 1;

    if (lido !== null) {
      query += ` AND lido = $${paramIndex}`;
      values.push(lido);
      paramIndex++;
    }

    if (respondido !== null) {
      query += ` AND respondido = $${paramIndex}`;
      values.push(respondido);
      paramIndex++;
    }

    query += ` ORDER BY criado_em DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("[CONTATO SERVICE ERROR]", {
      operation: "obterContatos",
      error: error.message,
    });

    // Return in-memory messages as fallback
    return contatosMemoria.slice(0, filters.limit || 50);
  }
}

/**
 * Get a single contact message by ID
 * @param {number} id - Contact ID
 * @returns {Promise<Object|null>} - Contact object or null if not found
 */
export async function obterContatoPorId(id) {
  try {
    const result = await pool.query("SELECT * FROM contatos WHERE id = $1", [
      id,
    ]);

    return result.rows[0] || null;
  } catch (error) {
    console.error("[CONTATO SERVICE ERROR]", {
      operation: "obterContatoPorId",
      contactId: id,
      error: error.message,
    });

    // Try to find in memory
    return contatosMemoria.find((c) => c.id === id) || null;
  }
}

/**
 * Get all messages from a specific email
 * @param {string} email - Email address
 * @returns {Promise<Array>} - Array of contact messages
 */
export async function obterContatosPorEmail(email) {
  try {
    const result = await pool.query(
      "SELECT * FROM contatos WHERE LOWER(email) = LOWER($1) ORDER BY criado_em DESC",
      [email]
    );

    return result.rows;
  } catch (error) {
    console.error("[CONTATO SERVICE ERROR]", {
      operation: "obterContatosPorEmail",
      email: email,
      error: error.message,
    });

    // Fallback to memory
    return contatosMemoria.filter(
      (c) => c.email.toLowerCase() === email.toLowerCase()
    );
  }
}

/**
 * Mark a contact as read
 * @param {number} id - Contact ID
 * @returns {Promise<boolean>} - True if successful
 */
export async function marcarComoLido(id) {
  try {
    const result = await pool.query(
      "UPDATE contatos SET lido = true, atualizado_em = NOW() WHERE id = $3 RETURNING id",
      [id]
    );

    return result.rows.length > 0;
  } catch (error) {
    console.error("[CONTATO SERVICE ERROR]", {
      operation: "marcarComoLido",
      contactId: id,
      error: error.message,
    });

    // Try to mark in memory
    const contato = contatosMemoria.find((c) => c.id === id);
    if (contato) {
      contato.lido = true;
      return true;
    }

    return false;
  }
}

/**
 * Add a response to a contact message
 * @param {number} id - Contact ID
 * @param {string} resposta - Response message
 * @returns {Promise<boolean>} - True if successful
 */
export async function responderContato(id, resposta) {
  try {
    const result = await pool.query(
      "UPDATE contatos SET resposta = $1, respondido = true, respondido_em = NOW(), atualizado_em = NOW() WHERE id = $1 $2 RETURNING id",
      [resposta, id]
    );

    return result.rows.length > 0;
  } catch (error) {
    console.error("[CONTATO SERVICE ERROR]", {
      operation: "responderContato",
      contactId: id,
      error: error.message,
    });

    // Try to update in memory
    const contato = contatosMemoria.find((c) => c.id === id);
    if (contato) {
      contato.resposta = resposta;
      contato.respondido = true;
      contato.respondido_em = new Date().toISOString();
      return true;
    }

    return false;
  }
}

/**
 * Delete a contact message (hard delete)
 * @param {number} id - Contact ID
 * @returns {Promise<boolean>} - True if successful
 */
export async function deletarContato(id) {
  try {
    const result = await pool.query(
      "DELETE FROM contatos WHERE id = $1 RETURNING id",
      [id]
    );

    return result.rows.length > 0;
  } catch (error) {
    console.error("[CONTATO SERVICE ERROR]", {
      operation: "deletarContato",
      contactId: id,
      error: error.message,
    });

    // Try to delete from memory
    const index = contatosMemoria.findIndex((c) => c.id === id);
    if (index > -1) {
      contatosMemoria.splice(index, 1);
      return true;
    }

    return false;
  }
}

/**
 * Get statistics about contacts
 * @returns {Promise<Object>} - Contact statistics
 */
export async function obterEstatisticas() {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) as total,
        COUNT(CASE WHEN lido = true THEN 1 END) as lidos,
        COUNT(CASE WHEN respondido = true THEN 1 END) as respondidos,
        COUNT(CASE WHEN lido = false THEN 1 END) as nao_lidos
      FROM contatos
    `);

    return (
      result.rows[0] || { total: 0, lidos: 0, respondidos: 0, nao_lidos: 0 }
    );
  } catch (error) {
    console.error("[CONTATO SERVICE ERROR]", {
      operation: "obterEstatisticas",
      error: error.message,
    });

    // Return in-memory statistics as fallback
    return {
      total: contatosMemoria.length,
      lidos: contatosMemoria.filter((c) => c.lido).length,
      respondidos: contatosMemoria.filter((c) => c.respondido).length,
      nao_lidos: contatosMemoria.filter((c) => !c.lido).length,
      origem: "memoria",
    };
  }
}

/**
 * Get unread messages count
 * @returns {Promise<number>} - Count of unread messages
 */
export async function obterContadorNaoLidos() {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) as total FROM contatos WHERE lido = false"
    );

    return parseInt(result.rows[0].total) || 0;
  } catch (error) {
    console.error("[CONTATO SERVICE ERROR]", {
      operation: "obterContadorNaoLidos",
      error: error.message,
    });

    // Fallback to memory count
    return contatosMemoria.filter((c) => !c.lido).length;
  }
}
