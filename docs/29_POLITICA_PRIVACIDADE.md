# 🔐 Política de Privacidade

**CinelogPlay**

---

## Versão

- **1.0.0**
- **Data de Vigência:** 01 de junho de 2026
- **Última Atualização:** 01 de junho de 2026
- **Responsável:** Equipe CinelogPlay

---

## 1. Introdução

CinelogPlay ("nós", "nosso" ou "a Plataforma") é comprometida com a proteção de sua privacidade. Esta Política de Privacidade explica:

- Que informações coletamos
- Como usamos essas informações
- Seus direitos sobre os dados
- Como protegemos seus dados

Esta política se aplica a:

- Website: https://cinelogplay.com
- API Backend: https://api.cinelogplay.com
- Aplicações Mobile (futuro)

---

## 2. Dados Coletados

### 2.1 Dados de Registro

Quando você se registra na plataforma, coletamos:

- Nome Completo (obrigatório)
- Endereço de Email (obrigatório)
- Senha (obrigatório)
- Data de Registro (automático)
- IP de Registro (automático)

**Base Legal:** Consentimento do usuário
**Finalidade:** Autenticação e gerenciamento de conta

### 2.2 Dados de Navegação

Quando você usa a plataforma, coletamos:

- Filmes Visualizados
- Filmes Favoritados
- Avaliações Realizadas
- Pesquisas Realizadas
- Tempo de Permanência
- Dispositivo Utilizado
- Sistema Operacional
- Navegador
- Endereço IP

**Base Legal:** Interesse legítimo
**Finalidade:** Melhorar experiência do usuário

### 2.3 Dados de Contato

Se você enviar uma mensagem via formulário de contato:

- Nome
- Email
- Mensagem
- Data/Hora
- IP

**Base Legal:** Consentimento
**Finalidade:** Responder à sua mensagem

### 2.4 Dados de Upload

Se você fazer upload de uma imagem:

- Nome do Arquivo
- Tipo de Arquivo
- Tamanho do Arquivo
- Data/Hora do Upload
- IP do Usuário

**Base Legal:** Consentimento
**Finalidade:** Armazenar e servir a imagem

### 2.5 Dados NÃO Coletados

CinelogPlay **NÃO coleta**:

- Dados de geolocalização em tempo real
- Acesso a câmera ou microfone
- Contatos telefônicos
- Informações bancárias
- Dados biométricos

---

## 3. Como Utilizamos os Dados

| Objetivo           | Dados Utilizados           | Base Legal         | Retenção             |
| ------------------ | -------------------------- | ------------------ | -------------------- |
| Autenticação       | Email, Senha (hash)        | Consentimento      | Enquanto conta ativa |
| Personalização     | Favoritos, Avaliações      | Interesse legítimo | Até exclusão conta   |
| Análise de Uso     | IP, Dispositivo, Navegação | Interesse legítimo | 90 dias              |
| Comunicação        | Email                      | Consentimento      | Enquanto necessário  |
| Segurança          | IP, Logs                   | Interesse legítimo | 30 dias              |
| Conformidade Legal | Todos os dados             | Obrigação legal    | Por lei              |

### NÃO Utilizamos Dados Para:

- Publicidade direcionada (exceto melhorias)
- Venda para terceiros
- Profiling discriminatório
- Rastreamento de atividade fora da plataforma

---

## 4. Compartilhamento de Dados

### 4.1 Com Quem Compartilhamos

**Prestadores de Serviço**

- Servidores em nuvem (Render, Supabase)
- Apenas dados necessários
- Sob contrato de proteção de dados

**Requisição Legal**

- Autoridades públicas
- Quando obrigado por lei
- Com notificação prévia (quando possível)

**Proteção de Direitos**

- Investigação de fraude
- Proteção de segurança
- Aplicação de termos de uso

### 4.2 Com Quem NÃO Compartilhamos

- Empresas de publicidade
- Corretores de dados
- Redes sociais (sem autorização)
- Terceiros para marketing

---

## 5. Retenção de Dados

### 5.1 Política de Retenção

| Tipo de Dado       | Período de Retenção           |
| ------------------ | ----------------------------- |
| Dados de Conta     | Enquanto conta ativa          |
| Dados de Navegação | 90 dias                       |
| Dados de Contato   | 1 ano                         |
| Logs de Segurança  | 30 dias                       |
| Uploads do Usuário | Enquanto mantido pelo usuário |
| Senhas (hash)      | Enquanto conta ativa          |

