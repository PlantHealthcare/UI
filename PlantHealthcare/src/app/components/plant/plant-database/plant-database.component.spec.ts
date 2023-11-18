import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantDatabaseComponent } from './plant-database.component';

describe('PlantDatabaseComponent', () => {
  let component: PlantDatabaseComponent;
  let fixture: ComponentFixture<PlantDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
