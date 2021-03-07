import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileBundleSetListPage } from './mobile-bundle-set-list.page';

const routes: Routes = [
  {
    path: '',
    component: MobileBundleSetListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileBundleSetListPageRoutingModule {}
