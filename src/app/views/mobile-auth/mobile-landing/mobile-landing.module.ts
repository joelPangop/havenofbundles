import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileLandingPageRoutingModule } from './mobile-landing-routing.module';

import { MobileLandingPage } from './mobile-landing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileLandingPageRoutingModule
  ],
  declarations: [MobileLandingPage]
})
export class MobileLandingPageModule {}
