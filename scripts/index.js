function toggleTheme() {
    const isDark = document.getElementById("theme-checkbox").checked;
    const body = document.body;
    const cart = document.querySelector(".cart-icon");
    const prices = document.querySelectorAll(".pizza-info");

    const toggleClass = (el, darkClass = "dark", lightClass = "light") => {
        el.classList.toggle(darkClass, isDark);
        el.classList.toggle(lightClass, !isDark);
    };

    toggleClass(body);
    toggleClass(cart);
    prices.forEach(price => toggleClass(price));
}