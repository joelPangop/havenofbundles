import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyProfileImagePage } from './modify-profile-image.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyProfileImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyProfileImagePageRoutingModule {}
