import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MongoService} from "../../services/mongo.service";
import {PlantSpecies} from "../plant-database/plant-database.component";

@Component({
  selector: 'app-add-plant-form',
  templateUrl: './add-plant-specie-form.component.html',
  styleUrls: ['./add-plant-specie-form.component.scss']
})
export class AddPlantSpecieFormComponent {
  plantSpecie:PlantSpecies = { name: "",
  description: "",
  imageURL: "https://hips.hearstapps.com/hmg-prod/images/boston-fern-6in-pdp-01-1200x-6488ad58cc341.jpeg",
  watering: '',
  sunlight: '',
  soil: '',
  size: '',
  pruning: '',
  production: '',
  pid: '',
  origin: '',
  min_temp: 0,
  min_soil_moist: 0,
  min_soil_ec: 0,
  min_light_mmol: 0,
  max_env_humid: 0,
  max_light_lux: 0,
  max_light_mmol: 0,
  max_soil_ec: 0,
  max_soil_moist: 0,
  max_temp: 0,
  min_env_humid: 0,
  min_light_lux: 0,
  fertilization: '',
  color: '',
  category: '',
  blooming: '',
  alias: ''}

  constructor(private route:Router, private mongo: MongoService) {
  }
  async onSubmit(){
    await this.mongo.addPlantSpecie(this.plantSpecie);
    await this.route.navigate(['/plants']);
  }

  back() {
    this.route.navigate(['/plants']);
  }
}
