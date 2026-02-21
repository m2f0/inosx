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
- [x] 2.19 Testar ferramenta de auditoria em todas as 5 páginas HTML

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

- [x] 4.1 Executar auditoria completa em todas as 5 páginas HTML
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

- [x] 6.1 Adicionar atributos `data-i18n` faltantes em elementos de texto (INICIADO: navegação completa - ver commit)
- [ ] 6.2 Adicionar atributos `data-i18n-placeholder` em inputs e textareas (necessita correção manual)
- [ ] 6.3 Adicionar atributos `data-i18n` em select options faltantes (necessita correção manual)
- [ ] 6.4 Adicionar atributos `data-i18n-title` em elementos com tooltips (necessita correção manual)
- [ ] 6.5 Adicionar atributos `data-i18n-aria-label` em elementos interativos (necessita correção manual)
- [ ] 6.6 Verificar e corrigir chaves `data-i18n` incorretas ou inconsistentes (necessita correção manual)
- [ ] 6.7 Validar mudanças com ferramenta de validação (executar após correções manuais)

## 7. Correções HTML - surveyflow.html

- [ ] 7.1 Adicionar atributos `data-i18n` faltantes em elementos de texto (ver MANUAL_CORRECTIONS_NEEDED.md)
- [ ] 7.2 Adicionar atributos `data-i18n-placeholder` em inputs e textareas
- [ ] 7.3 Adicionar atributos `data-i18n` em select options faltantes
- [ ] 7.4 Adicionar atributos `data-i18n-title` em elementos com tooltips
- [ ] 7.5 Adicionar atributos `data-i18n-aria-label` em elementos interativos
- [ ] 7.6 Verificar e corrigir chaves `data-i18n` incorretas ou inconsistentes
- [ ] 7.7 Validar mudanças com ferramenta de validação

## 8. Correções HTML - messiax.html

- [ ] 8.1 Adicionar atributos `data-i18n` faltantes em elementos de texto (ver MANUAL_CORRECTIONS_NEEDED.md)
- [ ] 8.2 Adicionar atributos `data-i18n-placeholder` em inputs e textareas
- [ ] 8.3 Adicionar atributos `data-i18n` em select options faltantes
- [ ] 8.4 Adicionar atributos `data-i18n-title` em elementos com tooltips
- [ ] 8.5 Adicionar atributos `data-i18n-aria-label` em elementos interativos
- [ ] 8.6 Verificar e corrigir chaves `data-i18n` incorretas ou inconsistentes
- [ ] 8.7 Validar mudanças com ferramenta de validação

## 9. Correções HTML - roi-calculator.html

- [ ] 9.1 Adicionar atributos `data-i18n` faltantes em elementos de texto (ver MANUAL_CORRECTIONS_NEEDED.md)
- [ ] 9.2 Adicionar atributos `data-i18n-placeholder` em inputs e textareas
- [ ] 9.3 Adicionar atributos `data-i18n` em select options faltantes
- [ ] 9.4 Adicionar atributos `data-i18n-title` em elementos com tooltips
- [ ] 9.5 Adicionar atributos `data-i18n-aria-label` em elementos interativos
- [ ] 9.6 Verificar e corrigir chaves `data-i18n` incorretas ou inconsistentes
- [ ] 9.7 Validar mudanças com ferramenta de validação

## 10. Correções HTML - terms.html

- [ ] 10.1 Adicionar atributos `data-i18n` faltantes em elementos de texto (ver MANUAL_CORRECTIONS_NEEDED.md)
- [ ] 10.2 Adicionar atributos `data-i18n-placeholder` em inputs e textareas
- [ ] 10.3 Adicionar atributos `data-i18n` em select options faltantes
- [ ] 10.4 Adicionar atributos `data-i18n-title` em elementos com tooltips
- [ ] 10.5 Adicionar atributos `data-i18n-aria-label` em elementos interativos
- [ ] 10.6 Verificar e corrigir chaves `data-i18n` incorretas ou inconsistentes
- [ ] 10.7 Validar mudanças com ferramenta de validação

## 11. Correções JSON - en.json

- [ ] 11.1 Adicionar chaves faltantes identificadas pela auditoria (ver MANUAL_CORRECTIONS_NEEDED.md)
- [ ] 11.2 Corrigir valores incorretos ou inconsistentes
- [ ] 11.3 Garantir estrutura aninhada correta para todas as chaves
- [ ] 11.4 Remover chaves não utilizadas (se confirmado seguro)
- [ ] 11.5 Garantir nenhum valor vazio, null ou undefined
- [ ] 11.6 Validar sintaxe JSON (sem trailing commas, aspas corretas)
- [ ] 11.7 Validar mudanças com ferramenta de validação

