import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {EventBusService, EventTypes, ProductPayload} from '../shared/event-bus.service';
import {Subscription} from 'rxjs';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, FormsModule, NgIf, NgForOf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  protected items: CartItem[] = [];
  protected lastAddedItem: CartItem | null = null;
  private subscription = new Subscription();

  private eventBusService: EventBusService = inject(EventBusService);


  ngOnInit() {
    // Suscribirse a eventos de añadir al carrito
    this.subscription.add(
      this.eventBusService.on<ProductPayload>(EventTypes.ADD_TO_CART).subscribe(product => {
        this.addItemFromEvent(product);
      })
    );
  }

  addItemFromEvent(product: ProductPayload) {
    const existingItem = this.items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      this.items.push({...product});
    }

    this.lastAddedItem = {...product};
    setTimeout(() => {
      this.lastAddedItem = null;
    }, 5000); // La notificación desaparecerá después de 5 segundos

    this.updateCart();
  }

  addSampleItems() {
    this.items = [
      {id: 1, name: 'Laptop Pro', price: 1299.99, quantity: 1},
      {id: 2, name: 'Smartphone X', price: 899.99, quantity: 1}
    ];
    this.updateCart();
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
    this.items = this.items.filter(i => i.id !== item.id);

    // Emitir evento de eliminación del carrito
    this.eventBusService.emit(EventTypes.REMOVE_FROM_CART, item.id);

    this.updateCart();
  }

  updateCart() {
    // Emitir evento de actualización del carrito
    const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.eventBusService.emit(EventTypes.CART_UPDATED,
      `Carrito actualizado: ${itemCount} producto${itemCount !== 1 ? 's' : ''} (Total: ${this.calculateTotal().toFixed(2)} USD)`
    );
  }

  calculateSubtotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
    this.updateCart();
  }

  ngOnDestroy() {
    // Desuscribirse para evitar memory leaks
    this.subscription.unsubscribe();
  }
}
