---
description: Sincronizar branch develop local com origin/develop (fast-forward only)
---

# /sync-develop

Atualiza `develop` local com o que tem no remote, sem rebase nem merge.

```bash
git fetch origin
git checkout develop
git pull --ff-only origin develop
```

Se o pull não for fast-forward (alguém commitou em `develop` enquanto
trabalhávamos), **abortar** e mostrar:

- `git status` para ver o estado
- `git log --oneline origin/develop ^develop` para ver o que tem no remote
  que não está local
- recomendar `/preflight` antes de qualquer rebase manual

Não force-update, não rebase silencioso. Mario decide a estratégia se houver
divergência.
