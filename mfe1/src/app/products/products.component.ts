import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Component, inject} from '@angular/core';
import {EventBusService, EventTypes, ProductPayload} from '../shared/event-bus.service';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, NgIf, NgForOf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private eventBusService: EventBusService = inject(EventBusService);

  products: Product[] = [
    {
      id: 1,
      name: 'Laptop Pro',
      price: 1299.99,
      description: 'Potente laptop para profesionales'
    },
    {
      id: 2,
      name: 'Smartphone X',
      price: 899.99,
      description: 'Último modelo con cámara avanzada'
    },
    {
      id: 3,
      name: 'Tablet Ultra',
      price: 499.99,
      description: 'Tablet ligera con pantalla HD'
    },
    {
      id: 4,
      name: 'Auriculares Noise Cancelling',
      price: 199.99,
      description: 'Cancelación de ruido premium'
    }
  ];

  sortAscending = true;
  lastNotification: string | null = null;

  constructor() {
    this.eventBusService.on<string>(EventTypes.CART_UPDATED).subscribe(message => {
      this.lastNotification = message;

      setTimeout(() => {
        this.lastNotification = null;
      }, 5000); // La notificación desaparecerá después de 5 segundos
    });
  }

  sortByPrice() {
    this.sortAscending = !this.sortAscending;
    this.products.sort((a, b) => {
      return this.sortAscending ? a.price - b.price : b.price - a.price;
    });
  }

  addToCart(product: Product, quantityElement?: HTMLSelectElement): void {
    // Obtener la cantidad seleccionada del elemento select
    const quantity: number = quantityElement ? parseInt(quantityElement.value, 10) : 1;

    // Crear el payload del producto
    const productPayload: ProductPayload = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity
    };

    // Emitir el evento ADD_TO_CART
    this.eventBusService.emit(EventTypes.ADD_TO_CART, productPayload);

    console.log(`Producto añadido al carrito: ${product.name} (x${quantity})`);
    alert(`${product.name} (${quantity}) añadadido al carrito`);
  }
}
