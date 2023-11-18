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
    const data = await this.mongo.listUserPlants();
    console.log(data)
    this.plants = [{
      name: 'test1',
      imageURL: 'https://hips.hearstapps.com/hmg-prod/images/boston-fern-6in-pdp-01-1200x-6488ad58cc341.jpeg',
      careNeeded: true
    }, {
      name: 'noveny 2',
      imageURL: 'https://hips.hearstapps.com/hmg-prod/images/boston-fern-6in-pdp-01-1200x-6488ad58cc341.jpeg',
      careNeeded: true
    }, {
      name: 'liliom',
      imageURL: 'https://hortology.co.uk/cdn/shop/products/Aspidistra-Cast-Iron-Plant-13x50cm-Moon-Plant-Pot-Jungle-15x13cm_c0c3f8bc-d5f1-4c65-a265-96183b87e40f.jpg?v=1667902675',
      careNeeded: false
    }];
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
