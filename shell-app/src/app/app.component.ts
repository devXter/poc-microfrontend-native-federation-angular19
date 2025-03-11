import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import {EventBusService, EventTypes} from './shared/event-bus.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private eventBusService: EventBusService = inject(EventBusService);
  title = 'Angular 19 Microfrontends Demo';
  cartItemCount = 0;

  constructor() {
    // Suscribirse a eventos de actualización del carrito
    this.eventBusService.on<string>(EventTypes.CART_UPDATED).subscribe(message => {
      // Extraer el número de productos del mensaje usando expresiones regulares
      const match = message.match(/(\d+) producto/);
      if (match && match[1]) {
        this.cartItemCount = parseInt(match[1], 10);
      }
    });
  }
}

