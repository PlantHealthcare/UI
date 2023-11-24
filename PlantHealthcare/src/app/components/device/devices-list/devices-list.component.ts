import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MongoService} from "../../services/mongo.service";

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit{
  devices:Device[] = [];


  constructor(private route: Router, private mongoService: MongoService) {
  }
  async ngOnInit() {
    this.devices = await this.mongoService.listUserDevices();
  }

  removeDevice(device: any) {
    console.log(device)
  }

  addDevice() {
    this.route.navigate(['/device-form'])
  }
}

export class Device {
  name: string;
  type: string;
  _id?: string;
  user_id?: string;
  plant_id?: string
}
