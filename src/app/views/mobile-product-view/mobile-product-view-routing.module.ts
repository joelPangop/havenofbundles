import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileProductViewPage } from './mobile-product-view.page';

const routes: Routes = [
  {
    path: '',
    component: MobileProductViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileProductViewPageRoutingModule {}
