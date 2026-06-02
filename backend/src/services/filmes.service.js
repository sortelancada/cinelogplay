/**
 * ============================================
 * FILMES SERVICE
 * ============================================
 * Handles all business logic for films
 * Includes database queries and fallback to mock data
 */

import pool from "../config/db.js";
import { gerarSlug } from "../utils/slug.js";
import filmesMock from "../mock/filmes.json" with { type: "json" };

/**
 * Get all active films from database or fallback to mock
 * @returns {Promise<Object>} - { success, data, message, error, code }
 */
export async function getFilmes() {
  try {
    // Execute query to get all active films from database
    const result = await pool.query(
      "SELECT * FROM filmes WHERE ativo = true ORDER BY titulo ASC"
    );

    // Return films from database
    if (result.rows && result.rows.length > 0) {
      return {
        success: true,
        data: result.rows,
        message: "Filmes obtidos com sucesso do banco de dados",
      };
    }

    // If no films in database, return mock data
    console.warn("[SERVICE] No films in database, using mock data");
    return {
      success: true,
      data: filmesMock,
      message: "Filmes obtidos com sucesso (dados de demonstração)",
    };
  } catch (error) {
    // Log error for debugging
    console.error("[FILMES SERVICE ERROR]", {
      operation: "getFilmes",
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    // Return mock data as fallback
    return {
      success: true,
      data: filmesMock,
      message: "Filmes obtidos com sucesso (modo offline)",
    };
  }
}

/**
 * Get a single film by ID
 * @param {number} id - Film ID
 * @returns {Promise<Object|null>} - Film object or null if not found
 */
export async function getFilmeById(id) {
  try {
    const result = await pool.query(
      "SELECT * FROM filmes WHERE id = $1 AND ativo = true",
      [id]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error("[FILMES SERVICE ERROR]", {
      operation: "getFilmeById",
      filmId: id,
      error: error.message,
    });

    // Try to find in mock data as fallback
    return filmesMock.find((f) => f.id === id) || null;
  }
}

/**
 * Get films by genre
 * @param {string} genre - Film genre
 * @returns {Promise<Array>} - Array of films matching genre
 */
export async function getFilmesByGenero(genre) {
  try {
    const result = await pool.query(
      "SELECT * FROM filmes WHERE LOWER(genero) LIKE LOWER($1) AND ativo = true ORDER BY titulo ASC",
      [`%${genre}%`]
    );

    return result.rows;
  } catch (error) {
    console.error("[FILMES SERVICE ERROR]", {
      operation: "getFilmesByGenero",
      genre: genre,
      error: error.message,
    });

    // Fallback to mock data
    return filmesMock.filter(
      (f) => f.genero?.toLowerCase().includes(genre.toLowerCase())
    );
  }
}

/**
 * Get films by year
 * @param {number} year - Release year
 * @returns {Promise<Array>} - Array of films from that year
 */
export async function getFilmesByAno(year) {
  try {
    const result = await pool.query(
      "SELECT * FROM filmes WHERE ano_lancamento = $1 AND ativo = true ORDER BY titulo ASC",
      [year]
    );

    return result.rows;
  } catch (error) {
    console.error("[FILMES SERVICE ERROR]", {
      operation: "getFilmesByAno",
      year: year,
      error: error.message,
    });

    // Fallback to mock data
    return filmesMock.filter((f) => f.ano_lancamento === year);
  }
}

/**
 * Get films by director
 * @param {number} directorId - Director ID
 * @returns {Promise<Array>} - Array of films by director
 */
export async function getFilmesByDiretor(directorId) {
  try {
    const result = await pool.query(
      "SELECT * FROM filmes WHERE diretor_id = $1 AND ativo = true ORDER BY titulo ASC",
      [directorId]
    );

    return result.rows;
  } catch (error) {
    console.error("[FILMES SERVICE ERROR]", {
      operation: "getFilmesByDiretor",
      directorId: directorId,
      error: error.message,
    });

    return [];
  }
}

/**
 * Search films by title or description
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of matching films
 */
export async function searchFilmes(query) {
  try {
    const searchTerm = `%${query}%`;
    const result = await pool.query(
      "SELECT * FROM filmes WHERE (LOWER(titulo) LIKE LOWER($1) OR LOWER(sinopse) LIKE LOWER($1)) AND ativo = true ORDER BY titulo ASC",
      [searchTerm]
    );

    return result.rows;
  } catch (error) {
    console.error("[FILMES SERVICE ERROR]", {
      operation: "searchFilmes",
      query: query,
      error: error.message,
    });

    // Fallback to mock data
    return filmesMock.filter(
      (f) =>
        f.titulo?.toLowerCase().includes(query.toLowerCase()) ||
        f.sinopse?.toLowerCase().includes(query.toLowerCase())
    );
  }
}

/**
 * Create a new film (admin function)
 * @param {Object} filmeData - Film data object
 * @returns {Promise<Object>} - { success, data, message, error, code }
 */
export async function salvarFilme(filmeData) {
  try {
    const {
      titulo,
      descricao_curta,
      sinopse,
      // aceita tanto `ano` (frontend admin) quanto `ano_lancamento` (padrão DB)
      ano_lancamento,
      ano,
      genero,
      duracao,
      classificacao,
      imagem,
      trailer_youtube,
      diretor_id,
      atores = [],
      tipo = "filme",
    } = filmeData;

    const anoFinal = ano_lancamento ?? ano ?? null;
    // duracao: aceita "120 min", "120", 120 → converte para inteiro
    const duracaoNum = duracao != null && duracao !== ""
      ? (Number.parseInt(String(duracao).replace(/\D/g, ""), 10) || null)
      : null;
    const slug = gerarSlug(titulo);

    const result = await pool.query(
      `INSERT INTO filmes
  (
    titulo,
    slug,
    descricao_curta,
    sinopse,
    ano_lancamento,
    genero,
    duracao,
    classificacao,
    imagem,
    trailer_youtube,
    diretor_id,
    atores,
    tipo,
    ativo,
    criado_em
  )
  VALUES (
    $1, $2, $3, $4, $5,
    $6, $7, $8, $9, $10,
    $11, $12, $13,
    true,
    NOW()
  )
  RETURNING *`,
      [
        titulo,
        slug,
        descricao_curta,
        sinopse,
        anoFinal,
        genero,
        duracaoNum,
        classificacao,
        imagem,
        trailer_youtube,
        diretor_id,
        atores,
        tipo,
      ]
    );

    return {
      success: true,
      data: result.rows[0],
      message: "Filme criado com sucesso",
    };
  } catch (error) {
    console.error("[FILMES SERVICE ERROR]", {
      operation: "salvarFilme",
      error: error.message,
    });

    return {
      success: false,
      error: "Erro ao criar filme",
      code: "CREATE_ERROR",
      details: error.message,
    };
  }
}

/**
 * Update an existing film
 * @param {number} id - Film ID
 * @param {Object} filmeData - Updated film data
 * @returns {Promise<Object>} - Updated film object
 */
export async function updateFilme(id, filmeData) {
  try {
    const updates = [];
    const values = [];
    let paramIndex = 1;

    // Normaliza `ano` → `ano_lancamento` e parseia `duracao` para inteiro
    const data = { ...filmeData };
    if (Object.hasOwn(data, "ano") && !Object.hasOwn(data, "ano_lancamento")) {
      data.ano_lancamento = data.ano;
    }
    delete data.ano;
    if (Object.hasOwn(data, "duracao") && data.duracao != null && data.duracao !== "") {
      data.duracao = parseInt(String(data.duracao).replace(/\D/g, ""), 10) || null;
    }

    // Build dynamic update query
    const allowedFields = [
      "titulo",
      "descricao_curta",
      "sinopse",
      "ano_lancamento",
      "genero",
      "duracao",
      "classificacao",
      "imagem",
      "trailer_youtube",
      "diretor_id",
      "atores",
      "tipo",
      "ativo",
    ];

    for (const field of allowedFields) {
      if (Object.hasOwn(data, field)) {
        updates.push(`${field} = $${paramIndex}`);
        values.push(data[field]);
        paramIndex++;
      }
    }

    if (updates.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(id);

    const query = `
    UPDATE filmes
    SET ${updates.join(", ")}, atualizado_em = NOW()
    WHERE id = $${paramIndex}
    RETURNING *
    `;
    const result = await pool.query(query, values);

    return result.rows[0] || null;
  } catch (error) {
    console.error("[FILMES SERVICE ERROR]", {
      operation: "updateFilme",
      filmId: id,
      error: error.message,
    });
    throw error;
  }
}

/**
 * Soft delete a film (mark as inactive)
 * @param {number} id - Film ID
 * @returns {Promise<boolean>} - True if successful
 */
export async function deleteFilme(id) {
  try {
    const result = await pool.query(
      "UPDATE filmes SET ativo = false, atualizado_em = NOW() WHERE id = $1 RETURNING id",
      [id]
    );

    return result.rows.length > 0;
  } catch (error) {
    console.error("[FILMES SERVICE ERROR]", {
      operation: "deleteFilme",
      filmId: id,
      error: error.message,
    });
    throw error;
  }
}

// ============================================
// WRAPPER COMPATIBILITY LAYER (ROUTES LEGACY)
// ============================================

export async function getFilmesComAvaliacao() {
  try {
    const result = await pool.query(`
      SELECT f.*,
             COALESCE(AVG(av.estrelas), 0) as media_avaliacao,
             COUNT(av.id) as total_avaliacoes
      FROM filmes f
      LEFT JOIN avaliacoes av ON f.id = av.filme_id
      GROUP BY f.id
      ORDER BY f.id ASC
    `);

    return result.rows;
  } catch (error) {
    console.error(error);
    return [];
  }
}
