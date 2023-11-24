import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MongoService} from "../../services/mongo.service";
import {Device} from "../../device/devices-list/devices-list.component";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-plant-database',
  templateUrl: './plant-database.component.html',
  styleUrls: ['./plant-database.component.scss']
})
export class PlantDatabaseComponent implements OnInit {
  plants: PlantSpecies[];
  displayedPlants: PlantSpecies[];
  searchText: string;
  constructor(private route: Router, private mongo:MongoService, public authService: AuthService) {
  }

  async ngOnInit() {
    this.plants = await this.mongo.listPlantSpecies();
    this.displayedPlants = this.plants;
  }

  onSearch() {
    if (!!this.searchText) {
      this.displayedPlants = this.plants.filter((p: any) => p.name.includes(this.searchText))
    } else {
      this.displayedPlants = this.plants;
    }
  }

  addPlant() {
    this.route.navigate(['/add-plant-form'])
  }
}

export interface Plant {
  _id?: string;
  name: string;
  user_id?: string;
  imageURL?: string;
  careNeeded?: boolean;
  plantSpecie: PlantSpecies;
  devices: Device[];
  temperature: string;
  humidity: string;
  soil_moisture: string;
}


export interface PlantSpecies {
  alias: string;
  blooming: string;
  category: string;
  color: string;
  description: string;
  fertilization: string;
  imageURL: string;
  max_env_humid: number;
  max_light_lux: number;
  max_light_mmol: number;
  max_soil_ec: number;
  max_soil_moist: number;
  max_temp: number;
  min_env_humid: number;
  min_light_lux: number;
  min_light_mmol: number;
  min_soil_ec: number;
  min_soil_moist: number;
  min_temp: number;
  name: string;
  origin: string;
  pid: string;
  production: string;
  pruning: string;
  size: string;
  soil: string;
  sunlight: string;
  watering: string;
}

