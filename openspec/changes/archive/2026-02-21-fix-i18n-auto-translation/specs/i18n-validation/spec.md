## ADDED Requirements

### Requirement: Translation Completeness Validation
O sistema de validação SHALL verificar se todos os arquivos JSON de tradução possuem as mesmas chaves e estrutura completa.

#### Scenario: Validate all languages have same keys
- **WHEN** o script de validação é executado
- **THEN** o sistema compara en.json, pt.json, e es.json
- **THEN** o sistema falha se alguma chave existe em um idioma mas falta em outro

#### Scenario: Validate nested structure consistency
- **WHEN** o script de validação analisa objetos aninhados nos JSON
- **THEN** o sistema verifica se a hierarquia é idêntica em todos os idiomas
- **THEN** o sistema falha se encontrar estrutura inconsistente (e.g., objeto vs string)

#### Scenario: Validate no empty values
- **WHEN** o script de validação percorre os valores das chaves
- **THEN** o sistema identifica valores vazios (""), null, ou undefined
- **THEN** o sistema falha se encontrar valores incompletos

#### Scenario: Success case - all translations complete
- **WHEN** todos os arquivos JSON estão completos e consistentes
- **THEN** o script de validação retorna exit code 0
- **THEN** o sistema exibe mensagem de sucesso: "✓ All translations are complete"

### Requirement: HTML-JSON Mapping Validation
O sistema de validação SHALL verificar se todas as chaves `data-i18n` usadas no HTML existem nos arquivos JSON.

#### Scenario: Validate HTML keys exist in JSON
- **WHEN** o script de validação escaneia atributos `data-i18n` nos HTML
- **THEN** o sistema verifica se cada chave existe em todos os arquivos JSON (en, pt, es)
- **THEN** o sistema falha se encontrar chave HTML que não existe nos JSON

#### Scenario: Validate key path structure
- **WHEN** o script de validação encontra chave aninhada (e.g., "hero.headline1")
- **THEN** o sistema verifica se a navegação de objeto funciona corretamente
- **THEN** o sistema falha se o path não puder ser resolvido nos JSON

#### Scenario: Report missing keys with file location
- **WHEN** o script de validação identifica chave faltante
- **THEN** o sistema reporta: arquivo HTML, linha, chave faltante, e idiomas onde está faltando
- **THEN** o sistema falha com exit code 1 e mensagem clara de erro

### Requirement: Data Type Validation
O sistema de validação SHALL verificar se os valores das traduções possuem tipos de dados apropriados.

#### Scenario: Validate string values
- **WHEN** o script de validação analisa valores de tradução
- **THEN** o sistema verifica se todos os valores são strings (não números ou booleanos acidentais)
- **THEN** o sistema falha se encontrar tipo de dado incorreto

#### Scenario: Validate no objects as values
- **WHEN** o script de validação encontra valor que deveria ser string
- **THEN** o sistema verifica se não é um objeto aninhado por engano
- **THEN** o sistema falha se encontrar objeto onde deveria haver string final

#### Scenario: Validate special characters are escaped
- **WHEN** o script de validação analisa valores com caracteres especiais
- **THEN** o sistema verifica se aspas, quebras de linha, etc. estão corretamente escapados
- **THEN** o sistema avisa se encontrar caracteres problemáticos mas não falha (warning)

### Requirement: CI/CD Integration
O sistema de validação SHALL ser integrável em pipelines de CI/CD para validação automatizada.

#### Scenario: Exit code on validation failure
- **WHEN** o script de validação encontra problemas
- **THEN** o sistema retorna exit code não-zero (1)
- **THEN** o CI/CD pode usar o exit code para falhar o build

#### Scenario: Exit code on validation success
- **WHEN** todas as validações passam
- **THEN** o sistema retorna exit code 0
- **THEN** o CI/CD permite o build continuar

#### Scenario: Machine-readable output for CI
- **WHEN** usuário executa `node i18n/validate.js --format=json`
- **THEN** o sistema gera output JSON estruturado com resultados da validação
- **THEN** o JSON contém: success (bool), errors (array), warnings (array), summary (object)

