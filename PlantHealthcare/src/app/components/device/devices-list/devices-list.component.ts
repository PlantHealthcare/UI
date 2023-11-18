import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit{
  devices:Device[] = [];


  constructor(private route: Router) {
  }
  ngOnInit(): void {
    //todo get the devices from endpoint
    console.log('endpoint call')
    this.devices = [
      { name: 'Device 1', type: 'Type 1' },
      { name: 'Device 2', type: 'Type 2' },
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
  name: string
  type: string
}
