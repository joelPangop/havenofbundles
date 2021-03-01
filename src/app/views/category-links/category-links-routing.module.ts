import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryLinksPage } from './category-links.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryLinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryLinksPageRoutingModule {}
