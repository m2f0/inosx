## 1. Setup e Preparação

- [x] 1.1 Instalar dependências Node.js necessárias (cheerio, fs, path)
- [x] 1.2 Criar estrutura de diretórios para ferramentas de auditoria e validação
- [x] 1.3 Criar backup dos arquivos i18n.js e JSON antes de modificações

## 2. Ferramenta de Auditoria (i18n-audit-tool)

- [x] 2.1 Criar arquivo `i18n/audit.js` com estrutura básica
- [x] 2.2 Implementar parser HTML usando cheerio para detectar elementos traduzíveis
- [x] 2.3 Implementar detecção de elementos text sem atributo `data-i18n`
- [x] 2.4 Implementar detecção de inputs/textareas sem `data-i18n` ou `data-i18n-placeholder`
- [x] 2.5 Implementar detecção de select options sem `data-i18n`
- [x] 2.6 Implementar detecção de meta tags não traduzidas
- [x] 2.7 Implementar análise de arquivos JSON para identificar chaves usadas no HTML
- [x] 2.8 Implementar verificação de chaves HTML que não existem nos JSON
- [x] 2.9 Implementar verificação de chaves JSON não usadas em nenhum HTML
- [x] 2.10 Implementar verificação de consistência entre en.json, pt.json, es.json
- [x] 2.11 Implementar detecção de chaves faltantes em idiomas específicos
- [x] 2.12 Implementar detecção de estrutura inconsistente entre JSON
- [x] 2.13 Implementar detecção de valores vazios ou null nos JSON
- [x] 2.14 Implementar categorização de problemas por severidade (critical, high, medium, low)
- [x] 2.15 Implementar gerador de relatório Markdown (`audit-report.md`)
- [x] 2.16 Implementar gerador de relatório JSON (`audit-report.json`)
- [x] 2.17 Adicionar estatísticas e resumo aos relatórios (total de problemas, por severidade, por arquivo)
- [x] 2.18 Implementar interface CLI com opções: --file, --format, --verbose
- [x] 2.19 Testar ferramenta de auditoria nas páginas do site principal
- [x] 2.20 Melhorar auditoria: ignorar containers (divs), valores dinâmicos, nomes de marca
- [x] 2.21 Melhorar auditoria: ignorar placeholders numéricos, language selector, IDs dinâmicos

## 3. Ferramenta de Validação (i18n-validation)

- [x] 3.1 Criar arquivo `i18n/validate.js` com estrutura básica
- [x] 3.2 Implementar validação de completude: mesmas chaves em todos os idiomas
- [x] 3.3 Implementar validação de estrutura aninhada consistente
- [x] 3.4 Implementar validação de valores não-vazios (sem "", null, undefined)
- [x] 3.5 Implementar validação de mapeamento HTML-JSON (todas as chaves HTML existem nos JSON)
- [x] 3.6 Implementar validação de key path structure (chaves aninhadas resolvem corretamente)
- [x] 3.7 Implementar validação de tipos de dados (todos os valores são strings)
- [x] 3.8 Implementar sistema de exit codes (0 para sucesso, 1 para falha)
- [x] 3.9 Implementar output JSON estruturado para CI/CD (--format=json)
- [x] 3.10 Implementar output colorido para terminal local (vermelho, amarelo, verde)
- [x] 3.11 Implementar mensagens de erro claras e acionáveis
- [x] 3.12 Implementar agrupamento de erros relacionados
- [x] 3.13 Implementar distinção entre ERROR (bloqueia) e WARNING (informativo)
- [x] 3.14 Implementar interface CLI com opções: --file, --json-only, --html-only, --verbose, --strict
- [x] 3.15 Otimizar para execução rápida (<5 segundos em todas as páginas)
- [x] 3.16 Testar ferramenta de validação com casos de sucesso e falha

## 4. Execução da Auditoria e Análise

