import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import {MailingListPageModule} from '../mailing-list/mailing-list.module';
import {ProfilePageModule} from '../profile/profile.module';
import {AvailablePageModule} from '../available/available.module';
import {SoldPageModule} from '../sold/sold.module';
import {SummaryPageModule} from '../summary/summary.module';
import {MobileProductsManagementPageModule} from '../mobile-products-management/mobile-products-management.module';
import {ProductsManagementPageModule} from "../products-management/products-management.module";
import {BundleSetPageModule} from "../bundle-set/bundle-set.module";
import {BundleSetManagerPageModule} from "../bundle-set-manager/bundle-set-manager.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    MailingListPageModule,
    ProfilePageModule,
    AvailablePageModule,
    SoldPageModule,
    SummaryPageModule,
    MobileProductsManagementPageModule,
    ProductsManagementPageModule,
    BundleSetPageModule,
    BundleSetManagerPageModule
  ],
  exports: [
    DashboardPage
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
