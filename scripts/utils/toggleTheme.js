const toggleInput = document.getElementById("theme-checkbox");

export function toggleTheme() {
    const isDark = toggleInput.checked;

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
        ".quantity",
        ".empty-cart p",
        ".resume-info hr",
        ".resume-info .info h3"
    ];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(toggleClass);
    });
}