import {Component, OnInit} from '@angular/core';
import {MongoService} from "../../services/mongo.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {Device} from "../../device/devices-list/devices-list.component";
import {PlantSpecies} from "../plant-database/plant-database.component";

@Component({
  selector: 'app-user-plant-form',
  templateUrl: './user-plant-form.component.html',
  styleUrls: ['./user-plant-form.component.scss']
})
export class UserPlantFormComponent implements OnInit {
  userPlantRequest: any;
  plantSpecies: PlantSpecies[] = [];
  choosenPlantSpiece: PlantSpecies
  devices:Device[] = [];
  plantName = ''
  selectedDevices: Device[];
  constructor(private mongo: MongoService, private route: Router, private auth: AuthService) {
  }

  async ngOnInit() {
    this.plantSpecies = await this.mongo.getPlantSpecies();
    this.devices = await this.mongo.listUserDevices();
    console.log(this.devices)
    this.choosenPlantSpiece = this.plantSpecies[0];
  }

  async onSubmit() {
    this.userPlantRequest = {
      name: this.plantName,
      plantSpecie: this.choosenPlantSpiece,
      devices: this.selectedDevices,
      user_id: this.auth.userValue.user_id
    }
    await this.mongo.addUserPlant(this.userPlantRequest);
    this.route.navigate(['/plants'])

  }

  back() {
    this.route.navigate(['/plants'])
  }

}

export interface UserPlantRequest {
  name: string,
  plantSpecie: PlantSpecies,
  devices: any [],
  user_id:string
}
