import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { ProductsService } from "./products/products.service";
import { Product } from "./products/product";

export const departmentResolver: ResolveFn<Product[]> = (route: ActivatedRouteSnapshot) => {
    const productsService = inject(ProductsService);
    const department = route.paramMap.get('department');
    return productsService.getProductsByCategory(department!);
}