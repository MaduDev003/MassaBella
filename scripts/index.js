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

function selectedPizza(pizzaName, pizzaIngredients, price) {
  const modalTitle = document.querySelector(".pizza-description h1");
  const pizzaImage = document.querySelector(".choosed-pizza img");
  const pizzaDetails = document.querySelector(".pizza-description p");
  const priceElement = document.querySelector(".choosed-price h1");

  modal.style.display = "flex";
  app.classList.add("active");

  modalTitle.textContent = pizzaName;
  pizzaImage.src = `assets/images/${pizzaName.toLowerCase()}.png`;
  pizzaImage.alt = pizzaName;
  pizzaDetails.textContent = pizzaIngredients;
  priceElement.textContent = price;
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
  const pizzaIngredients = card.querySelector("p").textContent;
  const price = card.querySelector("h2").textContent;

  selectedPizza(pizzaName, pizzaIngredients, price);
});