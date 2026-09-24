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
| `site/` | O site publicável: `index.html`, `css/` (um arquivo por seção + `tokens.css`), `js/` (`config.js`, `menu.js`, `nav.js`, `reserva.js`), `assets/` (WebP gerados) |
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
npm install                 # Playwright (testes e screenshots)
npx playwright install chromium

npm run serve               # site em http://localhost:4173 (PORT=4391 npm run serve para outra porta)
npm run assets              # regera site/assets/*.webp a partir de design/plates
npm run shots               # screenshots em 1440 e 390 → screenshots/
npm run audit               # 12 telas + texto 200 %, movimento reduzido/tema claro, fontes bloqueadas, CLS
npm run test:nav            # menu, teclado, trilho de atos, ⏮ ⏭ ⏸
npm run test:form           # validação e mensagem do formulário de reserva
```

`screenshots/` e relatórios do Lighthouse são gerados e ficam fora do git.

## Decisões principais

Todas registradas em [`DESIGN.md`](DESIGN.md) (tabela de decisões e §3b "Regimes responsivos").
Em resumo:

- **Plates com fundo preto + `mix-blend-mode: screen`**, sem recorte.
- **Reserva pelo WhatsApp**: o formulário monta a mensagem e abre `wa.me`. O número fica numa
  única constante em `site/js/config.js`. **Falta confirmar com o cliente que o número tem WhatsApp.**
- **Sem áudio na v1**: a pílula do topo é o link `RESERVAR` (D25); ⏸ alterna
  `html[data-motion="paused"]`, gancho para a futura etapa de animação.
- **Responsivo por orientação**: retrato usa a composição vertical, paisagem a do mockup.
  Alvos de toque de 44 px.
- **Tudo é texto HTML real**; cores, fontes e espaçamentos só por variáveis de `tokens.css`.

## Pendências antes da entrega

- Confirmar o WhatsApp de (11) 2669-7175 e o horário de abertura (hoje só "fecha 23:00").
- Trocar ou aprovar as imagens provisórias geradas por IA (D22, D24).
- Testes em iPhone e Android reais (lista no fim da passada responsiva, `DESIGN.md` §3b).
- Etapa de animação.
