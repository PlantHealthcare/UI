import {Component, OnInit} from '@angular/core';
import {Plant} from "../plant-database/plant-database.component";
import {MongoService} from "../../services/mongo.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-plants', templateUrl: './user-plants.component.html', styleUrls: ['./user-plants.component.scss']
})
export class UserPlantsComponent implements OnInit {
  plants: Plant[] = [];
  displayedPlants: Plant[];
  searchText: string = ''

  constructor(private mongo: MongoService, private route: Router,private activatedRoute: ActivatedRoute) {
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

  async deletePlant(id: any) {
    await this.mongo.deletePlant(id);
    this.plants = await this.mongo.listUserPlants();
    this.displayedPlants = this.plants;
  }

  modifyPlant(_id = '') { // from this component
    this.route.navigateByUrl('/add-user-plant-form/' + _id);
  }
}
