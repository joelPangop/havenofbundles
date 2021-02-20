import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsManagementPageRoutingModule } from './products-management-routing.module';

import { ProductsManagementPage } from './products-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsManagementPageRoutingModule,
    ReactiveFormsModule
  ],
    exports: [
        ProductsManagementPage
    ],
    declarations: [ProductsManagementPage]
})
export class ProductsManagementPageModule {}
