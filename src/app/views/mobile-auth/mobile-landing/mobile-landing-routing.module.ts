import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileLandingPage } from './mobile-landing.page';

const routes: Routes = [
  {
    path: '',
    component: MobileLandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileLandingPageRoutingModule {}
