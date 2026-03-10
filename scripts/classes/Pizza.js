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

  increaseQuantity() {
    this.quantity++;
  }

  delete() {
    if(this.quantity < 1)  alert("Quer mesmo deletar a" + this.flavor + "?");
  }


  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}

export default Pizza;