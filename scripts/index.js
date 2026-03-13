import { toggleTheme } from "./utils/toggleTheme.js";
import { closeModal, handleModalQuantity } from "./services/modalService.js";
import { closeCartResume, showCartResume } from "./services/cartService.js";
import { handlePizzaAtCartQuantity, updatePizzaCounter,checkSizeSelection, selectedPizza, chooseSize, showPizzaAtCart } from "./services/pizzaService.js";
import { cartStore } from "./store/cartStore.js";

const sizeContainer = document.querySelector(".size-options");
const modal = document.getElementById("modal");
const menu = document.querySelector(".menu");
const addToCartButton = document.getElementById("add-to-cart");
const cancelButton = document.querySelector(".cancel");
const showCart = document.getElementById("show-cart");
const closeCart = document.getElementById("close-cart");
const toggleInput = document.getElementById("theme-checkbox");


function addOrder() {
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

    const pizzaCard = purchase.closest(".pizza-card");
    selectedPizza(pizzaCard);

});

document.addEventListener("click", (event) => {
    const button = event.target.closest(".quantity button");
    if (!button) return;

    const quantityContainer = button.closest(".quantity");
    const display = quantityContainer.querySelector(".pizza-quantity");
    const action = button.textContent.trim();

    if (modal.contains(button)) {
        handleModalQuantity(action, display);
    } else {
        const index = Number(quantityContainer.dataset.index);
        handlePizzaAtCartQuantity(action, index);
    }
});

toggleInput.addEventListener("change", toggleTheme);
cancelButton?.addEventListener("click", closeModal);
addToCartButton?.addEventListener("click", addOrder);
closeCart?.addEventListener("click", closeCartResume);
showCart?.addEventListener("click", () => showCartResume(cartStore.pizzas));