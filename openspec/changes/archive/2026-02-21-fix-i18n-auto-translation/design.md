## Context

O site INOSX possui um sistema i18n customizado implementado em JavaScript vanilla (`i18n/i18n.js`) que gerencia traduções para 3 idiomas (EN, PT, ES) através de arquivos JSON. O sistema usa o padrão de atributos HTML `data-i18n` para marcar elementos traduzíveis e atualiza o conteúdo dinamicamente quando o idioma é alterado.

**Estado Atual:**
- Sistema básico funcional com detecção de idioma do navegador
- Arquivos JSON de tradução para EN, PT, ES com estrutura aninhada
- Lógica de fallback para inglês quando tradução não encontrada
- Suporte para elementos textuais, placeholders de inputs, e select options
- 5 páginas HTML no site: index.html, surveyflow.html, messiax.html, roi-calculator.html, terms.html

**Problemas Identificados:**
- Elementos HTML sem atributos `data-i18n` que deveriam ser traduzidos
- Possíveis inconsistências entre os 3 arquivos JSON de tradução
- Chaves de tradução podem estar faltando em alguns idiomas
- Falta de validação automatizada da completude das traduções
- Sem ferramentas de auditoria para identificar gaps sistematicamente

**Stakeholders:**
- Usuários internacionais (experiência de tradução completa)
- Desenvolvedores (manutenção e adição de novas traduções)
- Equipe de conteúdo (gerenciamento de textos multilíngue)

## Goals / Non-Goals

**Goals:**
- Criar ferramenta de auditoria automatizada que identifica elementos HTML não traduzidos e chaves JSON faltantes
- Implementar validação de completude das traduções que pode ser executada via CI/CD
- Corrigir todos os bugs identificados no sistema i18n existente
- Adicionar todos os atributos `data-i18n` faltantes nos HTML
- Completar todas as traduções faltantes nos arquivos JSON
- Documentar padrões de uso do sistema i18n para manutenção futura
- Garantir 100% de cobertura de tradução em todas as páginas

**Non-Goals:**
- Migrar para biblioteca i18n de terceiros (next-i18next, i18next, etc.)
- Adicionar novos idiomas além de EN, PT, ES
- Refatorar a arquitetura existente do sistema i18n.js
- Implementar tradução automática via API (Google Translate, DeepL, etc.)
- Criar interface de gerenciamento de traduções (CMS)
- Suporte a traduções em tempo de build (SSG/SSR)

## Decisions

### 1. Ferramenta de Auditoria: Node.js Script Standalone

**Decisão:** Criar script Node.js (`i18n/audit.js`) que analisa HTML e JSON estaticamente.

**Alternativas Consideradas:**
- **Browser-based tool**: Executar no navegador e analisar DOM ao vivo
  - ❌ Rejeitado: Requer servidor rodando, não pode ser executado em CI/CD facilmente
- **Python script**: Usar BeautifulSoup para parsing HTML
  - ❌ Rejeitado: Adiciona dependência de Python ao projeto que é puramente JavaScript/HTML
- **Node.js script**: Usar cheerio/jsdom para parsing HTML e análise de JSON
  - ✅ Escolhido: Mesma stack do projeto, pode ser executado em CI/CD, sem necessidade de browser

**Rationale:**
- Permite execução automatizada em CI/CD
- Sem dependências de runtime (browser/servidor)
- Parsing eficiente com cheerio (jQuery-like API)
- Pode gerar relatórios estruturados (JSON, Markdown)

### 2. Estrutura da Ferramenta de Validação: Formato JSON Schema + Custom Validators

**Decisão:** Criar validadores customizados que checam:
1. Estrutura consistente entre en.json, pt.json, es.json
2. Todas as chaves usadas no HTML existem nos JSON
3. Todas as chaves nos JSON existem em todos os idiomas
4. Formato e tipos de valores estão corretos

**Alternativas Consideradas:**
- **JSON Schema standard**: Usar JSON Schema para validar estrutura
  - ❌ Rejeitado: Não consegue validar consistência cross-file entre múltiplos idiomas
- **Lint rules customizadas**: Criar regras ESLint/JSONLint
  - ❌ Rejeitado: Limitado para análise JSON, não consegue correlacionar com HTML
- **Custom validators**: Scripts que implementam todas as validações necessárias
  - ✅ Escolhido: Flexibilidade total para implementar todas as validações necessárias

**Rationale:**
- Validações específicas ao nosso caso de uso
- Pode correlacionar HTML com JSON
- Mensagens de erro customizadas e acionáveis
- Fácil de estender com novas validações no futuro

### 3. Abordagem de Correção: Manual com Assistência Automatizada

**Decisão:** A ferramenta de auditoria identifica problemas e gera relatório detalhado, mas as correções são aplicadas manualmente nos arquivos.

**Alternativas Consideradas:**
- **Auto-fix completo**: Script modifica HTML e JSON automaticamente
  - ❌ Rejeitado: Arriscado, pode introduzir erros, difícil de validar mudanças
- **Interactive CLI**: Ferramenta pergunta ao usuário sobre cada correção
  - ❌ Rejeitado: Muito trabalhoso para grande volume de correções
