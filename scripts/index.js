import Pizza from "./classes/Pizza.js";

import { toggleTheme } from "./utils/toggleTheme.js";
import { openModal, closeModal } from "./services/modal.js";
import { closeCartResume, renderCart, updatePizzaCounter, showCartResume } from "./services/cart.js";
import { cartStore } from "./store/cartStore.js";

const sizeContainer = document.querySelector(".size-options");
const modal = document.getElementById("modal");
const menu = document.querySelector(".menu");
const quantityDisplay = modal.querySelector(".pizza-quantity");
const priceElement = document.querySelector(".choosed-price h1");
const addToCartButton = document.getElementById("add-to-cart");
const cancelButton = document.querySelector(".cancel");
const showCart = document.getElementById("show-cart");
const closeCart = document.getElementById("close-cart");
const toggleInput = document.getElementById("theme-checkbox");

let basePrice = 0;
let pizzaFlavor = "";

function checkSizeSelection() {
    if (!cartStore.selectedSize) {
        const isDark = document.body.classList.contains("dark");

        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Por favor, selecione um tamanho para a pizza.",
            background: isDark ? "#2b2b2b" : "#ffffff",
            color: isDark ? "#ffffff" : "#1f1f1f",
            confirmButtonColor: "#22c55e"
        });

        return false;
    }
    return true;
}

function selectedPizza(card) {
    const pizzaName = card.querySelector("h3").textContent;
    const ingredients = card.querySelector("p").textContent;
    const priceText = card.querySelector("h2").textContent;

    pizzaFlavor = pizzaName;

    basePrice = parseFloat(
        priceText.replace("R$ ", "").replace(",", ".")
    );

    cartStore.currentQuantity = 1;

    document.querySelector(".pizza-description h1").textContent = pizzaName;
    document.querySelector(".pizza-description p").textContent = ingredients;

    const img = document.querySelector(".choosed-pizza img");
    img.src = `assets/images/${pizzaName.toLowerCase()}.png`;
    img.alt = pizzaName;

    quantityDisplay.textContent = cartStore.currentQuantity;

    updatePrice();
    openModal();
}

function getPizzaPrice() {
    const sizePrice = cartStore.pizzaSizesPrices;

    if (!cartStore.selectedSize) return basePrice;

    const size = cartStore.selectedSize[0];

    return basePrice + sizePrice[size];
}

function chooseSize(option) {
    if (!option) return;

    sizeContainer
        .querySelectorAll("div")
        .forEach(div => div.classList.remove("selected-size"));

    option.classList.add("selected-size");

    cartStore.selectedSize = option.querySelector("h3").textContent;

    updatePrice();

    addToCartButton.classList.remove("disabled");
}

function showPizzaAtCart() {
    const flavor = pizzaFlavor.toLowerCase();
    const size = cartStore.selectedSize[0];
    const quantity = cartStore.currentQuantity;
    const unitPrice = getPizzaPrice();

    const existingPizza = cartStore.pizzas.find(
        pizza => pizza.flavor === flavor && pizza.size === size
    );

    if (existingPizza) {
        existingPizza.sumQuantity(quantity);
    } else {
        cartStore.pizzas.push(
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
    const finalPrice = unitPrice * cartStore.currentQuantity;

    priceElement.textContent =
        `R$ ${finalPrice.toFixed(2).replace(".", ",")}`;
}

function deletePizza(quantityContainer) {
    const index = quantityContainer.dataset.index;
    const pizza = cartStore.pizzas[index];

    pizza.confirmDelete().then(result => {
        if (result.isConfirmed) {
            cartStore.pizzas.splice(index, 1);
            renderCart(cartStore.pizzas);
        }
    });
}

function mountCartResume() {
    const valid = checkSizeSelection();
    if (!valid) return;

    updatePizzaCounter(cartStore.currentQuantity);
    showPizzaAtCart();
    showCartResume(cartStore.pizzas);
    closeModal();
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
    const button = event.target.closest(".quantity button");
    if (!button) return;

    const quantityContainer = button.closest(".quantity");
    const display = quantityContainer.querySelector(".pizza-quantity");
    const action = button.textContent.trim();

    if (modal.contains(button)) {
        if (action === "+") {
            cartStore.currentQuantity++;
        }

        if (action === "-" && cartStore.currentQuantity > 1) {
            cartStore.currentQuantity--;
        }

        display.textContent = cartStore.currentQuantity;

        updatePrice();

        return;
    }

    
    const index = quantityContainer.dataset.index;
    const pizza = cartStore.pizzas[index];

    if (action === "+") {
        pizza.sumQuantity(1);
        updatePizzaCounter(1);
    }

    if (action === "-") {
        pizza.decreaseQuantity();
        updatePizzaCounter(-1);
    }

    if (pizza.quantity === 0) {
        deletePizza(quantityContainer);
        return;
    }

   
    renderCart(cartStore.pizzas);

});

toggleInput.addEventListener("change", toggleTheme);
cancelButton?.addEventListener("click", closeModal);
addToCartButton?.addEventListener("click", mountCartResume);
closeCart?.addEventListener("click", closeCartResume);
showCart?.addEventListener("click", () => showCartResume(cartStore.pizzas));