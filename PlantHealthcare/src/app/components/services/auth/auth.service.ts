import {Injectable} from '@angular/core';
import {RoleType, User} from "../../user/user-list/user-list.component";
import * as Realm from "realm-web";
import {MongoService} from "../mongo.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: Realm.User<globalThis.Realm.DefaultFunctionsFactory & globalThis.Realm.BaseFunctionsFactory, SimpleObject, globalThis.Realm.DefaultUserProfileData>
  userValue: User
  userSubject = new Subject<User | null>();

  constructor(private mongoService: MongoService) {
  }

  get isAdmin(): boolean {
    return this.userValue && this.userValue.role === 'admin';
  }

  get userRole(): RoleType {
    return this.userValue.role;
  }

  async login(email = "administrator@admin.com", password = "administrator") {
    try {
      const app = new Realm.App({id: "planthealthcareapp-rmwdj"});
      const credentials = Realm.Credentials.emailPassword(email, password);
      this.user = await app.logIn(credentials);
      await this.mongoService.setDatabaseConnection(app, this.userValue).then(
        async () => {
          const role = await this.getRole(app.currentUser?.id.toString());
          this.userValue = {email: email, role: role, user_id: app.currentUser?.id.toString()};
          this.userSubject.next(this.userValue);
          this.mongoService.setUserValue(this.userValue);
        }
      );
    } catch (error: unknown) {
      const err = error as Error;
      alert(err.message)
      return
    }
  }

  async register(email: string, password: string) {
    try {
      const app = new Realm.App({id: "planthealthcareapp-rmwdj"});
      await app.emailPasswordAuth.registerUser({email, password});
      const credentials = Realm.Credentials.emailPassword(email, password);
      this.user = await app.logIn(credentials);
      await this.mongoService.setDatabaseConnection(app, this.userValue).then(
        async () => {
          const role = await this.getRole(app.currentUser?.id.toString());
          this.userValue = {email: email, role: role, user_id: app.currentUser?.id.toString()};
          this.userSubject.next(this.userValue);
          this.mongoService.setUserValue(this.userValue);
        }
        );

      console.log(this.userValue)
    } catch (error) {
      const err = error as Error;
      alert(err.message)
      return
    }
  }

  async getRole(id = '') {
    const data = await this.mongoService.getUser(id);
    console.log(data.role)
    return data.role
  }

  async logOut() {
    await this.user.logOut();
    this.userSubject.next(null);
  }


}
