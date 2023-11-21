import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestComponent} from "./components/test/test.component";
import {PlantDatabaseComponent} from "./components/plant/plant-database/plant-database.component";
import {UserProfileComponent} from "./components/user/user-profile/user-profile.component";
import {LoginComponent} from "./components/login/login.component";
import {UserListComponent} from "./components/user/user-list/user-list.component";
import {DevicesListComponent} from "./components/device/devices-list/devices-list.component";
import {DeviceFormComponent} from "./components/device/device-form/device-form.component";
import {AddPlantSpecieFormComponent} from "./components/plant/add-plant-form/add-plant-specie-form.component";
import {UserPlantsComponent} from "./components/plant/user-plants/user-plants.component";
import {UserPlantFormComponent} from "./components/plant/user-plant-form/user-plant-form.component";
import {AuthGuard} from "./components/services/auth/auth.guard";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'profile',canActivate: [AuthGuard], component: UserProfileComponent },
  { path: 'users',canActivate: [AuthGuard],  component: UserListComponent },
  { path: 'plants',canActivate: [AuthGuard],  component: UserPlantsComponent },
  { path: 'plant-database',canActivate: [AuthGuard],  component: PlantDatabaseComponent },
  { path: 'add-plant-form',canActivate: [AuthGuard],  component: AddPlantSpecieFormComponent },
  { path: 'add-user-plant-form',canActivate: [AuthGuard],  component: UserPlantFormComponent },
  { path: 'devices',canActivate: [AuthGuard],  component: DevicesListComponent },
  { path: 'device-form',canActivate: [AuthGuard],  component: DeviceFormComponent },
  { path: 'test',canActivate: [AuthGuard],  component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
