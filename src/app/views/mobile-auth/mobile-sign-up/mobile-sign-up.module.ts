import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileSignUpPageRoutingModule } from './mobile-sign-up-routing.module';

import { MobileSignUpPage } from './mobile-sign-up.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MobileSignUpPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [MobileSignUpPage]
})
export class MobileSignUpPageModule {}
