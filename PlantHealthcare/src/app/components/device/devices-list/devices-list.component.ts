import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MongoService} from "../../services/mongo.service";
import {User} from "../../user/user-list/user-list.component";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit{
  devices:Device[] = [];
  users: User[] = []

  constructor(private route: Router, private mongoService: MongoService, public auth:AuthService) {
  }
  async ngOnInit() {
    await this.listDevices();
  }

  private async listDevices() {
    if(this.auth.userRole === 'device-manufacturer'){
    this.devices = await this.mongoService.listAllDevices();

    }else{
    this.devices = await this.mongoService.listUserDevices();

    }
  }

  async removeDevice(device: any) {
    await this.mongoService.removeDevice(device._id);
    await this.listDevices();
  }

  addDevice() {
    this.route.navigate(['/device-form'])
  }
}

export class Device {
  name: string;
  description: string;
  useremail?:string;
  _id?: string;
  user_id?: string;
  plant_id?: string
}
