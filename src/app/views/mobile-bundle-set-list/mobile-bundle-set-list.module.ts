import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileBundleSetListPageRoutingModule } from './mobile-bundle-set-list-routing.module';

import { MobileBundleSetListPage } from './mobile-bundle-set-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileBundleSetListPageRoutingModule
  ],
  declarations: [MobileBundleSetListPage]
})
export class MobileBundleSetListPageModule {}
