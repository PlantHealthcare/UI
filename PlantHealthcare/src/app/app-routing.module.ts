import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestComponent} from "./components/test/test.component";
import {PlantDatabaseComponent} from "./components/plant-database/plant-database.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {DevicesListComponent} from "./components/devices-list/devices-list.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'users', component: UserListComponent },
  { path: 'plants', component: PlantDatabaseComponent },
  { path: 'plant-database', component: PlantDatabaseComponent },
  { path: 'devices', component: DevicesListComponent },
  { path: 'test', component: TestComponent },
  { path: '*', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
