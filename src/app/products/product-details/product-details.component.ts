import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product.model';
import { Role } from '../../models/Role.model';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { BaseComponent } from '../../shared/base-component/base.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent extends BaseComponent implements OnInit {
  product: Product = new Product();
  role: Role = Role.USER;
  ROLE = Role;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    const routeParamMap = this.route.snapshot.paramMap;
    const productId = Number(routeParamMap.get('productId'));
    if(productId) {
      this.subscribers.getProductSub = this.productService.getProduct(productId).subscribe(product => {
        this.product = product || new Product();
      })
    }
  }

  addToCart() {
  }
}
