# Tasks: Add Ccoinx.ai Featured Card

## 1. i18n

- [x] 1.1 Add `featured_ccoinx` object to i18n/pt.json (badge, headline, description, feature_1..4, highlight_1..4, btn_learn, btn_access, mockup_title, mockup_subtitle, visit_site)
- [x] 1.2 Add `featured_ccoinx` object to i18n/en.json
- [x] 1.3 Add `featured_ccoinx` object to i18n/es.json
- [x] 1.4 Add `products.ccoinx` and `products.ccoinx_desc` to pt.json, en.json, es.json

## 2. CSS

- [x] 2.1 Add `.featured-ccoinx` styles to index.html (container, badge, headline gradient, feature-badge, btn-featured, btn-featured-secondary, featured-mockup) with green/amber palette (#22c55e, #eab308)

## 3. HTML Card

- [x] 3.1 Insert `featured-product featured-ccoinx` block after the DataGPT card in index.html
- [x] 3.2 Add badge, headline, description with data-i18n attributes
- [x] 3.3 Add four feature badges (OCR, tempo real, privacidade, cotações) with featured-features class
- [x] 3.4 Add four highlight items with data-i18n
- [x] 3.5 Add primary CTA linking to https://ccoinx.ai/converter and secondary to https://ccoinx.ai (target="_blank")
- [x] 3.6 Add mockup with iframe (src=https://ccoinx.ai) and fallback visual (gradient, mockup_title, mockup_subtitle, visit_site link)

## 4. Verification

- [x] 4.1 Verify card displays correctly in pt, en, es
- [x] 4.2 Verify iframe loads and fallback appears when blocked
