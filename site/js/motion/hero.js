// Motion do hero (ACT I) — só o que precisa de JS. Entradas, fumaça, bolhas e nigiri são CSS
// puro em css/hero.css (D29); o parallax é declarativo (data-parallax, core.js).
// Aqui: a ondulação da grade do piso e do reflexo, animando o baseFrequency dos feTurbulence
// #wave e #ripple (ciclo de 12 s, reflexo defasado em 400 ms). É a camada mais cara do hero:
// só roda no modo "full", com quality "high" e em telas ≥ 768 px (D18, D27). Pausa (⏸, aba
// escondida) vem da timeline global; fora da tela, de motion.loop.
(() => {
  const { motion, gsap } = window;
  const hero = document.getElementById("ato-1");
  if (!motion || !hero) return;

  const ONDAS = [
    // [turbulência, amplitude relativa em x e y, defasagem]
    [document.querySelector("#wave feTurbulence"), [0.12, 0.2], 0],
    [document.querySelector("#ripple feTurbulence"), [0.1, 0.16], 0.4],
  ].filter(([t]) => t);

  motion.register((m) => {
    if (m.base !== "full" || m.quality === "low" || !matchMedia("(min-width: 48rem)").matches) return;

    const originais = ONDAS.map(([t]) => t.getAttribute("baseFrequency"));

    // Durante a rolagem o baseFrequency não é reescrito: medido (test:motion), mudar o ruído
    // enquanto a camada filtrada se move re-rasteriza o filtro a cada quadro e derrubava quadros
    // (18 descartados e picos de 140–190 ms em 10 s rolando). Parado, o custo é nulo.
    let rolando = false;
    let parou = 0;
    const aoRolar = () => { rolando = true; clearTimeout(parou); parou = setTimeout(() => { rolando = false; }, 200); };
    addEventListener("scroll", aoRolar, { passive: true });
    ONDAS.forEach(([turb, [ax, ay], defasagem], i) => {
      const [bx, by] = originais[i].split(/\s+/).map(Number);
      const fase = { p: 0 };
      const escrever = () => !rolando &&
        turb.setAttribute("baseFrequency", `${(bx * (1 + ax * fase.p)).toFixed(5)} ${(by * (1 + ay * fase.p)).toFixed(5)}`);
      // 6 s de ida + 6 s de volta = ciclo de 12 s; fase 0 = valores estáticos do HTML
      m.loop(hero, gsap.to(fase, {
        p: 1, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: defasagem, onUpdate: escrever,
      }));
    });

    // o gsap.context desfaz os tweens, mas não o atributo que eles escreveram nem o listener
    return () => {
      removeEventListener("scroll", aoRolar);
      clearTimeout(parou);
      ONDAS.forEach(([t], i) => t.setAttribute("baseFrequency", originais[i]));
    };
  });
})();
