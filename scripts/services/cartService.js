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
        disccount();
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


function renderCartContent() {
    aside.innerHTML = `
        <div class="aside-header">
            <h2 class="cart-info">Suas Pizzas</h2>
            <h4 id="close-cart">X</h4>
        </div>

        <div class="resume"></div>

        <div class="resume-info">
            <hr>
            <div class="info">
                <h3>Subtotal</h3>
                <h3 id="subtotal">R$ 0,00</h3>
            </div>
        </div>

        <div class="resume-info">
            <hr>
            <div class="info">
                <h3>Desconto
                    <span id="disccount-percent">(10%)</span>
                </h3>
                <h3 id="disccount">R$ 0,00</h3>
            </div>
            <hr>
        </div>

        <div id="total">
            <h2>Total</h2>
            <h2 id="total-price">R$ 0,00</h2>
        </div>

        <div id="final">
            <button id="purchase" class="confirm">
                <p>Finalizar Compra</p>
            </button>
        </div>
    `;

   
}

function renderEmptyCart() {
    aside.innerHTML = `
        <div class="aside-header">
            <h2 class="cart-info">Seu carrinho</h2>
            <h4 id="close-cart">X</h4>
        </div>

        <div class="empty-cart">
            <p>Seu carrinho está vazio 🥺</p>
        </div>
    `;
}

function updateCartUI() {
    if (!cartStore.pizzas || cartStore.pizzas.length === 0) {
        renderEmptyCart();
    } else {
        renderCartContent();
        renderOrderCart(cartStore.pizzas);
        subtotal();
    }

    aside.style.display = "flex";
    document.body.classList.add("cart-open");
}

export {
    closeCartResume,
    renderOrderCart,
    showCartResume,
    subtotal,
    disccount,
    updateCartUI
};