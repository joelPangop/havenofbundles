import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HairBundlesPage } from './hair-bundles.page';

const routes: Routes = [
  {
    path: '',
    component: HairBundlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HairBundlesPageRoutingModule {}
