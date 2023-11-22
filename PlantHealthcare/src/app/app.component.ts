import {Component, OnInit} from '@angular/core';
import {User} from "./components/user/user-list/user-list.component";
import {AuthService} from "./components/services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'PlantHealthcare';
  user: User;
  isAuthenticated = false;

  constructor(public authService : AuthService) {
  }
  ngOnInit(): void {
  this.authService.userSubject.subscribe( usr => this.isAuthenticated = !!usr

  )
  }

}
