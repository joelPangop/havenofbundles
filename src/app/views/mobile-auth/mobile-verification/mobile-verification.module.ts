import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileVerificationPageRoutingModule } from './mobile-verification-routing.module';

import { MobileVerificationPage } from './mobile-verification.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MobileVerificationPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [MobileVerificationPage]
})
export class MobileVerificationPageModule {}
