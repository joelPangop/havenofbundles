import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MailingListPage } from './mailing-list.page';

const routes: Routes = [
  {
    path: '',
    component: MailingListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailingListPageRoutingModule {}
