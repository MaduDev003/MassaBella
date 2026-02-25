function toggleTheme() {
    const checkbox = document.getElementById("theme-checkbox");
    const cart = document.querySelector(".cart-icon");
    const body = document.body;
    if (checkbox.checked) {
        body.classList.remove("light");
        body.classList.add("dark");

        cart.classList.remove("light");
        cart.classList.add("dark");
    } else {
        body.classList.remove("dark");
        body.classList.add("light");

        cart.classList.remove("dark");
        cart.classList.add("light");
    
    }
}