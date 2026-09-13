# INOSX Store

Static EN/PT/ES product discovery page at `/store/`. No payment is collected here; product websites own plans, accounts and checkout.

- `store.js`: localized copy, product catalog and URL-preserving search/category/detail navigation.
- `store.css`: responsive institutional styling and reduced-motion support.
- Stashmunk subscriptions remain marked in preparation until checkout is validated.

## Verification (2026-09-13)

- `npm run validate-i18n`: passed.
- `node --check store/store.js`: passed.
- `npx --yes impeccable store/index.html --no-advisory`: passed, no anti-patterns.
- Browser: search matches, empty/reset, business category (2 products), EN/PT/ES, product details, query preservation, language-aware product links passed.
- Responsive browser: no horizontal overflow at measured 300 CSS px; desktop reviewed.
- Root `index.html` audit reports 11 pre-existing anti-patterns, reproduced against HEAD before Store changes. These are not introduced by the Store navigation links.

## Publication

Prepared on `develop`. Repository AGENTS.md requires explicit approval before merging into production `main`. Version 4.4.0 and sitemap entry are staged for that release.

## App-store visual update

Responsive app cards replace the editorial list. All products use original brand assets, with sources recorded in `icons/SOURCES.md`. Icon and title links open product details.
