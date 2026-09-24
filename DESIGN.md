# DESIGN.md — Asami Sushi São Bernardo

Especificação derivada de `design/mockup-full.png` (768 × 1376 px) e das fatias em
`design/secoes/`. **O mockup é referência visual apenas.** Nenhum pixel dele entra no
site: tudo vira HTML/CSS/SVG, foto real tratada ou *plate* gerado.

> **Status:** todas as dúvidas da §7 foram decididas (D1–D24). As tabelas abaixo já refletem as
> decisões. O que sobrou de genuinamente pendente está isolado na **§8**.

---

## 0. Como o mockup foi lido

| Item | Valor |
|---|---|
| Arquivo | `design/mockup-full.png`, 768 × 1376 px, RGB |
| Natureza | Export de página inteira, reduzido de um layout-mãe de **1440 px** → **fator 1,875** (confirmado) |
| Conversão usada | `valor_mockup ÷ 768 × 100 = vw` (independente de escala) |
| Script de corte | `design/slice.py` (reproduzível: `python design/slice.py`) |

Todas as medidas abaixo aparecem como **`px@768 · vw · px@1440`**. Como o CLAUDE.md pede
unidades fluidas, os tokens finais são `clamp()` ancorados no `vw` medido.

### Seções identificadas

| # | Arquivo | Faixa Y (768) | Tamanho | Nome na peça | Papel |
|---|---|---|---|---|---|
| 01 | `design/secoes/01-hero.png` | 0 – 437 | 768×437 | **ACT I — THE ARRIVAL** | Nav + hero cinematográfico |
| 02 | `design/secoes/02-rodizio.png` | 437 – 790 | 768×353 | **ACT II — THE FEAST OF ABUNDANCE / SPATIAL RODÍZIO** | Rodízio / cardápio |
| 03 | `design/secoes/03-sanctum.png` | 790 – 1105 | 768×315 | **ACT III — THE SANCTUM / THE ROOM** | Ambiente / localização |
| 04 | `design/secoes/04-reserva.png` | 1105 – 1376 | 768×271 | **ACT IV — THE RITUAL OF CONNECTION** | Reserva + contato |
| 05 | — (não existe no mockup) | — | — | Rodapé | Endereço, horário, preço, Instagram, logo |

O rótulo `ACT I / THE ARRIVAL` **não está no mockup** — foi acrescentado por decisão (D8),
para dar consistência aos quatro atos. O rodapé (05) também é novo (D10) e segue a mesma
linguagem visual, descrito em §4/05.

Recortes de leitura em `design/secoes/detalhes/`: `nav-topo`, `hero-controles`,
`hero-rail-esquerda`, `rodizio-callouts`, `reserva-form`, `reserva-reflexo`.

> Continuam fora do escopo da v1: seção "sobre", grade de serviços, cards, depoimentos e
> um quinto ato de cardápio — o cardápio é link no menu (D12).

---

## 1. Paleta

Amostrada pixel a pixel (moda local + média do decil superior por região).

### Base — preto molhado
| Token | HEX | Onde aparece |
|---|---|---|
| `--ink-900` | `#040507` | Fundo absoluto: topo do hero, laterais do ACT III |
| `--ink-850` | `#08090C` | Água profunda do hero |
| `--ink-800` | `#0C0E11` | Transição hero → rodízio |
| `--ink-700` | `#16191E` | Névoa baixa, fundo do ACT II |
| `--ink-600` | `#1D2025` | Superfície de campo/select do formulário |
| `--ink-500` | `#2D221E` | Sombra quente (borda do ACT III) |

### Cromo, fumaça e texto
| Token | HEX | Onde aparece |
|---|---|---|
| `--chrome-100` | `#FFFEFF` | Specular do wordmark 3D, logo da nav |
| `--mist-100` | `#EAF1F9` | Topo da fumaça (frio, levemente azulado) |
| `--mist-200` | `#C9D0DA` | Corpo da fumaça |
| `--steel-300` | `#656B77` | Fumaça média / linhas de callout |
| `--steel-400` | `#454E57` | Sombra do cromo, aresta do bisel do wordmark |
| `--chrome-900` | `#2D3138` | Base do degradê cromado do wordmark (já citado em §4/01 camada 5) |
| `--text-hi` | `#F5F6F9` | Valores do formulário (`05/03`, `20:00`, `02`) |
| `--text-base` | `#D8D9DB` | Títulos de ACT, label do botão |
| `--text-mid` | `#9E9F9F` | HUD do hero, callouts do ACT II, itens do rodapé |
| `--text-dim` | `#84868A` | Labels de formulário (`DATA`, `HORÁRIO`, `PESSOAS`) |
| `--text-faint` | `#62666A` | **Só elementos não textuais** — hairlines, ticks do trilho (D19) |
| `--line-hud` | `#91969F` | Linhas-guia / leader lines |

### Acentos
| Token | HEX | Onde aparece |
|---|---|---|
| `--salmon-200` | `#FACAB3` | Gordura / marmoreio do salmão |
| `--salmon-500` | `#EA794F` | Salmão — cor-chave da marca no escuro |
| `--salmon-600` | `#D67952` | Média do nigiri flutuante |
| `--amber-200` | `#FFE5D0` | Núcleo do neon vertical (ACT III) |
| `--amber-400` | `#FDD4A0` | Halo do neon |
| `--amber-700` | `#5E391F` | Madeira iluminada |
| `--wood-800` | `#331D08` | Madeira em sombra |

```css
:root{
  --ink-900:#040507; --ink-850:#08090C; --ink-800:#0C0E11;
  --ink-700:#16191E; --ink-600:#1D2025; --ink-500:#2D221E;
  --chrome-100:#FFFEFF; --mist-100:#EAF1F9; --mist-200:#C9D0DA;
  --steel-300:#656B77; --steel-400:#454E57;
  --text-hi:#F5F6F9; --text-base:#D8D9DB; --text-mid:#9E9F9F;
  --text-dim:#84868A; --text-faint:#62666A; --line-hud:#91969F;
  --salmon-200:#FACAB3; --salmon-500:#EA794F; --salmon-600:#D67952;
  --amber-200:#FFE5D0; --amber-400:#FDD4A0; --amber-700:#5E391F;
  --wood-800:#331D08;
}
```

**Regra de uso:** `--salmon-500` e `--amber-400` são os dois únicos acentos. Salmão =
comida/ação; âmbar = ambiente/luz. Nunca os dois na mesma peça de UI.

