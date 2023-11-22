import {Component, OnInit} from '@angular/core';
import {Plant} from "../plant-database/plant-database.component";
import {MongoService} from "../../services/mongo.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-plants', templateUrl: './user-plants.component.html', styleUrls: ['./user-plants.component.scss']
})
export class UserPlantsComponent implements OnInit {
  plants: Plant[] = [];
  displayedPlants: Plant[];
  searchText: string = ''

  constructor(private mongo: MongoService, private route: Router) {
  }

  async ngOnInit() {
    this.plants = await this.mongo.listUserPlants();
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
    this.route.navigate(['/add-user-plant-form'])
  }
}
