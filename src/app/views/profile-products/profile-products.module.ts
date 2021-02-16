import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileProductsPageRoutingModule } from './profile-products-routing.module';

import { ProfileProductsPage } from './profile-products.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfileProductsPageRoutingModule
    ],
    exports: [
        ProfileProductsPage
    ],
    declarations: [ProfileProductsPage]
})
export class ProfileProductsPageModule {}
