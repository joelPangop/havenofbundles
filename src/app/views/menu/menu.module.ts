import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import {Tab1PageModule} from '../tab1/tab1.module';
import {Tab2PageModule} from '../tab2/tab2.module';
import {Tab3PageModule} from '../tab3/tab3.module';
import {DashboardPageModule} from '../dashboard/dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    Tab1PageModule,
    Tab2PageModule,
    Tab3PageModule,
    DashboardPageModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
