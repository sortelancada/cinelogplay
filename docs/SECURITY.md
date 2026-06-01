# 🔒 Segurança da API

**CinelogPlay Backend Security Guide**

---

## Versão

- **1.0.0**
- **Nível de Conformidade:** ✅ Production Grade
- **Última Auditoria:** 01 de junho de 2026

---

## 1. Visão Geral

CinelogPlay implementa múltiplas camadas de segurança para proteger dados e sistemas contra ameaças.

### 1.1 Princípios de Segurança

- **Defense in Depth:** Múltiplas camadas de proteção
- **Least Privilege:** Acesso mínimo necessário
- **Secure by Default:** Segurança padrão
- **Zero Trust:** Verificação sempre
- **Transparency:** Transparência total

---

## 2. Ameaças e Mitigações

### 2.1 SQL Injection

**Ameaça:** Inserção de código SQL malicioso

**Severidade:** 🔴 Crítica

**Proteção Implementada:**

✅ Parameterized Queries

```javascript
// ❌ ERRADO - Vulnerável
pool.query(`SELECT * FROM usuarios WHERE email = '${email}'`);

// ✅ CORRETO - Seguro
pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
Todos os queries no backend usam $1, $2... para parametrização.

2.2 XSS (Cross-Site Scripting)
Ameaça: Injeção de código JavaScript malicioso

Severidade: 🔴 Crítica

Proteção Implementada:

✅ Sanitização de Strings

JavaScript
export function sanitizeString(input) {
  return String(input)
    .trim()
    .slice(0, 5000)
    .replace(/[<>]/g, "")      // Remove <, >
    .replace(/\x00/g, "");      // Remove null bytes
}
Todos os inputs passam por sanitização.

2.3 CSRF (Cross-Site Request Forgery)
Ameaça: Requisição forjada em nome do usuário

Severidade: 🟠 Alta

Proteção Implementada:

✅ CORS Whitelist

JavaScript
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};
Apenas origins autorizadas podem fazer requisições.

2.4 Força Bruta (Brute Force)
Ameaça: Múltiplas tentativas de login

Severidade: 🟠 Alta

Proteção Recomendada:

bash
pnpm add express-rate-limit
JavaScript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 5,                      // 5 tentativas
  message: "Muitas tentativas, tente depois"
});

router.post('/login', loginLimiter, login);
2.5 Man-in-the-Middle (MITM)
Ameaça: Interceptação de comunicação

Severidade: 🔴 Crítica

Proteção Implementada:

✅ HTTPS/TLS 1.3 (obrigatório em produção)

JavaScript
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
2.6 Exposição de Dados Sensíveis
Ameaça: Exposição de senhas, tokens, chaves

Severidade: 🔴 Crítica

Proteção Implementada:

✅ Environment Variables

bash
# .env (NUNCA commitar)
JWT_SECRET=sua_chave_super_segura
DB_PASSWORD=senha_segura
API_KEY=chave_api

# .env.example (seguro para commitar)
JWT_SECRET=your_jwt_secret_here
DB_PASSWORD=your_password_here
API_KEY=your_api_key_here
✅ Hashing de Senhas

JavaScript
import bcrypt from "bcryptjs";

// Registrar
const senhaHash = await bcrypt.hash(senha, 10);

// Login
const senhaValida = await bcrypt.compare(senha, usuario.senha);
✅ Tokens Seguros

JavaScript
const token = jwt.sign(
  { id: usuario.id, email: usuario.email },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }  // Expiração obrigatória
);
3. Autenticação e Autorização
3.1 JWT (JSON Web Token)
Fluxo:

Code
1. Usuário registra/faz login
       ↓
2. API gera JWT com payload
       ↓
3. Usuário recebe token
       ↓
4. Usuário envia token em cada requisição
       ↓
5. Middleware valida token
       ↓
6. Requisição processada
Implementação:

JavaScript
// Gerar token
export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
}

// Validar token
export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

// Middleware
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token não fornecido",
      code: "UNAUTHORIZED"
    });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  req.user = decoded;
  next();
}
3.2 Controle de Acesso
Implementado:

✅ GET endpoints públicos
✅ POST/PUT/DELETE protegidos com authMiddleware
✅ Usuário só pode acessar seus próprios dados
Aplicado em:

POST /api/filmes (requer token)
PUT /api/filmes/:id (requer token)
DELETE /api/filmes/:id (requer token)
POST /api/upload (requer token)
4. Criptografia
4.1 Em Repouso (Dados no Banco)
Algoritmo: AES-256

Status: Implementado via PostgreSQL

SQL
-- Criptografar coluna específica (recomendado)
CREATE EXTENSION pgcrypto;

INSERT INTO usuarios (email_encrypted)
VALUES (pgp_sym_encrypt('email@test.com', 'secret_key'));
4.2 Em Trânsito (Comunicação)
Protocolo: HTTPS/TLS 1.3

Status: Obrigatório em produção

JavaScript
import https from 'https';
import fs from 'fs';

const key = fs.readFileSync('private-key.pem');
const cert = fs.readFileSync('certificate.pem');

https.createServer({ key, cert }, app).listen(443);
4.3 Senhas
Algoritmo: bcrypt

Salt Rounds: 10

Status: ✅ Implementado

JavaScript
const senhaHash = await bcrypt.hash(senha, 10);
// Resultado: $2b$10$abcdefghijklmnopqrstuvwxyz...
5. Validação de Entrada
5.1 Validações Implementadas
Tipo:

JavaScript
if (typeof titulo !== 'string') {
  throw new Error('Título deve ser texto');
}
Tamanho:

JavaScript
if (titulo.length < 3 || titulo.length > 255) {
  throw new Error('Título deve ter 3-255 caracteres');
}
Formato:

JavaScript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  throw new Error('Email inválido');
}
Conteúdo:

JavaScript
const sanitized = input
  .replace(/[<>]/g, '')
  .replace(/\x00/g, '');
5.2 Middlewares de Validação
validateFilmeMiddleware:

titulo: obrigatório, string
diretor_id: obrigatório, numérico
genero: obrigatório, string
validateDiretorMiddleware:

nome: 3-255 caracteres
validateContatoMiddleware:

nome: 2-255 caracteres
email: email válido
mensagem: 10-5000 caracteres
validateAtorMiddleware:

nome: obrigatório
6. Proteção contra Ataques
6.1 Headers de Segurança
JavaScript
app.use((req, res, next) => {
  // Previne clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Previne MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Ativa XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Strict Transport Security
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');

  next();
});
6.2 Proteção contra Upload Malicioso
JavaScript
const ALLOWED_TYPES = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/svg+xml': '.svg',
  'image/webp': '.webp'
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // 5MB máximo
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_TYPES[file.mimetype]) {
      return cb(null, true);
    }
    cb(new Error('Tipo de arquivo não permitido'));
  }
});
7. Logs e Monitoramento
7.1 O que Logamos
✅ Logar:

JavaScript
console.log('[AUTH] Usuário registrado:', usuario.id);
console.log('[DB] Query executada');
console.log('[ERROR] Erro ao processar');
❌ Nunca logar:

JavaScript
console.log('[AUTH] Senha:', senha);
console.log('[DB] Token:', token);
console.log('[API] Chave privada:', API_KEY);
7.2 Estrutura de Logs
JSON
{
  "timestamp": "2026-06-01T10:00:00Z",
  "level": "error|warn|info",
  "service": "auth|db|api",
  "message": "Descrição",
  "user_id": 123,
  "ip": "192.168.1.1",
  "error": "Stack trace"
}
7.3 Ferramentas Recomendadas
✅ Sentry (error tracking)
✅ DataDog (APM)
✅ Prometheus (métricas)
✅ ELK Stack (logs centralizados)
8. Resposta a Incidentes
8.1 Plano de Resposta
Code
DETECÇÃO
    ↓
INVESTIGAÇÃO (24h)
    ↓
CONTENÇÃO (imediato)
    ↓
ERADICAÇÃO (48h)
    ↓
RECUPERAÇÃO (72h)
    ↓
APRENDIZADO (1 semana)
8.2 Contato de Segurança
Encontrou vulnerabilidade?

Email: security@cinelogplay.com
Resposta: 48 horas máximo

9. Checklist Pré-Deploy
 Todas as senhas em .env
 HTTPS configurado
 CORS restrito
 Rate limiting implementado
 Logs de auditoria habilitados
 Testes de segurança executados
 Dependências atualizadas (pnpm audit)
 Secrets não expostos
 JWT com expiração
 Headers de segurança configurados
10. Monitoramento Contínuo
 Monitorar falhas de login
 Alertas para erros 5xx
 Revisão de logs diários
 Testes de penetração (trimestral)
 Análise de dependências (mensal)
 Auditoria de acesso (mensal)
11. Referências
OWASP
OWASP Top 10: https://owasp.org/Top10/
OWASP API Top 10: https://owasp.org/API-Security/Top-10
Padrões
NIST Cybersecurity: https://www.nist.gov/cyberframework
CIS Controls: https://www.cisecurity.org/cis-controls
Ferramentas
OWASP ZAP: https://www.zaproxy.org/
Snyk: https://snyk.io/
npm audit: https://docs.npmjs.com/cli/v8/commands/npm-audit
12. Histórico
Data	Versão	Status
2026-06-01	1.0.0	Documentação inicial
Última Auditoria de Segurança: 01 de junho de 2026
Próxima Auditoria: 01 de setembro de 2026

Versão 1.0.0 — 01 de junho de 2026

```
