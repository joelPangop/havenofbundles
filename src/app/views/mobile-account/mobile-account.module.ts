import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileAccountPageRoutingModule } from './mobile-account-routing.module';

import { MobileAccountPage } from './mobile-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileAccountPageRoutingModule
  ],
  declarations: [MobileAccountPage]
})
export class MobileAccountPageModule {}
