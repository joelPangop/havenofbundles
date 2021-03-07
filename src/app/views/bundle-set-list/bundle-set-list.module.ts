import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BundleSetListPageRoutingModule } from './bundle-set-list-routing.module';

import { BundleSetListPage } from './bundle-set-list.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BundleSetListPageRoutingModule
    ],
    exports: [
        BundleSetListPage
    ],
    declarations: [BundleSetListPage]
})
export class BundleSetListPageModule {}
