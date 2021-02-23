import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardViewPageRoutingModule } from './dashboard-view-routing.module';

import { DashboardViewPage } from './dashboard-view.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardViewPageRoutingModule
    ],
    exports: [
        DashboardViewPage
    ],
    declarations: [DashboardViewPage]
})
export class DashboardViewPageModule {}
