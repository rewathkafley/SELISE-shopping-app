import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];

  constructor() { }

  getProducts(minPrice: number, maxPrice: number) {
    minPrice = minPrice || 0;
    maxPrice = maxPrice || 0;
    return this.products.filter(product => product.price >= minPrice && (maxPrice ? product.price <= maxPrice : true));
  }

  getProduct(productId: number) {
    return this.products.find(product => product.id == productId);
  }

  addProduct(product: Product) {
    this.products.push(product);
    return product;
  }

  updateProduct(productToBeUpdated: Product) {
    const product = this.products.find(product => product.id == productToBeUpdated.id);
    if(product?.id) {
      product.name = productToBeUpdated.name;
      product.description = productToBeUpdated.description;
      product.stock = productToBeUpdated.stock;
      product.price = productToBeUpdated.price;
      product.imgPath = productToBeUpdated.imgPath;
    } else {
      this.products.push(productToBeUpdated);
    }

    return product?.id ? product : productToBeUpdated;
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter(product => product.id != productId);
  }
}
