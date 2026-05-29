-- ============================================
-- CINELOGPLAY DATABASE SCHEMA
-- Version: 1.0.0
-- Created: 2026-05-10
-- ============================================

-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS contatos CASCADE;
DROP TABLE IF EXISTS filmes CASCADE;
DROP TABLE IF EXISTS diretores CASCADE;

-- ============================================
-- TABLE: DIRETORES
-- ============================================

CREATE TABLE diretores (
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

CREATE INDEX idx_diretores_nome ON diretores(nome);
CREATE INDEX idx_diretores_ativo ON diretores(ativo);

-- ============================================
-- TABLE: FILMES
-- ============================================

CREATE TABLE filmes (
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

CREATE INDEX idx_filmes_titulo ON filmes(titulo);
CREATE INDEX idx_filmes_diretor_id ON filmes(diretor_id);
CREATE INDEX idx_filmes_ativo ON filmes(ativo);
CREATE INDEX idx_filmes_ano ON filmes(ano);

-- ============================================
-- TABLE: CONTATOS
-- ============================================

CREATE TABLE contatos (
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

CREATE INDEX idx_contatos_email ON contatos(email);
CREATE INDEX idx_contatos_lido ON contatos(lido);
CREATE INDEX idx_contatos_criado_em ON contatos(criado_em DESC);
CREATE INDEX idx_contatos_respondido ON contatos(respondido);

-- ============================================
-- CONSTRAINTS
-- ============================================

ALTER TABLE contatos
ADD CONSTRAINT valid_email
CHECK (
  email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

ALTER TABLE filmes
ADD CONSTRAINT valid_classificacao
CHECK (
  classificacao IN (
    'L',
    '10',
    '12',
    '14',
    '16',
    '18',
    '10+',
    '12+',
    '14+',
    '16+',
    '18+'
  )
);

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

CREATE TRIGGER atualizar_timestamp_filmes
BEFORE UPDATE ON filmes
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER atualizar_timestamp_diretores
BEFORE UPDATE ON diretores
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER atualizar_timestamp_contatos
BEFORE UPDATE ON contatos
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE diretores IS
'Armazena informações dos diretores de filmes';

COMMENT ON TABLE filmes IS
'Armazena informações dos filmes do catálogo';

COMMENT ON TABLE contatos IS
'Armazena mensagens de contato enviadas por usuários';

COMMENT ON COLUMN diretores.ativo IS
'Indica se o diretor está ativo no catálogo';

COMMENT ON COLUMN filmes.ativo IS
'Indica se o filme está ativo no catálogo';

COMMENT ON COLUMN contatos.lido IS
'Indica se a mensagem foi lida pelo administrador';

COMMENT ON COLUMN contatos.respondido IS
'Indica se a mensagem foi respondida';
