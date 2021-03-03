import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileBundleSetPage } from './mobile-bundle-set.page';

const routes: Routes = [
  {
    path: '',
    component: MobileBundleSetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileBundleSetPageRoutingModule {}
