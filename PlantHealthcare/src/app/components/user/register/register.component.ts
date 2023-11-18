import { Component } from '@angular/core';
import {Router, Routes} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private authService: AuthService, private router: Router) {
  }
  onSubmit() {
    //todo register
    this.authService.login(this.email, this.password);
    this.router.navigate(['/profile'])
  }
}
