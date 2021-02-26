import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {FilterViewPage} from "./views/filter-view/filter-view.page";
import {FilterViewPageModule} from "./views/filter-view/filter-view.module";
import {RateViewPage} from "./views/rate-view/rate-view.page";
import {RateViewPageModule} from "./views/rate-view/rate-view.module";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [FilterViewPage, RateViewPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FilterViewPageModule, RateViewPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
