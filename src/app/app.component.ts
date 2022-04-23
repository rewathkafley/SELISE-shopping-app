import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Shopping-app';

  constructor(
    private cartService: CartService
  ) { }
  
  ngOnInit(): void {
    // not required
    this.cartService.clearCart();
  }

  ngOnDestroy(): void {
  }
}
