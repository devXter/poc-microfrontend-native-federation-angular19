import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  counter = 0;

  increment() {
    this.counter++;
    // Emitir evento para comunicación
    this.emitCounterEvent();
  }

  decrement() {
    if (this.counter > 0) {
      this.counter--;
      this.emitCounterEvent();
    }
  }

  private emitCounterEvent() {
    // Crear un evento personalizado para comunicación
    const event = new CustomEvent('legacy-counter-changed', {
      bubbles: true,
      detail: {counter: this.counter}
    });
    dispatchEvent(event);
  }
}
