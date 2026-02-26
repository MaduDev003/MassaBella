function toggleTheme() {
    const isDark = document.getElementById("theme-checkbox").checked;
    const body = document.body;
    const cart = document.querySelector(".cart-icon");
    const pizzaInfo = document.querySelectorAll(".pizza-info");

    const toggleClass = (el, darkClass = "dark", lightClass = "light") => {
        el.classList.toggle(darkClass, isDark);
        el.classList.toggle(lightClass, !isDark);
    };

    toggleClass(body);
    toggleClass(cart);
    pizzaInfo.forEach(info => toggleClass(info));
}

function buyPizza(pizzaName){
    const modal = document.getElementById("modal");
    modal.style.display = "flex";

    const app = document.getElementById("app");
    app.classList.add("active");
}


function closeModal() {
    const app = document.getElementById("app");
    app.classList.remove("active");

    const modal = document.getElementById("modal");
    modal.style.display = "none";
}