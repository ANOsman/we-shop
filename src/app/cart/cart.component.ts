import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Product } from '../products/product';
import { CartService } from '../about/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  index = 0;
  quantity: number = 0;
  quantities: number[] = new Array<number>();
  numberOfItems: number = 0;
  totalItems: number = 0;
  cart: Product[] = [];
  cartForm = new FormGroup({
    products: new FormArray<FormControl<number>>([])
  });

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log('cartService cart = ', this.cartService.cart);
    console.log('cartService quantity = ', this.cartService.quantity);
    this.cart = this.cartService.cart;
    this.quantities = this.cartService.quantity;
    this.cart.forEach(p => {
      this.cartForm.controls.products.push(
        new FormControl(this.cartService.quantity[this.cartService.cart.indexOf(p)], { nonNullable: true})
      );
    });
  }

  valueChanged(e: any) {
    this.cartService.quantity[e.target.id] = Number(e.target.value);
    this.cartService.added.emit();
    console.log('id = ', e.target.id);
    console.log('new value = ',e.target.value);
  }

}
