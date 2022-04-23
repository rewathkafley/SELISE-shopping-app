import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../models/Role.model';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { BaseComponent } from '../../shared/base-component/base.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends BaseComponent implements OnInit {
  userId!: number;
  role: Role = Role.ADMIN;
  title: string = "Create User";
  @Input() showSubmitLoader: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribers.routeSub = this.route.params.subscribe(params => {
      if(params['userId']) {
        this.userId = params['userId'];
        this.title = "Update User";
      }
    });
  }
  
  onUserFormSubmit(formData: User) {
    if(!formData) { return; }
    if(formData.id) {
      this.updateUser(formData);
    } else {
      this.createUser(formData);
    }
  }

  createUser(user: User) {
    if(!user) { return; }
    this.subscribers.createUserSub = this.userService.addUser(user).subscribe(userCreated => {
      if(!userCreated || !userCreated.id) { return; }
      alert("User created successfully!");
      this.router.navigate(['/users', userCreated.id]);
    });
  }

  updateUser(user: User) {
    if(!user) { return; }
    this.subscribers.updateUserSub = this.userService.updateUser(user).subscribe(userUpdated => {
      if(!userUpdated || !userUpdated.id) { return; }
      alert("User updated successfully!");
      this.router.navigate(['/users', userUpdated.id]);
    });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
