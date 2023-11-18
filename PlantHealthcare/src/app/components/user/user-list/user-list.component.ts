import {Component, OnInit} from '@angular/core';
import {MongoService} from "../../services/mongo.service";


@Component({
  selector: 'app-user-list', templateUrl: './user-list.component.html', styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[]

  constructor(private mongoService: MongoService) {
  }

  async ngOnInit() {
    this.users = await this.mongoService.listUsers()
  }

}
export interface User {
  user_id?: string,
  email: string,
  role: RoleType
}

export type RoleType = 'admin'|'default'
