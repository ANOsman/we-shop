import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  categories: string[] = [];
  
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.productsService.getCategories().subscribe(categories => {
        this.categories = categories
      })
    }
}
