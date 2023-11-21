import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAuthenticated) {
      return true;
    } else {
      return this.router.createUrlTree([''])
    }
  }


}
