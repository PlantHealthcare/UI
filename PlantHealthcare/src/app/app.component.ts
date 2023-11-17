import {Component, OnInit} from '@angular/core';
import {User} from "./components/user-list/user-list.component";
import {AuthService} from "./components/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'PlantHealthcare';
  user: User;


  constructor(public authService : AuthService) {
  }
  ngOnInit(): void {

  }

}
