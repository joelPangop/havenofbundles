import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MobileUpdatePasswordPageRoutingModule} from './mobile-update-password-routing.module';

import {MobileUpdatePasswordPage} from './mobile-update-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileUpdatePasswordPageRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    MobileUpdatePasswordPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [MobileUpdatePasswordPage]
})
export class MobileUpdatePasswordPageModule {
}
