import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    ProductsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
