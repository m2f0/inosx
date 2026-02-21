## ADDED Requirements

### Requirement: HTML Element Detection
O sistema de auditoria SHALL escanear todos os arquivos HTML do projeto e identificar elementos que contêm texto visível ao usuário mas não possuem atributo `data-i18n`.

#### Scenario: Detect untranslated text elements
- **WHEN** o script de auditoria analisa um arquivo HTML
- **THEN** o sistema identifica todos os elementos com textContent mas sem atributo `data-i18n`
- **THEN** o sistema reporta a linha, seletor CSS, e conteúdo de cada elemento não traduzido

#### Scenario: Detect untranslated input placeholders
- **WHEN** o script de auditoria encontra elementos `<input>` ou `<textarea>` com atributo `placeholder`
- **THEN** o sistema verifica se existe atributo `data-i18n` ou `data-i18n-placeholder`
- **THEN** o sistema reporta placeholders sem tradução com linha e valor do placeholder

#### Scenario: Detect untranslated select options
- **WHEN** o script de auditoria encontra elementos `<option>` dentro de `<select>`
- **THEN** o sistema verifica se cada option possui atributo `data-i18n`
- **THEN** o sistema reporta options sem tradução com linha e texto da option

#### Scenario: Detect untranslated meta tags
- **WHEN** o script de auditoria analisa o `<head>` do HTML
- **THEN** o sistema verifica se `<title>` e meta `description` estão sendo traduzidos via JavaScript
- **THEN** o sistema reporta meta tags que não estão no sistema de tradução

### Requirement: JSON Translation Key Detection
O sistema de auditoria SHALL verificar se todas as chaves `data-i18n` usadas nos arquivos HTML existem nos arquivos JSON de tradução.

#### Scenario: Detect missing translation keys
- **WHEN** o script de auditoria encontra atributo `data-i18n="some.key"` no HTML
- **THEN** o sistema verifica se a chave "some.key" existe em `en.json`, `pt.json`, e `es.json`
- **THEN** o sistema reporta quais chaves estão faltando em quais arquivos de idioma

#### Scenario: Detect unused translation keys
- **WHEN** o script de auditoria analisa os arquivos JSON de tradução
- **THEN** o sistema identifica chaves que existem nos JSON mas não são usadas em nenhum HTML
- **THEN** o sistema reporta chaves não utilizadas como candidatas para remoção

#### Scenario: Detect key path structure mismatch
- **WHEN** o script de auditoria valida chaves aninhadas (e.g., "hero.headline1")
- **THEN** o sistema verifica se a estrutura aninhada existe corretamente nos JSON
- **THEN** o sistema reporta chaves que não correspondem à estrutura esperada

### Requirement: Cross-Language Consistency Check
O sistema de auditoria SHALL verificar se todos os arquivos JSON de tradução (en.json, pt.json, es.json) possuem a mesma estrutura e chaves.

#### Scenario: Detect missing keys in specific language
- **WHEN** o script de auditoria compara en.json, pt.json, e es.json
- **THEN** o sistema identifica chaves que existem em um idioma mas faltam em outros
- **THEN** o sistema reporta qual chave está faltando em qual arquivo de idioma

#### Scenario: Detect structure inconsistencies
- **WHEN** o script de auditoria analisa a estrutura aninhada dos JSON
- **THEN** o sistema verifica se a hierarquia de objetos é idêntica em todos os idiomas
- **THEN** o sistema reporta diferenças estruturais (e.g., objeto vs string)

#### Scenario: Detect empty or null values
- **WHEN** o script de auditoria percorre os valores das chaves de tradução
- **THEN** o sistema identifica valores vazios (""), null, ou undefined
- **THEN** o sistema reporta valores incompletos que precisam ser preenchidos

### Requirement: Report Generation
O sistema de auditoria SHALL gerar relatórios detalhados em múltiplos formatos para facilitar correção dos problemas.

#### Scenario: Generate Markdown report
- **WHEN** o script de auditoria completa a análise
- **THEN** o sistema gera arquivo `audit-report.md` com seções organizadas por tipo de problema
- **THEN** cada problema reportado contém: arquivo, linha, descrição, e sugestão de correção

#### Scenario: Generate JSON report
- **WHEN** o script de auditoria completa a análise
- **THEN** o sistema gera arquivo `audit-report.json` com estrutura de dados máquina-legível
- **THEN** o JSON contém array de problemas com campos: type, file, line, severity, description, suggestion

#### Scenario: Categorize problems by severity
- **WHEN** o script de auditoria identifica problemas
- **THEN** o sistema categoriza cada problema como: critical, high, medium, ou low
- **THEN** critical: elemento visível sem tradução; high: chave faltante; medium: chave não usada; low: sugestões de melhoria

#### Scenario: Summary statistics
- **WHEN** o relatório é gerado
- **THEN** o sistema inclui estatísticas: total de problemas, problemas por severidade, problemas por arquivo
- **THEN** o sistema calcula percentual de completude das traduções por página

### Requirement: CLI Interface
O sistema de auditoria SHALL fornecer interface de linha de comando simples e intuitiva.

#### Scenario: Run audit on all pages
- **WHEN** usuário executa `node i18n/audit.js`
- **THEN** o sistema escaneia todas as páginas HTML automaticamente
- **THEN** o sistema gera relatórios e exibe resumo no console

#### Scenario: Run audit on specific page
- **WHEN** usuário executa `node i18n/audit.js --file=surveyflow.html`
- **THEN** o sistema escaneia apenas o arquivo especificado
- **THEN** o sistema gera relatórios apenas para aquela página

#### Scenario: Specify output format
- **WHEN** usuário executa `node i18n/audit.js --format=json`
- **THEN** o sistema gera apenas relatório JSON (sem Markdown)
- **THEN** o sistema suporta formatos: json, markdown, both (padrão)

#### Scenario: Verbose mode for debugging
- **WHEN** usuário executa `node i18n/audit.js --verbose`
- **THEN** o sistema exibe logs detalhados de cada etapa da auditoria
- **THEN** o sistema mostra estatísticas intermediárias e progresso

### Requirement: Performance and Scalability
O sistema de auditoria SHALL executar rapidamente mesmo com múltiplas páginas e grandes arquivos JSON.

#### Scenario: Audit execution time
- **WHEN** o script de auditoria é executado em todas as 5 páginas do site
- **THEN** o sistema completa a auditoria em menos de 10 segundos
- **THEN** o sistema usa parsing eficiente (cheerio) ao invés de regex

#### Scenario: Memory efficiency
- **WHEN** o script de auditoria processa múltiplos arquivos
- **THEN** o sistema processa arquivos sequencialmente para evitar uso excessivo de memória
- **THEN** o sistema limpa referências após processar cada arquivo

#### Scenario: Handle large JSON files
- **WHEN** os arquivos JSON de tradução crescem (>100KB)
- **THEN** o sistema continua funcionando eficientemente
- **THEN** o sistema usa streaming ou chunking se necessário para arquivos muito grandes
