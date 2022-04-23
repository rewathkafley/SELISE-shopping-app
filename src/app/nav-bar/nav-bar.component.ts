import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Role } from '../models/Role.model';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { BaseComponent } from '../shared/base-component/base.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent extends BaseComponent implements OnInit {
  user: User = new User();
  noOfCartItems: number = 0;
  ROLE = Role;

  constructor(
    private location: Location,
    private authService: AuthService,
    private cartService: CartService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribers.isLoggedInSub = this.authService.loginObservable$.subscribe(user => {
      this.user = user || new User();
    });

    this.subscribers.addCartSub = this.cartService.cartItemAddedObservable$.subscribe(value => {
      if(!value) { return; }
      if(value.product && value.added) {
        this.noOfCartItems++;
      }
      if(value.product && value.removed) {
        this.noOfCartItems--;
      }
      if(value.clearedAll) {
        this.noOfCartItems = 0;
      }
    })
  }

  logOut() {
    this.authService.logOut();
  }

  back() {
    // this.router.navigate(['../'], { relativeTo: this.route });
    this.location.back();
  }
}
