import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  items: CartItem[] = [];

  ngOnInit() {
    // Podríamos cargar datos persistentes aquí
  }

  addSampleItems() {
    this.items = [
      { id: 1, name: 'Laptop Pro', price: 1299.99, quantity: 1 },
      { id: 2, name: 'Smartphone X', price: 899.99, quantity: 1 },
    ];
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.updateCart();
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }

  removeItem(item: CartItem) {
    this.items = this.items.filter((i) => i.id !== item.id);
  }

  updateCart() {
    // Aquí podríamos actualizar un estado global o guardar en localStorage
    console.log('Carrito actualizado:', this.items);
  }

  calculateSubtotal(): number {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  calculateTax(): number {
    return this.calculateSubtotal() * 0.1;
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateTax();
  }

  checkout() {
    if (this.items.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    alert(`Procesando pago por ${this.calculateTotal().toFixed(2)} USD`);
    // Aquí se podría implementar la lógica real de pago
    this.items = [];
  }
}
