import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { BaseComponent } from './base-component/base.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserRegistrationFormComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaseComponent,
    UserRegistrationFormComponent
  ]
})
export class SharedModule { }