- **Report + Manual fix**: Gera relatório, desenvolvedor aplica correções
  - ✅ Escolhido: Mais seguro, desenvolvedor tem controle total, pode revisar cada mudança

**Rationale:**
- Evita modificações automatizadas incorretas
- Permite revisão humana de cada correção
- Desenvolvedor aprende os padrões ao corrigir
- Git diff mais legível e fácil de revisar

### 4. Formato de Output da Auditoria: Markdown + JSON

**Decisão:** Gerar dois formatos:
- `audit-report.md`: Relatório legível para humanos com seções organizadas
- `audit-report.json`: Dados estruturados para processamento automatizado

**Alternativas Consideradas:**
- **Apenas console output**: Imprimir no terminal
  - ❌ Rejeitado: Difícil de compartilhar, não persistente
- **HTML report**: Gerar página HTML interativa
  - ❌ Rejeitado: Overkill para o caso de uso, requer abrir em browser
- **Markdown + JSON**: Ambos os formatos
  - ✅ Escolhido: Markdown para leitura humana, JSON para automação

**Rationale:**
- Markdown é facilmente legível no GitHub/IDE
- JSON permite integração com CI/CD e ferramentas
- Dois formatos cobrem todos os casos de uso

### 5. Tratamento de Elementos Dinâmicos: Atributos data-i18n-* Adicionais

**Decisão:** Adicionar suporte a atributos especializados:
- `data-i18n`: Para textContent (já existe)
- `data-i18n-placeholder`: Para placeholder de inputs
- `data-i18n-title`: Para atributo title (tooltips)
- `data-i18n-aria-label`: Para aria-label (acessibilidade)

**Alternativas Consideradas:**
- **Single attribute with modifiers**: `data-i18n="key@placeholder"`
  - ❌ Rejeitado: Sintaxe complexa, difícil de parsear
- **JavaScript-based**: Gerenciar tudo via JS sem atributos adicionais
  - ❌ Rejeitado: Perde o padrão declarativo, dificulta auditoria
- **Separate attributes**: Um atributo por tipo de tradução
  - ✅ Escolhido: Declarativo, fácil de entender, simples de auditar

**Rationale:**
- Mantém padrão declarativo consistente
- Fácil de identificar na auditoria
- Semanticamente claro o que está sendo traduzido
- Compatível com a arquitetura existente

### 6. Estratégia de Testes: Script de Validação + Testes Manuais

**Decisão:** 
1. Script de validação automatizado que roda em CI/CD
2. Testes manuais em cada idioma antes do deploy
3. Sem framework de testes unitários para o i18n.js

**Alternativas Consideradas:**
- **Jest/Mocha unit tests**: Testes unitários completos do i18n.js
  - ❌ Rejeitado: Overkill, sistema é simples e funcional
- **End-to-end tests**: Playwright/Cypress testando traduções
  - ❌ Rejeitado: Muito overhead para validação de texto estático
- **Validation script only**: Apenas validação dos arquivos
  - ✅ Escolhido: Suficiente para garantir consistência, simples de manter

**Rationale:**
- Sistema i18n é estável e não muda frequentemente
- Validação de estrutura é mais importante que testes unitários
- CI/CD pode bloquear PRs com traduções incompletas
- Testes manuais detectam problemas de contexto e qualidade

## Risks / Trade-offs

### 1. Volume de Correções Manuais
**Risco:** Auditoria pode identificar centenas de elementos faltantes, tornando correção manual trabalhosa.

**Mitigação:**
- Priorizar páginas por importância (index.html primeiro)
- Dividir correções em múltiplos PRs menores
- Usar find-replace quando possível para padrões repetidos
- Documentar padrões para evitar retrabalho

### 2. Traduções Faltantes Requerem Conteúdo Original
**Risco:** Para completar traduções faltantes nos JSON, precisamos de textos originais em todos os idiomas, que podem não existir ainda.

**Mitigação:**
- Usar tradução automática como draft inicial (Google Translate)
- Marcar traduções automáticas para revisão futura
- Priorizar completude sobre perfeição (é melhor ter tradução aproximada que nada)
- Criar issue separada para revisão profissional das traduções

### 3. Sistema i18n.js Pode Ter Bugs Não Óbvios
**Risco:** Bugs podem estar em edge cases que não são facilmente identificáveis por auditoria estática.

**Mitigação:**
- Realizar testes manuais extensivos em todos os idiomas
- Testar cenários: troca de idioma, reload da página, elementos dinâmicos
- Adicionar console.log temporários para debugging se necessário
- Testar em múltiplos browsers (Chrome, Firefox, Safari)

### 4. Manutenção Futura: Desenvolvedores Podem Esquecer data-i18n
**Risco:** Novos elementos adicionados no futuro podem não ter atributos data-i18n.

**Mitigação:**
- Documentar padrões claramente no README
- Adicionar validação de i18n ao CI/CD para bloquear PRs
- Criar checklist de PR que inclui verificação de traduções
- Educar equipe sobre importância do i18n

