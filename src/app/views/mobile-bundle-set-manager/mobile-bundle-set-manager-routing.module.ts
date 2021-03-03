import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileBundleSetManagerPage } from './mobile-bundle-set-manager.page';

const routes: Routes = [
  {
    path: '',
    component: MobileBundleSetManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileBundleSetManagerPageRoutingModule {}
