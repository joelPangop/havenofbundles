import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileHomePage } from './mobile-home.page';

const routes: Routes = [
  {
    path: '',
    component: MobileHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileHomePageRoutingModule {}
