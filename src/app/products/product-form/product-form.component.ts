import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/Product.model';
import { ProductService } from '../../services/product.service';
import { BaseComponent } from '../../shared/base-component/base.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent extends BaseComponent implements OnInit {
  productForm!: FormGroup;
  productFormSubmitInProgress: boolean = false;
  productId!: number;
  product: Product = new Product();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    super();
  }

  ngOnInit(): void {
    this.prepareProductForm(new Product());
    const routeParams = this.route.snapshot.paramMap;
    this.productId = Number(routeParams.get('productId'));
    if(this.productId) {
      this.subscribers.getProductSub = this.productService.getProduct(this.productId).subscribe(product => {
        if(!product) { return; }
        this.product = product;
        this.prepareProductForm(this.product);
      })
    }
  }

  prepareProductForm(formData: Product) {
    this.productForm = this.fb.group({
      id: [formData.id],
      name: [formData.name, Validators.required],
      description: [formData.description, Validators.required],
      stock: [formData.stock, Validators.required],
      price: [formData.price, Validators.required],
      imgPath: [formData.imgPath]
    });
  }
  
  onProductFormSubmit() {
    this.productFormSubmitInProgress = true;
    if(!this.validateForm(this.productForm.controls)) {
      this.productFormSubmitInProgress = false;
      return;
    }
    const product: Product = this.productForm.value;
    if(product.id) {
      this.updateProduct(product);
    } else {
      this.createProduct(product);
    }
  }

  createProduct(product: Product) {
    if(!product) { return; }
    this.subscribers.createProductSub = this.productService.addProduct(product).subscribe(productCreated => {
      if(!productCreated || !productCreated.id) { return; }
      alert("Product created successfully!");
      this.router.navigate(['/products', productCreated.id]);
    });
  }

  updateProduct(product: Product) {
    if(!product) { return; }
    this.subscribers.createProductSub = this.productService.updateProduct(product).subscribe(productUpdated => {
      if(!productUpdated || !productUpdated.id) { return; }
      alert("Product updated successfully!");
      this.router.navigate(['/products', productUpdated.id]);
    });
  }

  validateForm(formData: { [key: string]: AbstractControl; }) {
    for(const property in formData) {
      const control = this.productForm.controls[property];
        if(!control.valid && control.hasValidator(Validators.required)) {
          alert(this.beautify(property) + " is requied!")
            return false;
        }
    }
    return true;
  }
}
