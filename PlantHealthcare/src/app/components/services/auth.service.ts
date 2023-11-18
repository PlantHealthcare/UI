import {Injectable} from '@angular/core';
import {User} from "../user/user-list/user-list.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userValue: User
  isAuthenticated: boolean = false;

  constructor() {
    this.userValue = {name: 'email', status: "admin"}
  }

  get isAdmin(): boolean {
    return this.userValue && this.userValue.status === 'admin';
  }

  login(email: string, password: string) {
    this.userValue = {name: email, status: "admin"}
    this.isAuthenticated = true;
  }
}
