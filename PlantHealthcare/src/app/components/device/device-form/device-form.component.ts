import {Component, OnInit} from '@angular/core';
import {Device} from "../devices-list/devices-list.component";
import {Router} from "@angular/router";
import {MongoService} from "../../services/mongo.service";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../user/user-list/user-list.component";

@Component({
  selector: 'app-device-form', templateUrl: './device-form.component.html', styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit {
  device: Device = {name: '', description: ''};
  users: any[] = [];
  selectedUser: User
  constructor(private route: Router, private mongo: MongoService, private auth: AuthService) {

  }

  async ngOnInit() {
    this.users = await this.mongo.listUsers();
    this.selectedUser = this.users[0].user_id
  }

  async onSubmit() {
    this.device.user_id = this.selectedUser.user_id
    this.device.useremail = this.users.find((usr) => {
      return usr.user_id === this.device.user_id
    })?.email
    await this.mongo.addUserDevices(this.device)
    this.route.navigate(['/devices']);
  }

  onBack() {
    this.route.navigate(['/devices']);
  }


}
