import {Injectable} from '@angular/core';
import {filter, map, Observable, Subject} from 'rxjs';

export interface AppEvent<T = any> {
    type: string;
    payload?: T;
}

@Injectable({
    providedIn: 'root'
})
export class EventBusService {
    private eventBus: Subject<AppEvent<any>> = new Subject<AppEvent>();

    // Método para emitir eventos
    emit<T>(type: string, payload?: T): void {
        this.eventBus.next({type, payload});
    }

    // Método para suscribirse a eventos de un tipo específico
    on<T>(eventType: string): Observable<T> {
        return this.eventBus.asObservable()
            .pipe(
                filter((event: AppEvent) => event.type === eventType),
                map((event: AppEvent) => event.payload)
            );
    }
}

// Definimos los tipos de eventos de la aplicación
export const EventTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CART_UPDATE: 'CART_UPDATE'
};

// Definimos interfaces para los payload de eventos
export interface ProductPayload {
    id: number;
    name: string;
    price: number;
    quantity: number;
}