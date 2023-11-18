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
    this.devices = [
      {name: 'Device 1', type: 'Type 1'},
      {name: 'Device 2', type: 'Type 2'},
      // Add more devices as needed
    ];
  }

  removeDevice(device: any) {
    // todo remowe device from database
    console.log(device)
  }

  addDevice() {
    this.route.navigate(['/device-form'])
  }
}

export class Device {
  name: string;
  type: string;
  id?: string;
}
