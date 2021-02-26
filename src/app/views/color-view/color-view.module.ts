import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColorViewPageRoutingModule } from './color-view-routing.module';

import { ColorViewPage } from './color-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorViewPageRoutingModule
  ],
  declarations: [ColorViewPage]
})
export class ColorViewPageModule {}
