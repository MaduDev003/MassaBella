const modal = document.getElementById("modal");
const addToCartButton = document.getElementById("add-to-cart");
const sizeContainer = document.querySelector(".size-options");
const app = document.getElementById("app");
import { cartStore } from "../store/cartStore.js";


function openModal() {
    modal.style.display = "flex";
    app.classList.add("active");

    cartStore.selectedSize = null;
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

export {
    openModal,
    closeModal
}