#### Scenario: Human-readable output for local dev
- **WHEN** usuário executa `node i18n/validate.js` localmente
- **THEN** o sistema exibe output colorido e formatado no console
- **THEN** o sistema usa cores: vermelho para erros, amarelo para warnings, verde para sucesso

### Requirement: Fast Execution for Pre-commit Hooks
O sistema de validação SHALL executar rapidamente para uso em pre-commit hooks do git.

#### Scenario: Complete validation in under 5 seconds
- **WHEN** o script de validação é executado em todas as páginas e JSON do projeto
- **THEN** o sistema completa em menos de 5 segundos
- **THEN** o sistema é adequado para uso em pre-commit hook sem atrasar desenvolvedor

#### Scenario: Incremental validation for modified files
- **WHEN** usuário executa `node i18n/validate.js --changed-only`
- **THEN** o sistema valida apenas arquivos modificados (via git diff)
- **THEN** o sistema executa ainda mais rápido (<2 segundos) para mudanças pequenas

#### Scenario: Cache validation results
- **WHEN** o script de validação é executado repetidamente sem mudanças
- **THEN** o sistema pode usar cache de resultados anteriores (opcional)
- **THEN** o sistema invalida cache se arquivos foram modificados

### Requirement: CLI Options and Flexibility
O sistema de validação SHALL fornecer opções de linha de comando para diferentes casos de uso.

#### Scenario: Validate specific file
- **WHEN** usuário executa `node i18n/validate.js --file=index.html`
- **THEN** o sistema valida apenas aquele arquivo HTML específico
- **THEN** o sistema valida os JSON apenas para chaves usadas naquele arquivo

#### Scenario: Validate only JSON structure
- **WHEN** usuário executa `node i18n/validate.js --json-only`
- **THEN** o sistema valida apenas consistência dos arquivos JSON
- **THEN** o sistema não escaneia arquivos HTML

#### Scenario: Validate only HTML-JSON mapping
- **WHEN** usuário executa `node i18n/validate.js --html-only`
- **THEN** o sistema valida apenas se chaves HTML existem nos JSON
- **THEN** o sistema não valida estrutura interna dos JSON

#### Scenario: Verbose mode for debugging
- **WHEN** usuário executa `node i18n/validate.js --verbose`
- **THEN** o sistema exibe logs detalhados de cada validação
- **THEN** o sistema mostra estatísticas: total de chaves validadas, tempo por etapa, etc.

### Requirement: Error Messages and Actionability
O sistema de validação SHALL fornecer mensagens de erro claras e acionáveis para facilitar correção.

#### Scenario: Clear error messages
- **WHEN** o script de validação detecta erro
- **THEN** o sistema exibe mensagem que inclui: tipo de erro, localização (arquivo e linha), e descrição do problema
- **THEN** o sistema sugere ação corretiva quando possível

#### Scenario: Group related errors
- **WHEN** múltiplos erros relacionados são detectados
- **THEN** o sistema agrupa erros por tipo ou arquivo
- **THEN** o sistema exibe resumo antes de listar erros individuais

#### Scenario: Diff-style output for missing keys
- **WHEN** chave está faltando em um idioma mas existe em outro
- **THEN** o sistema exibe lado-a-lado: "en.json: ✓ hero.title" e "pt.json: ✗ hero.title (missing)"
- **THEN** o sistema facilita identificar exatamente o que precisa ser adicionado

### Requirement: Warning vs Error Distinction
O sistema de validação SHALL distinguir entre erros críticos que bloqueiam build e warnings informativos.

#### Scenario: Critical errors that fail validation
- **WHEN** chave está faltando em arquivo JSON
- **THEN** o sistema trata como ERROR e falha a validação (exit code 1)
- **THEN** tipo de erro crítico: missing keys, structure inconsistency, empty values

#### Scenario: Warnings that don't fail validation
- **WHEN** chave existe nos JSON mas não é usada em nenhum HTML
- **THEN** o sistema trata como WARNING e não falha a validação (exit code 0)
- **THEN** tipo de warning: unused keys, sugestões de melhoria, caracteres especiais

#### Scenario: Configurable strictness level
- **WHEN** usuário executa `node i18n/validate.js --strict`
- **THEN** o sistema trata warnings como errors e falha a validação
- **THEN** modo strict é útil para garantir qualidade máxima antes de release
