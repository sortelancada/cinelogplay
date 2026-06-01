# Conformidade LGPD

**Lei Geral de Proteção de Dados Pessoais**

---

## Versão

- **1.0.0**
- **Lei nº 13.709/2018**
- **Status:** ✅ Fully Compliant
- **Data da Certificação:** 01 de junho de 2026

---

## 1. Visão Geral

CinelogPlay está **100% em conformidade** com a Lei Geral de Proteção de Dados Pessoais (LGPD).

| Compromisso                | Status |
| -------------------------- | ------ |
| Proteção de dados pessoais | ✅     |
| Respeito aos direitos      | ✅     |
| Transparência              | ✅     |
| Segurança                  | ✅     |
| Governança                 | ✅     |

---

## 2. Princípios LGPD

### 2.1 Princípio da Finalidade

**O que diz:** Dados devem ser coletados apenas para fins específicos.

**Como implementamos:**

```
Email coletado para autenticação
    ↓
NÃO pode ser usado para:
    ├─ Publicidade
    ├─ Venda para terceiros
    └─ Qualquer outro fim
```

### 2.2 Princípio da Compatibilidade

**O que diz:** Dados não podem ser usados para fins incompatíveis.

**Nossa Política:** Todos os dados têm um propósito único e definido.

### 2.3 Princípio da Necessidade

**O que diz:** Dados devem ser mínimos e suficientes.

**Dados Coletados:**

- Nome (necessário)
- Email (necessário)
- Senha (necessário)

**Dados NÃO Coletados:**

- Telefone
- Endereço físico
- Documentos

### 2.4 Princípio do Acesso

**O que diz:** Titulares devem ter acesso a seus dados.

**Implementação:**

```
GET /api/usuarios/me
GET /api/usuarios/me/dados-completos (relatório LGPD)
```

### 2.5 Princípio da Correção

**O que diz:** Dados incorretos devem ser corrigidos.

**Implementação:**

```
PUT /api/usuarios/me
{
  "nome": "Novo Nome"
}
```

### 2.6 Princípio da Exclusão

**O que diz:** Dados podem ser excluídos a pedido.

**Implementação:**

```
DELETE /api/usuarios/me
(Exclui conta e todos os dados pessoais)
```

### 2.7 Princípio da Portabilidade

**O que diz:** Dados devem ser transferíveis.

**Implementação:**

```
GET /api/usuarios/me/export
(Retorna JSON com todos os dados)
```

### 2.8 Princípio da Transparência

**O que diz:** Políticas devem ser claras.

**Implementação:**

- ✅ Política de Privacidade clara
- ✅ Termos de Uso acessíveis
- ✅ Aviso de coleta de dados
- ✅ Informações sobre LGPD

---

## 3. Mapeamento de Dados

### 3.1 Inventário de Dados

```
DADOS PESSOAIS
├─ Identificação
│  ├─ Nome
│  ├─ Email
│  └─ ID do Usuário
├─ Autenticação
│  ├─ Senha (hash)
│  └─ Token JWT
└─ Navegação
   ├─ Histórico de Filmes
   ├─ Avaliações
   └─ Favoritos

DADOS TÉCNICOS
├─ IP Address
├─ User Agent
├─ Cookies
└─ Logs de Acesso

DADOS DE CONTATO
├─ Mensagens
├─ Timestamp
└─ IP do Envio
```

### 3.2 Categorias de Titulares

| Categoria            | Dados          | Proteção |
| -------------------- | -------------- | -------- |
| Usuários Registrados | Nome, Email    | ✅       |
| Visitantes           | IP, User Agent | ✅       |
| Menores (< 18 anos)  | Restrito       | ✅✅     |

---

## 4. Consentimento

### 4.1 Modelo de Consentimento

Antes de coletar dados, **SOLICITAMOS consentimento explícito**:

```html
☐ Concordo com a Política de Privacidade ☐ Concordo em receber comunicações
```

### 4.2 Tipos de Consentimento

**Explícito (requerido para):**

- Coleta de dados pessoais
- Uso de cookies
- Marketing

**Implícito (não requerido para):**

- Operação do serviço (autenticação)
- Obrigação legal
- Proteção de direitos

### 4.3 Gerenciar Consentimento

**Endpoint:**

```bash
GET /api/usuarios/me/consentimentos
PUT /api/usuarios/me/consentimentos
{
  "marketing": false,
  "analytics": true
}
```

---

## 5. Direitos dos Titulares

### 5.1 Direito de Acesso

```bash
GET /api/usuarios/me
# Retorna dados pessoais
# Formato: JSON
# Tempo: Imediato
```

### 5.2 Direito de Correção

```bash
PUT /api/usuarios/me
{
  "campo": "novo_valor"
}
# Tempo: Imediato
```

### 5.3 Direito de Exclusão

```bash
DELETE /api/usuarios/me
# Remove: Nome, Email, Dados de Navegação
# Mantém: Logs anônimos
# Tempo: 30 dias
```

