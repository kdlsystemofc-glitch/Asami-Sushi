// Navegação entre atos (D17, D13): trilho ativo, progresso de scroll, player ⏮ ⏸ ⏭.

const atos = [...document.querySelectorAll("main > section[id^='ato-']")];
const ticks = [...document.querySelectorAll(".rail__tick")];
const progress = document.querySelector(".progress");
const [prev, next] = ["prev", "next"].map((d) => document.querySelector(`[data-act="${d}"]`));
const pause = document.querySelector("[data-pause]");
const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");

let atual = 0;

// ── trilho: o ato que cruza o meio da viewport fica ativo ──
const ativar = (i) => {
  atual = i;
  ticks.forEach((t, j) => (j === i ? t.setAttribute("aria-current", "location") : t.removeAttribute("aria-current")));
  prev?.setAttribute("aria-disabled", String(i === 0));
  next?.setAttribute("aria-disabled", String(i === atos.length - 1));
};

const observador = new IntersectionObserver(
  (entradas) => {
    for (const e of entradas) if (e.isIntersecting) ativar(atos.indexOf(e.target));
  },
  { rootMargin: "-50% 0px -50% 0px" }, // linha no meio da tela
);
atos.forEach((a) => observador.observe(a));
ativar(0);

// ── progresso + convivência com o rodapé ──
const rodape = document.getElementById("rodape");
const raiz = document.documentElement;
let pendente = false;
const medir = () => {
  pendente = false;
  const max = raiz.scrollHeight - innerHeight;
  const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  progress?.style.setProperty("--progress", p.toFixed(4));

  if (rodape) {
    const topo = rodape.getBoundingClientRect().top;
    // o player sobe o quanto o rodapé ocupa da tela (desktop; ver nav.css)
    raiz.style.setProperty("--nav-lift", `${Math.max(0, Math.round(innerHeight - topo))}px`);
    // trilho/progresso ocupam ~40–63 % da altura: saem quando o rodapé chega nessa faixa
    raiz.toggleAttribute("data-at-footer", topo < innerHeight * 0.66);
  }
};
addEventListener("scroll", () => { if (!pendente) { pendente = true; requestAnimationFrame(medir); } }, { passive: true });
addEventListener("resize", medir);
medir();

// ── ⏮ ⏭: ato vizinho, suave só sem prefers-reduced-motion ──
const irPara = (i) => {
  if (i < 0 || i >= atos.length) return;
  atos[i].scrollIntoView({ behavior: reduzido.matches ? "auto" : "smooth", block: "start" });
  ativar(i); // reflete já; o observador confirma ao chegar
};
prev?.addEventListener("click", () => irPara(atual - 1));
next?.addEventListener("click", () => irPara(atual + 1));

// ── ⏸: gancho da etapa de motion ──
// Alterna html[data-motion="paused"]. Ainda não pausa nada visível: as animações da etapa
// de motion devem respeitar esse atributo (ver DESIGN.md §5, "Pausa manual").
pause?.addEventListener("click", () => {
  const pausado = pause.getAttribute("aria-pressed") !== "true";
  pause.setAttribute("aria-pressed", String(pausado));
  if (pausado) document.documentElement.dataset.motion = "paused";
  else delete document.documentElement.dataset.motion;
});
