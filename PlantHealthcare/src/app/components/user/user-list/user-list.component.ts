import {Component, OnInit} from '@angular/core';
import {MongoService} from "../../services/mongo.service";
import {AuthService} from "../../services/auth/auth.service";


@Component({
  selector: 'app-user-list', templateUrl: './user-list.component.html', styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[]
  roles = [{
    label: 'administrator',
    value: 'admin',
  }, {
    label: 'default',
    value: 'default',
  },
    {
      label: 'plant database administrator',
      value: 'plant-database-admin',
    }];

  constructor(private mongoService: MongoService, public auth: AuthService) {
  }

  async ngOnInit() {
    this.users = await this.mongoService.listUsers();
  }

  async removeUser(userId: string) {
    await this.mongoService.removeUser(userId);
    this.users = await this.mongoService.listUsers();
  }

  async changeRole(user: User) {
    await this.mongoService.updateUserRole(user);
  }
}

export interface User {
  user_id?: string,
  email: string,
  role: RoleType
}

export type RoleType = 'admin' | 'default' | 'plant-database-admin'

