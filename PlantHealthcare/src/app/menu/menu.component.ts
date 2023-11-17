import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../components/services/auth.service";

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

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.items = [
      {label: 'Profile', icon: 'pi pi-user', routerLink: ['/profile']},
      {label: 'Plants', icon: 'pi pi-box', routerLink: ['/plants']},
      {label: 'Test', icon: 'pi pi-check-square', routerLink: ['/test']},
      {label: 'Devices', icon: 'pi pi-cog', routerLink: ['/devices']},
      {label: 'plant database', icon: 'pi pi-check-square', routerLink: ['/plant-database']}
    ];
    if (this.authService.isAdmin) {
      this.items.push({label: 'Users', icon: 'pi pi-cog', routerLink: ['/users']});
    }
  }
}
