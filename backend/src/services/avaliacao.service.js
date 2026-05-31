// backend/src/services/avaliacao.service.js

export async function getAvaliacoesByFilme(filmeId) {
  try {
    const avaliacoes = await Avaliacao.getByFilmeId(filmeId);
    return { success: true, data: avaliacoes, total: avaliacoes.length };
  } catch (error) {
    console.error("Erro no service ao obter avaliações:", error);
    return { success: false, error: error.message };
  }
}

export async function getMediaFilme(filmeId) {
  try {
    const media = await Avaliacao.getMediaFilme(filmeId);
    return { success: true, data: media || null };
  } catch (error) {
    console.error("Erro no service ao obter média de avaliação:", error);
    return { success: false, error: error.message };
  }
}

export async function getAvaliacaoUsuario(usuarioId, filmeId) {
  try {
    const avaliacao = await Avaliacao.getByUsuarioEFilme(usuarioId, filmeId);
    return { success: true, data: avaliacao };
  } catch (error) {
    console.error("Erro no service ao obter avaliação do usuário:", error);
    return { success: false, error: error.message };
  }
}

export async function salvarAvaliacao(avaliacaoData) {
  try {
    const { filme_id, usuario_id, estrelas, comentario } = avaliacaoData;

    // Validações
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
    const avaliacaoExistente = await Avaliacao.getByUsuarioEFilme(
      usuario_id,
      filme_id
    );

    let resultado;
    if (avaliacaoExistente) {
      // Atualiza
      resultado = await Avaliacao.update(avaliacaoExistente.id, {
        estrelas,
        comentario,
      });
    } else {
      // Cria nova
      resultado = await Avaliacao.create({
        filme_id,
        usuario_id,
        estrelas,
        comentario,
      });
    }

    return {
      success: true,
      data: resultado,
      message: "Avaliação salva com sucesso",
    };
  } catch (error) {
    console.error("Erro no service ao salvar avaliação:", error);
    return { success: false, error: error.message };
  }
}

export async function deletarAvaliacao(id) {
  try {
    await Avaliacao.delete(id);
    return { success: true, message: "Avaliação deletada com sucesso" };
  } catch (error) {
    console.error("Erro no service ao deletar avaliação:", error);
    return { success: false, error: error.message };
  }
}
