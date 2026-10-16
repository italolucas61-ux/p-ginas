/* Interactions for the independent HTML delivery. No server or framework runtime. */
(() => {
  "use strict";
  const data = JSON.parse(
    document.getElementById("standalone-data").textContent,
  );
  const grid = document.getElementById("module-grid");
  const filters = [...document.querySelectorAll(".filter")];
  const expandSection = document.querySelector(".curriculum-expand");
  const expandButton = expandSection.querySelector("button");
  const chevron = expandButton.querySelector("svg").cloneNode(true);
  const moduleDialog = document.querySelector("#conteudo dialog");
  const checkoutDialog = document.querySelector(".checkout-dialog");
  let category = "Todos";
  let expanded = false;

  function renderModules() {
    const matching = data.modules.filter(
      (item) => category === "Todos" || item.category === category,
    );
    grid.innerHTML = (expanded ? matching : matching.slice(0, 8))
      .map((item) => item.html)
      .join("");
    filters.forEach((button) => {
      const active = button.textContent.trim() === category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelector(".module-count").textContent =
      `${matching.length} conteúdos para explorar`;
    expandSection.hidden = matching.length <= 8;
    expandButton.setAttribute("aria-expanded", String(expanded));
    chevron.classList.toggle("rotate", expanded);
    expandButton.replaceChildren(
      document.createTextNode(
        expanded
          ? "Mostrar menos conteúdos"
          : `Ver todos os ${matching.length} conteúdos`,
      ),
      chevron,
    );
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      category = button.textContent.trim();
      expanded = false;
      renderModules();
    });
  });
  expandButton.addEventListener("click", () => {
    expanded = !expanded;
    renderModules();
  });
  grid.addEventListener("click", (event) => {
    const button = event.target.closest(".module-card");
    if (!button) return;
    moduleDialog.innerHTML =
      data.modules[Number(button.dataset.moduleIndex)].dialog;
    moduleDialog.showModal();
  });

  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const menuIcon = menuButton.innerHTML;
  const closeIcon = document.querySelector(".dialog-close").innerHTML;
  function setMenu(open) {
    menu.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menuButton.innerHTML = open ? closeIcon : menuIcon;
  }
  menuButton.addEventListener("click", () => setMenu(menu.hidden));
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document
    .querySelector(".header-inner .brand-link")
    .addEventListener("click", () => setMenu(false));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      setMenu(false);
      menuButton.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1100) setMenu(false);
  });

  document
    .querySelector(".offer-card > button.cta")
    ?.addEventListener("click", () => checkoutDialog.showModal());
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (
        event.target === dialog ||
        event.target.closest(".dialog-close, .dialog-back")
      ) {
        dialog.close();
      } else if (dialog === moduleDialog && event.target.closest(".cta")) {
        dialog.close();
        document.getElementById("oferta").scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        });
      }
    });
  });
  setMenu(false);
  renderModules();
})();
