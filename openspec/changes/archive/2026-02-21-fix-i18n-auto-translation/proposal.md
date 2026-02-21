## Why

O sistema de internacionalização (i18n) do site INOSX possui bugs que afetam a experiência de tradução automática para usuários em diferentes idiomas. Embora o sistema básico esteja implementado com suporte a EN, PT e ES através de arquivos JSON e atributos `data-i18n`, há inconsistências na aplicação das traduções, elementos não cobertos pelo sistema, e possíveis problemas na lógica de atualização dinâmica. É necessário realizar um escaneamento completo de todas as páginas (index.html, surveyflow.html, messiax.html, roi-calculator.html, terms.html) e seus recursos para identificar e corrigir todos os elementos que não estão sendo traduzidos corretamente, garantindo uma experiência consistente em todos os idiomas suportados.

## What Changes

- Realizar auditoria completa do sistema i18n em todas as páginas HTML do site
- Identificar elementos HTML sem atributo `data-i18n` que deveriam ter tradução
- Verificar consistência das chaves de tradução entre os arquivos JSON (en.json, pt.json, es.json)
- Identificar chaves de tradução faltantes ou com valores incorretos nos arquivos JSON
- Corrigir bugs no código JavaScript do sistema i18n (i18n/i18n.js)
- Adicionar suporte para elementos dinâmicos e edge cases não cobertos atualmente
- Garantir que meta tags, placeholders, select options e todos os tipos de elementos sejam traduzidos corretamente
- Documentar padrões de uso do sistema i18n para manutenção futura
- Criar testes automatizados para validação de completude das traduções

## Capabilities

### New Capabilities
- `i18n-audit-tool`: Sistema de auditoria que escaneia todas as páginas HTML e identifica elementos sem tradução, chaves faltantes nos JSON, e inconsistências entre idiomas
- `i18n-validation`: Validação automatizada que garante completude das traduções em todos os arquivos JSON e uso correto de atributos data-i18n no HTML

### Modified Capabilities
- `i18n-system`: Corrigir bugs no sistema existente de tradução automática, incluindo tratamento de edge cases, elementos dinâmicos, e lógica de atualização de página

## Impact

**Arquivos Afetados:**
- `i18n/i18n.js` - Sistema JavaScript de tradução (correções de bugs)
- `i18n/en.json`, `i18n/pt.json`, `i18n/es.json` - Arquivos de tradução (adição de chaves faltantes, correção de valores)
- `index.html`, `surveyflow.html`, `messiax.html`, `roi-calculator.html`, `terms.html` - Páginas HTML (adição de atributos data-i18n faltantes)

**Sistemas Impactados:**
- Sistema de internacionalização do site
- Experiência do usuário em todos os idiomas (EN, PT, ES)
- Manutenibilidade do código de tradução

**Stakeholders:**
- Usuários internacionais do site (melhoria na experiência)
- Equipe de desenvolvimento (melhor estrutura e documentação)
- Equipe de conteúdo (processo de adição de novas traduções)
