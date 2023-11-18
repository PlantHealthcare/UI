import {Component, OnInit} from '@angular/core';
import {Plant} from "../plant-database/plant-database.component";

@Component({
  selector: 'app-user-plants',
  templateUrl: './user-plants.component.html',
  styleUrls: ['./user-plants.component.scss']
})
export class UserPlantsComponent implements OnInit{
  plants:Plant[] = [];

  ngOnInit(): void {
    this.plants = [{
      name: 'test1',
      description: 'Description 1',
      image: 'https://hips.hearstapps.com/hmg-prod/images/boston-fern-6in-pdp-01-1200x-6488ad58cc341.jpeg',
      careNeeded: true
    }, {
      name: 'noveny 2',
      description: 'Description 2',
      image: 'https://hips.hearstapps.com/hmg-prod/images/boston-fern-6in-pdp-01-1200x-6488ad58cc341.jpeg',
      careNeeded: true
    }, {
      name: 'liliom',
      description: 'Description 3',
      image: 'https://hortology.co.uk/cdn/shop/products/Aspidistra-Cast-Iron-Plant-13x50cm-Moon-Plant-Pot-Jungle-15x13cm_c0c3f8bc-d5f1-4c65-a265-96183b87e40f.jpg?v=1667902675',
      careNeeded: false
    }];
  }

}
