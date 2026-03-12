const aside = document.querySelector("aside");

function renderCart(pizzas) {
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
    renderCart(pizzas);

    aside.style.display = "flex";
    document.body.classList.add("cart-open");

}

function addPizzaToCart( currentQuantity) {
    const counter = document.querySelector("#count-pizzas p");
    const pizzaCount = parseInt(counter.textContent);
    //TODO: modificar aqui para atualizar
    counter.textContent = pizzaCount + currentQuantity;


    return true;

}

function closeCartResume() {
    aside.style.display = "none";
    document.body.classList.remove("cart-open");

}

export {
    closeCartResume,
    renderCart,
    addPizzaToCart,
    showCartResume
};