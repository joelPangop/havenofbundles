import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileSignInPageRoutingModule } from './mobile-sign-in-routing.module';

import { MobileSignInPage } from './mobile-sign-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileSignInPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MobileSignInPage]
})
export class MobileSignInPageModule {}
