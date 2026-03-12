import Pizza from "./classes/Pizza.js";

const sizeContainer = document.querySelector(".size-options");
const modal = document.getElementById("modal");
const app = document.getElementById("app");
const menu = document.querySelector(".menu");
const quantityDisplay = modal.querySelector(".pizza-quantity");
const priceElement = document.querySelector(".choosed-price h1");
const addToCartButton = document.getElementById("add-to-cart");
const aside = document.querySelector("aside");
const cancelButton = document.querySelector(".cancel");
const showCart = document.getElementById("show-cart");
const closeCart = document.getElementById("close-cart");
const toggleInput = document.getElementById("theme-checkbox");

let basePrice = 0;
let currentQuantity = 1;
let selectedSize = null;

let pizzaFlavor = "";
let pizzas = [];

function toggleTheme() {
    const isDark = document.getElementById("theme-checkbox").checked;

    const toggleClass = el => {
        if (!el) return;
        el.classList.toggle("dark", isDark);
        el.classList.toggle("light", !isDark);
    };

    const selectors = [
        "body",
        ".cancel p",
        "#modal",
        ".cart-icon",
        ".pizza-description p",
        ".choosed-price h1",
        "aside",
        ".resume-info hr",
        ".info h3",
        ".pizza-info",
        ".size-options div",
        ".size-options div h3",
        ".size-options div p",
        ".quantity button",
        ".quantity button p",
        ".pizza-quantity",
        ".quantity"
    ];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(toggleClass);
    });
}

function openModal() {
    modal.style.display = "flex";
    app.classList.add("active");

    selectedSize = null;
    addToCartButton.classList.add("disabled");
}

function selectedPizza(card) {
    const pizzaName = card.querySelector("h3").textContent;
    const ingredients = card.querySelector("p").textContent;
    const priceText = card.querySelector("h2").textContent;

    pizzaFlavor = pizzaName;

    basePrice = parseFloat(
        priceText.replace("R$ ", "").replace(",", ".")
    );

    currentQuantity = 1;

    document.querySelector(".pizza-description h1").textContent = pizzaName;
    document.querySelector(".pizza-description p").textContent = ingredients;

    const img = document.querySelector(".choosed-pizza img");
    img.src = `assets/images/${pizzaName.toLowerCase()}.png`;
    img.alt = pizzaName;

    quantityDisplay.textContent = currentQuantity;

    updatePrice();
    openModal();
}

function getPizzaPrice() {

    const sizePrice = {
        P: -7.50,
        M: 0,
        G: 7.50
    };



    if (!selectedSize) return basePrice;

    const size = selectedSize[0];

    return basePrice + sizePrice[size];
}

function chooseSize(option) {

    if (!option) return;

    sizeContainer
        .querySelectorAll("div")
        .forEach(div => div.classList.remove("selected-size"));

    option.classList.add("selected-size");

    selectedSize = option.querySelector("h3").textContent;

    updatePrice();

    addToCartButton.classList.remove("disabled");
}

function mountPizza() {

    const flavor = pizzaFlavor.toLowerCase();
    const size = selectedSize[0];
    const quantity = currentQuantity;

    const unitPrice = getPizzaPrice();

    const existingPizza = pizzas.find(
        pizza => pizza.flavor === flavor && pizza.size === size
    );

    if (existingPizza) {
        existingPizza.increaseQuantity(quantity);
    } else {

        pizzas.push(
            new Pizza(
                flavor,
                size,
                unitPrice,
                quantity
            )
        );

    }
}

function updatePrice() {

    const unitPrice = getPizzaPrice();
    const finalPrice = unitPrice * currentQuantity;

    priceElement.textContent =
        `R$ ${finalPrice.toFixed(2).replace(".", ",")}`;
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

    const counter =
        document.querySelector("#count-pizzas p");

    const pizzaCount =
        parseInt(counter.textContent);

    counter.textContent =
        pizzaCount + currentQuantity; /* TODO: corrigir para ser a soma de pizzas dentro do carrinho */

    mountPizza();

    showCartResume();

    closeModal();
}

function closeModal() {

    modal.style.display = "none";

    app.classList.remove("active");

    sizeContainer
        .querySelectorAll("div")
        .forEach(div => div.classList.remove("selected-size"));

    selectedSize = null;

    addToCartButton.classList.add("disabled");
}

function renderCart() {

    const resumeContainer =
        document.querySelector(".resume");

    resumeContainer.innerHTML = "";
    /* TODO: aqui  */
    pizzas.forEach((pizza, index) => {

        const pizzaElement =
            document.createElement("div");
        pizzaElement.classList.add("pizza-resume");

        pizzaElement.innerHTML = `
            <div class="order-pizza">
                <img src="assets/images/${pizza.flavor}.png" alt="pizza">
                <h4>
                    ${pizza.flavor}
                    <span class="size">(${pizza.size})</span> 
                </h4>
            </div>

            <div class="quantity" data-index="${index}">
                <button>
                    <p>-</p>
                </button>

                <h4 class="pizza-quantity">
                    ${pizza.quantity}
                </h4>

                <button>
                    <p>+</p>
                </button>
            </div>
        `;

        resumeContainer.appendChild(pizzaElement);
    });
}

function showCartResume() {
    renderCart();

    aside.style.display = "flex";

    document.body.classList.add("cart-open");
}

function closeCartResume() {

    aside.style.display = "none";

    document.body.classList.remove("cart-open");
}

sizeContainer?.addEventListener("click", (event) => {

    const option = event.target.closest("div");

    chooseSize(option);
});

menu.addEventListener("click", (event) => {

    const purchase = event.target.closest(".purchase");

    if (!purchase) return;

    const card = purchase.closest(".pizza-card");

    selectedPizza(card);
});

document.addEventListener("click", (event) => {
    const button =
        event.target.closest(".quantity button");

    if (!button) return;

    const quantityContainer =
        button.closest(".quantity");

    const display =
        quantityContainer.querySelector(".pizza-quantity");

    let value = parseInt(display.textContent);

    const action = button.textContent.trim();

    if (action === "+") value++;

    if (modal.contains(button)) {
        if (action === "-" && value > 1) value--;
    } else {
        if (action === "-" && value > 0) value--;
        if (value === 0) {

            const index = quantityContainer.dataset.index;
            const pizza = pizzas[index];

            pizza.delete().then(result => {
                if (result.isConfirmed) {
                    pizzas.splice(index, 1);
                    renderCart();

                } else {
                    value = 1;
                    display.textContent = value;

                }

            });

            return;
        }
    }

    display.textContent = value;

    if (modal.contains(button)) {
        currentQuantity = value;

        updatePrice();
    }
});

toggleInput.addEventListener("change", toggleTheme);

cancelButton?.addEventListener("click", closeModal);

addToCartButton?.addEventListener("click", addToCart);

closeCart?.addEventListener("click", closeCartResume);

showCart?.addEventListener("click", showCartResume);