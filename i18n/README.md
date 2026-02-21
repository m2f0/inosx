# INOSX i18n System Documentation

Sistema de internacionalização customizado para o site INOSX, suportando inglês (EN), português (PT) e espanhol (ES).

## Visão Geral

O sistema i18n da INOSX é uma solução leve e eficiente sem dependências externas que:
- Traduz conteúdo HTML automaticamente usando atributos `data-i18n-*`
- Detecta automaticamente o idioma do navegador
- Preserva a seleção de idioma do usuário via localStorage
- Suporta conteúdo dinâmico através de MutationObserver
- Fornece fallback automático para inglês quando traduções estão faltando

## Arquitetura

```
i18n/
├── i18n.js           # Sistema JavaScript principal
├── en.json           # Traduções em inglês
├── pt.json           # Traduções em português
├── es.json           # Traduções em espanhol
├── audit.js          # Ferramenta de auditoria
├── validate.js       # Ferramenta de validação
├── backup/           # Backups dos arquivos originais
└── README.md         # Esta documentação
```

## Como Usar

### 1. Incluir o script no HTML

```html
<head>
  <script src="/i18n/i18n.js" defer></script>
</head>
```

### 2. Marcar elementos para tradução

#### Texto simples (`data-i18n`)

```html
<h1 data-i18n="hero.headline">Your Team Wastes $10,000/Month</h1>
<p data-i18n="hero.description">INOSX AI Agents Cut Costs by 40%</p>
<button data-i18n="hero.cta_button">Get Free Consultation</button>
```

#### Placeholders de inputs (`data-i18n-placeholder`)

```html
<input 
  type="email" 
  data-i18n-placeholder="modal.email_placeholder" 
  placeholder="Email">

<textarea 
  data-i18n-placeholder="modal.message_placeholder"
  placeholder="Your message">
</textarea>
```

#### Tooltips (`data-i18n-title`)

```html
<button 
  data-i18n="button.help"
  data-i18n-title="button.help_tooltip"
  title="Click for help">
  Help
</button>
```

#### Acessibilidade (`data-i18n-aria-label`)

```html
<button 
  data-i18n-aria-label="button.close_aria"
  aria-label="Close dialog">
  ✕
</button>
```

#### Select options

```html
<select id="industry">
  <option value="tech" data-i18n="industry.tech">Technology/SaaS</option>
  <option value="finance" data-i18n="industry.finance">Financial Services</option>
  <option value="healthcare" data-i18n="industry.healthcare">Healthcare</option>
</select>
```

### 3. Estrutura dos arquivos JSON

Os arquivos de tradução usam estrutura aninhada com notação de ponto:

```json
{
  "meta": {
    "title": "INOSX - The Future of AI",
    "description": "Enterprise AI solutions..."
  },
  "hero": {
    "headline": "Your Team Wastes $10,000/Month",
    "description": "INOSX AI Agents Cut Costs by 40%",
    "cta_button": "Get Free Consultation"
  },
  "modal": {
    "email_placeholder": "Work Email",
    "message_placeholder": "Tell us about your goals..."
  }
}
```

**Regras importantes:**
- Todos os três arquivos (`en.json`, `pt.json`, `es.json`) devem ter a mesma estrutura
- Todas as chaves devem ter valores (não pode ser vazio, `null` ou `undefined`)
- Todos os valores devem ser strings (não objetos ou números)

## Adicionar Novas Traduções

### Passo 1: Adicionar chave no HTML

```html
<h2 data-i18n="new_section.title">New Feature</h2>
```

### Passo 2: Adicionar tradução em TODOS os JSON

**en.json:**
```json
{
  "new_section": {
    "title": "New Feature"
  }
}
```

**pt.json:**
```json
{
  "new_section": {
    "title": "Novo Recurso"
  }
}
```

**es.json:**
```json
{
  "new_section": {
    "title": "Nueva Función"
  }
}
```

### Passo 3: Validar

```bash
npm run validate-i18n
```

Se houver erros, corrija-os antes de fazer commit.

## Ferramentas

### Auditoria (`audit.js`)

Escaneia todas as páginas HTML e arquivos JSON para identificar problemas:

```bash
# Auditar todas as páginas
node i18n/audit.js

# Auditar página específica
node i18n/audit.js --file=index.html

# Gerar apenas relatório JSON
node i18n/audit.js --format=json

# Modo verbose
node i18n/audit.js --verbose
```

**Saída:**
- `audit-report.md` - Relatório legível para humanos
- `audit-report.json` - Dados estruturados para processamento

**O que detecta:**
- Elementos HTML sem atributos `data-i18n`
- Chaves usadas no HTML mas faltando nos JSON
- Chaves nos JSON não usadas em nenhum HTML
- Inconsistências entre arquivos de idiomas
- Valores vazios ou null

### Validação (`validate.js`)

Valida que traduções estão completas e consistentes:

