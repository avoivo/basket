import { Component, OnInit } from '@angular/core';
import { BasketService, IOrderLine } from '../basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  data: Array<IOrderLine>;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basketService.getBasket().subscribe((_) => this.data = _);
  }

  removeOne(line: IOrderLine){
    this.basketService.removeProduct(line.productCode);
  }
  removeAll(line: IOrderLine){
    this.basketService.removeProduct(line.productCode, true);
  }

}
