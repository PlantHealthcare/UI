import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-plant-form',
  templateUrl: './add-plant-form.component.html',
  styleUrls: ['./add-plant-form.component.scss']
})
export class AddPlantFormComponent {
  name: string = "";
  type: string = "";
  description: string = "";
  imageUrl: string = "https://hips.hearstapps.com/hmg-prod/images/boston-fern-6in-pdp-01-1200x-6488ad58cc341.jpeg";

  constructor(private route:Router) {
  }
  onSubmit(){
    // todo add plant to database
    this.route.navigate(['/plants']);
  }

  back() {
    this.route.navigate(['/plants']);
  }
}
