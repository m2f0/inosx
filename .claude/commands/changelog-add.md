---
description: Adicionar entrada em CHANGELOG.md no formato Keep a Changelog (pt-BR)
argument-hint: "<tipo: added|changed|fixed|removed> <descrição>"
---

# /changelog-add

Adicione uma entrada na seção `## [Unreleased]` do `CHANGELOG.md`.

**Argumento:** `$ARGUMENTS` (ex: `added Suporte a IndexNow para Bing/Yandex`).

Procedimento:

1. Abra `CHANGELOG.md`.
2. Se não existir seção `## [Unreleased]` no topo, criar com subseções vazias
   `### Added`, `### Changed`, `### Fixed`, `### Removed`.
3. Inserir a entrada nova como primeiro item da subseção apropriada.
4. Se a descrição mencionar versão SemVer (ex: "release 3.1.0"), criar nova
   seção `## [3.1.0] — YYYY-MM-DD` movendo o conteúdo de `[Unreleased]` para
   ela e zerando `[Unreleased]`.
5. Mostrar diff antes de salvar.

**Regras de formato (Keep a Changelog 1.1 pt-BR):**
- Subseções permitidas: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`,
  `Security`.
- Cada item começa com hífen `- ` e descrição imperativa em pt-br.
- Sem emoji decorativo (ao contrário do CHANGELOG legado).
- Sem email pessoal, sem segredos.