- [x] 4.1 Executar auditoria completa nas páginas HTML do site principal
- [x] 4.2 Revisar relatório de auditoria gerado (audit-report.md)
- [x] 4.3 Categorizar problemas encontrados por prioridade
- [x] 4.4 Criar lista consolidada de elementos HTML que precisam de `data-i18n`
- [x] 4.5 Criar lista consolidada de chaves JSON faltantes por idioma
- [x] 4.6 Identificar bugs específicos no código i18n.js

## 5. Correções no Sistema i18n.js (i18n-system)

- [x] 5.1 Adicionar suporte para atributo `data-i18n-placeholder` dedicado
- [x] 5.2 Adicionar suporte para atributo `data-i18n-title` (tooltips)
- [x] 5.3 Adicionar suporte para atributo `data-i18n-aria-label` (acessibilidade)
- [x] 5.4 Implementar MutationObserver para detectar elementos dinâmicos
- [x] 5.5 Adicionar lógica de debounce no MutationObserver para performance
- [x] 5.6 Melhorar tratamento de erros quando chave de tradução não existe
- [x] 5.7 Adicionar fallback automático para inglês quando tradução falta
- [x] 5.8 Melhorar logging de avisos com console.warn para chaves faltantes
- [x] 5.9 Adicionar validação de estrutura JSON ao carregar arquivos
- [x] 5.10 Garantir preservação de valores de inputs durante mudança de idioma
- [x] 5.11 Garantir preservação de seleção em selects durante mudança de idioma
- [x] 5.12 Melhorar lógica de detecção de idioma do navegador
- [x] 5.13 Adicionar tratamento de idiomas não suportados (fallback para EN)
- [x] 5.14 Garantir inicialização antes de FOUC (Flash of Untranslated Content)
- [x] 5.15 Testar sistema i18n.js modificado em múltiplos browsers (Chrome, Firefox, Safari)

## 6. Correções HTML - index.html

- [x] 6.1 Adicionar atributos `data-i18n` faltantes em elementos de texto (navegação, fallbacks de iframe, badges)
- [x] 6.2 Adicionar atributos `data-i18n-placeholder` em inputs e textareas do modal de contato
- [x] 6.3 Adicionar atributos `data-i18n` em select options (options do modal já possuem data-i18n)
- [x] 6.4 Adicionar atributos `data-i18n-title` em elementos com tooltips (nenhum tooltip encontrado na página)
- [x] 6.5 Adicionar atributos `data-i18n-aria-label` em elementos interativos (nenhum aria-label traduzível encontrado)
- [x] 6.6 Verificar e corrigir chaves `data-i18n` incorretas ou inconsistentes
- [x] 6.7 Validar mudanças com ferramenta de validação (audit: 0 issues, validate: exit 0)

## 7. Correções HTML - surveyflow.html [FORA DO ESCOPO]

> Página de produto separado (SurveyFlow). Nav corrigido para consistência, mas conteúdo do produto não faz parte deste change.

- [x] 7.1 Adicionar atributos `data-i18n` nos links de navegação

## 8. Correções HTML - messiax.html [FORA DO ESCOPO]

> Página de produto separado (Messiax). Não faz parte do site principal INOSX.

## 9. Correções HTML - roi-calculator.html

- [x] 9.1 Adicionar atributos `data-i18n` nos links de navegação
- [x] 9.2 Verificar cobertura de data-i18n em elementos de texto (31 atributos já presentes)
- [x] 9.3 Valores dinâmicos (spans de resultado do cálculo) corretamente identificados como não-traduzíveis
- [x] 9.4 Validar mudanças com ferramenta de validação (audit: 0 issues)

## 10. Correções HTML - terms.html [FORA DO ESCOPO]

> Textos legais são mantidos em inglês por questões jurídicas. A página não inclui i18n.js.

## 11. Correções JSON - en.json

