import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  isLoginMode = true
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
      if (this.isLoginMode) {
        await this.authService.login(this.email, this.password).then(
          ()=>{
            this.router.navigate(['/plants']);
          }
        );

      } else {
        await this.authService.register(this.email, this.password). then(
          ()=>{
            this.router.navigate(['/plants']);
          }
        );
      }
  }

  switchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
  }
}
