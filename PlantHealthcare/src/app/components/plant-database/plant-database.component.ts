import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-plant-database',
  templateUrl: './plant-database.component.html',
  styleUrls: ['./plant-database.component.scss']
})
export class PlantDatabaseComponent implements OnInit {
  layout: any;
  plants: any;

  ngOnInit(): void {
    this.initPlantsgrid();
  }

  onSearch($event: any) {
    console.log($event.data)
    if (!!$event.data) {
      this.plants = this.plants.filter((p: any) => p.name.includes($event.data))
    } else {
      this.initPlantsgrid();
    }

  }

  addPlant() {

  }

  test() {

  }

  private initPlantsgrid() {
    this.plants = [{
      name: 'eeee',
      description: 'Description 1',
      image: 'https://hips.hearstapps.com/hmg-prod/images/boston-fern-6in-pdp-01-1200x-6488ad58cc341.jpeg',
      careNeeded: true
    }, {name: 'qqqq', description: 'Description 2', image: 'https://hips.hearstapps.com/hmg-prod/images/boston-fern-6in-pdp-01-1200x-6488ad58cc341.jpeg', careNeeded: true}, {
      name: 'bbbb',
      description: 'Description 3',
      image: 'https://hortology.co.uk/cdn/shop/products/Aspidistra-Cast-Iron-Plant-13x50cm-Moon-Plant-Pot-Jungle-15x13cm_c0c3f8bc-d5f1-4c65-a265-96183b87e40f.jpg?v=1667902675',
      careNeeded: false
    }, {
      name: 'Plant 1',
      description: 'Description 4',
      image: 'https://hortology.co.uk/cdn/shop/products/Aspidistra-Cast-Iron-Plant-13x50cm-Moon-Plant-Pot-Jungle-15x13cm_c0c3f8bc-d5f1-4c65-a265-96183b87e40f.jpg?v=1667902675',
      careNeeded: true
    }, {
      name: 'Plant c',
      description: 'Description 4',
      image: 'https://hips.hearstapps.com/hmg-prod/images/boston-fern-6in-pdp-01-1200x-6488ad58cc341.jpeg',
      careNeeded: true
    }, {
      name: 'Plant e',
      description: 'Description 4',
      image: 'https://hortology.co.uk/cdn/shop/products/Aspidistra-Cast-Iron-Plant-13x50cm-Moon-Plant-Pot-Jungle-15x13cm_c0c3f8bc-d5f1-4c65-a265-96183b87e40f.jpg?v=1667902675',
      careNeeded: true
    }, {
      name: 'Plant 1',
      description: 'Description 4',
      image: 'https://hortology.co.uk/cdn/shop/products/Aspidistra-Cast-Iron-Plant-13x50cm-Moon-Plant-Pot-Jungle-15x13cm_c0c3f8bc-d5f1-4c65-a265-96183b87e40f.jpg?v=1667902675',
      careNeeded: true
    }, {
      name: 'Plant r',
      description: 'Description 4',
      image: 'https://hortology.co.uk/cdn/shop/products/Aspidistra-Cast-Iron-Plant-13x50cm-Moon-Plant-Pot-Jungle-15x13cm_c0c3f8bc-d5f1-4c65-a265-96183b87e40f.jpg?v=1667902675',
      careNeeded: false
    }, {
      name: 'Plant 1',
      description: 'Description 4',
      image: 'https://hips.hearstapps.com/hmg-prod/images/boston-fern-6in-pdp-01-1200x-6488ad58cc341.jpeg',
      careNeeded: true
    }, {
      name: 'Plant t',
      description: 'Description 4',
      image: 'https://hortology.co.uk/cdn/shop/products/Aspidistra-Cast-Iron-Plant-13x50cm-Moon-Plant-Pot-Jungle-15x13cm_c0c3f8bc-d5f1-4c65-a265-96183b87e40f.jpg?v=1667902675',
      careNeeded: true
    }, {
      name: 'Plant 1',
      description: 'Description 4',
      image: 'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_960,f_auto/DCTM_Penguin_UK_DK_AL458052_zs2mia.png',
      careNeeded: false
    }, {
      name: 'Plant www',
      description: 'Description 4',
      image: 'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_960,f_auto/DCTM_Penguin_UK_DK_AL458052_zs2mia.png',
      careNeeded: true
    }, {
      name: 'Plant l',
      description: 'Description 5',
      image: 'https://hips.hearstapps.com/hmg-prod/images/boston-fern-6in-pdp-01-1200x-6488ad58cc341.jpeg',
      careNeeded: false
    },];
  }
}
