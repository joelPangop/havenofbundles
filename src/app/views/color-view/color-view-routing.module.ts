import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorViewPage } from './color-view.page';

const routes: Routes = [
  {
    path: '',
    component: ColorViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColorViewPageRoutingModule {}
