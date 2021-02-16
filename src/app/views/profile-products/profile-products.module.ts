import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileProductsPageRoutingModule } from './profile-products-routing.module';

import { ProfileProductsPage } from './profile-products.page';
import {AddEditProductPageModule} from '../add-edit-product/add-edit-product.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileProductsPageRoutingModule,
    AddEditProductPageModule
  ],
    exports: [
        ProfileProductsPage
    ],
    declarations: [ProfileProductsPage]
})
export class ProfileProductsPageModule {}
