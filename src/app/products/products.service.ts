import { Injectable } from '@angular/core';
import { Observable, filter, map, of } from 'rxjs';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';

interface ProductDTO {
  id: number;
  title: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl = 'https://fakestoreapi.com/products'
  private products = [
    {
      name: 'Webcam',
      price: 100
    },
    {
      name:  'Microphone',
      price: 200
    },
    {
      name: 'Wireless keyboard',
      price: 85
    }
  ];

  constructor(private http: HttpClient) { }

  searchProductsBy(keyword: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map((products: Product[]) => products.filter(product => product.title.toLowerCase().includes(keyword)))
    );
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}`).pipe(
      map((products: Product[]) => products.map((product: Product) => {
        return this.convertToProduct(product)
      }))
    );
  }

  getLimitProducts(limit: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}?limit=${limit}`).pipe(
      map((products: Product[]) => products.map((product: Product) => {
        return this.convertToProduct(product)
      }))
    );
  }
getCategories(): Observable<string[]> {
  return this.http.get<string[]>(`${this.productsUrl}/categories`);
}
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/category/${category}`)
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`).pipe(
      map(product => this.convertToProduct(product))
    )
  }

  addProduct(name: string, price: number): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, {
      title: name,
      price: price
    }).pipe(
      map(product => this.convertToProduct(product))
    )
  }

  updateProduct(id: number, price: number): Observable<void> {
    return this.http.patch<void>(`${this.productsUrl}/${id}`,{ price });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`);
  }

  private convertToProduct(product: Product): Product {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image
    }
  }
}
