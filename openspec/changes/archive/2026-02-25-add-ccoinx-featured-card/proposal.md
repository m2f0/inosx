# Proposal: Add Ccoinx.ai Featured Card

## Why

O portfólio INOSX inclui o ccoinx.ai, um conversor de moedas com câmera que permite ver conversões em tempo real ao apontar para preços em moeda estrangeira. O produto está live em https://ccoinx.ai mas não tem visibilidade na homepage do site inosx.com. Os demais produtos (Messiax, SurveyFlow, PsychoX, DataGPT) são exibidos em cards featured com headline, descrição, features e mockup—o ccoinx.ai precisa do mesmo tratamento para consistência e descoberta.

## What Changes

- Adicionar novo bloco **featured product** para ccoinx.ai no `index.html`, seguindo o padrão visual dos cards existentes (Messiax, SurveyFlow, PsychoX, DataGPT)
- Incluir: badge, headline, descrição, 4 feature badges, 4 highlights, 2 CTAs (primário + secundário), mockup com iframe de https://ccoinx.ai
- Adicionar estilos CSS `.featured-ccoinx` para paleta e componentes do card (badge, botões, mockup)
- Adicionar traduções i18n para `featured_ccoinx` em pt.json, en.json e es.json
- Adicionar entrada `ccoinx` em `products` nos três arquivos i18n
- **Opcional:** link para ccoinx.ai na topbar de navegação (avaliar UX)

## Capabilities

### New Capabilities
- `featured-products`: Exibição de produtos em destaque na homepage. Cada card inclui badge, headline, descrição, feature badges, highlights, CTAs e mockup (iframe ou fallback). Produtos atuais: Messiax, SurveyFlow, PsychoX, DataGPT, Ccoinx.

### Modified Capabilities
- (nenhuma)

## Impact

- **index.html**: Novo bloco HTML `featured-product featured-ccoinx`, novo bloco de estilos `.featured-ccoinx`
- **i18n/pt.json, en.json, es.json**: Objeto `featured_ccoinx` (badge, headline, description, feature_*, highlight_*, btn_*, mockup_*, visit_site) e entrada em `products`
- **Dependências**: Nenhuma
- **APIs/sistemas**: Nenhum
