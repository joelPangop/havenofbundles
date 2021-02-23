import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileHairBundlesPageRoutingModule } from './mobile-hair-bundles-routing.module';

import { MobileHairBundlesPage } from './mobile-hair-bundles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileHairBundlesPageRoutingModule
  ],
  declarations: [MobileHairBundlesPage]
})
export class MobileHairBundlesPageModule {}