## 12. Correções JSON - pt.json

- [ ] 12.1 Adicionar chaves faltantes para manter paridade com en.json (ver MANUAL_CORRECTIONS_NEEDED.md)
- [ ] 12.2 Corrigir valores incorretos ou inconsistentes
- [ ] 12.3 Garantir estrutura aninhada idêntica a en.json
- [ ] 12.4 Traduzir chaves novas adicionadas (usar tradução automática como draft se necessário)
- [ ] 12.5 Garantir nenhum valor vazio, null ou undefined
- [ ] 12.6 Validar sintaxe JSON (sem trailing commas, aspas corretas)
- [ ] 12.7 Validar mudanças com ferramenta de validação
- [ ] 12.8 Revisar qualidade das traduções (opcional: contratar tradutor profissional)

## 13. Correções JSON - es.json

- [ ] 13.1 Adicionar chaves faltantes para manter paridade com en.json (ver MANUAL_CORRECTIONS_NEEDED.md)
- [ ] 13.2 Corrigir valores incorretos ou inconsistentes
- [ ] 13.3 Garantir estrutura aninhada idêntica a en.json
- [ ] 13.4 Traduzir chaves novas adicionadas (usar tradução automática como draft se necessário)
- [ ] 13.5 Garantir nenhum valor vazio, null ou undefined
- [ ] 13.6 Validar sintaxe JSON (sem trailing commas, aspas corretas)
- [ ] 13.7 Validar mudanças com ferramenta de validação
- [ ] 13.8 Revisar qualidade das traduções (opcional: contratar tradutor profissional)

## 14. Testes Manuais Completos (Execute após correções HTML/JSON)

- [ ] 14.1 Testar index.html em inglês: verificar todos os textos traduzidos (após correções manuais)
- [ ] 14.2 Testar index.html em português: verificar todos os textos traduzidos (após correções manuais)
- [ ] 14.3 Testar index.html em espanhol: verificar todos os textos traduzidos (após correções manuais)
- [ ] 14.4 Testar surveyflow.html em todos os 3 idiomas (após correções manuais)
- [ ] 14.5 Testar messiax.html em todos os 3 idiomas (após correções manuais)
- [ ] 14.6 Testar roi-calculator.html em todos os 3 idiomas (após correções manuais)
- [ ] 14.7 Testar terms.html em todos os 3 idiomas (após correções manuais)
- [ ] 14.8 Testar troca de idioma em cada página (EN → PT → ES → EN) (após correções manuais)
- [ ] 14.9 Testar que valores de inputs são preservados ao trocar idioma
- [ ] 14.10 Testar que seleções em selects são preservadas ao trocar idioma
- [ ] 14.11 Testar detecção automática de idioma do navegador
- [ ] 14.12 Testar persistência de idioma em localStorage
- [ ] 14.13 Testar em Chrome, Firefox, e Safari
- [ ] 14.14 Testar em mobile (iOS Safari e Android Chrome)

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
- [x] 16.2 Adicionar step de validação no pipeline CI/CD
- [x] 16.3 Configurar para bloquear PRs com traduções incompletas
- [x] 16.4 Testar pipeline com PR de exemplo que falha validação
- [x] 16.5 Testar pipeline com PR de exemplo que passa validação
- [x] 16.6 Documentar processo de validação no README do projeto

## 17. Validação Final e Cleanup (Execute após todas as correções)

- [ ] 17.1 Executar ferramenta de auditoria final em todas as páginas: `npm run audit-i18n`
- [ ] 17.2 Confirmar 0 problemas críticos no relatório de auditoria
- [ ] 17.3 Executar ferramenta de validação final: `npm run validate-i18n`
- [ ] 17.4 Confirmar exit code 0 (sucesso) da validação
- [ ] 17.5 Revisar todos os commits e mensagens de commit
- [ ] 17.6 Remover arquivos temporários ou de debug (audit-report.md, audit-report.json podem ser commitados)
- [ ] 17.7 Atualizar changelog do projeto com mudanças de i18n
- [ ] 17.8 Criar PR com todas as mudanças consolidadas
- [ ] 17.9 Solicitar code review da equipe
- [ ] 17.10 Realizar deploy para ambiente de staging para teste final
- [ ] 17.11 Obter aprovação para deploy em produção
- [ ] 17.12 Fazer deploy em produção
- [ ] 17.13 Monitorar logs e métricas após deploy
- [ ] 17.14 Confirmar que traduções estão funcionando corretamente em produção
