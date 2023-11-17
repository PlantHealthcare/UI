import { Component } from '@angular/core';
import {Device} from "../devices-list/devices-list.component";

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent {
  device: Device;

}
