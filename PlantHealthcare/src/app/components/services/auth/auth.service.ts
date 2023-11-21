import {Injectable} from '@angular/core';
import {User} from "../../user/user-list/user-list.component";
import * as Realm from "realm-web";
import {MongoService} from "../mongo.service";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: Realm.User<globalThis.Realm.DefaultFunctionsFactory & globalThis.Realm.BaseFunctionsFactory, SimpleObject, globalThis.Realm.DefaultUserProfileData>
  userValue: User
  userSubject = new Subject<User|null>();

  constructor(private mongoService: MongoService) {
    this.userValue = {email: 'email', role: "admin"} // todo kiszedni
  }

  get isAdmin(): boolean {
    return this.userValue && this.userValue.role === 'admin';
  }

  async login(email = "administrator@admin.com", password = "administrator") {
    const app = new Realm.App({id: "planthealthcareapp-rmwdj"});
    const credentials = Realm.Credentials.emailPassword(email, password);
    this.user = await app.logIn(credentials);
    this.userValue = {email: 'email', role: "admin"} // TODO
    this.userSubject.next(this.userValue);
    this.mongoService.setDatabaseConnection(app, this.userValue)
  }

  async register(email: string, password: string) {
    const app = new Realm.App({id: "planthealthcareapp-rmwdj"});
    const credentials = Realm.Credentials.emailPassword(email, password);
    this.user = await app.logIn(credentials); //todo register
    this.userValue = {email: 'email', role: "admin"}
    this.userSubject.next(this.userValue)
    this.mongoService.setDatabaseConnection(app, this.userValue);
  }

  async logOut() {
    await this.user.logOut();
    this.userSubject.next(null);
  }


}

export interface UserAuthData {
  user: string,
  role: string,
  isLoggedIn: boolean
}
