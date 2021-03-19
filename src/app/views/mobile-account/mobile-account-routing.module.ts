import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileAccountPage } from './mobile-account.page';

const routes: Routes = [
  {
    path: '',
    component: MobileAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileAccountPageRoutingModule {}
