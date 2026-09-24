// Overlay de menu (D11): abre/fecha o <dialog>. Esc e foco preso são nativos do showModal().
const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");

if (toggle && menu?.showModal) {
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".visually-hidden").textContent = open ? "Fechar menu" : "Abrir menu";
  };

  toggle.addEventListener("click", () => {
    menu.showModal();
    setOpen(true);
  });
  menu.querySelector(".menu__close").addEventListener("click", () => menu.close());
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) menu.close(); });
  menu.addEventListener("close", () => {
    setOpen(false);
    toggle.focus();
  });
}
