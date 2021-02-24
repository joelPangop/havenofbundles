import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileProductViewPageRoutingModule } from './mobile-product-view-routing.module';

import { MobileProductViewPage } from './mobile-product-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileProductViewPageRoutingModule
  ],
  declarations: [MobileProductViewPage]
})
export class MobileProductViewPageModule {}
