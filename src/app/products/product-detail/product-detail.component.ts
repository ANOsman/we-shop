import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Product } from '../product';
import { Observable, filter, of, switchMap } from 'rxjs';
import { ProductsService } from '../products.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/about/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { PriceComponent } from '../price/price.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnChanges, AfterViewInit {

  price: number | undefined
  @Input() id = -1;
  product$: Observable<Product> | undefined;
  @Output() bought = new EventEmitter();
  @Output() deleted = new EventEmitter();
  path: string | undefined
  path2: string | undefined

  constructor(
    private productsService: ProductsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private dialog: MatDialog,
    private router: Router
    ) { }

    
  ngAfterViewInit(): void {
  }

    ngOnInit(): void {
      this.product$ = this.route.data.pipe(
        switchMap(data => of(data['product']))
      )
      this.route.queryParamMap.subscribe(params => {
        this.path = params.get('path')!;
        this.path2 = params.get('path2')!;
      })
    }

  ngOnChanges(changes: SimpleChanges): void {
    this.product$ = this.productsService.getProduct(this.id);
  
  }

  buy(product: Product) {
    this.cartService.addProduct(product)
    window.alert(`${product.title} was added to your cart`)
  }

  changePrice(product: Product) {
    this.dialog.open(PriceComponent, {
      data: product.price
    }).afterClosed().pipe(
      filter(price => !!price),
      switchMap(price => this.productsService.updateProduct(product.id, price))
      ).subscribe(() => {
        alert(`The price of ${product.title} was changed!`)
      })
  }

  remove(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe(() => {
      this.deleted.emit();
    })
  }

  goBack() {
    console.log('path2 = ', this.path2)
    this.router.navigateByUrl(`/${this.path}/${this.path2}`)
  }

}
