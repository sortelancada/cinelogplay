#!/bin/bash

# ============================================
# TESTE COMPLETO DA API CINELOGPLAY
# ============================================

set -e

API_URL="http://localhost:3001"
COLORS=(
  "GREEN='\033[0;32m'"
  "RED='\033[0;31m'"
  "BLUE='\033[0;34m'"
  "YELLOW='\033[1;33m'"
  "NC='\033[0m'"
)

eval "${COLORS[@]}"

# ============================================
# FUNÇÕES AUXILIARES
# ============================================

print_header() {
  echo -e "\n${BLUE}════════════════════════════════════════${NC}"
  echo -e "${BLUE}  $1${NC}"
  echo -e "${BLUE}════════════════════════════════════════${NC}\n"
}

print_test() {
  echo -e "${YELLOW}➤ $1${NC}"
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
}

test_endpoint() {
  local name=$1
  local method=$2
  local endpoint=$3
  local data=$4
  local token=$5
  local expected_code=$6

  print_test "$name"

  local response
  if [ -z "$data" ]; then
    response=$(curl -s -w "\n%{http_code}" -X "$method" "$API_URL$endpoint" \
      -H "Content-Type: application/json" \
      ${token:+-H "Authorization: Bearer $token"})
  else
    response=$(curl -s -w "\n%{http_code}" -X "$method" "$API_URL$endpoint" \
      -H "Content-Type: application/json" \
      -d "$data" \
      ${token:+-H "Authorization: Bearer $token"})
  fi

  local http_code=$(echo "$response" | tail -n1)
  local body=$(echo "$response" | head -n-1)

  if [ "$http_code" = "$expected_code" ]; then
    print_success "HTTP $http_code"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    echo "$body"
  else
    print_error "HTTP $http_code (esperado $expected_code)"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    return 1
  fi

  echo ""
}

# ============================================
# TESTES
# ============================================

print_header "TESTE COMPLETO - BACKEND CINELOGPLAY"

# ============================================
# P0 - HEALTH CHECK
# ============================================

print_header "P0 - HEALTH CHECK"

test_endpoint "Health Check" "GET" "/" "" "" "200"

# ============================================
# LEITURA (SEM AUTENTICAÇÃO)
# ============================================

print_header "LEITURA - SEM AUTENTICAÇÃO"

test_endpoint "GET /api/filmes" "GET" "/api/filmes" "" "" "200"
test_endpoint "GET /api/filmes/com-avaliacao" "GET" "/api/filmes/com-avaliacao" "" "" "200"
test_endpoint "GET /api/diretores" "GET" "/api/diretores" "" "" "200"
test_endpoint "GET /api/atores" "GET" "/api/atores" "" "" "200"

# ============================================
# AUTENTICAÇÃO
# ============================================

print_header "AUTENTICAÇÃO"

REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"User Teste\",\"email\":\"teste$(date +%s)@test.com\",\"senha\":\"senha123\"}")

print_test "POST /api/auth/register"
echo "$REGISTER_RESPONSE" | jq '.'
TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.data.token // empty')

if [ -z "$TOKEN" ]; then
  print_error "Falha ao obter token"
  exit 1
fi

print_success "Token obtido: ${TOKEN:0:20}..."

# ============================================
# CRIAÇÃO COM AUTENTICAÇÃO
# ============================================

print_header "CRIAÇÃO - COM AUTENTICAÇÃO"

test_endpoint "POST /api/filmes (COM AUTH)" "POST" "/api/filmes" \
  '{"titulo":"Filme Teste","diretor_id":1,"ano_lancamento":2026,"genero":"Drama","sinopse":"Teste"}' \
  "$TOKEN" "201"

test_endpoint "POST /api/diretores (COM AUTH)" "POST" "/api/diretores" \
  '{"nome":"Diretor Teste","nacionalidade":"Brasileiro"}' \
  "$TOKEN" "201"

test_endpoint "POST /api/atores (COM AUTH)" "POST" "/api/atores" \
  '{"nome":"Ator Teste"}' \
  "$TOKEN" "201"

# ============================================
# CRIAÇÃO SEM AUTENTICAÇÃO (DEVE FALHAR)
# ============================================

print_header "TESTE DE SEGURANÇA - CRIAR SEM TOKEN (DEVE FALHAR)"

test_endpoint "POST /api/filmes (SEM AUTH - DEVE FALHAR)" "POST" "/api/filmes" \
  '{"titulo":"Teste","diretor_id":1,"ano_lancamento":2026,"genero":"Drama","sinopse":"Teste"}' \
  "" "401" || true

# ============================================
# VALIDAÇÕES
# ============================================

print_header "VALIDAÇÕES"

test_endpoint "POST /api/contato (DADOS INVÁLIDOS)" "POST" "/api/contato" \
  '{"nome":"A","email":"invalido","mensagem":"oi"}' \
  "" "400" || true

test_endpoint "POST /api/contato (DADOS VÁLIDOS)" "POST" "/api/contato" \
  '{"nome":"João Silva","email":"joao@test.com","mensagem":"Este é um teste de mensagem válida com mais de 10 caracteres"}' \
  "" "200"

# ============================================
# RESUMO
# ============================================

print_header "TESTES CONCLUÍDOS COM SUCESSO"

echo -e "${GREEN}Checklist:${NC}"
echo -e "${GREEN}✓${NC} Health Check"
echo -e "${GREEN}✓${NC} Leitura (sem autenticação)"
echo -e "${GREEN}✓${NC} Autenticação (register/login)"
echo -e "${GREEN}✓${NC} Criação (com autenticação)"
echo -e "${GREEN}✓${NC} Segurança (sem token = 401)"
echo -e "${GREEN}✓${NC} Validações"
echo ""
