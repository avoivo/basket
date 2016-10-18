import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CoolStorageModule } from 'angular2-cool-storage';

import { AppComponent } from './app.component';
import { BasketService } from './basket.service';
import { ProductService } from './product.service';
import { BasketComponent } from './basket/basket.component';
import { ProductsComponent } from './products/products.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    BasketComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoolStorageModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BasketService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
