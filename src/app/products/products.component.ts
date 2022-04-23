import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { Role } from '../models/Role.model';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { BaseComponent } from '../shared/base-component/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  products: Product[] = [];
  role!: Role;
  ROLE = Role;
  priceFrom: number = 0;
  priceTo: number = 100000;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getUserRole();
    this.getAllProducts(this.priceFrom, this.priceTo);
  }

  getAllProducts(priceFrom: number, priceTo: number) {
    this.subscribers.getProductsSub = this.productService.getProducts(priceFrom, priceTo).subscribe(products => {
      if(!products || !products.length) { return; }
      this.products = products;
    });
  }

  getUserRole() {
    this.role = this.authService.getUser().role;
    this.role = Role.ADMIN;
  }

  addToCart(product: Product) {
    if(!product || !product.id) { return; }
    this.subscribers.addToCartSub = this.cartService.addCartItem(product).subscribe(value => {
      if(value) {
        alert("Item added to cart successfully!");
      }
    });
  }

  deleteProduct(productId: number) {
    if(!productId) { return; }
    this.subscribers.addToCartSub = this.productService.deleteProduct(productId).subscribe(value => {
      if(!value) { return; }
      this.getAllProducts(this.priceFrom, this.priceTo);
      alert("Product deleted successfully!");
    });
  }

  searchProducts() {
    this.getAllProducts(this.priceFrom, this.priceTo);
  }
}
