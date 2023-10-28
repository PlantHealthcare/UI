import {Component, OnInit} from '@angular/core';
import {MegaMenuItem, MenuItem} from "primeng/api";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Profile', icon: 'pi pi-user', routerLink: ['/profile'] },
      { label: 'Plants', icon: 'pi pi-box', routerLink: ['/plants'] },
      { label: 'Test', icon: 'pi pi-check-square', routerLink: ['/test'] }
    ];
  }
}
