import { Injectable, OnInit } from '@angular/core';
import { IProduct } from './product.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CoolLocalStorage } from 'angular2-cool-storage';

const localStorageKey = "eworx.basket";

@Injectable()
export class BasketService {
  private data: { [id: string]: IOrderLine; }
  private sub: BehaviorSubject<IBasket>;

  constructor(private localStorage: CoolLocalStorage) {
    this.sub = new BehaviorSubject({lines: [], total: 0, discount: 0});
    this.data = this.localStorage.getObject(localStorageKey) || {};
    this.notify();
  }
  getBasket(): Observable<IBasket> {
    return this.sub.asObservable();
  }

  addProduct(product: IProduct) {
    let line: IOrderLine = this.data[product.code] = this.data[product.code] || { productCode: product.code, description: product.description, quantity: 0, itemPrice: product.price, totalPrice: 0 };
    line.quantity++;
    line.totalPrice = +(line.quantity * line.itemPrice).toFixed(2);
    this.saveState();
    this.notify();
  }

  removeProduct(productCode: string, all?: boolean) {
    let line: IOrderLine = this.data[productCode];
    if (line) {
      if (all) {
        delete this.data[productCode];
      } else {
        line.quantity--;
        line.totalPrice = +(line.quantity * line.itemPrice).toFixed(2);
        if (line.quantity <= 0) {
          delete this.data[productCode];
        }
      }
      this.saveState();
      this.notify();
    }
  }

  buy(){
    console.log('buy');
  }

  
  private saveState() {
    this.localStorage.setObject(localStorageKey, this.data);
  }

  private notify() {

    let basket: Array<IOrderLine> = new Array<IOrderLine>();
    let total: number = 0;
    let discount: number = 0;

    for (let key in this.data) {
      let line = this.data[key];
      basket.push({
        productCode: line.productCode,
        description: line.description,
        quantity: line.quantity,
        itemPrice: line.itemPrice,
        totalPrice: line.totalPrice
      });
      total += line.totalPrice;
    }


    total = +total.toFixed(2);

    if(total > 100){
      discount = +(total * .1).toFixed(2);
    }
  
    this.sub.next({lines: basket, total: total, discount: discount});
  }
}

export interface IBasket{
  lines: Array<IOrderLine>;
  total: number;
  discount: number;
}

export interface IOrderLine {
  productCode: string;
  description: string;
  quantity: number;
  itemPrice: number;
  totalPrice: number;
}