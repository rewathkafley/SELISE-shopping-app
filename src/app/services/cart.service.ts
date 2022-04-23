import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  cartItemAddSubject = new BehaviorSubject<any>(null);
  cartItemAddedObservable$ = this.cartItemAddSubject.asObservable();

  constructor() { }

  addCartItem(product: Product): Observable<any> {
    if(!product || !product.id) { return of(false); }
    this.items.push(product);
    this.cartItemAddSubject.next({product: product, added: true });
    return of(true);
  }

  removeCartItem(itemToBeRemoved: Product): Observable<any> {
    if(!itemToBeRemoved || !itemToBeRemoved.id) { return of(false); }
    const index = this.items.findIndex(item => item.id == itemToBeRemoved.id);
    if(index == -1) { return of(false); }
    const items = this.items.splice(index, 1);
    if(!items || !items.length) { return of(false); }
    this.cartItemAddSubject.next({product: items[0], removed: true });
    return of(true);
  }

  getCartItems(): Observable<any> {
    return of(this.items);
  }

  clearCart() {
    this.items = [];
    this.cartItemAddSubject.next({product: null, clearedAll: true });
  }
}
