import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  entryComponents: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    // Crear el elemento personalizado
    const legacyElement = createCustomElement(AppComponent, {injector: this.injector});

    // Definir el elemento personalizado
    customElements.define('legacy-element', legacyElement);
  }
}
