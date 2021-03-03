import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileBundleSetPageRoutingModule } from './mobile-bundle-set-routing.module';

import { MobileBundleSetPage } from './mobile-bundle-set.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileBundleSetPageRoutingModule
  ],
  declarations: [MobileBundleSetPage]
})
export class MobileBundleSetPageModule {}
