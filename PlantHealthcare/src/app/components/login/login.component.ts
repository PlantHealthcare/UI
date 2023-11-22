import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  isLoginMode = true
  email: string;
  password: string;
  message: string;
  confirmPassword: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    try {
      if (this.isLoginMode) {
        this.authService.login(this.email, this.password);
      } else {
        this.authService.register(this.email, this.password);
      }
      this.router.navigate(['/plants']);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  switchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
  }
}
