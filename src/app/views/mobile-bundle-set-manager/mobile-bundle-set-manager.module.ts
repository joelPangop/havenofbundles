import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileBundleSetManagerPageRoutingModule } from './mobile-bundle-set-manager-routing.module';

import { MobileBundleSetManagerPage } from './mobile-bundle-set-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileBundleSetManagerPageRoutingModule
  ],
  declarations: [MobileBundleSetManagerPage]
})
export class MobileBundleSetManagerPageModule {}
