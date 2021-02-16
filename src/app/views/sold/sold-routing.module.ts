import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoldPage } from './sold.page';

const routes: Routes = [
  {
    path: '',
    component: SoldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoldPageRoutingModule {}
