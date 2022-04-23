import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/User.model';
import { USERS } from '../data/mock.users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = USERS;

  constructor() { }

  getUsers(): Observable<any> {
    return of(this.users);
  }

  getUser(userId: number): Observable<any> {
    return of(this.users.find(user => user.id == userId));
  }

  getUserByNameAndPassword(userName: string, password: string): Observable<any> {
    if(!userName || !password) { return of(null); }
    return of(this.users.find(user => user.userName == userName && user.password == password));
  }

  addUser(user: User): Observable<any> {
    user.id = this.generateUserId();
    this.users.push(user);
    return of(user);
  }

  updateUser(userToBeUpdated: User): Observable<any> {
    const user = this.users.find(user => user.id == userToBeUpdated.id);
    if(user?.id) {
      user.userName = userToBeUpdated.userName;
      user.firstName = userToBeUpdated.firstName;
      user.lastName = userToBeUpdated.lastName;
      user.password = userToBeUpdated.password;
      user.role = userToBeUpdated.role;
    } else {
      this.users.push(userToBeUpdated);
    }

    return of(user?.id ? user : userToBeUpdated);
  }

  deleteUser(userId: number): Observable<any> {
    if(!userId) { return of(false); }
    const user = this.users.find(user => user.id == userId);
    if(!user) { return of(false); }
    this.users = this.users.filter(user => user.id != userId);
    return of(true);
  }

  checkUniqueUserName(userName: string, mode: string = 'create'): Observable<any> {
    if(!userName) { return of(false); }
    if(!this.users || !this.users.length) { return of(true); }
    let count: number = 0;
    this.users.forEach(user => {
      if(user.userName == userName) {
        count++;
      }
    });
    if(mode == 'edit') {
      return of(count == 1);
    }
    return of(mode == 'create' ? count == 0 : false);
  }

  generateUserId() {
    return this.users && this.users.length ? this.users.length + 1 : 1;
  }
}