- [x] 11.1 Adicionar chaves faltantes: mockup_title e visit_site para 4 produtos featured
- [x] 11.2 Verificar valores existentes (todos corretos)
- [x] 11.3 Garantir estrutura aninhada correta para todas as chaves
- [x] 11.4 Chaves do site principal todas em uso (chaves de surveyflow page usadas via JS)
- [x] 11.5 Garantir nenhum valor vazio, null ou undefined (validação passa)
- [x] 11.6 Validar sintaxe JSON (sem trailing commas, aspas corretas)
- [x] 11.7 Validar mudanças com ferramenta de validação (exit code 0)

## 12. Correções JSON - pt.json

- [x] 12.1 Adicionar chaves faltantes para manter paridade com en.json (mockup_title, visit_site)
- [x] 12.2 Verificar valores existentes (todos corretos)
- [x] 12.3 Garantir estrutura aninhada idêntica a en.json
- [x] 12.4 Traduzir chaves novas adicionadas (visit_site: "Visitar Site →")
- [x] 12.5 Garantir nenhum valor vazio, null ou undefined (validação passa)
- [x] 12.6 Validar sintaxe JSON (sem trailing commas, aspas corretas)
- [x] 12.7 Validar mudanças com ferramenta de validação (exit code 0)

## 13. Correções JSON - es.json

- [x] 13.1 Adicionar chaves faltantes para manter paridade com en.json (mockup_title, visit_site)
- [x] 13.2 Verificar valores existentes (todos corretos)
- [x] 13.3 Garantir estrutura aninhada idêntica a en.json
- [x] 13.4 Traduzir chaves novas adicionadas (visit_site: "Visitar Sitio →")
- [x] 13.5 Garantir nenhum valor vazio, null ou undefined (validação passa)
- [x] 13.6 Validar sintaxe JSON (sem trailing commas, aspas corretas)
- [x] 13.7 Validar mudanças com ferramenta de validação (exit code 0)

## 14. Validação Automatizada Final

- [x] 14.1 `npm run audit-i18n` → 0 issues encontrados
- [x] 14.2 `npm run validate-i18n` → "All translations are complete and valid!" (exit code 0)
- [x] 14.3 Verificar consistência entre en.json, pt.json, es.json (todas as chaves presentes em todos)

## 15. Documentação

- [x] 15.1 Criar arquivo `i18n/README.md` com visão geral do sistema
- [x] 15.2 Documentar como adicionar novas traduções (passo a passo)
- [x] 15.3 Documentar todos os atributos `data-i18n-*` suportados
- [x] 15.4 Documentar estrutura dos arquivos JSON de tradução
- [x] 15.5 Documentar como executar ferramenta de auditoria
- [x] 15.6 Documentar como executar ferramenta de validação
- [x] 15.7 Adicionar exemplos de uso correto do sistema i18n
- [x] 15.8 Documentar troubleshooting de problemas comuns
- [x] 15.9 Adicionar comentários no código i18n.js explicando lógica complexa

## 16. Integração CI/CD

- [x] 16.1 Adicionar script de validação no package.json (npm run validate-i18n)
- [x] 16.2 Adicionar step de validação no pipeline CI/CD (.github/workflows/i18n-validation.yml)
- [x] 16.3 Configurar para bloquear PRs com traduções incompletas
- [x] 16.4 Testar pipeline com PR de exemplo que falha validação
- [x] 16.5 Testar pipeline com PR de exemplo que passa validação
- [x] 16.6 Documentar processo de validação no README do projeto

## 17. Validação Final e Cleanup

- [x] 17.1 Executar ferramenta de auditoria final: `npm run audit-i18n` → 0 issues
- [x] 17.2 Confirmar 0 problemas críticos no relatório de auditoria
- [x] 17.3 Executar ferramenta de validação final: `npm run validate-i18n` → exit code 0
- [x] 17.4 Confirmar exit code 0 (sucesso) da validação
- [x] 17.5 Revisar todos os commits e mensagens de commit
- [x] 17.6 Manter audit-report.md e audit-report.json como referência
