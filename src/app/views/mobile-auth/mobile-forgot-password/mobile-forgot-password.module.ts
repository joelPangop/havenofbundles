import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileForgotPasswordPageRoutingModule } from './mobile-forgot-password-routing.module';

import { MobileForgotPasswordPage } from './mobile-forgot-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileForgotPasswordPageRoutingModule
  ],
  declarations: [MobileForgotPasswordPage]
})
export class MobileForgotPasswordPageModule {}
