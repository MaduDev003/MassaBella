const sizeContainer = document.querySelector(".size-options");
const modal = document.getElementById("modal");
const app = document.getElementById("app");
const menu = document.querySelector(".menu");
const quantityContainer = document.querySelector(".quantity");
const quantityDisplay = quantityContainer.querySelector("h4");
const priceElement = document.querySelector(".choosed-price h1");

let basePrice = 0;
let currentQuantity = 1;


function toggleTheme() {
    const isDark = document.getElementById("theme-checkbox").checked;

    const toggleClass = (el) => {
        el.classList.toggle("dark", isDark);
        el.classList.toggle("light", !isDark);
    };

    toggleClass(document.body);
    toggleClass(document.querySelector(".cart-icon"));

    document.querySelectorAll(".pizza-info")
        .forEach(toggleClass);
}


function openModal() {
    modal.style.display = "flex";
    app.classList.add("active");
}

function closeModal() {
    app.classList.remove("active");
    modal.style.display = "none";

    sizeContainer.querySelectorAll("div")
        .forEach(option => option.classList.remove("selected-size"));
}


function selectedPizza(card) {
    const pizzaName = card.querySelector("h3").textContent;
    const pizzaIngredients = card.querySelector("p").textContent;
    const priceText = card.querySelector("h2").textContent;

    basePrice = parseFloat(
        priceText.replace("R$ ", "").replace(",", ".")
    );

    currentQuantity = 1;

    document.querySelector(".pizza-description h1").textContent = pizzaName;
    document.querySelector(".choosed-pizza img").src =
        `assets/images/${pizzaName.toLowerCase()}.png`;
    document.querySelector(".choosed-pizza img").alt = pizzaName;
    document.querySelector(".pizza-description p").textContent = pizzaIngredients;

    quantityDisplay.textContent = currentQuantity;
    updatePrice();

    openModal();
}

function chooseSize(sizeOption) {
    if (!sizeOption || !sizeContainer.contains(sizeOption)) return;

    sizeContainer.querySelectorAll("div")
        .forEach(div => div.classList.remove("selected-size"));

    sizeOption.classList.add("selected-size");
}


function updatePrice() {
    const finalPrice = basePrice * currentQuantity;
    priceElement.textContent = `R$ ${finalPrice.toFixed(2).replace(".", ",")}`;
}

function controlQuantity(button) {
    const action = button.textContent.trim();

    if (action === "+" ) {
        currentQuantity++;
    }

    if (action === "-" && currentQuantity > 1) {
        currentQuantity--;
    }

    quantityDisplay.textContent = currentQuantity;
    updatePrice();
}


if (sizeContainer) {
    sizeContainer.addEventListener("click", (event) => {
        const sizeOption = event.target.closest("div");
        chooseSize(sizeOption);
    });
}

menu.addEventListener("click", (event) => {
    const purchase = event.target.closest(".purchase");
    if (!purchase) return;

    const card = purchase.closest(".pizza-card");
    selectedPizza(card);
});

quantityContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    controlQuantity(button);
});