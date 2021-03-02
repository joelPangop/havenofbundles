import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BundleSetPage } from './bundle-set.page';

const routes: Routes = [
  {
    path: '',
    component: BundleSetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BundleSetPageRoutingModule {}
