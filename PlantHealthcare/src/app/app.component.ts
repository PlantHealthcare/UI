import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PlantHealthcare';

  test() {
    console.log('this button will make an IOT stuff lit up')
  }
}
