import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { EventBusService, EventTypes } from '../shared/event-bus.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-legacy-wrapper',
  imports: [NgIf],
  templateUrl: './legacy-wrapper.component.html',
  styleUrl: './legacy-wrapper.component.scss',
})
export class LegacyWrapperComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  isLegacyLoaded = false;
  lastCounterValue: number | null = null;

  private legacyScript: HTMLScriptElement | null = null;
  private counterEventListener: any;
  private eventBus: EventBusService = inject(EventBusService);

  ngOnInit() {
    // Cargar el Web Component dinámicamente
    this.loadLegacyComponent();

    // Configurar el listener para el evento personalizado
    this.counterEventListener = (event: any) => {
      if (event.detail && typeof event.detail.counter === 'number') {
        this.lastCounterValue = event.detail.counter;

        // Emitir el evento al bus de eventos para comunicación con otros MFEs
        this.eventBus.emit(
          EventTypes.LEGACY_COUNTER_CHANGED,
          this.lastCounterValue
        );
      }
    };

    window.addEventListener(
      'legacy-counter-changed',
      this.counterEventListener
    );
  }

  ngAfterViewInit() {
    // Reintentar la carga si no se cargó inicialmente
    setTimeout(() => {
      if (!this.isLegacyLoaded) {
        console.log('Reintentando cargar el componente legacy...');
        this.loadLegacyComponent();
      }
    }, 1000);
  }

  ngOnDestroy() {
    // Limpiar los listeners para evitar memory leaks
    if (this.counterEventListener) {
      window.removeEventListener(
        'legacy-counter-changed',
        this.counterEventListener
      );
    }

    // Eliminar el script si existe
    if (this.legacyScript && this.legacyScript.parentNode) {
      this.legacyScript.parentNode.removeChild(this.legacyScript);
    }
  }

  private loadLegacyComponent() {
    this.legacyScript = document.createElement('script');
    this.legacyScript.src = 'http://localhost:4203/legacy-element.js';
    this.legacyScript.onload = () => {
      console.log('Componente legacy cargado exitosamente');
      this.isLegacyLoaded = true;

      // Insertar el elemento personalizado
      const container = document.getElementById('legacy-container');
      if (container) {
        const legacyElement = document.createElement('legacy-element');
        container.appendChild(legacyElement);
      }
    };

    this.legacyScript.onerror = (error) => {
      console.error('Error al cargar el componente legacy:', error);
    };

    document.body.appendChild(this.legacyScript);
  }
}
