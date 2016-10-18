import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class ProductService {

  private products: Array<IProduct>;

  constructor() {
    this.products = new Array<IProduct>();
    this.products.push({ "code": "1", "description": "SIMVASTATIN", "price": 18.34 });
    this.products.push({ "code": "2", "description": "Albutein", "price": 10.30 });
    this.products.push({ "code": "3", "description": "acyclovir", "price": 5.70 });
    this.products.push({ "code": "4", "description": "High Potency Heal Grief", "price": 20.66 });
    this.products.push({ "code": "5", "description": "Ranexa", "price": 20.48 });
    this.products.push({ "code": "6", "description": "Rx Act Aspirin", "price": 19.02 });
    this.products.push({ "code": "7", "description": "DHS TAR", "price": 6.37 });
    this.products.push({ "code": "8", "description": "Ciprofloxacin", "price": 6.84 });
    this.products.push({ "code": "9", "description": "Cantharis Kit Refill", "price": 11.92 });
    this.products.push({ "code": "10", "description": "English Walnut", "price": 0.82 });
    this.products.push({ "code": "11", "description": "Sterile Water", "price": 19.96 });
    this.products.push({ "code": "12", "description": "Fluocinolone Acetonide", "price": 2.76 });
    this.products.push({ "code": "13", "description": "Childrens", "price": 16.31 });
    this.products.push({ "code": "14", "description": "Famotidine", "price": 20.14 });
    this.products.push({ "code": "15", "description": "Pilocarpine hydrochloride", "price": 3.04 });
    this.products.push({ "code": "16", "description": "Norvasc", "price": 2.79 });
    this.products.push({ "code": "17", "description": "Norco", "price": 29.83 });
    this.products.push({ "code": "18", "description": "Western Ragweed", "price": 6.77 });
    this.products.push({ "code": "19", "description": "Health Smart Aloe Vera Petroleum", "price": 22.10 });
    this.products.push({ "code": "20", "description": "Sleep Aid", "price": 28.80 });
    this.products.push({ "code": "21", "description": "Armour Thyroid", "price": 0.42 });
    this.products.push({ "code": "22", "description": "MUCOSA DM", "price": 0.53 });
    this.products.push({ "code": "23", "description": "Travel Ease", "price": 16.62 });
    this.products.push({ "code": "24", "description": "Equaline pain relief", "price": 15.12 });
    this.products.push({ "code": "25", "description": "Acephen", "price": 28.53 });
    this.products.push({ "code": "26", "description": "GlyBURIDE", "price": 29.48 });
    this.products.push({ "code": "27", "description": "KENALOG-40", "price": 4.65 });
    this.products.push({ "code": "28", "description": "Carvedilol", "price": 12.66 });
    this.products.push({ "code": "29", "description": "Ipratropium Bromide", "price": 25.19 });
    this.products.push({ "code": "30", "description": "VP-HEME One", "price": 4.16 });
  }

  getProducts(): Observable<Array<IProduct>> {
    return Observable.create((observer: Observer<Array<IProduct>>) => {
      observer.next(this.products);
      observer.complete();
    });
  }

  getProduct(id: string): Observable<IProduct> {
    return Observable.create((observer: Observer<IProduct>) => {
      let product: IProduct = this.products.find((_) => _.code == id);

      if(product)
        observer.next(product);
        
      observer.complete();
    });
  }

}

export interface IProduct {
  code: string;
  description: string;
  price: number;
}