### 5.2 Exclusão de Dados

Você pode solicitar a exclusão completa em qualquer momento:

1. Acesso à conta
2. Configurações → Privacidade
3. "Deletar Conta"
4. Confirmar identidade
5. Confirmação por email

**Resultado:**

- Dados pessoais deletados em 30 dias
- Uploads removidos imediatamente
- Referências anonimizadas nos registros
- Confirmação por email

---

## 6. Seus Direitos

Sob a LGPD, você tem direito a:

### 6.1 Direito de Acesso

Ver quais dados temos sobre você
**Como:** Contato → Solicitar relatório

### 6.2 Direito de Retificação

Corrigir dados incorretos
**Como:** Configurações da conta

### 6.3 Direito de Exclusão

Remover seus dados
**Como:** Deletar conta

### 6.4 Direito de Portabilidade

Receber dados em formato transportável
**Como:** Contato → Solicitar export

### 6.5 Direito de Oposição

Objetar a certos usos de dados
**Como:** Configurações → Preferências

### 6.6 Direito de Conhecer Decisões Automatizadas

Informação sobre processamento automático
**Como:** Entre em contato

---

## 7. Cookies

### 7.1 O que são Cookies

Pequenos arquivos armazenados no seu navegador para:

- Manter você autenticado
- Lembrar preferências
- Analisar uso

### 7.2 Tipos de Cookies Usados

| Tipo         | Propósito        | Duração |
| ------------ | ---------------- | ------- |
| Sessão       | Autenticação     | Sessão  |
| Preferências | Tema, idioma     | 1 ano   |
| Análise      | Google Analytics | 2 anos  |

### 7.3 Gerenciar Cookies

No navegador:

**Chrome:** Configurações → Privacidade → Cookies e dados de sites
**Firefox:** Preferências → Privacidade → Cookies e dados de sites
**Safari:** Preferências → Privacidade → Cookies e dados de sites

---

## 8. Segurança

### 8.1 Medidas de Proteção

- **Criptografia:** Dados em repouso (AES-256) e em trânsito (TLS 1.3)
- **Autenticação:** JWT com expiração de 1 hora
- **Senhas:** bcrypt com salt
- **Acesso:** Controle baseado em papéis
- **Infraestrutura:** Firewalls, backups automáticos, monitoramento 24/7
- **Equipe:** Treinamento de segurança, acordo de confidencialidade

### 8.2 O Que NÃO Fazemos

- Armazenar senhas em texto plano
- Usar HTTP (sempre HTTPS)
- Compartilhar chaves criptográficas
- Manter backups sem criptografia

---

## 9. Alterações nesta Política

### 9.1 Direito de Alteração

Podemos alterar esta política a qualquer momento. As alterações serão efetivas **30 dias após publicação**.

### 9.2 Como Serão Notificados

1. Email para endereço registrado
2. Banner no website
3. Notificação no app (quando disponível)

### 9.3 Sua Responsabilidade

Você é responsável por:

- Revisar a política periodicamente
- Entender mudanças
- Manifestar desacordo (descontinuar serviço)

---

## 10. Contato

### 10.1 Dúvidas sobre Privacidade

**Email:** privacidade@cinelogplay.com
**Formulário:** https://cinelogplay.com/privacidade
**Tempo de Resposta:** 5 dias úteis

### 10.2 Encarregado de Proteção de Dados (DPO)

**Email:** dpo@cinelogplay.com

### 10.3 Autoridade Supervisora

Se insatisfeito com nossa resposta:

**ANPD (Autoridade Nacional de Proteção de Dados)**

- Website: https://www.anpd.gov.br
- Email: protecaodados@anpd.gov.br
- Telefone: +55 61 4020-7900

---

## 11. Resumo Executivo

| Aspecto             | Posição CinelogPlay         |
| ------------------- | --------------------------- |
| Coleta Mínima       | ✅ Apenas o necessário      |
| Compartilhamento    | ✅ Nenhum sem consentimento |
| Segurança           | ✅ Criptografia completa    |
| Direitos do Usuário | ✅ Todos implementados      |
| Transparência       | ✅ 100%                     |
| LGPD Compliant      | ✅ Sim                      |

---

**Leia este documento completamente antes de usar a plataforma.**

**Ao usar CinelogPlay, você concorda com esta Política de Privacidade.**

---

_Versão 1.0.0 — 01 de junho de 2026_
