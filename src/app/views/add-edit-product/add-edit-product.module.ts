import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditProductPageRoutingModule } from './add-edit-product-routing.module';

import { AddEditProductPage } from './add-edit-product.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddEditProductPageRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        AddEditProductPage
    ],
    declarations: [AddEditProductPage]
})
export class AddEditProductPageModule {}
