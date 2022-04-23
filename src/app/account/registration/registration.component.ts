import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../models/Role.model';
import { User } from '../../models/User.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { BaseComponent } from '../../shared/base-component/base.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends BaseComponent implements OnInit {
  redirectTo: string = '/';
  showSubmitLoader: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
  }
  
  onRegistrationFormSubmit(formData: User) {
    if(!formData) { return; }
    formData.role = Role.USER;
    this.subscribers.addUserSub = this.userService.addUser(formData).subscribe(data => {
      if(!data) { return; }
      
      this.subscribers.checkLoginSub = this.authService.checkLogin(formData.userName, formData.password).subscribe(user => {
        this.showSubmitLoader = false;
        alert("Registration " + (data ? 'successfull' : 'failed') + ".");
        if(!user) {
          return;
        }
        user.isLoggedIn = true;
        this.authService.login(user);
        this.router.navigate([this.redirectTo]);
      }, error => {
        this.showSubmitLoader = false;
      });
    });
  }
}
