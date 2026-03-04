const sizeContainer = document.querySelector(".size-options");
const modal = document.getElementById("modal");
const app = document.getElementById("app");
const menu = document.querySelector(".menu");
const quantityContainer = document.querySelector(".quantity");
const quantityDisplay = quantityContainer.querySelector("h4");
const priceElement = document.querySelector(".choosed-price h1");
const addToCartButton = document.getElementById("add-to-cart");
const asideBar = document.getElementsByTagName("aside");

let basePrice = 0;
let currentQuantity = 1;
let selectedSize = null;


function toggleTheme() {
    const isDark = document.getElementById("theme-checkbox").checked;

    const toggleClass = (el) => {
        el.classList.toggle("dark", isDark);
        el.classList.toggle("light", !isDark);
    };

    toggleClass(document.body);
    toggleClass(document.querySelector(".cancel p"));
    toggleClass(document.getElementById("modal"));
    toggleClass(document.querySelector(".cart-icon"));
    toggleClass(document.querySelector(".pizza-description p"));
    toggleClass(document.querySelector(".choosed-price h1"));
    toggleClass(document.querySelector("aside"));

    document.querySelectorAll(".pizza-info")
        .forEach(toggleClass);

    document.querySelectorAll(".size-options div")
        .forEach(toggleClass);

    document.querySelectorAll(".size-options div h3")
        .forEach(toggleClass);

    document.querySelectorAll(".size-options div p")
        .forEach(toggleClass);

    document.querySelectorAll(".quantity button p")
        .forEach(toggleClass);

    document.querySelectorAll(".quantity button")
        .forEach(toggleClass);

    document.querySelectorAll(".pizza-quantity")
        .forEach(toggleClass);

    document.querySelectorAll(".quantity")
        .forEach(toggleClass);

}

function openModal() {
    modal.style.display = "flex";
    app.classList.add("active");
    addToCartButton.classList.add("disabled");
    selectedSize = null;
}

function closeModal() {
    app.classList.remove("active");
    modal.style.display = "none";

    sizeContainer.querySelectorAll("div")
        .forEach(option => option.classList.remove("selected-size"));

    addToCartButton.classList.add("disabled");
    selectedSize = null;
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

    selectedSize = sizeOption.querySelector("h3").textContent;

    addToCartButton.classList.remove("disabled");
}

function updatePrice() {
    const finalPrice = basePrice * currentQuantity;
    priceElement.textContent =
        `R$ ${finalPrice.toFixed(2).replace(".", ",")}`;
}

function controlQuantity(button) {
    const action = button.textContent.trim();

    if (action === "+") currentQuantity++;
    if (action === "-" && currentQuantity > 1) currentQuantity--;

    quantityDisplay.textContent = currentQuantity;
    updatePrice();
}

function showCartResume() {
    asideBar[0].style.display = "flex";

    document.body.classList.add("cart-open");

}

function closeCartResume() {
    asideBar[0].style.display = "none";

    document.body.classList.remove("cart-open");

}

function addToCart() {
    if (!selectedSize) {
        const isDark = document.body.classList.contains("dark");
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Por favor, selecione um tamanho para a pizza.",
            background: isDark ? "#2b2b2b" : "#ffffff",
            color: isDark ? "#ffffff" : "#1f1f1f",
            confirmButtonColor: "#22c55e"
        });

        return;
    }



    const counter = document
        .getElementById("count-pizzas")
        .querySelector("p");

    const pizzaCount = parseInt(counter.textContent);
    counter.textContent = pizzaCount + currentQuantity;
    showCartResume();
    closeModal();
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

document.addEventListener("click", function (event) {
    const button = event.target.closest(".quantity button");
    if (!button) return;

    const quantityContainer = button.closest(".quantity");
    const display = quantityContainer.querySelector("h4");

    let value = parseInt(display.textContent);

    if (button.textContent.trim() === "+") value++;
    if (button.textContent.trim() === "-" && value > 1) value--;

    display.textContent = value;
});