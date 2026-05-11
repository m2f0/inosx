---
description: Promover develop → main (PRODUÇÃO/GitHub Pages) com confirmação
---

# /promote-prod

⚠️ **Comando destrutivo na superfície de produção.** GitHub Pages serve
`https://inosx.com` direto da branch `main` — qualquer push em `main` é um
deploy.

## Pré-checks (sempre)

1. `git fetch origin`
2. Confirmar que estamos em `develop` e working tree limpo (`git status`).
3. Rodar `/preflight` antes de prosseguir. Se algo falhar, **parar**.
4. Listar diff `develop` vs `main`: `git log --oneline main..develop`.
5. Mostrar resumo dos commits que vão entrar em produção.

## Confirmação obrigatória

Mostrar ao Mario:
- Lista de commits que serão promovidos.
- URLs que mudam (`https://inosx.com/`, etc).
- Pergunta literal: **"Confirmar promoção develop → main? (sim/não)"**

Esperar resposta textual `sim` ou equivalente. Se `não` ou silêncio,
**abortar**.

## Promoção (após sim)

```bash
git checkout main
git pull --ff-only origin main
git merge --no-ff develop -m "chore: promover develop -> main"
git push origin main
git checkout develop
```

## Pós-promoção

1. Aguardar 1-3 min e rodar:
   ```bash
   curl -I https://inosx.com/sitemap.xml
   curl -I https://inosx.com/index.html
   ```
2. Notificar IndexNow das URLs alteradas (ver `docs/SEO-CHECKLIST.md`).
3. Adicionar entrada em `CHANGELOG.md` via `/changelog-add` se a release
   gerou versão nova.
