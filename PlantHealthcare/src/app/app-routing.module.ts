import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestComponent} from "./components/test/test.component";
import {PlantDatabaseComponent} from "./components/plant/plant-database/plant-database.component";
import {UserProfileComponent} from "./components/user/user-profile/user-profile.component";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/user/register/register.component";
import {UserListComponent} from "./components/user/user-list/user-list.component";
import {DevicesListComponent} from "./components/device/devices-list/devices-list.component";
import {DeviceFormComponent} from "./components/device/device-form/device-form.component";
import {AddPlantSpecieFormComponent} from "./components/plant/add-plant-form/add-plant-specie-form.component";
import {UserPlantsComponent} from "./components/plant/user-plants/user-plants.component";
import {UserPlantFormComponent} from "./components/plant/user-plant-form/user-plant-form.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'users', component: UserListComponent },
  { path: 'plants', component: UserPlantsComponent },
  { path: 'plant-database', component: PlantDatabaseComponent },
  { path: 'add-plant-form', component: AddPlantSpecieFormComponent },
  { path: 'add-user-plant-form', component: UserPlantFormComponent },
  { path: 'devices', component: DevicesListComponent },
  { path: 'device-form', component: DeviceFormComponent },
  { path: 'test', component: TestComponent },
  { path: '*', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
