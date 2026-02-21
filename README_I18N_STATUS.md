# INOSX Site - i18n Implementation Guide

Este README documenta o estado da implementação do sistema de internacionalização (i18n) do site INOSX.

## Status Atual da Implementação

### ✅ Completo (77 tarefas - 48%)

#### Ferramentas e Infraestrutura
- ✅ Setup completo (package.json, dependências, backups)
- ✅ **Ferramenta de Auditoria** (`i18n/audit.js`) - Totalmente funcional
  - Detecta elementos HTML sem tradução
  - Valida chaves JSON
  - Verifica consistência entre idiomas
  - Gera relatórios MD e JSON
- ✅ **Ferramenta de Validação** (`i18n/validate.js`) - Totalmente funcional
  - Valida completude e estrutura
  - Exit codes para CI/CD
  - Output colorido e JSON
- ✅ **Sistema i18n.js melhorado** com:
  - Suporte a `data-i18n-placeholder`, `data-i18n-title`, `data-i18n-aria-label`
  - MutationObserver para conteúdo dinâmico
  - Fallback automático para inglês
  - Preservação de valores de usuário
  - Melhor tratamento de erros

#### Documentação
- ✅ README completo do sistema i18n (`i18n/README.md`)
- ✅ Documentação de todas as funcionalidades
- ✅ Exemplos de uso
- ✅ Guia de troubleshooting

#### CI/CD
- ✅ Scripts npm configurados
- ✅ GitHub Actions workflow criado
- ✅ Validação automática em PRs

### ⏳ Pendente - Correções Manuais (83 tarefas - 52%)

#### Auditoria Executada - 521 Problemas Identificados

**Relatórios gerados:**
- `audit-report.md` - Relatório detalhado legível
- `audit-report.json` - Dados estruturados

**Breakdown:**
- 🔴 **429 Critical**: Elementos HTML sem `data-i18n`
- 🟠 **11 High**: Chaves de tradução faltantes
- 🟡 **81 Medium**: Chaves não utilizadas

#### Correções HTML Necessárias (35 tarefas)
Consulte `MANUAL_CORRECTIONS_NEEDED.md` e `audit-report.md` para lista completa.

- **index.html**: 227 elementos precisam de `data-i18n`
- **surveyflow.html**: 40 elementos
- **messiax.html**: 95 elementos  
- **roi-calculator.html**: 44 elementos
- **terms.html**: 34 elementos

#### Correções JSON Necessárias (24 tarefas)
- **en.json**: 27 chaves não utilizadas para revisar
- **pt.json**: 27 chaves não utilizadas + adicionar traduções novas
- **es.json**: 27 chaves não utilizadas + adicionar traduções novas

#### Testes Manuais (14 tarefas)
Após correções HTML/JSON:
- Testar todas as páginas em 3 idiomas
- Testar troca de idioma
- Testar preservação de valores
- Testar em múltiplos navegadores
- Testar em mobile

#### Validação Final (14 tarefas)
- Auditoria final (0 críticos)
- Validação final (exit code 0)
- Review e deploy

## Como Prosseguir

### 1. Correções HTML

Para cada página HTML, adicione atributos `data-i18n` conforme indicado no audit report:

```html
<!-- ANTES -->
<h1>Your Team Wastes $10,000/Month</h1>

<!-- DEPOIS -->
<h1 data-i18n="hero.headline1">Your Team Wastes $10,000/Month</h1>
```

**Processo recomendado:**
1. Abra `audit-report.md` e localize a seção da página
2. Para cada elemento listado, adicione o atributo apropriado
3. Execute `npm run validate-i18n` após cada página
4. Commit as mudanças incrementalmente

### 2. Correções JSON

Para cada chave HTML adicionada, adicione traduções em **todos os 3 idiomas**:

**en.json:**
```json
{
  "hero": {
    "headline1": "Your Team Wastes $10,000/Month"
  }
}
```

**pt.json:**
```json
{
  "hero": {
    "headline1": "Seu Time Desperdiça $10.000/Mês"
  }
}
```

**es.json:**
```json
{
  "hero": {
    "headline1": "Su Equipo Desperdicia $10,000/Mes"
  }
}
```

### 3. Validação Contínua

Após cada mudança:

```bash
# Validar traduções
npm run validate-i18n

# Se houver erros, o comando falhará e mostrará detalhes
# Corrija e valide novamente até passar
```

### 4. Auditoria Final

Quando todas as correções estiverem completas:

```bash
# Executar auditoria completa
npm run audit-i18n

# Objetivo: 0 problemas críticos
```

### 5. Testes Manuais

1. Abra cada página HTML no navegador
2. Use o seletor de idioma para trocar: EN → PT → ES → EN
3. Verifique se todos os textos mudam corretamente
4. Teste em Chrome, Firefox, Safari
5. Teste em dispositivos móveis

## Ferramentas Disponíveis

### Auditoria

```bash
# Auditar todas as páginas
npm run audit-i18n

# Auditar página específica
npm run audit-i18n -- --file=index.html

# Modo verbose (ver todos os logs)
npm run audit-i18n -- --verbose

# Gerar apenas JSON
npm run audit-i18n -- --format=json
```

### Validação

```bash
# Validar tudo
npm run validate-i18n

# Validar apenas JSON
npm run validate-i18n -- --json-only

# Validar apenas HTML
npm run validate-i18n -- --html-only

# Modo strict (warnings = errors)
npm run validate-i18n -- --strict

# Output JSON
npm run validate-i18n -- --format=json
```

## Estrutura de Arquivos

```
site/
├── i18n/
│   ├── i18n.js              # Sistema JavaScript
│   ├── en.json              # Traduções inglês
│   ├── pt.json              # Traduções português
│   ├── es.json              # Traduções espanhol
│   ├── audit.js             # Ferramenta de auditoria
│   ├── validate.js          # Ferramenta de validação
│   ├── backup/              # Backups originais
│   └── README.md            # Documentação detalhada
├── index.html               # Página principal
├── surveyflow.html          # Página SurveyFlow
├── messiax.html             # Página Messiax
├── roi-calculator.html      # Calculadora ROI
├── terms.html               # Termos de serviço
├── package.json             # Dependências e scripts
├── audit-report.md          # Último relatório de auditoria
├── MANUAL_CORRECTIONS_NEEDED.md  # Guia de correções
└── .github/
    └── workflows/
        └── i18n-validation.yml  # CI/CD validation
```

## Próximos Passos Recomendados

1. **Priorizar por impacto:**
   - Começar com `index.html` (página principal)
   - Depois `roi-calculator.html` e `surveyflow.html`
   - Finalizar com `messiax.html` e `terms.html`

2. **Trabalhar em sprints:**
   - Sprint 1: index.html (2-3 horas)
   - Sprint 2: surveyflow.html + roi-calculator.html (2 horas)
   - Sprint 3: messiax.html + terms.html (2 horas)
   - Sprint 4: Testes e ajustes finais (1 hora)

3. **Commits incrementais:**
   - Commit após completar cada página
   - Mensagem exemplo: `feat(i18n): add translations to index.html`

4. **Validação contínua:**
   - O CI/CD bloqueará PRs com traduções incompletas
   - Sempre execute `npm run validate-i18n` antes de push

## Suporte

- **Documentação completa**: `i18n/README.md`
- **Lista de correções**: `MANUAL_CORRECTIONS_NEEDED.md`
- **Relatório de auditoria**: `audit-report.md`
- **Contato**: dev@inosx.com

## Licença

Proprietário - INOSX, Inc.
