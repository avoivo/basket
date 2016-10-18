import { Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'products', component: ProductsComponent },
    { path: 'basket', component: BasketComponent }
];
