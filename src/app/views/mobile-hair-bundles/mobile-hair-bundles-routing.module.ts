import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileHairBundlesPage } from './mobile-hair-bundles.page';

const routes: Routes = [
  {
    path: '',
    component: MobileHairBundlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileHairBundlesPageRoutingModule {}
