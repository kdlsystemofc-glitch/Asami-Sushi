# Asami Sushi — Landing Page

Landing page cinematográfica de rolagem para o restaurante **Asami Sushi** (Santo André, SP), construída sob o conceito criativo **Oferenda**: o mundo do restaurante não é "sushi", é o gesto de entregar algo cuidado com as próprias mãos.

## Stack
- HTML5 semântico, CSS3 puro (custom properties, clamp, grid) e JavaScript vanilla.
- Zero dependências, zero build step, zero framework.
- Fontes: Fraunces (display) e Work Sans (corpo), via Google Fonts.

## Arquitetura
- **Hero (250vh):** pin com sticky stage, foto real do restaurante com parallax, scrim de legibilidade dedicado ao texto, título em split-words assemblado por progresso de scroll (lerp dt-normalizado, `f = 1 - (1-K)^(dt/16.667)`), gate de fallback estático para telas pequenas / `prefers-reduced-motion`.
- **Quem Te Oferece:** três entregas nomeadas (Andreza, Ana, Daiene/Tiago/Mateus), cada uma com foto real como ambiente de fundo, citações verbatim de reviews reais do Google.
- **O Ritual:** interação de segurar-para-servir com trava real de scroll (wheel/touch/teclado) até a ação ser concluída, saída acessível sempre disponível, bypass automático em `prefers-reduced-motion`.
- **As Vozes:** quebra de ritmo em vermelho-vinho (ativo de marca real do próprio Instagram do cliente), reviews reais com resposta do proprietário.
- **Venha:** preço, endereço, telefone e CTA de WhatsApp reais, sem floreio.

## SEO
- Open Graph completo (`og:type=restaurant`).
- JSON-LD `schema.org/Restaurant` com endereço, telefone, faixa de preço e avaliação agregada (4,6 / 3.907 avaliações no Google).
- `fetchpriority="high"` na imagem do hero, `loading="lazy"` nas demais.

## Deploy no Vercel
1. [vercel.com](https://vercel.com) → New Project
2. Importe o repositório `Asami-Sushi`
3. Framework Preset: **Other**
4. Root Directory: **/**
5. Deploy

`vercel.json` já define cache imutável de 1 ano para `/imagens/*` e `/video/*`, e revalidação sempre para `/index.html`.
