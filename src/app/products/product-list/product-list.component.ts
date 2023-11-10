import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { MatSort } from '@angular/material/sort';
import { CartService } from 'src/app/about/cart.service';
import { ActivatedRoute } from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  selectedProduct: Product | undefined;
  products: Product[] = [];
  pageProducts: Product[] = [];
  numberOfProducts: number | undefined
  keyword: string | undefined;
  size: number = 9;
  listSize: number = 20;
  pageNumber: number = 1;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.keyword = params.get('keyword')!
      if (this.keyword) {
        this.findProductsBy(this.keyword);
        this.keyword = undefined
      }
      else {
        this.getProducts();
      }
    });
    
  }

  handlePageChange() {
    this.pageProducts = this.products.slice((this.pageNumber - 1) * this.size, 
                            this.size * this.pageNumber)
  }

  updatePageSize(pageSize: string) {
    this.pageProducts = this.products.slice((this.pageNumber - 1) * Number(pageSize), 
                            Number(pageSize) * this.pageNumber)
  }

  findProductsBy(title: string) {
    this.productsService.searchProductsBy(title).subscribe(products => {
      this.products = products;
      this.pageProducts = this.products.slice(this.pageNumber - 1, this.pageNumber * this.size)
    })
  }

  buy(product: Product) {
    this.cartService.addProduct(product);
  }
  onBuy() {
    window.alert(`${this.selectedProduct?.title} was added to your cart!`);
  }

  onAdd(product: Product) {
    this.products.push(product);
  }

  onDelete() {
    this.products = this.products.filter(product => product !== this.selectedProduct);
    this.selectedProduct = undefined;
  }

  getProducts() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      this.pageProducts = this.products.slice(this.pageNumber - 1, this.pageNumber * this.size)
    });
  }

}
