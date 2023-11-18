import {Component, OnInit, ViewChild} from '@angular/core';
import {Device} from "../devices-list/devices-list.component";
import {Router} from "@angular/router";
import {Dropdown} from "primeng/dropdown";

@Component({
  selector: 'app-device-form', templateUrl: './device-form.component.html', styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit {
  device: Device;
  deviceTypes: { label: string, value: string }[] = [{label: 'Type 1', value: 'Type 1'}, {label: 'Type 2', value: 'Type 2'}, {label: 'Type 3', value: 'Type 3'}];
  type: any;

  constructor(private route: Router) {

  }

  ngOnInit(): void {
    this.device = {name: '', type: 'Type 1'}
  }

  onSubmit() {
    console.log(this.device)
    this.route.navigate(['/devices']);
  }

  onBack() {
    this.route.navigate(['/devices']);
  }


}
