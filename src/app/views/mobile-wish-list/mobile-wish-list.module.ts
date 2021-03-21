import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileWishListPageRoutingModule } from './mobile-wish-list-routing.module';

import { MobileWishListPage } from './mobile-wish-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileWishListPageRoutingModule
  ],
  declarations: [MobileWishListPage]
})
export class MobileWishListPageModule {}
