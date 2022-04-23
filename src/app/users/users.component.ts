import { Component, OnInit } from '@angular/core';
import { Role } from '../models/Role.model';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';
import { BaseComponent } from '../shared/base-component/base.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.subscribers.getAllUsersSub = this.userService.getUsers().subscribe(users => {
      this.users = users || [];
    });
  }

  removeUser(userId: number) {
    if(!userId) { return; }
    this.subscribers.removeUserSub = this.userService.deleteUser(userId).subscribe(value => {
      if(!value) { return; }
      this.getAllUsers();
      alert("User removed successfully!");
    })
  }
}
