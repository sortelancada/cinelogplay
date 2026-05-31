/**
 * ============================================
 * DIRETORES SERVICE
 * ============================================
 * Handles all business logic for film directors
 * Includes database queries and fallback to mock data
 */

import pool from "../config/db.js";
import diretoresMock from "../mock/diretores.json" with { type: "json" };

/**
 * Get all active directors from database or fallback to mock
 * @returns {Promise<Object>} - { success, data, message, error, code }
 */
export async function getDiretores() {
  try {
    // Execute query to get all active directors from database
    const result = await pool.query(
      "SELECT * FROM diretores WHERE ativo = true ORDER BY nome ASC"
    );

    // Return directors from database
    if (result.rows && result.rows.length > 0) {
      return {
        success: true,
        data: result.rows,
        message: "Diretores obtidos com sucesso do banco de dados",
      };
    }

    // If no directors in database, return mock data
    console.warn("[SERVICE] No directors in database, using mock data");
    return {
      success: true,
      data: diretoresMock,
      message: "Diretores obtidos com sucesso (dados de demonstração)",
    };
  } catch (error) {
    // Log error for debugging
    console.error("[DIRETORES SERVICE ERROR]", {
      operation: "getDiretores",
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    // Return mock data as fallback
    return {
      success: true,
      data: diretoresMock,
      message: "Diretores obtidos com sucesso (modo offline)",
    };
  }
}

/**
 * Get a single director by ID
 * @param {number} id - Director ID
 * @returns {Promise<Object|null>} - Director object or null if not found
 */
export async function getDiretorById(id) {
  try {
    const result = await pool.query(
      "SELECT * FROM diretores WHERE id = $1 AND ativo = true",
      [id]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error("[DIRETORES SERVICE ERROR]", {
      operation: "getDiretorById",
      directorId: id,
      error: error.message,
    });

    // Try to find in mock data as fallback
    return diretoresMock.find((d) => d.id === id) || null;
  }
}

/**
 * Get a director by name
 * @param {string} nome - Director name
 * @returns {Promise<Object|null>} - Director object or null if not found
 */
export async function getDiretorByNome(nome) {
  try {
    const result = await pool.query(
      "SELECT * FROM diretores WHERE LOWER(nome) = LOWER($1) AND ativo = true",
      [nome]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error("[DIRETORES SERVICE ERROR]", {
      operation: "getDiretorByNome",
      nome: nome,
      error: error.message,
    });

    // Try to find in mock data as fallback
    return (
      diretoresMock.find(
        (d) => d.nome && d.nome.toLowerCase() === nome.toLowerCase()
      ) || null
    );
  }
}

/**
 * Get directors by nationality
 * @param {string} nacionalidade - Nationality
 * @returns {Promise<Array>} - Array of directors from that nationality
 */
export async function getDiretoresByNacionalidade(nacionalidade) {
  try {
    const result = await pool.query(
      "SELECT * FROM diretores WHERE LOWER(nacionalidade) LIKE LOWER($1) AND ativo = true ORDER BY nome ASC",
      [`%${nacionalidade}%`]
    );

    return result.rows;
  } catch (error) {
    console.error("[DIRETORES SERVICE ERROR]", {
      operation: "getDiretoresByNacionalidade",
      nacionalidade: nacionalidade,
      error: error.message,
    });

    // Fallback to mock data
    return diretoresMock.filter(
      (d) =>
        d.nacionalidade &&
        d.nacionalidade.toLowerCase().includes(nacionalidade.toLowerCase())
    );
  }
}

/**
 * Search directors by name or biography
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of matching directors
 */
export async function searchDiretores(query) {
  try {
    const searchTerm = `%${query}%`;
    const result = await pool.query(
      "SELECT * FROM diretores WHERE (LOWER(nome) LIKE LOWER($1) OR LOWER(biografia) LIKE LOWER($1)) AND ativo = true ORDER BY nome ASC",
      [searchTerm]
    );

    return result.rows;
  } catch (error) {
    console.error("[DIRETORES SERVICE ERROR]", {
      operation: "searchDiretores",
      query: query,
      error: error.message,
    });

    // Fallback to mock data
    return diretoresMock.filter(
      (d) =>
        d.nome?.toLowerCase().includes(query.toLowerCase()) ||
        d.biografia?.toLowerCase().includes(query.toLowerCase())
    );
  }
}

/**
 * Get all films by a specific director
 * @param {number} directorId - Director ID
 * @returns {Promise<Array>} - Array of films by director
 */
export async function getFilmesPorDiretor(directorId) {
  try {
    const result = await pool.query(
      "SELECT * FROM filmes WHERE diretor_id = $1 AND ativo = true ORDER BY ano DESC, titulo ASC",
      [directorId]
    );

    return result.rows;
  } catch (error) {
    console.error("[DIRETORES SERVICE ERROR]", {
      operation: "getFilmesPorDiretor",
      directorId: directorId,
      error: error.message,
    });

    return [];
  }
}

/**
 * Create a new director (admin function)
 * @param {Object} diretorData - Director data object
 * @returns {Promise<Object>} - { success, data, message, error, code }
 */
export async function salvarDiretor(diretorData) {
  try {
    const {
      nome,
      nacionalidade,
      data_nascimento,
      biografia,
      principais_obras,
      foto,
    } = diretorData;

    const result = await pool.query(
      `INSERT INTO diretores
       (nome, nacionalidade, data_nascimento, biografia, principais_obras, foto, ativo, criado_em)
       VALUES ($1, $2, $3, $4, $5, $6, true, NOW())
       RETURNING *`,
      [nome, nacionalidade, data_nascimento, biografia, principais_obras, foto]
    );

    return {
      success: true,
      data: result.rows[0],
      message: "Diretor criado com sucesso",
    };
  } catch (error) {
    console.error("[DIRETORES SERVICE ERROR]", {
      operation: "salvarDiretor",
      error: error.message,
    });

    return {
      success: false,
      error: "Erro ao criar diretor",
      code: "CREATE_ERROR",
      details: error.message,
    };
  }
}

/**
 * Update an existing director
 * @param {number} id - Director ID
 * @param {Object} diretorData - Updated director data
 * @returns {Promise<Object>} - Updated director object
 */
export async function updateDiretor(id, diretorData) {
  try {
    const updates = [];
    const values = [];
    let paramIndex = 1;

    // Build dynamic update query
    const allowedFields = [
      "nome",
      "nacionalidade",
      "data_nascimento",
      "biografia",
      "principais_obras",
      "foto",
      "ativo",
    ];

    for (const field of allowedFields) {
      if (diretorData.hasOwnProperty(field)) {
        updates.push(`${field} = $${paramIndex}`);
        values.push(diretorData[field]);
        paramIndex++;
      }
    }

    if (updates.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(id);

    const query = `UPDATE diretores SET ${updates.join(", ")}, atualizado_em = NOW() WHERE id = $${paramIndex} RETURNING *`;
    const result = await pool.query(query, values);

    return result.rows[0] || null;
  } catch (error) {
    console.error("[DIRETORES SERVICE ERROR]", {
      operation: "updateDiretor",
      directorId: id,
      error: error.message,
    });
    throw error;
  }
}

/**
 * Soft delete a director (mark as inactive)
 * @param {number} id - Director ID
 * @returns {Promise<boolean>} - True if successful
 */
export async function deleteDiretor(id) {
  try {
    const result = await pool.query(
      "UPDATE diretores SET ativo = false, atualizado_em = NOW() WHERE id = $1 RETURNING id",
      [id]
    );

    return result.rows.length > 0;
  } catch (error) {
    console.error("[DIRETORES SERVICE ERROR]", {
      operation: "deleteDiretor",
      directorId: id,
      error: error.message,
    });
    throw error;
  }
}
