import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileSignInPage } from './mobile-sign-in.page';

const routes: Routes = [
  {
    path: '',
    component: MobileSignInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileSignInPageRoutingModule {}
