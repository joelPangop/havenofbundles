import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyProfileImagePageRoutingModule } from './modify-profile-image-routing.module';

import { ModifyProfileImagePage } from './modify-profile-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyProfileImagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModifyProfileImagePage]
})
export class ModifyProfileImagePageModule {}
