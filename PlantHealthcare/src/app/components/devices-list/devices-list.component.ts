import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit{
  devices:Device[] = [];

  ngOnInit(): void {
    //todo get the devices from endpoint
    this.devices = [
      { name: 'Device 1', type: 'Type 1' },
      { name: 'Device 2', type: 'Type 2' },
      // Add more devices as needed
    ];


  }

  removeDevice(device: any) {

  }

  addDevice() {

  }
}

export class Device {
  name: string
  type: string

}
