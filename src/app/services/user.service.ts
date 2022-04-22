import { Injectable } from '@angular/core';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];

  constructor() { }

  getUsers() {
    return this.users;
  }

  getUser(userId: number) {
    return this.users.find(user => user.id == userId);
  }

  addUser(user: User) {
    this.users.push(user);
    return user;
  }

  updateUser(userToBeUpdated: User) {
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

    return user?.id ? user : userToBeUpdated;
  }

  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id != userId);
  }
}
