import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import {MailingListPageModule} from '../mailing-list/mailing-list.module';
import {ProfilePageModule} from '../profile/profile.module';
import {AvailablePageModule} from '../available/available.module';
import {ProfileProductsPageModule} from '../profile-products/profile-products.module';
import {SoldPageModule} from '../sold/sold.module';
import {SummaryPageModule} from '../summary/summary.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    MailingListPageModule,
    ProfilePageModule,
    AvailablePageModule,
    ProfileProductsPageModule,
    SoldPageModule,
    SummaryPageModule
  ],
  exports: [
    DashboardPage
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
