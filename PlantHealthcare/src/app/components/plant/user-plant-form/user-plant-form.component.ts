import {Component, OnInit} from '@angular/core';
import {MongoService} from "../../services/mongo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {Device} from "../../device/devices-list/devices-list.component";
import {Plant, PlantSpecies} from "../plant-database/plant-database.component";

@Component({
  selector: 'app-user-plant-form',
  templateUrl: './user-plant-form.component.html',
  styleUrls: ['./user-plant-form.component.scss']
})
export class UserPlantFormComponent implements OnInit {
  userPlantRequest: Plant;
  plantSpecies: PlantSpecies[] = [];
  choosenPlantSpiece: PlantSpecies;
  devices:Device[] = [];
  plantName = ''
  selectedDevices: Device[] = [];
  plantId:string | null;
  isModify = false;
  loadedPlant:Plant;

  constructor(private mongo: MongoService, private route: Router, private auth: AuthService,private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    this.plantSpecies = await this.mongo.getPlantSpecies();
    this.devices = await this.mongo.listUserDevices();
    this.choosenPlantSpiece = this.plantSpecies[0];
    this.plantId = this.activatedRoute.snapshot.paramMap.get('plantId') ? this.activatedRoute.snapshot.paramMap.get('plantId') : null;
    this.isModify = !!this.plantId;
    if( this.isModify && this.plantId){
     this.loadedPlant = await this.mongo.getPlant(this.plantId);
     this.plantName = this.loadedPlant.name;
     this.selectedDevices = this.devices.filter((deviceFormAll)=> {return deviceFormAll.plant_id?.toString() === this.plantId}) // initialize selected devices
     this.choosenPlantSpiece = this.loadedPlant.plantSpecie;
    }
  }

  async onSubmit() {
    this.userPlantRequest = {
      name: this.plantName,
      plantSpecie: this.choosenPlantSpiece,
      devices: this.selectedDevices,
      user_id: this.auth.userValue.user_id,
      careNeeded: !!this.loadedPlant ? this.loadedPlant.careNeeded : false,
      temperature: !!this.loadedPlant ? this.loadedPlant.temperature : '0',
      humidity: !!this.loadedPlant ? this.loadedPlant.humidity : '0',
      soil_moisture: !!this.loadedPlant ? this.loadedPlant.soil_moisture : '0'
    }
    if(this.isModify && this.plantId){
      await this.mongo.modifyUserPlant(this.userPlantRequest ,this.plantId);
    }else{
      await this.mongo.addUserPlant(this.userPlantRequest);
    }

    this.route.navigate(['/plants'])

  }

  back() {
    this.route.navigate(['/plants'])
  }

}
