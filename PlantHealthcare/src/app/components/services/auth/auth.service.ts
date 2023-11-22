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
    try {
      const app = new Realm.App({id: "planthealthcareapp-rmwdj"});
      const credentials = Realm.Credentials.emailPassword(email, password);
      this.user = await app.logIn(credentials);
      this.userValue = {email: email, role: "admin", user_id: this.user.app.currentUser?.id}
      this.userSubject.next(this.userValue);
      this.mongoService.setDatabaseConnection(app, this.userValue)
    } catch (error: unknown) {
      const err = error as Error;
      alert(err.message)
    }
  }

  async register(email: string, password: string) {
    try {
      const app = new Realm.App({id: "planthealthcareapp-rmwdj"});
      const credentials = Realm.Credentials.emailPassword(email, password);

      // Register the user
      await app.emailPasswordAuth.registerUser({ email, password });

      // Log the user in
      const user = await app.logIn(credentials);
      //const roles = await user.getRoles(); // todo get roles
      // Set user value
      this.userValue = {email: email, role: "admin", user_id: user.id};
      this.userSubject.next(this.userValue);

      // Set database connection
      this.mongoService.setDatabaseConnection(app, this.userValue);
    } catch (error) {
      console.error('An error occurred during user registration:', error);
      // Handle the error appropriately
    }
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
