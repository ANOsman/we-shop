import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { NgModule } from "@angular/core";
import { ProductDetailComponent } from "./product-detail/product-detail.component";

const routes: Routes = [
    { 
        path: 'products', 
        component: ProductListComponent, 
        children: [
            { path: ':id', component: ProductDetailComponent }
        ]
    },
    { path: '', redirectTo: '/products', pathMatch: 'full'}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }