import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Role } from '../models/Role.model';
import { User } from '../models/User.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = new User();
  loginNotifier = new BehaviorSubject(new User());
  loginObservable$ = this.loginNotifier.asObservable();

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  checkLogin(userName: string, password: string): Observable<any> {
    if(!userName || !password) {
      this.setUser(new User());
      this.notifyLoggedIn(new User());
      return of(false);
    }
    return this.userService.getUserByNameAndPassword(userName, password);
  }

  login(user: User) {
    user = user || new User();
    this.setUser(user);
    this.notifyLoggedIn(user);
  }

  getUser() {
    return this.user || new User();
  }

  setUser(user: User) {
    this.user = user;
    // localStorage not being used, intentionally avoided using local/session storage, as these can be modified easily & cannot be checked against any backend auth
    // as we are not using any backend here
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  logOut() {
    this.setUser(new User());
    this.router.navigate(['home']);
    this.notifyLoggedIn(new User());
  }

  notifyLoggedIn(user: User) {
    this.loginNotifier.next(user);
  }
}
