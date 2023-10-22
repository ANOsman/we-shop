import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { CartComponent } from "./cart/cart.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { authGuard } from "./auth/auth.guard";

const routes: Routes = [
    {
      path: 'cart', 
      component: CartComponent,
      canActivate: [authGuard],
      canDeactivate: [() => confirm('You have pending items in your cart. Do you want to continue?')]
    },
    {
      path: 'about',
      loadComponent: () => import('./about/about-info/about-info.component').then(c => c.AboutInfoComponent),
      canLoad: [authGuard]
    },
    { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }