# Linha de base antes do motion

Medida em 24/09/2026 no commit `ae83ff0` ("docs: regra de commit e push por etapa"), antes de
qualquer código de motion. Serve para comparar as etapas de motion.

## Auditoria responsiva (`npm run audit`)

- **Telas:** 12 (2560×1440 até 320×568 e 844×390 deitado), com **0 problemas** em todas.
- **Modos especiais:** texto 200 %, movimento reduzido + tema claro e fontes bloqueadas, com **0 problemas**.
- **CLS com fontes atrasadas 1,5 s:** 0,0030 em 1440×900 e 0,0011 em 390×844.
- **Requests a `/design` ou `/IMAGENS`:** 0, de 30 requests únicas.

## Lighthouse mobile (`npm run lh`)

Lighthouse 13.5.0, perfil mobile com throttling simulado, rodando no Chromium do Playwright.
O servidor estático sobe dentro do script (`scripts/lighthouse.mjs`). São 3 execuções e vale a
mediana.

| Desempenho | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|
| **80** | **100** | **100** | **100** |

| FCP | LCP | TBT | CLS | Speed Index |
|---|---|---|---|---|
| 3,0 s | 3,7 s | 0 ms | 0,000 | 5,5 s |

As 3 execuções deram exatamente os mesmos números.

- **Elemento de LCP:** `img.hero__smoke-layer--c` (a fumaça do hero). O nigiri tem `preload` e
  `fetchpriority="high"`. Quase todo o LCP é "element render delay" (2,95 s), que é a espera
  pelo CSS e pelas fontes que bloqueiam a renderização.
- **JavaScript:** 4 arquivos, 14,1 KB transferidos (config.js, menu.js, nav.js e reserva.js).
  O peso total da página é de 465 KB.
- **Oportunidades:**
  - render-blocking: economia estimada de 1 760 ms no FCP;
  - cache: 320 KiB;
  - entrega de imagens: 128 KiB;
  - CSS sem minificar: 25 KiB.

A passada responsiva registrou 84 (SI 3,4 s) com a mesma versão do Lighthouse. Aquela medição
foi uma execução só, contra `npm run serve`. Os números não são comparáveis entre os dois
métodos, por isso as etapas de motion comparam só medições feitas com `npm run lh`.

---

## Depois da etapa "motion base"

Medido com o mesmo método (`npm run lh`, 3 execuções, mediana) e a mesma auditoria.

| | Desempenho | FCP | LCP | TBT | CLS | Speed Index |
|---|---|---|---|---|---|---|
| Antes | 80 | 3,0 s | 3,7 s | 0 ms | 0,000 | 5,5 s |
| Depois | **84** | 3,0 s | 3,7 s | 0 ms | 0,001 | 3,0 s |

Acessibilidade, boas práticas e SEO continuam em 100. O elemento de LCP não mudou
(`img.hero__smoke-layer--c`).

- **LCP e FCP:** idênticos.
- **Os 4 pontos a mais vêm do Speed Index**, que nesta sessão variou entre 3,0 e 5,9 s em
  execuções do mesmo código. A leitura correta é "não piorou", não "melhorou".
- **Primeira tentativa (scripts com `defer`):** 76, com LCP de 4,4 s. Um experimento sem os
  scripts voltou a 84 / 3,7 s. Por isso o motion passou a ser carregado depois do `load`, na
  1ª interação ou 2,5 s depois (D29).
- **Auditoria responsiva:** 0 problemas nas 12 telas e nos 3 modos especiais. CLS com fontes
  atrasadas continua em 0,0030 / 0,0011. Requests a `/design` ou `/IMAGENS`: 0, de 35.

**JS novo** (pedido depois do `load`):

| Arquivo | Tamanho | gzip |
|---|---|---|
| `vendor/gsap.min.js` | 71,2 KB | 27,7 KB |
| `vendor/ScrollTrigger.min.js` | 43,5 KB | 17,6 KB |
| `vendor/lenis.min.js` | 18,3 KB | 5,3 KB |
| `motion/core.js` | 16,0 KB | 5,6 KB |
| **Total de JS** | **149,0 KB** | **56,2 KB** |

Somam-se `css/motion.css` (2,3 KB, 1,0 KB gzip, bloqueante como os outros CSS) e cerca de
1,6 KB de script inline no `<head>`. O servidor local não comprime, por isso o Lighthouse
contabiliza 164 KB transferidos. Numa hospedagem com gzip ou brotli (Vercel), vão cerca de
56 KB.
