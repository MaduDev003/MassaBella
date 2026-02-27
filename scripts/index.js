const sizeContainer = document.querySelector(".size-options");
const modal = document.getElementById("modal");
const app = document.getElementById("app");
const menu = document.querySelector(".menu");

function toggleTheme() {
    const isDark = document.getElementById("theme-checkbox").checked;

    const toggleClass = (el, darkClass = "dark", lightClass = "light") => {
        el.classList.toggle(darkClass, isDark);
        el.classList.toggle(lightClass, !isDark);
    };

    toggleClass(document.body);
    toggleClass(document.querySelector(".cart-icon"));

    document.querySelectorAll(".pizza-info")
        .forEach(info => toggleClass(info));
}


function buyPizza(pizzaName) {
  const modal = document.getElementById("modal");
  const app = document.getElementById("app");

  console.log("Pizza escolhida:", pizzaName);

  modal.style.display = "flex";
  app.classList.add("active");
}

function closeModal() {
    app.classList.remove("active");
    modal.style.display = "none";
    sizeContainer.querySelectorAll("div")
        .forEach(option => option.classList.remove("selected-size"));
}


function chooseSize(sizeOption) {
    if (!sizeOption || !sizeContainer.contains(sizeOption)) return;
    sizeContainer.querySelectorAll("div")
        .forEach(div => div.classList.remove("selected-size"));


    sizeOption.classList.add("selected-size");

    const sizeName = sizeOption.querySelector("h3")?.textContent || "";
    const sizeWeight = sizeOption.querySelector("p")?.textContent || "";

/*     console.log("Tamanho:", sizeName, "-", sizeWeight); */

    return { sizeName, sizeWeight };
}

if (sizeContainer) {
    sizeContainer.addEventListener("click", function (event) {
        const sizeOption = event.target.closest("div");
        chooseSize(sizeOption);
    });
}


menu.addEventListener("click", function (event) {
  const purchase = event.target.closest(".purchase");
  if (!purchase) return;

  const card = purchase.closest(".pizza-card");
  const pizzaName = card.querySelector("h3").textContent;

  buyPizza(pizzaName);
});