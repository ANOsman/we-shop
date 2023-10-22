import { ActivatedRouteSnapshot, Resolve, ResolveFn } from "@angular/router";
import { Product } from "./product";
import { ProductsService } from "./products.service";
import { inject } from "@angular/core";

export const productDetailResolver: ResolveFn<Product> = (route: ActivatedRouteSnapshot) => {
    const productsService = inject(ProductsService);
    const id = Number(route.paramMap.get('id'));
    return productsService.getProduct(id);
}