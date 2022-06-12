export function initMenu() {
  mostramenu();
}

function mostramenu() {
  const menu = document.querySelector('[data-menu="menu"]');
  const btn = document.querySelector('[data-menu="btn"]');

  if (menu && btn) {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const itens = [btn, menu];
      if (btn.classList.contains("ativo")) {
        itens.forEach((item) => {
          item.classList.remove("ativo");
        });
        return;
      }

      itens.forEach((item) => {
        item.classList.add("ativo");
      });

      outsideClick(menu, ["click"], () => {
        if (btn.classList.contains("ativo")) {
          itens.forEach((item) => {
            item.classList.remove("ativo");
          });
          return;
        }
      });
    });
  }
}

function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = "data-outside";

  if (!element.hasAttribute(outside)) {
    events.forEach((userEvent) => {
      setTimeout(() => {
        html.addEventListener(userEvent, handleOutsideClick);
      });
    });
  }

  element.setAttribute(outside, "");

  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      events.forEach((userEvent) => {
        html.removeEventListener(userEvent, handleOutsideClick);
      });
      callback();
    }
  }
}
