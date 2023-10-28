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
import { PlantDatabaseComponent } from './components/plant-database/plant-database.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TestComponent } from './components/test/test.component';
import {TagModule} from "primeng/tag";
import {DataViewModule} from "primeng/dataview";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PlantDatabaseComponent,
    UserProfileComponent,
    TestComponent
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
    InputTextModule
  ],
  exports: [
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
