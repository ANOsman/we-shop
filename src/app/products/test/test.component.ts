import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/about/cart.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  numberOfItems: number = 0;
  selectedProduct: Product | undefined;
  products: Product[] = [];
  numberOfProducts: number | undefined

  searchForm: FormGroup | undefined;
  searchProducts: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService) {
    this.searchForm = this.formBuilder.group({
      keyword: ['', Validators.required]
    }
    )
  }

  ngOnInit(): void {
    this.passSearchKeyword();
    this.cartService.added.subscribe(() => {
      this.numberOfItems = 0;
      this.cartService.quantity.forEach((quantity) => {
        this.numberOfItems = this.numberOfItems + quantity
      })
    });
  }

  passSearchKeyword() {
    if (this.searchForm?.valid) {
      const keyword = this.searchForm?.get('keyword')?.value;
      this.router.navigate(['/products'], {queryParams: {keyword: keyword}});
    }
  }
  onBuy() {
    window.alert(`You just bought ${this.selectedProduct?.title}!`);
  }

  onAdd(product: Product) {
    this.products.push(product);
  }

  onDelete() {
    this.products = this.products.filter(product => product !== this.selectedProduct);
    this.selectedProduct = undefined;
  }

  private getProducts() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

}
