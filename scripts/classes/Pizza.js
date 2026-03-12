class Pizza {
  constructor(flavor, size, price, quantity = 1) {
    this.flavor = flavor;
    this.size = size;
    this.price = price;
    this.quantity = quantity;
  }

  getPizzaPrice() {
   return {
        P: -7.50,
        M: 0,
        G: 7.50
    };
  }

  getTotal() {
    return this.price * this.quantity;
  }
  

  increaseQuantity(plusQuantity) {
    this.quantity += plusQuantity;
  }

  delete() {
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
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}

export default Pizza;