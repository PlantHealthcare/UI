import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlantsComponent } from './user-plants.component';

describe('UserPlantsComponent', () => {
  let component: UserPlantsComponent;
  let fixture: ComponentFixture<UserPlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPlantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
