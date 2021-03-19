import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobilePersonalInfoPageRoutingModule } from './mobile-personal-info-routing.module';

import { MobilePersonalInfoPage } from './mobile-personal-info.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MobilePersonalInfoPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [MobilePersonalInfoPage]
})
export class MobilePersonalInfoPageModule {}
