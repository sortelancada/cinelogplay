# UI Guidelines — CinelogPlay

## Proposta

Definir **padrões visuais e de interface** do projeto, garantindo:

- Consistência visual em todas as páginas
- Experiência do usuário fluida
- Interface moderna e acessível
- Responsividade em 3 resoluções

---

## Base tecnológica

- HTML5
- CSS3
- Bootstrap 5.3.x

---

## Estrutura de pastas (Frontend)

```bash
/frontend
  /css
  /js
  /data
  index.html
```
---

## Estrutura de Cores

### Regra principal

> Nenhuma tela deve ser criada fora deste padrão.


### Paleta Principal:

| Cor | Valor | Uso |
|-----|-------|-----|
| Primária | `#1a1a1a` | Fundo principal, texto dark |
| Secundária | `#ff6b6b` | Destaques, CTAs, hover |
| Terciária | `#4ecdc4` | Links, accents |
| Neutra | `#ffffff` | Fundo cards, text light |
| Texto Principal | `#333333` | Corpo de texto |
| Texto Secundário | `#666666` | Labels, descriptions |

### Bootstrap Padrão:

- Usar paleta padrão Bootstrap 5.3.x quando apropriado
- Customizar colors.scss se necessário
- Manter consistência com paleta acima

---

## Tipografia

### Font Stack:

```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

**Fallback:** System fonts (garantir legibilidade)

### Tamanhos e Pesos:

| Elemento | Tamanho | Peso | Line-Height | Uso |
|----------|---------|------|-------------|-----|
| H1 | 36px | 700 | 1.2 | Títulos principais |
| H2 | 28px | 700 | 1.3 | Títulos de seções |
| H3 | 24px | 600 | 1.3 | Subtítulos |
| H4 | 20px | 600 | 1.4 | Títulos pequenos |
| Body | 16px | 400 | 1.5 | Texto padrão |
| Small | 14px | 400 | 1.4 | Labels, hints |
| Extra Small | 12px | 400 | 1.3 | Footnotes |
---

## Espaçamento de Texto:

- **Letter-spacing:** normal (não alterar)
- **Line-height:** conforme tabela acima
- **Margin-bottom:** 1rem entre parágrafos

---

## Cards

### Estrutura HTML:

```html
<div class="card">
  <img src="..." alt="Descrição" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">Título do Card</h5>
    <p class="card-text">Descrição ou conteúdo</p>
  </div>
</div>
```

### Estilos CSS:

```css
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Responsive Grid:

| Resolução | Colunas |
|-----------|---------|
| Mobile (< 576px) | 1 coluna |
| Tablet (576px - 768px) | 2 colunas |
| Desktop (> 768px) | 3-4 colunas |

### Implementação Bootstrap:

```html
<div class="row g-3">
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card">...</div>
  </div>
</div>
```

---

## Botões

### Botão Primário:

```css
.btn-primary {
  background-color: #ff6b6b;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #e55555;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.btn-primary:active {
  background-color: #cc4444;
  transform: scale(0.98);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Estados:

| Estado | Aparência |
|--------|-----------|
| Normal | Cor padrão (#ff6b6b) |
| Hover | Cor mais escura (#e55555) + shadow |
| Active | Cor escura (#cc4444) + scale down |
| Focus | Outline azul (acessibilidade) |
| Disabled | Opacidade 0.5, cursor not-allowed |

### Tamanhos:

```css
.btn-sm { padding: 6px 12px; font-size: 12px; }
.btn-md { padding: 10px 20px; font-size: 16px; } /* padrão */
.btn-lg { padding: 14px 28px; font-size: 18px; }
```

---

## Responsividade

### Breakpoints (Bootstrap 5):

```css
@media (max-width: 575.98px) {
  /* Devices < 576px (Mobile) */
}

@media (min-width: 576px) and (max-width: 767.98px) {
  /* Devices 576px - 768px (Tablet) */
}

@media (min-width: 768px) {
  /* Devices >= 768px (Desktop) */
}
```

### Grid System:

```html
<!-- Responsivo automático com Bootstrap -->
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <!-- 1 col mobile, 2 col tablet, 3 col desktop -->
    </div>
  </div>
</div>
```

### Padding/Margin Responsivo:

| Resolução | Padding | Margin |
|-----------|---------|--------|
| Mobile | 12px | 8px |
| Tablet | 16px | 12px |
| Desktop | 24px | 16px |

---

## Navbar

### Componentes Obrigatórios:

-  Logo à esquerda (clickável - leva para home)
-  Menu links ao centro/direita
-  Hambúrguer menu (mobile, < 768px)
-  Sticky ao topo (fixo ao scroll)

### Links de Navegação:

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="/">Logo</a>
    <button class="navbar-toggler" ...>
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/diretores">Diretores</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/contato">Contato</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

### CSS Adicional:

```css
.navbar {
  position: sticky;
  top: 0;
  z-index: 1020;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: 700;
  font-size: 24px;
  transition: opacity 0.3s;
}

.navbar-brand:hover {
  opacity: 0.8;
}

.nav-link {
  margin: 0 10px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ff6b6b !important;
}
```

---

## Layouts das Páginas

### Home

**Seções:**

1. **Navbar** (sticky)
2. **Hero/Banner** (com imagem de fundo)
3. **Filmes em Destaque** (cards grid)
   - 3 colunas desktop, 2 tablet, 1 mobile
   - Cards com imagem, título, ano, gênero
4. **Lançamentos** (carrossel ou grid)
   - Mínimo 5-8 filmes
5. **Gêneros** (cards clicáveis)
   - Grid de cards com nomes de gêneros
6. **Clássicos** (grid de filmes)
   - Grid com mais filmes clássicos
7. **Footer** (rodapé)
   - Links úteis, redes sociais, copyright

### Diretores

**Layout:**

1. **Navbar** (sticky)
2. **Título da página** ("Diretores Icônicos")
3. **Grid de Cards**
   - Cada card com: foto, nome, nacionalidade, principais obras
   - 3 colunas desktop, 2 tablet, 1 mobile
4. **Footer**

### Contato

**Layout:**

1. **Navbar** (sticky)
2. **Título da página** ("Entre em Contato")
3. **Formulário**
4. **Footer**

---

## Formulários

### Estrutura HTML:

```html
<form>
  <div class="form-group mb-3">
    <label for="name" class="form-label">Nome:</label>
    <input 
      type="text" 
      id="name" 
      name="name"
      class="form-control" 
      placeholder="Seu nome"
      required
    >
  </div>

  <div class="form-group mb-3">
    <label for="email" class="form-label">Email:</label>
    <input 
      type="email" 
      id="email" 
      name="email"
      class="form-control" 
      placeholder="seu@email.com"
      required
    >
  </div>

  <div class="form-group mb-3">
    <label for="message" class="form-label">Mensagem:</label>
    <textarea 
      id="message" 
      name="message"
      class="form-control" 
      rows="5"
      placeholder="Sua mensagem"
      required
    ></textarea>
  </div>

  <button type="submit" class="btn btn-primary">Enviar</button>
</form>
```

### Validação Visual CSS:

```css
/* Input focus */
.form-control:focus {
  border-color: #4ecdc4;
  box-shadow: 0 0 0 0.2rem rgba(78, 205, 196, 0.25);
}

/* Input inválido */
.form-control.is-invalid {
  border-color: #dc3545;
}

.form-control.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

/* Input válido */
.form-control.is-valid {
  border-color: #28a745;
}

.form-control.is-valid:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

/* Mensagens de feedback */
.invalid-feedback,
.valid-feedback {
  display: block;
  font-size: 12px;
  margin-top: 0.25rem;
}
```

---

## Efeitos e Transições

### Hover Effects:

```css
/* Cards */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Links */
a {
  transition: color 0.3s ease;
}

a:hover {
  color: #ff6b6b;
  text-decoration: none;
}

/* Botões */
.btn {
  transition: all 0.3s ease;
}
```

### Transições Padrão:

```css
* {
  transition: all 0.3s ease-in-out;
}
```

### Animações CSS:

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-in-up {
  animation: slideInUp 0.5s ease-in-out;
}
```

---

## Acessibilidade

### Contraste de Cores:

-  Texto escuro em fundo claro (mínimo WCAG AA)
-  Texto claro em fundo escuro (mínimo WCAG AA)

### Atributos HTML:

