import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const cssStart = html.indexOf("    /* Featured Product Section - Messiax */");
const cssEnd = html.indexOf("    /* Responsividade */", cssStart);
if (cssStart === -1 || cssEnd === -1) {
  console.error("Featured CSS not found in index.html; use existing css/featured-products.css.");
  process.exit(1);
}
let css = html.slice(cssStart, cssEnd);
css =
  ":root { --surface-glass-strong: rgba(148, 163, 184, 0.14); }\n\n" +
  css.replace(/^    /gm, "");
fs.mkdirSync(path.join(root, "css"), { recursive: true });
const fadeBlock = `

.fade-in {
  opacity: 0;
  transform: translateY(30px);
  animation: featuredFadeInUp 0.85s ease forwards;
}

@keyframes featuredFadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;
fs.writeFileSync(
  path.join(root, "css", "featured-products.css"),
  css.trimEnd() + fadeBlock
);

const start = html.indexOf("  <!-- Featured Product: Messiax -->");
const end = html.indexOf("  <!-- Industries We Serve Section -->");
if (start === -1 || end === -1) {
  console.error(
    "Featured block not found in index.html (homepage uses compact teaser). Edit produtos.html directly or temporarily restore the featured HTML in index before running this script."
  );
  process.exit(1);
}
let body = html.slice(start, end);
body = body
  .replace(
    '<div class="featured-product fade-in">',
    '<div class="featured-product fade-in" id="messiax">'
  )
  .replace(
    '<div class="featured-product featured-surveyflow fade-in">',
    '<div class="featured-product featured-surveyflow fade-in" id="surveyflow">'
  )
  .replace(
    '<div class="featured-product featured-psychox fade-in">',
    '<div class="featured-product featured-psychox fade-in" id="psychox">'
  )
  .replace(
    '<div class="featured-product featured-datagpt fade-in">',
    '<div class="featured-product featured-datagpt fade-in" id="datagpt">'
  )
  .replace(
    '<div class="featured-product featured-ccoinx fade-in">',
    '<div class="featured-product featured-ccoinx fade-in" id="ccoinx">'
  )
  .replace(
    '<div class="featured-product featured-tranquilopa fade-in">',
    '<div class="featured-product featured-tranquilopa fade-in" id="tranquilopa">'
  )
  .replace(
    '<div class="featured-product featured-aiteam fade-in">',
    '<div class="featured-product featured-aiteam fade-in" id="aiteam">'
  );

const head = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>INOSX — Produtos</title>
  <meta name="description" content="Portfólio de produtos INOSX.">
  <link rel="icon" type="image/x-icon" href="/favicon16x16.ico" sizes="16x16">
  <link rel="icon" type="image/x-icon" href="/favicon32x32.ico" sizes="32x32">
  <link rel="stylesheet" href="/css/featured-products.css" />
  <script src="/i18n/i18n.js" defer></script>
  <style>
    :root {
      --bg-color: #0b1020;
      --text-color: #e6f0ff;
      --accent-color: #7dd3fc;
      --gradient-primary: linear-gradient(135deg, #7dd3fc 0%, #60a5fa 45%, #8b5cf6 100%);
      --surface-glass: rgba(148, 163, 184, 0.08);
      --border-soft: rgba(125, 211, 252, 0.28);
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: radial-gradient(1200px 600px at 20% 10%, rgba(96,165,250,0.10), rgba(139,92,246,0.06) 40%, transparent 70%),
                  radial-gradient(1000px 500px at 85% 20%, rgba(125,211,252,0.10), transparent 60%),
                  var(--bg-color);
      color: var(--text-color);
      min-height: 100vh;
      padding-top: 72px;
    }
    .topbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      background: linear-gradient(135deg, rgba(11, 16, 32, 0.95), rgba(26, 31, 53, 0.95));
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-soft);
    }
    .topbar-container { max-width: 1400px; margin: 0 auto; padding: 0.8rem 1rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
    .topbar-nav { display: flex; gap: 2rem; flex: 1; }
    .topbar-nav a { color: var(--text-color); text-decoration: none; font-weight: 500; font-size: 0.95rem; opacity: 0.9; padding: 0.5rem 0; border-bottom: 2px solid transparent; }
    .topbar-nav a:hover { opacity: 1; color: var(--accent-color); border-bottom-color: var(--accent-color); }
    .topbar-nav a.active { color: var(--accent-color); border-bottom-color: var(--accent-color); }
    .language-selector { display: flex; align-items: center; gap: 0.5rem; background: var(--surface-glass); border: 1px solid var(--border-soft); border-radius: 8px; padding: 6px 10px; }
    .language-selector select { background: transparent; border: none; color: var(--text-color); font-size: 0.9rem; font-weight: 600; cursor: pointer; outline: none; }
    .language-selector select option { background: #0f1424; color: var(--text-color); }
    .products-page-hero { max-width: 1400px; margin: 0 auto; padding: 2rem 1rem 1rem; text-align: center; }
    .products-page-hero h1 { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
    .products-page-hero p { opacity: 0.9; max-width: 640px; margin: 0 auto; line-height: 1.5; }
    .section-divider { max-width: 1400px; margin: 1.5rem auto; padding: 0 1rem; }
    .divider-line { height: 2px; background: linear-gradient(90deg, rgba(96,165,250,0) 0%, rgba(96,165,250,0.65) 50%, rgba(96,165,250,0) 100%); border-radius: 999px; }
    .divider-glow { height: 8px; filter: blur(12px); background: radial-gradient(ellipse at center, rgba(96,165,250,0.25), rgba(96,165,250,0)); margin: 6px 0; }
    .products-page-footer { max-width: 1400px; margin: 3rem auto; padding: 2rem 1rem; text-align: center; border-top: 1px solid var(--border-soft); }
    .products-page-footer a { color: var(--accent-color); text-decoration: none; font-weight: 600; }
    .products-page-footer a:hover { text-decoration: underline; }
  </style>
</head>
<body data-i18n-page="products_page">
  <div class="topbar">
    <div class="topbar-container">
      <nav class="topbar-nav">
        <a href="index.html" data-i18n="nav.home">Home</a>
        <a href="produtos.html" class="active" data-i18n="nav.products">Products</a>
        <a href="index.html#services" data-i18n="nav.services">Services</a>
        <a href="roi-calculator.html" data-i18n="nav.roi_calculator">ROI Calculator</a>
      </nav>
      <div class="language-selector">
        <span class="lang-icon">🌍</span>
        <select id="languageSelector">
          <option value="en">🇺🇸 English</option>
          <option value="pt">🇧🇷 Português</option>
          <option value="es">🇪🇸 Español</option>
        </select>
      </div>
    </div>
  </div>
  <header class="products-page-hero">
    <h1 data-i18n="products_page.hero_title">Produtos INOSX</h1>
    <p data-i18n="products_page.hero_subtitle">Soluções de IA para pessoas, equipas e negócios — explore o portfólio completo.</p>
  </header>
  <div class="section-divider" aria-hidden="true"><div class="divider-glow"></div><div class="divider-line"></div><div class="divider-glow"></div></div>
  <main>
${body}
  </main>
  <footer class="products-page-footer">
    <a href="index.html" data-i18n="products_page.back_home">← Voltar ao início</a>
    · <a href="mailto:contact@inosx.com" data-i18n="products_page.contact_link">Falar connosco</a>
  </footer>
</body>
</html>`;

fs.writeFileSync(path.join(root, "produtos.html"), head);
console.log("OK produtos.html + css/featured-products.css");
