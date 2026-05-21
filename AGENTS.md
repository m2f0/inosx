# INOSX — Site institucional (inosx.com)

> Leia também `~/.Codex/AGENTS.md` (perfil global INOSX) para regras
> universais (idioma pt-br, privacidade, branching, versionamento).

## O que é

Site institucional e landing principal da **INOSX, Inc.** Reposiciona a
empresa como **software studio** (design + build de produtos digitais), com
captação de leads via formulário. Servido em `https://inosx.com` por
**GitHub Pages** (auto-deploy a partir de `main`).

## Stack

- **Frontend:** HTML/CSS/JS estático puro. Sem framework.
- **Tipografia:** Bodoni Moda (display, variable, opsz axis 96/72/24) +
  Manrope (body, weight ? 600). Carregadas via Google Fonts.
- **i18n:** sistema próprio em `i18n/i18n.js` lendo `i18n/{en,pt,es}.json`.
  Idioma default = EN. Toggle PT/EN no nav; ES presente em JSON mas não
  wirado na UI ainda.
- **Tooling Node:** `cheerio` + `@inosx/agent-memory` para auditoria/
  validação de i18n. Não há build step.
- **Deploy:** push para `main` → GitHub Pages reconstrói. Sem CI extra.

## Comandos essenciais

```bash
npm run validate-i18n          # valida cobertura PT/EN/ES vs HTML
npm run audit-i18n             # relatório detalhado de falhas i18n
python -m http.server 8000     # serve localmente (precisa por causa de paths absolutos)
npx --yes impeccable index.html # detector automatizado de design (skill local)
```

## Branch flow

| Branch | Propósito | Merge |
|---|---|---|
| `develop` | Trabalho do dia a dia, preview local | merge → `main` só com confirmação explícita |
| `main` | **PRODUÇÃO**. GitHub Pages serve daqui. Cada push é um deploy. | recebe merge de `develop` |

Slash command `/promote-prod` guia o merge `develop → main`.

## Layout

```
/
├── index.html              landing principal (lead capture)
├── index-legacy.html       backup do site antigo (não tocar)
├── produtos.html           catálogo de produtos
├── messiax.html            página do produto Messiax
├── surveyflow.html         página do produto SurveyFlow
├── roi-calculator.html     ferramenta para prospects
├── terms.html              termos e privacidade
│
├── clients/                logos SVG dos clientes (marquee)
├── i18n/                   sistema de tradução (JS + JSON)
├── css/                    estilos extras (legacy)
├── docs/                   docs internos (SEO-CHECKLIST etc)
│
├── PRODUCT.md              estratégia (skill impeccable)
├── DESIGN.md / .json       sistema visual (skill impeccable)
├── robots.txt              SEO: allow rules + ~19 AI crawlers
├── sitemap.xml             SEO: 6 URLs com hreflang en/pt-BR/es/x-default
├── llms.txt / llms-full.txt GEO: markdown para LLMs citarem
├── og.svg                  social share 1200×630
└── f8c59...f9f3.txt        IndexNow key file
```

## Particularidades críticas

- **Endereço oficial INOSX (em JSON-LD Organization de todas as páginas):**
  131 Continental Dr Suite 305, Newark, DE, 19713, US. Founded 2021.
- **Email público:** `support@inosx.com` (em JSON-LD, llms.txt, footer).
- **Logo institucional:** `INOSXlogo.png` (raiz). É o `logo` da Organization.
- **OG image:** `og.svg` (1200×630, paleta cyan/midnight-vellum). Todos os
  social platforms aceitam SVG OG desde 2024.
- **Schema.org:** Organization + WebSite + WebPage em todas as páginas;
  FAQPage + ItemList só na home; SoftwareApplication em messiax/surveyflow;
  WebApplication em roi-calculator.
- **DESIGN system endurecido:** monocromático cyan, **sem violet**,
  **sem box-shadow**, **sem ambient blobs animados**, **sem cards** como
  container default. Vide `DESIGN.md` para as 8 Named Rules e Don'ts.
- **PRODUCT register:** `brand` (design IS o produto, é uma landing). Cada
  projeto INOSX tem seu próprio PRODUCT.md.

## Ritual de release (OBRIGATÓRIO antes de cada publicação)

**Toda vez que houver modificações no site e formos publicar (merge `develop → main` + push)**:

1. **Bump em `version.json`** ANTES do push para `main`:
   - PATCH (`3.0.X+1`): tweaks de conteúdo, correções de copy, fixes pequenos, ajuste de meta
   - MINOR (`3.X+1.0`): nova seção/produto, nova feature visível, novo idioma, novo template de página
   - MAJOR (`X+1.0.0`): rewrite de posicionamento, mudança de stack, redesign visual completo

2. **Atualizar `CHANGELOG.md`** com entrada para a versão nova (formato Keep a Changelog pt-BR, seção `Added/Changed/Fixed/Removed`).

3. **Commit + push** seguindo o fluxo `develop → main`. A GitHub Action `version-bump.yml` reescreve automaticamente o `hash` e `date` em `version.json` após o push em `main` — então essas duas linhas não precisam ser editadas à mão.

4. **Validar pós-deploy** (GitHub Pages reconstrói em 1-5 min):
   ```bash
   curl -s https://inosx.com/version.json   # confirma version e hash novos
   curl -I https://inosx.com/sitemap.xml    # 200 + application/xml
   ```

5. O badge flutuante no canto inferior-direito de `index.html` lê `/version.json` e renderiza `vX.Y.Z · <hash>` — é a prova visual de que o release foi publicado.

**Regra resumida**: se a página mudou e vai pro ar, o `version` em `version.json` tem que mudar primeiro. Não tem release sem bump.

## Como validar mudanças

Antes de commitar, rodar local:

```bash
npm run validate-i18n
npx --yes impeccable index.html        # exit 0 = clean
python -m json.tool i18n/pt.json > /dev/null
python -m json.tool i18n/en.json > /dev/null
python -m json.tool i18n/es.json > /dev/null
```

Após push para `main` (deploy):

```bash
curl -I https://inosx.com/sitemap.xml  # 200 + application/xml
curl -I https://inosx.com/og.svg       # 200 + image/svg+xml
```

Roteiro completo de validação SEO/GEO em `docs/SEO-CHECKLIST.md`.

## Skills usadas neste projeto

- **`impeccable`** (instalada localmente em `.agents/skills/impeccable/`):
  design system + critique + polish. Usar via `$impeccable <command>`.
- **`seo-geo`** (skill global): SEO + GEO. Já aplicada nesta base.
- **`inosx-bootstrap`** (skill global): este setup multi-projeto.

## Contato externo

`support@inosx.com` — único email a usar em qualquer artefato público.
