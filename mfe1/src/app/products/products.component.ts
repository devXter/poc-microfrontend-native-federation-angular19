import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Laptop Pro',
      price: 1299.99,
      description: 'Potente laptop para profesionales',
    },
    {
      id: 2,
      name: 'Smartphone X',
      price: 899.99,
      description: 'Último modelo con cámara avanzada',
    },
    {
      id: 3,
      name: 'Tablet Ultra',
      price: 499.99,
      description: 'Tablet ligera con pantalla HD',
    },
    {
      id: 4,
      name: 'Auriculares Noise Cancelling',
      price: 199.99,
      description: 'Cancelación de ruido premium',
    },
  ];

  sortAscending = true;

  sortByPrice() {
    this.sortAscending = !this.sortAscending;
    this.products.sort((a, b) => {
      return this.sortAscending ? a.price - b.price : b.price - a.price;
    });
  }

  addToCart(product: Product) {
    console.log(`Producto añadido al carrito: ${product.name}`);
    alert(`${product.name} añadido al carrito`);
  }
}
