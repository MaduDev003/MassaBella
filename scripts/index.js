const sizeContainer = document.querySelector(".size-options");
const modal = document.getElementById("modal");
const app = document.getElementById("app");
const menu = document.querySelector(".menu");
const quantityDisplay = modal.querySelector(".pizza-quantity");
const priceElement = document.querySelector(".choosed-price h1");
const addToCartButton = document.getElementById("add-to-cart");
const aside = document.querySelector("aside");

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



function closeModal() {
    modal.style.display = "none";
    app.classList.remove("active");

    sizeContainer.querySelectorAll("div")
        .forEach(div => div.classList.remove("selected-size"));

    selectedSize = null;
    addToCartButton.classList.add("disabled");
}


function selectedPizza(card) {
    const pizzaName = card.querySelector("h3").textContent;
    const ingredients = card.querySelector("p").textContent;
    const priceText = card.querySelector("h2").textContent;

    pizzaFlavor = pizzaName; 
    basePrice = parseFloat(priceText.replace("R$ ", "").replace(",", "."));
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

function chooseSize(option) {
    if (!option) return;

    sizeContainer.querySelectorAll("div")
        .forEach(div => div.classList.remove("selected-size"));

    option.classList.add("selected-size");

    selectedSize = option.querySelector("h3").textContent;

    addToCartButton.classList.remove("disabled");

}
function mountPizza() {
    const flavor = pizzaFlavor.toLowerCase();
    const size = selectedSize[0];
    const quantity = currentQuantity;
    const price = basePrice * quantity;

    if (!pizzas[flavor]) {
        pizzas[flavor] = {};
    }

    if (!pizzas[flavor][size]) {
        pizzas[flavor][size] = {
            quantity: quantity,
            price: price
        };
    } else {
        pizzas[flavor][size].quantity += quantity;
        pizzas[flavor][size].price += price;

    }

    console.log(pizzas);
}


function updatePrice() {
    const finalPrice = basePrice * currentQuantity;

    priceElement.textContent =
        `R$ ${finalPrice.toFixed(2).replace(".", ",")}`;
        
}



function changeQuantity(action) {
    console.log('fui chamado')
    if (action === "+") currentQuantity++;
    if (action === "-" && currentQuantity > 1) currentQuantity--;

    quantityDisplay.textContent = currentQuantity;
    updatePrice();
}



function showCartResume() {
    aside.style.display = "flex";
    document.body.classList.add("cart-open");
}



function closeCartResume() {
    aside.style.display = "none";
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
        .querySelector("#count-pizzas p");

    const pizzaCount = parseInt(counter.textContent);

    counter.textContent = pizzaCount + currentQuantity;
    
    mountPizza();
    showCartResume();
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

    let value = parseInt(display.textContent);

    const action = button.textContent.trim();

    if (action === "+") value++;
    if (action === "-" && value > 1) value--;

    display.textContent = value;

    if (modal.contains(button)) {
        currentQuantity = value;
        updatePrice();
    }

});