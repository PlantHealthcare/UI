import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  email: string;
  password: string;
  message: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password);
    this.router.navigate(['/plants']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
    this.authService.isAuthenticated = false;
  }
}
