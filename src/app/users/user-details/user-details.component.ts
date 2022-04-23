import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../models/Role.model';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { BaseComponent } from '../../shared/base-component/base.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent extends BaseComponent implements OnInit {
  user: User = new User();
  userId!: number;
  role: Role = Role.USER;
  ROLE = Role;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userId = Number(routeParams.get('userId'));
    if(userId) {
      this.getUser(userId);
    }
  }

  getUser(userId: number) {
    this.subscribers.getUserSub = this.userService.getUser(userId).subscribe(user => {
      this.user = user || new User();
    })
  }
}
