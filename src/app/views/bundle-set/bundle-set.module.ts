import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BundleSetPageRoutingModule } from './bundle-set-routing.module';

import { BundleSetPage } from './bundle-set.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BundleSetPageRoutingModule
    ],
    exports: [
        BundleSetPage
    ],
    declarations: [BundleSetPage]
})
export class BundleSetPageModule {}
