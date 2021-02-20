import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileProductsPageRoutingModule } from './profile-products-routing.module';

import { ProfileProductsPage } from './profile-products.page';
import {AddEditProductPageModule} from '../add-edit-product/add-edit-product.module';
import {MobileProductsManagementPageModule} from "../mobile-products-management/mobile-products-management.module";
import {ProductsManagementPageModule} from "../products-management/products-management.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileProductsPageRoutingModule,
    AddEditProductPageModule,
    MobileProductsManagementPageModule,
    ProductsManagementPageModule
  ],
    exports: [
        ProfileProductsPage
    ],
    declarations: [ProfileProductsPage]
})
export class ProfileProductsPageModule {}
