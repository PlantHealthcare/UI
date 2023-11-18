import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlantSpecieFormComponent } from './add-plant-specie-form.component';

describe('AddPlantFormComponent', () => {
  let component: AddPlantSpecieFormComponent;
  let fixture: ComponentFixture<AddPlantSpecieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlantSpecieFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlantSpecieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
