import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {


  constructor(public authService: AuthService, private route: Router) {
  }

  ngOnInit(): void {

  }

  redirectToPlants() {
    this.route.navigate(['/plants'])
  }

  redirectToDevices() {
    this.route.navigate(['/devices'])
  }
}
