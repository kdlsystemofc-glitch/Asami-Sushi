# Asami Sushi — São Bernardo do Campo

Landing page do **Asami Sushi São Bernardo** (rodízio, Centro de SBC), construída a partir de um
mockup em quatro "atos" + rodapé. HTML/CSS/JS estático, sem framework nem build: o que está em
`site/` é o que vai para o ar.

> **Repositório privado.** Contém material do cliente (fotos, dados do restaurante) e imagens
> **geradas por IA, provisórias**, que não podem ir para produção sem aprovação:
> `plate-board-left` (tábua do ACT II, **D22**) e `plate-room` (salão do ACT III, que **não é o
> salão real**, **D24**). Ver `assets.md`.

## Estrutura

| Pasta / arquivo | O que é |
|---|---|
| `site/` | O site publicável: `index.html`, `css/` (um arquivo por seção + `tokens.css` + `motion.css`), `js/` (`config.js`, `menu.js`, `nav.js`, `reserva.js`, `motion/core.js`, `vendor/`), `assets/` (WebP gerados) |
| `DESIGN.md` | Especificação: paleta, tipografia, grid, camadas de cada ato, regimes responsivos e o registro de decisões (D1–D25) |
| `CLIENTE.md` | Dados do restaurante (endereço, horário, telefone, preço). Única fonte de texto factual do site |
| `assets.md` | Inventário de imagens, mapeamento slot → arquivo e pendências |
| `design/` | **Referência visual apenas** (mockup, recortes por seção, plates originais). Nunca carregada pelo site |
| `IMAGENS/` | Fotos enviadas pelo cliente (material de referência) |
| `scripts/` | Geração de assets, servidor local, screenshots, testes e auditoria |
| `CLAUDE.md` | Regras do projeto |

## Como rodar

Requisitos: Node 18+ e, para regerar os assets, Python 3 com Pillow (`py` no Windows).

```sh
npm install                 # Playwright (testes), GSAP e Lenis (fonte de site/js/vendor)
npx playwright install chromium

npm run serve               # site em http://localhost:4173 (PORT=4391 npm run serve para outra porta)
npm run assets              # regera site/assets/*.webp a partir de design/plates
npm run shots               # screenshots em 1440 e 390 → screenshots/
npm run audit               # 12 telas + texto 200 %, movimento reduzido/tema claro, fontes bloqueadas, CLS
npm run test:nav            # menu, teclado, trilho de atos, ⏮ ⏭ ⏸
npm run test:form           # validação e mensagem do formulário de reserva
npm run test:motion         # motion: base (modos, Lenis, âncoras, data-*, sem JS, file://) + os 4 atos (quadros, vídeo, custo; no ACT IV, o formulário durante a animação)
npm run vendor              # copia os builds de GSAP/Lenis de node_modules para site/js/vendor
npm run lh                  # Lighthouse mobile, 3 execuções, mediana
```

O site também abre por duplo clique em `site/index.html` (`file://`): todo o JS é script clássico.

`screenshots/` e relatórios do Lighthouse são gerados e ficam fora do git.

## Decisões principais

Todas registradas em [`DESIGN.md`](DESIGN.md) (tabela de decisões e §3b "Regimes responsivos").
Em resumo:

- **Plates com fundo preto + `mix-blend-mode: screen`**, sem recorte.
- **Reserva pelo WhatsApp**: o formulário monta a mensagem e abre `wa.me`. O número fica numa
  única constante em `site/js/config.js`. **Falta confirmar com o cliente que o número tem WhatsApp.**
- **Sem áudio na v1**: a pílula do topo é o link `RESERVAR` (D25); ⏸ pausa todas as animações.
- **Motion (D26–D30)**: modos `full` / `reduced` / `paused` em `js/motion/core.js`, qualidade
  `low`/`high` por aparelho, rolagem suave com Lenis, GSAP carregado fora do caminho do LCP. Ver
  DESIGN.md §5.0.
- **Responsivo por orientação**: retrato usa a composição vertical, paisagem a do mockup.
  Alvos de toque de 44 px.
- **Tudo é texto HTML real**; cores, fontes e espaçamentos só por variáveis de `tokens.css`.

## Bibliotecas de terceiros

Auto-hospedadas em `site/js/vendor/` (sem CDN), copiadas de `node_modules` por `npm run vendor`.

| Biblioteca | Versão | Arquivos | Licença |
|---|---|---|---|
| [GSAP](https://gsap.com) (core + ScrollTrigger) | 3.15.0 | `gsap.min.js`, `ScrollTrigger.min.js` | GSAP Standard "no charge" License ([gsap.com/standard-license](https://gsap.com/standard-license)): uso gratuito, inclusive comercial; o aviso de copyright fica no topo de cada arquivo. Não é uma licença open source; os termos completos estão no link |
| [Lenis](https://github.com/darkroomengineering/lenis) | 1.3.26 | `lenis.min.js` | MIT, © darkroom.engineering. O texto da licença está em `site/js/vendor/lenis.LICENSE.txt`, já que o build minificado não traz o aviso |

## Pendências antes da entrega

- Confirmar o WhatsApp de (11) 2669-7175 e o horário de abertura (hoje só "fecha 23:00").
- Trocar ou aprovar as imagens provisórias geradas por IA (D22, D24).
- Testes em iPhone e Android reais (lista no fim da passada responsiva, `DESIGN.md` §3b).
- Etapas de animação por seção (a base de motion está pronta: DESIGN.md §5.0).
