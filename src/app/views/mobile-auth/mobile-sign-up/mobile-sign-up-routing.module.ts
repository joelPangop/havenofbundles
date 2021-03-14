import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileSignUpPage } from './mobile-sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: MobileSignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileSignUpPageRoutingModule {}
