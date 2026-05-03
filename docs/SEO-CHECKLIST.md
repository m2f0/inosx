# SEO + GEO checklist — INOSX

This file tracks the post-deploy steps that cannot be done from code.

## After every deploy

Run these `curl` checks against production:

```bash
curl -I https://inosx.com/sitemap.xml
# Expect: HTTP/2 200, Content-Type: application/xml or text/xml

curl -I https://inosx.com/robots.txt
# Expect: HTTP/2 200, Content-Type: text/plain

curl -I https://inosx.com/llms.txt
# Expect: HTTP/2 200, Content-Type: text/plain

curl -I https://inosx.com/og.svg
# Expect: HTTP/2 200, Content-Type: image/svg+xml

curl https://inosx.com/sitemap.xml | head -c 500
# Expect: starts with <?xml ...><urlset ...>, no redirect
```

Then visually verify the home page contains:

- `<link rel="canonical" href="https://inosx.com/" />`
- `<link rel="alternate" hreflang="en" ...>` (and pt-BR, es, x-default)
- `<meta property="og:..." />` block with og:image
- `<script type="application/ld+json">` block

External validators:

- [validator.schema.org](https://validator.schema.org) — paste a URL, expect zero errors
- [opengraph.xyz](https://www.opengraph.xyz) — paste a URL, expect a clean preview
- [search.google.com/test/rich-results](https://search.google.com/test/rich-results) — verify FAQ rich result eligibility on the home page

## One-time setup tasks

### 1. Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Add property → choose **Domain** (not URL prefix).
3. Enter `inosx.com`. Google will give a TXT record to add to DNS.
4. Add the TXT record via your DNS provider (Cloudflare often auto-verifies).
5. Once verified, go to **Sitemaps** in the left nav.
6. Submit sitemap as the **full absolute URL**:
   ```
   https://inosx.com/sitemap.xml
   ```
   Domain properties reject relative paths.
7. Wait 24-48h, then check **Coverage** for crawl status.

### 2. Bing Webmaster Tools

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters).
2. Sign in.
3. Click **Import from Google Search Console** — Bing pulls the verified domain and submitted sitemap automatically.
4. If the import doesn't work, add the property manually with the same DNS verification.

### 3. IndexNow

The static key file is already in the repo:

```
public path: https://inosx.com/f8c59fecbf26ac1186412ac8981af9f3.txt
contents:    f8c59fecbf26ac1186412ac8981af9f3
```

To notify search engines that a URL changed, send a GET to any of these:

```
https://api.indexnow.org/indexnow?url=https://inosx.com/&key=f8c59fecbf26ac1186412ac8981af9f3
https://www.bing.com/indexnow?url=https://inosx.com/&key=f8c59fecbf26ac1186412ac8981af9f3
https://yandex.com/indexnow?url=https://inosx.com/&key=f8c59fecbf26ac1186412ac8981af9f3
```

Bing/Yandex/Naver/Seznam pick this up. Indexing in minutes instead of days.

For batch notification (multiple URLs at once):

```bash
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "inosx.com",
    "key": "f8c59fecbf26ac1186412ac8981af9f3",
    "keyLocation": "https://inosx.com/f8c59fecbf26ac1186412ac8981af9f3.txt",
    "urlList": [
      "https://inosx.com/",
      "https://inosx.com/produtos.html",
      "https://inosx.com/messiax.html",
      "https://inosx.com/surveyflow.html",
      "https://inosx.com/roi-calculator.html"
    ]
  }'
```

### 4. AI engine indexing

ChatGPT, Claude, Perplexity, Gemini and Copilot read `llms.txt` and `llms-full.txt` automatically when crawling. Both files are at the domain root. No manual submission required.

### 5. Backlinks (out of code, high impact)

Authority signals matter heavily for both classical and generative search:

- Post the redesign on LinkedIn, X (Twitter), and dev.to with a short story and a link.
- Get listed on `awwwards.com` or `siteinspire.com` if the design qualifies.
- Update GitHub READMEs of public INOSX repos to link to https://inosx.com.

## Files reference

| File | Path | Purpose |
|---|---|---|
| `robots.txt` | `/` | Allow rules + AI crawler allowlist + sitemap pointer |
| `sitemap.xml` | `/` | All public URLs with hreflang for EN, pt-BR, es, x-default |
| `llms.txt` | `/` | Short markdown index for AI engines |
| `llms-full.txt` | `/` | Full markdown content for AI engines |
| `og.svg` | `/` | 1200×630 social preview |
| `f8c59...f9f3.txt` | `/` | IndexNow key file |
| `INOSXlogo.png` | `/` | Organization logo for JSON-LD |

## Pitfalls to watch

- If a CDN or proxy is added later, exclude `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, the IndexNow key, `og.svg` and `INOSXlogo.png` from any locale-routing or auth middleware.
- The hreflang query-param form (`?lang=pt`) depends on the i18n.js loader honoring the parameter on first load. If that ever changes, update both the sitemap and the per-page `<link rel="alternate">` entries.
- The OG image is SVG. All major social platforms (Facebook, LinkedIn, X, Slack, Discord) handle SVG OG since 2024. If you find a platform that doesn't, render `og.svg` to PNG (1200×630) once and replace the file.
- `dateModified` in JSON-LD is currently a static string. Bump it whenever content changes (or wire it to git's last-modified time during a future build pipeline).
