class Pizza {
  constructor(flavor, size, price, quantity = 1) {
    this.flavor = flavor;
    this.size = size;
    this.price = price;
    this.quantity = quantity;
  }

  getTotal() {
    return this.price * this.quantity;
  }

  updateQuantity(value) {
    this.quantity = value;
  }

  sumQuantity(plusQuantity) {
    this.quantity += plusQuantity;
  }

  confirmDelete() {
    return Swal.fire({
      icon: "warning",
      title: "Remover pizza?",
      text: `Deseja remover a pizza ${this.flavor} (${this.size})?`,
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ef4444"
    });
  }

  decreaseQuantity() {
    if (this.quantity === 1) {
      return this.confirmDelete();
    }

    this.quantity--;
  }
}

export default Pizza;