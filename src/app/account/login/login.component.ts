import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BaseComponent } from '../../shared/base-component/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm!: FormGroup;
  loginInProgress: boolean = false;
  redirectTo: string = '/';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.prepareLoginForm();
    const routeParams = this.route.snapshot.queryParamMap;
    this.redirectTo = routeParams.get('redirectTo') || '/';
  }

  prepareLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLoginFormSubmit() {
    this.loginInProgress = true;
    const formData = this.loginForm.value;
    this.subscribers.checkLoginSub = this.authService.checkLogin(formData.userName, formData.password).subscribe(user => {
      if(!user) {
        this.loginInProgress = false;
        return;
      }
      user.isLoggedIn = true;
      this.authService.login(user);
      this.router.navigate([this.redirectTo]);
    }, error => {
      this.loginInProgress = false;
    });
  }
}
