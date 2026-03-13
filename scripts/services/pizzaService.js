import Pizza from "../classes/Pizza.js";
import { cartStore } from "../store/cartStore.js";
import { renderOrderCart } from "./cartService.js";
import { openModal } from "./modalService.js";
const quantityDisplay = modal.querySelector(".pizza-quantity");
const priceElement = document.querySelector(".choosed-price h1");
const sizeContainer = document.querySelector(".size-options");
const addToCartButton = document.getElementById("add-to-cart");

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

function selectedPizza(pizzaCard) {
    const pizzaName = pizzaCard.querySelector("h3").textContent;
    const ingredients = pizzaCard.querySelector("p").textContent;
    const priceText = pizzaCard.querySelector("h2").textContent;

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

    updatePizzaPrice();
    openModal();
}

function chooseSize(option) {
    if (!option) return;

    sizeContainer
        .querySelectorAll("div")
        .forEach(div => div.classList.remove("selected-size"));

    option.classList.add("selected-size");

    cartStore.selectedSize = option.querySelector("h3").textContent;

    updatePizzaPrice();

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


function getPizzaPrice() {
    const sizePrice = cartStore.pizzaSizesPrices;

    if (!cartStore.selectedSize) return basePrice;

    const size = cartStore.selectedSize[0];

    return basePrice + sizePrice[size];
}

function updatePizzaPrice() {
    const unitPrice = getPizzaPrice();
    const finalPrice = unitPrice * cartStore.currentQuantity;

    priceElement.textContent =
        `R$ ${finalPrice.toFixed(2).replace(".", ",")}`;
}

function updatePizzaCounter(currentQuantity) {
    const counter = document.querySelector("#count-pizzas p");
    const pizzaCount = parseInt(counter.textContent);
    counter.textContent = pizzaCount + currentQuantity;
    return;
}

function handlePizzaAtCartQuantity(action, index) {
    const pizza = cartStore.pizzas[index];

    if (action === "+") {
        pizza.sumQuantity(1);
        updatePizzaCounter(1);
        renderOrderCart(cartStore.pizzas);
        return;
    }

    if (action === "-") {
        const removalRequest = pizza.decreaseQuantity();

        if (removalRequest) {
            removalRequest.then(({ isConfirmed }) => {
                if (isConfirmed) {
                    cartStore.pizzas.splice(index, 1);
                    updatePizzaCounter(-1);
                }
                renderOrderCart(cartStore.pizzas);
            });
            return;
        }

        updatePizzaCounter(-1);
        renderOrderCart(cartStore.pizzas);
    }
}

export {
    handlePizzaAtCartQuantity,
    updatePizzaCounter,
    updatePizzaPrice,
    getPizzaPrice,
    checkSizeSelection,
    selectedPizza,
    chooseSize,
    showPizzaAtCart

}