import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HairBundlesPageRoutingModule } from './hair-bundles-routing.module';

import { HairBundlesPage } from './hair-bundles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HairBundlesPageRoutingModule
  ],
  declarations: [HairBundlesPage]
})
export class HairBundlesPageModule {}
