import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BundleSetListPage } from './bundle-set-list.page';

const routes: Routes = [
  {
    path: '',
    component: BundleSetListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BundleSetListPageRoutingModule {}
