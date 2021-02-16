import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileProductsPage } from './profile-products.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileProductsPageRoutingModule {}
