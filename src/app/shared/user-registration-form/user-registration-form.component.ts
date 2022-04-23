import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../models/Role.model';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent extends BaseComponent implements OnInit, OnChanges {
  userRegistrationForm: FormGroup = new FormGroup({});
  @Input() showSubmitLoader: boolean = false;
  user!: User;

  @Input() userId!: number;
  @Input() role: Role = Role.USER;
  @Input() title: string = "Sign Up";
  @Output() onFormSubmit = new EventEmitter<User>();

  ROLE = Role;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    if(!this.userId) {
      this.prepareUserRegistrationForm(new User());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['userId'] && changes['userId'].currentValue) {
      this.subscribers.getUserSub = this.userService.getUser(this.userId).subscribe(user => {
        if(!user) { return; }
        this.user = user;
        this.prepareUserRegistrationForm(user);
      })
    }
  }

  prepareUserRegistrationForm(formData: User) {
    const roleValidators = this.role == Role.ADMIN ? [Validators.required] : [Validators.nullValidator];
    
    this.userRegistrationForm = this.fb.group({
      id: [formData.id],
      userName: [formData.userName, Validators.required],
      firstName: [formData.firstName],
      lastName: [formData.lastName, Validators.required],
      password: [formData.password, Validators.required],
      role: [formData.role, roleValidators]
    });
  }

  onUserRegistrationFormSubmit() {
    this.showSubmitLoader = true;
    const formValue = this.userRegistrationForm.value;
    this.subscribers.checkUniqueUserNameSub = this.userService.checkUniqueUserName(formValue.userName).subscribe(data => {
      if(!data) {
        alert("User name already exists!");
        this.showSubmitLoader = false;
        return;
      }
      if(!this.validateForm(this.userRegistrationForm.controls)) {
        this.showSubmitLoader = false;
        return;
      }
      this.onFormSubmit.emit(formValue);
    });
  }

  validateForm(formData: { [key: string]: AbstractControl; }) {
    for(const property in formData) {
      const control = this.userRegistrationForm.controls[property];
        if(!control.valid && control.hasValidator(Validators.required)) {
          alert(this.beautify(property) + " is requied!")
            return false;
        }
    }
    return true;
  }
}
