import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BundleSetManagerPageRoutingModule } from './bundle-set-manager-routing.module';

import { BundleSetManagerPage } from './bundle-set-manager.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BundleSetManagerPageRoutingModule
    ],
    exports: [
        BundleSetManagerPage
    ],
    declarations: [BundleSetManagerPage]
})
export class BundleSetManagerPageModule {}
