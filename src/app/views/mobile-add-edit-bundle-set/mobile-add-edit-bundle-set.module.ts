import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileAddEditBundleSetPageRoutingModule } from './mobile-add-edit-bundle-set-routing.module';

import { MobileAddEditBundleSetPage } from './mobile-add-edit-bundle-set.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileAddEditBundleSetPageRoutingModule
  ],
  declarations: [MobileAddEditBundleSetPage]
})
export class MobileAddEditBundleSetPageModule {}
