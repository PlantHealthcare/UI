import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestComponent} from "./components/test/test.component";
import {PlantDatabaseComponent} from "./components/plant-database/plant-database.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: 'profile', component: UserProfileComponent },
  { path: 'plants', component: PlantDatabaseComponent },
  { path: 'test', component: TestComponent },
  { path: '*', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
