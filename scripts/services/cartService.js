import { cartStore } from "../store/cartStore.js";

const aside = document.querySelector("aside");

function renderOrderCart(pizzas) {
    const resumeContainer = document.querySelector(".resume");
    resumeContainer.innerHTML = "";

    pizzas.forEach((pizza, index) => {
        const pizzaElement = document.createElement("div");
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
                <button><p>-</p></button>

                <h4 class="pizza-quantity">
                    ${pizza.quantity}
                </h4>

                <button><p>+</p></button>
            </div>
        `;

        resumeContainer.appendChild(pizzaElement);

    });
}

function showCartResume(pizzas) {
    renderOrderCart(pizzas);

    aside.style.display = "flex";
    document.body.classList.add("cart-open");

}

function closeCartResume() {
    aside.style.display = "none";
    document.body.classList.remove("cart-open");
}

function disccount(subtotal) {
    const disscount = document.getElementById("disccount");

    if (typeof subtotal !== "number") {
        console.warn("subtotal inválido:", subtotal);
        disscount.textContent = "R$ 0,00";
        return;
    }

    const value = subtotal * 0.1;

    disscount.textContent =
        `R$ ${value.toFixed(2).replace(".", ",")}`;

    return value;
}

function totalPrice(calcSubtotal, totalDisccount = 0) {
    const total = document.getElementById("total-price");
    const totalPrice = calcSubtotal - totalDisccount;

    total.textContent = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;

}

function subtotal(){
    const subtotalElement = document.getElementById("subtotal");

    if (!cartStore.pizzas || cartStore.pizzas.length === 0) {
        subtotalElement.textContent = `R$ 0,00`;
        disccount(0);
        totalPrice(0);
        return;
    } 
    
    const calcSubtotal = cartStore.pizzas.reduce((acc, pizza) => {
        return acc + pizza.getTotal();
    }, 0);
    
    const totalDisccount = disccount(calcSubtotal);
    totalPrice(calcSubtotal, totalDisccount);
    subtotalElement.textContent = `R$ ${calcSubtotal.toFixed(2).replace(".", ",")}`;

}


export {
    closeCartResume,
    renderOrderCart,
    showCartResume,
    subtotal,
    disccount
};