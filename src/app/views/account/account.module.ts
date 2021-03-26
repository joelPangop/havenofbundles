import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import {PersonalInfoPageModule} from "../personal-info/personal-info.module";
import {UpdatePasswordPageModule} from "../update-password/update-password.module";
import {WishListPageModule} from "../wish-list/wish-list.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AccountPageRoutingModule,
        PersonalInfoPageModule,
        UpdatePasswordPageModule,
        WishListPageModule
    ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
