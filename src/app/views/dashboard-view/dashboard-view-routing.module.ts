import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardViewPage } from './dashboard-view.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardViewPageRoutingModule {}
