import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-plant-database',
  templateUrl: './plant-database.component.html',
  styleUrls: ['./plant-database.component.scss']
})
export class PlantDatabaseComponent implements OnInit {
  @Input() plants: Plant[];
  displayedPlants: Plant[];
  isUserPlants = false;
  searchText: string = ''
  constructor(private route: Router) {
  }

  ngOnInit(): void {
    this.isUserPlants = !!this.plants;
    if (!this.isUserPlants) {
      this.initPlantsgrid();
    }
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

  private initPlantsgrid() {
    this.plants = [{
      name: 'test1',
      description: 'Description 1',
      image: 'https://hips.hearstapps.com/hmg-prod/images/boston-fern-6in-pdp-01-1200x-6488ad58cc341.jpeg',
    }, {
      name: 'noveny 2',
      description: 'Description 2',
      image: 'https://hips.hearstapps.com/hmg-prod/images/boston-fern-6in-pdp-01-1200x-6488ad58cc341.jpeg',
    }, {
      name: 'liliom',
      description: 'Description 3',
      image: 'https://hortology.co.uk/cdn/shop/products/Aspidistra-Cast-Iron-Plant-13x50cm-Moon-Plant-Pot-Jungle-15x13cm_c0c3f8bc-d5f1-4c65-a265-96183b87e40f.jpg?v=1667902675',
    }];
  }
}

export interface Plant {
  name: string,
  description: string,
  image: string,
  careNeeded?: boolean,
}