```bash
# Validar tudo
node i18n/validate.js

# Validar apenas JSON
node i18n/validate.js --json-only

# Validar apenas mapeamento HTML-JSON
node i18n/validate.js --html-only

# Modo strict (warnings = errors)
node i18n/validate.js --strict

# Output JSON para CI/CD
node i18n/validate.js --format=json
```

**Exit codes:**
- `0` - Todas as validações passaram
- `1` - Validação falhou (erros encontrados)

**O que valida:**
- Todos os idiomas têm as mesmas chaves
- Estrutura aninhada consistente
- Nenhum valor vazio
- Todas as chaves HTML existem nos JSON
- Todos os valores são strings

## API JavaScript

### Métodos Públicos

```javascript
// Obter instância global
const i18n = window.i18n;

// Obter idioma atual
const currentLang = i18n.getCurrentLanguage(); // 'en', 'pt', ou 'es'

// Mudar idioma
await i18n.setLanguage('pt');

// Obter tradução programaticamente
const translation = i18n.t('hero.headline');

// Obter idiomas suportados
const languages = i18n.getSupportedLanguages(); // ['en', 'pt', 'es']
```

### Eventos

```javascript
// Escutar mudanças de idioma
window.addEventListener('languageChanged', (event) => {
  console.log('Novo idioma:', event.detail.language);
  // Executar lógica customizada...
});
```

## Boas Práticas

### ✅ DO:
- Use chaves descritivas: `hero.main_headline` ao invés de `h1`
- Agrupe chaves relacionadas: `modal.title`, `modal.description`, `modal.button`
- Mantenha a mesma estrutura em todos os idiomas
- Valide após cada mudança (`npm run validate-i18n`)
- Teste em todos os 3 idiomas antes de fazer deploy

### ❌ DON'T:
- Não hardcode textos em HTML (use `data-i18n`)
- Não deixe valores vazios ou `null` nos JSON
- Não misture idiomas no mesmo arquivo JSON
- Não use números ou booleanos como valores de tradução
- Não esqueça de adicionar chave em TODOS os idiomas

## Troubleshooting

### Tradução não aparece

1. **Verifique se o elemento tem `data-i18n`:**
   ```html
   <h1 data-i18n="hero.headline">...</h1>
   ```

2. **Verifique se a chave existe em todos os JSON:**
   ```bash
   node i18n/validate.js
   ```

3. **Verifique o console do navegador:**
   - Deve mostrar warnings se chave não for encontrada

### Idioma não muda

1. **Verifique o seletor de idioma:**
   ```html
   <select id="languageSelector">
     <option value="en">English</option>
     <option value="pt">Português</option>
     <option value="es">Español</option>
   </select>
   ```

2. **Verifique localStorage:**
   ```javascript
   localStorage.getItem('inosx_lang');
   ```

3. **Verifique se i18n.js foi carregado:**
   ```javascript
   console.log(window.i18n);
   ```

### Conteúdo dinâmico não traduz

O MutationObserver detecta automaticamente novo conteúdo. Se não estiver funcionando:

1. Verifique se o elemento tem `data-i18n` quando é adicionado
2. Force atualização manualmente:
   ```javascript
   window.i18n.updatePage();
   ```

### Arquivo JSON inválido

```bash
# Valide sintaxe JSON online:
# https://jsonlint.com/

# Ou use:
node -e "console.log(JSON.parse(require('fs').readFileSync('i18n/en.json')))"
```

**Erros comuns:**
- Trailing comma: `"key": "value",}` ❌
- Aspas simples: `{'key': 'value'}` ❌
- Sem aspas: `{key: value}` ❌
- Correto: `{"key": "value"}` ✅

## Fluxo de Trabalho

### Desenvolvimento Local

1. Fazer mudanças no HTML/JSON
2. Validar: `npm run validate-i18n`
3. Auditar (opcional): `npm run audit-i18n`
4. Testar em todos os idiomas no navegador
5. Commit e push

### CI/CD

O pipeline automaticamente:
1. Executa `npm run validate-i18n`
2. Bloqueia merge se validação falhar
3. Requer todos os idiomas completos antes de deploy

## Performance

- **Carregamento inicial:** <100ms (arquivos JSON pequenos)
- **Troca de idioma:** <50ms (já em cache após primeira carga)
- **MutationObserver:** Debounce de 100ms para evitar atualizações excessivas
- **Tamanho total:** ~3KB (i18n.js) + ~150KB (3 JSON combinados)

## Suporte de Navegadores

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile (iOS Safari, Android Chrome)

**Recursos usados:**
- `fetch` API
- `MutationObserver`
- `localStorage`
- `CustomEvent`
- Template literals
- Arrow functions
- Async/await

## Contribuindo

Ao adicionar novos recursos:

1. Atualize esta documentação
2. Adicione testes de validação se necessário
3. Mantenha compatibilidade com versões anteriores
4. Documente breaking changes claramente

## Licença

Proprietário - INOSX, Inc.

## Contato

Para dúvidas ou suporte: dev@inosx.com
