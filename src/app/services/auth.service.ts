import { Injectable } from '@angular/core';
import { Role } from '../models/Role.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // isLoggedIn: boolean = false;
  // userRole: string = '';
  user: User = new User();

  constructor() { }

  login(userName: string, password: string, role: Role) {
    const user = new User();
    if(!userName || !password) {
      this.setUser(user);
      return;
    }
    user.userName = userName;
    user.password = password;
    user.role = role;
    this.setUser(user);
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  logOut() {
    this.setUser(new User());
  }
}
