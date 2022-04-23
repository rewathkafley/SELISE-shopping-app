import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Product } from '../models/Product.model';
import { PRODUCTS } from '../data/mock.products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = PRODUCTS;
  productsUrl: string = '../data/mock.products.js';

  constructor(
    private http: HttpClient
  ) { }

  getProducts(minPrice: number, maxPrice: number): Observable<any> {
    minPrice = minPrice || 0;
    maxPrice = maxPrice || 0;
    return of(this.products.filter(product => product.price >= minPrice && (maxPrice ? product.price <= maxPrice : true)));
  }

  getProduct(productId: number): Observable<any> {
    return of(this.products.find(product => product.id == productId));
  }

  addProduct(product: Product): Observable<any> {
    product.id = this.generateProductId();
    this.products.push(product);
    return of(product);
  }

  updateProduct(productToBeUpdated: Product): Observable<any> {
    const product = this.products.find(product => product.id == productToBeUpdated.id);
    if(product?.id) {
      product.name = productToBeUpdated.name;
      product.description = productToBeUpdated.description;
      product.stock = productToBeUpdated.stock;
      product.price = productToBeUpdated.price;
      product.imgPath = productToBeUpdated.imgPath;
    } else {
      productToBeUpdated.id = this.generateProductId();
      this.products.push(productToBeUpdated);
    }

    return of(product?.id ? product : productToBeUpdated);
  }

  deleteProduct(productId: number): Observable<any> {
    if(!productId) { return of(false); }
    const product = this.products.find(product => product.id == productId);
    if(!product) { return of(false); }
    this.products = this.products.filter(product => product.id != productId);
    return of(true);
  }

  updateStocks(products: Product[]): Observable<any> {
    if(!products || !products.length || !this.products || !this.products.length) { return of(false); }
    this.products.forEach(product => {
      products.forEach(productToBeUpdated => {
        if(product.id == productToBeUpdated.id) {
          product.stock = --product.stock;
        }
      });
    });
    return of(true);
  }

  generateProductId() {
    return this.products && this.products.length ? this.products.length + 1 : 1;
  }
}
