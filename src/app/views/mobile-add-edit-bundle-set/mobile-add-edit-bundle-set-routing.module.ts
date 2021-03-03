import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileAddEditBundleSetPage } from './mobile-add-edit-bundle-set.page';

const routes: Routes = [
  {
    path: '',
    component: MobileAddEditBundleSetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileAddEditBundleSetPageRoutingModule {}
