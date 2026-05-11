---
description: Checagens locais antes de commit/push (branch, working tree, validate-i18n, impeccable)
---

# /preflight

Roda em sequência os checks que precisam estar verdes antes de qualquer
commit ou push neste projeto.

1. **Branch atual**: confirmar que estamos em `develop` (ou perguntar se a
   intenção é mexer em `main` direto).
2. **Working tree**: `git status --short` — listar o que está dirty.
3. **Sync com remote**: `git fetch origin && git rev-list --left-right --count HEAD...@{u}`.
4. **Validar i18n**: `npm run validate-i18n`.
5. **Detector impeccable**: `npx --yes impeccable index.html` (exit 0 = clean).
6. **Validar JSON**: `python -m json.tool i18n/pt.json > /dev/null` (e en.json, es.json).
7. **Auditoria de privacidade**: rodar `/email-audit` — deve voltar zero hits.

Reporte status de cada step com OK ou FAIL. No final, dê o veredito:
- **PRONTO PARA COMMIT** — todos verdes
- **BLOQUEADO** — listar exatamente o que falhou e o que fazer
