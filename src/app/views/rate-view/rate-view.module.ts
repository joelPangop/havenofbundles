import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateViewPageRoutingModule } from './rate-view-routing.module';

import { RateViewPage } from './rate-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateViewPageRoutingModule
  ],
  declarations: [RateViewPage]
})
export class RateViewPageModule {}
