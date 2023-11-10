import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { CartService } from 'src/app/about/cart.service';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit{
  
  
  departmentList$: Observable<Product[]> | undefined;
  selectedProduct: Product | undefined;
  category: string | undefined;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute,
    ) { }
  
  ngOnInit(): void {
   this.departmentList$ = this.route.data.pipe(
    switchMap(data => of(data['department']))
   )
    this.departmentList$.subscribe(d => {
      this.category = d[0].category
    })
  }

  buy(product: Product) {
    this.cartService.addProduct(product);
    window.alert(`${product.title} was added to your cart!`);
  }

}
