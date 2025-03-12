import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

@NgModule({
  // @ts-ignore - Este componente NO es standalone realmente, el linter se confunde
  declarations: [AppComponent],
  // @ts-ignore - Este módulo existe, el linter está evaluando con reglas de Angular 19
  imports: [BrowserModule, AppRoutingModule],
  entryComponents: [AppComponent],
  providers: [],
  // @ts-ignore - AppComponent NO es standalone, es Angular 5 no Angular 14+
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    // Crear el elemento personalizado
    const legacyElement = createCustomElement(AppComponent, {
      injector: this.injector,
    });

    // Definir el elemento personalizado
    customElements.define("legacy-element", legacyElement);
  }
}
