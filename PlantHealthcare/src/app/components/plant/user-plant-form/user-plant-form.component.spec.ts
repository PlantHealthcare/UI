import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlantFormComponent } from './user-plant-form.component';

describe('UserPlantFormComponent', () => {
  let component: UserPlantFormComponent;
  let fixture: ComponentFixture<UserPlantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPlantFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPlantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
