import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  added = new EventEmitter<number>();
  quantity: number[] = new Array<number>();
  cart: Product[] = new Array<Product>();
  contains = false;
  index = 0;
  
  constructor() { }

  addProduct(product: Product) {
    if(this.cart.length === 0) {
      this.cart.push(product);
      this.quantity[this.cart.indexOf(product)] = 1;
      this.added.emit();
    }
    else {
      this.cart.forEach(p => {
        if(product.id === p.id) {
          this.contains = true;
          this.index = this.cart.indexOf(p);
        }
      })
      if(this.contains) {
        this.quantity[this.index] += 1;
        this.added.emit();
      }
      else {
        this.cart.push(product);
        this.quantity[this.cart.indexOf(product)] = 1;
        this.added.emit();
      }
    } 
  }

  removeProduct(product: Product) {
    this.cart.splice(this.cart.indexOf(product), 1)
    this.quantity[this.cart.indexOf(product)]--
    this.added.emit();
  }
}
