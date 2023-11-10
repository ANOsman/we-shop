import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { NgModule } from "@angular/core";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { productDetailResolver } from "./product-detail.resolver";
import { combineLatest } from "rxjs";
import { DepartmentsComponent } from "./departments/departments.component";
import { DepartmentComponent } from "./department/department.component";
import { departmentResolver } from "../department.resolver";
import { DeliveryAddressComponent } from "./delivery-address/delivery-address.component";

const productsRoutes: Routes = [
   
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'products/address',
        component: DeliveryAddressComponent
    },
    {
        path: 'detail/:id', component: ProductDetailComponent,
        resolve: {
            product: productDetailResolver
        }
    },
    {
        path: 'department',
        component: DepartmentsComponent,
        children: [
            {
                path: ':department', component: DepartmentComponent,
                resolve:  {
                    department: departmentResolver
                    
                }
            }
        ]
    }
  
];
@NgModule({
    imports: [RouterModule.forChild(productsRoutes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }