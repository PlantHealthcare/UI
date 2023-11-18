import {Injectable} from '@angular/core';
import {User} from "../user/user-list/user-list.component";
import * as Realm from "realm-web";
import {MongoService} from "./mongo.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  userValue: User
  isAuthenticated: boolean = false;

  constructor(private mongoService: MongoService) {
    this.userValue = {email: 'email', role: "admin"}
  }

  get isAdmin(): boolean {
    return this.userValue && this.userValue.role === 'admin';
  }

  async login(email = "administrator@admin.com", password = "administrator") {

    const app = new Realm.App({id: "planthealthcareapp-rmwdj"});

    const credentials = Realm.Credentials.emailPassword(email, password);

    const user = await app.logIn(credentials);

    console.log(user)
    this.userValue = {email: "administrator@admin.com", role: "admin"}
    this.mongoService.setDatabaseConnection(app,this.userValue)

    this.isAuthenticated = true;
  }
}
