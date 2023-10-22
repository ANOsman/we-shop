import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { SortPipe } from './sort.pipe';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductsRoutingModule } from './products-routing.module';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductViewComponent,
    SortPipe,
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  exports: [ProductListComponent]
})
export class ProductsModule { }
