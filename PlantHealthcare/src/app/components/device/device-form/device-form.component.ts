import {Component, OnInit, ViewChild} from '@angular/core';
import {Device} from "../devices-list/devices-list.component";
import {Router} from "@angular/router";
import {Dropdown} from "primeng/dropdown";
import {MongoService} from "../../services/mongo.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-device-form', templateUrl: './device-form.component.html', styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit {
  device: Device = {name: '', type: 'Type 1', user_id: this.auth.userValue.user_id};
  deviceTypes: { label: string, value: string }[] = [{label: 'Type 1', value: 'Type 1'}, {label: 'Type 2', value: 'Type 2'}, {label: 'Type 3', value: 'Type 3'}];
  type: any;

  constructor(private route: Router, private mongo: MongoService, private auth: AuthService) {

  }

  ngOnInit(): void {
  }

  async onSubmit() {
    await this.mongo.addUserDevices(this.device)
    console.log(this.device)
    this.route.navigate(['/devices']);
  }

  onBack() {
    this.route.navigate(['/devices']);
  }


}
