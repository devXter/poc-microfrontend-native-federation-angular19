import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () =>
      loadRemoteModule('mfe1', './ProductsComponent').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      loadRemoteModule('mfe2', './CartComponent').then((m) => m.CartComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