**Contraste (D19):** `--text-faint` (#62666A) sobre `--ink-900` dá ≈ 3,5:1 e reprova em AA,
então **deixa de ser cor de texto**. Piso para qualquer texto do site — inclusive os
callouts do ACT II, que passaram a carregar informação real (D6) — é `--text-mid`
(#9E9F9F, ≈ 6,5:1). `--text-faint` fica restrito a traços, ticks e bordas.

---

## 2. Tipografia

### O que o mockup mostra
Grotesca neutra, caixa-alta, tracking largo nos micro-labels, contraste de haste zero,
`M` com vértice descendo à linha de base, `R` de perna reta, `0` sem corte. Família do
grupo Helvetica Now / Suisse Int'l / Aktiv Grotesk. O wordmark 3D é a mesma grotesca em
corte **estendido**.

> Sinal de alerta: `SPATIAL RODİZIO` sai com **İ pontuado** (glifo turco) e os callouts
> saem como `WIKER MSASUREMENTS` / `LASER MOISCREMENT` / `SALARN SASHIMI`. Isso é ruído de
> geração de imagem, não uma fonte real — nenhum desses textos vai para o site. A copy
> reescrita está em §4/02 (D6); o `RODÍZIO` do título leva I normal.

### Candidatas Google Fonts

| Papel | Fonte | Por quê | Eixos/pesos |
|---|---|---|---|
| **Display** | **Archivo** | Grotesca com eixo de largura real (`wdth` 62–125) na variável — é o que reproduz o wordmark estendido e os títulos de ACT sem recorrer a `transform: scaleX()`. Desenho neutro; `R`/`M`/`S` batem com a referência. Não é Inter/Roboto/Arial. | `wght` 400–700, `wdth` 100–125 |
| **Corpo / HUD** | **Space Grotesk** | Numerais e sinais (`432Hz`, `05/03`, `01:20`, `//`) com o caráter técnico que a peça pede, algarismos tabulares, boa leitura em 11–14 px com tracking aberto. | 400, 500 |

Suplentes, se Archivo ficar larga demais no corpo: **Schibsted Grotesk** ou **Chivo**. Se
o cliente quiser os números ainda mais "instrumento": **JetBrains Mono** só para os
dígitos do formulário (terceira família — usar com parcimônia).

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..700&family=Space+Grotesk:wght@400;500&display=swap" rel="stylesheet">
```

### Escala tipográfica

Medida = altura de maiúscula (cap-height) no mockup; `font-size ≈ cap ÷ 0,72`.

| Token | Uso | cap@768 | vw | @1440 | `clamp()` | Tracking | Line-height |
|---|---|---|---|---|---|---|---|
| `--fs-wordmark` | `ASAMI` do hero | **96** (remedido) | 12,5 | 180 px | mobile `clamp(4rem, 24.4vw, 22rem)` · ≥768 `clamp(4rem, 17.9vw, 22rem)` ✱ | `.045em` ✱ | `1` + `text-box: trim-both cap alphabetic` |
| `--fs-display` | `SÃO BERNARDO DO CAMPO // CENTRO` | 15 | 2,71 | 39 px | `clamp(1.25rem, 2.7vw, 2.5rem)` | `0` ✱ (`wdth 92`) | `1.1` |
| `--fs-title` | `THE FEAST OF ABUNDANCE` | **9,5** ✱ | 1,78 | 25,6 px | `clamp(1.125rem, 1.78vw, 1.6rem)` ✱ | `.01em` | `1.2` ✱ |
| `--fs-eyebrow` | *(não usado no rótulo de ato)* ✱ | 8 | 1,45 | 21 px | `clamp(.75rem, 1.45vw, 1.25rem)` | `.08em` | `1.2` |
| `--fs-logo` | `ASAMI` da nav | 19 | 3,43 | 49 px | `clamp(1.375rem, 2.2vw, 1.75rem)` ✔︎ | `.03em` ✱ | `1` |
| `--fs-logo-sub` | `SUSHI` | 8 | 1,45 | 21 px | `clamp(.5rem, .8vw, .7rem)` ✔︎ | `.48em` | `1` |
| `--fs-hud` | `DEPTH 0.4MM / TENSION / MA` | 6,5 | 1,17 | 17 px | `clamp(.625rem, 1.17vw, .875rem)` ✔︎ | `.14em` | `1.3` |
| `--fs-label` | `DATA`, `HORÁRIO`, `PESSOAS` | 5,5 | 1,00 | 14 px | `clamp(.5625rem, 1vw, .75rem)` | `.16em` | `1.3` |
| `--fs-value` | `05/03`, `20:00`, `02` | 17 | 3,07 | 44 px | `clamp(1.25rem, 2.6vw, 2rem)` ✔︎ | `0` | `1` |

✔︎ (D15) = topo do `clamp()` **deliberadamente reduzido** em relação ao mockup escalado, e
essa redução fica. Fiel à proporção, os micro-textos dariam 17–21 px no desktop (grande
demais para label de UI) e os valores do formulário 44 px (estouram o card). A escala-mãe
de 1440 px está confirmada (D14), então os valores da coluna `@1440` são definitivos.

✱ **Recalibrado na construção do hero (24/09/2026)**, por medição na referência: o cap do
wordmark é 96 px@768 (não 135) e o desenho é de largura normal, não estendido — a 1440 px a
caixa da maiúscula fica em y 426–603 contra 424–604 do mockup. O tracking do logo da nav no
mockup é justo (~.03em), não .16em.

✱ **Recalibrado no ACT II (24/09/2026):** as três linhas do rótulo de ato (`ACT II`,
`THE FEAST OF ABUNDANCE`, `SPATIAL RODÍZIO`) têm o **mesmo** cap (9,5 px@768), mesma fonte e
mesmo peso, em largura normal. O rótulo inteiro usa `--fs-title` em Archivo `400 / wdth 100`;
`ACT I…IV` não é mais eyebrow menor. A 1440 px, `THE FEAST OF ABUNDANCE` mede 354 px contra
350 px no mockup.

Pesos: wordmark `500 / wdth 100` ✱ (`--fw-wordmark`, `--wdth-wordmark`); display e title `400 / wdth 112`; eyebrow, hud e label
`500 / wdth 100`. Todo texto da peça é caixa-alta — escrever em caixa normal no HTML e
aplicar `text-transform: uppercase` no CSS (leitor de tela e SEO agradecem).

---

## 3. Espaçamento, grid e raio

### Espaçamento — base 8 no layout-mãe

| Token | @1440 | vw | Onde |
|---|---|---|---|
| `--sp-1` | 8 px | 0,56 | Eyebrow → título |
| `--sp-2` | 16 px | 1,11 | Entre linhas do bloco de rótulo |
| `--sp-3` | 24 px | 1,67 | Gutter interno do grid |
| `--sp-4` | 32 px | 2,22 | Padding-top do card de reserva (17px@768) |
| `--sp-5` | 41 px | 2,86 | **Margem lateral da página** (22px@768) |
| `--sp-6` | 64 px | 4,44 | Respiro entre bloco de rótulo e palco |
| `--sp-7` | 96 px | 6,67 | Folga vertical interna de seção |
| `--sp-8` | 128 px | 8,89 | Separação entre atos |

```css
--gutter: clamp(1.25rem, 2.86vw, 2.5rem);   /* margem lateral */
--sp-3:   clamp(1rem, 1.67vw, 1.5rem);
--sp-6:   clamp(2rem, 4.44vw, 4rem);
--sp-8:   clamp(3.5rem, 8.89vw, 8rem);
```

### Grid

- Seções **full-bleed** (`width:100%`), fundo sangrando de borda a borda. Nenhum container
  de largura fixa.
- Dentro: `display:grid; grid-template-columns:repeat(12,1fr); gap:var(--sp-3);
  padding-inline:var(--gutter);`
- **Bloco de rótulo** (`ACT II` + título): colunas **1–4**, alinhado ao topo da seção,
  `margin-top: var(--sp-4)`.
- **Palco** (composição visual): sangra de borda a borda, com o conteúdo ocupando os ~70 %
  centrais.
- **Card de reserva**: x 165→604 de 768 = 21,5 %→78,6 %, largura **57 %**, centralizado →
  **colunas 3–10** (8 colunas centradas; "4–11" também são 8, mas ficariam fora do centro).
- Mobile (< 768 px): 1 coluna, rótulo acima do palco, card a 100 % menos gutter.

### Alturas de seção

| Seção | @768 | Proporção | Alvo desktop |
|---|---|---|---|
| Hero | 437 | 0,569 W | ≥768: `min(100svh, 56.9vw)`; mobile: `100svh` (56,9vw daria 222 px a 390) |
| Rodízio | 353 | 0,460 W | `max(80svh, 46vw)` |
| Sanctum | 315 | 0,410 W | `max(72svh, 41vw)` |
| Reserva | 271 | 0,353 W | `auto`, mínimo `60svh` |
| Rodapé (novo) | — | — | `auto`, ~`clamp(14rem, 22vw, 20rem)` |

### Raio de borda

| Token | Valor | Onde (medido) |
|---|---|---|
| `--r-sm` | 6 px | Chips / tags novos |
| `--r-md` | 10 px | Select e botão do formulário (5,5px@768) |
| `--r-lg` | 12 px | Card de reserva (5,5–6px@768, borda externa) |
| `--r-pill` | 9999 px | Pílula `432Hz`, toggle de som |
| `--r-full` | 50 % | Botões circulares do player (⏮ ⏸ ⏭) |

`--ctl-size: clamp(2rem, 3.1vw, 2.75rem)` — diâmetro dos botões do player e altura das
pílulas `432Hz` (24 px@768).

Bordas de 1 px: `--border-hud: 1px solid rgb(255 255 255 / .18)` e
`--border-strong: 1px solid rgb(234 238 242 / .85)` (contorno do botão WhatsApp).

Sem `box-shadow` padrão. Profundidade vem de **glow** (`filter: drop-shadow`) e de
gradientes radiais de névoa — nunca de sombra cinza genérica.

---

## 4. Camadas por seção

Legenda da coluna **Origem**:
`CSS` = puro CSS · `SVG` = SVG inline · `FOTO` = foto real de `IMAGENS/` tratada ·
`PLATE` = asset que **precisa ser gerado** (`design/plates/` → `site/assets/`) ·
`TEXTO` = texto HTML real.

---

### 01 — HERO (`01-hero.png`, y 0–437)

| # | Camada | O que é | Como implementar | Origem |
|---|---|---|---|---|
| 1 | Fundo | Preto azulado, mais claro no centro-alto | `background: radial-gradient(120% 90% at 50% 28%, #16191E 0%, #08090C 45%, #040507 100%)` | CSS |
| 2 | Névoa volumétrica | Nuvens de fumaça no terço médio, borda fria | 2–3 camadas do **mesmo** `plate-smoke-hero` (sem alpha, fundo preto), `mix-blend-mode: screen`, `mask-image` em degradê que deixa só a faixa do terço médio, `opacity .35–.5`, escalas e posições diferentes | PLATE |
| 3 | Bolhas | ~14 círculos finos, 2–6 px, subindo | 14 `<i>` com `border:1px solid rgb(255 255 255/.5); border-radius:50%` + `animation: rise` | CSS |
| 3b | Rótulo do ato | `ACT I` / `THE ARRIVAL` — **novo, não está no mockup** (D8) | `p` + `h2` no mesmo padrão dos demais atos, colunas 1–4, canto superior esquerdo abaixo da nav | TEXTO |
| 4 | Nigiri flutuante | Nigiri de salmão suspenso acima do wordmark, luz de cima | `plate-nigiri` (fundo preto) com `mix-blend-mode: screen`, sem recorte | PLATE |
| 5 | Wordmark `ASAMI` | Letras cromadas 3D, 60 % da largura | **`<h1>` de texto real.** Archivo 700/wdth 125 + `background: linear-gradient(180deg,#FFFEFF 0%,#C9D0DA 28%,#454E57 52%,#EAF1F9 62%,#2D3138 100%); -webkit-background-clip:text; color:transparent;` + `filter: drop-shadow(0 2px 0 #0C0E11) drop-shadow(0 0 40px rgb(201 208 218/.25))`. Bisel = `::before` idêntico deslocado 1 px | TEXTO+CSS |
| 6 | Piso em grade | Malha em perspectiva sob as letras, deformada ao centro | `svg` de linhas + `transform: perspective(600px) rotateX(72deg)`; ondulação com `filter:url(#wave)` (`feTurbulence`+`feDisplacementMap`) | SVG |
| 7 | Espelho d'água | Reflexo ondulado das letras na metade inferior | Clone do `h1` com `aria-hidden`, `transform: scaleY(-1)`, `mask-image: linear-gradient(to top, #000, transparent 95%)` (a máscara é aplicada antes do flip), `filter: blur(1px) url(#ripple)` | CSS+SVG |
| 8 | Nav — menu | Hambúrguer de 3 traços, ~28×22 @1440, à esquerda | `button aria-expanded` com 3 `span`; vira X ao abrir. Abre o overlay (camada 17) | CSS |
| 9 | Nav — logo | `ASAMI` / `SUSHI` centralizado, branco puro | `a` com 2 linhas; `SUSHI` com `letter-spacing:.48em` + `text-indent:.48em` para compensar | TEXTO |
| 10 | Nav — pílula `432Hz` | Cápsula contornada com `432Hz` + ícone de alto-falante | **Sem áudio na v1 (D13).** Vira ornamento inerte: `span`, não `button`, sem `role`, `aria-hidden="true"`, sem hover nem foco. Se na revisão parecer um controle quebrado, remover — a nav sobrevive sem ela | CSS |
| 11 | Trilho esquerdo | ~8 traços empilhados + botão circular `‹` | **Navegação por ato (D17).** `<nav aria-label="Atos">` com 4 `<a href="#ato-1…4">`; traço = `span` 1×6 px em `--text-faint`, ativo em `--chrome-100`. Os traços extras do mockup são decorativos e não entram | CSS |
| 12 | Indicador direito | Linha vertical fina com ponto | **Progresso de scroll (D17).** `div` de 1 px + `span` circular posicionado por `--progress`; `aria-hidden` (é espelho do trilho, não controle) | CSS |
| 13 | Barra de player | 3 botões circulares ⏮ ⏸ ⏭, canto inferior esquerdo | **Sem áudio (D13).** ⏸ vira `button aria-pressed` que **pausa/retoma as animações** (alterna `.is-paused` no `<html>`, que zera `animation-play-state` e desliga o parallax); ⏮ ⏭ **navegam entre os atos** (`scrollIntoView` no ato anterior/seguinte). Rótulos acessíveis: "Pausar animações", "Ato anterior", "Próximo ato" | SVG+CSS+JS |
| 14 | HUD central | `DEPTH 0.4MM / TENSION / MA` — texto completo confirmado (D16) | `p` em Space Grotesk 500, `--fs-hud`, `--text-mid`. Decorativo em inglês (D7) → `aria-hidden="true"` | TEXTO |
| 15 | Toggle inferior | Cápsula `432Hz` com knob claro deslizante | Mesmo destino da camada 10 (D13): ornamento inerte ou removido. Não implementar como `input` | CSS |
| 16 | Grão | Ruído sutil sobre tudo | `::after` full-bleed com `feTurbulence` em `data:` URI, `opacity .04`, `mix-blend-mode:overlay` | SVG |
| 17 | Overlay de menu | **Não existe no mockup** — tela cheia ao clicar no hambúrguer (D11) | `<dialog>` ou `div[role=dialog]` full-bleed, `background: rgb(4 5 7 / .96)` + `backdrop-filter: blur(20px)`. Itens em `--fs-title`: **Ato I · A Chegada**, **Ato II · Rodízio**, **Ato III · O Salão**, **Ato IV · Reservas** e **Cardápio** (D12 — link externo, PDF ou WhatsApp). Rótulos em PT-BR (D7). Foco preso dentro do overlay, `Esc` fecha, foco volta ao hambúrguer | CSS+JS |

---

### 02 — RODÍZIO (`02-rodizio.png`, y 437–790)

| # | Camada | O que é | Como implementar | Origem |
|---|---|---|---|---|
| 1 | Fundo | Preto puro no topo, clareando até a água embaixo | `linear-gradient(180deg,#040507 0%,#0C0E11 58%,#16191E 82%,#0A0B0F 100%)` | CSS |
| 2 | Vapor | Fumaça fina e vertical subindo dos pratos | `plate-smoke-thin.webp` × 2 (o segundo espelhado com `scaleX(-1)`), `mix-blend-mode:screen`, `animation: drift 18s` | PLATE |
| 3 | Faíscas | Pontos laranja quentes dispersos | 10–14 `<i>` de 2 px em `--salmon-500` + `filter:blur(.5px)`, `animation: ember` | CSS |
| 4 | Rótulo | `ACT II` / `THE FEAST OF ABUNDANCE` / `SPATIAL RODÍZIO` | `p` + `h2` em 2 linhas, colunas 1–4 | TEXTO |
| 5 | Tábua esquerda | Ardósia flutuante | `plate-board-left` com `screen`. **Provisório (D22)**: o arquivo atual mostra lula e polvo, que não constam no CLIENTE.md, e será substituído. Nenhum rótulo cita o conteúdo desta tábua | PLATE (provisório) |
| 6 | Tábua direita | Ardósia com sashimi de salmão e atum, wasabi | `plate-board-right` com `screen`. Se o parallax exigir camada separada, recortar com `rembg` | PLATE |
| 7 | Sombra de contato | Mancha escura difusa sob cada tábua | `::after` com `radial-gradient(ellipse, #000 0%, transparent 70%)` + `filter:blur(12px)` | CSS |
| 8 | Callouts | Linhas-guia finas, colchetes e micro-rótulos em volta da comida | `svg` inline com `line`/`path` em `--line-hud` a 1 px; os **rótulos ficam em `span` HTML** posicionados por cima, para continuarem texto real. Cor `--text-mid` (D19), todos `aria-hidden="true"` (D6) | SVG+TEXTO |
| 9 | Micro-label do topo | Rótulo com leader line horizontal | Era `STAGE // 01 TO 18` no mockup — o CLIENTE.md não tem "18 etapas" (o único "18" é o eixo do gráfico de horário de pico). **Removido** (D6). Entra `RODÍZIO // À LA CARTE`. `span` + `span` de 1 px que cresce na entrada | TEXTO+CSS |
| 10 | Espelho d'água | Reflexo ondulado das tábuas no rodapé da seção | Mesmo padrão do hero: clone `aria-hidden` + `scaleY(-1)` + máscara + `feDisplacementMap` | CSS+SVG |

#### Copy dos callouts (D6)

Os textos do mockup estão corrompidos (`WIKER MSASUREMENTS`, `LASER MOISCREMENT`,
`SALARN SASHIMI`) e a proposta anterior — `CORTE 8MM`, `180°C`, `18 ETAPAS` — inventava
dados. **Regra vigente: só informação verificável no CLIENTE.md, ou nada.**

| Posição | Texto | Fonte no CLIENTE.md |
|---|---|---|
| Label do topo | `RODÍZIO // À LA CARTE` | "rodízio e à la carte" |
| Tábua esquerda | — (linha-guia sem rótulo, D22) | A tábua provisória não mostra nada que conste no CLIENTE.md |
| Tábua direita | `SASHIMI` | "Combinado de Sushi E Sashimis"; tag de fotos "Sashimi" |
| Tábua direita | `SUSHI` | tag de fotos "Sushi" |
| Rodapé da seção | `R$ 80–160 POR PESSOA` | "R$ 80–160 por pessoa" |

**Removidos por não terem lastro:** `SHIMEJI NA CHAPA` (não aparece na tábua), lula, polvo, qualquer temperatura, espessura de corte, contagem de
etapas, `STAGE // 01 TO 18`, `LASER …`, `DEPTH`/`TENSION` dentro desta seção. Onde uma
linha-guia ficar visualmente órfã, ela permanece como traço puro, **sem rótulo** — a linha
é decoração, o texto é que precisava ser verdadeiro.

Todos os callouts levam `aria-hidden="true"` e cor `--text-mid`.

#### Notas de implementação (construção do ACT II)

- **Palco de proporção fixa** (`.rodizio__stage`): 1440×662 no desktop, 390×560 no mobile.
  Tábuas, linhas-guia (SVG com `viewBox` nas mesmas coordenadas) e rótulos HTML usam o mesmo
  sistema, então nada se desalinha em outra largura. Em mobile o SVG é outro (`.callouts--narrow`)
  e o colchete `SUSHI` sai.
- **Screen e stacking context.** `mix-blend-mode: screen` só alcança o fundo até o stacking
  context mais próximo. Por isso o palco é centralizado **sem `transform`**, as camadas de plate
  ficam num grupo `.rodizio__screen` em `screen`, e a sombra de contato (camada 7) fica **fora**
  desse grupo, senão some. A mesma regra vale para `.hero__smoke`.
- **Emenda entre atos:** o hero termina num degradê de saída para `--ink-900` (`.hero__exit`),
  o ACT II começa em `--ink-900`, o vapor nasce transparente no topo e o grão (camada 16 do
  hero) passou a ser global (`.section::after`).
- **Sem asset para o camarão/lula flutuante** do centro do mockup: o espaço fica com vapor e
  faíscas.

---

### 03 — SANCTUM (`03-sanctum.png`, y 790–1105)

| # | Camada | O que é | Como implementar | Origem |
|---|---|---|---|---|
| 1 | Fundo | Preto absoluto nas laterais, vinheta forte | `#040507` + `box-shadow: inset 0 0 200px 80px #040507` | CSS |
| 2 | Salão | **`plate-room`, PROVISÓRIO (D24)** — imagem gerada por IA, não é o salão real. **Imagem normal, sem `screen`** (não tem fundo preto): `background` de `.sanctum__room`, `filter: brightness(.42) saturate(.6) sepia(.25)` + `--ink-900` a 40 % em `multiply`, máscara em degradê nas 4 bordas (laterais quase pretas). **Um único caminho de arquivo:** `--room-img` em `css/sanctum.css` — trocar a foto real é mudar essa linha | PLATE (provisório) |
| 3 | Neon vertical | 6 barras âmbar, simétricas em torno do centro (x 403, 460, 572, 861, 974, 1033 @1440; as duas do vão da porta mais suaves) | **CSS puro:** `<i>` de 3 px, núcleo `--amber-400` com fio `--amber-200`; halo em `::before` (faixa de ~30 px, `blur(10px)`) e `::after` (~120 px, `blur(22px)`) — `box-shadow` num elemento de 2 px quase não espalha luz. Mobile: 4 barras, afastadas do título | CSS |
| 4 | Luz rebatida | Trapézios de luz nas paredes laterais | `clip-path: polygon(...)` com `linear-gradient` âmbar a 8 % de opacidade | CSS |
| 5 | Névoa de chão | Fumaça densa cobrindo a base do salão | `plate-smoke-floor.webp`, `screen`, `mask-image` vertical, `opacity .5` | PLATE |
| 6 | Rótulo | `ACT III` / `THE SANCTUM` / `THE ROOM` | `p` + `h2`, colunas 1–4 | TEXTO |
| 7 | Título de lugar | `SÃO BERNARDO DO CAMPO // CENTRO` — corrigido (D1) | `p.place` em `--fs-display`, Archivo `wdth 92` ✱, tracking 0 ✱, `--place-warm`. Halo escuro em `text-shadow` garante AA onde cruza o neon (mínimo medido 6,05:1 @1440, 12,4:1 @390). Mobile: 2 linhas (`// CENTRO` embaixo). O `SANTO ANDRÉ // JARDIM BELA VISTA` do mockup é de outra unidade e não entra | TEXTO |
| 8 | Entrada e saída | `--ink-900` no topo (emenda com o ACT II) e na base, rumo ao ACT IV | `linear-gradient(180deg, --ink-900 0%, transparent 11%, transparent 78%, --ink-900 100%)`. A névoa (camada 5) é filha direta da seção para o `screen` alcançar o fundo | CSS |

**Resolvido (D1/D2):** o mockup traz a unidade *Santo André / Jardim Bela Vista*. O site é
da unidade **São Bernardo do Campo** — Av. das Nações Unidas, 50, Centro, 09726-110.
Nenhum dado escrito no mockup (endereço, bairro, telefone) é aproveitado; tudo vem do
CLIENTE.md. O texto do mockup serve só como referência de posição e peso visual.

---

### 04 — RESERVA (`04-reserva.png`, y 1105–1376)

| # | Camada | O que é | Como implementar | Origem |
|---|---|---|---|---|
| 1 | Fundo | Lâmina d'água escura de borda a borda | `#08090C` + água **procedural** em `feTurbulence` (D21). Não existe `plate-water-tile` | CSS/SVG |
| 2 | Ondulação | Ondas horizontais finas, brilho frio | `svg` full-bleed com `feTurbulence baseFrequency="0.01 0.06"` + `feDisplacementMap` sobre um gradiente; `baseFrequency` animado | SVG |
| 3 | Névoa lateral | Bruma baixa vindo das laterais | `plate-smoke-floor.webp` reaproveitado (não há `plate-smoke-low`), `screen`, `opacity .4` | PLATE |
| 4 | Rótulo | `ACT IV` / `THE RITUAL OF CONNECTION` | `p` + `h2`, colunas 1–4 | TEXTO |
| 5 | Card de reserva | Painel preto, borda 1 px clara, `--r-lg`, 57 % de largura, colunas 4–11 | `form` com `background: rgb(4 5 7 / .78); backdrop-filter: blur(8px); border: var(--border-hud)`. **Sem backend (D9)** — nenhum `action`, `novalidate` fora, validação nativa ligada | CSS |
| 6 | Labels | `DATA`, `HORÁRIO`, `PESSOAS` — PT-BR (D7/D9) | `label` em `--fs-label`, `--text-dim`, cada um preso ao campo por `for`/`id`. `TABLE SELECT` e `TABLE GOORDINATE` do mockup são descartados: o primeiro era ilegível para o cliente e o segundo é erro de geração | TEXTO |
| 7 | Campo **DATA** | Ocupa os 2 selects biselados do mockup | `input type="date"` com `min` = hoje. Estilo do mockup: `appearance:none`, `background: linear-gradient(180deg,#3A3E44,#1D2025)`, `--r-md`, ícone SVG em `background-image` | CSS+SVG |
| 8 | Campo **HORÁRIO** | Assume a caixa `01 : 20` | `select` com faixas de 30 min. Limite superior vindo do CLIENTE.md: fecha **23:00** → última opção `22:00`. Caixa em `--ink-600` com `--border-hud` | CSS |
| 8b | Campo **PESSOAS** | Assume a caixa `01 : 02` | `input type="number" inputmode="numeric" min="1" max="20"`, mesma caixa. Substitui o `TABLE COORDINATE`, que não tinha sentido para o cliente final | CSS |
| 9 | Botão WhatsApp | Contorno claro, largura total | `button type="submit"` (não `<a>`: o texto é montado no clique). No `submit`, monta a mensagem e abre `https://wa.me/55<DDD><numero>?text=<encodeURIComponent(msg)>` em `_blank` (D9). **Número: só o do CLIENTE.md — (11) 2669-7175** (D2); ver §8.1. Rótulo em PT-BR: `RESERVAR PELO WHATSAPP`. `--border-strong`, `--r-md`, altura 66 px, `--fs-hud`. Hover: preenche em `--chrome-100`, texto em `--ink-900` | TEXTO+CSS+JS |
| 10 | Reflexo do card | O card inteiro espelhado e distorcido na água abaixo | Clone `aria-hidden`, `scaleY(-1)`, `mask-image: linear-gradient(#000 0%, transparent 65%)`, `filter: blur(2px) url(#ripple)`, `opacity .5`. Abaixo de 768 px vira reflexo estático (D18) | CSS+SVG |

#### Formulário como construído (ACT IV)

| Campo | Controle | Regras |
|---|---|---|
| **DATA** | 2 `select` com bisel metálico e chevron SVG (máscara colorida por token): **dia** e **mês** | Só de hoje até hoje + 60 dias; o select de dia se refaz ao trocar o mês. Padrão: hoje (amanhã se já passou das 20:00) |
| **HORÁRIO** | 2 `input` numéricos `HH` : `MM` (`inputmode="numeric"`, 2 dígitos) | HH 0–23, MM 0–59; **antes das 23:00** (único dado do CLIENTE.md, ver §8.2); se a data for hoje, depois de agora |
| **PESSOAS** | 2 `input` numéricos **ADULTOS** : **CRIANÇAS** | Pelo menos 1 adulto; crianças ≥ 0 |

- Cada grupo é `fieldset` + `legend` visível (`DATA`, `HORÁRIO`, `PESSOAS`); cada campo tem
  `label for` próprio (visualmente oculto: Dia, Mês, Hora, Minutos, Adultos, Crianças).
- Erros em PT-BR num `p[role=alert]` dentro do card, campo com `aria-invalid`, foco no primeiro
  inválido, borda âmbar. Sem `alert()`.
- Botão: `RESERVAR PELO WHATSAPP // (11) 2669-7175`, montado da constante `WHATSAPP` no topo de
  `js/reserva.js`. Abaixo: "A reserva é confirmada pelo restaurante no WhatsApp."
- **Sem JS**, o botão é um `<a href="https://wa.me/551126697175">` simples, sem mensagem; o JS o
  troca por `<button type="submit">`. (O número aparece no HTML só nesse fallback.)
- **Reflexo:** réplica visual do card (só `span`), `aria-hidden` + `inert`, sem ids nem campos;
  o JS espelha os valores digitados nela.
- **Água:** `feTurbulence` estático (`#water`) usado só como alfa das cristas; a cor vem do
  `fill` por token. < 768 px: faixas em gradiente + `blur` (D18).
- **Emenda:** o ACT IV começa em `--ink-900` (o mockup começa em água clara) por uma entrada em
  degradê; a página termina no reflexo do card.
- Testes: `npm run test:form` (envio, texto do wa.me, erros, sem JS, ids, Tab, foco).

#### Mensagem do WhatsApp (D9)

```
Olá! Gostaria de reservar uma mesa para o dia 27/09 às 20:30, 2 adultos e 1 criança.
```

Plural correto (`1 adulto`, `2 adultos`, `0 crianças`), `encodeURIComponent`, aberto com
`window.open(…, "_blank", "noopener")`.

---

### 05 — RODAPÉ (novo, D10)

Não existe no mockup: a página termina no reflexo do card. O rodapé é acrescentado no mesmo
registro visual — preto, hairlines, caixa-alta com tracking largo, nenhuma caixa nova.

| # | Camada | O que é | Como implementar | Origem |
|---|---|---|---|---|
| 1 | Fundo | Continuação da água, escurecendo até preto chapado | `linear-gradient(180deg, #08090C 0%, #040507 55%)`; sem borda superior — a transição é só o gradiente | CSS |
| 2 | Régua | Hairline de 1 px separando do ACT IV | `border-top: 1px solid rgb(255 255 255 / .08)` com `margin-inline: var(--gutter)` | CSS |
| 3 | Endereço | `Av. das Nações Unidas, 50 — Centro, São Bernardo do Campo — SP, 09726-110` | `address` em `--fs-hud`, `--text-mid`, link para o Google Maps (plus code `8C5R+2J` como reforço) | TEXTO |
| 4 | Horário | `Todos os dias · fecha às 23:00` | `p` em `--fs-label`, `--text-dim`. **Só "fecha 23:00" consta no CLIENTE.md** — o horário de abertura está em §8.2 | TEXTO |
| 5 | Faixa de preço | `R$ 80–160 por pessoa` | `p` em `--fs-label`, `--text-dim` | TEXTO |
| 6 | Instagram | Link único de rede | `a` com ícone SVG inline (traço 1,5 px, `currentColor`) + handle. URL em §8.3 | SVG+TEXTO |
| 7 | Marca | Wordmark `ASAMI` / `SUSHI` **em texto**, no mesmo desenho do logo da nav (D23). O logo real (`imgi_2`, 150 px) é pequeno demais e fica **só como favicon** até chegar um arquivo melhor | TEXTO |
| 8 | Créditos | Linha final discreta | `p` em `--fs-label`, `--text-dim` | TEXTO |

Layout **como construído** (id `#rodape`): **3 colunas iguais** no desktop — (1) wordmark
`ASAMI SUSHI` em texto + nome + "restaurante japonês · rodízio e à la carte"; (2) endereço, um
link único para o Google Maps (`maps/search`, sem iframe) com "Ver no Google Maps ↗";
(3) horário (`Fecha às 23:00`), preço (`R$ 80–160`) e telefone (`tel:`, montado da constante
`WHATSAPP`). Empilha em 1 coluna no mobile, na mesma ordem. **Sem Instagram** (não consta no
CLIENTE.md), sem CNPJ, sem créditos. Começa em `--ink-900` puro (o ACT IV termina num degradê
de saída) e usa o mesmo grão global (`.section::after`).

---

## 4b. Navegação e menu (como construídos)

**Onde fica cada peça.** Trilho (camada 11), progresso (12) e player (13) ficam num
`<div class="act-nav">` no nível do `<body>`, **fora das seções**: cada ato é um stacking
context isolado (`isolation: isolate`, necessário para o `screen` dos plates), e como filhos do
hero seriam cobertos pelos atos seguintes.

| Peça | Desktop (≥ 768 px) | Mobile |
|---|---|---|
| Trilho | `fixed`, centro a 51,5 % da altura; some quando o rodapé invade a faixa central | `absolute` sobre o hero (fixo cobriria os cards) |
| Progresso | `fixed`, ponto em `top: calc(var(--progress) * 100%)`; `--progress` = scroll ÷ (altura − viewport) | idem, sobre o hero |
| Player | `fixed` no canto inferior esquerdo; **sobe junto com o rodapé** (`--nav-lift`) para nunca cobri-lo nem sumir | `absolute`, na linha inferior do hero |

- **Trilho (D17):** 4 links reais `#ato-1…4` com `aria-label` ("Ato III · Ambiente"…). O ato que
  cruza a **linha do meio da viewport** (`IntersectionObserver`, `rootMargin -50% 0 -50% 0`)
  recebe `aria-current="location"` e o traço longo em `--chrome-100`.
- **⏮ ⏭:** rolam até o ato vizinho com `scrollIntoView` — `smooth`, ou `auto` sob
  `prefers-reduced-motion`. Nas pontas ficam `aria-disabled="true"` (continuam focáveis).
- **Âncoras:** `.section { scroll-margin-block: 0 }` — atos full-bleed encostam no topo.
- **432Hz (D13):** as duas pílulas são `span aria-hidden`, com `pointer-events: none` e
  `cursor: default`: sem hover, sem foco, sem cara de controle.

**Menu (camada 17, D11).** Itens: **Rodízio** (`#ato-2`), **Ambiente** (`#ato-3`),
**Reservas** (`#ato-4`), **Cardápio** (`wa.me` com "Olá! Gostaria de ver o cardápio.", mesma
constante `WHATSAPP` de `js/config.js`; nova aba). Overlay `div[role=dialog][aria-modal]` em
`--ink-900` com `plate-smoke-floor` em `screen` (recortado por `.menu__bg`, que não cria stacking
context), itens em `--fs-display`, fade de 200 ms na abertura.
- Com JS: o hambúrguer vira `<button aria-expanded aria-controls="menu">` e se transforma em X;
  o header fica `fixed` acima do overlay; foco preso (X → itens → X), `Esc` fecha e devolve o foco
  ao botão, o resto da página fica `inert`, rolagem travada (`overflow: hidden` + `padding-right`
  da largura da barra, para nada se deslocar). Clicar num item fecha e segue o link.
- **Sem JS:** o hambúrguer é `<a href="#menu">`, o overlay abre por `:target`, os itens são
  links comuns e há um link "Fechar menu"; o trilho continua com links reais.

Testes: `npm run test:nav` (menu por teclado e clique, foco preso, Esc, scroll travado,
⏮ ⏭ + trilho, ⏸, progresso, sem JS, overflow, console, requests) e `npm run test:form`.

---

## 5. Animação por seção

Base global:
`--ease-out: cubic-bezier(.16,1,.3,1)` · `--ease-soft: cubic-bezier(.4,0,.2,1)` ·
durações `--t-fast:220ms` `--t-mid:600ms` `--t-slow:1200ms` `--t-cine:2400ms`.

Tudo dentro de `@media (prefers-reduced-motion: no-preference)`. Com movimento reduzido:
sem parallax, sem loop de fumaça/água, sem contador — só `opacity` em 200 ms.

**Dois interruptores globais além desse:**

- **Pausa manual (D13) — gancho pronto, ainda sem efeito visual.** O ⏸ do player
  (`[data-pause]`, `js/nav.js`) alterna **`<html data-motion="paused">`** e `aria-pressed`
  (o ícone vira ▶ quando pressionado). Hoje não há animação para pausar. **Contrato para a etapa
  de motion:** toda animação/loop deve respeitar o atributo, por exemplo
  ```css
  :root[data-motion="paused"] *, :root[data-motion="paused"] *::before, :root[data-motion="paused"] *::after {
    animation-play-state: paused !important;
  }
  ```
  e todo JS de parallax/`requestAnimationFrame` deve checar
  `document.documentElement.dataset.motion === "paused"` antes de mover algo. É o mesmo estado
  visual do `prefers-reduced-motion`, só que por escolha do visitante. O botão inicia em
  `aria-pressed="false"` e reflete o estado real.
- **Corte em mobile (D18).** Abaixo de **768 px**, todos os reflexos perdem o
  `filter: url(#ripple)` e ficam **estáticos com `blur(3px)`**; a distorção por
  `feTurbulence` roda só a partir de 768 px. Vale para os 3 reflexos (hero, rodízio,
  reserva) e para a ondulação da água do ACT IV, que em mobile vira gradiente fixo.
  `feTurbulence` animado é caro demais para GPU de celular.

### Hero
| Elemento | Animação |
|---|---|
| Entrada da página | Fade a partir de `#040507`, 800 ms; wordmark entra de `scale(1.06)` + `blur(14px)` → `scale(1)` + `blur(0)` em 1800 ms `--ease-out` |
| Fumaça | 3 camadas em `translateX` + `scale` lentos, 40–70 s, `alternate`, `linear` |
| Bolhas | `rise`: `translateY(0 → -180px)` + `opacity 0→.6→0`, 6–14 s, delays escalonados |
| Nigiri | Flutuação `translateY(±10px)` + `rotate(±2deg)`, 7 s `ease-in-out infinite alternate` |
| Grade do piso | `feTurbulence` com `baseFrequency` animado (SMIL ou `requestAnimationFrame`), ciclo de 12 s |
| Reflexo | Mesmo ripple, defasado 400 ms |
| Scroll | Parallax: wordmark `translateY(scroll × .25)`, fumaça `× .10`, água `× .40`. Via `animation-timeline: view()` onde houver suporte; `IntersectionObserver` + `transform` como fallback |
| Rótulo `ACT I / THE ARRIVAL` | Entra com `delay 2000ms` (depois do wordmark assentar), `translateY(12px)` + fade, 600 ms |
| HUD / player | `opacity 0→1` com `delay 1600ms`; hover nos botões leva a borda a `--chrome-100` em 220 ms |
| Trilho de seção | Traço do ato ativo cresce de 6 → 14 px e clareia, 300 ms; segue o `IntersectionObserver` dos atos |
| ⏮ ⏭ do player | Rolagem suave até o ato vizinho, `behavior:"smooth"` (ou salto direto sob movimento reduzido) |
| Overlay de menu | Abre com `opacity 0→1` + `backdrop-filter: blur(0→20px)` em 400 ms; itens entram em cascata de 60 ms, `translateY(12px)` → 0 |

### Rodízio
| Elemento | Animação |
|---|---|
| Rótulo | Entra em `translateY(16px)` + fade, 600 ms, ao atingir 35 % de visibilidade |
| Tábuas | Sobem de `translateY(40px) rotateX(6deg)` até o repouso, 1200 ms, com 180 ms de defasagem entre esquerda e direita |
| Flutuação contínua | Cada tábua em `translateY(±6px)`, 9 s e 11 s (dessincronizadas) |
| Vapor | Loop vertical de 18 s + `opacity` pulsante |
| Faíscas | `ember`: sobe 60 px, `opacity 0→1→0`, 3–5 s, delays aleatórios |
| Callouts | Linhas-guia desenhadas com `stroke-dasharray`/`stroke-dashoffset` 0→100 % em 700 ms; o rótulo entra 200 ms depois. Defasagem de 120 ms entre callouts |
| Parallax | Tábuas `× .12`, fumaça `× .06`, reflexo `× .20` |
| Hover na tábua | `scale(1.02)` + realce do próprio callout (linha passa a `--chrome-100`), 220 ms |

### Sanctum
| Elemento | Animação |
|---|---|
| Neon | Ao entrar, acende em cascata da esquerda para a direita, 90 ms entre barras, cada uma com flicker de 3 quadros (`opacity .2 → 1 → .7 → 1`) |
| Neon (loop) | `box-shadow` pulsando ±8 % em 5 s; uma barra com micro-flicker aleatório a cada ~12 s |
| Salão | `scale(1.08 → 1.0)` em 2400 ms na entrada; depois zoom lento contínuo até `1.03` ao longo do scroll |
| Névoa de chão | Deriva horizontal de 50 s |
| `SÃO BERNARDO DO CAMPO // CENTRO` | Fade + `letter-spacing: .12em → .02em`, 1400 ms `--ease-out` |
| Parallax | Salão `× .08` (fundo), neon `× .14`, névoa `× .22` |

### Reserva
| Elemento | Animação |
|---|---|
| Água | Ripple contínuo (`baseFrequency` 0,008→0,014), ciclo de 9 s |
| Card | Entra em `translateY(24px)` + `blur(6px)` até o repouso, 900 ms |
| Reflexo | Entra 250 ms depois, `opacity 0 → .5` |
| Campos | Foco: borda de `--border-hud` para `--chrome-100` + `box-shadow: 0 0 0 3px rgb(255 255 255/.06)`, 180 ms |
| Valores numéricos | Os campos agora são editáveis (D9), então **não** há contador de entrada: o valor inicial já aparece posto. O efeito `steps()` fica só no campo `PESSOAS`, ao usar as setas — o dígito desliza 1 → 2, 160 ms |
| Botão WhatsApp | Hover: fundo varre da esquerda (`::before` com `scaleX(0→1)`, `transform-origin:left`), texto inverte para `--ink-900`, 300 ms. Foco visível: `outline: 2px solid var(--amber-400); outline-offset: 3px` |
| Confirmação | Ao enviar, ondulação circular na água partindo do botão, 600 ms (`radial-gradient` animado), enquanto a aba do WhatsApp abre |

### Rodapé
| Elemento | Animação |
|---|---|
| Entrada | Bloco inteiro em fade + `translateY(12px)`, 500 ms, ao atingir 20 % de visibilidade. Sem parallax — o rodapé é o ponto de repouso da página |
| Links | Sublinhado cresce da esquerda (`background-size: 0 1px → 100% 1px`), 200 ms |
| Wordmark | Apenas `opacity .85 → 1` no hover. Nunca escalar nem colorir |

---

## 6. Inventário de assets

### Fotos reais disponíveis (`IMAGENS/`)
| Arquivo | Conteúdo | Dimensão | Uso proposto |
|---|---|---|---|
| `imgi_21_…812_n.jpg` | Mesa farta: sashimis, sushis, shimeji na chapa, carne | 720×1280 | Origem dos recortes das tábuas (ACT II) |
| `imgi_22_…016_n.jpg` | Camarão na chapa de ferro sobre base de madeira | 1080×1350 | Nenhum na v1 |
| `imgi_23_…555_n.jpg` | Pessoa segurando travessa de sushi, mesa posta à frente | 1080×1350 | Nenhum na v1 (não mostra o salão, ver D20) |
| `imgi_25_…397_n.jpg` | Camarão empanado na chapa de ferro | 1080×1350 | Recorte para a tábua esquerda |
| `imgi_27_…611_n.jpg` | Camarão empanado com molho, close em prato | 1080×1350 | Recorte / detalhe |
| `imgi_2_…314_n.jpg` | **Logo real:** "ASAMI Sushi" em pincelada vermelha sobre onda de Hokusai | 150×150 | **Só favicon** (D3, D23) |

**Tratamento obrigatório (D4).** As 5 fotos são registros de celular, luz de dia, madeira
clara e saturada, todas com **marca d'água vermelha "Asami Sushi"** no canto superior. A
direção de arte é noturna e dessaturada. Toda foto passa por: recorte da marca d'água,
remoção de fundo, regrade (`saturate(.55) contrast(1.15) brightness(.7)` + camada
`--ink-900` em `multiply` a 35 %) e luz de contato pintada. O resultado é gravado como
plate em `design/plates/` e copiado para `site/assets/` — **a pasta `IMAGENS/` nunca é
referenciada pelo site**. `imgi_21` (720×1280) é curta de resolução: usar só para recortes
pequenos, nunca em elemento de largura total.

**Nada de ambiente inventado (D5).** Todo plate fotográfico nasce de uma das 5 fotos
acima. Não há geração de cenário, prato ou salão que não exista.

### Plates (`design/plates/` → `site/assets/`)

Mapeamento completo e pesos em **`assets.md`**. Todos em WebP 800/1600 px, fundo preto,
`mix-blend-mode: screen`, sem recorte.

| Asset | Para quê | Status |
|---|---|---|
| `plate-smoke-hero` | Névoa do hero (substitui `plate-smoke-01/02/03`) | ✅ |
| `plate-smoke-thin` | Vapor do ACT II (duplicado/espelhado) | ✅ |
| `plate-smoke-floor` | Névoa de chão (ACT III) + bruma (ACT IV, substitui `plate-smoke-low`) | ✅ |
| `plate-nigiri` | Nigiri flutuante do hero | ✅ |
| `plate-board-left` | Tábua esquerda do ACT II | ⚠️ provisório (D22) |
| `plate-board-right` | Tábua direita do ACT II | ✅ |
| `plate-water-tile` | — | ❌ cancelado: água procedural (D21) |
| `plate-room` | Salão do ACT III | ⚠️ **provisório (D24)** — gerado por IA |
| `logo-asami-150` | Favicon | ✅ só favicon (D23) |

`plate-room` (salão gerado) entra como **provisório** (D24, substitui D5/D20 para o ACT III).
Fumaça é plate sintético; água é procedural (D21).

Feito só em CSS/SVG, sem asset nenhum: grade do piso, neon, bolhas, faíscas, grão, todos
os reflexos, todo o cromo do wordmark, todas as linhas de callout e a água do ACT IV.

---

## 7. Decisões (dúvidas resolvidas)

As dúvidas levantadas estão **todas fechadas**: D1–D19 na análise do mockup, D20–D23 no
inventário de plates. Cada uma vira uma regra, com
o efeito que já foi aplicado nas seções acima.

### Conteúdo e marca

| # | Decisão | Onde já está aplicado |
|---|---|---|
| **D1** ✅ | **Unidade: São Bernardo do Campo.** Texto do ACT III passa a `SÃO BERNARDO DO CAMPO // CENTRO`. | §4/03 camada 7 |
| **D2** ✅ | **Telefone e endereço só do CLIENTE.md.** Nada escrito no mockup é aproveitado como dado: o `(11) 4427-8202` e o bairro *Jardim Bela Vista* são descartados. Valem `(11) 2669-7175` e Av. das Nações Unidas, 50, Centro, SBC, 09726-110. | §4/03 nota, §4/04 camada 9, §4/05 camadas 3 e 6 |
| **D3** ✅ | **Logo real (pincelada vermelha sobre a onda) = favicon + rodapé, só.** O visual do site segue o mockup. O vermelho da marca fica contido no logo e **não entra na paleta**. | §4/05 camada 7, §6 |
| **D6** ✅ | **Callouts só com informação verdadeira do CLIENTE.md.** Temperatura, espessura de corte e contagem de etapas saem por não terem lastro; onde não houver dado real, a linha-guia fica sem rótulo. Todos `aria-hidden`. | §4/02, tabela de copy |
| **D7** ✅ | **Rótulos de ato em inglês (decorativos), todo texto funcional em PT-BR.** `ACT II / THE FEAST OF ABUNDANCE` fica; menu, formulário, botão e rodapé são português. | §4/01 camada 17, §4/04, §4/05 |
| **D8** ✅ | **`ACT I / THE ARRIVAL` acrescentado ao hero**, no padrão dos outros atos. | §0 tabela de seções, §4/01 camada 3b |
| **D10** ✅ | **Rodapé mínimo criado** no mesmo estilo: endereço, horário, faixa de preço, Instagram, logo real. | §4/05 (nova) |
| **D11** ✅ | **Menu = overlay em tela cheia** com âncoras para os 4 atos + Cardápio. | §4/01 camada 17 |
| **D12** ✅ | **Cardápio é link no menu** (PDF ou WhatsApp). Sem quinto ato na v1. | §4/01 camada 17, §0 nota |

### Imagem

| # | Decisão | Onde já está aplicado |
|---|---|---|
| **D4** ✅ | **Plates gerados a partir das fotos reais**, em `design/plates/`. A pasta `IMAGENS/` nunca é referenciada pelo site. | §6 |
| **D5** ✅ | **Nada de ambiente inventado.** `plate-room` cancelado. Fumaça e água seguem sintéticas — são fenômeno, não ambiente. | §4/03 camada 2, §6 |
| ~~D20~~ | **Substituída por D24.** ACT III sem foto do salão. Nenhuma foto do cliente mostra o salão (`imgi_23` é uma pessoa com uma travessa). O ato fica só com neon + névoa; slot comentado para a foto real futura. | §4/03 camada 2, §6 |
| **D21** ✅ | **Água do ACT IV procedural** (`feTurbulence`). Não existe `plate-water-tile`. | §4/04 camada 1, §6 |
| **D22** ✅ | **`plate-board-left` é provisório** (mostra lula/polvo, fora do CLIENTE.md) e será substituído. Callouts só com texto do CLIENTE.md; a tábua esquerda fica sem rótulo. | §4/02 camadas 5 e 8, §6 |
| **D23** ✅ | **Logo real só como favicon.** O rodapé usa o wordmark em texto até chegar um arquivo em alta. | §4/05 camada 7, §6 |
| **D24** ✅ | **`plate-room` no ACT III como imagem PROVISÓRIA** (substitui D5 e D20 para esta camada). É gerado por IA e **não corresponde ao salão real**: confirmar com o cliente ou trocar por foto real antes da entrega. Sem `screen` (não tem fundo preto): imagem normal escurecida, mascarada e com vinheta. Trocar = mudar `--room-img` em `css/sanctum.css`. | §4/03 camada 2, §6, assets.md |

### Comportamento

| # | Decisão | Onde já está aplicado |
|---|---|---|
| **D9** ✅ | **Formulário sem backend.** Campos `DATA`, `HORÁRIO`, `PESSOAS`. No clique, monta a mensagem e abre `wa.me` com texto pré-preenchido. | §4/04 camadas 5–9 + bloco da mensagem |
| **D13** ✅ | **Sem áudio na v1.** `432Hz` vira ornamento inerte (`span`, `aria-hidden`) ou é removido. ⏸ pausa/retoma as animações; ⏮ ⏭ navegam entre os atos. | §4/01 camadas 10, 13 e 15; §5 interruptores globais |
| **D17** ✅ | **Trilho esquerdo = navegação por ato** (links reais). **Indicador direito = progresso de scroll** (decorativo, `aria-hidden`). | §4/01 camadas 11 e 12 |

### Técnicas

| # | Decisão | Onde já está aplicado |
|---|---|---|
| **D14** ✅ | **Escala-mãe do mockup: 1440 px** (fator 1,875). A coluna `@1440` da escala tipográfica é definitiva. | §0, §2 |
| **D15** ✅ | **Redução dos micro-textos mantida.** Os topos de `clamp()` marcados ✔︎ ficam como estão, mesmo divergindo da proporção do mockup. | §2 |
| **D16** ✅ | **HUD do hero: `DEPTH 0.4MM / TENSION / MA`**, texto completo. Decorativo em inglês → `aria-hidden`. | §2, §4/01 camada 14 |
| **D18** ✅ | **Abaixo de 768 px, reflexo estático com blur.** `feTurbulence` animado só a partir de 768 px, nos 3 reflexos e na água do ACT IV. | §5 interruptores globais, §4/04 camada 10 |
| **D19** ✅ | **Piso de `--text-mid` para todo texto informativo.** `--text-faint` deixa de ser cor de texto e fica só para traços, ticks e bordas. | §1 nota de contraste, §4/02 camada 8 |

---

## 8. Pendências

Nenhuma bloqueia o início do desenvolvimento — todas têm um caminho padrão definido. São
dados que o CLIENTE.md simplesmente não tem.

**8.1 — O número do CLIENTE.md parece ser fixo.** `(11) 2669-7175` tem cara de telefone fixo,
e `wa.me` exige uma linha com WhatsApp. **Por decisão do cliente (24/09/2026), o botão já usa
`wa.me` com esse número**, que está numa única constante (`WHATSAPP`, topo de
`js/reserva.js`) com um aviso para confirmar. Se não for WhatsApp, basta trocar a constante
(e o `href` do fallback sem JS no `index.html`).

**8.2 — Horário de abertura.** O CLIENTE.md só registra "Aberto · Fecha 23:00" e o gráfico
de movimento indo das 06h às 21h, o que não é horário de funcionamento. Até haver
confirmação, o rodapé exibe apenas `Fecha às 23:00`, sem afirmar dias nem hora de abertura, e
**o formulário só valida o limite superior (antes das 23:00)** — não há limite inferior. Quando
a abertura for confirmada, é uma constante (`FECHA` → acrescentar `ABRE`) em `js/reserva.js`.

**8.3 — Instagram.** As fotos vêm claramente do Instagram, mas o CLIENTE.md não traz o
`@`. O link do rodapé fica atrás da mesma constante; sem ele, o item simplesmente não
renderiza (nada de link morto).

**8.4 — Destino do cardápio.** D12 define "PDF ou WhatsApp", mas não há arquivo nem URL.
Padrão: o item `Cardápio` do menu aponta para o mesmo destino do botão de contato, até
existir um PDF.

**8.5 — CNPJ e razão social.** Não constam no CLIENTE.md. O rodapé fica sem eles; se forem
exigidos, entram como uma quarta linha na coluna do endereço, sem mudar o layout.

