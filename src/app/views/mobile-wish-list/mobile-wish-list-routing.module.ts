import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileWishListPage } from './mobile-wish-list.page';

const routes: Routes = [
  {
    path: '',
    component: MobileWishListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileWishListPageRoutingModule {}
