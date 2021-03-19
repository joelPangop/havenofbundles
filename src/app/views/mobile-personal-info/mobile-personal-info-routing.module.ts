import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobilePersonalInfoPage } from './mobile-personal-info.page';

const routes: Routes = [
  {
    path: '',
    component: MobilePersonalInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobilePersonalInfoPageRoutingModule {}
