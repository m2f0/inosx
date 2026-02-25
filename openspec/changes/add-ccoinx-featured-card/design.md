# Design: Add Ccoinx.ai Featured Card

## Context

A homepage do site INOSX (index.html) exibe produtos em destaque em blocos sequenciais. Cada bloco usa a classe `featured-product` com uma variante `featured-{produto}` (ex: `featured-surveyflow`, `featured-psychox`, `featured-datagpt`). Cada card tem estrutura fixa: badge, headline, descrição, feature badges (4), highlights (4), 2 CTAs, e mockup com iframe do produto. O Messiax usa `featured-sacred-texts` (livros sagrados); os demais usam `featured-features` (feature badges). Cores são definidas por variante CSS (`.featured-{produto} .featured-container`, `.featured-badge`, `.btn-featured`, etc.). O i18n usa chaves `featured_{produto}.*` em pt.json, en.json, es.json.

## Goals / Non-Goals

**Goals:**
- Adicionar card featured para ccoinx.ai seguindo o padrão existente
- Manter consistência visual e estrutural com Messiax, SurveyFlow, PsychoX, DataGPT
- Suportar i18n em pt, en, es
- Usar iframe de https://ccoinx.ai no mockup

**Non-Goals:**
- Criar landing page dedicada (ccoinx.html)
- Adicionar ccoinx ao topbar de navegação (avaliar UX separadamente)
- Alterar comportamento de outros cards

## Decisions

### 1. Posição do card
- **Decisão:** Inserir após o card DataGPT (último da sequência).
- **Alternativa considerada:** Entre Messiax e SurveyFlow (mais visível). Rejeitada para manter ordem cronológica de produtos e evitar deslocar cards existentes.

### 2. Paleta de cores
- **Decisão:** Verde/âmbar (dinheiro, confiança). Gradiente `#22c55e` → `#eab308` (green-500 → amber-500).
- **Alternativa considerada:** Azul (confiança). Rejeitada para diferenciar de DataGPT (verde) e SurveyFlow (teal).

### 3. Estrutura do card
- **Decisão:** Usar `featured-features` (4 feature badges) em vez de `featured-sacred-texts`. Ccoinx.ai não tem livros sagrados; features são: OCR, tempo real, privacidade, cotações.
- **Alternativa considerada:** Criar variante específica. Rejeitada para manter consistência com SurveyFlow/PsychoX/DataGPT.

### 4. CTAs
- **Decisão:** Primário → "Conhecer Ccoinx" (link para messiax.html/surveyflow.html não existe para ccoinx; usar link direto para https://ccoinx.ai/converter). Secundário → "Experimentar Agora" (https://ccoinx.ai).
- **Alternativa considerada:** Criar ccoinx.html. Rejeitada para esta mudança (non-goal).

### 5. Chaves i18n
- **Decisão:** `featured_ccoinx` com: badge, headline, description, feature_1..4, highlight_1..4, btn_learn, btn_access, mockup_title, mockup_subtitle, visit_site. `products.ccoinx`, `products.ccoinx_desc`.
- **Alternativa considerada:** Nomes genéricos. Rejeitada para manter padrão com outros produtos.

## Risks / Trade-offs

| Risco | Mitigação |
|-------|-----------|
| Iframe do ccoinx.ai pode bloquear em alguns contextos (X-Frame-Options) | Usar fallback visual (como Messiax/SurveyFlow) com gradiente e link "Visitar Site" |
| Mais um card aumenta scroll na homepage | Aceitável; padrão já estabelecido com 4 cards |
| Copy em PT/EN/ES pode divergir | Revisar traduções antes de deploy |
