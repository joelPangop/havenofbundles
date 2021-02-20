import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileProductsManagementPageRoutingModule } from './mobile-products-management-routing.module';

import { MobileProductsManagementPage } from './mobile-products-management.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MobileProductsManagementPageRoutingModule
    ],
    exports: [
        MobileProductsManagementPage
    ],
    declarations: [MobileProductsManagementPage]
})
export class MobileProductsManagementPageModule {}