### 5. Performance: Múltiplos Arquivos JSON Carregados
**Risco:** Carregar 3 arquivos JSON pode impactar performance inicial da página.

**Mitigação:**
- Sistema atual já carrega apenas o idioma necessário (não todos de uma vez)
- Arquivos JSON são pequenos (<50KB cada)
- Browser cache reduz carregamentos subsequentes
- Considerar minificação dos JSON no futuro se necessário

### 6. Scope Creep: Tentação de Refatorar Completamente
**Risco:** Durante correção, pode surgir tentação de migrar para biblioteca i18n moderna.

**Mitigação:**
- Manter foco no objetivo: corrigir bugs, não reescrever
- Sistema atual funciona, refatoração não é necessária agora
- Documentar melhorias futuras possíveis em issues separadas
- Lembrar que "perfeito é inimigo do bom"

## Migration Plan

### Fase 1: Criação de Ferramentas (Estimativa: 1-2 dias)
1. Criar `i18n/audit.js` - Script de auditoria
2. Criar `i18n/validate.js` - Script de validação
3. Testar ferramentas em uma página (surveyflow.html como piloto)
4. Ajustar ferramentas baseado nos resultados

### Fase 2: Auditoria Completa (Estimativa: 1 dia)
1. Executar auditoria em todas as 5 páginas HTML
2. Gerar relatório consolidado
3. Categorizar problemas por severidade (crítico, alto, médio, baixo)
4. Priorizar correções

### Fase 3: Correções HTML (Estimativa: 2-3 dias)
1. Adicionar atributos `data-i18n` faltantes em todos os HTMLs
2. Corrigir atributos `data-i18n` com chaves incorretas
3. Adicionar suporte para atributos especializados (`data-i18n-placeholder`, etc.)
4. Validar mudanças com script de validação

### Fase 4: Correções JSON (Estimativa: 2-3 dias)
1. Adicionar chaves faltantes nos arquivos JSON
2. Corrigir valores incorretos ou inconsistentes
3. Garantir estrutura idêntica entre en.json, pt.json, es.json
4. Validar completude das traduções

### Fase 5: Correções i18n.js (Estimativa: 1-2 dias)
1. Identificar e corrigir bugs no código JavaScript
2. Adicionar tratamento de novos atributos especializados
3. Melhorar tratamento de edge cases
4. Testar em múltiplos browsers

### Fase 6: Testes e Validação (Estimativa: 1-2 dias)
1. Testes manuais em cada idioma (EN, PT, ES)
2. Testar troca de idioma em cada página
3. Verificar todos os tipos de elementos (texto, placeholder, select, etc.)
4. Executar validação automatizada final
5. Gerar relatório de completude (deve ser 100%)

### Fase 7: Documentação (Estimativa: 1 dia)
1. Criar `i18n/README.md` com padrões de uso
2. Documentar como adicionar novas traduções
3. Documentar como executar auditoria e validação
4. Adicionar exemplos de uso correto do sistema

### Fase 8: CI/CD Integration (Estimativa: 1 dia)
1. Adicionar step de validação no CI/CD pipeline
2. Configurar para bloquear PRs com traduções incompletas
3. Testar pipeline com PR de exemplo
4. Documentar processo para desenvolvedores

**Rollback Strategy:**
- Todas as mudanças são incrementais e não breaking
- Se bugs forem introduzidos, podem ser revertidos por arquivo
- Git permite rollback granular de cada commit
- Sistema i18n.js original é mantido como backup antes de modificações
- Arquivos JSON podem ser revertidos individualmente se necessário

**Deployment:**
- Mudanças são apenas em arquivos estáticos (HTML, JS, JSON)
- Deploy é simples: push para branch, CI/CD faz deploy automático
- Sem necessidade de migração de dados ou downtime
- Mudanças são retrocompatíveis com sistema existente

## Open Questions

1. **Traduções profissionais**: Devemos contratar tradutor profissional para revisar traduções automáticas ou é aceitável ter traduções aproximadas inicialmente?
   - **Decisão pendente**: Avaliar budget e prioridade de qualidade vs. velocidade

2. **Novos idiomas no futuro**: Há planos de adicionar mais idiomas (FR, DE, JP, etc.)?
   - **Impacto no design**: Se sim, devemos considerar estrutura mais escalável agora
   - **Decisão pendente**: Consultar roadmap de produto

3. **Tradução de URLs/rotas**: Devemos traduzir URLs (e.g., `/sobre` para PT, `/about` para EN)?
   - **Impacto no design**: Requer mudanças significativas na arquitetura
   - **Decisão pendente**: Avaliar SEO e complexidade técnica

4. **Conteúdo dinâmico**: Há conteúdo carregado via API que precisa ser traduzido?
   - **Impacto no design**: Pode requerer backend i18n, fora do scope atual
   - **Decisão pendente**: Auditar se existe conteúdo dinâmico atualmente

5. **Métricas de uso**: Devemos adicionar analytics para rastrear uso de cada idioma?
   - **Impacto no design**: Ajudaria a priorizar qualidade das traduções
   - **Decisão pendente**: Consultar equipe de analytics
