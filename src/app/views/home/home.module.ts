import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';
import {DashboardPageModule} from '../dashboard/dashboard.module';
import {Tab1PageModule} from '../tab1/tab1.module';
import {Tab2PageModule} from '../tab2/tab2.module';
import {Tab3PageModule} from '../tab3/tab3.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ExploreContainerComponentModule,
    DashboardPageModule,
    Tab1PageModule,
    Tab2PageModule,
    Tab3PageModule
  ],
  exports: [
    HomePage
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
