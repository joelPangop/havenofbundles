import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import {DashboardViewPageModule} from '../dashboard-view/dashboard-view.module';
import {MailingListPageModule} from '../mailing-list/mailing-list.module';
import {ProfilePageModule} from '../profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    DashboardViewPageModule,
    MailingListPageModule,
    ProfilePageModule
  ],
  exports: [
    DashboardPage
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
