# Design QA — cabeçalho comercial AgentOS

final result: passed

## Referência e evidências
- Fonte visual: C:/Users/mario/AppData/Local/Temp/codex-clipboard-43e12dae-3d16-477d-8190-b0173f661d2e.png (1825×619, recorte de seção; escala original do navegador desconhecida).
- Implementação: C:/Users/mario/Documents/INOSX/Products/outputs/video/agentos-commercial-en-v1/editorial-desktop.png (1810×950 capturados, viewport solicitado 1825×950; scrollbar excluída).
- Mobile: mesma pasta/editorial-mobile.png, viewport solicitado 390×844.
- Estado: PT, vídeo comercial parado; EN e ES verificados pelo seletor real.
- Comparação conjunta: referência e captura desktop abertas no mesmo resultado de inspeção visual. O recorte fornecido tem escala diferente; por isso medidas absolutas foram conferidas também contra a seção Produtos no mesmo DOM/viewport.

## Histórico e correção
- P1 anterior: h3 de card reduzia o título e eliminava a hierarquia editorial da referência. Corrigido reutilizando h2, section-head e lead existentes.
- P1 anterior: texto ocupava a margem esquerda sem a composição em duas colunas. Corrigido usando o mesmo grid 4fr/8fr da seção Produtos.
- Evidência após correção: ambos os títulos têm Bodoni Moda, 72px, peso 300, opsz72 e x=751.73 no viewport desktop. Ênfase usa a classe italic original.

## Superfícies verificadas
- Tipografia: fonte, escala, peso e espaçamento herdados da seção de referência; itálico visível. Conteúdo menor gera duas linhas, diferença intencional.
- Layout: coluna de identificação e texto à direita; empilhamento abaixo de 880px; sem overflow horizontal no mobile. Vídeo permanece abaixo em largura completa.
- Cores: tokens existentes ink/ink-2; fundo original preservado.
- Imagens: vídeos originais preservados, sem novos assets ou substituições; thumbnails mantêm proporção.
- Conteúdo: PT/EN/ES traduzidos, identificação AgentOS. PT usa KvdfqKYER9g; EN/ES vOsdKmG0hGQ. Link público e CTA preservados.
- Comparação focada: cabeçalhos e textos legíveis nas duas imagens, complementados por igualdade de estilos computados com Produtos.

## Checklist
- [x] Reutilizar composição editorial real, não tipografia de card.
- [x] Validar renderização desktop e mobile.
- [x] Testar seleção EN/ES e confirmar IDs dos vídeos.
- [x] Validar i18n e diff.

Nenhuma divergência P0/P1/P2 remanescente no bloco alterado. Escala do screenshot fornecido não é tratada como medida CSS exata. Não foi alterado o restante da página.
`nValidação automatizada: validate-i18n passou; impeccable retornou exit 1 com 56 notas consultivas do site existente (cores, glows e tamanhos), sem alterar superfícies fora do escopo.
