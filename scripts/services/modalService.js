import { updatePizzaPrice } from "./pizzaService.js";
import { cartStore } from "../store/cartStore.js";

const modal = document.getElementById("modal");
const addToCartButton = document.getElementById("add-to-cart");
const sizeContainer = document.querySelector(".size-options");
const app = document.getElementById("app");

function openModal() {
    modal.style.display = "flex";
    app.classList.add("active");

    cartStore.selectedSize = null;
    cartStore.currentQuantity = 1;

    const display = modal.querySelector(".pizza-quantity");
    display.textContent = cartStore.currentQuantity;

    addToCartButton.classList.add("disabled");
}

function closeModal() {
    modal.style.display = "none";
    app.classList.remove("active");

    sizeContainer
        .querySelectorAll("div")
        .forEach(div => div.classList.remove("selected-size"));

    cartStore.selectedSize = null;
    addToCartButton.classList.add("disabled");
}

function handleModalQuantity(action, display) {
    if (action === "+") cartStore.currentQuantity++;

    if (action === "-" && cartStore.currentQuantity > 1) {
        cartStore.currentQuantity--;
    }

    display.textContent = cartStore.currentQuantity;

    updatePizzaPrice();
}

export {
    openModal,
    closeModal,
    handleModalQuantity
};