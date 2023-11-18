import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from "primeng/button";
import { MenuComponent } from './menu/menu.component';
import {MenuModule} from "primeng/menu";
import {MegaMenuModule} from "primeng/megamenu";
import {MenubarModule} from "primeng/menubar";
import { PlantDatabaseComponent } from './components/plant/plant-database/plant-database.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { TestComponent } from './components/test/test.component';
import {TagModule} from "primeng/tag";
import {DataViewModule} from "primeng/dataview";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {TableModule} from "primeng/table";
import {ImageModule} from "primeng/image";
import {RippleModule} from "primeng/ripple";
import { DevicesListComponent } from './components/device/devices-list/devices-list.component';
import { DeviceFormComponent } from './components/device/device-form/device-form.component';
import {DropdownModule} from "primeng/dropdown";
import { AddPlantFormComponent } from './components/plant/add-plant-form/add-plant-form.component';
import { UserPlantsComponent } from './components/plant/user-plants/user-plants.component';
import {InputTextareaModule} from "primeng/inputtextarea";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PlantDatabaseComponent,
    UserProfileComponent,
    TestComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    DevicesListComponent,
    DeviceFormComponent,
    AddPlantFormComponent,
    UserPlantsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    MenuModule,
    MegaMenuModule,
    MenubarModule,
    TagModule,
    DataViewModule,
    CardModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    TableModule,
    ImageModule,
    RippleModule,
    DropdownModule,
    InputTextareaModule
  ],
  exports: [
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
