import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from '../guards/access.guard';
import { Role } from '../models/Role.model';
import { CheckOutComponent } from './check-out/check-out.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'create', component: ProductFormComponent, canActivate: [AccessGuard], data: { roles: Role.ADMIN } },
  { path: ':productId', component: ProductDetailsComponent },
  { path: ':productId/edit', component: ProductFormComponent, canActivate: [AccessGuard], data: { roles: Role.ADMIN } },
  { path: 'cart/checkout', component: CheckOutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
