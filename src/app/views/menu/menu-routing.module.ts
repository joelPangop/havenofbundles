import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MenuPage} from './menu.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: MenuPage
  // },
  {
    path: '',
    component: MenuPage,
    loadChildren: () => import('../tabs/tabs.module').then(m => m.TabsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
