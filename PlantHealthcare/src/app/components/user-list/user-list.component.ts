import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[]
  ngOnInit(): void {
    console.log('endpoint get the users')

    this.users = [
      {name: 'test user1' , id: 'asd' , status: 'user'},
      {name: 'test user2' , id: 'asd2' , status: 'user'},
      {name: 'test user3' , id: 'asd3' , status: 'admin'},
    ]
  }

}
export interface User {
  id?:string,
  name:string,
  status : StatusType
}

export type StatusType = 'user'|'admin'
