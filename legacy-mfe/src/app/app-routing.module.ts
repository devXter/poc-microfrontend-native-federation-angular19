import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";

// Rutas simplificadas para el componente legacy
const routes: Routes = [
  { path: "", component: AppComponent },
  { path: "standalone.html", component: AppComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
