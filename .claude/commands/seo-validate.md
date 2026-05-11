---
description: Valida SEO/GEO da landing — curl checks + parse JSON-LD nas 6 URLs públicas
---

# /seo-validate

Verifica que os arquivos SEO + GEO estão servidos corretamente em produção
e que cada página HTML tem canonical, hreflang, OG completo e JSON-LD válido.

## Etapa 1 — Headers dos arquivos raiz

```bash
for f in sitemap.xml robots.txt llms.txt llms-full.txt og.svg \
         f8c59fecbf26ac1186412ac8981af9f3.txt; do
  echo "=== $f ==="
  curl -sI "https://inosx.com/$f" | head -5
done
```

Esperado em todos: `HTTP/1.1 200 OK` + Content-Type apropriado
(`application/xml`, `text/plain`, `image/svg+xml`).

## Etapa 2 — Conteúdo SEO em cada página HTML

Para cada uma das 6 URLs públicas:
- `https://inosx.com/`
- `https://inosx.com/produtos.html`
- `https://inosx.com/messiax.html`
- `https://inosx.com/surveyflow.html`
- `https://inosx.com/roi-calculator.html`
- `https://inosx.com/terms.html`

Baixe o HTML e verifique presença de:

- `<link rel="canonical" href="..." />`
- `<link rel="alternate" hreflang="..." />` para `en`, `pt-BR`, `es`,
  `x-default`
- `<meta property="og:image" content="..." />`
- `<script type="application/ld+json">...</script>` com JSON parseable

Pode usar python inline:

```bash
python -c "
import re, json, urllib.request
urls = ['https://inosx.com/', 'https://inosx.com/produtos.html',
        'https://inosx.com/messiax.html', 'https://inosx.com/surveyflow.html',
        'https://inosx.com/roi-calculator.html', 'https://inosx.com/terms.html']
for u in urls:
    html = urllib.request.urlopen(u).read().decode('utf-8')
    canon = bool(re.search(r'rel=\"canonical\"', html))
    hreflangs = re.findall(r'hreflang=\"([^\"]+)\"', html)
    og_image = bool(re.search(r'og:image', html))
    blocks = re.findall(r'<script type=\"application/ld\+json\">\s*(.*?)\s*</script>', html, re.DOTALL)
    json_ok = all(json.loads(b) for b in blocks) if blocks else False
    print(f'{u} canon={canon} hreflang={len(hreflangs)} og:image={og_image} json-ld={len(blocks)} valid={json_ok}')
"
```

## Etapa 3 — Veredito

- **ALL GREEN** — todos checks passam
- **FAIL** — listar URL + check que falhou + sugestão de fix

## Validators externos (manuais, opcional)

Para validação humana:
- [validator.schema.org](https://validator.schema.org)
- [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- [opengraph.xyz](https://www.opengraph.xyz)
