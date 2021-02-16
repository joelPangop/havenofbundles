import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoldPageRoutingModule } from './sold-routing.module';

import { SoldPage } from './sold.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SoldPageRoutingModule
    ],
    exports: [
        SoldPage
    ],
    declarations: [SoldPage]
})
export class SoldPageModule {}
