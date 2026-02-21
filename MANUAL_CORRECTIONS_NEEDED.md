# Manual HTML/JSON Corrections Required

Based on the audit report (`audit-report.md`), the following corrections need to be made manually:

## Summary from Audit
- **Total Issues:** 521
- **Critical:** 429 (HTML elements without data-i18n)
- **High:** 11 (missing translation keys)
- **Medium:** 81 (unused keys)

## HTML Corrections Needed (Groups 6-10)

### Tasks 6.1-6.7: index.html
- 227 issues to fix
- Add `data-i18n` to navigation links, headers, paragraphs, buttons
- Add `data-i18n-placeholder` to form inputs
- See `audit-report.md` lines 21-1000 for specific elements

### Tasks 7.1-7.7: surveyflow.html
- 40 issues to fix
- Most content already has `data-i18n` attributes
- Fix remaining elements listed in audit report

### Tasks 8.1-8.7: messiax.html
- 95 issues to fix
- Page appears to be in Portuguese, needs full i18n implementation
- See audit report for all untranslated elements

### Tasks 9.1-9.7: roi-calculator.html
- 44 issues to fix
- Calculator has good coverage, fix remaining elements
- See audit report for details

### Tasks 10.1-10.7: terms.html
- 34 issues to fix
- Terms page needs i18n implementation
- See audit report for all elements

## JSON Corrections Needed (Groups 11-13)

### Tasks 11.1-11.7: en.json
- 27 issues (unused keys)
- Review and remove unused keys or add them to HTML
- Ensure all keys used in HTML exist

### Tasks 12.1-12.8: pt.json  
- 27 issues (unused keys)
- Maintain parity with en.json structure
- Add missing translations for new keys

### Tasks 13.1-13.8: es.json
- 27 issues (unused keys)
- Maintain parity with en.json structure
- Add missing translations for new keys

## How to Proceed

1. **Review audit-report.md** for full list of issues
2. **Fix HTML files** by adding appropriate `data-i18n-*` attributes
3. **Update JSON files** to add missing keys and remove unused ones
4. **Validate after each page:** `npm run validate-i18n`
5. **Test in browser** by switching between languages
6. **Run final audit:** `npm run audit-i18n`

## Example Corrections

### Before:
```html
<a href="#products">Products</a>
```

### After:
```html
<a href="#products" data-i18n="nav.products">Products</a>
```

And add to all JSON files:
```json
{
  "nav": {
    "products": "Products" // en
    "products": "Produtos" // pt
    "products": "Productos" // es
  }
}
```
