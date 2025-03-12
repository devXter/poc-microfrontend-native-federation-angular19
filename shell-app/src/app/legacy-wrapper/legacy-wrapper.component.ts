import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { EventBusService, EventTypes } from '../shared/event-bus.service';
import { NgIf } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-legacy-wrapper',
  imports: [NgIf, RouterModule, RouterOutlet],
  standalone: true,
  templateUrl: './legacy-wrapper.component.html',
  styleUrl: './legacy-wrapper.component.scss',
})
export class LegacyWrapperComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  isLegacyLoaded = false;
  lastCounterValue: number | null = null;

  private messageListener: any;
  private eventBus: EventBusService = inject(EventBusService);

  ngOnInit() {
    // Cargar el Web Component en iframe
    this.loadLegacyComponent();

    // Configurar listener para comunicación con iframe
    this.setupMessageListener();
  }

  ngAfterViewInit() {
    // Reintentar la carga si no se cargó inicialmente
    setTimeout(() => {
      if (!this.isLegacyLoaded) {
        this.loadLegacyComponent();
      }
    }, 1000);
  }

  ngOnDestroy() {
    // Limpiar los listeners para evitar memory leaks
    if (this.messageListener) {
      window.removeEventListener('message', this.messageListener);
    }
  }

  private setupMessageListener() {
    this.messageListener = (event: MessageEvent) => {
      // Asegurarse de que el mensaje viene del origen correcto
      if (event.origin === 'http://localhost:4203') {
        if (event.data && typeof event.data.counter === 'number') {
          this.lastCounterValue = event.data.counter;

          // Emitir el evento al bus de eventos para comunicación con otros MFEs
          this.eventBus.emit(
            EventTypes.LEGACY_COUNTER_CHANGED,
            this.lastCounterValue
          );
        }
      }
    };

    window.addEventListener('message', this.messageListener);
  }

  private loadLegacyComponent() {
    setTimeout(() => {
      const container = document.getElementById('legacy-container');
      if (container) {
        // Limpiar el contenedor
        container.innerHTML = '';

        // Crear un iframe para aislamiento total
        const iframe = document.createElement('iframe');
        iframe.id = 'legacy-iframe';
        iframe.style.width = '100%';
        iframe.style.height = '500px';
        iframe.style.border = 'none';

        // Configurar el iframe para cargar el componente legacy
        iframe.src = 'http://localhost:4203/elements/standalone.html';

        // Marcar como cargado cuando el iframe se cargue
        iframe.onload = () => {
          this.isLegacyLoaded = true;
        };

        container.appendChild(iframe);
      }
    }, 100);
  }
}
