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

    const users = await this.mongoService.listUsers()
    console.log(users);

    this.users = [{email: 'test user1', id: 'asd', role: 'user'}, {
      email: 'test user2', id: 'asd2', role: 'user'
    }, {email: 'test user3', id: 'asd3', role: 'admin'},]
  }

}
export interface User {
  id?: string,
  email: string,
  role: RoleType
}

export type RoleType = 'user'|'admin'