```html
<!-- Alt text em imagens -->
<img src="..." alt="Descrição clara da imagem">

<!-- Labels associadas a inputs -->
<label for="email">Email:</label>
<input id="email" type="email">

<!-- Headings em ordem (H1 → H2 → H3...) -->
<h1>Título Principal</h1>
<h2>Subtítulo</h2>

<!-- Buttons ao invés de divs -->
<button type="button">Clique aqui</button>
```

### Navegação por Teclado:

- Todos elementos interativos devem ter `outline` no focus
- Tab order deve ser lógico (esquerda → direita, cima → baixo)

---

## Desenvolvendo com estes guidelines

### Estrutura CSS (`frontend/css/style.css`):

```css
/* ==================== 
   VARIÁVEIS GLOBAIS
   ==================== */
:root {
  --color-primary: #1a1a1a;
  --color-secondary: #ff6b6b;
  --color-tertiary: #4ecdc4;
  --color-light: #ffffff;
  --color-text: #333333;
}

/* ==================== 
   ESTILOS GLOBAIS
   ==================== */
* {
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--color-text);
  line-height: 1.5;
}

/* ==================== 
   NAVBAR
   ==================== */
.navbar {
  /* estilos aqui */
}

/* ==================== 
   CARDS
   ==================== */
.card {
  /* estilos aqui */
}

/* ==================== 
   BOTÕES
   ==================== */
.btn {
  /* estilos aqui */
}

/* ==================== 
   FORMULÁRIOS
   ==================== */
.form-control {
  /* estilos aqui */
}

/* ==================== 
   RESPONSIVIDADE
   ==================== */
@media (max-width: 768px) {
  /* Mobile styles */
}
```

### Usar bootstrap classes:

```html
<!-- Container -->
<div class="container">
  <!-- Grid -->
  <div class="row g-3">
    <div class="col-12 col-md-6 col-lg-4">
      <!-- Conteúdo -->
    </div>
  </div>
</div>

<!-- Buttons -->
<button class="btn btn-primary">Primário</button>
<button class="btn btn-secondary">Secundário</button>

<!-- Forms -->
<input class="form-control" type="text">
```

---

## Checklist antes de entregar

### Design:

- [ ] Cores seguem a paleta definida
- [ ] Tipografia consistente (tamanhos e pesos)
- [ ] Cards com border-radius 8px
- [ ] Botões com todos os estados definidos
- [ ] Hover effects em elementos interativos
- [ ] Sombras consistentes

### Responsividade:

- [ ] Testado em mobile
- [ ] Testado em tablet
- [ ] Testado em desktop
- [ ] Grid responsivo funcionando
- [ ] Navbar com hambúrguer em mobile
- [ ] Sem horizontal scroll

### Acessibilidade:

- [ ] Contraste adequado (WCAG AA)
- [ ] Alt text em todas as imagens
- [ ] Labels associadas a inputs
- [ ] Navegação por teclado funciona
- [ ] Focus outline visível

### Qualidade:

- [ ] Sem erros no console
- [ ] Sem warnings desnecessários
- [ ] CSS organizado e comentado
- [ ] Sem código duplicado
- [ ] Performance adequada (sem lag)

---

## Referências

- [Bootstrap 5.3.x Docs](https://getbootstrap.com/docs/5.3/)
- [MDN CSS Guidelines](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [W3C Accessibility](https://www.w3.org/WAI/)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Boas práticas

- Código limpo e organizado
- Sem CSS duplicado
- Sem inline styles
- Reutilização de componentes

---

## Integração com dados

### Regras

- Dados devem vir de:
  - API (quando disponível)
  - Mock (fallback)

---

- Interface nunca deve quebrar sem dados

---

## Estados da interface

### Carregamento

- Exibir mensagem ou loading

---

### Sem dados

- Exibir mensagem amigável

---

### Erro

- Não quebrar layout
- Mostrar fallback

---

## Responsividade (OBRIGATÓRIO)

Testar em:

- 1920px
- 1024px
- 768px
- 375px

---

## Consistência visual

Todas as páginas devem:

- seguir mesma estrutura
- usar mesmos componentes
- manter padrão visual

---

## Erros críticos (EVITAR)

- layout quebrado em mobile
- estilos diferentes entre páginas
- não usar Bootstrap
- CSS desorganizado
- ausência de responsividade

---

## Resultado

- interface consistente
- layout responsivo
- experiência uniforme
- fácil manutenção

---
