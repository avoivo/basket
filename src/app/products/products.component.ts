import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { ProductService, IProduct } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  data: Array<IProduct>;

  constructor(
    private productService: ProductService,
    private basketService: BasketService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((_) => this.data = _);
  }

  addProductToBasket(product: IProduct) {
    this.basketService.addProduct(product.code);
  }

}
