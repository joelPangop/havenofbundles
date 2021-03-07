import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BundleSetManagerPage } from './bundle-set-manager.page';

const routes: Routes = [
  {
    path: '',
    component: BundleSetManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BundleSetManagerPageRoutingModule {}
