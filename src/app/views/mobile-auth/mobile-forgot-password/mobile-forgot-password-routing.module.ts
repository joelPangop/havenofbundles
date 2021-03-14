import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileForgotPasswordPage } from './mobile-forgot-password.page';

const routes: Routes = [
  {
    path: '',
    component: MobileForgotPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileForgotPasswordPageRoutingModule {}
