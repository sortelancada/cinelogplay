-- ============================================
-- CINELOGPLAY DATABASE SCHEMA
-- Version: 1.1.0
-- ============================================

-- ============================================
-- TABLE: DIRETORES
-- ============================================

CREATE TABLE IF NOT EXISTS diretores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE,
  nacionalidade VARCHAR(100),
  data_nascimento DATE,
  biografia TEXT,
  principais_obras TEXT,
  foto VARCHAR(500),
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_diretores_nome ON diretores(nome);
CREATE INDEX IF NOT EXISTS idx_diretores_ativo ON diretores(ativo);

-- ============================================
-- TABLE: ATORES
-- ============================================

CREATE TABLE IF NOT EXISTS atores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  foto VARCHAR(500),
  nacionalidade VARCHAR(100),
  data_nascimento DATE,
  biografia TEXT,
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_atores_nome ON atores(nome);

-- ============================================
-- TABLE: FILMES
-- ============================================

CREATE TABLE IF NOT EXISTS filmes (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(500) NOT NULL UNIQUE,
  descricao_curta VARCHAR(500),
  sinopse TEXT,
  ano INTEGER,
  genero VARCHAR(100),
  duracao VARCHAR(20),
  classificacao VARCHAR(5),
  imagem VARCHAR(500),
  trailer_youtube VARCHAR(500),
  diretor_id INTEGER REFERENCES diretores(id) ON DELETE SET NULL,
  atores TEXT[] DEFAULT '{}',
  tipo VARCHAR(50) DEFAULT 'filme',
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_filmes_titulo ON filmes(titulo);
CREATE INDEX IF NOT EXISTS idx_filmes_diretor_id ON filmes(diretor_id);
CREATE INDEX IF NOT EXISTS idx_filmes_ativo ON filmes(ativo);
CREATE INDEX IF NOT EXISTS idx_filmes_ano ON filmes(ano);
CREATE INDEX IF NOT EXISTS idx_filmes_genero ON filmes(genero);

-- ============================================
-- TABLE: FILME_ATORES (join)
-- ============================================

CREATE TABLE IF NOT EXISTS filme_atores (
  filme_id INTEGER NOT NULL REFERENCES filmes(id) ON DELETE CASCADE,
  ator_id INTEGER NOT NULL REFERENCES atores(id) ON DELETE CASCADE,
  PRIMARY KEY (filme_id, ator_id)
);

-- ============================================
-- TABLE: AVALIACOES
-- ============================================

CREATE TABLE IF NOT EXISTS avaliacoes (
  id SERIAL PRIMARY KEY,
  filme_id INTEGER NOT NULL REFERENCES filmes(id) ON DELETE CASCADE,
  usuario_id VARCHAR(255) NOT NULL,
  estrelas INTEGER NOT NULL,
  comentario TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_estrelas CHECK (estrelas BETWEEN 1 AND 5),
  CONSTRAINT unique_avaliacao_usuario_filme UNIQUE (usuario_id, filme_id)
);

CREATE INDEX IF NOT EXISTS idx_avaliacoes_filme_id ON avaliacoes(filme_id);
CREATE INDEX IF NOT EXISTS idx_avaliacoes_usuario_id ON avaliacoes(usuario_id);

-- ============================================
-- TABLE: FAVORITOS
-- ============================================

CREATE TABLE IF NOT EXISTS favoritos (
  id SERIAL PRIMARY KEY,
  usuario_id VARCHAR(255) NOT NULL,
  filme_id INTEGER NOT NULL REFERENCES filmes(id) ON DELETE CASCADE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_favorito_usuario_filme UNIQUE (usuario_id, filme_id)
);

CREATE INDEX IF NOT EXISTS idx_favoritos_usuario_id ON favoritos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_favoritos_filme_id ON favoritos(filme_id);

-- ============================================
-- TABLE: CONTATOS
-- ============================================

CREATE TABLE IF NOT EXISTS contatos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  assunto VARCHAR(255),
  mensagem TEXT NOT NULL,
  lido BOOLEAN DEFAULT false,
  respondido BOOLEAN DEFAULT false,
  resposta TEXT,
  respondido_em TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contatos_email ON contatos(email);
CREATE INDEX IF NOT EXISTS idx_contatos_lido ON contatos(lido);
CREATE INDEX IF NOT EXISTS idx_contatos_criado_em ON contatos(criado_em DESC);
CREATE INDEX IF NOT EXISTS idx_contatos_respondido ON contatos(respondido);

-- ============================================
-- CONSTRAINTS
-- ============================================

ALTER TABLE contatos DROP CONSTRAINT IF EXISTS valid_email;
ALTER TABLE contatos
ADD CONSTRAINT valid_email
CHECK (
  email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

ALTER TABLE filmes DROP CONSTRAINT IF EXISTS valid_classificacao;
ALTER TABLE filmes
ADD CONSTRAINT valid_classificacao
CHECK (
  classificacao IN (
    'L', '10', '12', '14', '16', '18',
    '10+', '12+', '14+', '16+', '18+'
  )
);

ALTER TABLE filmes DROP CONSTRAINT IF EXISTS valid_ano;
ALTER TABLE filmes
ADD CONSTRAINT valid_ano
CHECK (
  ano >= 1800
  AND ano <= EXTRACT(YEAR FROM CURRENT_DATE) + 5
);

-- ============================================
-- UPDATE TIMESTAMP FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================

DROP TRIGGER IF EXISTS atualizar_timestamp_filmes ON filmes;
CREATE TRIGGER atualizar_timestamp_filmes
BEFORE UPDATE ON filmes
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS atualizar_timestamp_diretores ON diretores;
CREATE TRIGGER atualizar_timestamp_diretores
BEFORE UPDATE ON diretores
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS atualizar_timestamp_contatos ON contatos;
CREATE TRIGGER atualizar_timestamp_contatos
BEFORE UPDATE ON contatos
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS atualizar_timestamp_avaliacoes ON avaliacoes;
CREATE TRIGGER atualizar_timestamp_avaliacoes
BEFORE UPDATE ON avaliacoes
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
