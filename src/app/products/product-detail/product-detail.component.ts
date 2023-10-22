import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Product } from '../product';
import { Observable, of, switchMap } from 'rxjs';
import { ProductsService } from '../products.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/about/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnChanges {

  price: number | undefined
  @Input() id = -1;
  product$: Observable<Product> | undefined;
  @Output() bought = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor(
    private productsService: ProductsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

    ngOnInit(): void {
      this.product$ = this.route.data.pipe(
        switchMap(data => of(data['product']))
      )
    }

  ngOnChanges(changes: SimpleChanges): void {
    this.product$ = this.productsService.getProduct(this.id);
  }

  buy(product: Product) {
    this.cartService.addProduct(product)
  }

  changePrice(product: Product, price: number) {
    this.productsService.updateProduct(product.id, price).subscribe(() => {
      alert(`The price of ${product.name} was changed!`)
    })
  }

  remove(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe(() => {
      this.deleted.emit();
    })
  }

}
