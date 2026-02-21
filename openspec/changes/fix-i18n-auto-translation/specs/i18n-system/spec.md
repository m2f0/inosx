## MODIFIED Requirements

### Requirement: Translate text content elements
O sistema i18n SHALL traduzir automaticamente todos os elementos HTML que possuem atributo `data-i18n` quando o idioma é alterado.

**Modificações:**
- Adicionar tratamento robusto de erros quando chave não existe
- Melhorar logging de avisos para chaves faltantes
- Garantir que elementos dinâmicos adicionados após carregamento também sejam traduzidos

#### Scenario: Translate static elements on language change
- **WHEN** usuário altera o idioma através do seletor
- **THEN** o sistema percorre todos os elementos com atributo `data-i18n`
- **THEN** o sistema atualiza o textContent de cada elemento com a tradução correspondente

#### Scenario: Translate newly added dynamic elements
- **WHEN** novo elemento HTML é adicionado ao DOM via JavaScript após inicialização
- **THEN** o sistema detecta novo elemento com `data-i18n` através de MutationObserver
- **THEN** o sistema aplica tradução automaticamente ao novo elemento

#### Scenario: Handle missing translation keys gracefully
- **WHEN** elemento possui `data-i18n` mas a chave não existe no JSON do idioma atual
- **THEN** o sistema mantém a chave como textContent (e.g., "hero.missing_key")
- **THEN** o sistema registra warning no console: "Translation not found: hero.missing_key"
- **THEN** o sistema tenta fallback para inglês se idioma atual não for inglês

### Requirement: Translate input placeholders
O sistema i18n SHALL traduzir placeholders de elementos `<input>` e `<textarea>` que possuem atributo `data-i18n`.

**Modificações:**
- Adicionar suporte para novo atributo `data-i18n-placeholder` dedicado
- Manter compatibilidade com `data-i18n` existente em inputs

#### Scenario: Translate placeholder using data-i18n
- **WHEN** elemento `<input>` possui atributo `data-i18n="contact.email_placeholder"`
- **THEN** o sistema traduz o atributo `placeholder` do input
- **THEN** o sistema não altera o `value` do input

#### Scenario: Translate placeholder using data-i18n-placeholder
- **WHEN** elemento `<input>` possui atributo `data-i18n-placeholder="contact.email_placeholder"`
- **THEN** o sistema traduz apenas o atributo `placeholder`
- **THEN** atributo dedicado permite combinar com `data-i18n` para label e placeholder separados

#### Scenario: Translate textarea placeholder
- **WHEN** elemento `<textarea>` possui atributo `data-i18n` ou `data-i18n-placeholder`
- **THEN** o sistema traduz o atributo `placeholder` da mesma forma que inputs
- **THEN** o sistema não altera o conteúdo (textContent) da textarea

### Requirement: Translate select options
O sistema i18n SHALL traduzir o texto de elementos `<option>` dentro de `<select>` que possuem atributo `data-i18n`.

**Modificações:**
- Melhorar lógica de seleção de options com `data-i18n-options` no select pai
- Adicionar suporte para tradução individual de cada option via `data-i18n`

#### Scenario: Translate select options individually
- **WHEN** cada `<option>` dentro de `<select>` possui seu próprio atributo `data-i18n`
- **THEN** o sistema traduz o textContent de cada option individualmente
- **THEN** o sistema preserva o atributo `value` de cada option (não traduz)

#### Scenario: Translate select with data-i18n-options
- **WHEN** elemento `<select>` possui atributo `data-i18n-options="industry.options"`
- **THEN** o sistema itera sobre as options e aplica tradução com base no índice ou data-i18n individual
- **THEN** o sistema garante que a option selecionada permaneça selecionada após tradução

#### Scenario: Preserve selected option after translation
- **WHEN** usuário já selecionou uma option e então altera o idioma
- **THEN** o sistema traduz todas as options
- **THEN** o sistema mantém a option originalmente selecionada como selecionada

### Requirement: Translate meta tags
O sistema i18n SHALL traduzir meta tags do documento (title, description) quando o idioma é alterado.

**Modificações:**
- Garantir que `document.title` seja sempre atualizado
- Adicionar verificação de existência do meta tag antes de atualizar

#### Scenario: Translate document title
- **WHEN** idioma é alterado
- **THEN** o sistema busca tradução da chave "meta.title"
- **THEN** o sistema atualiza `document.title` com a tradução

#### Scenario: Translate meta description
- **WHEN** idioma é alterado
- **THEN** o sistema busca o elemento `<meta name="description">`
- **THEN** o sistema atualiza o atributo `content` com a tradução de "meta.description"

#### Scenario: Handle missing meta tags gracefully
- **WHEN** meta tag description não existe no HTML
- **THEN** o sistema registra warning mas não falha
- **THEN** o sistema continua tradução de outros elementos normalmente

## ADDED Requirements

### Requirement: Support specialized translation attributes
O sistema i18n SHALL suportar atributos especializados para traduzir diferentes propriedades HTML além de textContent.

#### Scenario: Translate title attribute for tooltips
- **WHEN** elemento possui atributo `data-i18n-title="tooltip.help"`
- **THEN** o sistema traduz o atributo `title` do elemento
- **THEN** o sistema mantém outros atributos inalterados

#### Scenario: Translate aria-label for accessibility
- **WHEN** elemento possui atributo `data-i18n-aria-label="button.close"`
- **THEN** o sistema traduz o atributo `aria-label` do elemento
- **THEN** o sistema garante conformidade com acessibilidade em todos os idiomas

