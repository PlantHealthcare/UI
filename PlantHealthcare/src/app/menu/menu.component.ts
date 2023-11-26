import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../components/services/auth/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  logoutItem = {
    label: 'Logout',
    routerLink: '',
    icon: 'pi pi-power-off'
  };

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.items = [
      {label: 'Profile', icon: 'pi pi-user', routerLink: ['/profile']},
      {label: 'Plants', icon: 'pi pi-box', routerLink: ['/plants'], visible: this.authService.userRole ==='admin' || this.authService.userRole ==='default'},
      {label: 'Test', icon: 'pi pi-check-square', routerLink: ['/test']},
      {label: 'Devices', icon: 'pi pi-cog', routerLink: ['/devices'], visible: this.authService.userRole ==='default' || this.authService.userRole ==='admin' || this.authService.userRole === 'device-manufacturer'},
      {label: 'Plant database', icon: 'pi pi-check-square', routerLink: ['/plant-database'],visible: this.authService.userRole ==='plant-database-admin' || this.authService.userRole ==='admin' ||  this.authService.userRole ==='default'},
      {label: 'Users', icon: 'pi pi-cog', routerLink: ['/users'], visible: this.authService.userRole ==='admin'}
    ];
  }
}
