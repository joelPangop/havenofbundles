import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailingListPageRoutingModule } from './mailing-list-routing.module';

import { MailingListPage } from './mailing-list.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MailingListPageRoutingModule
    ],
    exports: [
        MailingListPage
    ],
    declarations: [MailingListPage]
})
export class MailingListPageModule {}