#### Scenario: Combine multiple translation attributes
- **WHEN** elemento possui múltiplos atributos: `data-i18n`, `data-i18n-title`, `data-i18n-aria-label`
- **THEN** o sistema aplica todas as traduções correspondentes
- **THEN** cada atributo traduz uma propriedade diferente do elemento

### Requirement: MutationObserver for dynamic content
O sistema i18n SHALL observar mudanças no DOM e aplicar traduções automaticamente a elementos dinâmicos.

#### Scenario: Detect new elements added to DOM
- **WHEN** JavaScript adiciona novo elemento com `data-i18n` ao DOM
- **THEN** o sistema detecta a mudança via MutationObserver
- **THEN** o sistema aplica tradução automaticamente ao novo elemento

#### Scenario: Handle SPA route changes
- **WHEN** aplicação de página única muda de rota e renderiza novo conteúdo
- **THEN** o sistema detecta novos elementos via MutationObserver
- **THEN** o sistema traduz novo conteúdo para o idioma atualmente ativo

#### Scenario: Performance - debounce observer callbacks
- **WHEN** múltiplos elementos são adicionados rapidamente ao DOM
- **THEN** o sistema agrupa mudanças e processa em batch
- **THEN** o sistema evita re-traduzir o mesmo elemento múltiplas vezes

### Requirement: Custom event for language change
O sistema i18n SHALL disparar evento customizado quando idioma é alterado para permitir integração com outros componentes.

#### Scenario: Dispatch languageChanged event
- **WHEN** usuário altera o idioma através do seletor
- **THEN** o sistema dispara evento `languageChanged` no `window`
- **THEN** o evento contém `detail: { language: 'pt' }` com o idioma atual

#### Scenario: Components can listen to language change
- **WHEN** outro componente JavaScript precisa reagir a mudança de idioma
- **THEN** componente pode adicionar listener: `window.addEventListener('languageChanged', handler)`
- **THEN** componente recebe notificação e pode atualizar seu estado conforme necessário

#### Scenario: Event is dispatched after translation complete
- **WHEN** sistema termina de traduzir todos os elementos
- **THEN** o sistema dispara o evento `languageChanged`
- **THEN** listeners têm garantia de que DOM já está completamente traduzido

### Requirement: Improved error handling and logging
O sistema i18n SHALL fornecer logging claro e tratamento de erros robusto para facilitar debugging.

#### Scenario: Log translation key not found
- **WHEN** sistema tenta traduzir chave que não existe
- **THEN** o sistema registra: `console.warn("Translation not found: hero.missing_key")`
- **THEN** o sistema exibe a chave como fallback ao invés de quebrar

#### Scenario: Log JSON loading errors
- **WHEN** sistema falha ao carregar arquivo JSON de idioma
- **THEN** o sistema registra: `console.error("Error loading pt translations:", error)`
- **THEN** o sistema tenta fallback para inglês automaticamente

#### Scenario: Validate JSON structure on load
- **WHEN** arquivo JSON é carregado com sucesso
- **THEN** o sistema valida que é um objeto válido (não null, não array)
- **THEN** o sistema registra warning se estrutura parece incorreta

### Requirement: Preserve user input during translation
O sistema i18n SHALL garantir que inputs preenchidos pelo usuário não sejam apagados durante mudança de idioma.

#### Scenario: Preserve input values
- **WHEN** usuário preencheu valores em campos de formulário
- **THEN** usuário altera o idioma
- **THEN** o sistema traduz apenas placeholders, não valores preenchidos
- **THEN** todos os dados preenchidos permanecem intactos

#### Scenario: Preserve textarea content
- **WHEN** usuário digitou texto em textarea
- **THEN** usuário altera o idioma
- **THEN** o sistema traduz apenas placeholder, não o conteúdo
- **THEN** texto digitado permanece inalterado

#### Scenario: Preserve select selection
- **WHEN** usuário selecionou uma option específica em select
- **THEN** usuário altera o idioma
- **THEN** o sistema traduz o texto das options mas mantém a mesma option selecionada
- **THEN** seleção do usuário é preservada

### Requirement: Initialization and language detection
O sistema i18n SHALL inicializar automaticamente e detectar o idioma preferido do usuário.

**Modificações:**
- Melhorar lógica de detecção de idioma do navegador
- Adicionar tratamento de casos edge (idiomas não suportados)

#### Scenario: Load saved language preference
- **WHEN** usuário visitou o site anteriormente e selecionou um idioma
- **THEN** o sistema carrega idioma salvo de `localStorage.getItem('inosx_lang')`
- **THEN** o sistema aplica o idioma salvo automaticamente

#### Scenario: Detect browser language on first visit
- **WHEN** usuário visita o site pela primeira vez (sem idioma salvo)
- **THEN** o sistema detecta idioma do navegador via `navigator.language`
- **THEN** o sistema usa idioma detectado se for suportado (en, pt, es)

#### Scenario: Fallback to English for unsupported languages
- **WHEN** idioma do navegador não é suportado (e.g., "fr", "de")
- **THEN** o sistema usa inglês como fallback
- **THEN** o sistema registra: "Language 'fr' not supported, using 'en'"

#### Scenario: Initialize before DOM ready
- **WHEN** página está carregando
- **THEN** o sistema aguarda evento `DOMContentLoaded` antes de aplicar traduções
- **THEN** o sistema evita flash de conteúdo não traduzido (FOUC)