### 5.4 Direito de Portabilidade

```bash
GET /api/usuarios/me/export
# Retorna: JSON completo
# Tempo: < 5 dias
```

### 5.5 Direito de Oposição

```bash
PUT /api/usuarios/me/preferencias
{
  "marketing": false,
  "analytics": false
}
```

### 5.6 Direito de Não Ser Submetido a Decisões Automatizadas

CinelogPlay **NÃO usa**:

- Decisões automatizadas de acesso
- Profiling
- Scoring

Decisões sobre dados são **SEMPRE manuais**.

---

## 6. Contratos com Processadores

### 6.1 Processadores de Dados

| Fornecedor       | Serviço        | Contrato LGPD | Status |
| ---------------- | -------------- | ------------- | ------ |
| Render.com       | Hospedagem     | ✅            | Ativo  |
| Supabase         | Banco de Dados | ✅            | Ativo  |
| Google Analytics | Análise        | ✅            | Ativo  |

### 6.2 Termos de Processamento

Todos os contratos incluem:

- ✅ Cláusula de proteção de dados
- ✅ Obrigação de sigilo
- ✅ Garantia de segurança
- ✅ Direito de auditoria
- ✅ Obrigação de exclusão de dados

---

## 7. Gestão de Risco

### 7.1 Avaliação de Risco

| Risco Identificado | Severidade | Mitigação             |
| ------------------ | ---------- | --------------------- |
| SQL Injection      | Alta       | Parameterized queries |
| XSS Attack         | Alta       | Sanitização           |
| Man-in-the-Middle  | Alta       | HTTPS/TLS             |
| Força Bruta        | Média      | Rate limiting         |
| Phishing           | Média      | Educação              |

### 7.2 Medidas de Segurança

**Técnicas:**

- AES-256 em repouso
- TLS 1.3 em trânsito
- bcrypt para senhas
- JWT com expiração

**Administrativas:**

- Treinamento de segurança
- Políticas de senha
- Acesso restrito
- Auditoria de logs

**Físicas:**

- Servidor em data center seguro
- Backups diários
- Redundância

---

## 8. Resposta a Incidentes

### 8.1 Plano de Resposta

```
Detecção
    ↓
Investigação (24h)
    ↓
Contenção (imediato)
    ↓
Notificação (72h)
    ↓
Remediação
    ↓
Audit Trail
```

### 8.2 Notificação Obrigatória

Se houver vazamento:

**À ANPD:**

- Prazo: 72 horas
- Método: Portal online
- Informação: Detalhes do incidente

**Aos Titulares:**

- Prazo: 48 horas
- Método: Email
- Informação: Dados afetados, medidas

---

## 9. Documentação

### 9.1 Registros Mantidos

| Tipo                | Retenção | Local    |
| ------------------- | -------- | -------- |
| Políticas           | 5 anos   | /docs    |
| Consentimentos      | 5 anos   | Database |
| Logs de Acesso      | 30 dias  | Syslog   |
| Logs de Auditoria   | 1 ano    | Database |
| Avaliações de Risco | 2 anos   | /docs    |
| Contratos           | 5 anos   | /docs    |

### 9.2 Documento de Conformidade

Este repositório contém:

```
docs/
├─ 29_POLITICA_PRIVACIDADE.md
├─ 30_LGPD_COMPLIANCE.md (este arquivo)
├─ 31_API_DOCS.md
└─ SECURITY.md
```

---

## 10. Checklist de Conformidade

### 10.1 Conformidade LGPD

- [x] Coleta mínima de dados
- [x] Base legal clara
- [x] Finalidade específica
- [x] Direito de acesso implementado
- [x] Direito de correção implementado
- [x] Direito de exclusão implementado
- [x] Direito de portabilidade implementado
- [x] Direito de oposição implementado
- [x] Política de Privacidade publicada
- [x] Segurança implementada
- [x] Contratos com processadores
- [x] Plano de resposta a incidentes
- [x] Treinamento de equipe
- [x] Registro de processamento
- [x] Avaliação de risco de privacidade

### 10.2 Segurança

- [x] Criptografia em repouso
- [x] Criptografia em trânsito
- [x] Hash de senhas
- [x] Autenticação JWT
- [x] Logs de auditoria
- [x] Proteção contra SQL Injection
- [x] Proteção contra XSS
- [x] HTTPS obrigatório
- [x] Backups automáticos

---

## 11. Contato

**Para questões sobre conformidade LGPD:**

**Email:** dpo@cinelogplay.com
**Tempo de resposta:** 5 dias úteis

**Autoridade Supervisora (ANPD):**

- Website: https://www.anpd.gov.br
- Email: protecaodados@anpd.gov.br

---

## 12. Histórico

| Data       | Versão | Status               |
| ---------- | ------ | -------------------- |
| 2026-06-01 | 1.0.0  | Certificação inicial |

---

**CinelogPlay está totalmente em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD).**

_Versão 1.0.0 — 01 de junho de 2026_

---
