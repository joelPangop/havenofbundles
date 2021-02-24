import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterViewPageRoutingModule } from './filter-view-routing.module';

import { FilterViewPage } from './filter-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterViewPageRoutingModule
  ],
  declarations: [FilterViewPage]
})
export class FilterViewPageModule {}
