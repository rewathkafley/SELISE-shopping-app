import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccessGuard } from './guards/access.guard';
import { Role } from './models/Role.model';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), canActivate: [AccessGuard] },
  { 
    path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AccessGuard],
    data: {
      roles: Role.ADMIN
    }
  },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
