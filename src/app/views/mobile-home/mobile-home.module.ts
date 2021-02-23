import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileHomePageRoutingModule } from './mobile-home-routing.module';

import { MobileHomePage } from './mobile-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileHomePageRoutingModule
  ],
  declarations: [MobileHomePage]
})
export class MobileHomePageModule {}
