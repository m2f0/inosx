---
description: Varrer o repo procurando vazamento de email pessoal do Mario em arquivos versionados
---

# /email-audit

Varrer todos os arquivos **versionados** (tracked pelo git) atrás de
ocorrências do email pessoal do Mario. Email pessoal nunca pode aparecer
em arquivos versionados — só em `CLAUDE.local.md`, `CHANGELOG.claude.md`,
`.git/config` ou outros caminhos explicitamente gitignored.

## Comando

```bash
# Variações que devem ser checadas
git grep -i -E "(mariomayerlefilho|mario@inosx\.com)" -- $(git ls-files)
```

Equivalente sem expansão (mais portável):

```bash
git grep -i "mariomayerlefilho" && git grep -i "mario@inosx.com"
```

## Esperado

Saída **vazia** (zero hits em arquivos versionados).

## Se houver hits

1. Listar cada arquivo + linha onde apareceu.
2. Para cada um:
   - Se for arquivo versionado legítimo (HTML, JSON, md público) →
     **bloqueio**: editar para tirar e re-commitar.
   - Se for `.local.md`, `.git/config`, gitignored → ok, ignorar.

## Histórico legado

O autor de commits antigos no histórico pode ter `mariomayerlefilho@live.com`.
**Não reescrever histórico** (`git filter-branch` é destrutivo, requer
force-push em `main`, propaga para qualquer clone). Aceitar status quo
e garantir que commits futuros não vazem.

## Prevenção

O hook `PreToolUse(Edit/Write)` definido em `.claude/settings.json`
bloqueia automaticamente a gravação de qualquer arquivo versionado que
contenha o email pessoal. Não desabilite esse hook sem motivo claro.
