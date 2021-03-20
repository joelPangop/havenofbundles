import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileUpdatePasswordPage } from './mobile-update-password.page';

const routes: Routes = [
  {
    path: '',
    component: MobileUpdatePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileUpdatePasswordPageRoutingModule {}
