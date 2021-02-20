import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileProductsManagementPage } from './mobile-products-management.page';

const routes: Routes = [
  {
    path: '',
    component: MobileProductsManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileProductsManagementPageRoutingModule {}
