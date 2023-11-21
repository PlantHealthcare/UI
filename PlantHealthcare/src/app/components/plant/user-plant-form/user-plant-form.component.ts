import {Component, OnInit} from '@angular/core';
import {Plant} from "../plant-database/plant-database.component";
import {MongoService} from "../../services/mongo.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-user-plant-form',
  templateUrl: './user-plant-form.component.html',
  styleUrls: ['./user-plant-form.component.scss']
})
export class UserPlantFormComponent implements OnInit {
  plant: Plant = {
    name: '',
    light_mmol: 0,
    light_lux: 0,
    temp: 0,
    soil_moist: 0,
    soil_ec: 0,
    plantspecies_id: '',
    user_id: this.auth.userValue.user_id,
    careNeeded: false
  };
  plantSpecies: { label: string, plantspecies_id: string }[] = [];

  constructor(private mongo: MongoService, private route: Router, private auth: AuthService) {
  }

  async onSubmit() {
    await this.mongo.addUserPlant(this.plant);
    this.route.navigate(['/plants'])

  }

  back() {
    this.route.navigate(['/plants'])
  }

  async ngOnInit() {
    this.plantSpecies = await this.mongo.getPlantSpecieTypes();
  }
}
