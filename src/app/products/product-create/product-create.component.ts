import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { priceRangeValidator } from '../price-range.directive';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  showPriceRangeHint = false;
  productForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), priceRangeValidator()]
    })
  })

  constructor(
    private productsService: ProductsService,
    private builder: FormBuilder) { }

  ngOnInit(): void {
    this.price.valueChanges.subscribe(price => {
      if(price) {
        this.showPriceRangeHint = price > 10000
      }
    })
  }

  // private buildform() {
  //   this.productForm = this.builder.nonNullable.group({
  //     name: this.builder.nonNullable.control(''),
  //     price: this.builder.nonNullable.control<number | undefined>(undefined, {})
  //   });
  // }

  @Output() added = new EventEmitter<Product>();

  createProduct() {
    this.productsService.addProduct(this.name.value, Number(this.price.value)).subscribe(product => {
      this.productForm!.reset();
      this.added.emit(product);
    });
  }

  get name() {
    return this.productForm!.controls.name
  }

  get price() { return this.productForm!.controls.price; }
}
