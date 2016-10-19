import { Injectable, OnInit } from '@angular/core';
import { IProduct, ProductService } from './product.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CoolLocalStorage } from 'angular2-cool-storage';

const localStorageKey = "eworx.basket";

@Injectable()
export class BasketService {
  private data: { [id: string]: IOrderLine; }
  private sub: BehaviorSubject<IBasket>;

  constructor(
    private localStorage: CoolLocalStorage,
    private productService: ProductService) {
    this.sub = new BehaviorSubject({ lines: [], total: 0, discount: 0 });
    this.data = this.localStorage.getObject(localStorageKey) || {};
    this.notify();
  }
  getBasket(): Observable<IBasket> {
    return this.sub.asObservable();
  }

  addProduct(productCode: string) {
    this.productService.getProduct(productCode).subscribe((product) => {

      let line: IOrderLine = this.data[product.code] = this.data[product.code] || { productCode: product.code, description: product.description, quantity: 0, itemPrice: product.price, totalPrice: 0, discount: 0 };
      line.quantity++;
      line.totalPrice = +(line.quantity * line.itemPrice).toFixed(2);
      this.saveState();
      this.notify();

    });

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

  buy() {

    let forSave: Array<IBuyLine> = [];


    for (let key in this.data) {
      let line = this.data[key];
      forSave.push({
        code: line.productCode,
        quantity: line.quantity
      });
    }

    console.log("JSON format if backend recalculates discount :");
    console.log(JSON.stringify(forSave));
    console.log("XML format  if backend recalculates discount :");
    console.log("<ORDER>" + forSave.map((_) => '<ITEM code="' + _.code + '" quantity="' + _.quantity + '"></ITEM>').join('') + "</ORDER>");

    let forSaveWithNoRecalculate: Array<IBuyLineNoRecalculate> = [];


    for (let key in this.data) {
      let line = this.data[key];
      forSaveWithNoRecalculate.push({
        code: line.productCode,
        quantity: line.quantity,
        totalPrice: line.totalPrice,
        discount: line.discount
      });
    }

    console.log("JSON format if backend does not recalculate discount :");
    console.log(JSON.stringify(forSaveWithNoRecalculate));
    console.log("XML format  if backend does not recalculate discount :");
    console.log("<ORDER>" + forSaveWithNoRecalculate.map((_) => '<ITEM code="' + _.code + '" quantity="' + _.quantity + '" total-price="' + _.totalPrice + '" discount="' + _.discount + '"></ITEM>').join('') + "</ORDER>");

  }


  private saveState() {
    this.localStorage.setObject(localStorageKey, this.data);
  }

  private notify() {



    // apply discount
    let maxLine: IOrderLine;
    let discount: number = 0;
    for (let key in this.data) {
      let line = this.data[key];

      if (this.totalPrice > 100) {
        line.discount = +(line.totalPrice * .1).toFixed(2);
        discount += line.discount;
      }
      else
        line.discount = 0;

      if (maxLine == null || maxLine.totalPrice < line.totalPrice)
        maxLine = line;
    }


    if (maxLine) {
      let diff: number = +(this.totalDiscount - discount).toFixed(2);
      maxLine.discount = +(maxLine.discount + diff).toFixed(2);
    }

    let basket: Array<IOrderLine> = new Array<IOrderLine>();

    for (let key in this.data) {
      let line = this.data[key];
      basket.push({
        productCode: line.productCode,
        description: line.description,
        quantity: line.quantity,
        itemPrice: line.itemPrice,
        totalPrice: line.totalPrice,
        discount: line.discount
      });

    }

    this.sub.next({ lines: basket, total: this.totalPrice, discount: this.totalDiscount });
  }

  get totalPrice(): number {
    let totalPrice: number = 0;

    for (let key in this.data) {
      totalPrice += this.data[key].totalPrice;
    }
    return +totalPrice.toFixed(2);

  }

  get totalDiscount(): number {
    return this.totalPrice > 100 ? +(this.totalPrice * .1).toFixed(2) : 0;
  }
}

export interface IBasket {
  lines: Array<IOrderLine>;
  total: number;
  discount: number;
}

export interface IOrderLine {
  productCode: string;
  description: string;
  quantity: number;
  itemPrice: number;
  discount: number;
  totalPrice: number;
}

interface IBuyLine {
  code: string;
  quantity: number;
}

interface IBuyLineNoRecalculate {
  code: string;
  quantity: number;
  totalPrice: number;
  discount: number;
}
