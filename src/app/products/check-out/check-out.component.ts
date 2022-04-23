import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/Product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { BaseComponent } from '../../shared/base-component/base.component';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent extends BaseComponent implements OnInit {
  items: Product[] = [];
  checkoutForm!: FormGroup;
  checkoutFormSubmitInProgress: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private productService: ProductService
  ) {
    super();
  }

  ngOnInit(): void {
    this.prepareCheckoutForm();
    this.getItems();
  }

  getItems() {
    this.subscribers.getCartItemsSub = this.cartService.getCartItems().subscribe(items => {
      this.items = [...(items || [])];
    });
  }

  prepareCheckoutForm() {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    })
  }

  removeItem(item: Product) {
    this.subscribers.removeCartItemSub = this.cartService.removeCartItem(item).subscribe(value => {
      if(value) {
        this.getItems();
        alert("Item removed successfully!");
      }
    })
  }

  onCheckoutFormSubmit() {
    this.subscribers.updateStocksSub = this.productService.updateStocks(this.items).subscribe(data => {
      if(!data) { return; }
      this.cartService.clearCart();
      this.getItems();
      alert("Orders placed successfully, you will be notified soon.");
    })
  }
}
